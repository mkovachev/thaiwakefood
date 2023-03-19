export const formatInTHB = (price: number | string) =>
  new Intl.NumberFormat(
    'th-TH',
    { style: 'currency', currency: 'THB' })
    .format(Number(price))

