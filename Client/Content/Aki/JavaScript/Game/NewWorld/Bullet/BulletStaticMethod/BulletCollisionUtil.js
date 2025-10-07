"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCollisionUtil = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Queue_1 = require("../../../../Core/Container/Queue");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent");
const BulletConstant_1 = require("../BulletConstant");
const BulletUtil_1 = require("../BulletUtil");
const BulletPool_1 = require("../Model/BulletPool");
const BulletStaticFunction_1 = require("./BulletStaticFunction");
class BulletCollisionUtil {
  static UpdateCollisionExtend(t, l, e, o, i) {
    switch (t) {
      case 0:
        l.D_SetBoxExtent(e.ToUeVector(), true);
        break;
      case 1:
        l.SetSphereRadius(e.X, true);
        break;
      case 2:
        var a = this.GetSectorExtent(e, o);
        var r = l;
        var s = BulletPool_1.BulletPool.CreateVector();
        i.Quaternion().RotateVector(BulletCollisionUtil.eHo, s);
        r.D_K2_SetRelativeLocation(s.ToUeVector(), false, undefined, true);
        BulletPool_1.BulletPool.RecycleVector(s);
        r.D_SetBoxExtent(a.ToUeVector(), true);
        break;
      case 3:
        l.D_SetBoxExtent(new UE.VectorDouble(e.X, e.X, e.Z), true);
    }
  }
  static UpdateRegionExtend(t, l, e) {
    switch (t) {
      case 6:
        l.BoxExtent = e.ToUeVectorOld();
        break;
      case 7:
        l.Radius = e.X;
        break;
      case 8:
        l.Radius = e.X;
        l.HalfHeight = e.Z;
        l.Angle = e.Y;
        break;
      case 9:
        l.Radius = e.X;
        l.HalfHeight = e.Z;
    }
  }
  static GetSectorExtent(t, l) {
    BulletCollisionUtil.eHo.FromUeVector(l);
    var e;
    var l = Vector_1.Vector.Create();
    if (t.Y < 180) {
      BulletCollisionUtil.eHo.X += t.X * 0.5;
      l.Set(t.X * 0.5, Math.sin(t.Y * 0.5 * MathUtils_1.MathUtils.DegToRad) * t.X, t.Z);
    } else {
      e = Math.cos(t.Y * 0.5 * MathUtils_1.MathUtils.DegToRad);
      BulletCollisionUtil.eHo.X += t.X * (1 + e) * 0.5;
      l.Set(t.X * (1 - e) * 0.5, t.X, t.Z);
    }
    return l;
  }
  static ShowBulletDeBugDraw(t) {
    var l;
    var e;
    var o;
    var i;
    var a;
    var r;
    var s;
    UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, t.ActorComponent.ActorLocation, 10, undefined, ColorUtils_1.ColorUtils.LinearRed);
    if (!t.Size.IsZero()) {
      l = t.BulletDataMain.Base.Shape;
      o = t.CollisionInfo.CollisionComponent;
      if (l === 3) {
        r = o.BoundsScale;
        BulletStaticFunction_1.BulletStaticFunction.DebugDrawRing(t.Size.Z * r, r * t.Size.Y, t.Size.X * r, t.CenterLocation, t.ActorComponent.ActorUpProxy);
        if (t.BulletDataMain?.Base.DebugShowProgress) {
          (e = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.CenterLocation);
          e.Z -= t.Size.Z * r;
          s = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond;
          r = MathUtils_1.MathUtils.Lerp(r * t.Size.Y, t.Size.X * r, s / t.Duration);
          UE.KismetSystemLibrary.D_DrawDebugCircle(GlobalData_1.GlobalData.GameInstance, e.ToUeVector(), r, 36, ColorUtils_1.ColorUtils.LinearRed, t.Duration - s, 3, t.Actor?.D_GetActorRightVector(), t.Actor?.D_GetActorForwardVector(), false);
          BulletPool_1.BulletPool.RecycleVector(e);
        }
      } else if (l === 2) {
        r = o.BoundsScale;
        (s = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(t.CollisionRotator);
        BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(t.Size.Z * r, t.Size.X * r, t.Size.Y, s.Quaternion(), t.CenterLocation, t.ActorComponent.ActorUpProxy);
        if (t.BulletDataMain?.Base.DebugShowProgress) {
          e = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond;
          a = MathUtils_1.MathUtils.Lerp(0, t.Size.Y, e / t.Duration);
          (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.CenterLocation);
          i.Z -= t.Size.Z * r;
          BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(1, t.Size.X * r, a, s.Quaternion(), i, t.ActorComponent.ActorUpProxy, ColorUtils_1.ColorUtils.LinearRed, t.Duration - e);
          BulletPool_1.BulletPool.RecycleVector(i);
        }
        BulletPool_1.BulletPool.RecycleRotator(s);
      } else if (l === 0) {
        r = o.BoundsScale;
        (a = BulletPool_1.BulletPool.CreateVector()).FromUeVector(o.BoxExtent);
        a.MultiplyEqual(r);
        UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.GameInstance, o.D_K2_GetComponentLocation(), a.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow, o.K2_GetComponentRotation(), 0, 1);
        if (t.BulletDataMain?.Base.DebugShowProgress) {
          e = BulletPool_1.BulletPool.CreateVector();
          i = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond;
          Vector_1.Vector.Lerp(Vector_1.Vector.ZeroVectorProxy, a, i / t.Duration, e);
          e.Z = 4;
          (s = BulletPool_1.BulletPool.CreateVector()).FromUeVector(o.D_K2_GetComponentLocation());
          s.Z -= a.Z + 2;
          UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.GameInstance, s.ToUeVector(), e.ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, o.K2_GetComponentRotation(), t.Duration - i, 2);
          BulletPool_1.BulletPool.RecycleVector(e);
          BulletPool_1.BulletPool.RecycleVector(s);
        }
        BulletPool_1.BulletPool.RecycleVector(a);
      } else if (l === 1) {
        r = o.GetScaledSphereRadius();
        (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(o.D_K2_GetComponentLocation());
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, i.ToUeVector(), r, undefined, ColorUtils_1.ColorUtils.LinearGreen);
        if (t.BulletDataMain?.Base.DebugShowProgress) {
          e = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond;
          s = MathUtils_1.MathUtils.Lerp(0, r, e / t.Duration);
          UE.KismetSystemLibrary.D_DrawDebugCircle(GlobalData_1.GlobalData.GameInstance, i.ToUeVector(), s, 36, ColorUtils_1.ColorUtils.LinearRed, t.Duration - e, 3, t.Actor?.D_GetActorRightVector(), t.Actor?.D_GetActorForwardVector(), false);
        }
        BulletPool_1.BulletPool.RecycleVector(i);
      } else if (l === 6) {
        a = t.CollisionInfo.RegionComponent;
        (o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(a.BoxExtent);
        UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.GameInstance, a.D_K2_GetComponentLocation(), o.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow, a.K2_GetComponentRotation(), 0, 1);
        if (t.BulletDataMain?.Base.DebugShowProgress) {
          r = BulletPool_1.BulletPool.CreateVector();
          s = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond;
          Vector_1.Vector.Lerp(Vector_1.Vector.ZeroVectorProxy, o, s / t.Duration, r);
          r.Z = 4;
          (e = BulletPool_1.BulletPool.CreateVector()).FromUeVector(a.D_K2_GetComponentLocation());
          e.Z -= o.Z + 2;
          UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.GameInstance, e.ToUeVector(), r.ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, a.K2_GetComponentRotation(), t.Duration - s, 2);
          BulletPool_1.BulletPool.RecycleVector(r);
          BulletPool_1.BulletPool.RecycleVector(e);
        }
        BulletPool_1.BulletPool.RecycleVector(o);
      } else if (l === 7) {
        i = t.Size.X;
        a = t.ActorComponent.ActorLocation;
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, a, i, undefined, ColorUtils_1.ColorUtils.LinearGreen);
        if (t.BulletDataMain?.Base.DebugShowProgress) {
          s = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond;
          r = MathUtils_1.MathUtils.Lerp(0, i, s / t.Duration);
          UE.KismetSystemLibrary.D_DrawDebugCircle(GlobalData_1.GlobalData.GameInstance, a, r, 36, ColorUtils_1.ColorUtils.LinearRed, t.Duration - s, 3, t.Actor?.D_GetActorRightVector(), t.Actor?.D_GetActorForwardVector(), false);
        }
      } else if (l === 8) {
        e = t.CollisionInfo.RegionComponent;
        (o = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(t.CollisionRotator);
        BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(e.HalfHeight, e.Radius, e.Angle, o.Quaternion(), t.CenterLocation, t.ActorComponent.ActorUpProxy);
        if (t.BulletDataMain?.Base.DebugShowProgress) {
          i = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond;
          a = MathUtils_1.MathUtils.Lerp(0, t.Size.Y, i / t.Duration);
          (r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.CenterLocation);
          r.Z -= e.HalfHeight;
          BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(1, e.Radius, a, o.Quaternion(), r, t.ActorComponent.ActorUpProxy, ColorUtils_1.ColorUtils.LinearRed, t.Duration - i);
          BulletPool_1.BulletPool.RecycleVector(r);
        }
        BulletPool_1.BulletPool.RecycleRotator(o);
      } else if (l === 9) {
        s = t.CollisionInfo.RegionComponent;
        BulletStaticFunction_1.BulletStaticFunction.DebugDrawRingWithRotation(s.HalfHeight, 0, s.Radius, t.CenterLocation, t.ActorComponent.ActorQuat);
      }
    }
  }
  static EntityLeave(t, l) {
    var e = l.EntityHandle;
    if (e?.Valid) {
      const n = e.Entity;
      var o = t.BulletDataMain.Execution.TagIdOnVictimEnter;
      if (o) {
        var i = n.GetComponent(206);
        var a = o.length;
        if (a > 0 && i?.Valid) {
          for (let t = 0; t < a; t++) {
            var r = o[t];
            i.RemoveTag(r);
          }
        }
      }
      if (l.Type === 1) {
        var s;
        var e = t.CollisionInfo;
        var _ = e.CharacterEntityMap.get(n);
        if (_ !== undefined && !((s = n.GetComponent(3)) && (this.tHo(t, n, s.IsRoleAndCtrlByMe), _ > 0) && n.GetComponent(123)?.RemoveTimeScale(_), e.CharacterEntityMap.delete(n), t.CollisionInfo.IntervalMs <= 0 && e.ObjectsHitCurrent.delete(n.Id), e.CharacterEntityMap.size)) {
          e.HaveCharacterInBullet = false;
        }
      } else if (l.Type === 2) {
        const n = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(l.BulletEntityId);
        if (n && (_ = (s = t.CollisionInfo).BulletEntityMap.get(n)) !== undefined) {
          if (_ > 0) {
            BulletUtil_1.BulletUtil.RemoveTimeScale(t, _);
          }
          s.BulletEntityMap.delete(n);
        }
      }
    }
  }
  static EntityEnter(t, l) {
    var e = t.BulletDataMain.Execution.TagIdOnVictimEnter;
    if (e) {
      var o = l.GetComponent(206);
      var i = e.length;
      if (i > 0 && o?.Valid) {
        for (let t = 0; t < i; t++) {
          var a = e[t];
          if (!o.HasTag(a)) {
            o.AddTag(a);
          }
        }
      }
    }
  }
  static tHo(t, l, e) {
    e = l.GetComponent(0)?.IsRole() && !e;
    t = t.BulletDataMain;
    if (!e && t.Execution.GeIdApplyToVictim) {
      var o = l.GetComponent(175);
      if (o) {
        for (const i of t.Execution.GeIdApplyToVictim) {
          o.RemoveBuff(i, -1, "BulletCollisionUtil.CharacterLeaveBulletUseBuff");
        }
      }
    }
  }
  static GetHitEffects(l, e, o, i, a, r, s, _, n) {
    BulletCollisionUtil.oSa.clear();
    if (a) {
      if (!_?.HasTag(-1728163740)) {
        a = s?.GetHitEffectReplaced();
        let t = undefined;
        if (l.IsPartHit && i) {
          l = l.GetPartHitConf(i);
          if (l) {
            var u = l.ReplaceBulletHitEffect;
            t = l.Effect.ToAssetPathName();
            s = s?.GetHitEffectReplacedIgnoreBones()?.has(i) ?? false;
            if (t = BulletCollisionUtil.Dha(t, a?.受击特效.ToAssetPathName(), s)) {
              i = ControllerHolder_1.ControllerHolder.EffectAudioController.CheckSpecialInstanceDungeonEvent(t);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Audio", 42, "受击特效加入处理列表", ["Event", t], ["skip", i]);
              }
              if (!i) {
                BulletCollisionUtil.oSa.set(t, 2);
              }
            }
            if (r && (t = l.Audio.ToAssetPathName(), t = BulletCollisionUtil.Dha(t, a?.受击音效.ToAssetPathName(), s))) {
              i = ControllerHolder_1.ControllerHolder.EffectAudioController.CheckSpecialInstanceDungeonEvent(t);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Audio", 42, "受击音效加入处理列表", ["Event", t], ["skip", i]);
              }
              if (!i) {
                BulletCollisionUtil.oSa.set(t, 3);
              }
            }
            if (u) {
              return BulletCollisionUtil.oSa;
            }
          }
        }
        t = BulletCollisionUtil.prh(e, o, _, n);
        if (t = BulletCollisionUtil.Aha(t, a?.命中特效.ToAssetPathName())) {
          BulletCollisionUtil.oSa.set(t, 1);
        }
      }
    } else {
      const t = BulletCollisionUtil.prh(e, o, _, n);
      if (t && t.length > 0 && t !== "None") {
        BulletCollisionUtil.oSa.set(t, 1);
      }
    }
    return BulletCollisionUtil.oSa;
  }
  static prh(t, l, e, o) {
    var i = t.EffectOnHit.get(9);
    if (!StringUtils_1.StringUtils.IsBlank(i) && e?.HasTag(501201000)) {
      return i;
    } else {
      e = t.EffectOnHit.get(12);
      if (!StringUtils_1.StringUtils.IsBlank(e) && o?.GetComponent(206)?.HasTag(412116357)) {
        return e;
      } else {
        return t.EffectOnHit.get(l ? 7 : 4);
      }
    }
  }
  static Aha(t, l) {
    if (t && t.length > 0 && t !== "None") {
      if (l && l.length > 0 && l !== "None") {
        return l;
      } else {
        return t;
      }
    }
  }
  static Dha(t, l, e) {
    if (!e && l && l.length > 0 && l !== "None") {
      return l;
    } else if (t && t.length > 0 && t !== "None") {
      return t;
    } else {
      return undefined;
    }
  }
  static PlayHitEffect(l, e, o, i, a, r, t) {
    var s = l.BulletDataMain;
    var _ = s.Render;
    var n = l.CollisionInfo.DamageId > 0;
    var u = e.Entity.GetComponent(206);
    var i = BulletCollisionUtil.GetHitEffects(e, _, i, o, n, s.Base.EnablePartHitAudio, t, u, l.Attacker);
    if (i.size > 0) {
      o = _.EffectOnHitConf.get(0);
      let t = undefined;
      t = o ? (o.EnableHighLimit && BulletCollisionUtil.ye1(l, o.HighLimit, a), o.Scale) : Vector_1.Vector.OneVectorProxy;
      BulletCollisionUtil.oHo.Set(a, r.Quaternion(), t);
      BulletCollisionUtil.rHo.Start();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "命中特效位置", ["TF", a]);
      }
      var c = l.Attacker?.GetComponent(61)?.HitEffectMap;
      var B = l.Attacker?.GetComponent(3);
      var n = l.Attacker?.GetComponent(51);
      let e = 2;
      if ((0, RegisterComponent_1.isComponentInstance)(n, 190)) {
        e = n.CurrentPriority;
      }
      var U = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(l.Attacker, l.EffectInfo.DisablePostProcess);
      const v = _.AudioOnHit;
      var C;
      var f;
      var h = (t, l) => {
        BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, v, e);
      };
      for ([C, f] of i) {
        let t = 0;
        let l = B?.GetReplaceEffect(C);
        l = l || C;
        if (!!U && (f === 3 || f === 2)) {
          U.HitEffectType = f;
        }
        var E = c.get(l);
        if (E && E.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT && (t = E.Pop(), EffectSystem_1.EffectSystem.IsValid(t))) {
          EffectSystem_1.EffectSystem.ReplayEffect(t, "ReUseHitEffect", BulletCollisionUtil.oHo.ToUeTransform());
          EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, t, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
          E.Push(t);
          if (f === 1) {
            BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, t, v, e);
          }
        } else {
          t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, BulletCollisionUtil.oHo.ToUeTransform(), l, "[BulletCollisionUtil.ProcessHitEffect]", U, 0, undefined, f === 1 ? h : undefined);
          EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, t, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
          if (!c.has(l)) {
            c.set(l, new Queue_1.Queue());
          }
          c.get(l).Push(t);
        }
      }
      BulletCollisionUtil.rHo.Stop();
    } else if (l.Attacker?.GetComponent(61)?.ShouldOptimize) {
      s = l.Attacker.GetComponent(51);
      let t = 2;
      if ((0, RegisterComponent_1.isComponentInstance)(s, 190)) {
        t = s.CurrentPriority;
      }
      BulletStaticFunction_1.HitStaticFunction.PlayHitAudioByActor(e.Actor, _.AudioOnHit, t);
    }
  }
  static PlayHitMesh(t, l, e, o, i) {
    t = t.BulletDataMain.Render.EffectOnHit.get(11);
    if (t && (l = l.GetComponent(3)?.Owner) instanceof TsBaseCharacter_1.default && (l = l.CharRenderingComponent)) {
      l.AddHitMeshInfoByPath(t, e, o, i);
    }
  }
  static ye1(t, l, e) {
    var o;
    var i;
    if (t.AttackerMoveComp?.IsStandardGravity ?? true) {
      i = t.GetActorLocation().Z;
      e.Z = MathUtils_1.MathUtils.Clamp(e.Z, i + l.X, i + l.Y);
    } else {
      i = t.GetActorLocation();
      o = BulletPool_1.BulletPool.CreateVector();
      e.Subtraction(i, o);
      i = t.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy;
      if ((t = o.DotProduct(i)) > l.Y) {
        o.FromUeVector(i);
        o.MultiplyEqual(t - l.Y);
        e.SubtractionEqual(o);
      }
      if (t < l.X) {
        o.FromUeVector(i);
        o.MultiplyEqual(l.X - t);
        e.AdditionEqual(o);
      }
      BulletPool_1.BulletPool.RecycleVector(o);
    }
  }
  static PlaySceneItemHitEffect(t, l, e, o, i) {
    var a = t?.GetComponent(61)?.HitEffectMap;
    let r = 0;
    var s = a.get(l);
    var _ = t?.GetComponent(51);
    let n = 2;
    if ((0, RegisterComponent_1.isComponentInstance)(_, 190)) {
      n = _.CurrentPriority;
    }
    if (s && s.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT && (r = s.Pop(), EffectSystem_1.EffectSystem.IsValid(r))) {
      EffectSystem_1.EffectSystem.ReplayEffect(r, "ReUseHitEffect", e);
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, r, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      s.Push(r);
      BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, r, o, n);
    } else {
      _ = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(t, i);
      r = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e, l, "[BulletCollisionUtil.ProcessHitEffect]", _, undefined, undefined, (t, l) => {
        BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, o, n);
      });
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, r, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      if (!a.has(l)) {
        a.set(l, new Queue_1.Queue());
      }
      a.get(l).Push(r);
    }
  }
  static PlayVehicleHitEffect(i, a, r) {
    var s = i.BulletDataMain.Render;
    var _ = BulletCollisionUtil.prh(s, false, undefined, i.Attacker);
    if (_ && !(_.length <= 0) && _ !== "None") {
      var n = s.EffectOnHitConf.get(0);
      let t = undefined;
      t = n ? (n.EnableHighLimit && BulletCollisionUtil.ye1(i, n.HighLimit, a), n.Scale) : Vector_1.Vector.OneVectorProxy;
      BulletCollisionUtil.oHo.Set(a, r.Quaternion(), t);
      n = i.Attacker?.GetComponent(61)?.HitEffectMap;
      a = i.Attacker?.GetComponent(3);
      r = i.Attacker?.GetComponent(51);
      let e = 2;
      if ((0, RegisterComponent_1.isComponentInstance)(r, 190)) {
        e = r.CurrentPriority;
      }
      r = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(i.Attacker, i.EffectInfo.DisablePostProcess);
      const u = s.AudioOnHit;
      let l = 0;
      let o = a?.GetReplaceEffect(_);
      o = o || _;
      i = n.get(o);
      if (i && i.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT && (l = i.Pop(), EffectSystem_1.EffectSystem.IsValid(l))) {
        EffectSystem_1.EffectSystem.ReplayEffect(l, "ReUseHitEffect", BulletCollisionUtil.oHo.ToUeTransform());
        EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, l, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
        i.Push(l);
        BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, l, u, e);
      } else {
        l = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, BulletCollisionUtil.oHo.ToUeTransform(), o, "[BulletCollisionUtil.ProcessHitEffect]", r, undefined, undefined, (t, l) => {
          BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, u, e);
        });
        EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, l, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
        if (!n.has(o)) {
          n.set(o, new Queue_1.Queue());
        }
        n.get(o).Push(l);
      }
    }
  }
  static CalcPartDistance(t, l) {
    var e = BulletPool_1.BulletPool.CreateVector();
    e.FromUeVector(t.D_K2_GetComponentLocation());
    var t = BulletPool_1.BulletPool.CreateVector();
    e.Subtraction(l.CenterLocation, t);
    t.Normalize();
    var l = Vector_1.Vector.DistSquared(e, l.GetActorLocation());
    BulletPool_1.BulletPool.RecycleVector(e);
    BulletPool_1.BulletPool.RecycleVector(t);
    return l;
  }
  static GetImpactPointCharacter(t, l, e) {
    var o;
    var i;
    var a;
    var r;
    if (t instanceof UE.CapsuleComponent) {
      o = l.GetActorLocation();
      e.FromUeVector(t.D_GetUpVector());
      this.nHo.FromUeVector(t.D_K2_GetComponentLocation());
      o.Subtraction(this.nHo, this.sHo);
      r = Vector_1.Vector.DotProduct(this.sHo, e);
      i = Math.sign(r);
      a = Math.abs(r);
      r = Math.min(t.CapsuleHalfHeight, a) * i;
      e.MultiplyEqual(r);
      e.AdditionEqual(this.nHo);
      if (ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(l.Attacker.Id)) {
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearBlue, 2, 3);
      }
      o.Subtraction(e, this.aHo);
      this.aHo.Normalize();
      this.aHo.MultiplyEqual(t.CapsuleRadius);
      e.AdditionEqual(this.aHo);
      if (ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(l.Attacker.Id)) {
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearYellow, 2, 3);
      }
      if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "命中特效 碰撞点 角色", ["boneName", t.GetName()], ["bulletRowName", l.BulletRowName]);
      }
    } else if (t instanceof UE.BoxComponent) {
      BulletCollisionUtil.GetHitPointBoxComp(t, l, e);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Bullet", 20, "击中了其它形状组件作为部位碰撞体", ["boneName", t?.GetName()], ["actorName", t?.GetOwner().GetName()]);
      }
      e.FromUeVector(l.GetActorLocation());
    }
  }
  static GetHitPointBoxComp(t, l, e, o) {
    this.hHo.Start();
    this.lHo.FromUeTransform(t.D_K2_GetComponentToWorld());
    var o = o ?? l.GetActorLocation();
    this.lHo.InverseTransformPosition(o, this._Ho);
    this.uHo.FromUeVector(this._Ho);
    this.uHo.MultiplyEqual(-1);
    var i = t.BoxExtent;
    var a = i.X;
    var r = i.Y;
    var i = i.Z;
    var a = this.cHo(this._Ho, this.uHo, [-a, -r, -i], [a, r, i], this.mHo);
    this.lHo.TransformPosition(this.mHo, e);
    if (a !== 1 && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Bullet", 20, "理论上必须有一个碰撞点才对", ["Bullet", l.BulletRowName], ["Part", t.GetName()], ["Victim", t.GetOwner()?.GetName()]);
    }
    if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "命中特效 碰撞点 角色 Box", ["boneName", t.GetName()], ["bulletRowName", l.BulletRowName], ["outPoint", e]);
    }
    if (ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(l.Attacker.Id)) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearYellow, 2, 3);
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, o.ToUeVector(), this.lHo.GetLocation().ToUeVector(), ColorUtils_1.ColorUtils.LinearBlue, 2, 3);
    }
    this.hHo.Stop();
  }
  static cHo(o, i, a, r, t) {
    let s = 0;
    let _ = Number.MAX_VALUE;
    for (let e = 0; e < 3; e++) {
      if (Math.abs(i.Tuple[e]) < Number.EPSILON) {
        if (o.Tuple[e] < a[e] || o.Tuple[e] > r[e]) {
          return 0;
        }
      } else {
        var n = 1 / i.Tuple[e];
        let t = (a[e] - o.Tuple[e]) * n;
        let l = (r[e] - o.Tuple[e]) * n;
        if (t > l) {
          n = t;
          t = l;
          l = n;
        }
        if (t > s) {
          s = t;
        }
        if (l > _) {
          _ = l;
        }
        if (s > _) {
          return 0;
        }
      }
    }
    i.Multiply(s, t);
    t.AdditionEqual(o);
    return 1;
  }
  static GetImpactPointSceneItem(t, l, e) {
    var o = BulletPool_1.BulletPool.CreateVector();
    o.FromUeVector(t.D_K2_GetComponentLocation());
    var i = BulletPool_1.BulletPool.CreateVector();
    const a = t.D_GetComponentBounds().SphereRadius;
    if (Math.abs(l.MoveInfo.BulletSpeed) < MathUtils_1.MathUtils.SmallNumber) {
      if (t.IsA(UE.BoxComponent.StaticClass())) {
        BulletCollisionUtil.GetHitPointBoxComp(t, l, e, l.AttackerActorComp.ActorLocationProxy);
      } else {
        l.AttackerActorComp.ActorLocationProxy.Subtraction(o, i);
        i.Normalize();
        i.MultiplyEqual(a);
        i.Addition(o, e);
      }
    } else {
      e.FromUeVector(l.CollisionInfo.LastFramePosition);
    }
    BulletPool_1.BulletPool.RecycleVector(o);
    BulletPool_1.BulletPool.RecycleVector(i);
    if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "命中特效 碰撞点 场景物", ["boneName", t.GetName()], ["radius", a], ["bulletRowName", l.BulletRowName]);
    }
    if (ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l.Attacker.Id)) {
      const a = 4;
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, o.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearBlue, 2, 3);
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearYellow, 2, 3);
    }
  }
}
(exports.BulletCollisionUtil = BulletCollisionUtil).eHo = Vector_1.Vector.Create();
BulletCollisionUtil.oSa = new Map();
BulletCollisionUtil.rHo = Stats_1.Stat.Create("PlayHitEffect");
BulletCollisionUtil.oHo = Transform_1.Transform.Create();
BulletCollisionUtil.nHo = Vector_1.Vector.Create();
BulletCollisionUtil.sHo = Vector_1.Vector.Create();
BulletCollisionUtil.aHo = Vector_1.Vector.Create();
BulletCollisionUtil.lHo = Transform_1.Transform.Create();
BulletCollisionUtil._Ho = Vector_1.Vector.Create();
BulletCollisionUtil.uHo = Vector_1.Vector.Create();
BulletCollisionUtil.mHo = Vector_1.Vector.Create();
BulletCollisionUtil.hHo = Stats_1.Stat.Create("GetHitPointBoxComp"); //# sourceMappingURL=BulletCollisionUtil.js.map