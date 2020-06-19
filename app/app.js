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
  userid = getParam("id");
let latest = {},
  logout = false;

var addRipples = true;
if (addRipples) {
  document.querySelectorAll(".mdc-button, .mdc-fab").forEach(function(elem) {
    new mdc.ripple.MDCRipple(elem);
  });
}

const snackbar = new mdc.snackbar.MDCSnackbar(document.getElementById("snackbar"));

const dbref = firebase.database().ref('users/' + userid);
dbref.on('value', function(snapshot) {
  latest = snapshot.val();
  refresh(latest);
});

function openSnack(text) {
  document.getElementById("snackbar").querySelector(".mdc-snackbar__label").innerHTML = text;
  snackbar.open();
}

document.getElementById("main-rename").onclick = function() {
  rename();
}

document.getElementById("main-logout").onclick = function() {
  logout = true;
  refresh();
}

function refresh(json) {
  if (json) {
    if (json.logout) {
      logout = true;
      firebase.database().ref('users/' + userid).remove();
    } else {
      document.getElementById("main-amount").innerHTML = json.amount;
      document.getElementById("main-username").innerHTML = json.name;
    }
  } else {
    if (logout) {
      firebase.database().ref('users/' + userid).remove();
      location.href = "../index.html";
    } else {
      location.href = "register.html?name=" + getParam("name");
    }
  }

}

function pushToDb(json) {
  firebase.database().ref('users/' + userid).set(json);
}

function updateDl(mod) {
  latest.amount += mod;
  if (latest.amount < 0) {
    latest.amount = 0;
  }
  pushToDb(latest);
  if (mod == 1) {
    openSnack("Přidejte, takto vás předběhnou!");
  }
  if (mod == 5) {
    openSnack("Páni, vy dneska válíte!");
  }
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
