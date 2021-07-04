import { Deputy, DeputySimple } from '@app/data/api'
import { Deputado, DeputadoSimples } from '@app/data/api/models/deputy-pt'

export function toDeputySimple(dto: DeputadoSimples): DeputySimple {
  return {
    id: dto.id,
    name: dto.nome,
    email: dto.email,
    termId: dto.idLegislatura,
    partyAcronym: dto.siglaPartido,
    uf: dto.siglaUf,
    uri: dto.uri,
    partyUri: dto.uriPartido,
    photoUri: dto.urlFoto
  }
}

export function toDeputy(dto: Deputado): Deputy {
  return {
    id: dto.id,
    name: dto.nome,
    email: dto.email,
    termId: dto.idLegislatura,
    partyAcronym: dto.siglaPartido,
    uf: dto.siglaUf,
    uri: dto.uri,
    partyUri: dto.uriPartido,
    photoUri: dto.urlFoto,
    civilName: dto.nomeCivil,
    cpf: dto.cpf,
    gender: dto.sexo,
    websiteUrl: dto.urlWebSite,
    socialNetwork: dto.redeSocial,
    birthDate: dto.dataNascimento,
    deathDate: dto.dataFalecimento,
    birthState: dto.ufNascimento,
    birthCity: dto.municipioNascimento,
    schooling: dto.escolaridade,
    lastStatus: {
      id: dto.ultimoStatus.id,
      uri: dto.ultimoStatus.uri,
      name: dto.ultimoStatus.nome,
      partyAcronym: dto.ultimoStatus.siglaPartido,
      partyUri: dto.ultimoStatus.uriPartido,
      uf: dto.ultimoStatus.siglaUf,
      termId: dto.ultimoStatus.idLegislatura,
      photoUri: dto.ultimoStatus.urlFoto,
      email: dto.ultimoStatus.email,
      date: dto.ultimoStatus.data,
      electoralName: dto.ultimoStatus.nomeEleitoral
    }
  }
}
