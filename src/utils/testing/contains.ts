export const contains =
  (field: string, value: string): ((query: any) => boolean) =>
  (data: any): boolean =>
    data[field] === value
