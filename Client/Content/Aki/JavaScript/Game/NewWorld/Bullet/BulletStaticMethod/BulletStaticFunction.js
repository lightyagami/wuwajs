"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitStaticFunction = exports.BulletStaticFunction = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EffectAudioContext_1 = require("../../../Effect/EffectContext/EffectAudioContext");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const NiagaraComponentHandle_1 = require("../../../Effect/NiagaraComponentHandle");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletConstant_1 = require("../BulletConstant");
const collisionColor = new UE.LinearColor(255, 80, 77, 1);
const DRAW_SECTOR_ANGLE_PERIOD = 30;
class BulletStaticFunction {
  static CreateMultipleBoxToFan(e, i, o, a, l, r) {
    let s = undefined;
    s = o < MathCommon_1.MathCommon.FlatAngle ? BulletConstant_1.BulletConstant.FactorBoxSix : BulletConstant_1.BulletConstant.FactorBoxTwelve;
    var n = new UE.Transform();
    var c = new UE.Rotator(0);
    let _ = o / s;
    var t = Vector_1.Vector.Create(i / 2, 0, 0);
    t.AdditionEqual(Vector_1.Vector.Create(a));
    n.SetLocation(t.ToUeVectorOld());
    var t = e.AddComponentByClass(UE.BoxComponent.StaticClass(), false, n, false);
    t.LineThickness = 5;
    t.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, false);
    t.SetCollisionProfileName(l);
    r.add(t);
    var f = Vector_1.Vector.Create(0, 0, 0);
    for (let t = 0; t < s / 2; ++t) {
      f.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
      f.RotateAngleAxis(_, Vector_1.Vector.UpVectorProxy, f);
      f.MultiplyEqual(i / 2);
      f.AdditionEqual(Vector_1.Vector.Create(a));
      n.SetLocation(f.ToUeVectorOld());
      f.Reset();
      c.Yaw = _;
      n.SetRotation(c.Quaternion());
      var u = e.AddComponentByClass(UE.BoxComponent.StaticClass(), false, n, false);
      u.LineThickness = 5;
      u.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, false);
      u.SetCollisionProfileName(l);
      _ += o / s;
      r.add(u);
    }
    _ = -o / s;
    for (let t = 0; t < s / 2; ++t) {
      f.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
      f.RotateAngleAxis(_, Vector_1.Vector.UpVectorProxy, f);
      f.MultiplyEqual(i / 2);
      f.AdditionEqual(Vector_1.Vector.Create(a));
      n.SetLocation(f.ToUeVectorOld());
      f.Reset();
      c.Yaw = _;
      n.SetRotation(c.Quaternion());
      var h = e.AddComponentByClass(UE.BoxComponent.StaticClass(), false, n, false);
      h.LineThickness = 5;
      h.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, false);
      h.SetCollisionProfileName(l);
      _ -= o / s;
      r.add(h);
    }
    return t;
  }
  static CompCurveVector(t, e, i) {
    var o = (0, puerts_1.$ref)(0);
    var a = (0, puerts_1.$ref)(0);
    i.GetTimeRange(a, o);
    o = (0, puerts_1.$unref)(o);
    a = (0, puerts_1.$unref)(a);
    var e = MathUtils_1.MathUtils.IsNearlyZero(e, MathUtils_1.MathUtils.KindaSmallNumber) ? MathUtils_1.MathUtils.KindaSmallNumber : e;
    return i.GetVectorValue(MathUtils_1.MathUtils.RangeClamp(t / e, 0, 1, a, o));
  }
  static CompCurveFloat(t, e, i) {
    var o = (0, puerts_1.$ref)(0);
    var a = (0, puerts_1.$ref)(0);
    i.GetTimeRange(a, o);
    o = (0, puerts_1.$unref)(o);
    a = (0, puerts_1.$unref)(a);
    var e = MathUtils_1.MathUtils.IsNearlyZero(e, MathUtils_1.MathUtils.KindaSmallNumber) ? MathUtils_1.MathUtils.KindaSmallNumber : e;
    return i.GetFloatValue(MathUtils_1.MathUtils.RangeClamp(t / e, 0, 1, a, o));
  }
  static DebugDrawRing(t, e, i, o, a) {
    var l;
    if (!(i <= 0)) {
      l = new UE.VectorDouble(o.X + a.X * t, o.Y + a.Y * t, o.Z + a.Z * t);
      o = new UE.VectorDouble(o.X - a.X * t, o.Y - a.Y * t, o.Z - a.Z * t);
      if (e > 0) {
        UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance, l, o, e, 32, collisionColor);
      }
      UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance, l, o, i, 32, collisionColor);
    }
  }
  static DebugDrawRingWithRotation(t, e, i, o, a) {
    var l;
    if (!(i <= 0)) {
      l = a.RotateVectorDouble(new UE.VectorDouble(0, 0, t)).op_Addition(o.ToUeVector());
      a = a.RotateVectorDouble(new UE.VectorDouble(0, 0, -t)).op_Addition(o.ToUeVector());
      if (e > 0) {
        UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance, l, a, e, 32, collisionColor);
      }
      UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance, l, a, i, 32, collisionColor);
    }
  }
  static DebugDrawSector(t, e, i, o, a, l, r, s) {
    o.RotateVector(l, this.dHo);
    this.dHo.Multiply(t, this.CHo);
    this.dHo.Multiply(-t, this.gHo);
    a.Addition(this.CHo, this.dHo);
    a.Addition(this.gHo, this.Tz);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.dHo.ToUeVector(), this.Tz.ToUeVector(), r ?? collisionColor, s);
    var n = i * MathUtils_1.MathUtils.DegToRad * 0.5;
    this.fHo.Set(Math.cos(n) * e, Math.sin(n) * e, 0);
    o.RotateVector(this.fHo, this.pHo);
    this.pHo.AdditionEqual(a);
    this.vHo.FromUeVector(this.pHo);
    this.pHo.AdditionEqual(this.CHo);
    this.vHo.AdditionEqual(this.gHo);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.dHo.ToUeVector(), this.pHo.ToUeVector(), r ?? collisionColor, s);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.Tz.ToUeVector(), this.vHo.ToUeVector(), r ?? collisionColor, s);
    this.fHo.Set(Math.cos(-n) * e, Math.sin(-n) * e, 0);
    o.RotateVector(this.fHo, this.pHo);
    this.pHo.AdditionEqual(a);
    this.vHo.FromUeVector(this.pHo);
    this.pHo.AdditionEqual(this.CHo);
    this.vHo.AdditionEqual(this.gHo);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.pHo.ToUeVector(), this.vHo.ToUeVector(), r ?? collisionColor, s);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.dHo.ToUeVector(), this.pHo.ToUeVector(), r ?? collisionColor, s);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.Tz.ToUeVector(), this.vHo.ToUeVector(), r ?? collisionColor, s);
    var c = Math.max(Math.ceil(i / DRAW_SECTOR_ANGLE_PERIOD), 2);
    var _ = i / c * MathUtils_1.MathUtils.DegToRad;
    for (let t = 1; t <= c; ++t) {
      this.dHo.FromUeVector(this.pHo);
      this.Tz.FromUeVector(this.vHo);
      var f = -n + _ * t;
      this.fHo.Set(Math.cos(f) * e, Math.sin(f) * e, 0);
      o.RotateVector(this.fHo, this.pHo);
      this.pHo.AdditionEqual(a);
      this.vHo.FromUeVector(this.pHo);
      this.pHo.AdditionEqual(this.CHo);
      this.vHo.AdditionEqual(this.gHo);
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.pHo.ToUeVector(), this.vHo.ToUeVector(), r ?? collisionColor, s);
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.dHo.ToUeVector(), this.pHo.ToUeVector(), r ?? collisionColor, s);
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.Tz.ToUeVector(), this.vHo.ToUeVector(), r ?? collisionColor, s);
    }
  }
  static SpawnHitEffect(t, e, i) {
    if (!t.EffectInfo.HandOver) {
      if (e = t.EffectInfo.EffectData.EffectOnHit.get(e)) {
        BulletStaticFunction.PlayBulletEffect(t.Actor, e, t.ActorComponent.ActorTransform, t, i);
      }
    }
  }
  static BulletHitEffect(t, e) {
    var i = t.EffectInfo.EffectData.EffectOnHit.get(2);
    if (i) {
      e = new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, e, Vector_1.Vector.OneVectorDouble);
      BulletStaticFunction.PlayBulletEffect(t.Actor, i, e, t, "[BulletStaticFunction.BulletHitEffect]");
    }
  }
  static PlayBulletEffect(t, e, i, o, a) {
    let l = undefined;
    if (o.AttackerActorComp?.Valid) {
      (l = o.AttackerAudioComponent ? ((s = new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole = o.AttackerAudioComponent.CurrentPriority === 0, s) : new EffectContext_1.EffectContext()).EntityId = o.Attacker ? o.Attacker.Id : undefined;
      l.SourceObject = o.AttackerActorComp.Owner;
      l.DisablePostProcess = o.EffectInfo.DisablePostProcess;
    }
    let r = undefined;
    var s = o.BulletInitParams.Owner.GetComponent(1);
    if (s) {
      r = s.GetReplaceEffect(e);
    }
    var s = EffectSystem_1.EffectSystem.SpawnEffect(t, i, r || e, a, l, 0);
    EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, s, o.Attacker?.GetComponent(133)?.GetTopForeverTimeScale(0) ?? ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
    var t = EffectSystem_1.EffectSystem.GetNiagaraComponent(s);
    if (o.AttackerActorComp?.Valid && (i = o.AttackerActorComp.Owner, e = o.Attacker ? o.Attacker.Id : undefined, i) && e && (a = i.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass())) && a.IsValid() && a.bUseSPModelShiftColor) {
      if (t instanceof UE.NiagaraComponent) {
        a.SetNiagaraCompShiftColor(t);
      } else if (t instanceof NiagaraComponentHandle_1.NiagaraComponentHandle) {
        t.SetEnviInteractionComp(a);
      }
    }
    return s;
  }
  static DestroyEffect(t, e = true) {
    var i;
    var o = t.EffectInfo;
    if (!o.HandOver && !o.IsEffectDestroy) {
      o.IsEffectDestroy = true;
      if (EffectSystem_1.EffectSystem.IsValid(o.Effect)) {
        if ((i = EffectSystem_1.EffectSystem.GetSureEffectActor(o.Effect))?.IsValid()) {
          i.K2_DetachFromActor(1, 1, 1);
        }
        if (o.IsFinishAuto) {
          if (e) {
            EffectSystem_1.EffectSystem.SetTimeScale(o.Effect, 1);
            i = t.Attacker?.GetComponent(133)?.GetTopForeverTimeScale(0) ?? ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
            EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, o.Effect, i);
          }
          EffectSystem_1.EffectSystem.StopEffectById(o.Effect, "[BulletStaticFunction.DestroyEffect] IsFinishAuto=true", false);
        } else {
          EffectSystem_1.EffectSystem.StopEffectById(o.Effect, "[BulletStaticFunction.DestroyEffect] IsFinishAuto=false", true);
        }
      }
    }
  }
  static SetBulletEffectTimeScale(t, e, i = false) {
    if (EffectSystem_1.EffectSystem.IsValid(t.Effect)) {
      EffectSystem_1.EffectSystem.SetTimeScale(t.Effect, e, i);
    }
  }
  static HandOverEffects(t, e) {
    var t = t.EffectInfo;
    var i = e.EffectInfo;
    this.DestroyEffect(e);
    i.EffectData = t.EffectData;
    i.Effect = t.Effect;
    i.IsEffectDestroy = false;
    t.HandOver = true;
    t.Effect = 0;
  }
  static HandOverEffectsAfterInitTransform(t) {
    var e = t.EffectInfo;
    var e = EffectSystem_1.EffectSystem.GetEffectActor(e.Effect);
    if (e?.IsValid()) {
      e.K2_AttachToActor(t.Actor, FNameUtil_1.FNameUtil.NONE, 1, 1, 1, true);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "接收父子弹特效为空");
    }
  }
  static GetNiagaraQualityLevel(t) {
    var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY) ?? 0;
    let i = Math.min(e, t);
    return i = Info_1.Info.IsPcOrGamepadPlatform() ? i > 0 ? 2 : 1 : i > 0 ? 1 : 0;
  }
  static UpdateEffectQualityLevel(t) {
    var e = t.EffectInfo;
    if (EffectSystem_1.EffectSystem.IsValid(e.Effect) && (t = t.BulletDataMain.Render.EffectBulletParams.get(5))) {
      t = BulletStaticFunction.GetNiagaraQualityLevel(Number(t));
      EffectSystem_1.EffectSystem.SetEffectQualityLevel(e.Effect, t);
    }
  }
}
(exports.BulletStaticFunction = BulletStaticFunction).CHo = Vector_1.Vector.Create();
BulletStaticFunction.gHo = Vector_1.Vector.Create();
BulletStaticFunction.dHo = Vector_1.Vector.Create();
BulletStaticFunction.Tz = Vector_1.Vector.Create();
BulletStaticFunction.fHo = Vector_1.Vector.Create();
BulletStaticFunction.pHo = Vector_1.Vector.Create();
BulletStaticFunction.vHo = Vector_1.Vector.Create();
class HitStaticFunction {
  static PlayHitAudio(t, e, i, o) {
    if (t === 5) {
      this.PlayHitAudioByActor(EffectSystem_1.EffectSystem.GetSureEffectActor(e), i, o);
    }
  }
  static PlayHitAudioByActor(t, e, i) {
    if (!!e && !StringUtils_1.StringUtils.IsBlank(e) && !ControllerHolder_1.ControllerHolder.EffectAudioController.CheckHitEffectCooldownTime(4, e)) {
      ControllerHolder_1.ControllerHolder.EffectAudioController.AddPlayEffectAudio(e, t?.D_GetTransform(), 4, i === 0 ? 0 : 2, undefined, true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 20, "播放子弹命中音效", ["Event", e]);
      }
    }
  }
  static CreateEffectContext(e, i) {
    if (e) {
      var o;
      var a = e.GetComponent(54);
      var l = e.GetComponent(1);
      let t = undefined;
      if (l?.Valid) {
        (t = a ? ((o = new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole = a.CurrentPriority === 0, o) : new EffectContext_1.EffectContext()).SourceObject = l?.Owner;
        t.EntityId = e.Id;
        t.DisablePostProcess = i;
      }
      return t;
    }
  }
}
exports.HitStaticFunction = HitStaticFunction;
//# sourceMappingURL=BulletStaticFunction.js.map