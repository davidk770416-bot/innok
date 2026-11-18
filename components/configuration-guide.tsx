import { formats, mil, squareFeet } from '@/lib/catalogue'

export function ConfigurationGuide() {
  return <section className="wrap content-section specifications" id="specifications" aria-labelledby="configuration-guide">
    <div className="guide-heading rule-section">
      <h2 id="configuration-guide" className="text-6xl">Standard configurations</h2>
      <p>Confirm pattern availability for your selected configuration.</p>
    </div>
    {formats.map(({ label, widthMm, lengthMm, configurations }, index) => <details className="format-row" key={label} open={index === 0}>
      <summary><span>{label}</span>{widthMm !== lengthMm && <small>{widthMm} × {lengthMm} mm</small>}</summary>
      <div className="table-scroll" tabIndex={0} role="region" aria-label={label + ' technical and packaging information'}>
        <table className="spec guide-table">
          <caption>Specifications and packaging</caption>
          <thead><tr>{['Construction', 'Thickness', 'Wear layer', 'Pieces / box', 'm² / box', 'sq. ft. / box', 'Boxes / pallet', 'Pallets / 20 ft', 'Boxes / 20 ft'].map((value) => <th key={value} scope="col">{value}</th>)}</tr></thead>
          <tbody>{configurations.map((item) => <tr key={item.id}>
            <th scope="row">{item.backing ? 'Acoustic' : 'Dryback'}</th>
            <td>{item.thicknessMm.toFixed(1)} mm</td>
            <td>{item.wearMm.toFixed(2)} mm / {mil(item.wearMm)} mil</td>
            <td>{item.pieces}</td><td>{item.coverageM2.toFixed(2)}</td><td>{(item.coverageFt2 ?? squareFeet(item.coverageM2)).toFixed(2)}</td>
            <td>{item.boxesPerPallet}</td><td>{item.palletsPerContainer}</td><td>{item.boxesPerContainer?.toLocaleString('en-CA')}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </details>)}
    <div className="guide-detail"><p>Glue-down installation. Acoustic includes a 1.0 mm PE sound pad.</p></div>
  </section>
}
