declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const schema: DocumentNode

  export = schema
}

declare module '*.json' {
  const value: any;
  export default value;
}
