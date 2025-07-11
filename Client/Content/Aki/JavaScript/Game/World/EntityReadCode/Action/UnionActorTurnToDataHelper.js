"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionActorTurnToDataHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActorTurnToEmptyData_1 = require("./FbActorTurnToEmptyData");
const FbActorTurnToEntityData_1 = require("./FbActorTurnToEntityData");
const FbActorTurnToPlayerData_1 = require("./FbActorTurnToPlayerData");
const FbActorTurnToPositionData_1 = require("./FbActorTurnToPositionData");
const FbActorTurnToTalkerData_1 = require("./FbActorTurnToTalkerData");
class UnionActorTurnToDataHelper {
  static GetUnionActorTurnToDataObject(t) {
    switch (t) {
      case fb_action_1.UnionActorTurnToData.ActorTurnToEmptyData:
        return new fb_action_1.ActorTurnToEmptyData();
      case fb_action_1.UnionActorTurnToData.ActorTurnToEntityData:
        return new fb_action_1.ActorTurnToEntityData();
      case fb_action_1.UnionActorTurnToData.ActorTurnToPlayerData:
        return new fb_action_1.ActorTurnToPlayerData();
      case fb_action_1.UnionActorTurnToData.ActorTurnToPositionData:
        return new fb_action_1.ActorTurnToPositionData();
      case fb_action_1.UnionActorTurnToData.ActorTurnToTalkerData:
        return new fb_action_1.ActorTurnToTalkerData();
      default:
        return;
    }
  }
  static ReadUnionActorTurnToData(t, r) {
    if (r !== undefined) {
      switch (t) {
        case fb_action_1.UnionActorTurnToData.ActorTurnToEmptyData:
          return FbActorTurnToEmptyData_1.FbActorTurnToEmptyData.Create(r);
        case fb_action_1.UnionActorTurnToData.ActorTurnToEntityData:
          return FbActorTurnToEntityData_1.FbActorTurnToEntityData.Create(r);
        case fb_action_1.UnionActorTurnToData.ActorTurnToPlayerData:
          return FbActorTurnToPlayerData_1.FbActorTurnToPlayerData.Create(r);
        case fb_action_1.UnionActorTurnToData.ActorTurnToPositionData:
          return FbActorTurnToPositionData_1.FbActorTurnToPositionData.Create(r);
        case fb_action_1.UnionActorTurnToData.ActorTurnToTalkerData:
          return FbActorTurnToTalkerData_1.FbActorTurnToTalkerData.Create(r);
        default:
          return;
      }
    }
  }
}
exports.UnionActorTurnToDataHelper = UnionActorTurnToDataHelper;
//# sourceMappingURL=UnionActorTurnToDataHelper.js.map