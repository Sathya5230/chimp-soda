/**
 * CHIMP SODA - INTERACTIVE APPLICATION CORE
 * Unleash Your Primal Fizz
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA DEFINITIONS
  // =========================================================================
  const FLAVORS = {
    banana: {
      id: 'banana',
      code: 'PSYCHO BANANA',
      name: 'Psycho Banana Blitz',
      badge: '⚡ NOW FEATURING: PSYCHO BANANA',
      heroHeadline: 'PRIMAL FIZZ.',
      subtext: 'Creamy Cavendish banana purée meets electric sparkling citrus and crisp garden mint, supercharged with Lion\'s Mane for sustained creative flow.',
      image: 'assets/banana.jpg',
      price: 34.99,
      unitPrice: '$2.91/can',
      calories: '35 CAL',
      sugar: '4G SUGAR',
      fiber: '6G FIBER',
      adaptogen: 'Lion\'s Mane Fuel',
      stickerTop: { emoji: '🍌', title: 'Wild Infusion', text: 'Organic Banana & Mint' },
      stickerBottom: { emoji: '⚡', title: 'Cognitive Kick', text: 'Organic Lion\'s Mane Extract' },
      notes: ['Sweet Banana', 'Crisp Mint', 'Vanilla Cream']
    },
    berry: {
      id: 'berry',
      code: 'PRIMAL BERRY',
      name: 'Primal Berry Blast',
      badge: '🍓 WILD HARVEST: PRIMAL BERRY',
      heroHeadline: 'BERRY POWER.',
      subtext: 'Explosive wild mountain raspberries, crushed blackberries, and neon dragonfruit spiked with calming Ashwagandha to conquer daily chaos.',
      image: 'assets/berry.jpg',
      price: 34.99,
      unitPrice: '$2.91/can',
      calories: '30 CAL',
      sugar: '3G SUGAR',
      fiber: '6G FIBER',
      adaptogen: 'Ashwagandha Zen',
      stickerTop: { emoji: '🍓', title: 'Superfruit Rush', text: 'Raspberry & Dragonfruit' },
      stickerBottom: { emoji: '🧘', title: 'Stress Shield', text: 'Organic Ashwagandha Extract' },
      notes: ['Wild Raspberry', 'Dragonfruit', 'Blackberry Tart']
    },
    mango: {
      id: 'mango',
      code: 'MANGO GORILLA',
      name: 'Mango Gorilla Punch',
      badge: '🥭 TROPICAL POWER: MANGO GORILLA',
      heroHeadline: 'GORILLA MODE.',
      subtext: 'Succulent sun-drenched Alphonso mango and tangy passionfruit seeds with green tea polyphenols for clean, laser-sharp jungle clarity.',
      image: 'assets/mango.jpg',
      price: 34.99,
      unitPrice: '$2.91/can',
      calories: '35 CAL',
      sugar: '4G SUGAR',
      fiber: '6G FIBER',
      adaptogen: 'Green Tea Clarity',
      stickerTop: { emoji: '🥭', title: 'Pure Alphonso', text: 'Juicy Sun-Ripe Mango' },
      stickerBottom: { emoji: '🍵', title: 'Clarity Spark', text: 'Green Tea Polyphenols' },
      notes: ['Alphonso Mango', 'Passionfruit', 'Golden Fizz']
    },
    citrus: {
      id: 'citrus',
      code: 'ELECTRIC YUZU',
      name: 'Electric Yuzu Citrus',
      badge: '🍋 HIGH VOLTAGE: ELECTRIC YUZU',
      heroHeadline: 'PURE VOLTAGE.',
      subtext: 'High-voltage tart Japanese Yuzu, Persian lime, and cold-extracted lemon peel infused with Panax Ginseng vitality to power through slumps.',
      image: 'assets/citrus.jpg',
      price: 34.99,
      unitPrice: '$2.91/can',
      calories: '25 CAL',
      sugar: '2G SUGAR',
      fiber: '6G FIBER',
      adaptogen: 'Panax Ginseng',
      stickerTop: { emoji: '🍋', title: 'High Voltage', text: 'Japanese Yuzu & Lime' },
      stickerBottom: { emoji: '⚡', title: 'Vitality Boost', text: 'Red Panax Ginseng' },
      notes: ['Tart Yuzu', 'Persian Lime', 'Zesty Zing']
    },
    variety: {
      id: 'variety',
      code: 'JUNGLE VARIETY',
      name: 'Jungle Variety 12-Pack',
      badge: '👑 ULTIMATE PACK',
      image: 'assets/badge.jpg',
      price: 36.99,
      packDesc: '3x Banana, 3x Berry, 3x Mango, 3x Yuzu'
    }
  };

  let currentFlavor = 'banana';

  // =========================================================================
  // 2. PROCEDURAL WEB AUDIO SOUND ENGINE
  // =========================================================================
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Realistic can crack: metal tab click + pressurized gas hiss + effervescent fizz
  function playCanCrackSound() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    // 1. Metal Click / Pop Tab Snap (High metallic resonance impulse)
    const snapOsc = audioCtx.createOscillator();
    const snapGain = audioCtx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(2400, now);
    snapOsc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

    snapGain.gain.setValueAtTime(0.7, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    snapOsc.connect(snapGain);
    snapGain.connect(audioCtx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.07);

    // 2. High-pressure gas hiss (white noise burst)
    const bufferSize = audioCtx.sampleRate * 0.45;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // Bandpass filter for realistic aerosol fizz sound
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(4500, now);
    filter.Q.setValueAtTime(1.8, now);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.85, now + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    whiteNoise.start(now);

    // 3. Ambient sparkling bubbles oscillation
    for (let i = 0; i < 4; i++) {
      const bubbleOsc = audioCtx.createOscillator();
      const bubbleGain = audioCtx.createGain();
      const delay = 0.08 + Math.random() * 0.25;

      bubbleOsc.type = 'sine';
      const baseFreq = 700 + Math.random() * 800;
      bubbleOsc.frequency.setValueAtTime(baseFreq, now + delay);
      bubbleOsc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + delay + 0.06);

      bubbleGain.gain.setValueAtTime(0, now);
      bubbleGain.gain.setValueAtTime(0.25, now + delay);
      bubbleGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.07);

      bubbleOsc.connect(bubbleGain);
      bubbleGain.connect(audioCtx.destination);

      bubbleOsc.start(now + delay);
      bubbleOsc.stop(now + delay + 0.08);
    }
  }

  // Bubble pop / chirp sound
  function playBubblePopSound() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    const startFreq = 400 + Math.random() * 300;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.07);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Setup Sound Toggle Button
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundStatusText = document.getElementById('sound-status');

  if (soundToggleBtn) {
    soundToggleBtn.classList.add('active');
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        soundToggleBtn.classList.add('active');
        soundStatusText.textContent = 'Sound ON';
        playBubblePopSound();
      } else {
        soundToggleBtn.classList.remove('active');
        soundStatusText.textContent = 'Muted';
      }
    });
  }

  // "Crack a Can" hero button
  const crackBtn = document.getElementById('crack-sound-btn');
  if (crackBtn) {
    crackBtn.addEventListener('click', () => {
      playCanCrackSound();
      triggerHeroPopEffect();
    });
  }

  // =========================================================================
  // 3. INTERACTIVE FIZZY BUBBLE CANVAS ENGINE
  // =========================================================================
  const canvas = document.getElementById('bubble-canvas');
  let ctx = null;
  let bubbles = [];
  let sparks = [];
  let mouse = { x: -1000, y: -1000, active: false };
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;

  if (canvas && canvas.getContext) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Bubble {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.x = Math.random() * canvasWidth;
        this.y = isInitial ? Math.random() * canvasHeight : canvasHeight + 20 + Math.random() * 50;
        this.radius = Math.random() * 8 + 3;
        this.baseSpeed = Math.random() * 1.5 + 0.6;
        this.speedY = this.baseSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.04 + 0.01;
        this.wobbleAmp = Math.random() * 1.2 + 0.3;
        this.alpha = Math.random() * 0.35 + 0.15;
      }

      update() {
        this.angle += this.wobbleSpeed;
        this.y -= this.speedY;
        this.x += Math.sin(this.angle) * this.wobbleAmp;

        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.x += (dx / dist) * force * 4;
          this.y += (dy / dist) * force * 4;
        }

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner highlight gleam
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 1.6})`;
        ctx.fill();
        ctx.restore();
      }
    }

    class Spark {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const speed = Math.random() * 3 + 1.5;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1;
        this.decay = Math.random() * 0.04 + 0.03;
        this.radius = Math.random() * 3 + 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
        ctx.fill();
        ctx.restore();
      }
    }

    // Populate initial bubbles
    const bubbleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble(true));
    }

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw and update bubbles
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].draw();
      }

      // Draw and update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].life <= 0) {
          sparks.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Track mouse
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Click to pop nearest bubble
    window.addEventListener('click', (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      let popped = false;
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        const dist = Math.hypot(b.x - clickX, b.y - clickY);
        if (dist < b.radius + 30) {
          // Burst this bubble!
          for (let s = 0; s < 7; s++) {
            sparks.push(new Spark(b.x, b.y));
          }
          b.reset();
          popped = true;
          break;
        }
      }

      if (popped) {
        playBubblePopSound();
      }
    });

    // Burst sparks helper
    window.createBurstSparks = function (x, y, count = 15) {
      for (let i = 0; i < count; i++) {
        sparks.push(new Spark(x, y));
      }
    };
  }

  // Trigger celebratory fizz pop near hero can
  function triggerHeroPopEffect() {
    const heroCan = document.getElementById('hero-can-img');
    if (heroCan && window.createBurstSparks) {
      const rect = heroCan.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const topY = rect.top + rect.height * 0.15;
      window.createBurstSparks(centerX, topY, 25);
    }
  }

  // =========================================================================
  // 4. 3D INTERACTIVE GYROSCOPE/MOUSE PERSPECTIVE TILT
  // =========================================================================
  const tiltWrapper = document.getElementById('can-tilt-wrapper');
  const canStage = document.getElementById('can-stage');

  if (tiltWrapper && canStage) {
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isHovering = false;

    canStage.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    canStage.addEventListener('mousemove', (e) => {
      const rect = canStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      targetRotateY = normX * 18; // Max 18 deg
      targetRotateX = -normY * 18;
    });

    canStage.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
    });

    // Can click pops fizz sound & sparks
    tiltWrapper.addEventListener('click', () => {
      playCanCrackSound();
      triggerHeroPopEffect();
    });

    function updateTilt() {
      // Smooth interpolation
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;

      // Add gentle idle breathing motion when not hovering
      let idleOffsetY = 0;
      if (!isHovering) {
        const time = Date.now() * 0.0018;
        idleOffsetY = Math.sin(time) * 8;
      }

      tiltWrapper.style.transform = `translateY(${idleOffsetY}px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;

      requestAnimationFrame(updateTilt);
    }
    requestAnimationFrame(updateTilt);
  }

  // =========================================================================
  // 5. FLAVOR SWITCHER ENGINE
  // =========================================================================
  function setFlavor(flavorKey) {
    const data = FLAVORS[flavorKey];
    if (!data) return;

    currentFlavor = flavorKey;
    document.body.dataset.flavor = flavorKey;

    // Update active tab buttons
    document.querySelectorAll('.flavor-tab').forEach(tab => {
      const isSelected = tab.dataset.flavor === flavorKey;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Update Hero elements
    const heroBadgeText = document.getElementById('hero-badge-text');
    if (heroBadgeText) heroBadgeText.textContent = data.badge;

    const heroTitleFlavor = document.getElementById('hero-title-flavor');
    if (heroTitleFlavor) heroTitleFlavor.textContent = data.heroHeadline;

    const heroSubtext = document.getElementById('hero-subtext');
    if (heroSubtext) heroSubtext.textContent = data.subtext;

    const heroCanImg = document.getElementById('hero-can-img');
    if (heroCanImg) {
      heroCanImg.style.opacity = '0';
      setTimeout(() => {
        heroCanImg.src = data.image;
        heroCanImg.style.opacity = '1';
      }, 150);
    }

    const stickerTopText = document.getElementById('sticker-top-text');
    const stickerTop = document.getElementById('sticker-top');
    if (stickerTopText && data.stickerTop) {
      stickerTopText.textContent = data.stickerTop.text;
      if (stickerTop) stickerTop.querySelector('.sticker-emoji').textContent = data.stickerTop.emoji;
      if (stickerTop) stickerTop.querySelector('strong').textContent = data.stickerTop.title;
    }

    const stickerBottomText = document.getElementById('sticker-bottom-text');
    const stickerBottom = document.getElementById('sticker-bottom');
    if (stickerBottomText && data.stickerBottom) {
      stickerBottomText.textContent = data.stickerBottom.text;
      if (stickerBottom) stickerBottom.querySelector('.sticker-emoji').textContent = data.stickerBottom.emoji;
      if (stickerBottom) stickerBottom.querySelector('strong').textContent = data.stickerBottom.title;
    }

    // Play bubble pop sound
    playBubblePopSound();
  }

  // Bind flavor tabs
  document.querySelectorAll('.flavor-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const flavor = tab.dataset.flavor;
      if (flavor) setFlavor(flavor);
    });
  });

  // Bind footer flavor links
  document.querySelectorAll('.footer-flavor-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const flavor = link.dataset.flavor;
      if (flavor) {
        setFlavor(flavor);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 6. CART DRAWER & COMMERCE LOGIC
  // =========================================================================
  let cart = [
    {
      id: 'banana',
      name: 'Psycho Banana Blitz',
      flavor: 'banana',
      pack: '12-Pack (12 Fl Oz)',
      price: 34.99,
      qty: 1,
      image: 'assets/banana.jpg'
    }
  ];

  let appliedDiscount = 0; // 0.15 for 15% off
  const SHIPPING_THRESHOLD = 40.0;
  const STANDARD_SHIPPING = 5.99;

  const cartOverlay = document.getElementById('cart-overlay');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const navCartCount = document.getElementById('nav-cart-count');
  const cartHeaderCount = document.getElementById('cart-header-count');
  const cartItemsList = document.getElementById('cart-items-list');
  const emptyCartView = document.getElementById('empty-cart-view');

  const shippingMessage = document.getElementById('shipping-message');
  const shippingProgress = document.getElementById('shipping-progress');

  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDiscountEl = document.getElementById('cart-discount');
  const discountRow = document.getElementById('discount-row');
  const cartShippingEl = document.getElementById('cart-shipping');
  const cartTotalEl = document.getElementById('cart-total');

  function openCart() {
    if (cartOverlay) cartOverlay.classList.add('open');
    renderCart();
  }

  function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove('open');
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // Add Item to Cart
  function addToCart(flavorId) {
    const itemData = FLAVORS[flavorId];
    if (!itemData) return;

    const existingItem = cart.find(item => item.id === flavorId);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        id: itemData.id,
        name: itemData.name,
        flavor: itemData.id,
        pack: itemData.packDesc || '12-Pack (12 Fl Oz)',
        price: itemData.price,
        qty: 1,
        image: itemData.image
      });
    }

    playCanCrackSound();
    renderCart();
    openCart();
  }

  // Quick Add Buttons in Flavors Grid
  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const flavorId = btn.dataset.flavor;
      if (flavorId) addToCart(flavorId);
    });
  });

  // Hero Add to Cart
  const heroAddBtn = document.getElementById('hero-add-to-cart-btn');
  if (heroAddBtn) {
    heroAddBtn.addEventListener('click', () => {
      addToCart(currentFlavor);
    });
  }

  // Variety Pack button
  const varietyBtn = document.getElementById('variety-pack-btn');
  if (varietyBtn) {
    varietyBtn.addEventListener('click', () => {
      addToCart('variety');
    });
  }

  // Footer Variety link
  const footerVarietyLink = document.getElementById('footer-variety-link');
  if (footerVarietyLink) {
    footerVarietyLink.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart('variety');
    });
  }

  // Empty cart shop button
  const emptyCartShopBtn = document.getElementById('empty-cart-shop-btn');
  if (emptyCartShopBtn) {
    emptyCartShopBtn.addEventListener('click', () => {
      closeCart();
      const flavorsSection = document.getElementById('flavors');
      if (flavorsSection) {
        flavorsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Render Cart DOM
  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if (navCartCount) navCartCount.textContent = totalItems;
    if (cartHeaderCount) cartHeaderCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;

    if (cart.length === 0) {
      if (emptyCartView) emptyCartView.style.display = 'flex';
      // remove any previous items
      document.querySelectorAll('.cart-item-row').forEach(row => row.remove());
    } else {
      if (emptyCartView) emptyCartView.style.display = 'none';

      // Rebuild items
      const existingRows = document.querySelectorAll('.cart-item-row');
      existingRows.forEach(row => row.remove());

      cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            <div class="cart-item-pack">${item.pack}</div>
            <div class="cart-item-controls">
              <div class="qty-stepper">
                <button type="button" class="qty-btn dec-qty" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span class="qty-value">${item.qty}</span>
                <button type="button" class="qty-btn inc-qty" data-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>
              <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
            </div>
          </div>
        `;
        cartItemsList.appendChild(row);
      });

      // Bind quantity steppers
      document.querySelectorAll('.inc-qty').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const target = cart.find(i => i.id === id);
          if (target) {
            target.qty += 1;
            playBubblePopSound();
            renderCart();
          }
        });
      });

      document.querySelectorAll('.dec-qty').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const targetIndex = cart.findIndex(i => i.id === id);
          if (targetIndex > -1) {
            if (cart[targetIndex].qty > 1) {
              cart[targetIndex].qty -= 1;
            } else {
              cart.splice(targetIndex, 1);
            }
            playBubblePopSound();
            renderCart();
          }
        });
      });
    }

    // Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discountAmount = subtotal * appliedDiscount;
    const discountedSubtotal = subtotal - discountAmount;
    const isFreeShipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0;
    const shippingCost = isFreeShipping ? 0 : STANDARD_SHIPPING;
    const grandTotal = subtotal === 0 ? 0 : (discountedSubtotal + shippingCost);

    // Update Shipping bar
    if (subtotal >= SHIPPING_THRESHOLD) {
      if (shippingMessage) shippingMessage.innerHTML = '🎉 You unlocked <strong>FREE WILD SHIPPING!</strong>';
      if (shippingProgress) shippingProgress.style.width = '100%';
    } else {
      const remaining = (SHIPPING_THRESHOLD - subtotal).toFixed(2);
      const percent = Math.min(100, Math.round((subtotal / SHIPPING_THRESHOLD) * 100));
      if (shippingMessage) shippingMessage.innerHTML = `Add <strong>$${remaining}</strong> more for <strong>FREE WILD SHIPPING</strong> ⚡`;
      if (shippingProgress) shippingProgress.style.width = `${percent}%`;
    }

    // Update prices
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartDiscountEl) cartDiscountEl.textContent = `-$${discountAmount.toFixed(2)}`;
    if (discountRow) discountRow.style.display = appliedDiscount > 0 ? 'flex' : 'none';
    if (cartShippingEl) cartShippingEl.textContent = isFreeShipping ? 'FREE' : `$${STANDARD_SHIPPING.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
  }

  // Initial cart render
  renderCart();

  // Promo Code Handler
  const promoInput = document.getElementById('promo-input');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoFeedback = document.getElementById('promo-feedback');

  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'CHIMP15' || code === 'PRIMAL15') {
        appliedDiscount = 0.15;
        if (promoFeedback) {
          promoFeedback.style.color = '#10B981';
          promoFeedback.textContent = '🐒 Code CHIMP15 applied: 15% Troop discount activated!';
        }
        playBubblePopSound();
        renderCart();
      } else if (code === '') {
        if (promoFeedback) promoFeedback.textContent = '';
      } else {
        if (promoFeedback) {
          promoFeedback.style.color = '#F43F5E';
          promoFeedback.textContent = 'Invalid code. Try "CHIMP15"!';
        }
      }
    });
  }

  // Checkout Flow Simulation
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutDoneBtn = document.getElementById('checkout-done-btn');
  const checkoutSummaryBox = document.getElementById('checkout-summary-box');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your stash is empty! Pick a flavor first.');
        return;
      }
      closeCart();

      // Populate summary
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const discountAmount = subtotal * appliedDiscount;
      const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
      const grandTotal = subtotal - discountAmount + shippingCost;

      if (checkoutSummaryBox) {
        checkoutSummaryBox.innerHTML = `
          <strong>Order Reference:</strong> #CHIMP-${Math.floor(100000 + Math.random() * 900000)}<br>
          <strong>Total Paid:</strong> $${grandTotal.toFixed(2)} (${cart.reduce((s, i) => s + i.qty, 0)} Packs)<br>
          <strong>Status:</strong> Chilling on dry ice & departing jungle facility!
        `;
      }

      if (checkoutModal) checkoutModal.classList.add('open');
      playCanCrackSound();
      if (window.createBurstSparks) {
        window.createBurstSparks(window.innerWidth / 2, window.innerHeight / 2, 40);
      }
    });
  }

  if (checkoutDoneBtn && checkoutModal) {
    checkoutDoneBtn.addEventListener('click', () => {
      checkoutModal.classList.remove('open');
      // Reset cart
      cart = [];
      appliedDiscount = 0;
      renderCart();
    });
  }

  // =========================================================================
  // 7. INTERACTIVE FLAVOR QUIZ LOGIC
  // =========================================================================
  const quizModal = document.getElementById('quiz-modal');
  const quizTriggerBtn = document.getElementById('quiz-trigger-btn');
  const footerQuizLink = document.getElementById('footer-quiz-link');
  const quizCloseBtn = document.getElementById('quiz-close-btn');
  const quizProgress = document.getElementById('quiz-progress');
  const quizResultView = document.getElementById('quiz-result');
  const quizAddCartBtn = document.getElementById('quiz-add-cart-btn');
  const quizRetakeBtn = document.getElementById('quiz-retake-btn');

  let quizCurrentStep = 1;
  let quizVotes = { banana: 0, berry: 0, mango: 0, citrus: 0 };
  let winningFlavor = 'banana';

  function openQuiz() {
    resetQuiz();
    if (quizModal) quizModal.classList.add('open');
  }

  function closeQuiz() {
    if (quizModal) quizModal.classList.remove('open');
  }

  if (quizTriggerBtn) quizTriggerBtn.addEventListener('click', openQuiz);
  if (footerQuizLink) {
    footerQuizLink.addEventListener('click', (e) => {
      e.preventDefault();
      openQuiz();
    });
  }
  if (quizCloseBtn) quizCloseBtn.addEventListener('click', closeQuiz);
  if (quizModal) {
    quizModal.addEventListener('click', (e) => {
      if (e.target === quizModal) closeQuiz();
    });
  }

  function resetQuiz() {
    quizCurrentStep = 1;
    quizVotes = { banana: 0, berry: 0, mango: 0, citrus: 0 };
    if (quizResultView) quizResultView.style.display = 'none';

    document.querySelectorAll('.quiz-step').forEach(step => {
      step.classList.remove('active');
      if (parseInt(step.dataset.step, 10) === 1) {
        step.classList.add('active');
      }
    });

    if (quizProgress) quizProgress.style.width = '33%';
  }

  document.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const vote = btn.dataset.flavorVote;
      if (vote && quizVotes[vote] !== undefined) {
        quizVotes[vote] += 1;
      }
      playBubblePopSound();

      if (quizCurrentStep < 3) {
        // Go to next step
        const currentStepEl = document.querySelector(`.quiz-step[data-step="${quizCurrentStep}"]`);
        quizCurrentStep += 1;
        const nextStepEl = document.querySelector(`.quiz-step[data-step="${quizCurrentStep}"]`);

        if (currentStepEl) currentStepEl.classList.remove('active');
        if (nextStepEl) nextStepEl.classList.add('active');

        if (quizProgress) {
          quizProgress.style.width = `${(quizCurrentStep / 3) * 100}%`;
        }
      } else {
        // Show result
        showQuizResult();
      }
    });
  });

  function showQuizResult() {
    // Hide all steps
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));

    // Determine highest vote
    let highest = -1;
    winningFlavor = 'banana';
    for (const [flavor, score] of Object.entries(quizVotes)) {
      if (score > highest) {
        highest = score;
        winningFlavor = flavor;
      }
    }

    const matched = FLAVORS[winningFlavor];
    const quizResultImg = document.getElementById('quiz-result-img');
    const quizResultTitle = document.getElementById('quiz-result-title');
    const quizResultDesc = document.getElementById('quiz-result-desc');

    if (quizResultImg) quizResultImg.src = matched.image;
    if (quizResultTitle) quizResultTitle.textContent = matched.name;
    if (quizResultDesc) quizResultDesc.textContent = matched.subtext;

    if (quizProgress) quizProgress.style.width = '100%';
    if (quizResultView) quizResultView.style.display = 'block';

    setFlavor(winningFlavor);
  }

  if (quizAddCartBtn) {
    quizAddCartBtn.addEventListener('click', () => {
      addToCart(winningFlavor);
      closeQuiz();
    });
  }

  if (quizRetakeBtn) {
    quizRetakeBtn.addEventListener('click', resetQuiz);
  }

  // =========================================================================
  // 8. NEWSLETTER FORM
  // =========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (email) {
        newsletterEmail.value = '';
        if (newsletterFeedback) {
          newsletterFeedback.style.color = '#10B981';
          newsletterFeedback.innerHTML = '🐒 Welcome to the Troop! Use code <strong>CHIMP15</strong> for 15% off.';
        }
        playCanCrackSound();
      }
    });
  }

  // Global ESC key listener to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeQuiz();
      if (checkoutModal) checkoutModal.classList.remove('open');
    }
  });

  // Ensure Hero Video autoplays
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    heroVideo.play().catch(() => {
      // Browser autoplay policy might require interaction, already muted and playsinline
    });
  }

  console.log('🐒 Chimp Soda Engine initialized. Stay wild, stay fizzy!');
})();
