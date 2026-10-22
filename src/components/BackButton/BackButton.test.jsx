import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BackButton from './BackButton.jsx'

const renderAt = (path, fallback) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<p>Home page</p>} />
        <Route path="/prices" element={<p>Prices page</p>} />
        <Route
          path="/privacy"
          element={fallback ? <BackButton fallback={fallback} /> : <BackButton />}
        />
      </Routes>
    </MemoryRouter>
  )

test('renders an accessible back button', () => {
  renderAt('/privacy')
  expect(screen.getByRole('button')).toBeInTheDocument()
})

test('without browser history it goes to the home page', () => {
  renderAt('/privacy')
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('Home page')).toBeInTheDocument()
})

test('without browser history it goes to a custom fallback', () => {
  renderAt('/privacy', '/prices')
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('Prices page')).toBeInTheDocument()
})

test('standalone mode renders the same working button in its own row', () => {
  render(
    <MemoryRouter initialEntries={['/privacy']}>
      <Routes>
        <Route path="/" element={<p>Home page</p>} />
        <Route path="/privacy" element={<BackButton standalone />} />
      </Routes>
    </MemoryRouter>
  )
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('Home page')).toBeInTheDocument()
})
