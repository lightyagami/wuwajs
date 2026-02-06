"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadZoneConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoadZoneConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MapId() {
    return this.mapid();
  }
  get PbDataId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.pbdataidLength(), this.pbdataid, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoadZoneConfig(t, i) {
    return (i || new RoadZoneConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
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
  GetPbdataidAt(t) {
    return this.pbdataid(t);
  }
  pbdataid(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  pbdataidLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoadZoneConfig = RoadZoneConfig;
//# sourceMappingURL=RoadZoneConfig.js.map