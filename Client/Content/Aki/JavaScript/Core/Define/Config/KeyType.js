"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyType = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class KeyType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TypeId() {
    return this.typeid();
  }
  get Name() {
    return this.name();
  }
  get IconSpritePath() {
    return this.iconspritepath();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsKeyType(t, e) {
    return (e || new KeyType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  iconspritepath(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.KeyType = KeyType;
//# sourceMappingURL=KeyType.js.map