"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaActivityController = undefined;
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const CiacconaActivityData_1 = require("./CiacconaActivityData");
const CiacconaActivitySubView_1 = require("./CiacconaActivitySubView");
class CiacconaActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView() {}
  OnGetActivityResource(t) {
    return "UiItem_ActivityXiaMain";
  }
  OnCreateSubPageComponent(t) {
    return new CiacconaActivitySubView_1.CiacconaActivitySubView();
  }
  OnCreateActivityData(t) {
    return new CiacconaActivityData_1.CiacconaActivityData();
  }
}
exports.CiacconaActivityController = CiacconaActivityController;
//# sourceMappingURL=CiacconaActivityController.js.map