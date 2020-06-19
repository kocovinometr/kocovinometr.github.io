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

const realdb = firebase.database();
const userid = getParam("id");
let latest = {};



const dbref = firebase.database().ref('users/' + userid);
dbref.on('value', function(snapshot) {
  latest = snapshot.val();
  refresh(latest);
});


const exampledb = {
  name: "Jan Brabec",
  amount: 10
}

document.getElementById("main-rename").onclick = function() {
  rename();
}

function refresh(json) {
if (json) {
  document.getElementById("main-amount").innerHTML = json.amount;
  document.getElementById("main-username").innerHTML = json.name;
} else {
  location.href = "register.html?name=" + getParam("name");
}

}

function pullFromDb() {

}

function pushToDb(json) {
  firebase.database().ref('users/' + userid).set(json);
}

function updateDl(mod) {
  latest.amount += mod;
  if (latest.amount < 0) {
    latest.amount = 0;  }
  pushToDb(latest);
}

function rename() {
  var person = prompt("Nové jméno", "");

  if (person == null || person == "") {
    return;
  } else {
    latest.name = person;
    location.href = "index.html?id=" + userid + "&name=" + latest.name;
    pushToDb(latest);
  }
}

function getParam(param) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  return url.searchParams.get(param);
}
