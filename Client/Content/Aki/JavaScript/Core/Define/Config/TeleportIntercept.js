"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportIntercept = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TeleportIntercept {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get InterceptId() {
    return this.interceptid();
  }
  get EntityConfigId() {
    return this.entityconfigid();
  }
  get Type() {
    return this.type();
  }
  get OptionIndex() {
    return this.optionindex();
  }
  get CurInstConfigId() {
    return this.curinstconfigid();
  }
  get TargetMapConfigId() {
    return this.targetmapconfigid();
  }
  get TargetPosition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targetpositionLength(), this.targetposition, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTeleportIntercept(t, i) {
    return (i || new TeleportIntercept()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  interceptid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entityconfigid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  optionindex() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  curinstconfigid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetmapconfigid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTargetpositionAt(t) {
    return this.targetposition(t);
  }
  targetposition(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  targetpositionLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetpositionArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.TeleportIntercept = TeleportIntercept;
//# sourceMappingURL=TeleportIntercept.js.map