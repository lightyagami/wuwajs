"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
class TsDecoratorInTeamArea extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.TmpVector = undefined;
  }
  Constructor() {
    this.TmpVector = undefined;
  }
  PerformConditionCheckAI(r, e) {
    var o;
    var t;
    var i = r.AiController;
    if (i) {
      return !(o = i.AiHateList.GetCurrentTarget())?.Valid || !o.Entity.GetComponent(3) || !(o = i.CharAiDesignComp.Entity.Id, this.TmpVector ||= Vector_1.Vector.Create(), this.TmpVector.FromUeVector(ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(o, "TeamTargetLocation")), t = i.AiTeam.GetAiTeamAreaMemberData(i)) || AiContollerLibrary_1.AiControllerLibrary.InTeamArea(i, t);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", r.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorInTeamArea;
//# sourceMappingURL=TsDecoratorInTeamArea.js.map