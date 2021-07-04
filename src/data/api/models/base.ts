export enum Order {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Link {
  rel: string
  href: string
}

export interface ResultadoApi<T> {
  dados: T
  links: Link[]
}

export interface ApiResult<T> {
  data: T
  links: Link[]
}

export const mapSingle =
  <R, TR>(mapper: (response: R) => TR) =>
  (response: ResultadoApi<R>): ApiResult<TR> => ({
    links: response.links,
    data: mapper(response.dados)
  })

export const mapList =
  <R, TR>(mapper: (response: R) => TR) =>
  (response: ResultadoApi<R[]>): ApiResult<TR[]> => ({
    links: response.links,
    data: response.dados.map(mapper)
  })
