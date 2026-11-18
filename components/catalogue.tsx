'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Pattern } from '@/lib/catalogue'

export function Catalogue({ entries }: { entries: readonly Pattern[] }) {
  const [query, setQuery] = useState('')
  const [format, setFormat] = useState('')
  const results = entries.filter((entry) =>
    (!format || format === entry.format) &&
    [entry.name, entry.code, entry.finish].some((term) => term.toLowerCase().includes(query.trim().toLowerCase())),
  )
  if (!entries.length) return <div className="empty"><p>Contact INNOK for current patterns and configurations.</p><Link className="arrow-link" href="/quote?product=dryback-lvt">Ask about Dryback LVT ↗</Link></div>
  return <>
    <div className="filters">
      <label className="field">Search patterns <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, colour code or finish" /></label>
      <label className="field">Format <select value={format} onChange={(event) => setFormat(event.target.value)}><option value="">All formats</option>{[...new Set(entries.map((entry) => entry.format))].sort().map((value) => <option key={value}>{value}</option>)}</select></label>
    </div>
    <p role="status">{results.length} {results.length === 1 ? 'pattern' : 'patterns'}</p>
    {results.length ? <ul className="catalogue-results">{results.map((entry) => <li key={entry.slug}>
      <Link className="pattern-link" href={'/products/patterns/' + entry.slug}>
        <div className="swatch"><Image src={entry.image} alt="" fill sizes="(max-width: 760px) 45vw, 30vw" /></div>
        <h3>{entry.name}</h3><p>{entry.code} · {entry.format}</p>
      </Link>
    </li>)}</ul> : <p className="empty">Try a different name, colour code or format.</p>}
  </>
}
