"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrepareCountdownFloatTips = undefined;
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class PrepareCountdownFloatTips extends UiViewBase_1.UiViewBase {
  OnAfterPlayStartSequence() {
    if (!this.ClosePromise?.IsPending()) {
      this.CloseMe();
    }
  }
}
exports.PrepareCountdownFloatTips = PrepareCountdownFloatTips;
//# sourceMappingURL=PrepareCountdownFloatTips.js.map