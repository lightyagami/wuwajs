"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryProp = undefined;
class HonamiStoryProp {
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
  get ShowPercent() {
    return this.showpercent();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsHonamiStoryProp(t, r) {
    return (r || new HonamiStoryProp()).__init(t.readInt32(t.position()) + t.position(), t);
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
  showpercent() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.HonamiStoryProp = HonamiStoryProp;
//# sourceMappingURL=HonamiStoryProp.js.map