import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>
}

function render(ui: React.ReactElement, options: CustomRenderOptions = {}) {
  const user = userEvent.setup()
  return {
    user,
    ...rtlRender(ui, {
      wrapper: ({ children }: { children: React.ReactNode }) => children,
      ...options,
    }),
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render } 