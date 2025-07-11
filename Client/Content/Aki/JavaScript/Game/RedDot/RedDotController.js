"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotController = undefined;
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../Manager/ModelManager");
class RedDotController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return true;
  }
  static BindRedDot(e, t, a, r = 0) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    if (e) {
      e.BindUi(r, t, a);
    }
  }
  static UnBindRedDot(e) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    if (e) {
      e.UnBindUi();
    }
  }
  static UnBindRedDotAndClearData(e) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    if (e) {
      e.UnBindUiAndClearData();
    }
  }
  static UnBindGivenUi(e, t, a = 0) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    if (e) {
      e.UnBindGivenUi(a, t);
    }
  }
  static UnBindGivenUiAndDeleteData(e, t, a = 0) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    if (e) {
      e.UnBindGivenUiAndDeleteData(a, t);
    }
  }
}
exports.RedDotController = RedDotController;
//# sourceMappingURL=RedDotController.js.map