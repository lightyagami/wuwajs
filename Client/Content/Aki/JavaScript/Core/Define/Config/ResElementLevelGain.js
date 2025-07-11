"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResElementLevelGain = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ResElementLevelGain {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TargetType() {
    return this.targettype();
  }
  get BuffId() {
    return this.buffid();
  }
  get AddBuffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.addbuffsLength(), this.addbuffs, this);
  }
  get TextId() {
    return this.textid();
  }
  get TextIdArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.textidargsLength(), this.textidargs, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsResElementLevelGain(t, s) {
    return (s || new ResElementLevelGain()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  targettype() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAddbuffsAt(t) {
    return this.addbuffs(t);
  }
  addbuffs(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  addbuffsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  addbuffsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  textid(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetTextidargsAt(t) {
    return this.textidargs(t);
  }
  textidargs(t, s) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  textidargsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ResElementLevelGain = ResElementLevelGain;
//# sourceMappingURL=ResElementLevelGain.js.map