/* eslint-disable @typescript-eslint/no-unused-vars */

import { Accept, ContentType, GET, MediaTypes, Param, Query, theTypes } from 'drizzle-http'
import { Map } from './translation/Map'
import { toDeputySimple } from './models/deputyMappers'
import { toDeputy } from './models/deputyMappers'
import { toSimpleParty } from './models/partyMappers'
import { toParty } from './models/partyMappers'
import { Order } from './models/base/Order'
import { mapList } from './models/base/mapList'
import { ApiResult } from './models/base/ApiResult'
import { Party } from './models/party'
import { PartySimple } from './models/party'
import { Deputy } from './models/deputy'
import { DeputySimple } from './models/deputy'
import { mapSingle } from './models/base/mapSingle'

@ContentType(MediaTypes.APPLICATION_JSON_UTF8)
@Accept(MediaTypes.APPLICATION_JSON_UTF8)
export class CongressApi {
  // ..

  // region Deputies

  @GET('/deputados')
  @Map(mapList(toDeputySimple))
  deputies(
    @Query('id') id: string,
    @Query('nome') nome: string,
    @Query('idLegislatura') idLegislatura: string | null = null,
    @Query('siglaUf') siglaUf: string | null = null,
    @Query('siglaPartido') siglaPartido: string | null = null,
    @Query('siglaSexo') siglaSexo: string | null = null,
    @Query('dataInicio') dataInicio: string | null = null,
    @Query('dataFim') dataFim: string | null = null,
    @Query('pagina') pagina: number,
    @Query('itens') itens: number,
    @Query('ordem') ordem: Order,
    @Query('ordenarPor') ordenarPor: string
  ): Promise<ApiResult<DeputySimple[]>> {
    return theTypes(Promise)
  }

  @GET('/deputados/{id}')
  @Map(mapSingle(toDeputy))
  deputyById(@Param('id') id: number): Promise<ApiResult<Deputy>> {
    return theTypes(Promise)
  }

  // endregion

  // region Parties

  @GET('/partidos')
  @Map(mapList(toSimpleParty))
  parties(
    @Query('sigla') sigla: string,
    @Query('dataInicio') dataInicio: string | null = null,
    @Query('dataFim') dataFim: string | null = null,
    @Query('idLegislatura') idLegislatura: number | null = null,
    @Query('pagina') pagina: number = 1,
    @Query('itens') itens: number = 10,
    @Query('ordem') ordem: Order = Order.ASC,
    @Query('ordenarPor') ordenarPor: string = 'nome'
  ): Promise<ApiResult<PartySimple[]>> {
    return theTypes(Promise)
  }

  @GET('/partidos/{id}')
  @Map(mapSingle(toParty))
  partyById(@Param('id') id: number): Promise<ApiResult<Party>> {
    return theTypes(Promise)
  }

  @GET('/partidos/{id}/membros')
  @Map(mapSingle(toDeputySimple))
  partyMembers(@Param('id') id: number): Promise<ApiResult<DeputySimple>> {
    return theTypes(Promise)
  }

  // endregion
}
