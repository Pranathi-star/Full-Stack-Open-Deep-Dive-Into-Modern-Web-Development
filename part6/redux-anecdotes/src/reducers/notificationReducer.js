import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: "notification",
    initialState: '',
    reducers: {
        createNotification(state, action) {
            return action.payload
        }
    }
})
export const { createNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(createNotification(`new anecdote '${message}'`))
        setTimeout(() => {
            dispatch(createNotification(''))
        }, time * 1000)
    }
}
export default notificationSlice.reducer