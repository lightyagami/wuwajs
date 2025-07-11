"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FragmentMemoryActivityController = undefined;
const FragmentMemorySubView_1 = require("../Activity/ActivityContent/FragmentMemory/FragmentMemorySubView");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const FragmentMemoryActivityData_1 = require("./FragmentMemoryActivityData");
class FragmentMemoryActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityProcessMemory";
  }
  OnCreateSubPageComponent(e) {
    return new FragmentMemorySubView_1.FragmentMemorySubView();
  }
  OnCreateActivityData(e) {
    return new FragmentMemoryActivityData_1.FragmentMemoryActivityData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
}
exports.FragmentMemoryActivityController = FragmentMemoryActivityController;
//# sourceMappingURL=FragmentMemoryActivityController.js.map