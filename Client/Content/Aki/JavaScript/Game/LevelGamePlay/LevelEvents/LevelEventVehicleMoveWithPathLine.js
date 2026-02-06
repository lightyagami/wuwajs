"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventVehicleMoveWithPathLine = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventVehicleMoveWithPathLine extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.OPt = undefined;
  }
  ExecuteNew(e, t) {
    this.OPt = e;
    if (this.OPt) {
      switch (this.OPt.TargetVehicle.Type) {
        case "Current":
          this.Jh = this.guc();
          this.Cuc();
          break;
        case "Appointed":
          this.CreateWaitEntityTask(this.OPt.TargetVehicle.VehicleId);
          break;
        case "Triggered":
          if (t.Type === 5 && t.OtherEntityId) {
            this.Jh = EntitySystem_1.EntitySystem.Get(t.OtherEntityId);
            this.Cuc();
          }
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 50, "不支持的目标类型", ["Type", this.OPt.TargetVehicle.Type]);
          }
      }
    }
  }
  ExecuteWhenEntitiesReady() {
    this.puc(this.OPt.TargetVehicle);
    this.Cuc();
  }
  puc(e) {
    switch (e.Type) {
      case "Current":
        this.Jh = this.guc();
        break;
      case "Appointed":
        this.Jh = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.VehicleId)?.Entity;
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 50, "不支持的目标类型", ["Type", e.Type]);
        }
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
  Cuc() {
    if (this.Jh) {
      switch (this.OPt.ControlType.Type) {
        case "EnterPathMoving":
          var e = this.OPt.SplineEntityId;
          var t = this.Jh.GetComponent(119);
          t?.SetExtraMoveParams(this.OPt.ControlType.ControlParams);
          t?.StartSplineMove(e, this.OPt.ControlType.Pattern);
          break;
        case "ExitPathMoving":
          t = this.OPt.SplineEntityId;
          e = this.Jh.GetComponent(119);
          e?.ResetExtraMoveParams();
          e?.EndSplineMove(t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 50, "设置载具控制状态失败，无法找到目标实体");
    }
  }
}
exports.LevelEventVehicleMoveWithPathLine = LevelEventVehicleMoveWithPathLine;
//# sourceMappingURL=LevelEventVehicleMoveWithPathLine.js.map