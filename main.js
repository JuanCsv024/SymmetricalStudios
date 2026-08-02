// 🔷 IMPORTACIÓN DE FIREBASE
import { db } from './firebase-config.js';
import { collection, addDoc, doc, getDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import campana from "./assets/campanaos.png";

document.addEventListener('DOMContentLoaded', () => {
  
  // 🔷 1. LÓGICA DE PESTAÑAS (Tabs)
  const buttons = document.querySelectorAll('.tab-glow-btn');
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

  // 🔷 6. CONTROL DEL MODAL Y DROPDOWN
  const openModalBtn = document.getElementById('open-vault-modal');
  const closeModalBtn = document.getElementById('close-vault-modal');
  const modal = document.getElementById('vault-modal');
  const checkoutForm = document.getElementById('vault-checkout-form');

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Dropdown personalizado
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

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  // 🔷 7. CONSULTAR PLAN EN FIREBASE, GUARDAR USUARIO Y REDIRECCIONAR
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      const nombre = document.getElementById('vault-name').value.trim();
      const email = document.getElementById('vault-email').value.trim();
      const telefono = document.getElementById('vault-phone').value.trim();
      const planInput = document.getElementById('input-plan-hidden');
      const planSeleccionado = planInput ? planInput.value : '';

      if (!planSeleccionado) {
        alert('Por favor selecciona un plan antes de continuar, mi hermano.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'PROCESANDO REGISTRO...';
      }

      try {
        const planRef = doc(db, 'planes_vault', planSeleccionado);
        const planSnap = await getDoc(planRef);

        let linkMercadoPago = '';
        let nombrePlan = '';

        if (planSnap.exists()) {
          const planData = planSnap.data();
          linkMercadoPago = planData.link;
          nombrePlan = planData.nombre;
        } else {
          alert('No se encontró la configuración del plan en Firebase.');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'PAGAR CON MERCADO PAGO';
          }
          return;
        }

        await addDoc(collection(db, 'usuarios_vault'), {
          nombre: nombre,
          email: email,
          telefono: telefono,
          planId: planSeleccionado,
          planNombre: nombrePlan,
          fechaRegistro: serverTimestamp(),
          estadoPago: 'Pendiente'
        });

        console.log('¡Usuario registrado con éxito en Firebase!');

        if (linkMercadoPago) {
          window.location.href = linkMercadoPago;
        } else {
          alert('El enlace de pago no está disponible en este momento.');
        }

      } catch (error) {
        console.error('Error en Firebase:', error);
        alert('Hubo un error guardando tus datos. Revisa la consola o tu conexión.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'PAGAR CON MERCADO PAGO';
        }
      }
    });
  }

  // 🔷 8. ANIMACIÓN DE OCULTAR TEXTO WHATSAPP AL HACER SCROLL
  const waPill = document.querySelector('.whatsapp-pill-float');
  let isScrollingTimer = null;

  if (waPill) {
    window.addEventListener('scroll', () => {
      waPill.classList.add('scrolling');
      clearTimeout(isScrollingTimer);

      isScrollingTimer = setTimeout(() => {
        waPill.classList.remove('scrolling');
      }, 500);
    }, { passive: true });
  }

  // 🔷 9. NAVEGACIÓN Y SMOOTH SCROLL CON OFFSET DE HEADER
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 🔷 10. CANVAS DE SYMMETRICAL CLOUD (SILUETA DINÁMICA MULTI-NUBE Y FLOTACIÓN CONTINUA)
 // 🔷 10. SECUENCIA DINÁMICA DEL TÍTULO SYMMETRICAL CLOUD
  const dynamicWord = document.getElementById('dynamic-cloud-word');

  if (dynamicWord) {
    const sequence = [
      'Fotografias',
      ' Videos',
      ' Documentos',
      ' Correos',
      '¡Y mucho mas en un solo lugar!'
    ];

    let step = 0;

    function runCloudSequence() {
      dynamicWord.classList.add('fade-out');

      setTimeout(() => {
        step = (step + 1) % sequence.length;
        dynamicWord.innerHTML = sequence[step];

        if (sequence[step] === 'Cloud') {
          dynamicWord.classList.add('highlight-cloud');
        } else {
          dynamicWord.classList.remove('highlight-cloud');
        }

        dynamicWord.classList.remove('fade-out');
        dynamicWord.classList.add('fade-in');

        setTimeout(() => {
          dynamicWord.classList.remove('fade-in');
        }, 50);

      }, 400);
    }

    setInterval(runCloudSequence, 2200);
  }
}); // <-- AQUÍ CIERRA EL DOMContentLoaded PRINCIPAL DEL ARCHIVO

// 🔷 11. ENVÍO DE FORMSPREE VÍA AJAX (COMPATIBLE CON VITE)
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // ¡Frena la redirección a Formspree!

      const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
      const originalBtnText = submitBtn ? (submitBtn.innerText || submitBtn.value) : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtn.tagName === 'INPUT') {
          submitBtn.value = 'Enviando...';
        } else {
          submitBtn.innerText = 'Enviando...';
        }
      }

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          showNotification("¡Mensaje enviado con éxito! Pronto nos pondremos en contacto.", "success");
        } else {
          showNotification("Uy, ocurrió un problema al enviar el mensaje. Intenta de nuevo.", "error");
        }
      } catch (error) {
        showNotification("Error de conexión. Revisa tu internet e intenta de nuevo.", "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtn.tagName === 'INPUT') {
            submitBtn.value = originalBtnText;
          } else {
            submitBtn.innerText = originalBtnText;
          }
        }
      }
    });
  }
  function showNotification(message, type = "success") {
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) existingToast.remove();
const toast = document.createElement("div");
toast.className = `toast-notification ${type}`;

toast.innerHTML = `
<div class="toast-content">
    <img src="${campana}" class="toast-bell-icon" alt="Campana">
    <span class="toast-message">${message}</span>
</div>
`;
 
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}