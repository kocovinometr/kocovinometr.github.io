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
let latest = {}, isqrshow = false;

const dbref = firebase.database().ref('users');
dbref.on('value', function(snapshot) {
  latest = snapshot.val();
  refresh(latest);
});

document.onclick = function() {
  if (isqrshow) {
    document.body.classList.remove("qr");
    isqrshow = false;
  } else {
    document.body.classList.add("qr");
    isqrshow = true;
  }
}

function generateHTML(data, ismain) {
  let html = "",
    top = 0,
    json = [];

  for (var player in data) {

    if (player != "example") {
      var player = data[player];
      json.push({
        name: player.name,
        amount: player.amount
      });
    }
  }

  json.sort(function(a, b) {
    return b.amount - a.amount;
  });

  json.forEach(function(player) {
    if (player.amount > top) {
      top = player.amount;
    }
  });

  json.forEach(function(player) {
    if (player.amount == top) {
      var topstring = "👑";
    } else {
      topstring = Math.round(player.amount / top * 100) + "%";
    }
    html += `<div class="mdc-card mdc-card--outlined player">
        <div class="mdc-typography--headline6 top">${topstring}</div>
        <div class="mdc-typography--headline4 name">${player.name}</div>
        <div class="mdc-typography--headline5 amount">${player.amount}</div>
      </div>`;
  });




  console.log(top);

  // return generated HTML
  return html;
}

function refresh(json) {
  document.getElementById("board-main").innerHTML = generateHTML(json);
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
}

function rename() {
  var person = prompt("Nové jméno", "");

  if (person == null || person == "") {
    return;
  } else {
    latest.name = person;
    pushToDb(latest);
  }
}

function getParam(param) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  return url.searchParams.get(param);
}
