const socketIO = require('socket.io');

module.exports = {
  init(server) {
    this.io = socketIO(server);
    this.sessions = [];
    this.io.on('connection', socket => {
      socket.on('playerMove', data => {
        this.onPlayerMove(socket, data);
      })
      this.onConection(socket);
    })
  },
  onPlayerMove(socket, data) {
    const session = this.sessions.find(session => session.playerSocket === socket || session.enemySocket === socket);
    if(session) {
      let apponentSocket;
      if(session.playerSocket === socket) {
        apponentSocket = session.enemySocket;
      } else{
        apponentSocket = session.playerSocket;
      }
      apponentSocket.emit('enemyMove', data);
    }
  },
  // находим сессию где есть сокет игрока но нет сокета противника
  getPendingSession() {
    return this.sessions.find(session => session.playerSocket && !session.enemySocket);
  },
  createPendingSession(socket) {
    const session = { playerSocket: socket, enemySocket: null};
    this.sessions.push(session);
  },
  startGame(session) {
    session.playerSocket.emit('gameStart', {master : true});
    session.enemySocket.emit('gameStart');
  },
  onConection(socket) {
    console.log(`player conected ${socket.id}`)
    // получаем текущую ожидающую игровую сессию 
    let session = this.getPendingSession(socket);
    // если такой сесссии нет
    if (!session) {  // создать и добавить игрока

      this.createPendingSession(socket);
    } else {  // если такая сессия есть
      session.enemySocket = socket;
    // добавить противника и начать игру
      this.startGame(session);
    }
  }
}