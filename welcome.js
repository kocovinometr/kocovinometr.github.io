const nameTextField = new mdc.textField.MDCTextField(document.getElementById("welcome-jmeno"));

document.getElementById("welcome-submit").onclick = function() {
  if (nameTextField.value) {
    location.href = "app/register.html?name=" + nameTextField.value;
  }
}

var addRipples = true;
  if (addRipples) {
    document.querySelectorAll(".mdc-button, .mdc-fab").forEach(function(elem) {
      new mdc.ripple.MDCRipple(elem);
    });
  }
