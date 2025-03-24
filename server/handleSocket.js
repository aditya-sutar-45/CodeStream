const handleSocket = (io) => {

    io.on("connection", (socket) => {
        console.log(`user connected: ${socket.id}`);

        socket.on("createRoom", ({username, roomName, roomPassword}) => {
            console.log(username, roomName, roomPassword);
        })
    })

}

export default handleSocket;