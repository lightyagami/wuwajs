"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLordGymController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const LordGymActivityData_1 = require("./LordGymActivityData");
const LordGymActivitySubView_1 = require("./LordGymActivitySubView");
class ActivityLordGymController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(t) {}
  OnGetActivityResource(t) {
    return "UiItem_ActivityLordGym";
  }
  OnCreateSubPageComponent(t) {
    return new LordGymActivitySubView_1.LordGymActivitySubView();
  }
  OnCreateActivityData(t) {
    return new LordGymActivityData_1.LordGymActivityData();
  }
  static GetCurrentActivityData() {
    var t = ModelManager_1.ModelManager.ActivityModel?.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_NewLordGym);
    let e = undefined;
    t?.forEach(t => {
      e = t;
    });
    return e;
  }
}
exports.ActivityLordGymController = ActivityLordGymController;
//# sourceMappingURL=ActivityLordGymController.js.map