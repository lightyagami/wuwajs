"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurniturePresetConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class FurniturePresetConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get AreaId() {
    return this.areaid();
  }
  get Name() {
    return this.name();
  }
  get Icon() {
    return this.icon();
  }
  get FurniturePlaceInfo() {
    return GameUtils_1.GameUtils.ConvertToMap(this.furnitureplaceinfoLength(), this.furnitureplaceinfoKey, this.furnitureplaceinfoValue, this);
  }
  furnitureplaceinfoKey(t) {
    return this.furnitureplaceinfo(t)?.key();
  }
  furnitureplaceinfoValue(t) {
    return this.furnitureplaceinfo(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFurniturePresetConfig(t, i) {
    return (i || new FurniturePresetConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  areaid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetFurnitureplaceinfoAt(t, i) {
    return this.furnitureplaceinfo(t);
  }
  furnitureplaceinfo(t, i) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  furnitureplaceinfoLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FurniturePresetConfig = FurniturePresetConfig;
//# sourceMappingURL=FurniturePresetConfig.js.map