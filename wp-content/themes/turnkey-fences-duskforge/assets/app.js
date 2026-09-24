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
})();
