// Consent for Google Tag Manager / Google Analytics on this marketing website.
// Nothing from Google is loaded before the visitor clicks "Akzeptieren". The choice is kept in localStorage.
(function () {
  var GTM_ID = 'GTM-MM4DTJRC', KEY = 'regelfit-consent';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function loadGtm() {
    if (window.__gtmLoaded) return; window.__gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }
  function clearCookies() {
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^_ga|^_gid|^_gat|^_gcl/.test(name)) return;
      var host = location.hostname, base = host.split('.').slice(-2).join('.');
      [host, '.' + host, '.' + base].forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
      });
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    });
  }
  function banner() {
    if (document.getElementById('consent')) return;
    var box = el('div', 'consent'); box.id = 'consent'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Cookie-Einstellungen');
    box.appendChild(el('b', null, 'Dürfen wir mitzählen?'));
    var p = el('p', null, 'Mit Ihrer Einwilligung nutzen wir den Google Tag Manager und Google Analytics (Google Ireland Limited), um zu sehen, wie diese Website besucht wird. Dabei werden Cookies gesetzt und Daten wie Ihre IP-Adresse, Geräteangaben und aufgerufene Seiten an Google übermittelt und auch in den USA verarbeitet. Google kann die Daten auch für eigene Zwecke nutzen.');
    box.appendChild(p);
    var p2 = el('p', null, 'Die Einwilligung ist freiwillig. Sie können sie jederzeit über „Cookie-Einstellungen“ am Seitenende widerrufen. Die Tests und die Daten Ihrer Mitarbeiter sind nicht betroffen. ');
    var a = el('a', null, 'Datenschutzerklärung'); a.href = 'datenschutz.html'; p2.appendChild(a);
    p2.appendChild(document.createTextNode(' · '));
    var a2 = el('a', null, 'Impressum'); a2.href = 'impressum.html'; p2.appendChild(a2);
    box.appendChild(p2);
    var row = el('div', 'consent-row');
    var no = el('button', 'btn', 'Ablehnen'); no.type = 'button';
    var yes = el('button', 'btn', 'Akzeptieren'); yes.type = 'button';
    no.onclick = function () { var had = get() === 'yes'; set('no'); box.remove(); if (had) { clearCookies(); location.reload(); } };
    yes.onclick = function () { set('yes'); box.remove(); loadGtm(); };
    row.appendChild(no); row.appendChild(yes); box.appendChild(row);
    document.body.appendChild(box);
  }
  function footerLink() {
    var nav = document.querySelector('footer nav'); if (!nav) return;
    var a = el('a', null, 'Cookie-Einstellungen'); a.href = '#'; a.onclick = function (e) { e.preventDefault(); banner(); };
    nav.appendChild(a);
  }
  function init() { footerLink(); var c = get(); if (c === 'yes') loadGtm(); else if (c !== 'no') banner(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
