"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class CalabashLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Level() {
    return this.level();
  }
  get LevelUpExp() {
    return this.levelupexp();
  }
  get LevelUpCondition() {
    return this.levelupcondition();
  }
  get TempCatchGain() {
    return this.tempcatchgain();
  }
  get LowCostTempCatchGain() {
    return this.lowcosttempcatchgain();
  }
  get IntensifyCaptureGuarantee() {
    return this.intensifycaptureguarantee();
  }
  get LowCostIntensifyCaptureGuarantee() {
    return this.lowcostintensifycaptureguarantee();
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffidsLength(), this.buffids, this);
  }
  get BuffDescription() {
    return this.buffdescription();
  }
  get LevelUpDescription() {
    return this.levelupdescription();
  }
  get QualityDescription() {
    return this.qualitydescription();
  }
  get BuffDescriptionMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.buffdescriptionmapLength(), this.buffdescriptionmapKey, this.buffdescriptionmapValue, this);
  }
  buffdescriptionmapKey(t) {
    return this.buffdescriptionmap(t)?.key();
  }
  buffdescriptionmapValue(t) {
    return this.buffdescriptionmap(t)?.value();
  }
  get Cost() {
    return this.cost();
  }
  get RewardId() {
    return this.rewardid();
  }
  get QualityDropWeight() {
    return GameUtils_1.GameUtils.ConvertToMap(this.qualitydropweightLength(), this.qualitydropweightKey, this.qualitydropweightValue, this);
  }
  qualitydropweightKey(t) {
    return this.qualitydropweight(t)?.key();
  }
  qualitydropweightValue(t) {
    return this.qualitydropweight(t)?.value();
  }
  get ReachTextChangeColor() {
    return this.reachtextchangecolor();
  }
  get ReachTextOutlineColor() {
    return this.reachtextoutlinecolor();
  }
  get ReachTextOutlineSize() {
    return this.reachtextoutlinesize();
  }
  get TexPatternStatePath() {
    return this.texpatternstatepath();
  }
  get TexAddLight() {
    return this.texaddlight();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCalabashLevel(t, i) {
    return (i || new CalabashLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelupexp() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelupcondition() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tempcatchgain() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lowcosttempcatchgain() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  intensifycaptureguarantee() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lowcostintensifycaptureguarantee() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffidsAt(t) {
    return this.buffids(t);
  }
  buffids(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffidsArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  buffdescription(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  levelupdescription(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  qualitydescription(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetBuffdescriptionmapAt(t, i) {
    return this.buffdescriptionmap(t);
  }
  buffdescriptionmap(t, i) {
    var e = this.J7.__offset(this.z7, 26);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  buffdescriptionmapLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cost() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 4301;
    }
  }
  GetQualitydropweightAt(t, i) {
    return this.qualitydropweight(t);
  }
  qualitydropweight(t, i) {
    var e = this.J7.__offset(this.z7, 32);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  qualitydropweightLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  reachtextchangecolor(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  reachtextoutlinecolor(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  reachtextoutlinesize() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  texpatternstatepath(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  texaddlight(t) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.CalabashLevel = CalabashLevel;
//# sourceMappingURL=CalabashLevel.js.map