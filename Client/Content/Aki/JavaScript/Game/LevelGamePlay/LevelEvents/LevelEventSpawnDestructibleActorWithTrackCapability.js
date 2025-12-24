"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSpawnDestructibleActorWithTrackCapability = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Global_1 = require("../../Global");
const TaskGraph_1 = require("../../World/Task/TaskGraph");
const LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSpawnDestructibleActorWithTrackCapability extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.jMm = undefined;
    this.HMm = undefined;
    this.$Mm = undefined;
    this.WMm = undefined;
  }
  ExecuteNew(t, e) {
    if (t instanceof LevelGameplayActionsDefine_1.ActionSpawnDestructibleActorWithTrackCapability) {
      this.ExecuteNewManually(t);
    }
  }
  async ExecuteNewManually(t) {
    const e = t.SpawnDestructibleParam;
    if (!e) {
      return false;
    }
    this.QMm();
    await this.KMm(e).Run();
    if (!this.WMm?.IsValid() || !this.$Mm?.IsValid()) {
      this.QMm();
      return false;
    }
    const i = new CustomPromise_1.CustomPromise();
    this.$Mm.StartDestruction.Bind(() => {
      i.SetResult();
    });
    let a = false;
    t = this.WMm.GetComponentByClass(UE.KuroFauxPhysicsTrackTargetComponent.StaticClass());
    if (t?.IsValid() && e.TargetToTrack?.IsValid()) {
      t.ResetPhysics();
      t.InitLinearSpeed = e.TrackSpeed;
      t.PredictionFactor = e.TrackPredictionFactor;
      t.StopTrackTargetDistance = e.StopTrackTargetDistance;
      t.StartTrackTarget(e.TargetToTrack);
      t.OnStopTrackTarget.Add(t => {
        if (this.$Mm?.IsValid()) {
          a = true;
          this.$Mm.ApplyDamage(e.DamageAmount, this.$Mm.K2_GetActorLocation(), t, 100);
        }
      });
    }
    let r = undefined;
    if (e.RotateParam.Type === 0 && (r = this.WMm.GetComponentByClass(UE.KuroFauxPhysicsAxisRotateComponent.StaticClass()), e.RotateParam.LocalRotationAxis !== undefined && (r.LocalRotationAxis = e.RotateParam.LocalRotationAxis), e.RotateParam.AngularForceRadians && r.ApplyAngularForce(e.RotateParam.AngularForceRadians), e.RotateParam.AngularImpulseRadians && r.ApplyAngularImpulse(e.RotateParam.AngularImpulseRadians), e.RotateParam.AngleMovementRadians)) {
      r.ApplyAngularMovement(e.RotateParam.AngleMovementRadians);
    }
    if (r?.IsValid()) {
      this.$Mm.K2_AttachToComponent(r, undefined, 2, 2, 2, false);
    }
    await i.Promise;
    if (this.$Mm?.IsValid()) {
      this.$Mm.DetachRootComponentFromParent(true);
    }
    if (this.WMm?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("LevelEventSpawnDestructibleActorWithTrackCapability", this.WMm);
    }
    this.QMm();
    return a;
  }
  KMm(t) {
    var e = new Map([[LevelEventSpawnDestructibleActorWithTrackCapability.XMm, {
      Run: LevelEventSpawnDestructibleActorWithTrackCapability.tJ
    }], [LevelEventSpawnDestructibleActorWithTrackCapability.YMm, {
      Run: async () => {
        this.WMm = ActorSystem_1.ActorSystem.Spawn(UE.BP_KuroTrackTargetWhileRotate_C.StaticClass(), t.StartTransform, undefined);
      }
    }], [LevelEventSpawnDestructibleActorWithTrackCapability.zMm, {
      Run: this.JMm.bind(this, t.KuroDestructibleAsset, UE.KuroDestructibleAsset)
    }], [LevelEventSpawnDestructibleActorWithTrackCapability.ZMm, {
      Run: this.ZMm.bind(this, t.StartTransform)
    }], [LevelEventSpawnDestructibleActorWithTrackCapability.eEm, {
      Run: this.tEm.bind(this, t.KuroDestructibleDestructionAsset, UE.KuroDestructibleDestructionAsset)
    }]]);
    var i = [[LevelEventSpawnDestructibleActorWithTrackCapability.zMm, LevelEventSpawnDestructibleActorWithTrackCapability.ZMm], [LevelEventSpawnDestructibleActorWithTrackCapability.eEm, LevelEventSpawnDestructibleActorWithTrackCapability.ZMm], [LevelEventSpawnDestructibleActorWithTrackCapability.XMm, LevelEventSpawnDestructibleActorWithTrackCapability.YMm]];
    return new TaskGraph_1.TaskGraph(e, i);
  }
  QMm() {
    this.jMm = undefined;
    this.HMm = undefined;
    this.$Mm = undefined;
    this.WMm = undefined;
  }
  async JMm(t, e) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, e, (t, e) => {
      i.SetResult(t);
      this.jMm = t;
    });
    await i.Promise;
  }
  async tEm(t, e) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, e, (t, e) => {
      i.SetResult(t);
      this.HMm = t;
    });
    await i.Promise;
  }
  async ZMm(t) {
    if (this.jMm?.IsValid() && this.HMm?.IsValid() && (this.$Mm = UE.GameplayStatics.D_BeginDeferredActorSpawnFromClass(Global_1.Global.BaseCharacter, UE.KuroDestructibleActor.StaticClass(), t, 2), this.$Mm?.IsValid())) {
      this.$Mm.KuroDestructibleAsset = this.jMm;
      this.$Mm.KuroDestructibleDestructionAsset = this.HMm;
      UE.GameplayStatics.D_FinishSpawningActor(this.$Mm, t);
    }
  }
}
exports.LevelEventSpawnDestructibleActorWithTrackCapability = LevelEventSpawnDestructibleActorWithTrackCapability;
(_a = LevelEventSpawnDestructibleActorWithTrackCapability).zMm = "KuroDestructibleAsset";
LevelEventSpawnDestructibleActorWithTrackCapability.eEm = "KuroDestructibleDestructionAsset";
LevelEventSpawnDestructibleActorWithTrackCapability.ZMm = "SpawnKuroDestructibleActor";
LevelEventSpawnDestructibleActorWithTrackCapability.XMm = "LoadKuroTrackTargetWhileRotateType";
LevelEventSpawnDestructibleActorWithTrackCapability.YMm = "SpawnTrackTargetWhileRotate";
LevelEventSpawnDestructibleActorWithTrackCapability.tJ = async () => {
  const t = new CustomPromise_1.CustomPromise();
  ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_KuroTrackTargetWhileRotate_C", () => {
    t.SetResult();
  });
  await t.Promise;
}; //# sourceMappingURL=LevelEventSpawnDestructibleActorWithTrackCapability.js.map