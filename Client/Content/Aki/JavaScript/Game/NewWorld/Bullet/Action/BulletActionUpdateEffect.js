"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionUpdateEffect = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const CharacterUtils_1 = require("../../Character/CharacterUtils");
const BulletConstant_1 = require("../BulletConstant");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletPool_1 = require("../Model/BulletPool");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateEffect extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var t = this.BulletInfo.EffectInfo;
    var e = this.BulletInfo.BulletDataMain;
    t.EffectData = e.Render;
    t.IsFinishAuto = t.EffectData.EffectStopInsteadDestroy;
    var l = t.EffectData.SpecialEffect;
    t.DisablePostProcess = !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(this.BulletInfo.AttackerHandle);
    this.VVo();
    if (e.Base.Shape === 4) {
      e = t.EffectData.EffectBulletParams.get(1);
      e = Number(e);
      t.EffectOriginSize = 1 / (isNaN(e) ? 1 : e);
      if ((e = l.get(1)) && e.length > 0) {
        t.EffectExtremity = BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(this.BulletInfo.Actor, e, this.BulletInfo.ActorComponent.ActorTransform, this.BulletInfo, "[BulletActionUpdateEffect.OnExecute] 1");
        EffectSystem_1.EffectSystem.SetEffectHidden(t.EffectExtremity, true);
      }
      if ((e = l.get(2)) && e.length > 0) {
        l = this.BulletInfo.Actor;
        t.EffectBlock = BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(l, e, l.D_GetTransform(), this.BulletInfo, "[BulletActionUpdateEffect.OnExecute] 2");
        EffectSystem_1.EffectSystem.SetEffectHidden(t.EffectBlock, true);
      }
    } else {
      this.IsFinish = true;
    }
  }
  VVo() {
    var t;
    var e;
    var l;
    var i;
    var s;
    var u = this.BulletInfo.ActorComponent;
    if (u) {
      if (this.BulletInfo.BulletDataMain.Render.HandOverParentEffect) {
        BulletStaticFunction_1.BulletStaticFunction.HandOverEffectsAfterInitTransform(this.BulletInfo);
      } else if (!((i = (l = this.BulletInfo.EffectInfo).EffectData).EffectBullet.length <= 0)) {
        t = BulletPool_1.BulletPool.CreateRotator();
        if (this.BulletInfo.IsCollisionRelativeRotationModify) {
          MathUtils_1.MathUtils.ComposeRotator(BulletConstant_1.BulletConstant.RotateToRight, this.BulletInfo.BulletDataMain.Base.Rotator, t);
        } else {
          t.FromUeRotator(BulletConstant_1.BulletConstant.RotateToRight);
        }
        s = new UE.TransformDouble(UE.KismetMathLibrary.D_TransformRotation(u.ActorTransform, t.ToUeRotator()), u.ActorLocation, u.ActorScale);
        BulletPool_1.BulletPool.RecycleRotator(t);
        l.Effect = BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(u.Owner, i.EffectBullet, s, this.BulletInfo, "[BulletActionUpdateEffect.SpawnBulletEffectOnBegin]");
        if (EffectSystem_1.EffectSystem.IsValid(l.Effect) && ((t = this.BulletInfo.BulletDataMain.Render.EffectBulletParams.get(5)) && (s = BulletStaticFunction_1.BulletStaticFunction.GetNiagaraQualityLevel(Number(t)), EffectSystem_1.EffectSystem.SetEffectQualityLevel(l.Effect, s)), t = EffectSystem_1.EffectSystem.GetEffectActor(l.Effect))) {
          t.K2_AttachToActor(u.Owner, FNameUtil_1.FNameUtil.NONE, 1, 1, 1, true);
          if (i.EffectBulletParams.has(3)) {
            s = i.EffectBulletParams.get(3).split(",");
            l = Number(s[1]);
            u = Number(s[2]);
            s = Number(s[0]);
            (e = BulletPool_1.BulletPool.CreateRotator()).Set(l, u, s);
            t.K2_SetActorRelativeRotation(e.ToUeRotator(), false, undefined, true);
            BulletPool_1.BulletPool.RecycleRotator(e);
          }
          if (i.EffectBulletParams.has(2)) {
            l = i.EffectBulletParams.get(2).split(",");
            u = Number(l[0]);
            s = Number(l[1]);
            e = Number(l[2]);
            (l = BulletPool_1.BulletPool.CreateVector()).Set(u, s, e);
            t.D_K2_SetActorRelativeLocation(l.ToUeVector(), false, undefined, true);
            BulletPool_1.BulletPool.RecycleVector(l);
          }
          u = BulletPool_1.BulletPool.CreateVector(true);
          if (i.EffectBulletParams.has(4)) {
            s = i.EffectBulletParams.get(4).split(",");
            e = Number(s[1]);
            l = Number(s[0]);
            i = Number(s[2]);
            u.Set(e, l, i);
          }
          if ((s = this.BulletInfo.AdditionInfo)?.Valid && !s.SizeScale.IsZero()) {
            if (u.IsZero()) {
              u.FromUeVector(s.SizeScale);
            } else {
              u.MultiplyEqual(s.SizeScale);
            }
          }
          if (!u.IsZero()) {
            t.D_SetActorScale3D(u.ToUeVector());
          }
          BulletPool_1.BulletPool.RecycleVector(u);
        }
      }
    }
  }
  OnTick(t) {
    var e;
    var l;
    if (!this.BulletInfo.NeedDestroy) {
      e = this.BulletInfo.EffectInfo;
      (l = BulletPool_1.BulletPool.CreateVector()).X = 1;
      l.Y = this.BulletInfo.RayInfo.Length * e.EffectOriginSize;
      l.Z = 1;
      EffectSystem_1.EffectSystem.GetEffectActor(e.Effect)?.D_SetActorScale3D(l.ToUeVector());
      BulletPool_1.BulletPool.RecycleVector(l);
      EffectSystem_1.EffectSystem.SetEffectHidden(e.EffectExtremity, this.BulletInfo.RayInfo.IsBlock);
      EffectSystem_1.EffectSystem.SetEffectHidden(e.EffectBlock, !this.BulletInfo.RayInfo.IsBlock);
      (this.BulletInfo.RayInfo.IsBlock ? (EffectSystem_1.EffectSystem.GetEffectActor(e.EffectBlock)?.D_K2_SetActorLocation(this.BulletInfo.RayInfo.EndPoint.ToUeVector(), false, undefined, true), EffectSystem_1.EffectSystem.GetEffectActor(e.EffectBlock)) : (EffectSystem_1.EffectSystem.GetEffectActor(e.EffectExtremity)?.D_K2_SetActorLocation(this.BulletInfo.RayInfo.EndPoint.ToUeVector(), false, undefined, true), EffectSystem_1.EffectSystem.GetEffectActor(e.EffectExtremity)))?.K2_SetActorRotation(this.BulletInfo.ActorComponent.ActorRotation, false);
    }
  }
}
exports.BulletActionUpdateEffect = BulletActionUpdateEffect;
//# sourceMappingURL=BulletActionUpdateEffect.js.map