import { Call, CallAdapter } from 'drizzle-http'
import { apiError } from '../utils/apiError'

export class TranslationCallAdapter<R, TR> implements CallAdapter<Promise<R>, Promise<TR>> {
  constructor(private readonly mapper: (response: R) => TR) {}

  adapt = (action: Call<Promise<R>>): Promise<TR> =>
    action
      .execute()
      .then(this.mapper)
      .catch(error => {
        throw apiError(error)
      })
}
