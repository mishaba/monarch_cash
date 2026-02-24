/**
 * Monarch Cash - DOM Analyzer Bookmarklet (Step 1)
 *
 * Run this on BOTH:
 *   1. https://app.monarch.com/accounts          (accounts list page)
 *   2. https://app.monarch.com/accounts/details/179371853861919958  (account detail page)
 *
 * Copy the minified version below into a browser bookmark URL.
 */

(function () {
  var url = location.href;
  var w = window.open('', 'MonarchDOMAnalyzer', 'width=1000,height=750,scrollbars=yes,resizable=yes');
  var d = w.document;

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function section(title, content) {
    return '<div class="sec"><h2>' + esc(title) + '</h2><pre>' + content + '</pre></div>';
  }

  // --- 1. Headings ---
  var headingsOut = '';
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]').forEach(function (h) {
    var txt = h.textContent.trim();
    if (txt) headingsOut += esc(h.tagName) + ' | class="' + esc(h.className) + '" | ' + esc(txt.substring(0, 120)) + '\n';
  });

  // --- 2. Elements that contain "invest" ---
  var investOut = '';
  Array.from(document.querySelectorAll('*')).forEach(function (el) {
    if (el.children.length === 0) {
      var txt = el.textContent.trim();
      if (txt.toLowerCase().includes('invest')) {
        investOut += esc(el.tagName) + ' class="' + esc(el.className) + '"\n  text: ' + esc(txt.substring(0, 100)) + '\n\n';
      }
    }
  });

  // --- 3. Account-related links ---
  var linksOut = '';
  document.querySelectorAll('a[href*="account"]').forEach(function (a) {
    linksOut += esc(a.href) + '\n  text: ' + esc(a.textContent.trim().substring(0, 80)) + '\n\n';
  });

  // --- 4. Any elements that look like holding rows (numbers with $) ---
  var holdingsOut = '';
  Array.from(document.querySelectorAll('*')).forEach(function (el) {
    if (el.children.length === 0) {
      var txt = el.textContent.trim();
      if (/\$[\d,]+/.test(txt) || /\d+\.\d{2}/.test(txt)) {
        holdingsOut += esc(el.tagName) + ' class="' + esc(el.className) + '" | ' + esc(txt.substring(0, 120)) + '\n';
      }
    }
  });

  // --- 5. Shallow DOM structure (top 3 levels under body, first 8 children each) ---
  function structureOf(el, depth, maxDepth, maxChildren) {
    if (depth > maxDepth) return '';
    var indent = '  '.repeat(depth);
    var cls = typeof el.className === 'string' && el.className ? '.' + el.className.trim().replace(/\s+/g, '.') : '';
    var id = el.id ? '#' + el.id : '';
    var tag = el.tagName || '?';
    var out = indent + esc(tag + id + cls) + '\n';
    var kids = Array.from(el.children).slice(0, maxChildren);
    kids.forEach(function (c) { out += structureOf(c, depth + 1, maxDepth, maxChildren); });
    return out;
  }
  var domOut = structureOf(document.body, 0, 3, 8);

  // --- 6. Tables ---
  var tablesOut = '';
  document.querySelectorAll('table,thead,tbody,tr,th,td').forEach(function (el) {
    var txt = el.textContent.trim();
    if (txt) tablesOut += esc(el.tagName) + ' class="' + esc(el.className) + '" | ' + esc(txt.substring(0, 100)) + '\n';
  });

  // --- 7. React/data attributes on any element with financial data ---
  var dataAttrsOut = '';
  Array.from(document.querySelectorAll('*')).forEach(function (el) {
    var attrs = Array.from(el.attributes || []).filter(function (a) {
      return a.name.startsWith('data-') || a.name.startsWith('aria-');
    });
    if (attrs.length && el.textContent.trim().length < 200 && el.textContent.trim().length > 0) {
      var attrStr = attrs.map(function (a) { return a.name + '="' + a.value + '"'; }).join(' ');
      dataAttrsOut += esc(el.tagName) + ' ' + esc(attrStr) + '\n  text: ' + esc(el.textContent.trim().substring(0, 80)) + '\n\n';
    }
  });

  d.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Monarch DOM — ' + esc(url) + '</title>' +
    '<style>' +
    'body{font:13px/1.5 monospace;padding:12px;background:#1a1a1a;color:#e0e0e0}' +
    'h1{color:#7ec8e3;font-size:15px;word-break:break-all}' +
    'h2{color:#f0c040;font-size:13px;margin:0 0 4px}' +
    '.sec{border:1px solid #444;margin:10px 0;padding:8px;border-radius:4px}' +
    'pre{background:#111;padding:8px;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:300px;overflow-y:auto;margin:0;font-size:11px}' +
    '</style></head><body>');

  d.write('<h1>Monarch DOM Analyzer<br>' + esc(url) + '</h1>');
  d.write(section('1. Headings', headingsOut || '(none found)'));
  d.write(section('2. Elements containing "invest"', investOut || '(none found)'));
  d.write(section('3. Account links (a[href*="account"])', linksOut || '(none found)'));
  d.write(section('4. Elements with $ amounts', holdingsOut || '(none found)'));
  d.write(section('5. Shallow DOM structure (body, 3 levels, 8 children each)', domOut));
  d.write(section('6. Table elements', tablesOut || '(none found)'));
  d.write(section('7. data-* / aria-* attributes', dataAttrsOut || '(none found)'));
  d.write('</body></html>');
  d.close();
})();
