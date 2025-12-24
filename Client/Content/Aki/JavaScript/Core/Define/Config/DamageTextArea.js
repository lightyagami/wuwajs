"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageTextArea = undefined;
class DamageTextArea {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MinDeviationX() {
    return this.mindeviationx();
  }
  get MinDeviationY() {
    return this.mindeviationy();
  }
  get MaxDeviationX() {
    return this.maxdeviationx();
  }
  get MaxDeviationY() {
    return this.maxdeviationy();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDamageTextArea(t, i) {
    return (i || new DamageTextArea()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mindeviationx() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mindeviationy() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxdeviationx() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxdeviationy() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DamageTextArea = DamageTextArea;
//# sourceMappingURL=DamageTextArea.js.map