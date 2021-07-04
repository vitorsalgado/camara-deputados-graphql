import { HttpError } from 'drizzle-http'
import mercurius from 'mercurius'
import ErrorWithProps = mercurius.ErrorWithProps

export function anMappedGraphQLError(error: HttpError): ErrorWithProps {
  return new ErrorWithProps(error.message, {
    code: 'ERR_HTTP'
  })
}
