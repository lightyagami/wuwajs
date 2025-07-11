"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceCreateActor = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelUtil_1 = require("../../../Core/Utils/ModelUtil");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const REVERTIME = 3000;
class AdviceCreateActor {
  constructor() {
    this.ActorInternal = undefined;
    this.SkeletalMeshInternal = undefined;
    this.l9e = undefined;
    this._9e = 0;
    this.Td = false;
    this.u9e = 0;
    this.c9e = undefined;
    this.m9e = false;
    this.d9e = false;
    this.C9e = false;
    this.g9e = () => {
      this.f9e();
      this.SkeletalMeshInternal.SetHiddenInGame(true);
      this.SkeletalMeshInternal.Stop();
      this.jm();
      this.p9e(true);
    };
    this.v9e = () => {
      this.jm();
      if (this.ActorInternal?.IsValid()) {
        ActorSystem_1.ActorSystem.Put("AdviceCreateActor.OnActorDestroy", this.ActorInternal);
        this.ActorInternal = undefined;
      }
      ModelManager_1.ModelManager.AdviceModel.OnAdviceCreateActorDestroy();
    };
  }
  Init() {
    this.M9e();
    this.E9e();
  }
  PlayAnimation(t) {
    this.p9e(false);
    this.S9e(t);
  }
  p9e(i) {
    var e = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.u9e);
    var s = e.Num();
    for (let t = 0; t < s; t++) {
      e.Get(t).SetActorHiddenInGame(!i);
    }
  }
  HideAnimation() {
    this.jm();
    this.f9e();
    this.SkeletalMeshInternal.SetHiddenInGame(true);
    this.SkeletalMeshInternal.Stop();
    this.p9e(true);
  }
  E9e() {
    var t;
    var i;
    var e;
    var s = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceDefaultModelConfig();
    var s = ModelUtil_1.ModelUtil.GetModelConfig(s);
    if (s &&= s.场景交互物) {
      t = Vector_1.Vector.Create();
      i = Rotator_1.Rotator.Create();
      t.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy);
      t.Z = t.Z - Global_1.Global.BaseCharacter.CharacterActorComponent.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight();
      i.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorRotationProxy);
      e = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor;
      i.Yaw = e.D_GetTransform().Rotator().Yaw + 90;
      this.u9e = SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(s.AssetPathName?.toString(), 0, t.ToUeVector(), i.ToUeRotator(), () => {});
    }
  }
  M9e() {
    if (!this.ActorInternal) {
      this.ActorInternal = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
      this.SkeletalMeshInternal = this.ActorInternal.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      this.l9e = this.ActorInternal.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      this.SkeletalMeshInternal.SetEnableGravity(false);
      this.SkeletalMeshInternal.SetCollisionEnabled(0);
      this.SkeletalMeshInternal.SetSimulatePhysics(false);
      this.l9e.Init(0);
    }
    this.SkeletalMeshInternal.SetHiddenInGame(true);
    this.SkeletalMeshInternal.Stop();
    this.RefreshPosition();
    this.ActorInternal.OnDestroyed.Add(this.v9e);
  }
  RefreshPosition() {
    var t = Vector_1.Vector.Create();
    var i = Rotator_1.Rotator.Create();
    t.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy);
    t.Z = t.Z - Global_1.Global.BaseCharacter.CharacterActorComponent.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight();
    i.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorRotationProxy);
    var e = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor;
    i.Yaw = e.D_GetTransform().Rotator().Yaw + 90;
    this.ActorInternal.D_K2_SetActorLocation(t.ToUeVector(), false, undefined, true);
    this.ActorInternal.K2_SetActorRotation(i.ToUeRotator(), false);
  }
  S9e(t) {
    this.Td = true;
    this.jm();
    this.f9e();
    const e = this.SkeletalMeshInternal;
    this.SkeletalMeshInternal.SetHiddenInGame(true);
    this.SkeletalMeshInternal.Stop();
    var i = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(t);
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    const s = ModelUtil_1.ModelUtil.GetModelConfig(i.MeshId);
    this.m9e = false;
    this.d9e = false;
    this.C9e = false;
    this.y9e = undefined;
    ResourceSystem_1.ResourceSystem.LoadAsync(s.网格体.ToAssetPathName(), UE.SkeletalMesh, (t, i) => {
      e.SetSkeletalMesh(t);
      this.d9e = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Advice", 27, "modelConfig.网格体.ToAssetPathName()读取", ["mesh", s.网格体.ToAssetPathName()]);
      }
      this.I9e();
    });
    const r = ConfigManager_1.ConfigManager.MotionConfig.GetMotionAnimation(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimationAsset, (t, i) => {
      this.m9e = true;
      this.y9e = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Advice", 27, "动画读取", ["animation", r]);
      }
      this.I9e();
    });
    e.SetPlayRate(1);
    e.SetPosition(1);
    if (this.l9e) {
      this.l9e.AddComponentByCase(0, this.SkeletalMeshInternal);
      const o = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceModelMat();
      ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.PD_CharacterControllerData_C, (t, i) => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Advice", 27, "溯言特效读取", ["effectPath", o]);
        }
        this.C9e = true;
        if (this.Td) {
          this._9e = this.l9e.AddMaterialControllerData(t);
        }
        this.I9e();
      });
    }
    this.c9e = TimerSystem_1.TimerSystem.Delay(this.g9e, REVERTIME);
  }
  I9e() {
    if (this.C9e && this.d9e && this.m9e && this.Td && this.SkeletalMeshInternal && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Advice", 27, "显示Mesh"), this.SkeletalMeshInternal.SetHiddenInGame(false), this.SkeletalMeshInternal.Play(true), this.y9e)) {
      this.SkeletalMeshInternal.PlayAnimation(this.y9e, false);
    }
  }
  f9e() {
    if (this.l9e && this._9e > 0) {
      this.l9e.RemoveMaterialControllerDataWithEnding(this._9e);
      this._9e = 0;
    }
  }
  Destroy() {
    this.jm();
    SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(this.u9e);
    ActorSystem_1.ActorSystem.Put("AdviceCreateActor.Destroy", this.ActorInternal);
    this.ActorInternal = undefined;
    ModelManager_1.ModelManager.AdviceModel.OnAdviceCreateActorDestroy();
  }
  jm() {
    if (this.c9e !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.c9e);
      this.c9e = undefined;
    }
  }
}
exports.AdviceCreateActor = AdviceCreateActor;
//# sourceMappingURL=AdviceCreateActor.js.map