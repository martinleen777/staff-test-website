// Sample test (training mode). Runs only in the browser: nothing is stored or sent anywhere.
(function () {
  var Q = [
    { q: 'Ab welchem Alter darf eine Person die Spielhalle betreten?',
      o: ['Ab 18 Jahren', 'Ab 16 Jahren', 'Ab 16 Jahren in Begleitung eines Erwachsenen', 'Ab 21 Jahren'],
      e: 'Personen unter 18 Jahren dürfen sich in einer Spielhalle nicht aufhalten – auch nicht in Begleitung und auch nicht, ohne zu spielen.',
      s: '§ 6 Abs. 1 JuSchG', crit: true },
    { q: 'Ein Stammgast, den Sie seit Jahren kennen, kommt herein. Was gilt?',
      o: ['Ausweis zeigen lassen und in OASIS abfragen – wie bei jedem Gast', 'Keine Kontrolle nötig, ich kenne ihn', 'Nur das Alter prüfen, OASIS ist nicht nötig', 'Einmal im Monat in OASIS abfragen genügt'],
      e: 'Jeder Gast wird bei jedem Betreten in der Sperrdatei OASIS abgefragt – auch Stammgäste und auch nach kurzem Verlassen der Halle.',
      s: '§ 8 Abs. 3 GlüStV 2021', crit: true },
    { q: 'Das Internet ist ausgefallen, OASIS funktioniert nicht. Ein Gast möchte hinein. Was tun Sie?',
      o: ['Ich lasse keine Gäste mehr hinein, bis OASIS wieder funktioniert.', 'Ich lasse ihn hinein und prüfe ihn später.', 'Ich prüfe nur das Alter und lasse ihn hinein.', 'Ich notiere seine Daten und lasse ihn hinein.'],
      e: 'Ohne Sperrabfrage kein Einlass: Kann OASIS nicht abgefragt werden, dürfen keine Gäste mehr hinein – auch keine Stammgäste.',
      s: '§ 8 Abs. 3 GlüStV 2021', crit: true },
    { q: 'Ein Gast bittet Sie, ihm bis morgen 50 € zu leihen. Was tun Sie?',
      o: ['Ich lehne ab. Kredit an Gäste ist verboten.', 'Ich leihe ihm das Geld aus der Kasse und notiere es.', 'Ich leihe es ihm aus eigener Tasche.', 'Ich leihe es ihm gegen ein Pfand.'],
      e: 'Kredit oder Pfand an Gäste ist dem Personal verboten – egal ob aus der Kasse oder aus eigener Tasche.',
      s: 'Dienstanweisung des Betriebs', crit: false }
  ];
  var root = document.getElementById('quiz'); if (!root) return;
  var i = -1, right = 0;
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function shuffle(a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; }
  function start() {
    var b = el('button', 'btn', 'Test starten'); b.type = 'button'; b.onclick = next; root.appendChild(b);
  }
  function next() { i++; if (i >= Q.length) return result(); show(Q[i]); }
  function show(x) {
    root.textContent = '';
    root.appendChild(el('p', 'qmeta', 'Frage ' + (i + 1) + ' von ' + Q.length + (x.crit ? ' · kritisch' : '')));
    var bar = el('div', 'qbar'); var fill = el('span'); fill.style.width = (i / Q.length * 100) + '%'; bar.appendChild(fill); root.appendChild(bar);
    var h = el('h1', 'qtext', x.q); h.tabIndex = -1; root.appendChild(h);
    var opts = shuffle(x.o.map(function (t, k) { return { t: t, ok: k === 0 }; }));
    var box = el('div', 'opts'); var done = false;
    opts.forEach(function (o) {
      var b = el('button', 'opt', o.t); b.type = 'button';
      b.onclick = function () {
        if (done) return; done = true; if (o.ok) right++;
        Array.prototype.forEach.call(box.children, function (c, k) { c.disabled = true; if (opts[k].ok) c.classList.add('right'); });
        if (!o.ok) b.classList.add('wrong');
        var fb = el('div', 'fb ' + (o.ok ? 'good' : 'bad'));
        fb.appendChild(el('b', null, o.ok ? 'Richtig.' : 'Leider falsch.'));
        fb.appendChild(el('p', null, x.e));
        fb.appendChild(el('p', 'src', 'Quelle: ' + x.s));
        root.appendChild(fb);
        var n = el('button', 'btn', i + 1 < Q.length ? 'Weiter' : 'Ergebnis ansehen'); n.type = 'button'; n.onclick = next; root.appendChild(n); n.focus();
      };
      box.appendChild(b);
    });
    root.appendChild(box); window.scrollTo(0, 0);
  }
  function result() {
    root.textContent = '';
    root.appendChild(el('p', 'eyebrow', 'Ihr Ergebnis'));
    root.appendChild(el('h1', null, right + ' von ' + Q.length + ' richtig.'));
    root.appendChild(el('p', 'lead', 'Im echten Test sind es 30 Fragen. Bestanden ist ab 90 % – und nur ohne Fehler bei kritischen Fragen. Sie sehen im Kabinett, wer bestanden hat.'));
    var c = el('div', 'cta');
    var a = el('a', 'btn', 'Demo anfragen'); a.href = 'index.html#kontakt'; c.appendChild(a);
    var r = el('button', 'btn ghost', 'Noch einmal'); r.type = 'button'; r.onclick = function () { i = -1; right = 0; next(); }; c.appendChild(r);
    root.appendChild(c); window.scrollTo(0, 0);
  }
  start();
})();
