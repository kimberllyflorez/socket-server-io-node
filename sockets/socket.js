const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();


bands.addBands(new Band('queen'));
bands.addBands(new Band('Queen 1'));
bands.addBands(new Band('Bon jovi'));
bands.addBands(new Band('Bling'));
bands.addBands(new Band('skip'));
bands.addBands(new Band('band'));

console.log(bands)

const messageWeb = 'message';
const messageApp = 'message-user';
const chanel = 'emit';

io.on('connection', client => {
  console.log('client conected');

  client.emit('active-bands', bands.getBands());

  
  client.on('disconnect', () => {
       console.log('client desconected')
      });
    client.on(messageWeb, (payload)=>{
        console.log('message', payload);


      io.emit(messageWeb, {admin:'nuevo mensaje'});

      });
      client.on(messageApp, (payload)=>{
        console.log('message', payload);
//broadcast emit to all excep who emit the event 

      io.emit(messageApp, payload);

      });
      client.on(chanel, (payload)=>{
        console.log('message fron flutter',payload);
        client.broadcast.emit(chanel, payload);
       });

       client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        console.log(payload.id);
        io.emit('active-bands',  bands.getBands());
       });

       client.on('add-band', (payload)=>{
       
        bands.addBands(new Band(payload.name));
        console.log(payload.id);
        io.emit('active-bands',  bands.getBands());
       });

       client.on('delete-band', (payload)=>{
       
        bands.delete(payload.id);
        console.log(payload.id);
        io.emit('active-bands',  bands.getBands());
       });

  });