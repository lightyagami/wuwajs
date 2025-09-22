"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoLoadingView = undefined;
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
class FightPhotoLoadingView extends UiViewBase_1.UiViewBase {
  OnAfterShow() {
    UiManager_1.UiManager.OpenView("FightPhotoMainView", this.OpenParam, () => {
      this.CloseMe();
    });
  }
}
exports.FightPhotoLoadingView = FightPhotoLoadingView;
//# sourceMappingURL=FightPhotoLoadingView.js.map