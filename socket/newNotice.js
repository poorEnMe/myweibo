const socketio = require('socket.io');

module.exports = (server)=>{
    const io =new socketio(server);
    io.on('connection', function(socket) {
        //接收并处理客户端的hi事件
        socket.on('newEntry', function(data) {
            console.log(data);

            socket.broadcast.emit('aNewEntry',1);
        });

        //断开事件
        socket.on('disconnect', function(data) {
            console.log('断开',data)
            socket.emit('c_leave','离开');

            //socket.broadcast.emit('c_leave','某某人离开了')
        })

    });


};

