"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KSCDamage = undefined;
class KSCDamage {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get KscGameplayType() {
    return this.kscgameplaytype();
  }
  get CalculateType() {
    return this.calculatetype();
  }
  get Element() {
    return this.element();
  }
  get RelatedProperty() {
    return this.relatedproperty();
  }
  get Amplify() {
    return this.amplify();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsKSCDamage(t, e) {
    return (e || new KSCDamage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  kscgameplaytype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  calculatetype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  element() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  relatedproperty() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 7;
    }
  }
  amplify() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.KSCDamage = KSCDamage;
//# sourceMappingURL=KSCDamage.js.map