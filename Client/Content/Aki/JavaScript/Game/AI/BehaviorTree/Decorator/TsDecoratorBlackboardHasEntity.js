"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ServerGmController_1 = require("../../../World/Controller/ServerGmController");
class TsDecoratorBlackboardHasEntity extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "";
    this.CompareValue = true;
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsCompareValue = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsCompareValue = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
      this.TsCompareValue = this.CompareValue;
    }
  }
  PerformConditionCheckAI(r, t) {
    var e = r.AiController;
    var o = ServerGmController_1.ServerGmController.AnimalDebug && this.BlackboardKey === "NearerPlayerId";
    if (o && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 6, "AnimalDebug BlackboardHasEntity", ["Tree", this.TreeAsset?.GetName()], ["aiController", !!e], ["aiComp", !!e?.CharAiDesignComp], ["SelfId", e?.CharActorComp?.Entity.Id]);
    }
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", r.GetClass().GetName()]);
      }
      return false;
    }
    r = e.CharAiDesignComp;
    if (!r) {
      return false;
    }
    this.InitTsVariables();
    if (this.TsBlackboardKey) {
      e = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(r.Entity.Id, this.TsBlackboardKey);
      if (o && (Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "AnimalDebug BlackboardHasEntity2", ["value", e]), e) && (o = EntitySystem_1.EntitySystem.GetComponent(e, 3)?.CreatureData.GetEntityType(), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("AI", 6, "AnimalDebug BlackboardHasEntity3", ["entityType", o], ["Player", Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()], ["MainAnims", r.Entity.GetComponent(186)?.MainAnimInstance?.GetMainAnimsDebugText()]);
      }
      if (e && EntitySystem_1.EntitySystem.Get(e)) {
        return this.TsCompareValue;
      }
    }
    return !this.TsCompareValue;
  }
}
exports.default = TsDecoratorBlackboardHasEntity;
//# sourceMappingURL=TsDecoratorBlackboardHasEntity.js.map