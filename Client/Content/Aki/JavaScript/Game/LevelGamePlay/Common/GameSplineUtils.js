"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSplineUtils = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
class GameSplineUtils {
  static InitGameSpline(e, t) {
    let o = Vector_1.Vector.ZeroVectorDouble;
    let r = undefined;
    let i = false;
    if (e.IsA(UE.BP_BasePathLine_C.StaticClass())) {
      var a = e;
      r = a.Spline;
      var n = UE.KismetMathLibrary.Conv_VectorToVectorDouble(a.OriginalLocation);
      o = n;
      i = a.IsAttachedToEntity;
      if (GlobalData_1.GlobalData.IsPlayInEditor && t) {
        a.DebugTarget = t.Owner;
      }
    } else {
      if (!e.IsA(UE.BP_MovePathLine_C.StaticClass())) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 7, "加载的内容不是支持的Spline", ["AssetType", e.GetName()]);
        }
        return r;
      }
      n = e;
      r = n.Spline;
      a = UE.KismetMathLibrary.Conv_VectorToVectorDouble(n.OriginalLocation);
      o = a;
      i = n.IsAttachedToEntity;
      if (GlobalData_1.GlobalData.IsPlayInEditor && t) {
        n.DebugTarget = t.Owner;
      }
    }
    if (r && ObjectUtils_1.ObjectUtils.IsValid(r)) {
      if (i && t) {
        e.D_K2_SetActorLocationAndRotation(t.ActorLocation, t.ActorRotation, false, undefined, false);
      } else {
        e.D_K2_SetActorLocationAndRotation(o, Rotator_1.Rotator.ZeroRotator, false, undefined, false);
      }
    }
    return r;
  }
  static InitGameSplineBySplineEntity(t, o) {
    if (o?.IsValid()) {
      let e = o.GetComponentByClass(UE.SplineComponent.StaticClass());
      e = e || o.AddComponentByClass(UE.SplineComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
      if (r) {
        var i = Vector_1.Vector.Create(r.Transform?.Pos?.X ?? 0, r.Transform?.Pos?.Y ?? 0, r.Transform?.Pos?.Z ?? 0);
        var a = Rotator_1.Rotator.Create(r.Transform?.Rot?.Y ?? 0, r.Transform?.Rot?.Z ?? 0, r.Transform?.Rot?.X ?? 0);
        var r = (0, IComponent_1.getComponent)(r.ComponentsData, "SplineComponent");
        if (r) {
          o.D_K2_SetActorLocationAndRotation(i.ToUeVector(), a.ToUeRotator(), false, undefined, false);
          i = r.Option;
          e.ClearSplinePoints();
          a = this.CreateCommonPoints(i.Points);
          e.AddPoints(a);
          o.SplineData = r.Option;
          e.UpdateSpline();
          return e;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 31, "[InitGameSplineBySplineEntity] 找不到pdDataId对应的ComponentsData找不到SplineComponent", ["pbDataId", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 31, "[InitGameSplineBySplineEntity] 找不到pdDataId对应的数据", ["pbDataId", t]);
      }
    }
  }
  static CreateCommonPoints(t) {
    var o = UE.NewArray(UE.SplinePoint);
    if (t.length > 0) {
      var r = [];
      var i = [];
      var a = [];
      var n = [];
      var l = [];
      for (const c of t) {
        var e = Vector_1.Vector.Create(c.Position.X ?? 0, c.Position.Y ?? 0, c.Position.Z ?? 0);
        r.push(e);
        var e = Rotator_1.Rotator.Create(c.Rotation?.Y ?? 0, c.Rotation?.Z ?? 0, c.Rotation?.X ?? 0);
        i.push(e);
        var e = Vector_1.Vector.Create(c.ArriveTangent.X ?? 0, c.ArriveTangent.Y ?? 0, c.ArriveTangent.Z ?? 0);
        a.push(e);
        var e = Vector_1.Vector.Create(c.LeaveTangent.X ?? 0, c.LeaveTangent.Y ?? 0, c.LeaveTangent.Z ?? 0);
        n.push(e);
        switch (c.LineType) {
          case IComponent_1.ESplineLine.Linear:
            l.push(0);
            break;
          case IComponent_1.ESplineLine.CurveCustomTangent:
            l.push(4);
            break;
          case IComponent_1.ESplineLine.Curve:
            l.push(1);
            break;
          case IComponent_1.ESplineLine.Constant:
            l.push(2);
        }
      }
      for (let e = 0; e < t.length; e++) {
        var s = new UE.SplinePoint(e, r[e].ToUeVectorOld(), a[e].ToUeVectorOld(), n[e].ToUeVectorOld(), i[e].ToUeRotator(), Vector_1.Vector.OneVector, l[e]);
        o.Add(s);
      }
    }
    return o;
  }
  static GenerateGuideEffect(e, t, o) {
    var r = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    r.D_K2_SetActorLocation(e.ToUeVector(), false, undefined, true);
    var e = r.GetComponentByClass(UE.SplineComponent.StaticClass());
    e.D_SetSplinePoints(t, 0, true);
    var t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, o, "[GameSplineUtils.GenerateEffectHandle]", new EffectContext_1.EffectContext(undefined, r));
    if (EffectSystem_1.EffectSystem.IsValid(t)) {
      EffectSystem_1.EffectSystem.GetEffectActor(t).K2_AttachToActor(r, undefined, 2, 2, 2, false);
      return {
        EffectHandle: t,
        SplineActor: r,
        SplineComp: e
      };
    }
  }
  static GenerateGuideEffectWithSplineData(e, t, o) {
    if (!StringUtils_1.StringUtils.IsEmpty(o)) {
      var e = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), e);
      var r = e.GetComponentByClass(UE.SplineComponent.StaticClass());
      r.ClearSplinePoints();
      var t = this.CreateCommonPoints(t);
      r.AddPoints(t);
      var t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, o, "[GameSplineUtils.GenerateEffectHandle]", new EffectContext_1.EffectContext(undefined, e));
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        EffectSystem_1.EffectSystem.GetEffectActor(t).K2_AttachToActor(e, undefined, 2, 2, 2, false);
        return {
          EffectHandle: t,
          SplineActor: e,
          SplineComp: r
        };
      }
    }
  }
}
exports.GameSplineUtils = GameSplineUtils;
//# sourceMappingURL=GameSplineUtils.js.map