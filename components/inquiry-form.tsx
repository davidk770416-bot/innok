'use client'

import { useState, type FormEvent } from 'react'
import { buyerTypes, provinces } from '@/lib/inquiry'
import { collection, patterns } from '@/lib/catalogue'
import { email } from '@/lib/brand'

type Props = { kind: 'quote' | 'samples' | 'contact', selected?: string }
export function InquiryForm({ kind, selected }: Props) {
  const [pending, setPending] = useState(false)
  const [feedback, setFeedback] = useState<{ ok: boolean, message: string }>()
  const quote = kind !== 'contact'
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    setPending(true)
    setFeedback(undefined)
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), kind }),
      })
      const result = await response.json()
      if (response.ok) form.reset()
      setFeedback({ ok: response.ok, message: result.message })
    } catch {
      setFeedback({ ok: false, message: 'We couldn’t send your inquiry. Please try again or email INNOK directly.' })
    } finally {
      setPending(false)
    }
  }
  return <form onSubmit={submit} aria-busy={pending}>
    <div className="form-grid">
      <label className="field">Company{!quote && ' (optional)'}<input name="company" autoComplete="organization" maxLength={160} required={quote} /></label>
      <label className="field">Contact name<input name="name" autoComplete="name" maxLength={120} required /></label>
      <label className={'field' + (quote ? '' : ' form-wide')}>Email<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
      {quote && <>
        <label className="field">Province or territory<select name="province" autoComplete="address-level1" defaultValue="" required><option value="" disabled>Select province or territory</option>{provinces.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="field">Buyer type<select name="buyer" defaultValue="" required><option value="" disabled>Select buyer type</option>{buyerTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="field">Product<select name="product" defaultValue={selected ?? 'undecided'}><option value="undecided">Help me select</option><option value={collection.slug}>{collection.name}</option>{patterns.map((item) => <option key={item.slug} value={item.slug}>{item.name} · {item.code}</option>)}</select></label>
        <label className="field form-wide">{kind === 'samples' ? 'Sample quantity' : 'Estimated quantity'}<input name="quantity" placeholder={kind === 'samples' ? 'e.g. 2 samples per colour' : 'e.g. 5,000 sq. ft.'} maxLength={100} required /></label>
      </>}
      <label className="field form-wide">{kind === 'samples' ? 'Sample requirements' : quote ? 'Project details' : 'Message'}<textarea name="message" maxLength={3500} required /></label>
      <div hidden><label>Website<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
    </div>
    <p className="text-sm mt-4">INNOK uses the information you submit to respond to your inquiry.</p>
    <div className="form-actions"><button type="submit" className="button" disabled={pending}>{pending ? 'Sending…' : 'Send inquiry'} <span aria-hidden="true">↗</span></button></div>
    <p role="status" className={'form-status' + (feedback && !feedback.ok ? ' error' : '')}>{feedback?.message}{feedback && !feedback.ok && <> <a className="underline" href={'mailto:' + email}>{email}</a></>}</p>
  </form>
}
