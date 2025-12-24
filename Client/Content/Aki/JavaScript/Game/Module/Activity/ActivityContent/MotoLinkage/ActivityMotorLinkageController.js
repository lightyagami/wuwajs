"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMotorLinkageController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityMotorLinkageData_1 = require("./ActivityMotorLinkageData");
const ActivityMotorLinkageSubView_1 = require("./ActivityMotorLinkageSubView");
class ActivityMotorLinkageController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.xe = 0;
    this.g5c = e => {
      this.ActivityData.OnQuestUpdateNotify(e);
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMotoLinkage";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityMotorLinkageSubView_1.ActivityMotorLinkageSubView();
  }
  OnCreateActivityData(e) {
    this.xe = e.s5n;
    return new ActivityMotorLinkageData_1.ActivityMotorLinkageData();
  }
  get ActivityId() {
    return this.xe;
  }
  get ActivityData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(this.xe);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(26825, this.g5c);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26825);
  }
  async ReceiveAllRewardRequest(e) {
    var t = new Protocol_1.Aki.Protocol.oLm();
    t.hLm = e;
    var e = await Net_1.Net.CallAsync(17786, t);
    if (e !== undefined) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20179);
      } else {
        this.ActivityData?.OnRewardReceiveNotify(e.BVn);
      }
    }
  }
}
exports.ActivityMotorLinkageController = ActivityMotorLinkageController;
//# sourceMappingURL=ActivityMotorLinkageController.js.map