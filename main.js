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

  if (mes === 11) {
    const logoWrapper = document.querySelector('.navidad-wrapper');
    if (logoWrapper && !document.getElementById('gorrito-navidad-flotante')) {
      const gorrito = document.createElement('img');
      gorrito.src = 'https://cdn-icons-png.flaticon.com/512/744/744546.png';
      gorrito.id = 'gorrito-navidad-flotante';
      gorrito.alt = 'Gorrito de Navidad';
      logoWrapper.appendChild(gorrito);
    }

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
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  elementosAnimados.forEach(el => observer.observe(el));

  // 🔷 5. ANIMACIÓN DE RED DE DATOS (SYMMETRICAL VAULT CANVAS)
  const vaultCanvas = document.getElementById('vault-canvas');
  if (vaultCanvas) {
    const vCtx = vaultCanvas.getContext('2d');
    let vWidth = (vaultCanvas.width = vaultCanvas.offsetWidth);
    let vHeight = (vaultCanvas.height = vaultCanvas.offsetHeight);

    window.addEventListener('resize', () => {
      if (!vaultCanvas) return;
      vWidth = vaultCanvas.width = vaultCanvas.offsetWidth;
      vHeight = vaultCanvas.height = vaultCanvas.offsetHeight;
    });

    const nodes = Array.from({ length: 35 }, () => ({
      x: Math.random() * vWidth,
      y: Math.random() * vHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1
    }));

    function drawVaultNodes() {
      vCtx.clearRect(0, 0, vWidth, vHeight);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            vCtx.beginPath();
            vCtx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 110 * 0.8})`;
            vCtx.lineWidth = 0.6;
            vCtx.moveTo(nodes[i].x, nodes[i].y);
            vCtx.lineTo(nodes[j].x, nodes[j].y);
            vCtx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        vCtx.beginPath();
        vCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        vCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        vCtx.fill();

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > vWidth) node.vx *= -1;
        if (node.y < 0 || node.y > vHeight) node.vy *= -1;
      });

      requestAnimationFrame(drawVaultNodes);
    }

    drawVaultNodes();
  }

  // 🔷 6. CONTROL DEL MODAL Y FORMULARIO DE SYMMETRICAL VAULT
  const openModalBtn = document.getElementById('open-vault-modal');
  const closeModalBtn = document.getElementById('close-vault-modal');
  const modal = document.getElementById('vault-modal');
  const checkoutForm = document.getElementById('vault-checkout-form');

  // Enlaces de Pago de Mercado Pago según el valor seleccionado (data-value "1", "2", "3")
  const PLAN_LINKS = {
    '1': 'https://mpago.li/1FTESnN',
    '2': 'https://mpago.li/1FTESnN',
    '3': 'https://mpago.li/1FTESnN'
  };

  // Abrir modal
  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  }

  // Cerrar modal al dar clic a la X
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Cerrar modal al presionar fuera de la ventana
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Captura de datos y redirección a la pasarela de pagos
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('vault-name').value;
      const email = document.getElementById('vault-email').value;
      const telefono = document.getElementById('vault-phone').value;
      
      // ✅ CORREGIDO: Se obtiene el valor del input hidden correspondiente
      const planInput = document.getElementById('input-plan-hidden');
      const planSeleccionado = planInput ? planInput.value : '';

      console.log('Datos Capturados:', { nombre, email, telefono, planSeleccionado });

      // Redireccionar al link del plan correspondiente (o a uno por defecto)
      const targetUrl = PLAN_LINKS[planSeleccionado] || 'https://mpago.li/1FTESnN';
      window.location.href = targetUrl;
    });
  }

  // Lógica para abrir/cerrar el dropdown personalizado
  const dropdown = document.getElementById('dropdown-planes');
  if (dropdown) {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const items = dropdown.querySelectorAll('.dropdown-item');
    const selectedSpan = document.getElementById('selected-plan');
    const hiddenInput = document.getElementById('input-plan-hidden');

    if (trigger) {
      trigger.addEventListener('click', () => {
        dropdown.classList.toggle('open');
      });
    }

    items.forEach(item => {
      item.addEventListener('click', () => {
        if (selectedSpan) selectedSpan.textContent = item.textContent;
        if (hiddenInput) hiddenInput.value = item.dataset.value;
        dropdown.classList.remove('open');
      });
    });

    // Cerrar si hace clic afuera
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
});