"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExchangeRewardController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
class ExchangeRewardController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, ExchangeRewardController.RequestExchangeData);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, ExchangeRewardController.RequestExchangeData);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28903, ExchangeRewardController.wai);
    Net_1.Net.Register(27672, ExchangeRewardController.Bai);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28903);
    Net_1.Net.UnRegister(27672);
  }
}
exports.ExchangeRewardController = ExchangeRewardController;
(_a = ExchangeRewardController).wai = e => {
  ModelManager_1.ModelManager.ExchangeRewardModel.OnExchangeRewardNotify(e);
};
ExchangeRewardController.Bai = e => {
  ModelManager_1.ModelManager.ExchangeRewardModel.OnShareInfoNotify(e);
};
ExchangeRewardController.RequestExchangeData = async () => {
  var e = new Protocol_1.Aki.Protocol.Jos();
  var e = await Net_1.Net.CallAsync(16395, e);
  ModelManager_1.ModelManager.ExchangeRewardModel.Phrase(e);
}; //# sourceMappingURL=ExchangeRewardController.js.map