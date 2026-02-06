"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaGuideController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const PhantomArenaGuideActivityData_1 = require("./PhantomArenaGuideActivityData");
const PhantomArenaGuideSubView_1 = require("./Prepare/Entrance/PhantomArenaGuideSubView");
class PhantomArenaGuideController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_SoundRemnantArenaMainNew";
  }
  OnCreateSubPageComponent(e) {
    return new PhantomArenaGuideSubView_1.PhantomArenaGuideSubView();
  }
  OnCreateActivityData(e) {
    return new PhantomArenaGuideActivityData_1.PhantomArenaGuideActivityData();
  }
  OnGetIsOpeningActivityRelativeView() {
    throw new Error("Method not implemented.");
  }
  static RequestReward(t) {
    var e = new Protocol_1.Aki.Protocol.XWm();
    Net_1.Net.Call(20725, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18341);
        } else {
          ModelManager_1.ModelManager.ActivityModel.GetActivityById(t)?.UpdateReceiveState(true);
        }
      }
    });
  }
}
exports.PhantomArenaGuideController = PhantomArenaGuideController;
//# sourceMappingURL=PhantomArenaGuideController.js.map