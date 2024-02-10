const filterReducer = (state = '', action) => {
    switch (action.type) {
        case "SET_FILTER":
            return action.payload 
    }
    return state
}

export const createFilter = (filter) => {
    return {type: "SET_FILTER", "payload": filter}
}

export default filterReducer