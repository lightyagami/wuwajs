"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventVehicleSprint = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventVehicleSprint extends LevelGeneralBase_1.LevelEventBase {
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
          this.vuc();
          break;
        case "Appointed":
          this.CreateWaitEntityTask(this.OPt.TargetVehicle.VehicleId);
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
    this.vuc();
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
  }
  vuc() {
    if (this.Jh) {
      var e = this.Jh?.GetComponent(246);
      if (e) {
        switch (e.VehicleType) {
          case "Gongduola":
          case "FishingBoat":
            e?.TryEnterSprint(true);
        }
      }
    }
  }
}
exports.LevelEventVehicleSprint = LevelEventVehicleSprint;
//# sourceMappingURL=LevelEventVehicleSprint.js.map