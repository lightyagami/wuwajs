"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateCue = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateCue extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.Vre = undefined;
    this.Ine = false;
    this.Tne = undefined;
    this.Lne = 0;
    this.Dne = false;
    this.Rne = undefined;
  }
  OnInit(t) {
    this.Ine = t.BindCue.HideOnLoading;
    this.Vre = [];
    for (const i of t.BindCue.CueIds) {
      this.Vre.push(i);
    }
    return true;
  }
  OnActivate() {
    this.Tne = [];
    this.Lne = 0;
    this.Dne = true;
    if (this.Ine && !this.Rne) {
      this.Rne = this.Node.ActorComponent.DisableActor("状态机加载特效或材质");
    }
    for (const i of this.Vre) {
      var t = this.Node.GameplayCueComponent.AddCue(i, {
        BeginCallback: () => {
          this.Une(i);
        }
      });
      if (t) {
        this.Tne.push(t);
      }
    }
  }
  OnDeactivate() {
    if (this.Ine && this.Dne) {
      this.Node.ActorComponent.EnableActor(this.Rne);
      this.Rne = undefined;
    }
    for (const t of this.Tne) {
      this.Node.GameplayCueComponent.RemoveCueByHandle(t);
    }
    this.Tne.length = 0;
  }
  Une(t) {
    if (this.Node.Activated && (this.Lne++, this.Ine) && this.Lne >= this.Vre.length) {
      this.Node.ActorComponent.EnableActor(this.Rne);
      this.Rne = undefined;
      this.Dne = false;
    }
  }
  OnClear() {
    if (this.Tne && this.Tne.length > 0) {
      for (const t of this.Tne) {
        this.Node.GameplayCueComponent.RemoveCueByHandle(t);
      }
      this.Tne.length = 0;
    }
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineStateCue = AiStateMachineStateCue;
//# sourceMappingURL=AiStateMachineStateCue.js.map