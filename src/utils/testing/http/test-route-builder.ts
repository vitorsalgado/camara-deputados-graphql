import { HTTPMethods } from 'fastify'

export interface TheResponse {
  status: number
  headers: Record<string, string>
  body: any
}

export interface Route {
  method: HTTPMethods
  url: string
  response: TheResponse
}

export class ResponseBuilder {
  private _status?: number
  private _headers: Record<string, string> = {}
  private _body?: any

  status(status: number): this {
    this._status = status
    return this
  }

  withHeader(key: string, value: string): this {
    this._headers[key] = value
    return this
  }

  withBody(body: any): this {
    this._body = body
    return this
  }

  build(): TheResponse {
    return {
      status: this._status,
      body: this._body,
      headers: this._headers
    } as TheResponse
  }
}

export class RouteBuilder {
  private method?: HTTPMethods
  private url?: string
  private response?: TheResponse

  static stub = (): RouteBuilder => new RouteBuilder()

  get(url: string): this {
    this.method = 'GET'
    this.url = url

    return this
  }

  willReturn(response: ResponseBuilder): this {
    this.response = response.build()
    return this
  }

  build(): Route {
    return {
      method: this.method,
      url: this.url,
      response: this.response
    } as Route
  }
}

export function get(url: string): RouteBuilder {
  return new RouteBuilder().get(url)
}

export function ok(): ResponseBuilder {
  return new ResponseBuilder().status(200)
}
