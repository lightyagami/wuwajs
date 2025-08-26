"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController");
const WeatherController_1 = require("../Weather/WeatherController");
const WeatherModel_1 = require("../Weather/WeatherModel");
class RogueBattleController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18189, RogueBattleController.OnRogueRoomInfoNotify);
    Net_1.Net.Register(17871, RogueBattleController.OnRogueResInstOptionsUpdateNotify);
    Net_1.Net.Register(15160, RogueBattleController.OnRogueResGainDataUpdateNotify);
    Net_1.Net.Register(20780, RogueBattleController.OnRogueResElementUpdateNotify);
    Net_1.Net.Register(17876, RogueBattleController.OnRogueResRoleBondUpdateNotify);
    Net_1.Net.Register(17512, RogueBattleController.OnRogueResFormationUpdateNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18189);
    Net_1.Net.UnRegister(17871);
    Net_1.Net.UnRegister(15160);
    Net_1.Net.UnRegister(20780);
    Net_1.Net.UnRegister(17876);
    Net_1.Net.UnRegister(17512);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, this.OnLeaveInstanceDungeon);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, this.OnLeaveInstanceDungeon);
  }
  static async GotoNextRoomRequest() {
    var e = new Protocol_1.Aki.Protocol.UBc();
    var e = await Net_1.Net.CallAsync(17818, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24985);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RogueBattle", 34, "进入下一层成功");
      }
    }
  }
  static async SwitchFormationRequest(e) {
    var o = new Protocol_1.Aki.Protocol.El1();
    o.c5n = e;
    var e = await Net_1.Net.CallAsync(27272, o);
    if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrUpdateFightRoleRepeated) {
      ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27272);
    }
  }
  static async ChangeFormationAllListRequest(e, o) {
    var t = new Protocol_1.Aki.Protocol.Kr1();
    t.do1 = new Protocol_1.Aki.Protocol.do1();
    t.do1.Q6n = o.filter(e => e !== 0);
    t.c5n = e;
    var o = await Net_1.Net.CallAsync(18208, t);
    if (o) {
      if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && o.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrUpdateFightRoleRepeated) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 18208);
      } else {
        ModelManager_1.ModelManager.RogueBattleModel.UpdateFormationData(e, o.do1);
      }
    }
  }
  static async ChangeFormationRequest(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.Kr1();
    var a = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(e);
    if (a) {
      if (a.Q6n[o] === t) {
        a.Q6n[o] = 0;
      } else {
        a.Q6n[o] = t;
      }
      a.Q6n = a.Q6n.filter(e => e !== 0).concat(a.Q6n.filter(e => e === 0));
      r.do1 = new Protocol_1.Aki.Protocol.do1();
      r.do1.Q6n = a.Q6n.filter(e => e !== 0);
      r.c5n = e;
      if (o = await Net_1.Net.CallAsync(18208, r)) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && o.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrUpdateFightRoleRepeated) {
          ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 18208);
        } else {
          ModelManager_1.ModelManager.RogueBattleModel.UpdateFormationData(e, o.do1);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "没有找到阵型数据", ["Index:", e]);
    }
  }
  static async SelectTokenRequest(e) {
    var o = new Protocol_1.Aki.Protocol.yEc();
    o.VB1 = e;
    var e = await Net_1.Net.CallAsync(21338, o);
    if (e) {
      if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 21338);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueBattleSelectOption);
    }
  }
  static async OpenBuffSelectViewById(e) {
    var o;
    var t = ModelManager_1.ModelManager.RogueBattleModel.GetOptionDataById(e);
    if (t) {
      o = this.GetViewNameByGainType(t.hIc);
      return !!UiManager_1.UiManager.IsViewOpen(o) || (Log_1.Log.CheckInfo() && Log_1.Log.Info("RogueBattle", 34, "肉鸽选择界面数据:", ["BindId:", e], ["Data:", t]), (await UiManager_1.UiManager.OpenViewAsync(o, e)) !== undefined);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RogueBattle", 34, "没有肉鸽界面数据!");
      }
      return false;
    }
  }
  static GetViewNameByGainType(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.hIc.$9n:
        return "RogueBattleSelectTokenView";
      case Protocol_1.Aki.Protocol.hIc.mlu:
        return "RogueBattleRandomEventView";
      case Protocol_1.Aki.Protocol.hIc.Proto_TokenShop:
        return "RogueBattleShopView";
      case Protocol_1.Aki.Protocol.hIc.hxs:
        return "RogueBattlePhantomSelectView";
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "当前增益类型没有对应的界面数据", ["type", Protocol_1.Aki.Protocol.hIc[e]]);
    }
  }
}
(exports.RogueBattleController = RogueBattleController).OnLeaveInstanceDungeon = () => {
  ModelManager_1.ModelManager.RogueBattleModel.ClearData();
};
RogueBattleController.OnRogueResRoleBondUpdateNotify = e => {
  ModelManager_1.ModelManager.RogueBattleModel.UpdateFetterData(e);
};
RogueBattleController.OnRogueResElementUpdateNotify = e => {
  ModelManager_1.ModelManager.RogueBattleModel.UpdateElementData(e);
};
RogueBattleController.OnRogueResGainDataUpdateNotify = e => {
  ModelManager_1.ModelManager.RogueBattleModel.UpdateGainData(e);
};
RogueBattleController.OnRogueRoomInfoNotify = e => {
  var o = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRoomPoolConfig(e.CL_);
  var t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueRoomType(e.vqs);
  ModelManager_1.ModelManager.RogueBattleModel.CurrentRoomTypeId = t.RoomType;
  ModelManager_1.ModelManager.RogueBattleModel.CurrentRoomId = e.CL_;
  if (StringUtils_1.StringUtils.IsEmpty(o?.RoomsMusicState)) {
    ModelManager_1.ModelManager.RogueBattleModel.CurrentRoomMusicState = t.RoomsMusicState;
  } else {
    ModelManager_1.ModelManager.RogueBattleModel.CurrentRoomMusicState = o.RoomsMusicState;
  }
  if (e.pqs !== 0) {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(e.pqs, 0);
  } else {
    WeatherController_1.WeatherController.StopWeather();
  }
};
RogueBattleController.OnRogueResInstOptionsUpdateNotify = e => {
  ModelManager_1.ModelManager.RogueBattleModel.UpdateOptionData(e);
};
RogueBattleController.OnRogueResFormationUpdateNotify = o => {
  for (let e = 0; e < o.uo1.length; e++) {
    ModelManager_1.ModelManager.RogueBattleModel.UpdateFormationData(e, o.uo1[e]);
  }
}; //# sourceMappingURL=RogueBattleController.js.map