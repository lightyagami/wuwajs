"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapBlockInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntVector2D_1 = require("./SubType/IntVector2D");
class MapBlockInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get BlockId() {
    return this.blockid();
  }
  get MapId() {
    return this.mapid();
  }
  get PakName() {
    return this.pakname();
  }
  get BlockDatalayer() {
    return this.blockdatalayer();
  }
  get RegionName() {
    return this.regionname();
  }
  get RegionBoxes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.regionboxesLength(), this.regionboxes, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsMapBlockInfo(t, e) {
    return (e || new MapBlockInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  blockid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pakname(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  blockdatalayer(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  regionname(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetRegionboxesAt(t, e) {
    return this.regionboxes(t);
  }
  regionboxes(t, e) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (e || new IntVector2D_1.IntVector2D()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  regionboxesLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MapBlockInfo = MapBlockInfo;
//# sourceMappingURL=MapBlockInfo.js.map