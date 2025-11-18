"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldLevelController = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class WorldLevelController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OriginWorldLevelUp, this.OnOriginWorldLevelUp);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.loo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OriginWorldLevelUp, this.OnOriginWorldLevelUp);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.loo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  static OnRegisterNetEvent() {}
  static OnUnRegisterNetEvent() {}
  static OnBasicInfoNotify(e) {
    this.SetWorldLevelAttributes(e);
  }
  static OnPlayerAttrNotify(e) {
    this.SetWorldLevelAttributes(e);
  }
  static SetWorldLevelAttributes(e) {
    for (const t of e) {
      var o;
      var r;
      if (t.Z4n === Protocol_1.Aki.Protocol.LNs.uSs) {
        ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = t.jSs;
      }
      if (t.Z4n === Protocol_1.Aki.Protocol.LNs.cSs) {
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = t.jSs;
      }
      if (t.Z4n === Protocol_1.Aki.Protocol.LNs.uOs) {
        ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp = t.jSs;
      }
      if (t.Z4n === Protocol_1.Aki.Protocol.LNs.v7n) {
        ModelManager_1.ModelManager.WorldLevelModel.Sex = t.jSs;
        ModelManager_1.ModelManager.PersonalModel.SetSex(t.jSs);
      }
      if (t.Z4n === Protocol_1.Aki.Protocol.LNs.Proto_Sign) {
        ModelManager_1.ModelManager.PersonalModel.SetSignature(t.j8n);
      }
      if (t.Z4n === Protocol_1.Aki.Protocol.LNs.Proto_PlayerTitle) {
        r = (o = t.j8n.split("_")).length === 2 ? parseInt(o[1]) : undefined;
        ModelManager_1.ModelManager.PersonalModel.SetDressedPlayerTitle(parseInt(o[0]), r);
      }
    }
  }
  static SendWorldLevelDownRequest() {
    var e = Protocol_1.Aki.Protocol.q0s.create();
    Net_1.Net.Call(16843, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = e.uSs;
          ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.cSs;
          ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp = e.uOs;
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(WorldLevelController.GetLocalText("WorldLevelAdjustTo", ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString()));
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25115);
        }
      }
    });
  }
  static SendWorldLevelRegainRequest() {
    var e = Protocol_1.Aki.Protocol.O0s.create();
    Net_1.Net.Call(22374, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = e.uSs;
          ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.cSs;
          ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp = e.uOs;
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(WorldLevelController.GetLocalText("WorldLevelAdjustTo", ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString()));
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18394);
        }
      }
    });
  }
  static GetLocalText(e, o) {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
    var r = UE.NewArray(UE.BuiltinString);
    r.Add(o);
    return UE.KuroStaticLibrary.KuroFormatText(e ?? "", r);
  }
}
(exports.WorldLevelController = WorldLevelController).OnOriginWorldLevelUp = () => {
  if (UiManager_1.UiManager.IsViewShow("WorldLevelUpView")) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldLevelUpViewRefresh);
  } else {
    UiManager_1.UiManager.OpenView("WorldLevelUpView");
  }
};
WorldLevelController.OpenWorldLevelInfoView = () => {
  if (!UiManager_1.UiManager.IsViewShow("WorldLevelInfoView")) {
    UiManager_1.UiManager.OpenView("WorldLevelInfoView");
  }
};
WorldLevelController.$Ge = e => {
  if (e === "FunctionView" && UiManager_1.UiManager.IsViewShow("WorldLevelInfoView")) {
    UiManager_1.UiManager.CloseView("WorldLevelInfoView");
  }
};
WorldLevelController.loo = () => {
  if (UiManager_1.UiManager.IsViewShow("WorldLevelInfoView")) {
    UiManager_1.UiManager.CloseView("WorldLevelInfoView");
  }
}; //# sourceMappingURL=WorldLevelController.js.map