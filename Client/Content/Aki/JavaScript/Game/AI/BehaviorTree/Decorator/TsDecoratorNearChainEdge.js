"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorNearChainEdge extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.DistToChainEdgeLessThan = 0;
    this.IsInitTsVariables = false;
    this.TsDistToChainEdgeLessThan = -0;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsDistToChainEdgeLessThan = -0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsDistToChainEdgeLessThan = this.DistToChainEdgeLessThan;
    }
  }
  PerformConditionCheckAI(e, r) {
    this.InitTsVariables();
    var o;
    var t;
    var a = e.AiController;
    if (a) {
      return (o = a.AiHateList.AiHate?.MaxMoveFromBorn) !== undefined && !(o < 0) && (o < this.TsDistToChainEdgeLessThan ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("BehaviorTree", 6, "TsDecoratorNearChainEdge配置的距离比ChainEdge要短，因此永远为True", ["BT", this.TreeAsset.GetName()]), true) : (t = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(a.CharActorComp.Entity.Id, "CenterLocation"), TsDecoratorNearChainEdge.TmpVector.FromUeVector(t ?? a.CharActorComp.GetInitLocation()), Vector_1.Vector.DistSquared2D(TsDecoratorNearChainEdge.TmpVector, a.CharActorComp.ActorLocationProxy) >= MathUtils_1.MathUtils.Square(o - this.TsDistToChainEdgeLessThan)));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
  }
}
TsDecoratorNearChainEdge.TmpVector = Vector_1.Vector.Create();
exports.default = TsDecoratorNearChainEdge; //# sourceMappingURL=TsDecoratorNearChainEdge.js.map