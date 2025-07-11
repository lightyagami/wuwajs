"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiSkill = undefined;
const Time_1 = require("../../../Core/Common/Time");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
class AiSkill {
  constructor(t) {
    this.BaseSkill = undefined;
    this.SkillInfos = new Map();
    this.SkillPreconditionMap = new Map();
    this.PreconditionTagMap = new Map();
    this.Tre = new Map();
    this.ActiveSkillGroup = new Set();
    this.Bte = t;
  }
  ActivateSkillGroup(t, i) {
    if (t >= 0 && t < this.BaseSkill.RandomSkills.length) {
      if (i) {
        this.ActiveSkillGroup.add(t);
      } else {
        this.ActiveSkillGroup.delete(t);
      }
    }
  }
  AddSkillCd(t, i) {
    this.Bte.AddCoolDownTime(t, i);
  }
  CanActivate(t) {
    return this.Bte.GetCoolDownReady(t);
  }
  SetSkillCdFromNow(t) {
    var i;
    if (t && (i = this.SkillInfos.get(t))) {
      this.Bte.AddCoolDownTime(t, MathUtils_1.MathUtils.GetRandomRange(i.SkillCdRange.Min, i.SkillCdRange.Max));
    }
  }
  GetSkillWeight(t) {
    var i = this.Tre.get(t);
    if (i !== undefined) {
      return i;
    } else if (i = this.SkillInfos.get(t)) {
      return i.SkillWeight;
    } else {
      return 0;
    }
  }
  ChangeSkillWeight(t, i) {
    if (i > 0) {
      this.Tre.set(t, i);
    } else {
      this.Tre.delete(t);
    }
  }
  InitTagMap() {
    this.PreconditionTagMap.clear();
    for (var [t, i] of this.SkillPreconditionMap) {
      if (i.NeedTag && (i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(i.NeedTag))) {
        this.PreconditionTagMap.set(t, i);
      }
    }
  }
  GetCdDebugString() {
    let t = "";
    var i;
    var e;
    var s = ModelManager_1.ModelManager.GameModeModel.IsMulti ? TimeUtil_1.TimeUtil.GetServerTimeStamp() : Time_1.Time.WorldTime;
    for ([i, [e]] of this.Bte.AiCoolDownList) {
      t += "\n\t\t\t" + i + " : " + Math.max(0, e - s);
    }
    return t;
  }
}
exports.AiSkill = AiSkill;
//# sourceMappingURL=AiSkill.js.map