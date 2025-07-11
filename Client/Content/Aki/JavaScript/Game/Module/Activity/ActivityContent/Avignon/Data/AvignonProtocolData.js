"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvignonProtocolData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityData_1 = require("../../../ActivityData");
const AvignonStageInfo_1 = require("./AvignonStageInfo");
class AvignonProtocolData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.ROe = new Map();
  }
  OnInit(t) {
    this.Gja();
  }
  Gja() {
    this.ROe.clear();
    var e = ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigAll();
    for (let t = 0; t < e.length; t++) {
      var r = e[t];
      var a = new AvignonStageInfo_1.AvignonStageInfo(r.Id, t);
      this.ROe.set(r.Id, a);
    }
  }
  PhraseEx(t) {
    t = t.afc;
    if (t) {
      for (const e of t.n3_.E$s) {
        this.UpdateTask(e);
      }
      for (const r of t.hfc) {
        this.UnlockStage(r);
      }
    }
  }
  UpdateTask(t) {
    var e;
    if (t && t.s5n !== 0) {
      e = this.OSc(t.s5n);
      this.ROe.get(e)?.UpdateTask(t);
    }
  }
  UnlockStage(t) {
    t = this.ROe.get(t);
    if (t) {
      t.UnlockStage();
    }
  }
  IsAllStagesUnlock() {
    for (var [, t] of this.ROe) {
      if (!t.IsUnlock) {
        return false;
      }
    }
    return true;
  }
  HasStageRewardRedDot() {
    for (const t of this.ROe.values()) {
      if (t.GetRewardState()) {
        return true;
      }
    }
    return false;
  }
  GetExDataRedPointShowState() {
    var t = ModelManager_1.ModelManager.AvignonModel.CheckRedDot();
    return this.HasStageRewardRedDot() || t;
  }
  GetStageInfo(t) {
    return this.ROe.get(t);
  }
  GetAllStagesId() {
    return Array.from(this.ROe.keys()).sort((t, e) => t - e);
  }
  GetCurrentLockQuestId() {
    for (var [, t] of this.ROe) {
      if (!t.IsUnlock) {
        return ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigById(t.StageId).QuestionId;
      }
    }
  }
  OSc(t) {
    return ConfigManager_1.ConfigManager.AvignonConfig.GetAvignonTaskConfigByTaskId(t).Step;
  }
  TaskRewardGot(t) {
    var e = this.OSc(t);
    this.ROe.get(e).SetTaskRewardGot(t);
  }
}
exports.AvignonProtocolData = AvignonProtocolData;
//# sourceMappingURL=AvignonProtocolData.js.map