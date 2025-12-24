"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSpawnBlueprintActor = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TaskGraph_1 = require("../../World/Task/TaskGraph");
const LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSpawnBlueprintActor extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    LevelEventSpawnBlueprintActor.ExecuteNewManually(e, t);
  }
  static ExecuteNewManually(e, t) {
    if (e instanceof LevelGameplayActionsDefine_1.ActionSpawnBlueprintActor) {
      if (e.SpawnBlueprintParam === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 72, "[LevelEventSpawnBlueprintActor] 无效参数", ["inParams", e], ["context", t]);
        }
      } else if (e.SpawnBlueprintParam.Type === 0) {
        LevelEventSpawnBlueprintActor.FMm(e.SpawnBlueprintParam);
      }
    }
  }
  static async tJ(e) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadTypeAsync(e, () => {
      t.SetResult();
    });
    await t.Promise;
  }
  static NMm(t, r) {
    if (t?.IsValid()) {
      t.ResetInternalState();
      let e = undefined;
      var a;
      if (r.RelativeOffset !== undefined) {
        a = t.K2_GetComponentLocation();
        e = a.op_Addition(r.RelativeOffset);
      }
      if ((e = r.Origin !== undefined ? r.Origin : e) !== undefined && (r.Impulse !== undefined && t.ApplyImpulse(e, r.Impulse), r.Force !== undefined && t.ApplyForce(e, r.Force), r.Movement !== undefined)) {
        t.ApplyMovement(e, r.Movement);
      }
    }
  }
  static async FMm(t) {
    const r = t.TrackTargetWhileRotateBlueprintType ?? "BP_KuroTrackTargetWhileRotate_C";
    const a = t.DestructibleStoneBlueprintType ?? "BP_KuroDestructibleActor_Stone_C";
    let o = undefined;
    let i = undefined;
    var s = new Map([[r, {
      Run: this.tJ.bind(this, r)
    }], ["SpawntrackTargetWhileRotate", {
      Run: async () => {
        var e = ResourceSystem_1.ResourceSystem.GetLoadedType(r);
        if (e && e.IsA(UE.Class.StaticClass())) {
          o = ActorSystem_1.ActorSystem.Spawn(e, t.StartTransform, undefined);
        }
      }
    }], [a, {
      Run: this.tJ.bind(this, a)
    }], ["SpawndestructibleActor", {
      Run: async () => {
        var e = ResourceSystem_1.ResourceSystem.GetLoadedType(a);
        if (e && e.IsA(UE.Class.StaticClass())) {
          i = ActorSystem_1.ActorSystem.Spawn(e, t.StartTransform, undefined);
        }
      }
    }]]);
    var e = [[r, "SpawntrackTargetWhileRotate"], [a, "SpawndestructibleActor"]];
    await new TaskGraph_1.TaskGraph(s, e).Run();
    o = o;
    i = i;
    if (o?.IsValid() && i?.IsValid()) {
      s = o.GetComponentByClass(UE.KuroFauxPhysicsTrackTargetComponent.StaticClass());
      if (s?.IsValid() && t.TargetToTrack?.IsValid()) {
        s.ResetPhysics();
        s.StartTrackTarget(t.TargetToTrack);
        s.OnStopTrackTarget.Add(e => {
          if (i?.IsValid()) {
            i.DetachRootComponentFromParent(true);
            i.ApplyDamage(t.DamageAmount, i.K2_GetActorLocation(), e, 100);
            t.Callback?.();
          }
          if (o?.IsValid()) {
            ActorSystem_1.ActorSystem.Put("LevelEventSpawnBlueprintActor.SpawnDestructibleStoneTrackTargetWhileRotate", o);
          }
        });
      }
      let e = undefined;
      switch (t.RotateParam.Type) {
        case 0:
          e = o.GetComponentByClass(UE.KuroFauxPhysicsAxisRotateComponent.StaticClass());
          if (t.RotateParam.LocalRotationAxis !== undefined) {
            e.LocalRotationAxis = t.RotateParam.LocalRotationAxis;
          }
          if (t.RotateParam.AngularForceRadians) {
            e.ApplyAngularForce(t.RotateParam.AngularForceRadians);
          }
          if (t.RotateParam.AngularImpulseRadians) {
            e.ApplyAngularImpulse(t.RotateParam.AngularImpulseRadians);
          }
          if (t.RotateParam.AngleMovementRadians) {
            e.ApplyAngularMovement(t.RotateParam.AngleMovementRadians);
          }
          break;
        case 1:
          e = o.GetComponentByClass(UE.KuroFauxPhysicsFreeRotateComponent.StaticClass());
          break;
        case 2:
          e = o.GetComponentByClass(UE.KuroFauxPhysicsConeRotateComponent.StaticClass());
      }
      this.NMm(e, t.RotateParam);
      if (e?.IsValid()) {
        i.K2_AttachToComponent(e, undefined, 2, 2, 2, false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 72, "[LevelEventSpawnBlueprintActor] 没有生成正确的Actor", ["inParams", t], ["trackTargetWhileRotateActor", o], ["destructibleActor", i]);
    }
  }
}
exports.LevelEventSpawnBlueprintActor = LevelEventSpawnBlueprintActor;
//# sourceMappingURL=LevelEventSpawnBlueprintActor.js.map