"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomMainPropItem = undefined;
class PhantomMainPropItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PropId() {
    return this.propid();
  }
  get AddType() {
    return this.addtype();
  }
  get StandardProperty() {
    return this.standardproperty();
  }
  get GrowthId() {
    return this.growthid();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsPhantomMainPropItem(t, r) {
    return (r || new PhantomMainPropItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  propid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  addtype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  standardproperty() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  growthid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomMainPropItem = PhantomMainPropItem;
//# sourceMappingURL=PhantomMainPropItem.js.map