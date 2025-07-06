const form = document.getElementById('registroForm');
const submitBtn = document.getElementById('submitBtn');

const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const edadInput = document.getElementById('edad');

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.textContent = message;
  errorMessage.classList.add('visible');
  input.classList.remove('valid');
  input.classList.add('invalid');
}

function showValid(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.textContent = '';
  errorMessage.classList.remove('visible');
  input.classList.remove('invalid');
  input.classList.add('valid');
}

function validarNombre() {
  const valor = nombreInput.value.trim();
  if (valor.length < 3) {
    showError(nombreInput, 'El nombre debe tener al menos 3 caracteres.');
    return false;
  }
  showValid(nombreInput);
  return true;
}

function validarEmail() {
  const valor = emailInput.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(valor)) {
    showError(emailInput, 'Correo electrónico no válido.');
    return false;
  }
  showValid(emailInput);
  return true;
}

function validarPassword() {
  const valor = passwordInput.value;
  // mínimo 8 caracteres, al menos un número y un carácter especial
  const regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
  if (valor.length < 8) {
    showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres.');
    return false;
  }
  if (!regexPass.test(valor)) {
    showError(passwordInput, 'La contraseña debe incluir un número y un carácter especial.');
    return false;
  }
  showValid(passwordInput);
  return true;
}

function validarConfirmPassword() {
  if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value === '') {
    showError(confirmPasswordInput, 'Las contraseñas no coinciden.');
    return false;
  }
  showValid(confirmPasswordInput);
  return true;
}

function validarEdad() {
  const edad = parseInt(edadInput.value, 10);
  if (isNaN(edad) || edad < 18) {
    showError(edadInput, 'Debes ser mayor o igual a 18 años.');
    return false;
  }
  showValid(edadInput);
  return true;
}

function validarFormulario() {
  const nombreValido = validarNombre();
  const emailValido = validarEmail();
  const passwordValida = validarPassword();
  const confirmPassValida = validarConfirmPassword();
  const edadValida = validarEdad();

  const todoValido = nombreValido && emailValido && passwordValida && confirmPassValida && edadValida;
  submitBtn.disabled = !todoValido;
  return todoValido;
}

// Validación en tiempo real
nombreInput.addEventListener('input', validarFormulario);
emailInput.addEventListener('input', validarFormulario);
passwordInput.addEventListener('input', validarFormulario);
confirmPasswordInput.addEventListener('input', validarFormulario);
edadInput.addEventListener('input', validarFormulario);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validarFormulario()) {
    alert('Formulario enviado con éxito');
    form.reset();
    submitBtn.disabled = true;

    // Remover estilos después de resetear
    [nombreInput, emailInput, passwordInput, confirmPasswordInput, edadInput].forEach(input => {
      input.classList.remove('valid');
    });
  }
});

form.addEventListener('reset', function () {
  submitBtn.disabled = true;
  [nombreInput, emailInput, passwordInput, confirmPasswordInput, edadInput].forEach(input => {
    input.classList.remove('valid', 'invalid');
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
    errorMessage.classList.remove('visible');
  });
});