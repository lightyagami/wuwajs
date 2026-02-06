"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScanController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Queue_1 = require("../../../Core/Container/Queue");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsGameplayBlueprintFunctionLibrary_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/TsGameplayBlueprintFunctionLibrary");
const scanCharacterTag = 184255089;
class NearbyEntityInfo {
  constructor(t, r) {
    this.Entity = undefined;
    this.Distance = 0;
    this.Entity = t;
    this.Distance = r;
  }
}
class ScanData {
  constructor(t, r) {
    this.Id = 0;
    this.MaxScanDistance = 0;
    this.ScanningEffectActor = undefined;
    this.CurElapsedTime = 0;
    this.CurScanRadius = 0;
    this.ScanEndTime = 1.6;
    this.ScanRadiusSpace = 200;
    this.HasTarget = false;
    this.NearbyCharacterEntities = new Set();
    this.t6g = [];
    this.NearbyEntityQueue = new Queue_1.Queue();
    this.Id = ScanData._A++;
    this.MaxScanDistance = Math.max(t, r);
  }
  EndScan() {
    for (const r of this.NearbyCharacterEntities) {
      var t = r.GetComponent(217);
      if (t && t.HasTag(scanCharacterTag)) {
        t.RemoveTag(scanCharacterTag);
      }
    }
    ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleClearAllScanEffect();
    ActorSystem_1.ActorSystem.Put("ScanData.EndScan", this.ScanningEffectActor);
    this.ScanningEffectActor = undefined;
    this.NearbyEntityQueue.Clear();
    this.t6g.length = 0;
    this.NearbyCharacterEntities.clear();
  }
  FindNearbyEntities() {
    var t = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(this.MaxScanDistance, 255, t);
    if (t.length !== 0) {
      this.HasTarget = true;
      var r;
      var e;
      var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity?.GetComponent(1);
      if (a) {
        for (const i of t) {
          if (i.Valid && i.Entity) {
            r = i.Entity;
            e = Vector_1.Vector.Distance(r.GetComponent(1).ActorLocationProxy, a.ActorLocationProxy);
            this.t6g.push(new NearbyEntityInfo(r, e));
          }
        }
        this.t6g.sort((t, r) => t.Distance - r.Distance);
        for (const o of this.t6g) {
          this.NearbyEntityQueue.Push(o);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelPlay", 31, "ScanController.FindNearbyEntities:当前角色组件为空");
      }
    }
  }
  IsScanComplete() {
    return this.CurScanRadius >= this.MaxScanDistance;
  }
  UpdateScanRadius(t) {
    this.CurElapsedTime += t;
    t = UE.KismetMathLibrary.FInterpTo(0, this.MaxScanDistance, this.CurElapsedTime, 1 / this.ScanEndTime);
    if (t !== this.MaxScanDistance && t < this.CurScanRadius + this.ScanRadiusSpace && this.CurScanRadius < this.MaxScanDistance) {
      return false;
    }
    this.CurScanRadius = t;
    return true;
  }
  i6g(t) {
    return !!t && t.Distance <= this.CurScanRadius;
  }
  r6g(t) {
    if (t.GetComponent(3) && t.GetComponent(0)?.GetEntityCamp() !== 0 && (this.NearbyCharacterEntities.add(t), t = t.GetComponent(217))) {
      t.AddTag(scanCharacterTag);
    }
  }
  ProcessNearbyEntities() {
    while (this.NearbyEntityQueue.Size > 0) {
      var t = this.NearbyEntityQueue.Front;
      if (!this.i6g(t)) {
        break;
      }
      this.NearbyEntityQueue.Pop();
      t = t?.Entity;
      if (t) {
        ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleScanEntityResponse(t);
        this.r6g(t);
      }
    }
  }
}
ScanData._A = 0;
class ScanController extends ControllerBase_1.ControllerBase {
  static StartScan() {
    this.S6.Start();
    var t;
    var r = new ScanData((ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanMaxDistance ?? 0) * 100, (ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanShowInteractionEffectMaxDistance ?? 0) * 100);
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      if (e = e.Entity?.GetComponent(1)) {
        if (t = ActorSystem_1.ActorSystem.Spawn(UE.BP_Fx_Scanning_C.StaticClass(), e.ActorTransform, e.Owner)) {
          t.D_K2_SetActorLocation(e.ActorLocation, false, undefined, false);
          r.ScanningEffectActor = t;
          r.ScanningEffectActor.StartScanEffect();
          r.FindNearbyEntities();
          this.o6g.set(r.Id, r);
          this.S6.Stop();
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelPlay", 31, "ScanController.StartScan:扫描特效Actor为空");
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelPlay", 31, "ScanController.StartScan:当前角色组件为空");
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelPlay", 31, "ScanController.StartScan:当前编队实体为空");
    }
  }
  static n6g(t, r) {
    r = this.o6g.get(r);
    if (!r) {
      return false;
    }
    if (r.UpdateScanRadius(t * TimeUtil_1.TimeUtil.Millisecond * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation)) {
      if (r.IsScanComplete()) {
        if (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) {
          TsGameplayBlueprintFunctionLibrary_1.default.SendScanSkillUseLogData(t.Id, r.HasTarget);
          r.EndScan();
        }
        return false;
      }
      r.ProcessNearbyEntities();
    }
    return true;
  }
  static OnTick(t) {
    var r = [];
    this.gW.Start();
    for (const e of this.o6g.values()) {
      if (!this.n6g(t, e.Id)) {
        r.push(e.Id);
      }
    }
    for (const a of r) {
      this.o6g.delete(a);
    }
    this.gW.Stop();
  }
}
(exports.ScanController = ScanController).o6g = new Map();
ScanController.S6 = Stats_1.Stat.Create("ScanController.StartScan");
ScanController.gW = Stats_1.Stat.Create("ScanController.Tick"); //# sourceMappingURL=ScanController.js.map