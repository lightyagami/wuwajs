"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletConstant = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
class BulletConstant {}
(exports.BulletConstant = BulletConstant).ProfileNameWater = new UE.FName("水体");
BulletConstant.ProfileNameOnlyBullet = new UE.FName("Bullet_OnlyBullet");
BulletConstant.RotateToRight = Rotator_1.Rotator.Create(0, -90, 0);
BulletConstant.OpenCollisionLog = false;
BulletConstant.OpenMoveLog = false;
BulletConstant.OpenCreateLog = false;
BulletConstant.OpenHitActorLog = false;
BulletConstant.OpenActionStat = false;
BulletConstant.OpenAllActionStat = false;
BulletConstant.OpenPoolCheck = false;
BulletConstant.OpenClearCheck = false;
BulletConstant.OpenActorRecycleCheck = false;
BulletConstant.CollisionCompVisibleInEditor = true;
BulletConstant.SuperHighSpeed = 12000;
BulletConstant.HighSpeed = 5000;
BulletConstant.FactorBoxSix = 6;
BulletConstant.FactorBoxTwelve = 12;
BulletConstant.HitCase = new UE.FName("HitCase");
BulletConstant.MoveCylinder = "CollisionCylinder";
BulletConstant.RegionKey = "Region"; //# sourceMappingURL=BulletConstant.js.map