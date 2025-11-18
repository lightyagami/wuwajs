"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiInteractRouletteData = undefined;
const Time_1 = require("../../../Core/Common/Time");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../Manager/ModelManager");
class UiInteractRouletteData {
  constructor() {
    this.APu = 0;
    this.tEt = 0;
    this.OldRound = 0;
    this.NewRound = 0;
    this.IsStart = false;
    this.UseSkillId = 0;
  }
  get DurationTime() {
    return Math.floor(this.tEt - this.APu);
  }
  TriggerOpen() {
    this.Reset();
    this.IsStart = true;
    this.APu = Time_1.Time.ServerTimeStamp;
    this.OldRound = this.irm();
    this.UseSkillId = this.rrm();
  }
  TriggerClose() {
    this.tEt = Time_1.Time.ServerTimeStamp;
    this.NewRound = this.irm();
    this.IsStart = false;
  }
  Reset() {
    this.APu = 0;
    this.tEt = 0;
    this.OldRound = 0;
    this.NewRound = 0;
    this.UseSkillId = 0;
    this.IsStart = false;
  }
  irm() {
    var t = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
    if (t && t.Tree && (t = t.Tree.GetTreeVarByKey(IQuest_1.EGradingSystemVarType.Wave))) {
      return MathUtils_1.MathUtils.LongToNumber(t.oTs);
    } else {
      return 0;
    }
  }
  rrm() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(39);
    if (t && t.CurrentSkill) {
      return t.CurrentSkill.SkillId;
    } else {
      return 0;
    }
  }
}
exports.UiInteractRouletteData = UiInteractRouletteData;
//# sourceMappingURL=UiInteractRouletteData.js.map