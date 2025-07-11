"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSuccessController = undefined;
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonSuccessData_1 = require("./CommonSuccessData");
class CommonSuccessController extends UiControllerBase_1.UiControllerBase {
  static OpenCommonSuccessView(e = undefined, o = undefined) {
    e = e ?? new CommonSuccessData_1.CommonSuccessData();
    UiManager_1.UiManager.OpenView("CommonSuccessView", e, o);
  }
}
exports.CommonSuccessController = CommonSuccessController;
//# sourceMappingURL=CommonSuccessController.js.map