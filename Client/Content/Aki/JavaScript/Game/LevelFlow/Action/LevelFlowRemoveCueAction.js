"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowRemoveCueAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const FollowUtils_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/FollowUtils");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowRemoveCueAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.EntityId = 0;
    this.IsFloater = false;
    this.CueIdList = [];
  }
  Init(e, o, t = false) {
    this.EntityId = e;
    this.IsFloater = t;
    this.CueIdList = o;
    return this;
  }
  OnExecute() {
    let e = undefined;
    if (e = this.IsFloater ? FollowUtils_1.FollowUtils.GetPlayerFollowShooter(ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) : ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.EntityId)) {
      var o = e.Entity;
      if (o) {
        var t = o.GetComponent(238);
        if (t) {
          for (const i of this.CueIdList) {
            t.RemoveCue(i);
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
}
exports.LevelFlowRemoveCueAction = LevelFlowRemoveCueAction;
//# sourceMappingURL=LevelFlowRemoveCueAction.js.map