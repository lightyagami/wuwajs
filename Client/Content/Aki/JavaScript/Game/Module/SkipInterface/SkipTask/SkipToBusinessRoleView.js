"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToBusinessRoleView = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToBusinessRoleView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(e) {
    if (this.CheckMainViewOpen()) {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHelperView();
    } else {
      this.SkipToMap(parseInt(e));
    }
  }
}
exports.SkipToBusinessRoleView = SkipToBusinessRoleView;
//# sourceMappingURL=SkipToBusinessRoleView.js.map