export const formatData = (response: any) => {
  const keys = response.values[0]
  const data = response.values.slice(1)
  return data.map((arr: { [x: string]: any }) =>
    Object.assign({}, ...keys.map((k: any, i: string | number) =>
      ({ [k]: arr[i] }))))
}