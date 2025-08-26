"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../../UniverseEditor/Interface/IEntity");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskFindPositionInNavRange extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.RangeCenterKey = "";
    this.RangeRadius = 0;
    this.BlackboardKey = "";
    this.BlackboardDirection = "";
    this.DebugDraw = false;
    this.IsInitTsVariables = false;
    this.TsRangeCenterKey = "";
    this.TsRangeRadius = 0;
    this.TsBlackboardKey = "";
    this.TsBlackboardDirection = "";
    this.RangeInfo = undefined;
    this.RangeCenter = undefined;
    this.RandomPosition = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsRangeCenterKey = "";
    this.TsRangeRadius = 0;
    this.TsBlackboardKey = "";
    this.TsBlackboardDirection = "";
    this.RangeInfo = undefined;
    this.RangeCenter = undefined;
    this.RandomPosition = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsRangeCenterKey = this.RangeCenterKey;
      this.TsRangeRadius = this.RangeRadius;
      this.TsBlackboardKey = this.BlackboardKey;
      this.TsBlackboardDirection = this.BlackboardDirection;
      this.RangeCenter = Vector_1.Vector.Create();
      this.RandomPosition = Vector_1.Vector.Create();
    }
  }
  ReceiveExecuteAI(t, e) {
    this.InitTsVariables();
    var i = t.AiController;
    if (i) {
      i = i.CharActorComp;
      if (i?.Valid) {
        var r = i.Entity;
        var s = r.Id;
        if (this.TsRangeCenterKey) {
          var o = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(s, this.TsRangeCenterKey);
          if (!o) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("BehaviorTree", 42, "不存在BlackboardKey", ["Key", this.TsRangeCenterKey]);
            }
            this.FinishExecute(false);
            return;
          }
          this.RangeCenter.DeepCopy(o);
        } else {
          this.RangeCenter.DeepCopy(i.ActorLocationProxy);
        }
        this.InitRangeInfo(r);
        o = this.RandomPosition;
        if (this.GetRandomPosition(t, i, o)) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(s, this.TsBlackboardKey, o.X, o.Y, o.Z);
          o.SubtractionEqual(i.ActorLocationProxy);
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(s, this.TsBlackboardDirection, o.X, o.Y, o.Z);
          this.FinishExecute(true);
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("BehaviorTree", 42, "TsTaskFindPositionInNavRange.未寻到合法点", ["center", this.RangeCenter], ["radius", this.TsRangeRadius]);
          }
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  InitRangeInfo(t) {
    t = t.GetComponent(0)?.GetPbEntityInitData();
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "AnimalComponent");
      if (t && t.MoveRange) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t.MoveRange);
        if (t) {
          var e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t.BlueprintType);
          var t = (0, IEntity_1.decompressEntityData)(t, e);
          var i = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
          var r = t.Transform;
          switch (i.Shape.Type) {
            case "Box":
              this.RangeInfo = new AiContollerLibrary_1.BoxRangeEntityInfo(i.Shape, r);
              break;
            case "Sphere":
              this.RangeInfo = new AiContollerLibrary_1.SphereRangeEntityInfo(i.Shape, r);
          }
        }
      }
    }
  }
  GetRandomPosition(t, e, i) {
    var r = (0, puerts_1.$ref)(undefined);
    if (UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(t, this.RangeCenter.ToUeVector(), r, this.TsRangeRadius)) {
      i.FromUeVector((0, puerts_1.$unref)(r));
      t = !this.RangeInfo || this.RangeInfo.IsInRange(i);
      if (this.DebugDraw) {
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, i.ToUeVector(), 30, 10, t ? ColorUtils_1.ColorUtils.LinearGreen : ColorUtils_1.ColorUtils.LinearRed, 3);
      }
      if (t) {
        r = this.DetectFloor(e, i);
        if (r) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, i);
          return true;
        }
      }
    }
    return false;
  }
  DetectFloor(t, e) {
    var i = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    i.WorldContextObject = t.Actor;
    i.Radius = t.ScaledRadius;
    var r = t.ScaledHalfHeight * 4;
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(e);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, MathUtils_1.MathUtils.CommonTempVector, r);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, MathUtils_1.MathUtils.CommonTempVector);
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(e);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, MathUtils_1.MathUtils.CommonTempVector, r * -2);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, MathUtils_1.MathUtils.CommonTempVector);
    i.ActorsToIgnore.Empty();
    for (const s of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      i.ActorsToIgnore.Add(s);
    }
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, i, "TsTaskFindPositionInNavRange", "TsTaskFindPositionInNavRange")) {
      return i.HitResult;
    } else {
      return undefined;
    }
  }
}
exports.default = TsTaskFindPositionInNavRange;
//# sourceMappingURL=TsTaskFindPositionInNavRange.js.map