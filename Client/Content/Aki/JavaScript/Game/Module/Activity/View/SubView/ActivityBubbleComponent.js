"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityBubbleComponent = undefined;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class ActivityBubbleComponent {
  constructor(e, t, i, r) {
    this.mrg = e;
    this.frg = t;
    this.grg = i;
    this.Crg = r;
    this.Pe = undefined;
    this.prg = false;
  }
  RefreshBubble(e) {
    this.Pe = e;
    var t = ModelManager_1.ModelManager.ActivityModel;
    if (e.RedPointShowState) {
      this.HideBubble();
      return false;
    }
    e.UpdateImportantBubble();
    if (!e.IsShowImportantBubble || e.BubbleType === 0) {
      this.HideBubble();
      return false;
    }
    if (e.BubbleType !== 3 && t.CheckBubbleHasClicked(e.Id, e.BubbleType)) {
      this.HideBubble();
      return false;
    }
    t = ActivityBubbleComponent.vrg.get(e.BubbleType);
    if (!t) {
      this.HideBubble();
      return false;
    }
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    if (!t) {
      this.HideBubble();
      return false;
    }
    this.ShowBubble();
    this.Crg(t, this.frg, false);
    t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat7(this.L2e(e.BubbleEndShowTime)).CountDownText;
    if (t) {
      this.grg.SetText(t);
    }
    return true;
  }
  ShowBubble() {
    this.prg = true;
    this.mrg.SetUIActive(true);
  }
  HideBubble() {
    this.prg = false;
    this.mrg.SetUIActive(false);
  }
  CheckToUpdateBubbleClickState() {
    var e;
    return !!this.prg && this.Pe.BubbleType !== 0 && (e = ModelManager_1.ModelManager.ActivityModel.CheckBubbleHasClicked(this.Pe.Id, this.Pe.BubbleType), ModelManager_1.ModelManager.ActivityModel.SetBubbleHasClicked(this.Pe.Id, this.Pe.BubbleType), e !== ModelManager_1.ModelManager.ActivityModel.CheckBubbleHasClicked(this.Pe.Id, this.Pe.BubbleType));
  }
  GetIsShowBubble() {
    return this.prg;
  }
  L2e(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return Math.max(e - t, 1);
  }
}
(exports.ActivityBubbleComponent = ActivityBubbleComponent).vrg = new Map([[1, "WhiteTimeIcon"], [2, "YellowTimeIcon"], [3, "RedTimeIcon"]]);
//# sourceMappingURL=ActivityBubbleComponent.js.map