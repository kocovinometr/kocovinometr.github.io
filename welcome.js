const nameTextField = new mdc.textField.MDCTextField(document.getElementById("welcome-jmeno"));

document.getElementById("welcome-submit").onclick = function() {
  if (nameTextField.value) {
    location.href = "app/register.html?name=" + nameTextField.value;
  }
}
