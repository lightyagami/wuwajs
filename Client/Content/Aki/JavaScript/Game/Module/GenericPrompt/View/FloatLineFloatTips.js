"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatLineFloatTips = undefined;
const UE = require("ue");
const GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class FloatLineFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  constructor() {
    super(...arguments);
    this.QYt = undefined;
    this.XYt = undefined;
  }
  OnStart() {
    var t;
    super.OnStart();
    this.QYt = this.MainText.GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    this.XYt = this.ExtraText.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.QYt?.SetSelectorOffset(1);
    if (this.XYt) {
      t = this.TickDuration * 0.5;
      t = this.XYt.GetPlayTween().duration > t ? t : this.XYt.GetPlayTween().duration;
      this.XYt.GetPlayTween().duration = t;
      this.XYt?.Play();
    }
  }
}
exports.FloatLineFloatTips = FloatLineFloatTips;
//# sourceMappingURL=FloatLineFloatTips.js.map