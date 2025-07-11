"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponBreach = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class WeaponBreach {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BreachId() {
    return this.breachid();
  }
  get Level() {
    return this.level();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get LevelLimit() {
    return this.levellimit();
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeLength(), this.consumeKey, this.consumeValue, this);
  }
  consumeKey(t) {
    return this.consume(t)?.key();
  }
  consumeValue(t) {
    return this.consume(t)?.value();
  }
  get GoldConsume() {
    return this.goldconsume();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsWeaponBreach(t, e) {
    return (e || new WeaponBreach()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  breachid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levellimit() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConsumeAt(t, e) {
    return this.consume(t);
  }
  consume(t, e) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  goldconsume() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.WeaponBreach = WeaponBreach;
//# sourceMappingURL=WeaponBreach.js.map