"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToBusinessMainViewDirect = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const MoonChasingController_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingController");
const SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToBusinessMainViewDirect extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(i) {
    if (this.CheckMainViewOpen()) {
      if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
      if (!UiManager_1.UiManager.IsViewOpen("BusinessMainView")) {
        MoonChasingController_1.MoonChasingController.OpenBusinessMainView();
      }
    } else {
      this.SkipToMap(parseInt(i));
    }
  }
}
exports.SkipToBusinessMainViewDirect = SkipToBusinessMainViewDirect;
//# sourceMappingURL=SkipToBusinessMainViewDirect.js.map