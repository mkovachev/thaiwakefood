export const formatInTHB = (price: string) =>
  new Intl.NumberFormat(
    'th-TH',
    { style: 'currency', currency: 'THB' })
    .format(Number(price))

