import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mil, squareFeet } from '../lib/catalogue'

const pages = ['/', '/products', '/products/dryback-lvt', '/about', '/resources', '/studio', '/contact', '/quote']
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 820, height: 1100 },
  { name: 'mobile', width: 390, height: 844 },
]

for (const { name, width, height } of viewports) {
  test(name + ' layout and screenshots', async ({ page }, info) => {
    await page.setViewportSize({ width, height })
    for (const path of pages) {
      await page.goto(path)
      await expect(page.locator('main h1')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
      await page.screenshot({ path: info.outputPath((path.slice(1).replaceAll('/', '-') || 'home') + '.png'), fullPage: true, animations: 'disabled' })
    }
  })
}

test('mobile navigation and catalogue quote link', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByText('Menu', { exact: true }).click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Products', exact: true }).click()
  await page.getByRole('link', { name: 'Ask about Dryback LVT' }).click()
  await expect(page.getByLabel('Product', { exact: true })).toHaveValue('dryback-lvt')
})

test('home and quote accessibility', async ({ page }) => {
  for (const route of ['/', '/quote']) {
    await page.goto(route)
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(result.violations).toEqual([])
  }
})

test('contact form recovers from mail outage and reports accepted responses', async ({ page }) => {
  await page.goto('/contact')
  await page.getByLabel('Contact name').fill('Example Buyer')
  await page.getByLabel('Email', { exact: true }).fill('buyer@example.com')
  await page.getByLabel('Message').fill('Please send current product details.')
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  await expect(page.getByRole('status')).toContainText('couldn’t send')
  await expect(page.getByLabel('Message')).not.toHaveValue('')
  await page.route('**/api/inquiry', (route) => route.fulfill({ json: { message: 'Your inquiry was sent.' } }))
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  await expect(page.getByRole('status')).toContainText('Your inquiry was sent.')
  await expect(page.getByLabel('Message')).toHaveValue('')
})

test('quote endpoint rejects incomplete and cross-origin requests', async ({ request }) => {
  const url = 'http://localhost:3000/api/inquiry'
  const data = { kind: 'quote', name: 'Test', email: 'buyer@example.com', message: 'Flooring quote' }
  expect((await request.post(url, { headers: { Origin: 'http://localhost:3000' }, data })).status()).toBe(400)
  expect((await request.post(url, { headers: { Origin: 'https://example.com' }, data })).status()).toBe(403)
})

test('specification conversions', () => {
  expect(mil(0.508)).toBe(20)
  expect(squareFeet(1)).toBe(10.76)
})

test('studio modes and sample flow', async ({ page }) => {
  await page.goto('/studio')
  await page.getByRole('button', { name: 'Exploded view' }).click()
  await expect(page.getByText('Printed design layer')).toBeVisible()
  await page.getByRole('button', { name: 'Room visualizer' }).click()
  await page.getByLabel('Interior').selectOption('Workspace')
  await page.goto('/products/dryback-lvt')
  await page.getByText('7" × 48"', { exact: true }).click()
  const table = page.getByRole('region', { name: /7" × 48"/ }).getByRole('table')
  await expect(table.getByRole('row').filter({ hasText: '4.77' }).first()).toContainText('1,000')
  await page.getByRole('link', { name: 'Request Samples' }).click()
  await expect(page.getByRole('heading', { name: 'Request samples' })).toBeVisible()
  await expect(page.getByLabel('Product', { exact: true })).toHaveValue('dryback-lvt')
})
