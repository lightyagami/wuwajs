"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const visionMark2VisionDisplayTargetMap = new Map([[0, "MechanicalDeer"], [1, "MechanicalDeerSunSpirit"], [2, "RockSpider"], [3, "PiPapa"], [4, "MammothCollision"], [5, "MammothSlide"], [6, "MammothSmashDown"]]);
class TsTaskLookForVisionDisplayTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.OutLocationBlackboardKey = "MoveToLocation";
    this.OutEntityIdBlackboardKey = "LookForVisionDisplayTargetEntityId";
    this.DetectDistance = 1000;
    this.NavigationOn = true;
    this.InteractVisionMarkType = 0;
    this.IsInitTsVariables = false;
    this.TsOutLocationBlackboardKey = "";
    this.TsOutEntityIdBlackboardKey = "";
    this.TsDetectDistance = 0;
    this.TsNavigationOn = false;
    this.TsInteractVisionDisplayType = "MechanicalDeer";
    this.TmpHandles = [];
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsOutLocationBlackboardKey = "";
    this.TsOutEntityIdBlackboardKey = "";
    this.TsDetectDistance = 0;
    this.TsNavigationOn = false;
    this.TsInteractVisionDisplayType = "MechanicalDeer";
    this.TmpHandles = [];
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsOutLocationBlackboardKey = this.OutLocationBlackboardKey;
      this.TsOutEntityIdBlackboardKey = this.OutEntityIdBlackboardKey;
      this.TsDetectDistance = this.DetectDistance;
      this.TsNavigationOn = this.NavigationOn;
      this.TsInteractVisionDisplayType = visionMark2VisionDisplayTargetMap.get(this.InteractVisionMarkType);
      this.TmpHandles = [];
    }
  }
  ReceiveTickAI(e, i, t) {
    this.InitTsVariables();
    var s = e.AiController;
    if (s) {
      if (this.TsOutEntityIdBlackboardKey && this.TsOutLocationBlackboardKey) {
        var r = s.CharActorComp.ActorLocationProxy;
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(r, this.TsDetectDistance, 7, this.TmpHandles);
        let i = MathUtils_1.MathUtils.Square(this.TsDetectDistance);
        let t = undefined;
        var o;
        var a;
        var l;
        var h = Vector_1.Vector.Create(0, 0, 0);
        for (const n of this.TmpHandles) {
          if (n.Entity?.Activate && (o = n.Entity.GetComponent(147)) && o.IsVisionDisplayType && o.VisionDisplayIsCanBeLookFor()) {
            if (!!(a = o.GetMoveTargetPos()) && !!(l = o.GetVisionDisplayType()) && l === this.TsInteractVisionDisplayType && !!o.CheckOnVisionDisplayType() && !((l = Vector_1.Vector.DistSquared(r, a)) > i) && (!this.TsNavigationOn || !!AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(e, r.ToUeVector(), a.ToUeVector()))) {
              i = l;
              t = n;
              h.DeepCopy(a);
            }
          }
        }
        s = s.CharActorComp.Entity.Id;
        if (t) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(s, this.TsOutEntityIdBlackboardKey, t.Entity.Id);
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(s, this.TsOutLocationBlackboardKey, h.X, h.Y, h.Z);
          this.FinishExecute(true);
        } else {
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(s, this.TsOutLocationBlackboardKey);
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(s, this.TsOutEntityIdBlackboardKey);
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 31, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskLookForVisionDisplayTarget;
//# sourceMappingURL=TsTaskLookForVisionDisplayTarget.js.map