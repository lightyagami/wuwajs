"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class InfrLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Level() {
    return this.level();
  }
  get Exp() {
    return this.exp();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get Requirement() {
    return GameUtils_1.GameUtils.ConvertToMap(this.requirementLength(), this.requirementKey, this.requirementValue, this);
  }
  requirementKey(t) {
    return this.requirement(t)?.key();
  }
  requirementValue(t) {
    return this.requirement(t)?.value();
  }
  get RoadCoinAdd() {
    return this.roadcoinadd();
  }
  get Reward() {
    return this.reward();
  }
  get Description() {
    return this.description();
  }
  get QuestDescriptions() {
    return GameUtils_1.GameUtils.ConvertToArray(this.questdescriptionsLength(), this.questdescriptions, this);
  }
  get QuestIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.questidsLength(), this.questids, this);
  }
  get Name() {
    return this.name();
  }
  get EffectDes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectdesLength(), this.effectdes, this);
  }
  get StageDescription() {
    return this.stagedescription();
  }
  get InfoPicturePath() {
    return this.infopicturepath();
  }
  get MarkStageName() {
    return this.markstagename();
  }
  get BuildSuccessDes() {
    return this.buildsuccessdes();
  }
  get ScenePath() {
    return this.scenepath();
  }
  get JumpId() {
    return this.jumpid();
  }
  get VideoName() {
    return this.videoname();
  }
  get VideoPath() {
    return this.videopath();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsInfrLevel(t, i) {
    return (i || new InfrLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  exp() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRequirementAt(t, i) {
    return this.requirement(t);
  }
  requirement(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  requirementLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  roadcoinadd() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reward() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetQuestdescriptionsAt(t) {
    return this.questdescriptions(t);
  }
  questdescriptions(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  questdescriptionsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetQuestidsAt(t) {
    return this.questids(t);
  }
  questids(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  questidsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  questidsArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetEffectdesAt(t) {
    return this.effectdes(t);
  }
  effectdes(t, i) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  effectdesLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  stagedescription(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  infopicturepath(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  markstagename(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  buildsuccessdes(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  scenepath(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  videoname(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  videopath(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.InfrLevel = InfrLevel;
//# sourceMappingURL=InfrLevel.js.map