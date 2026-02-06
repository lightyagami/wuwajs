"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekCardController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
class WeekCardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23775, this.hLg);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23775);
  }
  static async RequestWeekCardInfo(e) {
    var r = Protocol_1.Aki.Protocol.skf.create();
    r._kf = e;
    var e = await Net_1.Net.CallAsync(17921, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 28747) && (ModelManager_1.ModelManager.WeekCardModel.SetWeekCardInfo(e.OUs), true);
  }
  static async RequestWeekCardReward(e) {
    var r = Protocol_1.Aki.Protocol.hkf.create();
    r.dkf = e;
    var e = await Net_1.Net.CallAsync(16212, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 27919);
  }
}
(exports.WeekCardController = WeekCardController).hLg = e => {
  ModelManager_1.ModelManager.WeekCardModel.SetWeekCardInfo(e.OUs);
};
//# sourceMappingURL=WeekCardController.js.map