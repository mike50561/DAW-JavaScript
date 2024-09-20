const darkModeButton = document.getElementById('darklight');
const divBackground = document.getElementById('body');
const colorFont = document.querySelectorAll('h1, h2, p, a');

// Verificar el estado del modo oscuro en el Local Storage
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Función para habilitar el modo oscuro
function enableDarkMode() {
  divBackground.classList.add('dark-mode');
  colorFont.forEach(element => {
    element.style.color = '#6FDC3D';
  });
  darkModeButton.style.background = '#6FDC3D';
  darkModeButton.style.color = "white";
  darkModeButton.value = "●     ";
}

// Función para deshabilitar el modo oscuro
function disableDarkMode() {
  divBackground.classList.remove('dark-mode');
  colorFont.forEach(element => {
    element.style.color = '#8104ef';
  });
  darkModeButton.style.background = '#8104ef';
  darkModeButton.style.color = "white";
  darkModeButton.value = "     ●";
}

// Aplicar el modo oscuro según el estado almacenado
if (isDarkMode) {
  enableDarkMode();
} else {
  disableDarkMode();
}

darkModeButton.addEventListener('click', () => {
  if (!isDarkMode) {
    enableDarkMode();
    isDarkMode = true;
    localStorage.setItem('darkMode', 'true'); // Guardar el estado en Local Storage
    console.log('Modo oscuro activado');
  } else {
    disableDarkMode();
    isDarkMode = false;
    localStorage.setItem('darkMode', 'false'); // Guardar el estado en Local Storage
    console.log('Modo oscuro desactivado');
  }
});
