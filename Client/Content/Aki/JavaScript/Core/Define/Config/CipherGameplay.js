"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CipherGameplay = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class CipherGameplay {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Password() {
    return this.password();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsCipherGameplay(t, s) {
    return (s || new CipherGameplay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  password() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CipherGameplay = CipherGameplay;
//# sourceMappingURL=CipherGameplay.js.map