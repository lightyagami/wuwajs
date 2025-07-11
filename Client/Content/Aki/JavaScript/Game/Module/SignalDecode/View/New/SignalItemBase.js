"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalItemBase = undefined;
const UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction");
class SignalItemBase extends UiComponentsAction_1.UiComponentsAction {
  constructor(t, s, i, e) {
    super();
    this.Type = 0;
    this.GameplayType = 2;
    this.Width = 0;
    this.DecisionShowSize = 36;
    this.CurrentRelativeX = 0;
    this.StartDecisionSize = 0;
    this.EndDecisionSize = 0;
    this.IsCatchBtnDown = false;
    this.RelativeXWhenCatchDown = 0;
    this.RelativeXWhenCatchUp = 0;
    this.RootHalfWidth = 0;
    this.Type = t;
    this.RootHalfWidth = s;
    this.StartDecisionSize = i;
    this.EndDecisionSize = e;
  }
  Reset() {
    this.CurrentRelativeX = 0;
    this.OnReset();
  }
  InitByGameplayType(t) {
    this.GameplayType = t;
  }
  Update(t) {
    this.CurrentRelativeX = t;
    this.OnUpdate();
  }
  GetProgress() {
    return 0;
  }
  OnCatchBtnDown() {
    this.IsCatchBtnDown = true;
    this.RelativeXWhenCatchDown = this.CurrentRelativeX;
  }
  OnCatchBtnUp() {
    this.IsCatchBtnDown = false;
    this.RelativeXWhenCatchUp = this.CurrentRelativeX;
  }
  OnReset() {}
  OnUpdate() {
    var t;
    return !!this.RootHalfWidth && (t = this.CurrentRelativeX - this.Width, t = this.CurrentRelativeX >= -this.RootHalfWidth && t <= this.RootHalfWidth, this.RootItem?.SetUIActive(t), t);
  }
  TestCanBtnDown() {
    return false;
  }
  TestCanBtnUp() {
    return false;
  }
}
exports.SignalItemBase = SignalItemBase;
//# sourceMappingURL=SignalItemBase.js.map