"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityOwnerData = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class EntityOwnerData {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Guid() {
    return this.guid();
  }
  get Owner() {
    return this.owner();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsEntityOwnerData(t, e) {
    return (e || new EntityOwnerData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  guid(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  owner(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.EntityOwnerData = EntityOwnerData;
//# sourceMappingURL=EntityOwnerData.js.map