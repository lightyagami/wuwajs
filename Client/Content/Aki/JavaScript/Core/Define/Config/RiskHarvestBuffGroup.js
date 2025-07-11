"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RiskHarvestBuffGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RiskHarvestBuffGroup {
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
  get Buff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffLength(), this.buff, this);
  }
  get BuffName() {
    return this.buffname();
  }
  get BuffDesc() {
    return this.buffdesc();
  }
  get BuffFactors() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bufffactorsLength(), this.bufffactors, this);
  }
  get BuffType() {
    return this.bufftype();
  }
  get BuffProgress() {
    return this.buffprogress();
  }
  get BuffIcon() {
    return this.bufficon();
  }
  get Reward() {
    return this.reward();
  }
  get RewardDesc() {
    return this.rewarddesc();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRiskHarvestBuffGroup(t, s) {
    return (s || new RiskHarvestBuffGroup()).__init(t.readInt32(t.position()) + t.position(), t);
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
  GetBuffAt(t) {
    return this.buff(t);
  }
  buff(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  buffLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  buffname(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  buffdesc(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetBufffactorsAt(t) {
    return this.bufffactors(t);
  }
  bufffactors(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bufffactorsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bufftype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffprogress() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bufficon(t) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  reward() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewarddesc(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.RiskHarvestBuffGroup = RiskHarvestBuffGroup;
//# sourceMappingURL=RiskHarvestBuffGroup.js.map