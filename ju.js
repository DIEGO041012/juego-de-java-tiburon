document.addEventListener('DOMContentLoaded', () => {
    const pacman = document.getElementById('pacman');
    const ghost1 = document.getElementById('ghost1');
    // Otros elementos y lógica del juego aquí
  });
  document.addEventListener('DOMContentLoaded', () => {
    const pacman = document.getElementById('pacman');
    const ghost1 = document.getElementById('ghost1');
    const dots = document.querySelectorAll('.dot');
    
    // Posiciones iniciales de Pac-Man y los fantasmas
    let pacmanX = 270;
    let pacmanY = 180;
    let ghostX = 100;
    let ghostY = 100;
  
    // Manejo del movimiento de Pac-Man
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        pacmanY -= 10;
      } else if (event.key === 'ArrowDown') {
        pacmanY += 10;
      } else if (event.key === 'ArrowLeft') {
        pacmanX -= 10;
      } else if (event.key === 'ArrowRight') {
        pacmanX += 10;
      }
      
      // Actualizar la posición de Pac-Man en la pantalla
      pacman.style.top = pacmanY + 'px';
      pacman.style.left = pacmanX + 'px';
    });
  
    // Movimiento aleatorio de un fantasma
    setInterval(() => {
      const randomX = Math.floor(Math.random() * 10) - 5;
      const randomY = Math.floor(Math.random() * 10) - 5;
      
      ghostX += randomX;
      ghostY += randomY;
      
      // Actualizar la posición del fantasma en la pantalla
      ghost1.style.top = ghostY + 'px';
      ghost1.style.left = ghostX + 'px';
    }, 1000); // Cambia el valor para ajustar la velocidad
  
    // Verificar colisiones con puntos
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        dot.style.display = 'none'; // Oculta el punto al ser recolectado
        // Agrega lógica de puntuación aquí
      });
    });
  });
    