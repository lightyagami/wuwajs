"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTargetType = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringString_1 = require("./SubType/DicStringString");
class FloroRanchTargetType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Param1() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param1Length(), this.param1Key, this.param1Value, this);
  }
  param1Key(t) {
    return this.param1(t)?.key();
  }
  param1Value(t) {
    return this.param1(t)?.value();
  }
  get Param2() {
    return GameUtils_1.GameUtils.ConvertToMap(this.param2Length(), this.param2Key, this.param2Value, this);
  }
  param2Key(t) {
    return this.param2(t)?.key();
  }
  param2Value(t) {
    return this.param2(t)?.value();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsFloroRanchTargetType(t, r) {
    return (r || new FloroRanchTargetType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam1At(t, r) {
    return this.param1(t);
  }
  param1(t, r) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param1Length() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParam2At(t, r) {
    return this.param2(t);
  }
  param2(t, r) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return (r || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  param2Length() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FloroRanchTargetType = FloroRanchTargetType;
//# sourceMappingURL=FloroRanchTargetType.js.map