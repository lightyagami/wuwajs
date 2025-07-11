"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewOccupationConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewOccupationConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get OccupationType() {
    return this.occupationtype();
  }
  get OccupationData() {
    return this.occupationdata();
  }
  get OccupationNameStringKey() {
    return this.occupationnamestringkey();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsNewOccupationConfig(t, i) {
    return (i || new NewOccupationConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  occupationtype(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  occupationdata(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  occupationnamestringkey(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.NewOccupationConfig = NewOccupationConfig;
//# sourceMappingURL=NewOccupationConfig.js.map