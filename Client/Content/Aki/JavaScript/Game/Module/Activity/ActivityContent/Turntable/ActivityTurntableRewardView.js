"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTurntableRewardView = undefined;
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class ActivityTurntableRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.oPn = undefined;
  }
  OnAfterShow() {
    this.CloseMe(() => {
      this.oPn?.();
    });
  }
  OnStart() {
    this.oPn = this.OpenParam ?? undefined;
  }
}
exports.ActivityTurntableRewardView = ActivityTurntableRewardView;
//# sourceMappingURL=ActivityTurntableRewardView.js.map