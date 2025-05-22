const Notification = ({ message, errorOccured }) => {
    if (message === null) {
        return null
    }

    console.log(errorOccured)

    const notificationStyle = {
        color: errorOccured ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5, 
        padding: 10,
        marginBottom: 10,
    }

    console.log(notificationStyle)

    return (
        <div style={notificationStyle}>
            {message}   
        </div>
    )
}

export default Notification