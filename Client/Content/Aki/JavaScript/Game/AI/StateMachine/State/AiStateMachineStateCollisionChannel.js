"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateCollisionChannel = undefined;
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateCollisionChannel extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.IgnoreChannels = undefined;
  }
  OnInit(t) {
    this.IgnoreChannels = [];
    for (const e of t.BindCollisionChannel.IgnoreChannels) {
      this.IgnoreChannels.push(e);
    }
    return true;
  }
  OnActivate() {
    for (const t of this.IgnoreChannels) {
      this.Node.ActorComponent.Actor.CapsuleComponent.SetCollisionResponseToChannel(t, 0);
    }
  }
  OnDeactivate() {
    for (const t of this.IgnoreChannels) {
      this.Node.ActorComponent.Actor.CapsuleComponent.SetCollisionResponseToChannel(t, 2);
    }
  }
}
exports.AiStateMachineStateCollisionChannel = AiStateMachineStateCollisionChannel;
//# sourceMappingURL=AiStateMachineStateCollisionChannel.js.map