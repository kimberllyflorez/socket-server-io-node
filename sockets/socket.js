const { io } = require('../index');
const message = 'message';
io.on('connection', client => {
  console.log('client conected');
    client.on('disconnect', () => {
       console.log('client desconected')
      });
    client.on(message, (payload)=>{
        console.log('message', payload);


      io.emit(message, {admin:'nuevo mensaje'});

      });
     
  });