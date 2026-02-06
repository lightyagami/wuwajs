"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbGridDirection2Input = exports.Input2RbGridDirection = exports.RB_CONFIG_DA_PATH = exports.RB_JUMP_SEQ_PATH = exports.RB_SEQ_BINDING_TAG = exports.RB_HALF_HEIGHT = exports.isRbBreakableObstacleInfo = exports.isRbBlockJumpState = exports.isRbBlockRollState = exports.isRbBlockIdleState = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
function isRbBlockIdleState(o) {
  return o !== undefined;
}
function isRbBlockRollState(o) {
  return o.Nfu !== undefined;
}
function isRbBlockJumpState(o) {
  return o.Nfu !== undefined;
}
function isRbBreakableObstacleInfo(o) {
  return o.UPm !== undefined;
}
exports.isRbBlockIdleState = isRbBlockIdleState;
exports.isRbBlockRollState = isRbBlockRollState;
exports.isRbBlockJumpState = isRbBlockJumpState;
exports.isRbBreakableObstacleInfo = isRbBreakableObstacleInfo;
exports.RB_HALF_HEIGHT = 50;
exports.RB_SEQ_BINDING_TAG = new UE.FName("Cube");
exports.RB_JUMP_SEQ_PATH = "/Game/Aki/Data/Gameplay/RollBlock/Sequence/RollBlockJump.RollBlockJump";
exports.RB_CONFIG_DA_PATH = "/Game/Aki/Data/Gameplay/RollBlock/DA_RollBlockSetting.DA_RollBlockSetting";
exports.Input2RbGridDirection = new Map([["向前移动", Protocol_1.Aki.Protocol.KIm.Proto_RbForward], ["向后移动", Protocol_1.Aki.Protocol.KIm.Proto_RbBackward], ["向左移动", Protocol_1.Aki.Protocol.KIm.Proto_RbLeft], ["向右移动", Protocol_1.Aki.Protocol.KIm.Proto_RbRight]]);
exports.RbGridDirection2Input = new Map([[Protocol_1.Aki.Protocol.KIm.Proto_RbForward, "向前移动"], [Protocol_1.Aki.Protocol.KIm.Proto_RbBackward, "向后移动"], [Protocol_1.Aki.Protocol.KIm.Proto_RbLeft, "向左移动"], [Protocol_1.Aki.Protocol.KIm.Proto_RbRight, "向右移动"]]); //# sourceMappingURL=RollBlockDefind.js.map