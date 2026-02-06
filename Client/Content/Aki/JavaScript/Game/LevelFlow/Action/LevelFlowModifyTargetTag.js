"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowModifyTargetTag = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowModifyTargetTag extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.bpm = false;
    this.KC1 = [];
  }
  Init(e, o, t) {
    this.E0 = e;
    this.bpm = o;
    this.KC1 = t;
    return this;
  }
  OnExecute() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0);
    if (e?.Valid && e.Entity?.Valid) {
      var o = e.Entity.CheckGetComponent(217);
      if (o) {
        if (this.bpm) {
          for (const l of this.KC1) {
            var t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(l);
            ControllerHolder_1.ControllerHolder.LevelGamePlayController.ClientAddTagToTarget(e, t);
            o.AddTag(t);
          }
        } else {
          for (const r of this.KC1) {
            var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
            if (ControllerHolder_1.ControllerHolder.LevelGamePlayController.ClientRemoveTagFromTarget(e.Id, i)) {
              o.RemoveTag(i);
            }
          }
        }
        this.FinishExecute(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "LevelFlowModifyTargetTag 实体不存在TagComponent", ["EntityId", this.E0]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "LevelFlowModifyTargetTag 实体不存在", ["EntityId", this.E0]);
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["isAddTag", this.bpm], ["TagList", this.KC1.toString()]);
    }
  }
}
exports.LevelFlowModifyTargetTag = LevelFlowModifyTargetTag;
//# sourceMappingURL=LevelFlowModifyTargetTag.js.map