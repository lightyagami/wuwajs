"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityHandleParameterContext = exports.PlayerFollowerSwallowHandler = exports.EPlayerFollowerHandlerType = exports.PlayerFollowerInfo = exports.WAIT_FOLLOWER_TIME = exports.PRIORITY_VEHICLE = exports.playerFollowerPriority = undefined;
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const GameCommand_1 = require("../../../../../../Utils/Command/GameCommand");
exports.playerFollowerPriority = new Map([[Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerExploreSkill, 100], [Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerAuxiliary, 98], [Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerSpecialItem, 99], [Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerMotor, 99999]]);
exports.PRIORITY_VEHICLE = 103;
exports.WAIT_FOLLOWER_TIME = 90000;
class PlayerFollowerInfo {
  constructor(e, o = 0) {
    this.CreatureDataId = e;
    this.Priority = o;
  }
}
var EPlayerFollowerHandlerType;
(exports.PlayerFollowerInfo = PlayerFollowerInfo).Compare = (e, o) => e.Priority - o.Priority;
(function (e) {
  e[e.FollowShooter = 0] = "FollowShooter";
  e[e.Vehicle = 1] = "Vehicle";
})(EPlayerFollowerHandlerType = exports.EPlayerFollowerHandlerType ||= {});
class PlayerFollowerSwallowHandler {
  constructor() {
    this.CommandInvoker = new GameCommand_1.CommandSwallowInvoker();
  }
  AddFollowerReceiver() {
    return {
      ReceiveExecute: e => {}
    };
  }
  RemoveFollowerReceiver() {
    return {
      ReceiveExecute: e => {}
    };
  }
  FlushFollowerReceiver() {
    return {
      ReceiveExecute: () => {}
    };
  }
  HasFollower(e) {
    return false;
  }
  OnClear() {}
}
exports.PlayerFollowerSwallowHandler = PlayerFollowerSwallowHandler;
class EntityHandleParameterContext {
  constructor(e) {
    this.EntityHandle = e;
    this.OutPlayerFollowerHandlerType = undefined;
  }
  IsValid() {
    return this.EntityHandle.Valid;
  }
}
exports.EntityHandleParameterContext = EntityHandleParameterContext;
//# sourceMappingURL=IFollow.js.map