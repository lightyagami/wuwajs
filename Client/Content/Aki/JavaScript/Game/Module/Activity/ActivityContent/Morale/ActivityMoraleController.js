"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMoraleController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityManager_1 = require("../../ActivityManager");
const ActivityMoraleData_1 = require("./ActivityMoraleData");
const ActivitySubViewMorale_1 = require("./ActivitySubViewMorale");
class ActivityMoraleController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_MoraleMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMorale_1.ActivitySubViewMorale();
  }
  OnCreateActivityData(e) {
    this.Data = new ActivityMoraleData_1.ActivityMoraleData();
    return this.Data;
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  static UU_() {
    return ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_MoraleActivity);
  }
  static GetData() {
    return this.UU_()?.Data;
  }
  static RefreshActivityRedDot() {
    var e = this.GetData()?.Id;
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
    }
  }
}
exports.ActivityMoraleController = ActivityMoraleController;
//# sourceMappingURL=ActivityMoraleController.js.map