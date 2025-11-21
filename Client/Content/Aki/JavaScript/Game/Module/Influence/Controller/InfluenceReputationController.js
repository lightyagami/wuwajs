"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceReputationController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
class InfluenceReputationController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, InfluenceReputationController.RequestInfluenceInfo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, InfluenceReputationController.RequestInfluenceInfo);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15402, InfluenceReputationController.jni);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15402);
  }
  static RequestInfluenceReward(e) {
    var t = Protocol_1.Aki.Protocol.wos.create();
    t.y9n = e;
    Net_1.Net.Call(26479, t, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 21298);
      } else if (ModelManager_1.ModelManager.InfluenceReputationModel.UpdateInfluenceRewardIndex(e.y9n, e.I9n)) {
        InfluenceReputationController.Wni(e.gws);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveReputationReward);
      }
    });
  }
  static Wni(e) {
    var t = [];
    for (const o of Object.keys(e)) {
      var n = Number.parseInt(o);
      var r = e[o];
      var n = new RewardItemData_1.RewardItemData(n, r);
      t.push(n);
    }
    ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1009, t);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("InfluenceReputationView", InfluenceReputationController.iVe, "InfluenceReputationController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("InfluenceReputationView", InfluenceReputationController.iVe);
  }
}
(exports.InfluenceReputationController = InfluenceReputationController).jni = e => {
  e = e.mws;
  ModelManager_1.ModelManager.InfluenceReputationModel.SetInfluenceInfoList(e);
};
InfluenceReputationController.RequestInfluenceInfo = () => {
  var e = Protocol_1.Aki.Protocol.Dos.create();
  Net_1.Net.Call(26441, e, e => {
    e = e.mws;
    ModelManager_1.ModelManager.InfluenceReputationModel.SetInfluenceInfoList(e);
  });
};
InfluenceReputationController.iVe = e => ModelManager_1.ModelManager.FunctionModel.IsOpen(10029); //# sourceMappingURL=InfluenceReputationController.js.map