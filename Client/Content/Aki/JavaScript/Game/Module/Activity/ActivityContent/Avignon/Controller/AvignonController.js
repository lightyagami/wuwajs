"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvignonController = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../../ActivityControllerBase");
const AvignonActivitySubView_1 = require("../View/AvignonActivitySubView");
class AvignonController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.kSc = e => {
      ModelManager_1.ModelManager.AvignonModel.AvignonInfoUpdate(e);
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(23718, this.kSc);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23718);
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["AvignonActivityMainView", "AvignonStageTaskView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        return true;
      }
    }
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_CollegeThemeGuide";
  }
  OnCreateSubPageComponent(e) {
    return new AvignonActivitySubView_1.AvignonActivitySubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.AvignonModel.GetAvigonoProtocolData();
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("ActivityUnlockTipAvignonView");
  }
  static RequestTaskReward(t) {
    var e = new Protocol_1.Aki.Protocol.ofc();
    e.gps = t;
    var r = ModelManager_1.ModelManager.AvignonModel.GetAvignonActivityId();
    e.w6n = r;
    Net_1.Net.Call(29570, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18315);
        } else {
          ModelManager_1.ModelManager.AvignonModel.UpdateTaskRewardStatus(t);
        }
      }
    });
  }
}
exports.AvignonController = AvignonController;
//# sourceMappingURL=AvignonController.js.map