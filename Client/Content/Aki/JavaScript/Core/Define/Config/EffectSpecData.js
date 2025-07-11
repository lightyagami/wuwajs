"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSpecData = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class EffectSpecData {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SpecType() {
    return this.spectype();
  }
  get EffectRegularType() {
    return this.effectregulartype();
  }
  get LifeTime() {
    return this.lifetime();
  }
  get Children() {
    return GameUtils_1.GameUtils.ConvertToArray(this.childrenLength(), this.children, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsEffectSpecData(t, e) {
    return (e || new EffectSpecData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  spectype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectregulartype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lifetime() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetChildrenAt(t) {
    return this.children(t);
  }
  children(t) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  childrenLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  childrenArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.EffectSpecData = EffectSpecData;
//# sourceMappingURL=EffectSpecData.js.map