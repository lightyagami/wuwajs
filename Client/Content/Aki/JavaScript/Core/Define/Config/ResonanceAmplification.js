"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResonanceAmplification = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ResonanceAmplification {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Attr() {
    return this.attr();
  }
  get LifeSeatBoostFactor() {
    return GameUtils_1.GameUtils.ConvertToArray(this.lifeseatboostfactorLength(), this.lifeseatboostfactor, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsResonanceAmplification(t, s) {
    return (s || new ResonanceAmplification()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  attr() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 7;
    }
  }
  GetLifeseatboostfactorAt(t) {
    return this.lifeseatboostfactor(t);
  }
  lifeseatboostfactor(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  lifeseatboostfactorLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  lifeseatboostfactorArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.ResonanceAmplification = ResonanceAmplification;
//# sourceMappingURL=ResonanceAmplification.js.map