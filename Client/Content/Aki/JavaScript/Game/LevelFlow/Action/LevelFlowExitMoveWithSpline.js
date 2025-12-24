"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowExitMoveWithSpline = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowExitMoveWithSpline extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
  }
  Init(e) {
    this.E0 = e;
    return this;
  }
  OnExecute() {
    var e;
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0);
    if (o && o.Entity) {
      if (e = o.Entity.GetComponent(0)) {
        if (e.GetEntityType() !== Protocol_1.Aki.Protocol.kks.HI_) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "LevelFlowExitMoveWithSpline 实体类型错误", ["entityId", this.E0]);
          }
          this.FinishExecute(false);
        } else if (e = o.Entity.GetComponent(249)) {
          e.StopMove();
          this.FinishExecute(true);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "LevelFlowExitMoveWithSpline 实体不存在VehicleMoveComponent", ["entityId", this.E0]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "LevelFlowExitMoveWithSpline 实体不存在CreatureDataComponent", ["entityId", this.E0]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "LevelFlowExitMoveWithSpline 实体不存在", ["entityId", this.E0]);
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0]);
    }
  }
}
exports.LevelFlowExitMoveWithSpline = LevelFlowExitMoveWithSpline;
//# sourceMappingURL=LevelFlowExitMoveWithSpline.js.map