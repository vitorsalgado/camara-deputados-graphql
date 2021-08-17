import { extractIdFromUri } from '../extractIdFromUri'

describe('Congress Api Utils', function () {
  it('should return only the numeric part of a uri', function () {
    const uri = 'https://dadosabertos.camara.leg.br/api/v2/deputados/73433'
    const id = extractIdFromUri(uri)

    expect(id).toEqual('73433')
  })
})
