import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import RegisterPage from '../RegisterPage/RegisterPage.jsx'

// Менеджери паролів (iCloud Keychain, Chrome) розпізнають форму лише за
// цими атрибутами — тест не дає їх випадково прибрати.
const renderPage = (page) => render(<MemoryRouter>{page}</MemoryRouter>)

const field = (container, id) => container.querySelector(`#${id}`)

test('login form is a real form with a submit button', () => {
  const { container } = renderPage(<LoginPage />)
  const form = container.querySelector('form')
  expect(form).not.toBeNull()
  expect(form.querySelector('button[type="submit"]')).not.toBeNull()
})

test('login fields use username / current-password autofill attributes', () => {
  const { container } = renderPage(<LoginPage />)

  const username = field(container, 'username')
  expect(username).toHaveAttribute('type', 'email')
  expect(username).toHaveAttribute('name', 'username')
  expect(username).toHaveAttribute('autocomplete', 'username')
  expect(username).toHaveAttribute('autocapitalize', 'none')
  expect(username).toHaveAttribute('autocorrect', 'off')
  expect(username).toHaveAttribute('spellcheck', 'false')

  const password = field(container, 'password')
  expect(password).toHaveAttribute('type', 'password')
  expect(password).toHaveAttribute('name', 'password')
  expect(password).toHaveAttribute('autocomplete', 'current-password')
})

test('every login field has a label bound by htmlFor', () => {
  const { container } = renderPage(<LoginPage />)
  ;['username', 'password'].forEach((id) => {
    expect(container.querySelector(`label[for="${id}"]`)).not.toBeNull()
  })
})

test('register form uses new-password and keeps username on the email', () => {
  const { container } = renderPage(<RegisterPage />)
  expect(field(container, 'username')).toHaveAttribute(
    'autocomplete',
    'username'
  )
  expect(field(container, 'password')).toHaveAttribute(
    'autocomplete',
    'new-password'
  )
  expect(container.querySelector('[autocomplete="off"]')).toBeNull()
})
