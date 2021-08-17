/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLEnumType, GraphQLResolveInfo } from 'graphql'
import { MercuriusContext } from 'mercurius'
import { LoaderArgs } from './utils/graphql/LoaderArgs'
import { PagedResult } from './utils/graphql/PagedResult'

/**
 * Context passed to GraphQL resolvers
 */
export interface Context extends MercuriusContext {
  correlationId: string
}

/**
 * GraphQL Query Type
 */
export type Query<TArgument, TResponse> = (
  parent: unknown,
  args: TArgument,
  ctx: Context,
  info: GraphQLResolveInfo
) => Promise<TResponse>

/**
 * GraphQL Paged Query Type
 */
export type PagedQuery<TArgument, TResponse> = Query<TArgument, PagedResult<TResponse>>

/**
 * Function type representing a GraphQL Query middleware
 *
 * @param next - {@link Query} resolver to be wrapped with the middleware
 *
 * @example
 * export function middleware(): QueryMiddleware\<any, any, any\> \{
 *  return function \<P, A, R\>(next: (parent: P, args: A, ctx: Context, info: GraphQLResolveInfo) =\> Promise<R>): (parent: P, args: A, ctx: Context, info: GraphQLResolveInfo) =\> Promise<R> \{
 *    return function(parent: P, args: A, ctx: Context, info: GraphQLResolveInfo): Promise<R> \{
 *      return next(parent, args, ctx, info)
 *    \}
 *  \}
 * \}
 */
export type QueryMiddleware<P, A, R> = (
  next: (parent: P, args: A, ctx: Context, info: GraphQLResolveInfo) => Promise<R>
) => Query<A, R>

/**
 * Function used to apply a GraphQL {@link Query} to the application resolvers list
 * @param query - GraphQL {@link Query} implementation
 */
export function applyQuery<P, A, R>(
  query: Query<A, R>
): (parent: P, args: A, ctx: Context, info: GraphQLResolveInfo) => Promise<R> {
  return function (parent, args, ctx, info) {
    return query(parent, args, ctx, info)
  }
}

/**
 * GraphQL Loader interface
 */
export type Loader<A, R> = (args: LoaderArgs<A>[]) => Promise<R>

/**
 * Function used to apply a {@link Loader} to the application loaders list
 * @param loader - {@link Loader} implementation to be applied
 */
export function applyLoader<A, R>(loader: Loader<A, R>): (args: LoaderArgs<A>[]) => Promise<R> {
  return function (args: LoaderArgs<A>[]) {
    return loader(args)
  }
}

/**
 * Represents a feature exports
 */
export interface Features {
  types?: Record<string, GraphQLEnumType>
  queries?: Record<string, Function>
  loaders?: Record<string, Record<string, Function>>
}
