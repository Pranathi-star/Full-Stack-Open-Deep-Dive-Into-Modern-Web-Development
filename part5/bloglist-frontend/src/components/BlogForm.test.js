import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('clicking the blog form submit button causes event handler to be called', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    render(<BlogForm createBlog={mockHandler} /> )
    const titleBox = screen.getAllByRole('textbox')[0]
    await user.type(titleBox, 'testing a form...')
    const button = screen.getByText('save')
    await user.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(1);
    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing a form...')

})
