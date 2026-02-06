"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowChangeEntityGravityAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowChangeEntityGravityAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.Axa = undefined;
  }
  Init(e, t) {
    this.E0 = e;
    this.Axa = t;
    return this;
  }
  OnExecute() {
    var e;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0);
    if (t) {
      if (e = t.Entity.GetComponent(0)) {
        if (e.GetEntityType() === Protocol_1.Aki.Protocol.kks.HI_) {
          t.Entity.GetComponent(250)?.SetGravityDirectForVehicle(this.Axa);
        } else {
          t.Entity.GetComponent(48)?.SetGravityDirectWithoutRotate(this.Axa);
        }
        this.FinishExecute(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, `EntityId: ${this.E0} not found CreatureDataComponent`);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, `EntityId: ${this.E0} not found`);
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelFlowChangeEntityGravityAction = LevelFlowChangeEntityGravityAction;
//# sourceMappingURL=LevelFlowChangeEntityGravityAction.js.map