"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksDrinkBase = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class DrinksDrinkBase {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DrinkId() {
    return this.drinkid();
  }
  get DrinkIcon() {
    return this.drinkicon();
  }
  get DrinkName() {
    return this.drinkname();
  }
  get QTENum() {
    return this.qtenum();
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
  get EffectId() {
    return this.effectid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDrinksDrinkBase(t, i) {
    return (i || new DrinksDrinkBase()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  drinkid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  drinkicon(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  drinkname(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  qtenum() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFlavorAt(t, i) {
    return this.flavor(t);
  }
  flavor(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  flavorLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DrinksDrinkBase = DrinksDrinkBase;
//# sourceMappingURL=DrinksDrinkBase.js.map