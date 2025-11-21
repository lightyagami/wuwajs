"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionListenBeHit = undefined;
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionListenBeHit extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.mne = false;
    this.dne = new Set();
    this.Cne = 0;
    this.gne = (t, i, s) => {
      if (s > 0 && this.Cne === s) {
        this.ResultSelf = true;
      }
      if (t) {
        if (this.dne.has(i)) {
          this.ResultSelf = true;
        }
      } else if (this.mne) {
        this.ResultSelf = true;
      }
    };
  }
  OnInit(t) {
    if (t.CondListenBeHit.NoHitAnimation) {
      this.mne = true;
    }
    if (t.CondListenBeHit.SoftKnock) {
      this.dne.add(0);
      this.dne.add(1);
      this.dne.add(8);
      this.dne.add(9);
    }
    if (t.CondListenBeHit.HeavyKnock) {
      this.dne.add(2);
      this.dne.add(3);
      this.dne.add(10);
      this.dne.add(11);
      this.dne.add(6);
    }
    if (t.CondListenBeHit.KnockUp) {
      this.dne.add(4);
    }
    if (t.CondListenBeHit.KnockDown) {
      this.dne.add(5);
    }
    if (t.CondListenBeHit.Parry) {
      this.dne.add(7);
    }
    if (t.CondListenBeHit.BreakWeakness) {
      this.dne.add(12);
    }
    this.Cne = t.CondListenBeHit.VisionCounterAttackId;
    return true;
  }
  OnClear() {
    this.Node.Owner.UnregisterBeHitEvent(this.gne);
  }
  OnEnter() {
    this.ResultSelf = false;
    this.Node.Owner.RegisterBeHitEvent(this.gne);
  }
  OnExit() {
    this.ResultSelf = false;
    this.Node.Owner.UnregisterBeHitEvent(this.gne);
  }
  ToString(t, i = 0) {
    super.ToString(t, i);
    t.Append(`监听受击
`);
  }
}
exports.AiStateMachineConditionListenBeHit = AiStateMachineConditionListenBeHit;
//# sourceMappingURL=AiStateMachineConditionListenBeHit.js.map