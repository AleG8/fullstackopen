const Notification = ({message: {content, type}}) => {
    if(content === null) return 

    const notificationStyle = {
        border: `2px solid ${type ? 'green': 'red'}`,
        backgroundColor: `${type ? 'lightgreen': 'lightgray'}`,
        borderRadius: '5px',
        color: 'black',
        fontSize: 18,
        padding: 5
    }

    return (
        <div style={notificationStyle}>
            {content}
        </div>
    )
}

export default Notification