export const formatOrderDate = (date: Date) => {

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }

  return new Intl.DateTimeFormat('default', options).format(date)
}

