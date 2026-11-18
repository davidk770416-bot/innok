import { email, origin } from '@/lib/brand'
import { buyerTypes, provinces } from '@/lib/inquiry'
import { collection, patterns } from '@/lib/catalogue'

const limit = 12000
const reply = (message: string, status: number) => Response.json({ message }, { status })
const unavailable = () => reply('We couldn’t send your inquiry. Please email INNOK directly.', 503)

async function readBody(request: Request) {
  const reader = request.body?.getReader()
  if (!reader) throw new Error('Missing body')
  const decoder = new TextDecoder()
  let length = 0
  let text = ''
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > limit) {
        await reader.cancel()
        throw new Error('Body too large')
      }
      text += decoder.decode(value, { stream: true })
    }
  } finally {
    reader.releaseLock()
  }
  return JSON.parse(text + decoder.decode()) as unknown
}

export async function POST(request: Request) {
  if (request.headers.get('origin') !== (origin ?? new URL(request.url)).origin) return reply('Please submit the form from the INNOK website.', 403)
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') return reply('Invalid request format.', 415)
  let data: unknown
  try {
    data = await readBody(request)
  } catch {
    return reply('Invalid inquiry. Check the fields and try again.', 400)
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return reply('Invalid inquiry.', 400)
  const body = data as Record<string, unknown>
  const field = (key: string, max: number) => {
    const value = body[key]
    return typeof value === 'string' && value.trim().length <= max ? value.trim() : ''
  }
  const kind = field('kind', 7)
  const name = field('name', 120)
  const address = field('email', 254)
  const company = field('company', 160)
  const message = field('message', 3500)
  if (body.website || !['quote', 'samples', 'contact'].includes(kind) || !name || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(address) || !message) {
    return reply('Check your name, email and inquiry details and try again.', 400)
  }
  const details = ['Contact: ' + name, 'Email: ' + address, 'Company: ' + (company || 'Not specified')]
  if (kind !== 'contact') {
    const province = provinces.find((item) => item === body.province)
    const buyer = buyerTypes.find((item) => item === body.buyer)
    const product = body.product === 'undecided' ? 'Help me select' : body.product === collection.slug ? collection.name : patterns.find((item) => item.slug === body.product)?.name
    const quantity = field('quantity', 100)
    if (!province || !buyer || !product || !quantity || !company) return reply('Complete all required quote fields and try again.', 400)
    details.push('Province or territory: ' + province, 'Buyer type: ' + buyer, 'Product: ' + product, 'Estimated quantity: ' + quantity)
  }

  const key = process.env.RESEND_API_KEY
  const from = process.env.INQUIRY_FROM_EMAIL
  if (!key || !from) return unavailable()
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [email], reply_to: address, subject: kind === 'quote' ? 'INNOK quote request' : kind === 'samples' ? 'INNOK sample request' : 'INNOK website inquiry', text: [...details, '', message].join('\n') }),
      signal: AbortSignal.timeout(8000),
    })
    if (!result.ok) return unavailable()
    return reply('Your inquiry was sent. Thank you for contacting INNOK.', 200)
  } catch {
    return unavailable()
  }
}
