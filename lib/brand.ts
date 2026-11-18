export const email = 'innok.inc@gmail.com'
export const description = 'Luxury vinyl flooring for Canadian distributors, contractors and building projects.'
export const links = [
  ['Products', '/products'],
  ['Material Studio', '/studio'],
  ['Technical Resources', '/resources'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const
export const origin = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined
