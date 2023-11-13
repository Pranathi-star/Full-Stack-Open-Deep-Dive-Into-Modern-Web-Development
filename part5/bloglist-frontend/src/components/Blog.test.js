import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author',
    url: 'www.abc.com',
    likes: 2
    }

    const { container } = render(<Blog blog={blog} handleLikes={jest.fn()} canDelete={jest.fn()} handleDelete={jest.fn()} /> )
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent(
        'authorview'
    )
    expect(div).not.toHaveTextContent(
        2
    )
    expect(div).not.toHaveTextContent(
        'www.abc.com'
    )
    
})

test('clicking the button causes new text to render', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'author',
        url: 'www.abc.com',
        likes: 2
    }
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} handleLikes={jest.fn()} canDelete={jest.fn()} handleDelete={jest.fn()} /> )
    const div = container.querySelector('.blog')
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(div).toHaveTextContent(
        'likes'
    )
    expect(div).toHaveTextContent(
        'www.abc.com'
    )
})

test('clicking the like button twice causes event handler to be called twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'author',
        likes: 2,
        url: 'www.abc.com',
        user: {
            id: 1
        }
    }

    const mockHandler = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<Blog blog={blog} handleLikes={mockHandler} canDelete={jest.fn()} handleDelete={jest.fn()} /> )
    const button = screen.getByText('view')
    await user.click(button)
    const likesButton = screen.getByText('like')
    const likeUser = userEvent.setup()
    await likeUser.click(likesButton)
    expect(mockHandler).toHaveBeenCalledTimes(1);
    const likeUser2 = userEvent.setup()
    likeUser2.click(likesButton)
    expect(mockHandler).toHaveBeenCalledTimes(1);
})
