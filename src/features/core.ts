/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLEnumType, GraphQLResolveInfo } from 'graphql'
import { LoaderArgs, PagedResult } from '@app/utils/base/gql'
import { MercuriusContext } from 'mercurius'

/**
 * Context passed to GraphQL resolvers
 */
export interface Context extends MercuriusContext {
  correlationId: string
}

/**
 * GraphQL Query interface
 */
export interface Query<TParent, TArgument, TResponse> {
  execute(parent: TParent, args: TArgument, ctx: Context, info: GraphQLResolveInfo): Promise<TResponse>
}

export type PagedQuery<TParent, TArgument, TResponse> = Query<TParent, TArgument, PagedResult<TResponse>>

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
) => (parent: P, args: A, ctx: Context, info: GraphQLResolveInfo) => Promise<R>

/**
 * Function used to apply a GraphQL {@link Query} to the application resolvers list
 * @param query - GraphQL {@link Query} implementation
 */
export function applyQuery<P, A, R>(
  query: Query<P, A, R>
): (parent: P, args: A, ctx: Context, info: GraphQLResolveInfo) => Promise<R> {
  return function (parent, args, ctx, info) {
    return query.execute(parent, args, ctx, info)
  }
}

/**
 * GraphQL Loader interface
 */
export interface Loader<A, R> {
  execute(args: LoaderArgs<A>[]): Promise<R>
}

/**
 * Function used to apply a {@link Loader} to the application loaders list
 * @param loader - {@link Loader} implementation to be applied
 */
export function applyLoader<A, R>(loader: Loader<A, R>): (args: LoaderArgs<A>[]) => Promise<R> {
  return function (args: LoaderArgs<A>[]) {
    return loader.execute(args)
  }
}

/**
 * Represents a feature exports
 */
export interface Feature {
  Types: Record<string, GraphQLEnumType>
  Queries: Record<string, Function>
  Loaders: Record<string, Record<string, Function>>
}
