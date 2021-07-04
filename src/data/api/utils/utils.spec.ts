import { extractIdFromUri } from '@app/data/api/utils/utils'

describe('API Utils', function () {
  it('should return only the numeric part of a uri', function () {
    const uri = 'https://dadosabertos.camara.leg.br/api/v2/deputados/73433'
    const id = extractIdFromUri(uri)

    expect(id).toEqual('73433')
  })
})
