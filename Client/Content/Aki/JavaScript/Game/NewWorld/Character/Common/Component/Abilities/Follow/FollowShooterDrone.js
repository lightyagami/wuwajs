"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShooterDrone = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const MathCommon_1 = require("../../../../../../../Core/Utils/Math/MathCommon");
const Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../../../Global");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const HudUnitUtils_1 = require("../../../../../../Module/HudUnit/Utils/HudUnitUtils");
const ActorUtils_1 = require("../../../../../../Utils/ActorUtils");
const LockOnUtils_1 = require("../../../../Common/Component/LockOn/LockOnUtils");
const deadEyeTag = 1172215447;
class FollowShooterDrone {
  static Zaf(t, r, o, a, i) {
    var e = r.CheckGetComponent(1)?.Owner;
    if (e) {
      var n = e.GetComponentsByTag(UE.SceneComponent.StaticClass(), o);
      for (let o = 0, e = n.Num(); o < e; ++o) {
        var l = n.Get(o);
        if (l.IsValid()) {
          t(r, l, a, i);
        }
      }
    }
  }
  static DLm(o, e, t, r, a, i) {
    var n = i.ShouldAimAtLockOnTargetName;
    let l = false;
    var e = ActorUtils_1.ActorUtils.GetEntityByActor(e, false);
    if (e?.Valid && e.Entity?.Valid) {
      var s = e.Entity.CheckGetComponent(215);
      if (!s) {
        return;
      }
      for (let o = 0, e = a.AutoShootGameplayTagContainer.GameplayTags.Num(); o < e; ++o) {
        var m = a.AutoShootGameplayTagContainer.GameplayTags.Get(o);
        if (s.HasTag(m.TagId)) {
          l = true;
          break;
        }
      }
    }
    if (l && (e = o.GetComponent(40)) && (o = n.toString(), r.has(o) || r.set(o, -1), t <= i.AutoShootAngle) && Time_1.Time.Now - r.get(o) >= i.AutoShootGapTime) {
      r.set(o, Time_1.Time.Now);
      e.BeginSkillAsync(i.AutoShootSkillId);
    }
  }
  static ShouldUpdateRotationToAimAtLockOnTarget(e, o) {
    let t = undefined;
    if (typeof o == "number") {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(o);
    } else if (o?.IsA(UE.Actor.StaticClass())) {
      t = ActorUtils_1.ActorUtils.GetEntityByActor(o, false);
    }
    var r = t?.Entity?.CheckGetComponent(215);
    if (!r) {
      return false;
    }
    for (let o = 0; o < e.StopUpdateRotationWhileHasTags.GameplayTags.Num(); ++o) {
      var a = e.StopUpdateRotationWhileHasTags.GameplayTags.Get(o);
      if (a && r.HasTag(a.TagId)) {
        return false;
      }
    }
    return true;
  }
  static gnm(o, e, t, r, a, i, n) {
    var l;
    var s;
    if (FollowShooterDrone.ShouldUpdateRotationToAimAtLockOnTarget(n, r.Id) && (l = LockOnUtils_1.LockOnUtils.GetLockOnTargetLocation(o))) {
      a.SetAbsolute(false, true, false);
      s = a.D_K2_GetComponentToWorld();
      l = UE.KismetMathLibrary.D_FindLookAtRotation(s.GetLocation(), l).Quaternion().op_Multiply(n.RotateOffset.Quaternion());
      s = s.GetRotation().AngularDistance(l) * MathCommon_1.MathCommon.RadToDeg;
      FollowShooterDrone.DLm(r, o, s, e, i, n);
      r = UE.KismetMathLibrary.RInterpTo(a.K2_GetComponentRotation(), l.Rotator(), t / CommonDefine_1.MILLIONSECOND_PER_SECOND, n.RotationInterpSpeed);
      a.K2_SetWorldRotation(r, false, undefined, true);
    }
  }
  static Jaf(t, r, a) {
    if (r?.IsValid() && t.Valid) {
      for (let o = 0, e = r.LockOnConfig.ArrayAutoAimConfig.Num(); o < e; ++o) {
        var i = r.LockOnConfig.ArrayAutoAimConfig.Get(o);
        FollowShooterDrone.Zaf(a, t, i.ShouldAimAtLockOnTargetName, r.LockOnConfig, i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 72, "AllOwnerSceneComponentExecute 参数错误", ["FollowShooterConfig", r], ["entity", t.Id], ["Executor", a]);
    }
  }
  static vTf(o, e, t, r, a, i) {
    if (FollowShooterDrone.ShouldUpdateRotationToAimAtLockOnTarget(i, t.Id)) {
      t = Global_1.Global.CharacterCameraManager.D_GetActorForwardVector();
      t = Global_1.Global.CharacterCameraManager.D_GetCameraLocation().op_Addition(t.op_Multiply(a.CameraForwardDistance));
      a = UE.KuroAnimMathLibrary.LookRotation_ForwardFirst(t.op_Subtraction(r.D_K2_GetComponentLocation()).GetSafeNormal(MathUtils_1.MathUtils.KindaSmallNumber).op_ToVector(), o).Quaternion().op_Multiply(i.RotateOffset.Quaternion()).Rotator();
      t = UE.KismetMathLibrary.RInterpTo(r.K2_GetComponentRotation(), a, e / CommonDefine_1.MILLIONSECOND_PER_SECOND, i.RotationInterpSpeed);
      r.K2_SetWorldRotation(t, false, undefined, true);
    }
  }
  static SpecificOwnerSceneComponentExecute(t, r, a, i) {
    if (r && t.Valid && !FNameUtil_1.FNameUtil.IsNothing(a)) {
      for (let o = 0, e = r.LockOnConfig.ArrayAutoAimConfig.Num(); o < e; ++o) {
        var n = r.LockOnConfig.ArrayAutoAimConfig.Get(o);
        if (a.op_Equality(n.ShouldAimAtLockOnTargetName)) {
          FollowShooterDrone.Zaf(i, t, a, r.LockOnConfig, n);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 72, "SpecificOwnerSceneComponentExecute 参数错误", ["FollowShooterConfig", r], ["entity", t.Id]);
    }
  }
  static AttachToByConfig(o, e, t, r, a, i) {
    var n = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
    if (n) {
      if (i = i.MapAttachToFollowingWhileHasTag.Get(n)) {
        r.K2_DetachFromComponent(i.DetachLocationRule, i.DetachRotationRule, i.DetachScaleRule, false);
        r.K2_AttachToComponent(o, i.Socket, i.AttachLocationRule, i.AttachRotationRule, i.AttachScaleRule, false);
        r.SetAbsolute(i.AbsoluteLocation, i.AbsoluteRotation, i.AbsoluteScale);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 72, "AttachToByConfig 参数错误", ["TagId", e], ["AttachmentRule", i]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 72, "AttachToByConfig 参数错误", ["TagId", e]);
    }
  }
  static UpdateRotationToAimAtLockOnTarget(o, e, t, r, a) {
    FollowShooterDrone.Jaf(o, r, FollowShooterDrone.gnm.bind(FollowShooterDrone, e, t, a));
  }
  static UpdateRotationToCameraForward(o, e, t, r) {
    FollowShooterDrone.Jaf(o, t, FollowShooterDrone.vTf.bind(FollowShooterDrone, e, r));
  }
  static async AsyncStartShootAtTargets(o, e, t, r, a) {
    var o = EntitySystem_1.EntitySystem.Get(o);
    var i = o?.CheckGetComponent(1)?.Owner;
    var n = o?.CheckGetComponent(215);
    const l = o?.CheckGetComponent(40);
    if (i?.IsValid() && e?.IsValid() && t.length !== 0 && r?.IsValid() && n && l) {
      var s = UE.AIBlueprintHelperLibrary.GetAIController(i);
      if (s && s.CachedGameplayTasksComponent && UE.KuroStaticLibrary.IsImplementInterface(s.CachedGameplayTasksComponent.GetClass(), UE.GameplayTaskOwnerInterface.StaticClass())) {
        const U = new CustomPromise_1.CustomPromise();
        ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_FollowShooterDeadEyeConfig_C", () => {
          U.SetResult();
        });
        await U.Promise;
        if (ResourceSystem_1.ResourceSystem.GetLoadedType("BP_FollowShooterDeadEyeConfig_C") && r.IsA(UE.BP_FollowShooterDeadEyeConfig_C.StaticClass())) {
          const u = r.DeadEyeConfig;
          var o = r.FinishDelayTime;
          var m = e.LockOnConfig.ArrayAutoAimConfig.Num();
          if (m === 0) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 72, "[FollowShooterComponent]无可用射击辅助机", ["Config", e]);
            }
          } else {
            const h = [];
            for (let o = 0; o < m; ++o) {
              var _ = e.LockOnConfig.ArrayAutoAimConfig.Get(o);
              var c = u.Get(_.ShouldAimAtLockOnTargetName);
              if (c && !FNameUtil_1.FNameUtil.IsNothing(_.ShouldAimAtLockOnTargetName)) {
                if ((_ = i.GetComponentsByTag(UE.SceneComponent.StaticClass(), _.ShouldAimAtLockOnTargetName)) && _.Num() === 1) {
                  h.push([_.Get(0), c]);
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Character", 72, "[FollowShooterComponent]射击辅助机Tag重复或者遗漏", ["Config", e], ["components", _]);
                }
              }
            }
            if (!(h.length <= 0)) {
              r = [...t].sort((o, e) => {
                var t = new Vector2D_1.Vector2D();
                var r = new Vector2D_1.Vector2D();
                HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(o.ToUeVector(), t);
                HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(e.ToUeVector(), r);
                return r.X - t.X;
              });
              const g = [];
              for (let o = 0; o < Math.min(t.length, h.length); ++o) {
                g.push(UE.NewArray(UE.VectorDouble));
              }
              r.forEach((o, e) => {
                e %= h.length;
                g[e].Add(o.ToUeVector());
              });
              const S = [];
              n?.AddTag(deadEyeTag);
              for (let o = 0; o < g.length; ++o) {
                var C = UE.AsyncTaskRotateSequence.D_StartRotateSequenceByTranslation(s.CachedGameplayTasksComponent, h[o][0], g[o]);
                if (C) {
                  const u = h[o][1];
                  C.AimSpeedDegPerSec = u.AimSpeedDegPerSec;
                  C.AimToleranceDeg = u.AimToleranceDeg;
                  C.bEaseIn = u.EaseIn;
                  C.bEaseOut = u.EaseOut;
                  C.bForceShortestRoute = u.ForceShortestRoute;
                  C.PostFireDelay = u.PostFireDelay;
                  C.RotateOffset = u.RotateOffset;
                  if (a > MathUtils_1.MathUtils.SmallNumber) {
                    C.TimeDilation = a;
                  }
                  const w = u.SkillId;
                  const d = new CustomPromise_1.CustomPromise();
                  S.push(d.Promise);
                  C.OnShootStepFired.Add((o, e) => {
                    if (o?.IsValid()) {
                      o = l.BeginSkillAsync(w, {
                        Reason: "FollowShooterComponent.AsyncStartShootAtTargets"
                      });
                      S.push(o);
                    }
                  });
                  C.OnSequenceFinished.Add(o => {
                    d.SetResult();
                  });
                  C.ReadyForActivation();
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Character", 72, "[FollowShooterComponent]  创建Task失败", ["Config", e], ["DeadEyeFollowShooter", h]);
                }
              }
              await Promise.all(S);
              const f = new CustomPromise_1.CustomPromise();
              TimerSystem_1.GameplayTimerSystem.Delay(o => {
                f.SetResult();
              }, o);
              await f.Promise;
              n?.RemoveTag(deadEyeTag);
            }
          }
        }
      }
    }
  }
}
exports.FollowShooterDrone = FollowShooterDrone;
//# sourceMappingURL=FollowShooterDrone.js.map