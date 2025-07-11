"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const PostProcessTriggerStateBase_1 = require("./PostProcessTriggerStateBase");
class PostProcessTriggerStateOutsideToInside extends PostProcessTriggerStateBase_1.default {
  constructor() {
    super(...arguments);
    this.Timer = -0;
  }
  OnEnter(s) {
    this.Timer = 0;
    this.Owner.GetPostProcessComponent().BlendWeight = 0;
  }
  OnUpdate(s) {
    if (this.Timer > this.Owner.TransitionTime) {
      this.StateMachine.Switch(0);
    } else {
      this.Timer += s / 1000;
      s = MathUtils_1.MathUtils.Clamp(this.Timer / this.Owner.TransitionTime, 0, this.GetTargetDefaultValue());
      this.Owner.GetPostProcessComponent().BlendWeight = s;
    }
  }
}
exports.default = PostProcessTriggerStateOutsideToInside;
//# sourceMappingURL=PostProcessTriggerStateOutsideToInside.js.map