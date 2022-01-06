import * as http from 'http'
import { Readable } from 'stream'
import { Call } from '@drizzle-http/core'
import { HttpRequest } from '@drizzle-http/core'
import { HttpResponse } from '@drizzle-http/core'
import { HttpHeaders } from '@drizzle-http/core'
import { CallFactory } from '@drizzle-http/core'
import { RequestFactory } from '@drizzle-http/core'
import { Drizzle } from '@drizzle-http/core'

class NodeHttpResponse implements HttpResponse<Readable> {
  readonly trailers: Promise<HttpHeaders>
  _bodyUsed: boolean = false

  constructor(
    readonly url: string,
    readonly status: number,
    readonly statusText: string,
    readonly headers: HttpHeaders,
    readonly body: Readable,
    trailers: Record<string, string>
  ) {
    this.trailers = Promise.resolve(new HttpHeaders(trailers))
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    this._bodyUsed = true
    return this.consumeBody()
  }

  blob(): Promise<unknown> {
    throw new Error('blob() is not available.')
  }

  get bodyUsed(): boolean {
    return this._bodyUsed
  }

  formData(): Promise<unknown> {
    throw new Error('formData() is not available.')
  }

  async json<T>(): Promise<T> {
    return this.consumeBody().then(buf => JSON.parse(buf.toString('utf-8')))
  }

  get ok(): boolean {
    return false
  }

  text(): Promise<string> {
    return this.consumeBody().then(res => res.toString('utf-8'))
  }

  private async consumeBody(): Promise<Buffer> {
    this._bodyUsed = true

    const d: Buffer[] = []

    for await (const chunk of this.body) {
      d.push(chunk)
    }

    return Buffer.concat(d)
  }
}

class NodeHttpCallAdapter implements Call<HttpResponse<Readable>> {
  execute(request: HttpRequest, _argv: unknown[]): Promise<HttpResponse<Readable>> {
    return new Promise<HttpResponse<Readable>>((resolve, reject) => {
      const req = http.request(
        request.url,
        {
          method: request.method,
          headers: request.headers.toObject(),
          signal: request.signal as AbortSignal,
          timeout: request.bodyTimeout
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        },
        res =>
          resolve(
            new NodeHttpResponse(
              request.url,
              res.statusCode!,
              res.statusMessage!,
              new HttpHeaders(res.headers as Record<string, string>),
              res,
              res.trailers as Record<string, string>
            )
          )
      )

      req.on('error', err => reject(err))

      if (request.body) {
        req.write(request.body)
      }

      req.end()
    })
  }
}

export class NodeHttpCallAdapterFactory implements CallFactory {
  setup(_drizzle: Drizzle): void {
    // not needed
  }

  provide(_drizzle: Drizzle, _requestFactory: RequestFactory): Call<unknown> {
    return new NodeHttpCallAdapter()
  }
}
