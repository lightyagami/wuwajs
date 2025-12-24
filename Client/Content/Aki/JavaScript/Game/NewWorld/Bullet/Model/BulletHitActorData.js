"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletHitTempResult = exports.BulletHitResult = exports.BulletHitActorData = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletHitActorData {
  constructor() {
    this.Type = 0;
    this.EntityHandle = undefined;
    this.BulletEntityId = 0;
    this.Components = undefined;
    this.Actor = undefined;
    this.IsValidHit = false;
    this.IsContinueHit = false;
    this.FromObstaclesCollision = false;
    this.Priority = 0;
    this.ValidProcessIndex = 0;
    this.HitResult = undefined;
    this.ConditionResult = undefined;
  }
  get Entity() {
    return this.EntityHandle?.Entity;
  }
  AddComponent(t) {
    this.Components ||= [];
    this.Components.push(t);
  }
  AddHitResult(t, s) {
    this.HitResult ||= new BulletHitResult();
    this.HitResult.AppendHitResult(t, s);
  }
  AddHitTempResult(t, s) {
    this.HitResult ||= new BulletHitResult();
    this.HitResult.AppendHitTempResult(t, s);
  }
  HasComponent(t) {
    return !!this.Components && this.Components.includes(t);
  }
  Clear() {
    this.Type = 0;
    this.EntityHandle = undefined;
    if (this.Components) {
      this.Components.length = 0;
    }
    this.Components = undefined;
    this.Actor = undefined;
    this.IsValidHit = false;
    this.IsContinueHit = false;
    this.FromObstaclesCollision = false;
    this.Priority = 0;
    this.ValidProcessIndex = 0;
    this.HitResult = undefined;
    this.ConditionResult = undefined;
  }
}
exports.BulletHitActorData = BulletHitActorData;
class BulletHitResult {
  constructor() {
    this.HitCount = 0;
    this.BoneNameArray = new Array();
    this.ImpactPointX = new Array();
    this.ImpactPointY = new Array();
    this.ImpactPointZ = new Array();
  }
  AppendHitResult(t, s) {
    this.HitCount++;
    this.BoneNameArray.push(t.BoneNameArray.Get(s));
    this.ImpactPointX.push(t.ImpactPointX_Array.Get(s));
    this.ImpactPointY.push(t.ImpactPointY_Array.Get(s));
    this.ImpactPointZ.push(t.ImpactPointZ_Array.Get(s));
  }
  AppendHitTempResult(t, s) {
    this.HitCount++;
    this.BoneNameArray.push(s);
    this.ImpactPointX.push(t.ImpactPoint.X);
    this.ImpactPointY.push(t.ImpactPoint.Y);
    this.ImpactPointZ.push(t.ImpactPoint.Z);
  }
}
exports.BulletHitResult = BulletHitResult;
class BulletHitTempResult {
  constructor() {
    this.Index = 0;
    this.DistSquared = 0;
    this.ImpactPoint = Vector_1.Vector.Create();
    this.Component = undefined;
    this.Actor = undefined;
    this.HitItem = 0;
  }
}
exports.BulletHitTempResult = BulletHitTempResult;
//# sourceMappingURL=BulletHitActorData.js.map