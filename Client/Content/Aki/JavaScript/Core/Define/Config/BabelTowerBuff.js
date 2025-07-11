"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerBuff = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class BabelTowerBuff {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Star() {
    return this.star();
  }
  get DifficultPreLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.difficultprelevelLength(), this.difficultprelevel, this);
  }
  get DifficultPreLevelStar() {
    return GameUtils_1.GameUtils.ConvertToMap(this.difficultprelevelstarLength(), this.difficultprelevelstarKey, this.difficultprelevelstarValue, this);
  }
  difficultprelevelstarKey(t) {
    return this.difficultprelevelstar(t)?.key();
  }
  difficultprelevelstarValue(t) {
    return this.difficultprelevelstar(t)?.value();
  }
  get DifficultLimitTime() {
    return this.difficultlimittime();
  }
  get Texture() {
    return this.texture();
  }
  get NameText() {
    return this.nametext();
  }
  get DesText() {
    return this.destext();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBabelTowerBuff(t, i) {
    return (i || new BabelTowerBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  star() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDifficultprelevelAt(t) {
    return this.difficultprelevel(t);
  }
  difficultprelevel(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  difficultprelevelLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  difficultprelevelArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDifficultprelevelstarAt(t, i) {
    return this.difficultprelevelstar(t);
  }
  difficultprelevelstar(t, i) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  difficultprelevelstarLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  difficultlimittime() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  texture(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  nametext(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  destext(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.BabelTowerBuff = BabelTowerBuff;
//# sourceMappingURL=BabelTowerBuff.js.map