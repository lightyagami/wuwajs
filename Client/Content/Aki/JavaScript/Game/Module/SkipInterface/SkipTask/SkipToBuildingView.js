"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToBuildingView = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiManager_1 = require("../../../Ui/UiManager");
const MoonChasingController_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingController");
const MoonChasingMainViewModel_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingMainViewModel");
const SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToBuildingView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(i, n) {
    var e;
    if (this.CheckMainViewOpen()) {
      ((e = UiManager_1.UiManager.GetViewByName("MoonChasingMainView")) ? e.OpenParam : new MoonChasingMainViewModel_1.MoonChasingMainViewModel()).SkipTarget = 2;
      if (UiManager_1.UiManager.IsViewOpen("RewardMainView")) {
        if (n !== StringUtils_1.ZERO_STRING) {
          MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(parseInt(n));
        }
        UiManager_1.UiManager.CloseView("RewardMainView");
      }
    } else {
      this.SkipToMap(parseInt(i));
    }
  }
}
exports.SkipToBuildingView = SkipToBuildingView;
//# sourceMappingURL=SkipToBuildingView.js.map