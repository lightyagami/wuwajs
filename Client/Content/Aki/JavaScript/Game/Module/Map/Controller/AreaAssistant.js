"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaAssistant = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
class AreaAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.BLi = e => {
      ModelManager_1.ModelManager.MapModel.AddUnlockMultiMapIds(e.Mbs);
    };
    this.bLi = e => {
      ModelManager_1.ModelManager.MapModel.SetUnlockMapBlockIds(e.Sbs);
    };
    this.qLi = e => {
      ModelManager_1.ModelManager.MapModel.SetUnlockMultiMapIds(e.Mbs);
      ModelManager_1.ModelManager.MapModel.SetUnlockMapBlockIds(e.Sbs);
    };
    this.GLi = e => {
      ModelManager_1.ModelManager.MapModel.AddUnlockedFogs(e.mbs);
    };
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(15281, this.GLi);
    Net_1.Net.Register(19034, this.qLi);
    Net_1.Net.Register(29726, this.bLi);
    Net_1.Net.Register(23209, this.BLi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15281);
    Net_1.Net.UnRegister(19034);
    Net_1.Net.UnRegister(29726);
    Net_1.Net.UnRegister(23209);
  }
  async RequestUnlockedAreaInfo() {
    var e = Protocol_1.Aki.Protocol.Qss.create();
    var e = await Net_1.Net.CallAsync(25816, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18565);
      } else {
        ModelManager_1.ModelManager.MapModel.FullUpdateUnlockedFogs(e.mbs);
      }
    }
  }
}
exports.AreaAssistant = AreaAssistant;
//# sourceMappingURL=AreaAssistant.js.map