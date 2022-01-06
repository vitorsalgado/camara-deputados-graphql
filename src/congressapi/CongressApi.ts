/* eslint-disable @typescript-eslint/no-unused-vars */

import { Accept } from '@drizzle-http/core'
import { Query } from '@drizzle-http/core'
import { GET } from '@drizzle-http/core'
import { Param } from '@drizzle-http/core'
import { MediaTypes } from '@drizzle-http/core'
import { noop } from '@drizzle-http/core'
import { Timeout } from '@drizzle-http/core'
import { Map } from '@drizzle-http/response-mapper-adapter'
import { CircuitBreaker } from '@drizzle-http/opossum-circuit-breaker'
import { Injectable } from '@nestjs/common'
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

@Injectable()
@Accept(MediaTypes.APPLICATION_JSON)
@Timeout(10e30)
export class CongressApi {
  @GET('/deputados')
  @Map(mapList(toDeputySimple))
  @CircuitBreaker()
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
    return noop()
  }

  @GET('/deputados/{id}')
  @Map(mapSingle(toDeputy))
  @CircuitBreaker()
  deputyById(@Param('id') id: number): Promise<ApiResult<Deputy>> {
    return noop()
  }

  @GET('/partidos')
  @Map(mapList(toSimpleParty))
  @CircuitBreaker()
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
    return noop()
  }

  @GET('/partidos/{id}')
  @Map(mapSingle(toParty))
  @CircuitBreaker()
  partyById(@Param('id') id: number): Promise<ApiResult<Party>> {
    return noop()
  }

  @GET('/partidos/{id}/membros')
  @Map(mapSingle(toDeputySimple))
  @CircuitBreaker()
  partyMembers(@Param('id') id: number): Promise<ApiResult<DeputySimple>> {
    return noop()
  }
}
