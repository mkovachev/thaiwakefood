export const parseOptions = (data?: string) => {
  if (data) {
    const res = data?.split("/")
    return res
  }

  return []
}