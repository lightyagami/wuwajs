"use strict";

function fbCreate(r, e, t) {
  const o = t.value;
  t.value = function (...e) {
    var t = r.name;
    exports.createClassSet.add(t);
    return o?.apply(this, e);
  };
  return t;
}
function fbProperty(t, r, e) {
  const o = e.get;
  var s = t.constructor.name;
  let p = undefined;
  if (exports.allPropertySet.has(s)) {
    p = exports.allPropertySet.get(s);
  } else {
    p = new Set();
    exports.allPropertySet.set(s, p);
  }
  p?.add(r);
  if (!exports.initPropertySet.has(s)) {
    exports.initPropertySet.set(s, new Set());
  }
  e.get = function () {
    var e = t.constructor.name;
    exports.initPropertySet.get(e)?.add(r);
    return o?.apply(this);
  };
  return e;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fbProperty = exports.fbCreate = exports.createClassSet = exports.initPropertySet = exports.allPropertySet = undefined;
exports.allPropertySet = new Map();
exports.initPropertySet = new Map();
exports.createClassSet = new Set();
exports.fbCreate = fbCreate;
exports.fbProperty = fbProperty; //# sourceMappingURL=FbProperty.js.map