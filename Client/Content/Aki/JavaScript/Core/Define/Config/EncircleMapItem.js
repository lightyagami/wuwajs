"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncircleMapItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const EncircleHexType_1 = require("./SubType/EncircleHexType");
class EncircleMapItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get Memo() {
    return this.memo();
  }
  get ResourcePath() {
    return this.resourcepath();
  }
  get SpinePath() {
    return this.spinepath();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsEncircleMapItem(t, e) {
    return (e || new EncircleMapItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt8(this.z7 + t);
    } else {
      return EncircleHexType_1.EncircleHexType.Plain;
    }
  }
  memo(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  resourcepath(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  spinepath(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.EncircleMapItem = EncircleMapItem;
//# sourceMappingURL=EncircleMapItem.js.map