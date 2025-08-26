"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelRangeDebugDrawController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Queue_1 = require("../../../Core/Container/Queue");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ReachAreaBehaviorNode_1 = require("../../Module/GeneralLogicTree/BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode");
const ColorUtils_1 = require("../ColorUtils");
const LevelRangeDebugDrawModel_1 = require("./LevelRangeDebugDrawModel");
const DRAW_INTERVAL = 1000;
const DRAW_DURATION = 1.2;
const DRAW_SEGMENTS = 12;
const DRAW_ARROW_SIZE = 20;
const DRAW_SPHERE_RADIUS = 15;
const DRAW_HIT_DURATION = 1;
const DRAW_THICKNESS = 3;
const DRAW_VOLUME_MAX = 5;
const DRAW_IMPULSE_OFFSET = 30;
const DRAW_IMPULSE_LENGTH_MIN = 20;
const DRAW_IMPULSE_LENGTH_MAX = 200;
const DRAW_PHYS_OFFSET = 15;
const DRAW_IMPACT_LENGTH = 50;
const RANGE_ENTITY_TEMPLATE_ID = 34900000;
class LevelRangeDebugDrawController extends ControllerBase_1.ControllerBase {
  static InitData() {
    var e;
    if (!ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawDataMap) {
      (e = new Map()).set(0, this.kVu(true, 1, 0, 0));
      e.set(1, this.kVu(true, 0, 1, 0));
      e.set(2, this.kVu(true, 0, 0, 1));
      e.set(3, this.kVu(false, 1, 1, 0));
      e.set(4, this.kVu(true, 0, 1, 1));
      e.set(5, this.kVu(true, 1, 1, 1));
      ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawDataMap = e;
      ModelManager_1.ModelManager.LevelRangeDebugDrawModel.QuestReferenceDataMap = new Map();
      ModelManager_1.ModelManager.LevelRangeDebugDrawModel.LevelPlayReferenceDataMap = new Map();
      ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawVolumeCache = new Queue_1.Queue();
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawMode = 2;
      } else {
        ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawMode = 1;
      }
    }
  }
  static kVu(e, a, r, t) {
    var _ = new LevelRangeDebugDrawModel_1.LevelRangeDrawData();
    _.Enable = e;
    _.LinearColor = new UE.LinearColor(a, r, t, 1);
    return _;
  }
  static SetDrawMode(e) {
    ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawMode = e;
  }
  static SetDrawData(e, a, r, t, _) {
    e = ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawDataMap?.get(e);
    if (e) {
      r = new UE.LinearColor(r, t, _, 1);
      e.Enable = a;
      e.LinearColor = r;
    }
  }
  static OnTick(e) {}
  static GVu(e, a, r) {
    let t = ModelManager_1.ModelManager.LevelRangeDebugDrawModel.QuestReferenceDataMap?.get(e);
    if (!t) {
      var _ = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e);
      if (!_) {
        return;
      }
      _ = _.Reference;
      if (!_ || _.length === 0) {
        return;
      }
      t = this.VVu(_);
      ModelManager_1.ModelManager.LevelRangeDebugDrawModel.QuestReferenceDataMap?.set(e, t);
    }
    for (const l of t.PbDataIds) {
      r.add(l);
    }
    for (const i of t.LevelPlayIds) {
      var o = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(i);
      if (o && !a.has(o)) {
        a.add(o);
        this.qVu(o.Id, a, r);
      }
    }
  }
  static qVu(e, a, r) {
    let t = ModelManager_1.ModelManager.LevelRangeDebugDrawModel.LevelPlayReferenceDataMap?.get(e);
    if (!t) {
      var _ = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e);
      if (!_) {
        return;
      }
      _ = _.Reference;
      if (!_ || _.length === 0) {
        return;
      }
      t = this.VVu(_);
      ModelManager_1.ModelManager.LevelRangeDebugDrawModel.LevelPlayReferenceDataMap?.set(e, t);
    }
    for (const l of t.PbDataIds) {
      r.add(l);
    }
    for (const e of t.LevelPlayIds) {
      var o = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(e);
      if (o && !a.has(o)) {
        a.add(o);
        this.qVu(o.Id, a, r);
      }
    }
  }
  static VVu(e) {
    var a = new LevelRangeDebugDrawModel_1.LevelRangeTreeReferenceData();
    for (const _ of e) {
      var r = _.split("_");
      var t = r[0];
      var r = r[2];
      if (t === "e") {
        a.PbDataIds.add(Number(r));
      } else if (t === "l") {
        a.LevelPlayIds.add(Number(r));
      }
    }
    return a;
  }
  static FVu(e, a, r, t) {
    var _ = e.GetRangeType();
    if (_ === "Volume") {
      var o = e.GetRangeActor();
      if (o) {
        t.set(o, a);
      }
    } else if (_ === "ActorRefVolume") {
      o = e.Entity.GetComponent(164)?.GetRefVolumes();
      if (o) {
        for (const l of o) {
          t.set(l, a);
        }
      }
    } else {
      r.set(e, a);
    }
  }
  static NVu(e, a) {
    var r = e.GetShapeConfig();
    if (e && r) {
      var t = r.Type;
      switch (t) {
        case "Box":
        case "Sphere":
        case "HollowSphere":
        case "Combination":
          var _ = e.GetShapeComps();
          for (const l of _) {
            this.jVu(l, a);
          }
          for (const i of e.GetExpandedExitShapeComps()) {
            this.jVu(i, a);
          }
          if (t === "HollowSphere" && _.length > 0) {
            _ = _[0];
            UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, _.D_K2_GetComponentLocation(), r.InnerRadius, undefined, a.LinearColor, DRAW_DURATION);
          }
          break;
        case "Cylinder":
          _ = e.GetMeshComp();
          if (_) {
            this.HVu(_, r.Height, r.Radius, 0, a);
          }
          _ = e.GetExpandedExitMeshComp();
          if (_) {
            o = e.GetExpandedExitRangeValue();
            this.HVu(_, r.Height + o, r.Radius + o, 0, a);
          }
          break;
        case "HollowCylinder":
          var _ = e.GetMeshComp();
          if (_) {
            this.HVu(_, r.Height, r.Radius, r.InnerRadius, a);
          }
          var o = e.GetExpandedExitMeshComp();
          if (o) {
            _ = e.GetExpandedExitRangeValue();
            this.HVu(o, r.Height + _, r.Radius + _, 0, a);
          }
          break;
        case "Cone":
          var o = e.GetMeshComp();
          if (o) {
            this.$Vu(o, r.Height, r.Radius, a);
          }
          var _ = e.GetExpandedExitMeshComp();
          if (_) {
            o = e.GetExpandedExitRangeValue();
            this.$Vu(_, r.Height + o, r.Radius + o, a);
          }
      }
    }
  }
  static jVu(e, a) {
    if (e instanceof UE.BoxComponent) {
      UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, e.D_K2_GetComponentLocation(), new UE.VectorDouble(e.BoxExtent), a.LinearColor, e.K2_GetComponentRotation(), DRAW_DURATION);
    } else if (e instanceof UE.SphereComponent) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.D_K2_GetComponentLocation(), e.SphereRadius, undefined, a.LinearColor, DRAW_DURATION);
    }
  }
  static HVu(e, a, r, t, _) {
    var a = a / 2;
    var o = e.D_K2_GetComponentLocation();
    var e = e.D_GetUpVector().op_Multiply(a);
    var a = o.op_Addition(e);
    var o = o.op_Subtraction(e);
    UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.World, a, o, r, DRAW_SEGMENTS, _.LinearColor, DRAW_DURATION);
    if (t > 0) {
      UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.World, a, o, t, DRAW_SEGMENTS, _.LinearColor, DRAW_DURATION);
    }
  }
  static $Vu(e, a, r, t) {
    var _ = Math.sqrt(a * a + r * r);
    var r = Math.atan(r / a);
    var o = e.D_GetUpVector();
    UE.KismetSystemLibrary.D_DrawDebugCone(GlobalData_1.GlobalData.World, e.D_K2_GetComponentLocation().op_Addition(o.op_Multiply(a / 2)), o.op_UnaryNegation(), _, r, r, DRAW_SEGMENTS, t.LinearColor, DRAW_DURATION);
  }
  static OVu() {
    var a = ModelManager_1.ModelManager.LevelRangeDebugDrawModel.DrawVolumeCache;
    if (a && !a.Empty) {
      for (let e = 0; e < DRAW_VOLUME_MAX; e++) {
        var r = a.Pop();
        if (!r) {
          break;
        }
        if (r.Actor?.IsValid() && r.DrawData) {
          this.WVu(r.Actor, r.DrawData);
        }
      }
    }
  }
  static WVu(e, a) {
    if (a.LinearColor && e instanceof UE.Brush) {
      e = e.GetComponentByClass(UE.BrushComponent.StaticClass());
      if (e?.IsValid() && e.K2_IsCollisionEnabled()) {
        var r = (0, puerts_1.$ref)(UE.NewArray(UE.Vector));
        e.GetBrushPolysVertices(r);
        var t = (0, puerts_1.$unref)(r);
        var _ = t.Num();
        if (!(_ <= 0)) {
          var o = e.D_K2_GetComponentToWorld();
          var l = new UE.VectorDouble(0, 0, 0);
          for (let e = 0; e < _; e++) {
            var i;
            var s = t.Get(e);
            if (l.IsNearlyZero(0.001)) {
              l.Set(s.X, s.Y, s.Z);
            }
            if (s.IsNearlyZero(0.001)) {
              l.Set(0, 0, 0);
            } else {
              i = t.Get((e + 1) % _);
              UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, o.TransformPosition(UE.KismetMathLibrary.Conv_VectorToVectorDouble(s)), i.IsNearlyZero(0.001) ? o.TransformPosition(l) : o.TransformPosition(UE.KismetMathLibrary.Conv_VectorToVectorDouble(i)), a.LinearColor, DRAW_DURATION);
            }
          }
        }
      }
    }
  }
}
(exports.LevelRangeDebugDrawController = LevelRangeDebugDrawController).DebugDrawComponentHit = (e, a, r, t, _) => {
  var o;
  if (e && a && r && t && (a = _.ImpactPoint, r = _.ImpactNormal, o = t.GetSafeNormal(MathUtils_1.MathUtils.KindaSmallNumber), t = t.Size(), UE.KismetSystemLibrary.DrawDebugSphere(e, a, DRAW_SPHERE_RADIUS, DRAW_SEGMENTS, ColorUtils_1.ColorUtils.LinearYellow, DRAW_HIT_DURATION), UE.KismetSystemLibrary.DrawDebugArrow(e, a, a.op_Addition(r.op_Multiply(DRAW_IMPACT_LENGTH)), DRAW_ARROW_SIZE, ColorUtils_1.ColorUtils.LinearGreen, DRAW_HIT_DURATION, DRAW_THICKNESS), t > 0 && (UE.KismetSystemLibrary.DrawDebugArrow(e, a, a.op_Addition(o.op_Multiply(MathUtils_1.MathUtils.Clamp(t, DRAW_IMPULSE_LENGTH_MIN, DRAW_IMPULSE_LENGTH_MAX))), DRAW_ARROW_SIZE, ColorUtils_1.ColorUtils.LinearRed, DRAW_HIT_DURATION, DRAW_THICKNESS), UE.KismetSystemLibrary.DrawDebugString(e, a.op_Addition(new UE.Vector(0, 0, DRAW_IMPULSE_OFFSET)), `Impulse: ${t}f N`, undefined, ColorUtils_1.ColorUtils.LinearRed, DRAW_HIT_DURATION)), _.PhysMaterial?.IsValid() && UE.KismetSystemLibrary.DrawDebugString(e, a.op_Addition(new UE.Vector(0, 0, DRAW_PHYS_OFFSET)), "Material: " + _.PhysMaterial.GetName(), undefined, ColorUtils_1.ColorUtils.LinearWhite, DRAW_HIT_DURATION), _.PenetrationDepth > 0.1)) {
    UE.KismetSystemLibrary.DrawDebugLine(e, a, a.op_Subtraction(_.TraceEnd.op_Subtraction(_.TraceStart).GetSafeNormal(MathUtils_1.MathUtils.KindaSmallNumber).op_Multiply(_.PenetrationDepth)), ColorUtils_1.ColorUtils.LinearBlue, DRAW_HIT_DURATION, DRAW_THICKNESS);
  }
};
//# sourceMappingURL=LevelRangeDebugDrawController.js.map