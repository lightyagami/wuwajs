"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityBubbleComponent = undefined;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class ActivityBubbleComponent {
  constructor(i, t, e, r) {
    this.Xjf = i;
    this.Yjf = t;
    this.zjf = e;
    this.Jjf = r;
    this.Pe = undefined;
    this.Zjf = false;
    this.$Vm = 0;
  }
  RefreshBubble(i) {
    this.Pe = i;
    var t = ModelManager_1.ModelManager.ActivityModel;
    if (i.FinishShowState || i.RedPointShowState) {
      this.HideBubble();
      return false;
    }
    if (!i.CheckIfInOpenTime()) {
      this.HideBubble();
      return false;
    }
    var [e,, r] = t.GetTimeVisibleAndRemainTime(i);
    if (!e || r <= 0) {
      this.HideBubble();
      return false;
    }
    e = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityTimeShow(i.LocalConfig.TimeShowId);
    if (!e) {
      this.HideBubble();
      return false;
    }
    var s = this.L2e(r);
    var s = TimeUtil_1.TimeUtil.CalculateRemainingTime(s, 3)?.TimeValue ?? 0;
    this.$Vm = t.GetBubbleTypeByTimeInterval(e, s);
    if (this.$Vm === 0) {
      this.HideBubble();
      return false;
    }
    if (this.$Vm !== 3 && t.CheckBubbleHasClicked(i.Id, this.$Vm)) {
      this.HideBubble();
      return false;
    }
    e = ActivityBubbleComponent.e$f.get(this.$Vm);
    if (!e) {
      this.HideBubble();
      return false;
    }
    s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    if (!s) {
      this.HideBubble();
      return false;
    }
    this.ShowBubble();
    this.Jjf(s, this.Yjf, false);
    t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat7(this.L2e(r)).CountDownText;
    if (t) {
      this.zjf.SetText(t);
    }
    return true;
  }
  ShowBubble() {
    this.Zjf = true;
    this.Xjf.SetUIActive(true);
  }
  HideBubble() {
    this.Zjf = false;
    this.Xjf.SetUIActive(false);
  }
  CheckToUpdateBubbleClickState() {
    var i;
    return !!this.Zjf && this.$Vm !== 0 && (i = ModelManager_1.ModelManager.ActivityModel.CheckBubbleHasClicked(this.Pe.Id, this.$Vm), ModelManager_1.ModelManager.ActivityModel.SetBubbleHasClicked(this.Pe.Id, this.$Vm), i !== ModelManager_1.ModelManager.ActivityModel.CheckBubbleHasClicked(this.Pe.Id, this.$Vm));
  }
  GetIsShowBubble() {
    return this.Zjf;
  }
  L2e(i) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return Math.max(i - t, 1);
  }
}
(exports.ActivityBubbleComponent = ActivityBubbleComponent).e$f = new Map([[1, "WhiteTimeIcon"], [2, "YellowTimeIcon"], [3, "RedTimeIcon"]]);
//# sourceMappingURL=ActivityBubbleComponent.js.map