"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomQuality = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class PhantomQuality {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Quality() {
    return this.quality();
  }
  get LevelLimit() {
    return this.levellimit();
  }
  get SlotUnlockLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.slotunlocklevelLength(), this.slotunlocklevel, this);
  }
  get IdentifyCost() {
    return GameUtils_1.GameUtils.ConvertToMap(this.identifycostLength(), this.identifycostKey, this.identifycostValue, this);
  }
  identifycostKey(t) {
    return this.identifycost(t)?.key();
  }
  identifycostValue(t) {
    return this.identifycost(t)?.value();
  }
  get IdentifyCoin() {
    return this.identifycoin();
  }
  get QualitySprite() {
    return this.qualitysprite();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomQuality(t, i) {
    return (i || new PhantomQuality()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  quality() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levellimit() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSlotunlocklevelAt(t) {
    return this.slotunlocklevel(t);
  }
  slotunlocklevel(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  slotunlocklevelLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  slotunlocklevelArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetIdentifycostAt(t, i) {
    return this.identifycost(t);
  }
  identifycost(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  identifycostLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  identifycoin() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  qualitysprite(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.PhantomQuality = PhantomQuality;
//# sourceMappingURL=PhantomQuality.js.map