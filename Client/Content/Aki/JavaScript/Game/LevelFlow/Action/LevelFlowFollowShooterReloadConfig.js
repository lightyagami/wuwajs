"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowFollowShooterReloadConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const FollowUtils_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/FollowUtils");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowFollowShooterReloadConfig extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.Ueh = StringUtils_1.EMPTY_STRING;
  }
  Init(o) {
    this.Ueh = o;
    return this;
  }
  OnExecute() {
    var o = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
    var e = o.GetComponent(242);
    if (e && e.VehicleEntity) {
      if (e = FollowUtils_1.FollowUtils.GetPlayerFollowShooter(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.Entity?.GetComponent(235)) {
        e.AsyncReloadConfig(this.Ueh);
        this.FinishExecute(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "LevelFlowFollowShooterReloadConfig: shooterComp is null");
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, `LevelFlowFollowShooterReloadConfig OnExecute entityId: ${o.Id} not found CharacterDriveVehicleComponent`);
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["ConfigPath", this.Ueh]);
    }
  }
}
exports.LevelFlowFollowShooterReloadConfig = LevelFlowFollowShooterReloadConfig;
//# sourceMappingURL=LevelFlowFollowShooterReloadConfig.js.map