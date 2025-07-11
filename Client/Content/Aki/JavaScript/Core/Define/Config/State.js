"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class State {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get StateId() {
    return this.stateid();
  }
  get StateName() {
    return this.statename();
  }
  get CountryId() {
    return this.countryid();
  }
  get AudioName() {
    return this.audioname();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsState(t, e) {
    return (e || new State()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  stateid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  statename(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  countryid(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  audioname(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.State = State;
//# sourceMappingURL=State.js.map