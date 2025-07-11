"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnterVehicleNpc = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnterVehicleNpc extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.nx = undefined;
  }
  ExecuteNew(e, t) {
    this.OPt = e;
    this.nx = t;
    if (this.OPt && this.OPt.Target) {
      this.CreateWaitEntityTask(this.OPt.Target);
    } else {
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    var e = this.OPt;
    var t = this.nx;
    if (e && t) {
      this._bl(e, t);
    } else {
      this.FinishExecute(false);
    }
  }
  _bl(e, t) {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    var s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.Target)?.Entity;
    if (i) {
      if (s = s?.GetComponent(233)) {
        s.TryEnter(i, e.Seat);
        this.FinishExecute(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "进入载具NPC时获取目标载具实体失败", ["TargetVehicle", e.Target]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "进入载具NPC时无法获取目标乘客");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventEnterVehicleNpc = LevelEventEnterVehicleNpc;
//# sourceMappingURL=LevelEventEnterVehicleNpc.js.map