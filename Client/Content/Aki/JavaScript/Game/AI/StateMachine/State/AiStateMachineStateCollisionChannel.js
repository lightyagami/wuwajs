"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateCollisionChannel = undefined;
const UE = require("ue");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateCollisionChannel extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.IgnoreChannels = undefined;
    this.UXd = new Map();
  }
  OnInit(t) {
    this.IgnoreChannels = [];
    for (const e of t.BindCollisionChannel.IgnoreChannels) {
      this.IgnoreChannels.push(e);
    }
    return true;
  }
  OnActivate() {
    var e = this.Node.ActorComponent.Actor.K2_GetComponentsByClass(UE.ShapeComponent.StaticClass());
    for (const n of this.IgnoreChannels) {
      this.UXd.set(n, new Map());
      var i = this.UXd.get(n);
      for (let t = 0; t < e.Num(); t++) {
        var a = e.Get(t);
        var s = a.GetCollisionResponseToChannel(n);
        i.set(a, s);
        a.SetCollisionResponseToChannel(n, 0);
      }
    }
  }
  OnDeactivate() {
    var e = this.Node.ActorComponent.Actor.K2_GetComponentsByClass(UE.ShapeComponent.StaticClass());
    for (const n of this.IgnoreChannels) {
      var i = this.UXd.get(n);
      if (i) {
        for (let t = 0; t < e.Num(); t++) {
          var a = e.Get(t);
          var s = i.get(a);
          if (s) {
            a.SetCollisionResponseToChannel(n, s);
          }
        }
      }
    }
    this.UXd.clear();
  }
}
exports.AiStateMachineStateCollisionChannel = AiStateMachineStateCollisionChannel;
//# sourceMappingURL=AiStateMachineStateCollisionChannel.js.map