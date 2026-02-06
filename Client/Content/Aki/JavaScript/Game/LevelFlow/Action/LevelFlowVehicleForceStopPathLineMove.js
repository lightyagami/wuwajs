"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowVehicleForceStopPathLineMove = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowVehicleForceStopPathLineMove extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E9 = undefined;
    this.E0 = undefined;
  }
  Init(e, t) {
    this.E9 = e;
    this.E0 = t;
    return this;
  }
  OnExecute() {
    var e = this.puc(this.E9, this.E0);
    if (e) {
      e.GetComponent(119)?.ForceStopSplineMove();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelFlow", 58, "目标实体不存在", ["Type", this.E9], ["EntityId", this.E0]);
    }
    this.FinishExecute(true);
  }
  puc(e, t) {
    switch (e) {
      case "Current":
        return this.guc();
      case "Appointed":
        if (t) {
          return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 50, "目标类型为Appointed时，entityId不能为空");
          }
          return;
        }
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 50, "不支持的目标类型", ["Type", e]);
        }
        return;
    }
  }
  guc() {
    if (Global_1.Global.BaseCharacter) {
      return Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(242)?.VehicleEntity;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 50, "获取玩家载具失败，找不到全局玩家角色");
    }
  }
}
exports.LevelFlowVehicleForceStopPathLineMove = LevelFlowVehicleForceStopPathLineMove;
//# sourceMappingURL=LevelFlowVehicleForceStopPathLineMove.js.map