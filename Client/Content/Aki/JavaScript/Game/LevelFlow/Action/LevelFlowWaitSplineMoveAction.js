"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowWaitSplineMoveAction = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
const extent = Vector_1.Vector.Create(30, 300, 500);
class LevelFlowWaitSplineMoveAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.Htn = 0;
    this.sCm = 0;
    this.aCm = undefined;
    this.n$t = undefined;
    this.Vnr = undefined;
  }
  Init(e, t, i) {
    this.E0 = e;
    this.Htn = t;
    this.sCm = i;
    if (ModelManager_1.ModelManager.LevelFlowModel.IsDebug) {
      this.Vnr = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t, e, 1);
      if (!this.Vnr) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "[LevelFlowWaitSplineMoveAction] 行为传入的路径未找到", ["PbDataId", this.Htn]);
        }
        return this;
      }
      i = this.Vnr.D_GetLocationAtSplineInputKey(this.sCm, 1);
      t = this.Vnr.GetRotationAtSplineInputKey(this.sCm, 1);
      UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, i, extent.ToUeVector(), ColorUtils_1.ColorUtils.LinearGreen, t, 1000, 10);
    }
    return this;
  }
  OnExecute() {
    var e;
    this.Vnr = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.Htn, this.E0, 1);
    if (this.Vnr) {
      if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0)) && e.Entity) {
        this.aCm = e.Entity.GetComponent(115);
        if (this.aCm) {
          this.n$t = e.Entity.GetComponent(1);
          if (this.n$t) {
            this.hCm();
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelFlow", 58, "[LevelFlowWaitSplineMoveAction] 行为传入的实体未找到基础组件", ["PbDataId", this.E0]);
            }
            this.FinishExecute(false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "[LevelFlowWaitSplineMoveAction] 行为传入的实体未找到路径移动组件", ["PbDataId", this.E0]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "[LevelFlowWaitSplineMoveAction] 行为传入的实体未找到", ["PbDataId", this.E0]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "[LevelFlowWaitSplineMoveAction] 行为传入的路径未找到", ["PbDataId", this.Htn]);
      }
      this.FinishExecute(false);
    }
  }
  OnTick(e) {
    this.hCm();
  }
  hCm() {
    if (this.aCm && this.n$t && this.Vnr) {
      if (this.Vnr.D_FindInputKeyClosestToWorldLocationInGravity(this.n$t.ActorLocationProxy.ToUeVector(), this.n$t.ActorGravityDirectProxy.ToUeVectorOld(), 100000) >= this.sCm) {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["SplineId", this.Htn], ["TimeKey", this.sCm]);
    }
  }
}
exports.LevelFlowWaitSplineMoveAction = LevelFlowWaitSplineMoveAction;
//# sourceMappingURL=LevelFlowWaitSplineMoveAction.js.map