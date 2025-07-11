"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../../UniverseEditor/Interface/IEntity");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const CHECK_DIRECTION = 8;
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
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var e = t.AiController;
    if (e) {
      e = e.CharActorComp;
      if (e?.Valid) {
        var r = e.Entity;
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
          this.RangeCenter.DeepCopy(e.ActorLocationProxy);
        }
        this.InitRangeInfo(r);
        o = this.RandomPosition;
        if (this.GetRandomPosition(t, e, o)) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(s, this.TsBlackboardKey, o.X, o.Y, o.Z);
          o.SubtractionEqual(e.ActorLocationProxy);
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
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t.BlueprintType);
          var t = (0, IEntity_1.decompressEntityData)(t, i);
          var e = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
          var r = t.Transform;
          switch (e.Shape.Type) {
            case "Box":
              this.RangeInfo = new AiContollerLibrary_1.BoxRangeEntityInfo(e.Shape, r);
              break;
            case "Sphere":
              this.RangeInfo = new AiContollerLibrary_1.SphereRangeEntityInfo(e.Shape, r);
          }
        }
      }
    }
  }
  GetRandomPosition(t, i, e) {
    var r = (0, puerts_1.$ref)(undefined);
    var s = UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(t, this.RangeCenter.ToUeVector(), r, this.TsRangeRadius);
    if (s) {
      e.FromUeVector((0, puerts_1.$unref)(r));
      e.Subtraction(this.RangeCenter, MathUtils_1.MathUtils.CommonTempVector);
      for (let t = 0; t < CHECK_DIRECTION; t++) {
        MathUtils_1.MathUtils.CommonTempVector.RotateAngleAxis((t + 1) * 45, i.ActorGravityDirectProxy, e);
        e.AdditionEqual(this.RangeCenter);
        if (s) {
          var o = !this.RangeInfo || this.RangeInfo.IsInRange(e);
          if (this.DebugDraw) {
            UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 30, 10, o ? ColorUtils_1.ColorUtils.LinearGreen : ColorUtils_1.ColorUtils.LinearRed, 3);
          }
          if (o) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
exports.default = TsTaskFindPositionInNavRange;
//# sourceMappingURL=TsTaskFindPositionInNavRange.js.map