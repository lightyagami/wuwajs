"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const TsAiController_1 = require("../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskGetTargetInfo extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.TargetKey = "";
    this.PositionKey = "";
    this.HpKey = "";
    this.IsInitTsVariables = false;
    this.TsTargetKey = "";
    this.TsPositionKey = "";
    this.TsHpKey = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsTargetKey = "";
    this.TsPositionKey = "";
    this.TsHpKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsTargetKey = this.TargetKey;
      this.TsPositionKey = this.PositionKey;
      this.TsHpKey = this.HpKey;
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    if (e instanceof TsAiController_1.default) {
      let t = e.AiController.CharActorComp;
      if (this.TsTargetKey) {
        e = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByWorld(this.TsTargetKey);
        if (!e) {
          this.FinishExecute(false);
          return;
        }
        e = EntitySystem_1.EntitySystem.Get(e);
        t = e.GetComponent(3);
      }
      if (t) {
        e = t.ActorLocation;
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByGlobal(this.TsPositionKey, e.X, e.Y, e.Z);
        if (e = t.Entity.GetComponent(173)) {
          e = e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
          ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByWorld(this.TsHpKey, e);
        }
        this.FinishExecute(true);
      } else {
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskGetTargetInfo;
//# sourceMappingURL=TsTaskGetTargetInfo.js.map