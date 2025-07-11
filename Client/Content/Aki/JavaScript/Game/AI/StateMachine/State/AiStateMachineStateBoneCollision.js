"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateBoneCollision = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateBoneCollision extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.BoneName = "";
    this.IsBlockPawn = false;
    this.IsBulletDetect = false;
    this.IsBlockCamera = false;
    this.IsBlockPawnOnExit = false;
    this.IsBulletDetectOnExit = false;
    this.IsBlockCameraOnExit = false;
  }
  OnInit(t) {
    this.BoneName = t.BindBoneCollision.BoneName;
    this.IsBlockPawn = t.BindBoneCollision.IsBlockPawn;
    this.IsBulletDetect = t.BindBoneCollision.IsBulletDetect;
    this.IsBlockCamera = t.BindBoneCollision.IsBlockCamera;
    this.IsBlockPawnOnExit = t.BindBoneCollision.IsBlockPawnOnExit;
    this.IsBulletDetectOnExit = t.BindBoneCollision.IsBulletDetectOnExit;
    this.IsBlockCameraOnExit = t.BindBoneCollision.IsBlockCameraOnExit;
    return true;
  }
  OnActivate() {
    this.Node.ActorComponent.SetPartCollisionSwitch(this.BoneName, this.IsBlockPawn, this.IsBulletDetect, this.IsBlockCamera);
  }
  OnDeactivate() {
    this.Node.ActorComponent.SetPartCollisionSwitch(this.BoneName, this.IsBlockPawnOnExit, this.IsBulletDetectOnExit, this.IsBlockCameraOnExit);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineStateBoneCollision = AiStateMachineStateBoneCollision;
//# sourceMappingURL=AiStateMachineStateBoneCollision.js.map