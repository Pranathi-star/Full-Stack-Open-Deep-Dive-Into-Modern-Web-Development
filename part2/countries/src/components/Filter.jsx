const Filter = ({searchQuery, handleChange}) => {
    return (
        <>
            find countries <input value={searchQuery} onChange={handleChange} />
        </>
    )
}
    
export default Filter