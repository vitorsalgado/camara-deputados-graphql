import mercurius from 'mercurius'
import ErrorWithProps = mercurius.ErrorWithProps

export class AppError extends ErrorWithProps {
  constructor(message: string, public readonly code: string, extensions: Record<string, unknown> = {}) {
    super(message, { code, ...extensions })
  }
}
