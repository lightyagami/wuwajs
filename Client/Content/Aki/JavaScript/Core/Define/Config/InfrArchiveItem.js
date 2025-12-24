"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrArchiveItem = undefined;
class InfrArchiveItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ItemId() {
    return this.itemid();
  }
  get AccessPath() {
    return this.accesspath();
  }
  get InfoDisplayId() {
    return this.infodisplayid();
  }
  get EffectId() {
    return this.effectid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsInfrArchiveItem(t, i) {
    return (i || new InfrArchiveItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  accesspath() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  infodisplayid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.InfrArchiveItem = InfrArchiveItem;
//# sourceMappingURL=InfrArchiveItem.js.map