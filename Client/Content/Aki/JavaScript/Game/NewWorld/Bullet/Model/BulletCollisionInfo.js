"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCollisionInfo = exports.bulletHitPriorityList = exports.BulletConditionResult = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const BulletPool_1 = require("./BulletPool");
const BulletTraceElementPool_1 = require("./BulletTraceElementPool");
class BulletConditionResult {
  constructor() {
    this.HasConstResult = false;
    this.ConstResult = false;
    this.KeepEnable = false;
    this.KeepDisable = false;
  }
  Clear() {
    this.HasConstResult = false;
    this.ConstResult = false;
    this.KeepEnable = false;
    this.KeepDisable = false;
  }
}
exports.BulletConditionResult = BulletConditionResult;
const PRIORITY_OBSTACLE = 1000;
const PRIORITY_SCENEITEM = 2000;
const PRIORITY_CHARACTER = 3000;
const PRIORITY_NPC = 4000;
const PRIORITY_ANIMAL = 5000;
const PRIORITY_BULLET = 6000;
exports.bulletHitPriorityList = [undefined, PRIORITY_CHARACTER, PRIORITY_BULLET, PRIORITY_SCENEITEM, PRIORITY_OBSTACLE, PRIORITY_NPC, PRIORITY_ANIMAL];
class BulletCollisionInfo {
  constructor() {
    this.ActorCollisionEnable = false;
    this.CollisionComponent = undefined;
    this.RegionDetectComponent = undefined;
    this.RegionComponent = undefined;
    this.HasObstaclesCollision = false;
    this.NeedHitObstacles = false;
    this.MapBulletConditionResult = new Map();
    this.MapHitActorData = new Map();
    this.ArrayHitActorData = new Array();
    this.LastMapHitActorData = new Map();
    this.LastArrayHitActorData = new Array();
    this.ArrayHitActor = new Array();
    this.IsInProcessHit = false;
    this.HasSearchedHitActorsCurFrame = false;
    this.ObjectsHitCurrent = new Map();
    this.SceneItemPartHitEntityId = undefined;
    this.SceneItemPartsHitCurrent = new Set();
    this.StopHit = false;
    this.HaveCharacterInBullet = false;
    this.CharacterEntityMap = new Map();
    this.BulletEntityMap = new Map();
    this.HitTimeScaleEntityMap = new Map();
    this.HitObstaclesCurFrame = false;
    this.IsPassDelay = false;
    this.AllowedEnergy = false;
    this.ActiveDelayMs = -0;
    this.ActiveLengthMs = 0;
    this.IntervalMs = -0;
    this.IsProcessOpen = false;
    this.LastStageInterval = 0;
    this.StageInterval = 0;
    this.IsStartup = false;
    this.CenterLocalLocation = Vector_1.Vector.Create();
    this.FinalScale = Vector_1.Vector.Create();
    this.LastFramePosition = Vector_1.Vector.Create();
    this.UpdateTraceBox = undefined;
    this.UpdateTraceSphere = undefined;
    this.UpdateTraceLine = undefined;
    this.ObstaclesTraceElement = undefined;
    this.IgnoreChannels = new Set();
    this.IgnoreQueries = new Set();
    this.DamageId = 0;
    this.BeHitEffect = FNameUtil_1.FNameUtil.NONE;
    this.WeaknessBeHitEffect = FNameUtil_1.FNameUtil.NONE;
  }
  get CollisionTransform() {
    if (this.CollisionComponent) {
      return this.CollisionComponent.D_K2_GetComponentToWorld();
    } else {
      return MathUtils_1.MathUtils.DefaultTransformDouble;
    }
  }
  AddHitActorData(t, i) {
    if (this.IsInProcessHit) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "处理子弹碰撞期间不允许修改碰撞数组");
      }
    } else if (!this.MapHitActorData.has(t)) {
      this.MapHitActorData.set(t, i);
      this.ArrayHitActorData.push(i);
    }
  }
  ClearHitActorData() {
    if (this.IsInProcessHit) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "处理子弹碰撞期间不允许修改碰撞数组");
      }
    } else {
      for (const t of this.ArrayHitActorData) {
        BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
      }
      this.MapHitActorData.clear();
      this.ArrayHitActorData.length = 0;
      this.HasSearchedHitActorsCurFrame = false;
    }
  }
  ClearLastHitActorData() {
    if (this.IsInProcessHit) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "处理子弹碰撞期间不允许修改碰撞数组");
      }
    } else {
      for (const t of this.LastArrayHitActorData) {
        BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
      }
      this.LastMapHitActorData.clear();
      this.LastArrayHitActorData.length = 0;
    }
  }
  UpdateLastHitActorData() {
    var t;
    if (this.IsInProcessHit) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "处理子弹碰撞期间不允许修改碰撞数组");
      }
    } else {
      t = this.LastArrayHitActorData;
      this.LastArrayHitActorData = this.ArrayHitActorData;
      this.ArrayHitActorData = t;
      t = this.LastMapHitActorData;
      this.LastMapHitActorData = this.MapHitActorData;
      this.MapHitActorData = t;
      this.ClearHitActorData();
    }
  }
  GetFirstVictim(t) {
    let i = undefined;
    for (const s of i = this.IsInProcessHit ? this.ArrayHitActorData : this.LastArrayHitActorData) {
      if (s.IsValidHit && t.includes(s.Type) && s?.EntityHandle?.Valid) {
        return s.Entity;
      }
    }
  }
  Clear() {
    if (this.IsInProcessHit && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Bullet", 17, "处理子弹碰撞期间不允许修改碰撞数组");
    }
    for (const i of this.ArrayHitActorData) {
      BulletPool_1.BulletPool.RecycleBulletHitActorData(i);
    }
    for (const s of this.LastArrayHitActorData) {
      BulletPool_1.BulletPool.RecycleBulletHitActorData(s);
    }
    for (var [, t] of this.MapBulletConditionResult) {
      BulletPool_1.BulletPool.RecycleBulletConditionResult(t);
    }
    this.MapBulletConditionResult.clear();
    this.MapHitActorData.clear();
    this.ArrayHitActorData.length = 0;
    this.LastMapHitActorData.clear();
    this.LastArrayHitActorData.length = 0;
    this.ArrayHitActor.length = 0;
    this.ActorCollisionEnable = false;
    this.CollisionComponent = undefined;
    this.RegionDetectComponent = undefined;
    this.RegionComponent = undefined;
    this.HasObstaclesCollision = false;
    this.NeedHitObstacles = false;
    this.IsInProcessHit = false;
    this.IsProcessOpen = false;
    this.HasSearchedHitActorsCurFrame = false;
    this.ObjectsHitCurrent.clear();
    this.SceneItemPartsHitCurrent.clear();
    this.SceneItemPartHitEntityId = undefined;
    this.StopHit = false;
    this.HaveCharacterInBullet = false;
    this.CharacterEntityMap.clear();
    this.BulletEntityMap.clear();
    this.HitTimeScaleEntityMap.clear();
    this.HitObstaclesCurFrame = false;
    this.IsPassDelay = false;
    this.AllowedEnergy = false;
    this.ActiveDelayMs = 0;
    this.ActiveLengthMs = 0;
    this.IntervalMs = 0;
    this.LastStageInterval = 0;
    this.StageInterval = 0;
    this.IsStartup = false;
    this.CenterLocalLocation.Reset();
    this.FinalScale.Reset();
    this.LastFramePosition.Reset();
    BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceBoxElement(this.UpdateTraceBox);
    this.UpdateTraceBox = undefined;
    BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceSphereElement(this.UpdateTraceSphere);
    this.UpdateTraceSphere = undefined;
    BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceLineElement(this.UpdateTraceLine);
    this.UpdateTraceLine = undefined;
    BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceSphereElement(this.ObstaclesTraceElement);
    this.ObstaclesTraceElement = undefined;
    this.IgnoreChannels.clear();
    this.IgnoreQueries.clear();
  }
}
exports.BulletCollisionInfo = BulletCollisionInfo;
//# sourceMappingURL=BulletCollisionInfo.js.map