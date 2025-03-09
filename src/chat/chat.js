module.exports = async (io) => {

    io.use(async (socket, next) => {

        const token = socket.handshake.headers["x-auth-token"];
        if (!token) return next(new Error("TOKEN_REQUIRED"));

        let user;
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = await DB.USER.findByIdAndUpdate(decoded._id, { socketId: socket.id }, { new: true })

        } catch (error) {

            console.log(error);
            return next(new Error("INVALID_TOKEN"));

        }

        socket.user = user;
        next()

    });

    io.on("connection", (socket) => {

        console.log("🎯 user connected to socket");

        let joined_users;

        socket.on("self-join", async () => {

            socket.join(socket.user._id);
            socket.emit("self-join", { success: true });

        });

        socket.on("send-message", async ({ receiver_id, ...rest }) => {
            try {
                if (socket.user._id.toString() === receiver_id)
                    return socket.emit("error", messages.INVALID_REQUEST);

                const recieverUser = await DB.USER.findOne({
                    _id: receiver_id,
                    isActive: true,
                }).lean();
                console.log(`---recieverUser--`, recieverUser);
                if (!recieverUser)
                    return socket.emit("error", messages.REQUIRED_FIELDS);

                let roomExists = await DB.CHATROOM.findOne({
                    $or: [
                        { sender_id: socket.user._id, receiver_id, isActive: true },
                        {
                            sender_id: receiver_id,
                            receiver_id: socket.user._id,
                            isActive: true,
                        },
                    ],
                }).lean();
                // console.log(`---responseroomExists--`, roomExists);
                if (!roomExists) {
                    roomExists = await DB.CHATROOM.create({
                        sender_id: socket.user._id,
                        receiver_id,
                        room_type: SINGLE,
                    });
                }
                console.log(`---roomExists--`, roomExists);
                socket.join(roomExists._id.toString());
                const rooms = io.sockets.adapter.rooms.get(
                    roomExists._id.toString()
                );
                joined_users = rooms.size;

                console.log("send message room", joined_users);

                let chat;
                if (joined_users > 1) {
                    console.log("lonely", 123);
                    chat = await DB.CHAT.create({
                        sender_id: socket.user._id,
                        room_id: roomExists._id,
                        receiver_id,
                        isRead: true,
                        ...rest,
                    });
                } else {
                    console.log("commited", 456);
                    io.to(recieverUser.socketId).emit("check-room-list", {
                        success: true,
                    });
                    chat = await DB.CHAT.create({
                        sender_id: socket.user._id,
                        room_id: roomExists._id,
                        receiver_id,
                        isRead: false,
                        ...rest,
                    });
                }

                const response = {
                    success: true,
                    message: messages.SUCCESS,
                    data: chat,
                };
                console.log("chat", chat);
                io.to(socket.id).emit("send-message", response);
                io.to(recieverUser.socketId).emit("send-message", response);
            } catch (error) {
                console.log(`send-message error: ${error}`);
                socket.emit("error", messages.FAILED);
            }
        });

        socket.on("disconnect-user", async () => {

            try {

                const chatRooms = await DB.CHATROOM.find({
                    $or: [
                        { sender_id: socket.user._id, isActive: true },
                        { receiver_id: socket.user._id, isActive: true }
                    ]
                }).lean();

                chatRooms.forEach(room => {
                    socket.leave(room._id.toString());
                    const rooms = io.sockets.adapter.rooms.get(room._id.toString())
                    joined_users = rooms ? rooms.size : 0;
                });
                console.log("joined_users", joined_users);

                await DB.USER.findByIdAndUpdate(socket.user._id, { socketId: null }, { new: true });

                socket.emit("disconnect-user", { success: true, messages: messages.SUCCESS });

            } catch (error) {

                console.log(`disconnect error: ${error}`);
                socket.emit("error", messages.FAILED);

            }

        })
    });

}