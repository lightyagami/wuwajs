"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowFloaterUseSkillAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const FollowUtils_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/FollowUtils");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowFloaterUseSkillAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.wmo = 0;
  }
  Init(e) {
    this.wmo = e;
    return this;
  }
  OnExecute() {
    var e;
    var o;
    var l = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
    var t = l.GetComponent(242);
    if (t && t.VehicleEntity) {
      if ((e = FollowUtils_1.FollowUtils.GetPlayerFollowShooter(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())) && e.Entity) {
        if (o = e.Entity.GetComponent(42)) {
          o.BeginSkillAsync(this.wmo, {
            Reason: "LevelFlowUseSkillAction"
          });
          this.FinishExecute(true);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, `LevelFlowFloaterUseSkillAction OnExecute entityId: ${e.Id} not found BaseSkillComponent`);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, `LevelFlowFloaterUseSkillAction OnExecute entityId: ${t.VehicleEntity.Id} not found FollowerEntity`);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, `LevelFlowFloaterUseSkillAction OnExecute entityId: ${l.Id} not found CharacterDriveVehicleComponent`);
      }
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["SkillId", this.wmo]);
    }
  }
}
exports.LevelFlowFloaterUseSkillAction = LevelFlowFloaterUseSkillAction;
//# sourceMappingURL=LevelFlowFloaterUseSkillAction.js.map