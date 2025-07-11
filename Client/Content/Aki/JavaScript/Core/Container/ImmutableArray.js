"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmutableArray = undefined;
const Log_1 = require("../Common/Log");
class ImmutableArray extends Array {
  constructor() {
    super(...arguments);
    this.cJa = undefined;
  }
  get JYa() {
    this.cJa ||= Array.from(this);
    return this.cJa;
  }
  push() {
    this.ZYa("push");
    return NaN;
  }
  pop() {
    this.ZYa("pop");
  }
  shift() {
    this.ZYa("shift");
  }
  unshift() {
    this.ZYa("unshift");
    return NaN;
  }
  splice(t, r) {
    this.ZYa("splice");
    return new Array();
  }
  sort(t) {
    this.ZYa("sort");
    return this;
  }
  reverse() {
    this.ZYa("reverse");
    return this;
  }
  fill(t, r, e) {
    this.ZYa("fill");
    return this;
  }
  copyWithin(t, r, e) {
    this.ZYa("copyWithin");
    return this;
  }
  set length(t) {
    this.ZYa("set length");
  }
  get length() {
    return super.length;
  }
  concat(...t) {
    return this.JYa.concat(...t);
  }
  map(t, r) {
    return this.JYa.map(t, r);
  }
  slice(t, r) {
    return this.JYa.slice(t, r);
  }
  filter(t, r) {
    return this.JYa.filter(t, r);
  }
  ZYa(t) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Core", 62, "ImmutableArray 不允许修改", ["函数名", t]);
    }
  }
}
exports.ImmutableArray = ImmutableArray;
//# sourceMappingURL=ImmutableArray.js.map