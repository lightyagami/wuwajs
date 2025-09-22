"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubLevelMap = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SubLevelMap {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MapPath() {
    return this.mappath();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsSubLevelMap(t, e) {
    return (e || new SubLevelMap()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mappath(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.SubLevelMap = SubLevelMap;
//# sourceMappingURL=SubLevelMap.js.map