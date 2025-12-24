"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrRoadBuild = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class InfrRoadBuild {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MarkId() {
    return this.markid();
  }
  get DungeonId() {
    return this.dungeonid();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get BuildQuest() {
    return this.buildquest();
  }
  get BuildConditionQuestId() {
    return this.buildconditionquestid();
  }
  get JumpId() {
    return this.jumpid();
  }
  get Difficulty() {
    return this.difficulty();
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
  get FireExpReward() {
    return this.fireexpreward();
  }
  get GiftCount() {
    return this.giftcount();
  }
  get GiftCD() {
    return this.giftcd();
  }
  get WeightPasser() {
    return GameUtils_1.GameUtils.ConvertToMap(this.weightpasserLength(), this.weightpasserKey, this.weightpasserValue, this);
  }
  weightpasserKey(t) {
    return this.weightpasser(t)?.key();
  }
  weightpasserValue(t) {
    return this.weightpasser(t)?.value();
  }
  get LoadDataLayers() {
    return GameUtils_1.GameUtils.ConvertToArray(this.loaddatalayersLength(), this.loaddatalayers, this);
  }
  get UnloadDataLayers() {
    return GameUtils_1.GameUtils.ConvertToArray(this.unloaddatalayersLength(), this.unloaddatalayers, this);
  }
  get Name() {
    return this.name();
  }
  get Description() {
    return this.description();
  }
  get BuildDoneDes() {
    return this.builddonedes();
  }
  get EffectDes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectdesLength(), this.effectdes, this);
  }
  get BuildDoneEffectDes() {
    return this.builddoneeffectdes();
  }
  get QuestDescription() {
    return this.questdescription();
  }
  get Length() {
    return this.length();
  }
  get InfoPicturePath() {
    return this.infopicturepath();
  }
  get BodyCameraSettingsName() {
    return this.bodycamerasettingsname();
  }
  get DisableMark() {
    return this.disablemark();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsInfrRoadBuild(t, i) {
    return (i || new InfrRoadBuild()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buildquest() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buildconditionquestid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetRequirementAt(t, i) {
    return this.requirement(t);
  }
  requirement(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  requirementLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  fireexpreward() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  giftcount() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  giftcd() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWeightpasserAt(t, i) {
    return this.weightpasser(t);
  }
  weightpasser(t, i) {
    var s = this.J7.__offset(this.z7, 28);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  weightpasserLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLoaddatalayersAt(t) {
    return this.loaddatalayers(t);
  }
  loaddatalayers(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  loaddatalayersLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  loaddatalayersArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetUnloaddatalayersAt(t) {
    return this.unloaddatalayers(t);
  }
  unloaddatalayers(t) {
    var i = this.J7.__offset(this.z7, 32);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  unloaddatalayersLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  unloaddatalayersArray() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  builddonedes(t) {
    var i = this.J7.__offset(this.z7, 38);
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
    var s = this.J7.__offset(this.z7, 40);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  effectdesLength() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  builddoneeffectdes(t) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  questdescription(t) {
    var i = this.J7.__offset(this.z7, 44);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  length() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  infopicturepath(t) {
    var i = this.J7.__offset(this.z7, 48);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bodycamerasettingsname(t) {
    var i = this.J7.__offset(this.z7, 50);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  disablemark() {
    var t = this.J7.__offset(this.z7, 52);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.InfrRoadBuild = InfrRoadBuild;
//# sourceMappingURL=InfrRoadBuild.js.map