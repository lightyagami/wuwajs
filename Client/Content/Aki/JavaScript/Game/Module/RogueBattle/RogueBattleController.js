"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleController = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  AsyncTask_1 = require("../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../World/Task/TaskSystem"),
  ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  WeatherController_1 = require("../Weather/WeatherController"),
  WeatherModel_1 = require("../Weather/WeatherModel");
class RogueBattleController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15369, RogueBattleController.OnRogueRoomInfoNotify), Net_1.Net.Register(18597, RogueBattleController.OnRogueSubLevelNotify), Net_1.Net.Register(23703, RogueBattleController.OnRogueResInstOptionsUpdateNotify), Net_1.Net.Register(21932, RogueBattleController.OnRogueResGainDataUpdateNotify), Net_1.Net.Register(20068, RogueBattleController.OnRogueResElementUpdateNotify), Net_1.Net.Register(16404, RogueBattleController.OnRogueResRoleBondUpdateNotify), Net_1.Net.Register(21715, RogueBattleController.OnRogueResFormationUpdateNotify)
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15369), Net_1.Net.UnRegister(18597), Net_1.Net.UnRegister(23703), Net_1.Net.UnRegister(21932), Net_1.Net.UnRegister(20068), Net_1.Net.UnRegister(16404), Net_1.Net.UnRegister(21715)
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, this.OnLeaveInstanceDungeon)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, this.OnLeaveInstanceDungeon)
  }
  static UWa(o) {
    return [o.fL_.filter(e => !o.mL_.includes(e)), o.mL_.filter(e => !o.fL_.includes(e))]
  }
  static async GotoNextRoomRequest() {
    var e = new Protocol_1.Aki.Protocol.UBc,
      e = await Net_1.Net.CallAsync(25757, e);
    e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28133) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("RogueBattle", 34, "进入下一层成功"))
  }
  static async SwitchFormationRequest(e) {
    var o = new Protocol_1.Aki.Protocol.G_1,
      e = (o.c5n = e, await Net_1.Net.CallAsync(19651, o));
    e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrUpdateFightRoleRepeated && ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19651)
  }
  static async ChangeFormationAllListRequest(e) {
    var o = new Protocol_1.Aki.Protocol.Rr1,
      t = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(e);
    t ? (o.Qr1 = new Protocol_1.Aki.Protocol.Qr1, o.Qr1.Q6n = t.Q6n.filter(e => 0 !== e), o.c5n = e, (t = await Net_1.Net.CallAsync(18726, o)) && (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && t.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrUpdateFightRoleRepeated ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18726) : ModelManager_1.ModelManager.RogueBattleModel.UpdateFormationData(e, t.Qr1))) : Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "没有找到阵型数据", ["Index:", e])
  }
  static async ChangeFormationRequest(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.Rr1,
      a = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(e);
    a ? (a.Q6n[o] === t ? a.Q6n[o] = 0 : a.Q6n[o] = t, a.Q6n = a.Q6n.filter(e => 0 !== e).concat(a.Q6n.filter(e => 0 === e)), r.Qr1 = new Protocol_1.Aki.Protocol.Qr1, r.Qr1.Q6n = a.Q6n.filter(e => 0 !== e), r.c5n = e, (o = await Net_1.Net.CallAsync(18726, r)) && (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && o.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrUpdateFightRoleRepeated ? ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 18726) : ModelManager_1.ModelManager.RogueBattleModel.UpdateFormationData(e, o.Qr1))) : Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "没有找到阵型数据", ["Index:", e])
  }
  static async SelectTokenRequest(e) {
    var o = new Protocol_1.Aki.Protocol.yEc,
      e = (o.uB1 = e, await Net_1.Net.CallAsync(19869, o));
    e && (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs && ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 19869), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueBattleSelectOption))
  }
  static async OpenBuffSelectViewById(e) {
    var o, t = ModelManager_1.ModelManager.RogueBattleModel.GetOptionDataById(e);
    return t ? (o = this.GetViewNameByGainType(t.hIc), !!UiManager_1.UiManager.IsViewOpen(o) || (Log_1.Log.CheckInfo() && Log_1.Log.Info("RogueBattle", 34, "肉鸽选择界面数据:", ["BindId:", e], ["Data:", t]), void 0 !== await UiManager_1.UiManager.OpenViewAsync(o, e))) : (Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "没有肉鸽界面数据!"), !1)
  }
  static GetViewNameByGainType(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.hIc.$9n:
        return "RogueBattleSelectTokenView";
      case Protocol_1.Aki.Protocol.hIc.Proto_Event:
        return "RogueBattleRandomEventView";
      case Protocol_1.Aki.Protocol.hIc.Proto_TokenShop:
        return "RogueBattleShopView";
      case Protocol_1.Aki.Protocol.hIc.hxs:
        return "RogueBattlePhantomSelectView"
    }
    Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "当前增益类型没有对应的界面数据", ["type", Protocol_1.Aki.Protocol.hIc[e]])
  }
}
exports.RogueBattleController = RogueBattleController, (_a = RogueBattleController).OnLeaveInstanceDungeon = () => {
  ModelManager_1.ModelManager.RogueBattleModel.ClearData()
}, RogueBattleController.OnRogueResRoleBondUpdateNotify = e => {
  ModelManager_1.ModelManager.RogueBattleModel.UpdateFetterData(e)
}, RogueBattleController.OnRogueResElementUpdateNotify = e => {
  ModelManager_1.ModelManager.RogueBattleModel.UpdateElementData(e)
}, RogueBattleController.OnRogueResGainDataUpdateNotify = e => {
  ModelManager_1.ModelManager.RogueBattleModel.UpdateGainData(e)
}, RogueBattleController.OnRogueSubLevelNotify = l => {
  var e = new AsyncTask_1.AsyncTask("RogueBattleSubLevelNotify", async () => {
    ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = 1;
    const [o, t] = _a.UWa(l);
    if (0 === o.length && 0 === t.length) await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
    else {
      var e = Vector_1.Vector.Create(l.iPs, l.rPs, l.gqs),
        r = new UE.Rotator(0, l.fqs, 0);
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(15, 3);
      const a = new CustomPromise_1.CustomPromise;
      ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(o, t, 0, e, r, e => {
        e ? a.SetResult(!0) : Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "周常肉鸽子关卡加载失败", ["unloads", o], ["newLoads", t])
      }), await a.Promise
    }
    return await _a.GotoNextRoomRequest(), await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(15, 1), !0
  });
  TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run()
}, RogueBattleController.OnRogueRoomInfoNotify = e => {
  var o = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRoomPoolConfig(e.CL_),
    t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueRoomType(e.vqs);
  ModelManager_1.ModelManager.RogueBattleModel.CurrentRoomTypeId = t.RoomType, ModelManager_1.ModelManager.RogueBattleModel.CurrentRoomId = e.CL_, StringUtils_1.StringUtils.IsEmpty(o?.RoomsMusicState) ? ModelManager_1.ModelManager.RogueBattleModel.CurrentRoomMusicState = t.RoomsMusicState : ModelManager_1.ModelManager.RogueBattleModel.CurrentRoomMusicState = o.RoomsMusicState, 0 !== e.pqs ? WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(e.pqs, 0) : WeatherController_1.WeatherController.StopWeather()
}, RogueBattleController.OnRogueResInstOptionsUpdateNotify = e => {
  ModelManager_1.ModelManager.RogueBattleModel.UpdateOptionData(e)
}, RogueBattleController.OnRogueResFormationUpdateNotify = o => {
  for (let e = 0; e < o.Wr1.length; e++) ModelManager_1.ModelManager.RogueBattleModel.UpdateFormationData(e, o.Wr1[e])
};
//# sourceMappingURL=RogueBattleController.js.map