"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkObstacleDetectionTypeMatch = exports.MoveCheckInfo = exports.ObstructionCheckInfo = exports.COLLISION_AUDIO_ENABLE_RANGE = exports.HORN_AUDIO_PLAY_INTERVAL_TIME = exports.CHANGE_VEHICLE_SPEED_TOLERENCE = exports.WAIT_ENTITY_TIMEOUT = exports.METER_TO_CENTIMETER = exports.CENTIMETER_TO_METER = exports.MIN_BRAKING_DISTANCE = exports.INTERSECTION_CEHCKDISTANCE = exports.MAX_BRAKING_DISTANCE_WHEN_CHECKOBSTRUCTION = exports.DISTANCE_BETWEEN_PLAYER = exports.DISTANCE_BE_TO_NEXTVEHICLE = exports.DISTANCE_BE_TO_OBSTRUCTION = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ICommon_1 = require("../../../UniverseEditor/Interface/ICommon");
exports.DISTANCE_BE_TO_OBSTRUCTION = 3;
exports.DISTANCE_BE_TO_NEXTVEHICLE = 6;
exports.DISTANCE_BETWEEN_PLAYER = 5;
exports.MAX_BRAKING_DISTANCE_WHEN_CHECKOBSTRUCTION = 5;
exports.INTERSECTION_CEHCKDISTANCE = 5;
exports.MIN_BRAKING_DISTANCE = 0.1;
exports.CENTIMETER_TO_METER = 0.01;
exports.METER_TO_CENTIMETER = 100;
exports.WAIT_ENTITY_TIMEOUT = -1;
exports.CHANGE_VEHICLE_SPEED_TOLERENCE = 0.1;
exports.HORN_AUDIO_PLAY_INTERVAL_TIME = 10000;
exports.COLLISION_AUDIO_ENABLE_RANGE = 5000;
class ObstructionCheckInfo {
  constructor() {
    this.HitChanged = false;
    this.CheckResultType = "None";
    this.HitDistance = 0;
    this.HitEntityCreatureDataId = 0;
    this.HitEntityType = undefined;
  }
  Reset() {
    this.HitChanged = false;
    this.CheckResultType = "None";
    this.HitDistance = 0;
    this.HitEntityCreatureDataId = 0;
    this.HitEntityType = undefined;
  }
  DeepCopy(o) {
    this.CheckResultType = o.CheckResultType;
    this.HitDistance = o.HitDistance;
    this.HitEntityCreatureDataId = o.HitEntityCreatureDataId;
    this.HitEntityType = o.HitEntityType;
  }
  IsHitTargetChanged(o) {
    return this.CheckResultType !== o.CheckResultType || this.HitEntityCreatureDataId !== o.HitEntityCreatureDataId;
  }
}
exports.ObstructionCheckInfo = ObstructionCheckInfo;
class MoveCheckInfo {
  constructor() {
    this.BeforeMoveCheckResult = "None";
    this.AfterMoveCheckResult = "None";
    this.AfterMoveCheckInfo = {
      Result: "None",
      AfterAdjustDistance: Number.MAX_SAFE_INTEGER
    };
    this.BrakingDistance = 0;
  }
  Reset() {
    this.BeforeMoveCheckResult = "None";
    this.AfterMoveCheckResult = "None";
    this.AfterMoveCheckInfo.Result = "None";
    this.AfterMoveCheckInfo.AfterAdjustDistance = Number.MAX_SAFE_INTEGER;
  }
  TryUpdateAdjustDistance(o, t) {
    if (t < this.AfterMoveCheckInfo.AfterAdjustDistance) {
      this.AfterMoveCheckInfo.Result = o;
      this.AfterMoveCheckInfo.AfterAdjustDistance = t;
    }
  }
}
function checkObstacleDetectionTypeMatch(o, t) {
  if (t === Protocol_1.Aki.Protocol.kks.Proto_Player) {
    return o.MatchPlayer;
  }
  o = o.MatchTargetType;
  if (!o || !o.EntityLogicTypes.length) {
    return true;
  }
  for (const e of o.EntityLogicTypes) {
    let o = false;
    switch (e) {
      case ICommon_1.EEntityLogic.Npc:
        o = t === Protocol_1.Aki.Protocol.kks.Proto_Npc;
        break;
      case ICommon_1.EEntityLogic.Monster:
        o = t === Protocol_1.Aki.Protocol.kks.Proto_Monster;
        break;
      case ICommon_1.EEntityLogic.Item:
        o = t === Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
        break;
      case ICommon_1.EEntityLogic.Custom:
        o = t === Protocol_1.Aki.Protocol.kks.Proto_Custom;
        break;
      case ICommon_1.EEntityLogic.Vision:
        o = t === Protocol_1.Aki.Protocol.kks.Proto_Vision;
        break;
      case ICommon_1.EEntityLogic.Animal:
        o = t === Protocol_1.Aki.Protocol.kks.Proto_Animal;
        break;
      case ICommon_1.EEntityLogic.ClientOnly:
        o = t === Protocol_1.Aki.Protocol.kks.Proto_ClientOnly;
        break;
      case ICommon_1.EEntityLogic.Vehicle:
        o = t === Protocol_1.Aki.Protocol.kks.HI_;
    }
    if (o) {
      return true;
    }
  }
  return false;
}
exports.MoveCheckInfo = MoveCheckInfo;
exports.checkObstacleDetectionTypeMatch = checkObstacleDetectionTypeMatch; //# sourceMappingURL=VehicleStreamDefine.js.map