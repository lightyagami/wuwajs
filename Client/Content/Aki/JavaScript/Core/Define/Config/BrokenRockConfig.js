"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrokenRockConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BrokenRockConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get EntityUid() {
    return this.entityuid();
  }
  get Rings() {
    return GameUtils_1.GameUtils.ConvertToArray(this.ringsLength(), this.rings, this);
  }
  get ScoreMax() {
    return this.scoremax();
  }
  get ScoreUp() {
    return this.scoreup();
  }
  get ScoreDown() {
    return this.scoredown();
  }
  get GlobalTime() {
    return this.globaltime();
  }
  get NormalSkill() {
    return this.normalskill();
  }
  get FinishSkill() {
    return this.finishskill();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBrokenRockConfig(t, i) {
    return (i || new BrokenRockConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entityuid(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetRingsAt(t) {
    return this.rings(t);
  }
  rings(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  ringsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  ringsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  scoremax() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  scoreup() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scoredown() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 20;
    }
  }
  globaltime() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  normalskill() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  finishskill() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BrokenRockConfig = BrokenRockConfig;
//# sourceMappingURL=BrokenRockConfig.js.map