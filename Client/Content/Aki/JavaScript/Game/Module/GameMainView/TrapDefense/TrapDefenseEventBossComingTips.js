"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseEventBossComingTips = undefined;
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class TrapDefenseEventBossComingTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnStart() {
    this.Data = this.OpenParam;
  }
  OnFinishShowImplementImplementImplement() {
    this.CloseMe();
  }
  OnBeforeDestroy() {
    var e = this.Data?.Callback;
    if (e) {
      e();
    }
  }
}
exports.TrapDefenseEventBossComingTips = TrapDefenseEventBossComingTips;
//# sourceMappingURL=TrapDefenseEventBossComingTips.js.map