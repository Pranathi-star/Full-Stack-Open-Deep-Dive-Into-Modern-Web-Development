const BlogForm = ({
    handleNewBlog,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
            <div>
                title
                <input
                type="text"
                value={title}
                name="title"
                onChange={handleTitleChange}
                />
            </div>
            <div>
                author
                <input
                type="text"
                value={author}
                name="author"
                onChange={handleAuthorChange}
                />
            </div>
            <div>
                url
                <input
                type="text"
                value={url}
                name="url"
                onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
            </form>
        </div>      
    )
}

export default BlogForm