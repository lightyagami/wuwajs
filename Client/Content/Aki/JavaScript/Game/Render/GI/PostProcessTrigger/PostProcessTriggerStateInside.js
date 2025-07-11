"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const PostProcessTriggerStateBase_1 = require("./PostProcessTriggerStateBase");
class PostProcessTriggerStateInside extends PostProcessTriggerStateBase_1.default {
  constructor() {
    super(...arguments);
    this.q1r = 0;
    this.G1r = false;
    this.j3 = -0;
  }
  OnEnter(s) {
    var t = this.GetTargetDefaultValue();
    this.Owner.GetPostProcessComponent().BlendWeight = t;
    this.q1r = t;
    this.G1r = false;
    this.j3 = 0;
  }
  OnUpdate(s) {
    var t = this.GetTargetDefaultValue();
    if (this.G1r) {
      this.j3 += s / 1000;
      s = MathUtils_1.MathUtils.Clamp(this.j3 / this.Owner.TransitionTime, 0, 1);
      this.Owner.GetPostProcessComponent().BlendWeight = MathUtils_1.MathUtils.Lerp(this.q1r, t, s);
      if (s >= 1) {
        this.G1r = false;
        this.j3 = 0;
        this.q1r = t;
      }
    } else if (this.q1r !== t) {
      this.G1r = true;
      this.j3 = 0;
    }
  }
}
exports.default = PostProcessTriggerStateInside;
//# sourceMappingURL=PostProcessTriggerStateInside.js.map