"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManagePlanConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class PhantomManagePlanConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get SlotIndex() {
    return this.slotindex();
  }
  get IsEnable() {
    return this.isenable();
  }
  get Name() {
    return this.name();
  }
  get RuleMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rulemapLength(), this.rulemapKey, this.rulemapValue, this);
  }
  rulemapKey(t) {
    return this.rulemap(t)?.key();
  }
  rulemapValue(t) {
    return this.rulemap(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPhantomManagePlanConfig(t, e) {
    return (e || new PhantomManagePlanConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  slotindex() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isenable() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetRulemapAt(t, e) {
    return this.rulemap(t);
  }
  rulemap(t, e) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (e || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rulemapLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomManagePlanConfig = PhantomManagePlanConfig;
//# sourceMappingURL=PhantomManagePlanConfig.js.map