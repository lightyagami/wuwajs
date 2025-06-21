"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityMoraleController = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityManager_1 = require("../../ActivityManager"),
  ActivityMoraleData_1 = require("./ActivityMoraleData"),
  ActivitySubViewMorale_1 = require("./ActivitySubViewMorale");
class ActivityMoraleController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments), this.Data = void 0
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_MoraleMain"
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMorale_1.ActivitySubViewMorale
  }
  OnCreateActivityData(e) {
    return this.Data = new ActivityMoraleData_1.ActivityMoraleData, this.Data
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  static UU_() {
    return ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_MoraleActivity)
  }
  static GetData() {
    return this.UU_()?.Data
  }
  static RefreshActivityRedDot() {
    var e = this.GetData()?.Id;
    e && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e)
  }
}
exports.ActivityMoraleController = ActivityMoraleController;
//# sourceMappingURL=ActivityMoraleController.js.map