"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertyMap = undefined;
class PropertyMap extends Map {
  constructor() {
    super(...arguments);
    this.pYa = new Map();
  }
  set(t, s) {
    if (super.get(t) === s) {
      return this;
    } else {
      this.setDirty(t);
      return super.set(t, s);
    }
  }
  get(t) {
    this.cleanDirty(t);
    return super.get(t);
  }
  tryGet(t, s, r = true) {
    if (r) {
      this.cleanDirty(t);
    }
    return super.get(t) ?? s;
  }
  cleanDirty(t) {
    this.pYa.set(t, false);
  }
  setDirty(t) {
    this.pYa.set(t, true);
  }
  setAllDirty() {
    for (const t of this.pYa.keys()) {
      this.pYa.set(t, true);
    }
  }
  isDirty(t) {
    return this.pYa.get(t) ?? false;
  }
}
exports.PropertyMap = PropertyMap;
//# sourceMappingURL=PropertyMap.js.map