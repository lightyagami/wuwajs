"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BulletCollisionUtil = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletStaticFunction_1 = require("./BulletStaticFunction");
class BulletCollisionUtil {
  static UpdateCollisionExtend(t, l, e, o, i) {
    switch (t) {
      case 0:
        l.D_SetBoxExtent(e.ToUeVector(), !0);
        break;
      case 1:
        l.SetSphereRadius(e.X, !0);
        break;
      case 2:
        var a = this.GetSectorExtent(e, o),
          r = l,
          s = BulletPool_1.BulletPool.CreateVector();
        i.Quaternion().RotateVector(BulletCollisionUtil.eHo, s), r.D_K2_SetRelativeLocation(s.ToUeVector(), !1, void 0, !0), BulletPool_1.BulletPool.RecycleVector(s), r.D_SetBoxExtent(a.ToUeVector(), !0);
        break;
      case 3:
        l.D_SetBoxExtent(new UE.VectorDouble(e.X, e.X, e.Z), !0)
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
        l.Radius = e.X, l.HalfHeight = e.Z, l.Angle = e.Y;
        break;
      case 9:
        l.Radius = e.X, l.HalfHeight = e.Z
    }
  }
  static GetSectorExtent(t, l) {
    BulletCollisionUtil.eHo.FromUeVector(l);
    var e, l = Vector_1.Vector.Create();
    return t.Y < 180 ? (BulletCollisionUtil.eHo.X += .5 * t.X, l.Set(.5 * t.X, Math.sin(.5 * t.Y * MathUtils_1.MathUtils.DegToRad) * t.X, t.Z)) : (e = Math.cos(.5 * t.Y * MathUtils_1.MathUtils.DegToRad), BulletCollisionUtil.eHo.X += t.X * (1 + e) * .5, l.Set(t.X * (1 - e) * .5, t.X, t.Z)), l
  }
  static ShowBulletDeBugDraw(t) {
    var l, e, o, i, a, r, s;
    UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, t.ActorComponent.ActorLocation, 10, void 0, ColorUtils_1.ColorUtils.LinearRed), t.Size.IsZero() || (l = t.BulletDataMain.Base.Shape, o = t.CollisionInfo.CollisionComponent, 3 === l ? (r = o.BoundsScale, BulletStaticFunction_1.BulletStaticFunction.DebugDrawRing(t.Size.Z * r, r * t.Size.Y, t.Size.X * r, t.CenterLocation, t.ActorComponent.ActorUpProxy), t.BulletDataMain?.Base.DebugShowProgress && ((e = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.CenterLocation), e.Z -= t.Size.Z * r, s = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, r = MathUtils_1.MathUtils.Lerp(r * t.Size.Y, t.Size.X * r, s / t.Duration), UE.KismetSystemLibrary.D_DrawDebugCircle(GlobalData_1.GlobalData.GameInstance, e.ToUeVector(), r, 36, ColorUtils_1.ColorUtils.LinearRed, t.Duration - s, 3, t.Actor?.D_GetActorRightVector(), t.Actor?.D_GetActorForwardVector(), !1), BulletPool_1.BulletPool.RecycleVector(e))) : 2 === l ? (r = o.BoundsScale, (s = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(t.CollisionRotator), BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(t.Size.Z * r, t.Size.X * r, t.Size.Y, s.Quaternion(), t.CenterLocation, t.ActorComponent.ActorUpProxy), t.BulletDataMain?.Base.DebugShowProgress && (e = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, a = MathUtils_1.MathUtils.Lerp(0, t.Size.Y, e / t.Duration), (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.CenterLocation), i.Z -= t.Size.Z * r, BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(1, t.Size.X * r, a, s.Quaternion(), i, t.ActorComponent.ActorUpProxy, ColorUtils_1.ColorUtils.LinearRed, t.Duration - e), BulletPool_1.BulletPool.RecycleVector(i)), BulletPool_1.BulletPool.RecycleRotator(s)) : 0 === l ? (r = o.BoundsScale, (a = BulletPool_1.BulletPool.CreateVector()).FromUeVector(o.BoxExtent), a.MultiplyEqual(r), UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.GameInstance, o.D_K2_GetComponentLocation(), a.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow, o.K2_GetComponentRotation(), 0, 1), t.BulletDataMain?.Base.DebugShowProgress && (e = BulletPool_1.BulletPool.CreateVector(), i = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, Vector_1.Vector.Lerp(Vector_1.Vector.ZeroVectorProxy, a, i / t.Duration, e), e.Z = 4, (s = BulletPool_1.BulletPool.CreateVector()).FromUeVector(o.D_K2_GetComponentLocation()), s.Z -= a.Z + 2, UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.GameInstance, s.ToUeVector(), e.ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, o.K2_GetComponentRotation(), t.Duration - i, 2), BulletPool_1.BulletPool.RecycleVector(e), BulletPool_1.BulletPool.RecycleVector(s)), BulletPool_1.BulletPool.RecycleVector(a)) : 1 === l ? (r = o.GetScaledSphereRadius(), (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(o.D_K2_GetComponentLocation()), UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, i.ToUeVector(), r, void 0, ColorUtils_1.ColorUtils.LinearGreen), t.BulletDataMain?.Base.DebugShowProgress && (e = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, s = MathUtils_1.MathUtils.Lerp(0, r, e / t.Duration), UE.KismetSystemLibrary.D_DrawDebugCircle(GlobalData_1.GlobalData.GameInstance, i.ToUeVector(), s, 36, ColorUtils_1.ColorUtils.LinearRed, t.Duration - e, 3, t.Actor?.D_GetActorRightVector(), t.Actor?.D_GetActorForwardVector(), !1)), BulletPool_1.BulletPool.RecycleVector(i)) : 6 === l ? (a = t.CollisionInfo.RegionComponent, (o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(a.BoxExtent), UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.GameInstance, a.D_K2_GetComponentLocation(), o.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow, a.K2_GetComponentRotation(), 0, 1), t.BulletDataMain?.Base.DebugShowProgress && (r = BulletPool_1.BulletPool.CreateVector(), s = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, Vector_1.Vector.Lerp(Vector_1.Vector.ZeroVectorProxy, o, s / t.Duration, r), r.Z = 4, (e = BulletPool_1.BulletPool.CreateVector()).FromUeVector(a.D_K2_GetComponentLocation()), e.Z -= o.Z + 2, UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.GameInstance, e.ToUeVector(), r.ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, a.K2_GetComponentRotation(), t.Duration - s, 2), BulletPool_1.BulletPool.RecycleVector(r), BulletPool_1.BulletPool.RecycleVector(e)), BulletPool_1.BulletPool.RecycleVector(o)) : 7 === l ? (i = t.Size.X, a = t.ActorComponent.ActorLocation, UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, a, i, void 0, ColorUtils_1.ColorUtils.LinearGreen), t.BulletDataMain?.Base.DebugShowProgress && (s = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, r = MathUtils_1.MathUtils.Lerp(0, i, s / t.Duration), UE.KismetSystemLibrary.D_DrawDebugCircle(GlobalData_1.GlobalData.GameInstance, a, r, 36, ColorUtils_1.ColorUtils.LinearRed, t.Duration - s, 3, t.Actor?.D_GetActorRightVector(), t.Actor?.D_GetActorForwardVector(), !1))) : 8 === l ? (e = t.CollisionInfo.RegionComponent, (o = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(t.CollisionRotator), BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(e.HalfHeight, e.Radius, e.Angle, o.Quaternion(), t.CenterLocation, t.ActorComponent.ActorUpProxy), t.BulletDataMain?.Base.DebugShowProgress && (i = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, a = MathUtils_1.MathUtils.Lerp(0, t.Size.Y, i / t.Duration), (r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.CenterLocation), r.Z -= e.HalfHeight, BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(1, e.Radius, a, o.Quaternion(), r, t.ActorComponent.ActorUpProxy, ColorUtils_1.ColorUtils.LinearRed, t.Duration - i), BulletPool_1.BulletPool.RecycleVector(r)), BulletPool_1.BulletPool.RecycleRotator(o)) : 9 === l && (s = t.CollisionInfo.RegionComponent, BulletStaticFunction_1.BulletStaticFunction.DebugDrawRingWithRotation(s.HalfHeight, 0, s.Radius, t.CenterLocation, t.ActorComponent.ActorQuat)))
  }
  static EntityLeave(t, l) {
    var e = l.EntityHandle;
    if (e?.Valid) {
      const n = e.Entity;
      var o = t.BulletDataMain.Execution.TagIdOnVictimEnter;
      if (o) {
        var i = n.GetComponent(205),
          a = o.length;
        if (0 < a && i?.Valid)
          for (let t = 0; t < a; t++) {
            var r = o[t];
            i.RemoveTag(r)
          }
      }
      if (1 === l.Type) {
        var s, e = t.CollisionInfo,
          _ = e.CharacterEntityMap.get(n);
        void 0 === _ || ((s = n.GetComponent(3)) && (this.tHo(t, n, s.IsRoleAndCtrlByMe), 0 < _) && n.GetComponent(122)?.RemoveTimeScale(_), e.CharacterEntityMap.delete(n), t.CollisionInfo.IntervalMs <= 0 && e.ObjectsHitCurrent.delete(n.Id), e.CharacterEntityMap.size) || (e.HaveCharacterInBullet = !1)
      } else if (2 === l.Type) {
        const n = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(l.BulletEntityId);
        n && void 0 !== (_ = (s = t.CollisionInfo).BulletEntityMap.get(n)) && (0 < _ && BulletUtil_1.BulletUtil.RemoveTimeScale(t, _), s.BulletEntityMap.delete(n))
      }
    }
  }
  static EntityEnter(t, l) {
    var e = t.BulletDataMain.Execution.TagIdOnVictimEnter;
    if (e) {
      var o = l.GetComponent(205),
        i = e.length;
      if (0 < i && o?.Valid)
        for (let t = 0; t < i; t++) {
          var a = e[t];
          o.HasTag(a) || o.AddTag(a)
        }
    }
  }
  static tHo(t, l, e) {
    e = l.GetComponent(0)?.IsRole() && !e, t = t.BulletDataMain;
    if (!e && t.Execution.GeIdApplyToVictim) {
      var o = l.GetComponent(174);
      if (o)
        for (const i of t.Execution.GeIdApplyToVictim) o.RemoveBuff(i, -1, "BulletCollisionUtil.CharacterLeaveBulletUseBuff")
    }
  }
  static GetHitEffects(l, e, o, i, a, r, s, _, n) {
    if (BulletCollisionUtil.oSa.clear(), a) {
      if (!_?.HasTag(-1728163740)) {
        a = s?.GetHitEffectReplaced();
        let t = void 0;
        if (l.IsPartHit && i) {
          l = l.GetPartHitConf(i);
          if (l) {
            var u = l.ReplaceBulletHitEffect;
            t = l.Effect.ToAssetPathName();
            s = (s?.GetHitEffectReplacedIgnoreBones())?.has(i) ?? !1;
            if ((t = BulletCollisionUtil.Dha(t, a?.受击特效.ToAssetPathName(), s)) && (i = ControllerHolder_1.ControllerHolder.EffectAudioController.CheckSpecialInstanceDungeonEvent(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "受击特效加入处理列表", ["Event", t], ["skip", i]), i || BulletCollisionUtil.oSa.set(t, 2)), r && (t = l.Audio.ToAssetPathName(), t = BulletCollisionUtil.Dha(t, a?.受击音效.ToAssetPathName(), s)) && (i = ControllerHolder_1.ControllerHolder.EffectAudioController.CheckSpecialInstanceDungeonEvent(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "受击音效加入处理列表", ["Event", t], ["skip", i]), i || BulletCollisionUtil.oSa.set(t, 3)), u) return BulletCollisionUtil.oSa
          }
        }
        t = BulletCollisionUtil.prh(e, o, _, n), (t = BulletCollisionUtil.Aha(t, a?.命中特效.ToAssetPathName())) && BulletCollisionUtil.oSa.set(t, 1)
      }
    } else {
      const t = BulletCollisionUtil.prh(e, o, _, n);
      t && 0 < t.length && "None" !== t && BulletCollisionUtil.oSa.set(t, 1)
    }
    return BulletCollisionUtil.oSa
  }
  static prh(t, l, e, o) {
    var i = t.EffectOnHit.get(9);
    return !StringUtils_1.StringUtils.IsBlank(i) && e?.HasTag(501201e3) ? i : (e = t.EffectOnHit.get(12), !StringUtils_1.StringUtils.IsBlank(e) && o?.GetComponent(205)?.HasTag(412116357) ? e : t.EffectOnHit.get(l ? 7 : 4))
  }
  static Aha(t, l) {
    if (t && 0 < t.length && "None" !== t) return l && 0 < l.length && "None" !== l ? l : t
  }
  static Dha(t, l, e) {
    return !e && l && 0 < l.length && "None" !== l ? l : t && 0 < t.length && "None" !== t ? t : void 0
  }
  static PlayHitEffect(l, e, o, i, a, r, t) {
    var s = l.BulletDataMain,
      _ = s.Render,
      n = 0 < l.CollisionInfo.DamageId,
      u = e.Entity.GetComponent(205),
      i = BulletCollisionUtil.GetHitEffects(e, _, i, o, n, s.Base.EnablePartHitAudio, t, u, l.Attacker);
    if (0 < i.size) {
      o = _.EffectOnHitConf.get(0);
      let t = void 0;
      t = o ? (o.EnableHighLimit && BulletCollisionUtil.te1(l, o.HighLimit, a), o.Scale) : Vector_1.Vector.OneVectorProxy, BulletCollisionUtil.oHo.Set(a, r.Quaternion(), t), BulletCollisionUtil.rHo.Start(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 20, "命中特效位置", ["TF", a]);
      var c = l.Attacker?.GetComponent(61)?.HitEffectMap,
        B = l.Attacker?.GetComponent(3),
        n = l.Attacker?.GetComponent(51);
      let e = 2;
      (0, RegisterComponent_1.isComponentInstance)(n, 189) && (e = n.CurrentPriority);
      var U = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(l.Attacker, l.EffectInfo.DisablePostProcess);
      const P = _.AudioOnHit;
      var C, f, h = (t, l) => {
        BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, P, e)
      };
      for ([C, f] of i) {
        let t = 0,
          l = B?.GetReplaceEffect(C);
        l = l || C, !U || 3 !== f && 2 !== f || (U.HitEffectType = f);
        var v = c.get(l);
        v && v.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT && (t = v.Pop(), EffectSystem_1.EffectSystem.IsValid(t)) ? (EffectSystem_1.EffectSystem.ReplayEffect(t, "ReUseHitEffect", BulletCollisionUtil.oHo.ToUeTransform()), v.Push(t), 1 === f && BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, t, P, e)) : (t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, BulletCollisionUtil.oHo.ToUeTransform(), l, "[BulletCollisionUtil.ProcessHitEffect]", U, void 0, void 0, 1 === f ? h : void 0), c.has(l) || c.set(l, new Queue_1.Queue), c.get(l).Push(t))
      }
      BulletCollisionUtil.rHo.Stop()
    } else if (l.Attacker?.GetComponent(61)?.ShouldOptimize) {
      s = l.Attacker.GetComponent(51);
      let t = 2;
      (0, RegisterComponent_1.isComponentInstance)(s, 189) && (t = s.CurrentPriority), BulletStaticFunction_1.HitStaticFunction.PlayHitAudioByActor(e.Actor, _.AudioOnHit, t)
    }
  }
  static PlayHitMesh(t, l, e, o, i) {
    t = t.BulletDataMain.Render.EffectOnHit.get(11);
    t && (l = l.GetComponent(3)?.Owner) instanceof TsBaseCharacter_1.default && (l = l.CharRenderingComponent) && l.AddHitMeshInfoByPath(t, e, o, i)
  }
  static te1(t, l, e) {
    var o, i;
    t.AttackerMoveComp?.IsStandardGravity ?? !0 ? (i = t.GetActorLocation().Z, e.Z = MathUtils_1.MathUtils.Clamp(e.Z, i + l.X, i + l.Y)) : (i = t.GetActorLocation(), o = BulletPool_1.BulletPool.CreateVector(), e.Subtraction(i, o), i = t.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, (t = o.DotProduct(i)) > l.Y && (o.FromUeVector(i), o.MultiplyEqual(t - l.Y), e.SubtractionEqual(o)), t < l.X && (o.FromUeVector(i), o.MultiplyEqual(l.X - t), e.AdditionEqual(o)), BulletPool_1.BulletPool.RecycleVector(o))
  }
  static PlaySceneItemHitEffect(t, l, e, o, i) {
    var a = t?.GetComponent(61)?.HitEffectMap;
    let r = 0;
    var s = a.get(l),
      _ = t?.GetComponent(51);
    let n = 2;
    (0, RegisterComponent_1.isComponentInstance)(_, 189) && (n = _.CurrentPriority), s && s.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT && (r = s.Pop(), EffectSystem_1.EffectSystem.IsValid(r)) ? (EffectSystem_1.EffectSystem.ReplayEffect(r, "ReUseHitEffect", e), s.Push(r), BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, r, o, n)) : (_ = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(t, i), r = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e, l, "[BulletCollisionUtil.ProcessHitEffect]", _, void 0, void 0, (t, l) => {
      BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, o, n)
    }), a.has(l) || a.set(l, new Queue_1.Queue), a.get(l).Push(r))
  }
  static PlayVehicleHitEffect(i, a, r) {
    var s = i.BulletDataMain.Render,
      _ = BulletCollisionUtil.prh(s, !1, void 0, i.Attacker);
    if (_ && !(_.length <= 0) && "None" !== _) {
      var n = s.EffectOnHitConf.get(0);
      let t = void 0;
      t = n ? (n.EnableHighLimit && BulletCollisionUtil.te1(i, n.HighLimit, a), n.Scale) : Vector_1.Vector.OneVectorProxy, BulletCollisionUtil.oHo.Set(a, r.Quaternion(), t);
      n = i.Attacker?.GetComponent(61)?.HitEffectMap, a = i.Attacker?.GetComponent(3), r = i.Attacker?.GetComponent(51);
      let e = 2;
      (0, RegisterComponent_1.isComponentInstance)(r, 189) && (e = r.CurrentPriority);
      r = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(i.Attacker, i.EffectInfo.DisablePostProcess);
      const u = s.AudioOnHit;
      let l = 0,
        o = a?.GetReplaceEffect(_);
      o = o || _;
      i = n.get(o);
      i && i.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT && (l = i.Pop(), EffectSystem_1.EffectSystem.IsValid(l)) ? (EffectSystem_1.EffectSystem.ReplayEffect(l, "ReUseHitEffect", BulletCollisionUtil.oHo.ToUeTransform()), i.Push(l), BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, l, u, e)) : (l = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, BulletCollisionUtil.oHo.ToUeTransform(), o, "[BulletCollisionUtil.ProcessHitEffect]", r, void 0, void 0, (t, l) => {
        BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, u, e)
      }), n.has(o) || n.set(o, new Queue_1.Queue), n.get(o).Push(l))
    }
  }
  static CalcPartDistance(t, l) {
    var e = BulletPool_1.BulletPool.CreateVector(),
      t = (e.FromUeVector(t.D_K2_GetComponentLocation()), BulletPool_1.BulletPool.CreateVector()),
      l = (e.Subtraction(l.CenterLocation, t), t.Normalize(), Vector_1.Vector.DistSquared(e, l.GetActorLocation()));
    return BulletPool_1.BulletPool.RecycleVector(e), BulletPool_1.BulletPool.RecycleVector(t), l
  }
  static GetImpactPointCharacter(t, l, e) {
    var o, i, a, r;
    t instanceof UE.CapsuleComponent ? (o = l.GetActorLocation(), e.FromUeVector(t.D_GetUpVector()), this.nHo.FromUeVector(t.D_K2_GetComponentLocation()), o.Subtraction(this.nHo, this.sHo), r = Vector_1.Vector.DotProduct(this.sHo, e), i = Math.sign(r), a = Math.abs(r), r = Math.min(t.CapsuleHalfHeight, a) * i, e.MultiplyEqual(r), e.AdditionEqual(this.nHo), ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(l.Attacker.Id) && UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearBlue, 2, 3), o.Subtraction(e, this.aHo), this.aHo.Normalize(), this.aHo.MultiplyEqual(t.CapsuleRadius), e.AdditionEqual(this.aHo), ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(l.Attacker.Id) && UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearYellow, 2, 3), BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 20, "命中特效 碰撞点 角色", ["boneName", t.GetName()], ["bulletRowName", l.BulletRowName])) : t instanceof UE.BoxComponent ? BulletCollisionUtil.GetHitPointBoxComp(t, l, e) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Bullet", 20, "击中了其它形状组件作为部位碰撞体", ["boneName", t?.GetName()], ["actorName", t?.GetOwner().GetName()]), e.FromUeVector(l.GetActorLocation()))
  }
  static GetHitPointBoxComp(t, l, e, o) {
    this.hHo.Start(), this.lHo.FromUeTransform(t.D_K2_GetComponentToWorld());
    var o = o ?? l.GetActorLocation(),
      i = (this.lHo.InverseTransformPosition(o, this._Ho), this.uHo.FromUeVector(this._Ho), this.uHo.MultiplyEqual(-1), t.BoxExtent),
      a = i.X,
      r = i.Y,
      i = i.Z,
      a = this.cHo(this._Ho, this.uHo, [-a, -r, -i], [a, r, i], this.mHo);
    this.lHo.TransformPosition(this.mHo, e), 1 !== a && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Bullet", 20, "理论上必须有一个碰撞点才对", ["Bullet", l.BulletRowName], ["Part", t.GetName()], ["Victim", t.GetOwner()?.GetName()]), BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 20, "命中特效 碰撞点 角色 Box", ["boneName", t.GetName()], ["bulletRowName", l.BulletRowName], ["outPoint", e]), ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(l.Attacker.Id) && (UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearYellow, 2, 3), UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, o.ToUeVector(), this.lHo.GetLocation().ToUeVector(), ColorUtils_1.ColorUtils.LinearBlue, 2, 3)), this.hHo.Stop()
  }
  static cHo(o, i, a, r, t) {
    let s = 0,
      _ = Number.MAX_VALUE;
    for (let e = 0; e < 3; e++)
      if (Math.abs(i.Tuple[e]) < Number.EPSILON) {
        if (o.Tuple[e] < a[e] || o.Tuple[e] > r[e]) return 0
      } else {
        var n = 1 / i.Tuple[e];
        let t = (a[e] - o.Tuple[e]) * n,
          l = (r[e] - o.Tuple[e]) * n;
        if (t > l && (n = t, t = l, l = n), t > s && (s = t), l > _ && (_ = l), s > _) return 0
      } return i.Multiply(s, t), t.AdditionEqual(o), 1
  }
  static GetImpactPointSceneItem(t, l, e) {
    var o = BulletPool_1.BulletPool.CreateVector(),
      i = (o.FromUeVector(t.D_K2_GetComponentLocation()), BulletPool_1.BulletPool.CreateVector());
    const a = t.D_GetComponentBounds().SphereRadius;
    if (Math.abs(l.MoveInfo.BulletSpeed) < MathUtils_1.MathUtils.SmallNumber ? t.IsA(UE.BoxComponent.StaticClass()) ? BulletCollisionUtil.GetHitPointBoxComp(t, l, e, l.AttackerActorComp.ActorLocationProxy) : (l.AttackerActorComp.ActorLocationProxy.Subtraction(o, i), i.Normalize(), i.MultiplyEqual(a), i.Addition(o, e)) : e.FromUeVector(l.CollisionInfo.LastFramePosition), BulletPool_1.BulletPool.RecycleVector(o), BulletPool_1.BulletPool.RecycleVector(i), BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 20, "命中特效 碰撞点 场景物", ["boneName", t.GetName()], ["radius", a], ["bulletRowName", l.BulletRowName]), ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l.Attacker.Id)) {
      const a = 4;
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, o.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearBlue, 2, 3), UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearYellow, 2, 3)
    }
  }
}(exports.BulletCollisionUtil = BulletCollisionUtil).eHo = Vector_1.Vector.Create(), BulletCollisionUtil.oSa = new Map, BulletCollisionUtil.rHo = Stats_1.Stat.Create("PlayHitEffect"), BulletCollisionUtil.oHo = Transform_1.Transform.Create(), BulletCollisionUtil.nHo = Vector_1.Vector.Create(), BulletCollisionUtil.sHo = Vector_1.Vector.Create(), BulletCollisionUtil.aHo = Vector_1.Vector.Create(), BulletCollisionUtil.lHo = Transform_1.Transform.Create(), BulletCollisionUtil._Ho = Vector_1.Vector.Create(), BulletCollisionUtil.uHo = Vector_1.Vector.Create(), BulletCollisionUtil.mHo = Vector_1.Vector.Create(), BulletCollisionUtil.hHo = Stats_1.Stat.Create("GetHitPointBoxComp");
//# sourceMappingURL=BulletCollisionUtil.js.map