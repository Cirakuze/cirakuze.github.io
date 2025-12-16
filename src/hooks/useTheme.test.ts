import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to system theme', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('system')
  })

  it('toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('light')
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('persists theme to localStorage', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('applies data-theme attribute to document', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
