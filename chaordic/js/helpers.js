// Allows me to use strings as ES6 template strings
String.prototype.eval = function(data) {  
  return this.replace(/\${(.*?)}/g, function(_, code) {
    var scoped = code.replace(/(["'\.\w\$]+)/g, function(match) {
      return /["']/.test(match[0]) ? match : 'scope.' + match;
    });
    try {
      return new Function('scope', 'return '+ scoped)(data);
    } catch (e) { return ''; }
  });
}

const elipsis = (text, maxSize = 70) =>
  (text.length > maxSize)
    ? `${text.substring(0, maxSize)}...`
    : text;
