"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTravelConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class MapTravelConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get MaxLevel() {
    return this.maxlevel();
  }
  get ExpItemId() {
    return this.expitemid();
  }
  get FinalRewardId() {
    return this.finalrewardid();
  }
  get TabName() {
    return GameUtils_1.GameUtils.ConvertToMap(this.tabnameLength(), this.tabnameKey, this.tabnameValue, this);
  }
  tabnameKey(t) {
    return this.tabname(t)?.key();
  }
  tabnameValue(t) {
    return this.tabname(t)?.value();
  }
  get TabIcon() {
    return GameUtils_1.GameUtils.ConvertToMap(this.tabiconLength(), this.tabiconKey, this.tabiconValue, this);
  }
  tabiconKey(t) {
    return this.tabicon(t)?.key();
  }
  tabiconValue(t) {
    return this.tabicon(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMapTravelConfig(t, i) {
    return (i || new MapTravelConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxlevel() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  expitemid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  finalrewardid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTabnameAt(t, i) {
    return this.tabname(t);
  }
  tabname(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tabnameLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTabiconAt(t, i) {
    return this.tabicon(t);
  }
  tabicon(t, i) {
    var e = this.J7.__offset(this.z7, 14);
    if (e) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tabiconLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MapTravelConfig = MapTravelConfig;
//# sourceMappingURL=MapTravelConfig.js.map