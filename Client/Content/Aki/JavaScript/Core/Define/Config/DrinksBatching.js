"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksBatching = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class DrinksBatching {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Icon() {
    return this.icon();
  }
  get Name() {
    return this.name();
  }
  get Flavor() {
    return GameUtils_1.GameUtils.ConvertToMap(this.flavorLength(), this.flavorKey, this.flavorValue, this);
  }
  flavorKey(t) {
    return this.flavor(t)?.key();
  }
  flavorValue(t) {
    return this.flavor(t)?.value();
  }
  get MeshTagId() {
    return this.meshtagid();
  }
  get ScaleMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.scalemapLength(), this.scalemapKey, this.scalemapValue, this);
  }
  scalemapKey(t) {
    return this.scalemap(t)?.key();
  }
  scalemapValue(t) {
    return this.scalemap(t)?.value();
  }
  get HeighScaleMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.heighscalemapLength(), this.heighscalemapKey, this.heighscalemapValue, this);
  }
  heighscalemapKey(t) {
    return this.heighscalemap(t)?.key();
  }
  heighscalemapValue(t) {
    return this.heighscalemap(t)?.value();
  }
  get PosScaleMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.posscalemapLength(), this.posscalemapKey, this.posscalemapValue, this);
  }
  posscalemapKey(t) {
    return this.posscalemap(t)?.key();
  }
  posscalemapValue(t) {
    return this.posscalemap(t)?.value();
  }
  get PosOnLiquid1() {
    return GameUtils_1.GameUtils.ConvertToMap(this.posonliquid1Length(), this.posonliquid1Key, this.posonliquid1Value, this);
  }
  posonliquid1Key(t) {
    return this.posonliquid1(t)?.key();
  }
  posonliquid1Value(t) {
    return this.posonliquid1(t)?.value();
  }
  get PosOnLiquid2() {
    return GameUtils_1.GameUtils.ConvertToMap(this.posonliquid2Length(), this.posonliquid2Key, this.posonliquid2Value, this);
  }
  posonliquid2Key(t) {
    return this.posonliquid2(t)?.key();
  }
  posonliquid2Value(t) {
    return this.posonliquid2(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDrinksBatching(t, i) {
    return (i || new DrinksBatching()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetFlavorAt(t, i) {
    return this.flavor(t);
  }
  flavor(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  flavorLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  meshtagid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetScalemapAt(t, i) {
    return this.scalemap(t);
  }
  scalemap(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  scalemapLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetHeighscalemapAt(t, i) {
    return this.heighscalemap(t);
  }
  heighscalemap(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  heighscalemapLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPosscalemapAt(t, i) {
    return this.posscalemap(t);
  }
  posscalemap(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  posscalemapLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPosonliquid1At(t, i) {
    return this.posonliquid1(t);
  }
  posonliquid1(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  posonliquid1Length() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPosonliquid2At(t, i) {
    return this.posonliquid2(t);
  }
  posonliquid2(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  posonliquid2Length() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DrinksBatching = DrinksBatching;
//# sourceMappingURL=DrinksBatching.js.map