"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowVehicleMoveWithPathLine = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowVehicleMoveWithPathLine extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.OPt = undefined;
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnExecute() {
    if (this.OPt) {
      switch (this.OPt.TargetVehicle.Type) {
        case "Current":
          this.Jh = this.guc();
          this.Cuc();
          break;
        case "Appointed":
          this.CreateWaitEntityTask(this.OPt.TargetVehicle.VehicleId);
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 50, "不支持的目标类型", ["Type", this.OPt.TargetVehicle.Type]);
          }
      }
    } else {
      this.FinishExecute(false);
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
        this.Jh = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.VehicleId)?.Entity;
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
          var t = this.Jh.GetComponent(117);
          t?.SetExtraMoveParams(this.OPt.ControlType.ControlParams);
          t?.StartSplineMove(e, this.OPt.ControlType.Pattern);
          if (ModelManager_1.ModelManager.LevelFlowModel.IsDebug) {
            t = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(e, this.Jh.Id, 1);
            this.mPm(t, this.OPt.ControlType.Pattern.MaxOffsetDistance ?? 0);
          }
          break;
        case "ExitPathMoving":
          e = this.OPt.SplineEntityId;
          t = this.Jh.GetComponent(117);
          t?.ResetExtraMoveParams();
          t?.EndSplineMove(e);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 50, "设置载具控制状态失败，无法找到目标实体");
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["ControlType", this.OPt.ControlType.Type], ["SplineEntityId", this.OPt.SplineEntityId]);
    }
  }
  mPm(t, i) {
    var o = t.GetSplineLength();
    for (let e = 0; e <= o; e += 100) {
      var a = t?.D_GetLocationAtDistanceAlongSpline(e, 1);
      var s = t?.D_GetDirectionAtDistanceAlongSpline(e, 1);
      s.Normalize(MathCommon_1.MathCommon.SmallNumber);
      var r = a;
      var a = a.op_Addition(s.op_Multiply(100));
      UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.World, r, a, i, 16, new UE.LinearColor(0, 1, 0, 1), 60, 1);
    }
  }
}
exports.LevelFlowVehicleMoveWithPathLine = LevelFlowVehicleMoveWithPathLine;
//# sourceMappingURL=LevelFlowVehicleMoveWithPathLine.js.map