window.xCodeExampleSourceHead =
'  <script src="https://cdn.vaadin.com/vaadin-elements/latest/webcomponentsjs/webcomponents-lite.js"><\/script>\n' +
'  <link href="https://cdn.vaadin.com/vaadin-elements/latest/vaadin-grid/vaadin-grid.html" rel="import">\n' +
'  <script>\n' +
'  function getJSON(url, callback) {\n' +
'    var xhr = new XMLHttpRequest();\n' +
'    xhr.onreadystatechange = function() {\n' +
'      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {\n' +
'        callback(JSON.parse(xhr.responseText));\n' +
'      }\n' +
'    };\n' +
'    xhr.open(\'GET\', url, true);\n' +
'    xhr.send();\n' +
'  }\n' +
'  <\/script>\n';

function createButton(text, fnc) {
  var button = document.createElement('button');
  button.innerHTML = text;
  button.addEventListener('click', fnc);
  return button;
}

if (!window.Polymer) {
  var link = document.querySelector('link[href$="common.html"]');
  var baseCommon = link.href.replace(/common.html/, '');
  var bowerComponents = '../../';
  var base = baseCommon + bowerComponents;
  // Delay all HTMLImports.whenReady calls until polymer and
  // grid are ready.
  var _whenReady = HTMLImports.whenReady;
  HTMLImports.whenReady = function(done) {
    var id = setInterval(function() {
      if (window.Polymer && window.vaadin && vaadin.elements &&
            vaadin.elements.grid && vaadin.elements.grid.GridElement) {
        clearInterval(id);
        // Restore whenReady
        HTMLImports.whenReady = _whenReady;
        // Run original whenReady
        _whenReady(done);
        _whenReady(function() {
          // For some reason this is not removed in polyfilled browsers
          document.body.removeAttribute('unresolved');
        });
      }
    }, 3);
  };

  var pol = document.createElement('link');
  pol.rel = 'import';
  pol.href = base + 'polymer/polymer.html';
  pol.onload = function() {
    Polymer.Base.importHref(base + 'code-example/code-example.html');
    Polymer.Base.importHref(base + 'table-of-contents/table-of-contents.html');
    Polymer.Base.importHref(base + 'vaadin-grid/vaadin-grid.html');
    Polymer.Base.importHref(base + 'elements-demo-resources/getjson.html');
  };
  document.head.appendChild(pol);
}
