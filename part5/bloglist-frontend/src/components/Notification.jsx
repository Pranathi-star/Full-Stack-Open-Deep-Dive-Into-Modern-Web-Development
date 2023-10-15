const goodNotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: `20`,
    borderStyle: 'solid',
    borderRadius: `5`,
    padding: `10`,
    marginBottom: `10`
}

const badNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: `20`,
    borderStyle: 'solid',
    borderRadius: `5`,
    padding: `10`,
    marginBottom: `10`
}

const Notification = ({ message, isGood }) => {
    if (message === null) {
        return null
    }

    const notificationStyle = isGood?
        goodNotificationStyle : badNotificationStyle

    console.log(notificationStyle)
    return (
        <div style={notificationStyle}>
        <p>{message}</p>
        </div>
    )
}
  
export default Notification