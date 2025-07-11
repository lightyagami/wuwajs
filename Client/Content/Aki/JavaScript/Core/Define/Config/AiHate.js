"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiHate = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class AiHate {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BaseHatred() {
    return this.basehatred();
  }
  get DecreaseRate() {
    return this.decreaserate();
  }
  get DecreaseTimeLength() {
    return this.decreasetimelength();
  }
  get DecreaseTimeCd() {
    return this.decreasetimecd();
  }
  get IncreaseRateWhenDecreasing() {
    return this.increaseratewhendecreasing();
  }
  get MinClearTime() {
    return this.mincleartime();
  }
  get DisengageDistanceRange() {
    return this.disengagedistancerange();
  }
  get DisengageTimeRange() {
    return this.disengagetimerange();
  }
  get DisengageHeightRange() {
    return this.disengageheightrange();
  }
  get DisengageHeightRangeMax() {
    return this.disengageheightrangemax();
  }
  get DisengageBornDistance() {
    return this.disengageborndistance();
  }
  get MaxMoveFromBorn() {
    return this.maxmovefromborn();
  }
  get ExcludeTag() {
    return this.excludetag();
  }
  get SwornHatredTag() {
    return this.swornhatredtag();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsAiHate(t, e) {
    return (e || new AiHate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  basehatred() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  decreaserate() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0.8;
    }
  }
  decreasetimelength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 5000;
    }
  }
  decreasetimecd() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  increaseratewhendecreasing() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  mincleartime() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1000;
    }
  }
  disengagedistancerange(t) {
    var e = this.J7.__offset(this.z7, 18);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  disengagetimerange(t) {
    var e = this.J7.__offset(this.z7, 20);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  disengageheightrange(t) {
    var e = this.J7.__offset(this.z7, 22);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  disengageheightrangemax(t) {
    var e = this.J7.__offset(this.z7, 24);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  disengageborndistance(t) {
    var e = this.J7.__offset(this.z7, 26);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  maxmovefromborn() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return -1;
    }
  }
  excludetag(t) {
    var e = this.J7.__offset(this.z7, 30);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  swornhatredtag(t) {
    var e = this.J7.__offset(this.z7, 32);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.AiHate = AiHate;
//# sourceMappingURL=AiHate.js.map