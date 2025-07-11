"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorDistance extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.Distance = 0;
    this.CompareType = 0;
    this.IsInitTsVariables = false;
    this.TsDistance = 0;
    this.TsCompareType = 0;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsDistance = 0;
    this.TsCompareType = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsDistance = this.Distance;
      this.TsCompareType = this.CompareType;
    }
  }
  PerformConditionCheckAI(e, r) {
    var t = e.AiController;
    if (t) {
      this.InitTsVariables();
      var t = t.CharActorComp;
      var s = t.Entity.CheckGetComponent(0);
      var s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(s.GetSummonerId());
      if (s !== 0) {
        s = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(s);
        if (!s) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 6, "主人已经被销毁", ["EntityId", t?.Entity.Id], ["Self", t.Actor.GetName()]);
          }
          return false;
        }
        var i = UE.VectorDouble.DistSquared(s.ActorLocation, t.ActorLocation);
        switch (this.TsCompareType) {
          case 0:
            if (i === this.TsDistance * this.TsDistance) {
              return true;
            }
            break;
          case 1:
            if (i < this.TsDistance * this.TsDistance) {
              return true;
            }
            break;
          case 2:
            if (i > this.TsDistance * this.TsDistance) {
              return true;
            }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
    }
    return false;
  }
}
exports.default = TsDecoratorDistance;
//# sourceMappingURL=TsDecoratorDistance.js.map