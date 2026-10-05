(function () {
	var toggle = document.getElementById('tkfToggle');
	var panel  = document.getElementById('tkfChat');
	var close  = document.getElementById('tkfClose');
	var form   = document.getElementById('tkfForm');
	var input  = document.getElementById('tkfInput');
	var body   = document.getElementById('tkfBody');
	var toTop  = document.getElementById('tkfTop');

	function openChat() {
		if (!panel) return;
		panel.hidden = false;
		toggle.setAttribute('aria-expanded', 'true');
		if (input) input.focus();
	}
	function closeChat() {
		if (!panel) return;
		panel.hidden = true;
		toggle.setAttribute('aria-expanded', 'false');
	}
	if (toggle) toggle.addEventListener('click', function () {
		panel.hidden ? openChat() : closeChat();
	});
	if (close) close.addEventListener('click', closeChat);

	function addMsg(text, who) {
		if (!body) return;
		var d = document.createElement('div');
		d.className = 'tkf-msg ' + who;
		d.textContent = text;
		body.appendChild(d);
		body.scrollTop = body.scrollHeight;
	}
	function botReply() {
		setTimeout(function () {
			addMsg('Thanks! The quickest way to get help is a call — dial 504-380-9681 and our team will take care of you. You can also request a free estimate any time.', 'bot');
		}, 600);
	}
	if (form) form.addEventListener('submit', function (e) {
		e.preventDefault();
		var v = input.value.trim();
		if (!v) return;
		addMsg(v, 'user');
		input.value = '';
		botReply();
	});
	Array.prototype.forEach.call(document.querySelectorAll('.tkf-qr'), function (b) {
		b.addEventListener('click', function () {
			addMsg(b.textContent, 'user');
			botReply();
		});
	});

	// Back-to-top: appears after scrolling
	function onScroll() {
		if (!toTop) return;
		if (window.pageYOffset > 500) { toTop.classList.add('show'); }
		else { toTop.classList.remove('show'); }
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
	if (toTop) toTop.addEventListener('click', function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	// Mobile navigation: hamburger + submenu accordions
	var nav = document.querySelector('nav.mainnav');
	var navToggle = nav ? nav.querySelector('.navtoggle') : null;
	if (nav && navToggle) {
		navToggle.addEventListener('click', function () {
			var open = nav.classList.toggle('open');
			navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			if (!open) {
				Array.prototype.forEach.call(nav.querySelectorAll('li.has.open'), function (li) {
					li.classList.remove('open');
				});
			}
		});

		// Submenu toggles (mobile). The +/- button expands its parent <li>.
		Array.prototype.forEach.call(nav.querySelectorAll('.subtog'), function (btn) {
			btn.addEventListener('click', function (e) {
				e.preventDefault();
				var li = btn.closest('li.has');
				if (li) li.classList.toggle('open');
			});
		});

		// Close the drawer after tapping any real link (leaf links / same-page anchors)
		Array.prototype.forEach.call(nav.querySelectorAll('.links a'), function (a) {
			a.addEventListener('click', function () {
				if (nav.classList.contains('open')) {
					nav.classList.remove('open');
					navToggle.setAttribute('aria-expanded', 'false');
				}
			});
		});
	}

	// Pinned orange nav bar on scroll (desktop only; mobile keeps its drawer)
	var heroNav = document.querySelector('.hero nav.mainnav');
	if (heroNav) {
		var pin = document.createElement('div');
		pin.className = 'pinbar';
		var pw = document.createElement('div');
		pw.className = 'wrap';
		pw.innerHTML = heroNav.innerHTML;
		Array.prototype.forEach.call(pw.querySelectorAll('[id]'), function (el) { el.removeAttribute('id'); });
		pin.appendChild(pw);
		document.body.appendChild(pin);
		var navBottom = heroNav.getBoundingClientRect().bottom + window.pageYOffset;
		var onPin = function () {
			if (window.pageYOffset > navBottom + 4) { pin.classList.add('show'); }
			else { pin.classList.remove('show'); }
		};
		window.addEventListener('scroll', onPin, { passive: true });
		window.addEventListener('resize', function () {
			navBottom = heroNav.getBoundingClientRect().bottom + window.pageYOffset;
			onPin();
		});
		onPin();
	}

	// Fence Types never-ending carousel — clone cards + JS auto-scroll (works with reduced-motion)
	var track = document.getElementById('typesTrack');
	if (track && !track.dataset.cloned) {
		Array.prototype.slice.call(track.children).forEach(function (c) {
			var clone = c.cloneNode(true);
			clone.setAttribute('aria-hidden', 'true');
			track.appendChild(clone);
		});
		track.dataset.cloned = '1';

		var paused = false, half = 0;
		var wrap = track.closest('.typescar') || track;
		wrap.addEventListener('mouseenter', function () { paused = true; });
		wrap.addEventListener('mouseleave', function () { paused = false; });
		function loop() {
			if (!half) { half = track.scrollWidth / 2; }
			if (!paused && half > 0) {
				track.scrollLeft += 0.6;
				if (track.scrollLeft >= half) { track.scrollLeft -= half; }
			}
			requestAnimationFrame(loop);
		}
		requestAnimationFrame(loop);
	}
})();
