"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitStaticFunction = exports.BulletStaticFunction = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
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
const BulletConstant_1 = require("../BulletConstant");
const collisionColor = new UE.LinearColor(255, 80, 77, 1);
const DRAW_SECTOR_ANGLE_PERIOD = 30;
class BulletStaticFunction {
  static CreateMultipleBoxToFan(e, i, o, a, s, l) {
    let r = undefined;
    r = o < MathCommon_1.MathCommon.FlatAngle ? BulletConstant_1.BulletConstant.FactorBoxSix : BulletConstant_1.BulletConstant.FactorBoxTwelve;
    var c = new UE.Transform();
    var n = new UE.Rotator(0);
    let _ = o / r;
    var t = Vector_1.Vector.Create(i / 2, 0, 0);
    t.AdditionEqual(Vector_1.Vector.Create(a));
    c.SetLocation(t.ToUeVectorOld());
    var t = e.AddComponentByClass(UE.BoxComponent.StaticClass(), false, c, false);
    t.LineThickness = 5;
    t.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, false);
    t.SetCollisionProfileName(s);
    l.add(t);
    var u = Vector_1.Vector.Create(0, 0, 0);
    for (let t = 0; t < r / 2; ++t) {
      u.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
      u.RotateAngleAxis(_, Vector_1.Vector.UpVectorProxy, u);
      u.MultiplyEqual(i / 2);
      u.AdditionEqual(Vector_1.Vector.Create(a));
      c.SetLocation(u.ToUeVectorOld());
      u.Reset();
      n.Yaw = _;
      c.SetRotation(n.Quaternion());
      var f = e.AddComponentByClass(UE.BoxComponent.StaticClass(), false, c, false);
      f.LineThickness = 5;
      f.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, false);
      f.SetCollisionProfileName(s);
      _ += o / r;
      l.add(f);
    }
    _ = -o / r;
    for (let t = 0; t < r / 2; ++t) {
      u.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
      u.RotateAngleAxis(_, Vector_1.Vector.UpVectorProxy, u);
      u.MultiplyEqual(i / 2);
      u.AdditionEqual(Vector_1.Vector.Create(a));
      c.SetLocation(u.ToUeVectorOld());
      u.Reset();
      n.Yaw = _;
      c.SetRotation(n.Quaternion());
      var h = e.AddComponentByClass(UE.BoxComponent.StaticClass(), false, c, false);
      h.LineThickness = 5;
      h.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, false);
      h.SetCollisionProfileName(s);
      _ -= o / r;
      l.add(h);
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
    var s;
    if (!(i <= 0)) {
      s = new UE.VectorDouble(o.X + a.X * t, o.Y + a.Y * t, o.Z + a.Z * t);
      o = new UE.VectorDouble(o.X - a.X * t, o.Y - a.Y * t, o.Z - a.Z * t);
      if (e > 0) {
        UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance, s, o, e, 32, collisionColor);
      }
      UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance, s, o, i, 32, collisionColor);
    }
  }
  static DebugDrawRingWithRotation(t, e, i, o, a) {
    var s;
    if (!(i <= 0)) {
      s = a.RotateVectorDouble(new UE.VectorDouble(0, 0, t)).op_Addition(o.ToUeVector());
      a = a.RotateVectorDouble(new UE.VectorDouble(0, 0, -t)).op_Addition(o.ToUeVector());
      if (e > 0) {
        UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance, s, a, e, 32, collisionColor);
      }
      UE.KismetSystemLibrary.D_DrawDebugCylinder(GlobalData_1.GlobalData.GameInstance, s, a, i, 32, collisionColor);
    }
  }
  static DebugDrawSector(t, e, i, o, a, s, l, r) {
    o.RotateVector(s, this.dHo);
    this.dHo.Multiply(t, this.CHo);
    this.dHo.Multiply(-t, this.gHo);
    a.Addition(this.CHo, this.dHo);
    a.Addition(this.gHo, this.Tz);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.dHo.ToUeVector(), this.Tz.ToUeVector(), l ?? collisionColor, r);
    var c = i * MathUtils_1.MathUtils.DegToRad * 0.5;
    this.fHo.Set(Math.cos(c) * e, Math.sin(c) * e, 0);
    o.RotateVector(this.fHo, this.pHo);
    this.pHo.AdditionEqual(a);
    this.vHo.FromUeVector(this.pHo);
    this.pHo.AdditionEqual(this.CHo);
    this.vHo.AdditionEqual(this.gHo);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.dHo.ToUeVector(), this.pHo.ToUeVector(), l ?? collisionColor, r);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.Tz.ToUeVector(), this.vHo.ToUeVector(), l ?? collisionColor, r);
    this.fHo.Set(Math.cos(-c) * e, Math.sin(-c) * e, 0);
    o.RotateVector(this.fHo, this.pHo);
    this.pHo.AdditionEqual(a);
    this.vHo.FromUeVector(this.pHo);
    this.pHo.AdditionEqual(this.CHo);
    this.vHo.AdditionEqual(this.gHo);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.pHo.ToUeVector(), this.vHo.ToUeVector(), l ?? collisionColor, r);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.dHo.ToUeVector(), this.pHo.ToUeVector(), l ?? collisionColor, r);
    UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.Tz.ToUeVector(), this.vHo.ToUeVector(), l ?? collisionColor, r);
    var n = Math.max(Math.ceil(i / DRAW_SECTOR_ANGLE_PERIOD), 2);
    var _ = i / n * MathUtils_1.MathUtils.DegToRad;
    for (let t = 1; t <= n; ++t) {
      this.dHo.FromUeVector(this.pHo);
      this.Tz.FromUeVector(this.vHo);
      var u = -c + _ * t;
      this.fHo.Set(Math.cos(u) * e, Math.sin(u) * e, 0);
      o.RotateVector(this.fHo, this.pHo);
      this.pHo.AdditionEqual(a);
      this.vHo.FromUeVector(this.pHo);
      this.pHo.AdditionEqual(this.CHo);
      this.vHo.AdditionEqual(this.gHo);
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.pHo.ToUeVector(), this.vHo.ToUeVector(), l ?? collisionColor, r);
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.dHo.ToUeVector(), this.pHo.ToUeVector(), l ?? collisionColor, r);
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.GameInstance, this.Tz.ToUeVector(), this.vHo.ToUeVector(), l ?? collisionColor, r);
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
    let s = undefined;
    if (o.AttackerActorComp?.Valid) {
      (s = o.AttackerAudioComponent ? ((r = new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole = o.AttackerAudioComponent.CurrentPriority === 0, r) : new EffectContext_1.EffectContext()).EntityId = o.Attacker ? o.Attacker.Id : undefined;
      s.SourceObject = o.AttackerActorComp.Owner;
      s.DisablePostProcess = o.EffectInfo.DisablePostProcess;
    }
    let l = undefined;
    var r = o.BulletInitParams.Owner.GetComponent(3);
    if (r) {
      l = r.GetReplaceEffect(e);
    }
    var r = EffectSystem_1.EffectSystem.SpawnEffect(t, i, l || e, a, s, 0);
    EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, r, o.Attacker.GetComponent(122)?.GetTopForeverTimeScale(1) ?? 1);
    var t = EffectSystem_1.EffectSystem.GetNiagaraComponent(r);
    if (o.AttackerActorComp?.Valid && (i = o.AttackerActorComp.Owner, e = o.Attacker ? o.Attacker.Id : undefined, i) && e && (a = i.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass())) && a.IsValid() && a.bUseSPModelShiftColor) {
      if (t instanceof UE.NiagaraComponent) {
        a.SetNiagaraCompShiftColor(t);
      } else if (t instanceof NiagaraComponentHandle_1.NiagaraComponentHandle) {
        t.SetEnviInteractionComp(a);
      }
    }
    return r;
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
            i = t.Attacker.GetComponent(122)?.GetTopForeverTimeScale(1) ?? 1;
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
      t = AudioSystem_1.AudioSystem.GetAkComponent(t, {
        OnCreated: t => {
          ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(i ?? 2, t);
        }
      });
      AudioSystem_1.AudioSystem.PostEvent(e, t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 20, "播放子弹命中音效", ["Event", e]);
      }
    }
  }
  static CreateEffectContext(e, i) {
    if (e) {
      var o;
      var a = e.GetComponent(51);
      var s = e.GetComponent(1);
      let t = undefined;
      if (s?.Valid) {
        (t = a ? ((o = new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole = a.CurrentPriority === 0, o) : new EffectContext_1.EffectContext()).SourceObject = s?.Owner;
        t.EntityId = e.Id;
        t.DisablePostProcess = i;
      }
      return t;
    }
  }
}
exports.HitStaticFunction = HitStaticFunction;
//# sourceMappingURL=BulletStaticFunction.js.map