"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeController = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const AdvanceNoticeData_1 = require("./AdvanceNoticeData");
const AdvanceNoticeSubView_1 = require("./AdvanceNoticeSubView");
const AdvanceNoticeViewModel_1 = require("./AdvanceNoticeViewModel");
class AdvanceNoticeController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityPreviewGuide";
  }
  OnCreateSubPageComponent(e) {
    return new AdvanceNoticeSubView_1.AdvanceNoticeSubView();
  }
  OnCreateActivityData(e) {
    return new AdvanceNoticeData_1.AdvanceNoticeData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OpenAdvanceNoticeView(e, i) {
    var t = new AdvanceNoticeViewModel_1.AdvanceNoticeViewModel();
    t.DefaultSelectedTabId = i;
    var i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingPageInfoById(e);
    t.TabList = i.TabIdArray;
    t.ActivityId = i.ActivityId;
    UiManager_1.UiManager.OpenView("AdvanceNoticeRootView", t);
  }
}
exports.AdvanceNoticeController = AdvanceNoticeController;
//# sourceMappingURL=AdvanceNoticeController.js.map