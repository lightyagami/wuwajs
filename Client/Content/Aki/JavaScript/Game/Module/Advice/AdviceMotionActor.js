"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceMotionActor = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelUtil_1 = require("../../../Core/Utils/ModelUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const REVERTIME = 3000;
class AdviceMotionActor {
  constructor() {
    this.c9e = undefined;
    this.ActorInternal = undefined;
    this.SkeletalMeshInternal = undefined;
    this.l9e = undefined;
    this._9e = 0;
    this.X9e = 0;
    this.Td = false;
    this.g9e = () => {
      this.f9e();
      this.SkeletalMeshInternal.SetHiddenInGame(true);
      this.c9e = undefined;
      ModelManager_1.ModelManager.AdviceModel.RecycleMotionActor(this);
      ModelManager_1.ModelManager.AdviceModel.RemovePlayingMotionEntity(this.X9e);
    };
    this.OnActorDestroy = () => {
      this.jm();
      if (this.ActorInternal?.IsValid()) {
        ActorSystem_1.ActorSystem.Put("AdviceMotionActor.OnActorDestroy", this.ActorInternal);
        this.ActorInternal = undefined;
      }
      ModelManager_1.ModelManager.AdviceModel.RemovePlayingMotionEntity(this.X9e);
      ModelManager_1.ModelManager.AdviceModel.RemoveMotionActor(this);
    };
  }
  PlayMotion(t) {
    this.X9e = t;
    this.M9e(t, () => {
      this.$9e(t);
    });
  }
  M9e(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    var i = t.GetComponent(202);
    var t = t.GetComponent(0).GetAdviceInfo().GetAdviceData().GetAdviceMotionId();
    if (t !== 0) {
      if (!this.ActorInternal) {
        this.ActorInternal = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), i.ActorTransform);
        this.SkeletalMeshInternal = this.ActorInternal.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
        this.l9e = this.ActorInternal.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
        this.SkeletalMeshInternal.SetEnableGravity(false);
        this.SkeletalMeshInternal.SetCollisionEnabled(0);
        this.SkeletalMeshInternal.SetSimulatePhysics(false);
        this.l9e.Init(0);
      }
      this.ActorInternal.D_K2_SetActorRelativeLocation(i.ActorLocationProxy.ToUeVector(), false, undefined, true);
      this.ActorInternal.K2_SetActorRotation(i.ActorRotationProxy.ToUeRotator(), false);
      i = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(t);
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
      i = ModelUtil_1.ModelUtil.GetModelConfig(t.MeshId);
      ResourceSystem_1.ResourceSystem.LoadAsync(i.网格体.ToAssetPathName(), UE.SkeletalMesh, (t, i) => {
        this.SkeletalMeshInternal?.SetSkeletalMesh(t);
        this.SkeletalMeshInternal?.SetHiddenInGame(true);
        e();
      });
      this.ActorInternal.OnDestroyed.Add(this.OnActorDestroy);
    }
  }
  $9e(t) {
    this.jm();
    this.Td = true;
    this.f9e();
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(0).GetAdviceInfo().GetAdviceData().GetAdviceMotionId();
    if (t !== 0) {
      this.f9e();
      const e = this.SkeletalMeshInternal;
      var t = ConfigManager_1.ConfigManager.MotionConfig.GetMotionAnimation(t);
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimationAsset, (t, i) => {
        if (this.Td) {
          e.PlayAnimation(t, false);
        }
        this.Y9e();
      });
      e.SetPlayRate(1);
      e.SetPosition(1);
      this.l9e.AddComponentByCase(0, this.SkeletalMeshInternal);
      if (this.l9e) {
        t = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceModelMat();
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.PD_CharacterControllerData_C, (t, i) => {
          if (this.Td) {
            this._9e = this.l9e.AddMaterialControllerData(t);
          }
          this.Y9e();
        });
      }
      ModelManager_1.ModelManager.AdviceModel.AddPlayingMotionEntity(this.X9e, this);
    }
  }
  Y9e() {
    const t = this.SkeletalMeshInternal;
    if (t && this.Td && this._9e > 0) {
      TimerSystem_1.TimerSystem.Delay(() => {
        if (t && this.Td && this._9e > 0) {
          t.SetHiddenInGame(false);
          this.c9e = TimerSystem_1.TimerSystem.Delay(this.g9e, REVERTIME);
        }
      }, TimerSystem_1.MIN_TIME);
    }
  }
  jm() {
    this.Td = false;
    if (this.c9e !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.c9e);
      this.c9e = undefined;
    }
  }
  f9e() {
    if (this.l9e && this._9e > 0) {
      this.l9e.RemoveMaterialControllerDataWithEnding(this._9e);
      this._9e = 0;
    }
  }
}
exports.AdviceMotionActor = AdviceMotionActor;
//# sourceMappingURL=AdviceMotionActor.js.map