"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateBoneVisible = undefined;
const UE = require("ue");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateBoneVisible extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.Sne = undefined;
    this.yne = false;
  }
  OnInit(t) {
    this.Sne = new UE.FName(t.BindBoneVisible.BoneName);
    this.yne = t.BindBoneVisible.Visible;
    return true;
  }
  OnActivate() {
    this.Node.AnimationComponent.HideBone(this.Sne, !this.yne, false);
  }
  OnDeactivate() {
    if (!this.Node.TagComponent.HasTag(1008164187)) {
      this.Node.AnimationComponent.HideBone(this.Sne, this.yne, false);
    }
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineStateBoneVisible = AiStateMachineStateBoneVisible;
//# sourceMappingURL=AiStateMachineStateBoneVisible.js.map