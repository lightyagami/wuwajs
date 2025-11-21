"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLinkageController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityLinkageData_1 = require("./ActivityLinkageData");
const ActivityLinkageSubView_1 = require("./View/ActivityLinkageSubView");
class ActivityLinkageController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnGetActivityResource(e) {
    return "UiItem_LinkageMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityLinkageSubView_1.ActivityLinkageSubView();
  }
  OnCreateActivityData(e) {
    ActivityLinkageController.LOe = e.s5n;
    return new ActivityLinkageData_1.ActivityLinkageData();
  }
  static GetActivityLinkageData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(this.LOe);
  }
  static RequestReward(t) {
    var e = new Protocol_1.Aki.Protocol.Sn1();
    e.w6n = this.LOe;
    e.In1 = t;
    Net_1.Net.Call(29266, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21053);
        } else if (e = this.GetActivityLinkageData()) {
          e.ReceiveReward(t);
        }
      }
    });
  }
}
(exports.ActivityLinkageController = ActivityLinkageController).LOe = 0;
//# sourceMappingURL=ActivityLinkageController.js.map