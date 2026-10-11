import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmModal from './ConfirmModal.jsx'

const setup = (props = {}) => {
  const onConfirm = jest.fn()
  const onCancel = jest.fn()
  render(
    <ConfirmModal
      message="Delete this booking?"
      confirmLabel="Yes"
      cancelLabel="No"
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...props}
    />
  )
  return { onConfirm, onCancel }
}

test('shows the message and both buttons', () => {
  setup()
  expect(screen.getByText('Delete this booking?')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
})

test('calls onConfirm and onCancel from the buttons', () => {
  const { onConfirm, onCancel } = setup()
  fireEvent.click(screen.getByRole('button', { name: 'Yes' }))
  fireEvent.click(screen.getByRole('button', { name: 'No' }))
  expect(onConfirm).toHaveBeenCalledTimes(1)
  expect(onCancel).toHaveBeenCalledTimes(1)
})

test('clicking the overlay cancels, clicking the content does not', () => {
  const { onCancel } = setup()
  fireEvent.click(screen.getByText('Delete this booking?'))
  expect(onCancel).not.toHaveBeenCalled()
  fireEvent.click(screen.getByText('Delete this booking?').closest('div').parentElement)
  expect(onCancel).toHaveBeenCalledTimes(1)
})

test('confirmDisabled disables the confirm button', () => {
  setup({ confirmDisabled: true })
  expect(screen.getByRole('button', { name: 'Yes' })).toBeDisabled()
})
