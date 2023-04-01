export const formatOrderDate = (date: Date) => {

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }

  const formattedDate = new Intl.DateTimeFormat('default', options).format(date).replace(", ", '_')
  const formattedDateWithoutCommasOrSpaces = formattedDate.replace(/[\s,]+/g, '_')
  return formattedDateWithoutCommasOrSpaces
}



