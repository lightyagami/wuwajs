"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const ReportDefine_1 = require("./ReportDefine");
class ReportController extends UiControllerBase_1.UiControllerBase {
  static ReportPlayerRequest(e, r, o, t = undefined) {
    var l = new Protocol_1.Aki.Protocol.nYn();
    l.MHn = e.GetPlayerId();
    l.SHn = r;
    l.EHn = o;
    l.yHn = e.GetSourceType();
    l.IHn = t ?? {
      THn: ""
    };
    var r = new Protocol_1.Aki.Protocol.gNs();
    r.H8n = e.GetName();
    r.zVn = e.GetSignature();
    l.LHn = r;
    Net_1.Net.Call(25931, Protocol_1.Aki.Protocol.nYn.create(l), this.ReportPlayerResponse);
  }
  static OpenReportView(e, r) {
    e = new ReportDefine_1.ReportPersonInfo(e.PlayerId, e.PlayerName, e.Signature, r);
    UiManager_1.UiManager.OpenView("ReportView", e);
  }
}
(exports.ReportController = ReportController).ReportPlayerResponse = e => {
  if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21751);
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ReportSuccess");
    if (UiManager_1.UiManager.IsViewShow("ReportView")) {
      UiManager_1.UiManager.CloseView("ReportView");
    }
  }
};
//# sourceMappingURL=ReportController.js.map