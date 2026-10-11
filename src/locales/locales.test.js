import en from './en/translation.json'
import uk from './uk/translation.json'
import cz from './cz/translation.json'

// Плюральні суфікси відрізняються між мовами (uk має _few/_many) — зводимо до бази
const PLURAL = /_(zero|one|two|few|many|other)$/

const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === 'object'
      ? flatten(value, `${prefix}${key}.`)
      : [`${prefix}${key}`.replace(PLURAL, '')]
  )

const keys = (locale) => new Set(flatten(locale))

describe.each([
  ['uk', uk],
  ['cz', cz],
])('%s translation', (name, locale) => {
  test('has every key that en has', () => {
    const missing = [...keys(en)].filter((k) => !keys(locale).has(k))
    expect(missing).toEqual([])
  })

  test('has no keys missing from en', () => {
    const extra = [...keys(locale)].filter((k) => !keys(en).has(k))
    expect(extra).toEqual([])
  })
})
