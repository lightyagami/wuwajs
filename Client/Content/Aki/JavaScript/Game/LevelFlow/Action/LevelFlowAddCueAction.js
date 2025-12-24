"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowAddCueAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const FollowFunctionLibrary_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/FollowFunctionLibrary");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowAddCueAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.EntityId = 0;
    this.IsFloater = false;
    this.CueIdList = [];
  }
  Init(e, o, t = false) {
    this.EntityId = e;
    this.CueIdList = o;
    this.IsFloater = t;
    return this;
  }
  OnExecute() {
    let e = undefined;
    if (e = this.IsFloater ? FollowFunctionLibrary_1.FollowFunctionLibrary.GetPlayerFollowShooter(ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) : ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.EntityId)) {
      var o = e.Entity;
      if (o) {
        var t = o.GetComponent(238);
        if (t) {
          for (const i of this.CueIdList) {
            t.AddCue(i);
          }
          this.FinishExecute(true);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "实体没有BaseGameplayCueComponent", ["EntityId", this.EntityId]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "未找到实体", ["EntityId", this.EntityId]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "Entity加载超时或已被移除", ["EntityId", this.EntityId]);
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.EntityId], ["CueIdList", this.CueIdList.toString()]);
    }
  }
}
exports.LevelFlowAddCueAction = LevelFlowAddCueAction;
//# sourceMappingURL=LevelFlowAddCueAction.js.map