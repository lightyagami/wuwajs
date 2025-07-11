"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueSeason = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RogueSeason {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get SeasonName() {
    return this.seasonname();
  }
  get PointItem() {
    return this.pointitem();
  }
  get InstanceDungeonEntrance() {
    return this.instancedungeonentrance();
  }
  get TabIcon() {
    return this.tabicon();
  }
  get FirstPassRewardMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.firstpassrewardmapLength(), this.firstpassrewardmapKey, this.firstpassrewardmapValue, this);
  }
  firstpassrewardmapKey(t) {
    return this.firstpassrewardmap(t)?.key();
  }
  firstpassrewardmapValue(t) {
    return this.firstpassrewardmap(t)?.value();
  }
  get ShopId() {
    return this.shopid();
  }
  get Achievement() {
    return this.achievement();
  }
  get ParamId() {
    return this.paramid();
  }
  get RogueThemeType() {
    return this.roguethemetype();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRogueSeason(t, s) {
    return (s || new RogueSeason()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  seasonname(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  pointitem() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instancedungeonentrance() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tabicon(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetFirstpassrewardmapAt(t, s) {
    return this.firstpassrewardmap(t);
  }
  firstpassrewardmap(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  firstpassrewardmapLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  achievement() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  paramid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roguethemetype(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.RogueSeason = RogueSeason;
//# sourceMappingURL=RogueSeason.js.map