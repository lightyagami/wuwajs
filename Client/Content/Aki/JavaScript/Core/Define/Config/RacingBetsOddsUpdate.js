"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsOddsUpdate = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RacingBetsOddsUpdate {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get IndexId() {
    return this.indexid();
  }
  get OddsUpdatePoint() {
    return GameUtils_1.GameUtils.ConvertToArray(this.oddsupdatepointLength(), this.oddsupdatepoint, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRacingBetsOddsUpdate(t, s) {
    return (s || new RacingBetsOddsUpdate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  indexid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOddsupdatepointAt(t) {
    return this.oddsupdatepoint(t);
  }
  oddsupdatepoint(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  oddsupdatepointLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RacingBetsOddsUpdate = RacingBetsOddsUpdate;
//# sourceMappingURL=RacingBetsOddsUpdate.js.map