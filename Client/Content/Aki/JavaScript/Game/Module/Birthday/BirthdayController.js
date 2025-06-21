"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BirthdayController = void 0;
const BirthDayByItemId_1 = require("../../../Core/Define/ConfigQuery/BirthDayByItemId"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  SplashScreenController_1 = require("../SplashScreen/SplashScreenController"),
  SplashScreenTask_1 = require("../SplashScreen/SplashScreenTask"),
  BirthdayDefine_1 = require("./BirthdayDefine");
class BirthdayController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.OnWorldDone), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDayZone, this.OnCrossDayZone)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.OnWorldDone), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDayZone, this.OnCrossDayZone)
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29264, e => {
      ModelManager_1.ModelManager.BirthdayModel.UpdateBirthdayInfo(e)
    })
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29264)
  }
  static TrySelectBirthDayCardRoleRequest(r, t) {
    var e;
    ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(t) || ((e = Protocol_1.Aki.Protocol.fS1.create()).mjn = r, e.yS1 = t, Net_1.Net.Call(29656, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24231) : ModelManager_1.ModelManager.BirthdayModel.SetSelectedRole(r, t))
    }))
  }
  static TryBirthDayRewardRequest(e) {
    var r;
    return void 0 === ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(e) && ((r = Protocol_1.Aki.Protocol.CS1.create()).yS1 = e, Net_1.Net.Call(24223, r, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17849) : ModelManager_1.ModelManager.BirthdayModel.SetIsReceiveBirthdayReward(!0))
    }), !0)
  }
  static TryOpenBirthdayView() {
    var e;
    ModelManager_1.ModelManager.BirthdayModel.GetBirthdayIsReset() && ModelManager_1.ModelManager.FunctionModel.IsOpen(10084) && (e = new SplashScreenTask_1.SplashScreenTask(2, 0, () => {
      var e = ModelManager_1.ModelManager.BirthdayModel.ThisBirthdayYear;
      UiManager_1.UiManager.OpenView("BirthdayRoleSelectView", new BirthdayDefine_1.BirthdayInfo(0, e))
    }), SplashScreenController_1.SplashScreenController.PushSplashScreenTask(e))
  }
  static UseBirthdayItem(e) {
    var r, t = BirthDayByItemId_1.configBirthDayByItemId.GetConfig(e).LimitYear,
      a = ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(t);
    a ? ((r = new LogReportDefine_1.BirthdayRepeatEnterEvent).i_item_id = e, r.i_trigger_type = 1, ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r), UiManager_1.UiManager.OpenView("BirthdayLetterView", new BirthdayDefine_1.BirthdayInfo(1, t, a))) : UiManager_1.UiManager.OpenView("BirthdayRoleSelectView", new BirthdayDefine_1.BirthdayInfo(1, t))
  }
}
exports.BirthdayController = BirthdayController, (_a = BirthdayController).OnWorldDone = () => {
  var e = ModelManager_1.ModelManager.BirthdayModel.IsDuringBirthday();
  !ModelManager_1.ModelManager.BirthdayModel.IsReceiveBirthdayReward && e && _a.TryOpenBirthdayView()
}, BirthdayController.OnCrossDayZone = () => {
  var e = ModelManager_1.ModelManager.BirthdayModel.IsDuringBirthday();
  !ModelManager_1.ModelManager.BirthdayModel.IsReceiveBirthdayReward && e && _a.TryOpenBirthdayView()
};
//# sourceMappingURL=BirthdayController.js.map