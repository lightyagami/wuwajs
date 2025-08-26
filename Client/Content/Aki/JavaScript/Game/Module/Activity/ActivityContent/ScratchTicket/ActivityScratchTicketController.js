"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityScratchTicketController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ScratchTicketData_1 = require("./Data/ScratchTicketData");
const ScratchTicketActivityView_1 = require("./View/ScratchTicketActivityView");
class ActivityScratchTicketController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ScratchoffTicketMain";
  }
  OnCreateSubPageComponent(e) {
    return new ScratchTicketActivityView_1.ScratchTicketActivityView();
  }
  OnCreateActivityData(e) {
    var t = new ScratchTicketData_1.ScratchTicketData();
    ModelManager_1.ModelManager.ActivityScratchTicketModel.SetScratchTicketData(t);
    return t;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static async OpenScratchTicketMainView() {
    var e = ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchTicketData();
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScratchTicket", 58, "scratchTicketData为空，无法打开");
      }
      return false;
    } else {
      return (await UiManager_1.UiManager.OpenViewAsync("ScratchTicketMainView", e)) !== undefined;
    }
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(15315, ActivityScratchTicketController.Iol);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15315);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityScratchTicketController.qdi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityScratchTicketController.qdi);
  }
  static SendScratchCardRewardRequest(t, r, i) {
    var e = Protocol_1.Aki.Protocol.tC_.create();
    e.Tol = t;
    e.c5n = r;
    Net_1.Net.Call(20094, e, e => {
      if (e) {
        if (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 20163);
        } else {
          ModelManager_1.ModelManager.ActivityScratchTicketModel.OnScratchCardRewardResponse(r, t, e, i);
        }
      }
    });
  }
  static async SendScratchCardActivityInfoRequest() {
    var e;
    var t = ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchTicketData();
    return t !== undefined && ((e = Protocol_1.Aki.Protocol.mg_.create()).w6n = t.Id, !!(e = await Net_1.Net.CallAsync(29366, e))) && (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 20163), false) : e.YVn !== undefined && (t.InitData(e.YVn), true));
  }
  static ShowScratchTicketRewardTip(e) {
    var t;
    var r;
    var i;
    if (!(e.length < 1)) {
      if ((i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e[0].ConfigId)) !== undefined) {
        t = i.IconSmall + "/";
        r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
        i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(i.QualityId);
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ScratchCardRewardTips", t, i.TextColor, r, e[0].Count.toString());
      }
    }
  }
}
(exports.ActivityScratchTicketController = ActivityScratchTicketController).Iol = e => {
  ModelManager_1.ModelManager.ActivityScratchTicketModel.OnScratchCardCountInfoNotify(e);
};
ActivityScratchTicketController.qdi = (e, t) => {
  var r = ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchTicketData();
  if (r !== undefined && e === r.GetCostItemId()) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, r.Id);
  }
}; //# sourceMappingURL=ActivityScratchTicketController.js.map