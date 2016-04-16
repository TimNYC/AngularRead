function isRegExp(value) {
  return toString.call(value) === '[object RegExp]';
}

function setHashKey(obj, h) {
  if (h) {
    obj.$$hashKey = h;
  } else {
    delete obj.$$hashKey;
  }
}

function isElement(node) {
  return !!(node &&
    (node.nodeName  // we are a direct element
    || (node.prop && node.attr && node.find)));  // we have an on and find method part of jQuery API
}

function toInt(str) {
  return parseInt(str, 10);
}
