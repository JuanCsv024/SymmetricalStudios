document.addEventListener('DOMContentLoaded', () => {
  
  // 🔷 1. LÓGICA DE PESTAÑAS (Tabs)
  const buttons = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      if (contents[index]) {
        contents[index].classList.add('active');
      }
    });
  });

  // 🔷 2. MENÚ MÓVIL TOGGLE
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav ul');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 🔷 3. AUTOMATIZACIÓN DE DICIEMBRE (Gorrito enganchado al logo + Nieve) 
  const hoy = new Date();
  const mes = hoy.getMonth(); // 11 es Diciembre

  // Para probarlo HOY cambias (mes === 11) por (true)
  if (mes === 11) {
    
    // Meter el gorrito DENTRO del contenedor del logo para que no flote suelto ni baje solo
    const logoWrapper = document.querySelector('.navidad-wrapper');
    if (logoWrapper && !document.getElementById('gorrito-navidad-flotante')) {
      const gorrito = document.createElement('img');
      gorrito.src = 'https://cdn-icons-png.flaticon.com/512/744/744546.png';
      gorrito.id = 'gorrito-navidad-flotante';
      gorrito.alt = 'Gorrito de Navidad';
      logoWrapper.appendChild(gorrito);
    }

    // Efecto Nieve
    const canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    document.body.appendChild(canvas);

    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '99999'
    });

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const flakes = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      d: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.7 + 0.3
    }));

    function drawSnow() {
      ctx.clearRect(0, 0, width, height);

      flakes.forEach(f => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();

        f.y += f.d;
        f.x += Math.sin(f.y / 30) * 0.5;

        if (f.y > height) {
          f.y = -10;
          f.x = Math.random() * width;
        }
      });

      requestAnimationFrame(drawSnow);
    }

    drawSnow();
  }

  // 🔷 4. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
  const elementosAnimados = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Remueve la clase al salir de pantalla para repetir la animación al subir/bajar
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  elementosAnimados.forEach(el => observer.observe(el));

});