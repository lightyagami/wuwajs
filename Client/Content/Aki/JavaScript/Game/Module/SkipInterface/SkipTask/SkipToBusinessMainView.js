"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToBusinessMainView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const MoonChasingMainViewModel_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingMainViewModel");
const SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToBusinessMainView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(i) {
    var e;
    if (this.CheckMainViewOpen()) {
      ((e = UiManager_1.UiManager.GetViewByName("MoonChasingMainView")) ? e.OpenParam : new MoonChasingMainViewModel_1.MoonChasingMainViewModel()).SkipTarget = 1;
      if (UiManager_1.UiManager.IsViewOpen("RewardMainView")) {
        UiManager_1.UiManager.CloseView("RewardMainView");
      }
    } else {
      this.SkipToMap(parseInt(i));
    }
  }
}
exports.SkipToBusinessMainView = SkipToBusinessMainView;
//# sourceMappingURL=SkipToBusinessMainView.js.map