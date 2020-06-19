var firebaseConfig = {
  apiKey: "AIzaSyAUbh9quMaJcqRiZLJSgZo7Y6BpsHZWhRw",
  authDomain: "kocovinometr.firebaseapp.com",
  databaseURL: "https://kocovinometr.firebaseio.com",
  projectId: "kocovinometr",
  storageBucket: "kocovinometr.appspot.com",
  messagingSenderId: "66779677753",
  appId: "1:66779677753:web:42e3cc60d2ed85c21bf9e8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const realdb = firebase.database(),
  userid = makeid(10);

firebase.database().ref('users/' + userid).set({
  name: getParam("name"),
  amount: 0,
  logout: false
});

const dbref = firebase.database().ref('users/' + userid);
dbref.on('value', function(snapshot) {
  console.log(snapshot.val());
  console.log(snapshot.val().name);
  window.setTimeout(function() {
    location.href = "index.html?id=" + userid + "&name=" + getParam("name")
  }, 1000);
});

function getParam(param) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  return url.searchParams.get(param);
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
