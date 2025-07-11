"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SceneItemUtility_1 = require("../../../NewWorld/SceneItem/Util/SceneItemUtility");
class TsDecoratorItemIsValid extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.ItemBlackboardKey = "";
    this.IsInitTsVariables = false;
    this.TsItemBlackboardKey = "";
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsItemBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsItemBlackboardKey = this.ItemBlackboardKey;
    }
  }
  PerformConditionCheckAI(e, t) {
    var r = e.AiController;
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    e = r.CharActorComp;
    r = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(e.Entity.Id, this.TsItemBlackboardKey);
    r = EntitySystem_1.EntitySystem.Get(r);
    return !!r && !r.GetComponent(144)?.IsSearchByOther(e.Entity.Id) && !!SceneItemUtility_1.SceneItemUtility.GetBaseItemActor(r) && !!r.Active;
  }
}
exports.default = TsDecoratorItemIsValid;
//# sourceMappingURL=TsDecoratorItemIsValid.js.map