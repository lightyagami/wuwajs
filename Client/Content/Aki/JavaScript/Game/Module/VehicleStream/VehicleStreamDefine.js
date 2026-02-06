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
    this.DistanceToKeep = exports.DISTANCE_BE_TO_OBSTRUCTION;
    this.IsPlayer = false;
    this.PlayerHitDistance = 0;
  }
  Reset() {
    this.HitChanged = false;
    this.CheckResultType = "None";
    this.HitDistance = Number.MAX_SAFE_INTEGER;
    this.HitEntityCreatureDataId = 0;
    this.DistanceToKeep = 0;
    this.HitEntityType = undefined;
    this.IsPlayer = false;
    this.PlayerHitDistance = 0;
  }
  DeepCopy(t) {
    this.CheckResultType = t.CheckResultType;
    this.HitDistance = t.HitDistance;
    this.HitChanged = t.HitChanged;
    this.HitEntityCreatureDataId = t.HitEntityCreatureDataId;
    this.HitEntityType = t.HitEntityType;
    this.DistanceToKeep = t.DistanceToKeep;
    this.IsPlayer = t.IsPlayer;
    this.PlayerHitDistance = t.PlayerHitDistance;
  }
  IsHitTargetChanged(t) {
    return this.CheckResultType !== t.CheckResultType || this.HitEntityCreatureDataId !== t.HitEntityCreatureDataId;
  }
  TryUpdateHitDistance(t, e, o, s, r = false) {
    if (!(s >= this.HitDistance)) {
      this.CheckResultType = t;
      this.HitEntityCreatureDataId = e;
      this.HitEntityType = o;
      this.HitDistance = s;
      this.IsPlayer = r;
      switch (t) {
        case "TraceBlock":
          this.DistanceToKeep = r ? exports.DISTANCE_BETWEEN_PLAYER : exports.DISTANCE_BE_TO_OBSTRUCTION;
          break;
        case "CheckPlayerBlock":
          this.DistanceToKeep = exports.DISTANCE_BETWEEN_PLAYER;
          break;
        case "SameRoadwayVehicleBlock":
          this.DistanceToKeep = exports.DISTANCE_BE_TO_OBSTRUCTION;
          break;
        case "NextRoadwayVehicleBlock":
          this.DistanceToKeep = exports.DISTANCE_BE_TO_NEXTVEHICLE;
      }
    }
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
  TryUpdateAdjustDistance(t, e) {
    if (e < this.AfterMoveCheckInfo.AfterAdjustDistance) {
      this.AfterMoveCheckInfo.Result = t;
      this.AfterMoveCheckInfo.AfterAdjustDistance = e;
    }
  }
}
function checkObstacleDetectionTypeMatch(t, e) {
  if (e === Protocol_1.Aki.Protocol.kks.Proto_Player) {
    return t.MatchPlayer;
  }
  t = t.MatchTargetType;
  if (!t || !t.EntityLogicTypes.length) {
    return true;
  }
  for (const o of t.EntityLogicTypes) {
    let t = false;
    switch (o) {
      case ICommon_1.EEntityLogic.Npc:
        t = e === Protocol_1.Aki.Protocol.kks.Proto_Npc;
        break;
      case ICommon_1.EEntityLogic.Monster:
        t = e === Protocol_1.Aki.Protocol.kks.Proto_Monster;
        break;
      case ICommon_1.EEntityLogic.Item:
        t = e === Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
        break;
      case ICommon_1.EEntityLogic.Custom:
        t = e === Protocol_1.Aki.Protocol.kks.Proto_Custom;
        break;
      case ICommon_1.EEntityLogic.Vision:
        t = e === Protocol_1.Aki.Protocol.kks.Proto_Vision;
        break;
      case ICommon_1.EEntityLogic.Animal:
        t = e === Protocol_1.Aki.Protocol.kks.Proto_Animal;
        break;
      case ICommon_1.EEntityLogic.ClientOnly:
        t = e === Protocol_1.Aki.Protocol.kks.Proto_ClientOnly;
        break;
      case ICommon_1.EEntityLogic.Vehicle:
        t = e === Protocol_1.Aki.Protocol.kks.HI_;
    }
    if (t) {
      return true;
    }
  }
  return false;
}
exports.MoveCheckInfo = MoveCheckInfo;
exports.checkObstacleDetectionTypeMatch = checkObstacleDetectionTypeMatch; //# sourceMappingURL=VehicleStreamDefine.js.map