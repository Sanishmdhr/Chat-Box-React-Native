import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  };


  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAeHyhIZXdIi6m3RLOBirURSsNRc5GOrVs",
        authDomain: "chat-box-a96cf.firebaseapp.com",
        databaseURL: "https://chat-box-a96cf.firebaseio.com",
        projectId: "chat-box-a96cf",
        storageBucket: "chat-box-a96cf.appspot.com",
        messagingSenderId: "898707066503",
        appId: "1:898707066503:web:76b2a1e3cf62b2743f7222"
      })
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      };

      this.db.push(message)
    });
  };


  parse = message => {
    const {user, text, timestamp} = message.val();
    const {key:_id} = message;
    const createdAt = new Date(timestamp);

    return {_id, createdAt, text, user};
  };

  get = callback =>{
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
  };

  off(){
    this.db.off();
  };

  get db() {
    return firebase.database().ref('messages')
  }

  get uid(){
    return (firebase.auth().currentUser || {}).uid;
  };
};

export default new Fire();
