"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdayController = undefined;
const BirthDayByItemId_1 = require("../../../Core/Define/ConfigQuery/BirthDayByItemId");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const SplashScreenController_1 = require("../SplashScreen/SplashScreenController");
const SplashScreenTask_1 = require("../SplashScreen/SplashScreenTask");
const BirthdayDefine_1 = require("./BirthdayDefine");
class BirthdayController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.OnWorldDone);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDayZone, this.OnCrossDayZone);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.OnWorldDone);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDayZone, this.OnCrossDayZone);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17274, e => {
      ModelManager_1.ModelManager.BirthdayModel.UpdateBirthdayInfo(e);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17274);
  }
  static TrySelectBirthDayCardRoleRequest(r, t) {
    var e;
    if (!ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(t)) {
      (e = Protocol_1.Aki.Protocol.GS1.create()).mjn = r;
      e.HS1 = t;
      Net_1.Net.Call(23177, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26623);
          } else {
            ModelManager_1.ModelManager.BirthdayModel.SetSelectedRole(r, t);
          }
        }
      });
    }
  }
  static TryBirthDayRewardRequest(e) {
    var r;
    return ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(e) === undefined && ((r = Protocol_1.Aki.Protocol.NS1.create()).HS1 = e, Net_1.Net.Call(21051, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27673);
        } else {
          ModelManager_1.ModelManager.BirthdayModel.SetIsReceiveBirthdayReward(true);
        }
      }
    }), true);
  }
  static TryOpenBirthdayView() {
    var e;
    if (ModelManager_1.ModelManager.BirthdayModel.GetBirthdayIsReset() && ModelManager_1.ModelManager.FunctionModel.IsOpen(10084)) {
      e = new SplashScreenTask_1.SplashScreenTask(2, 0, () => {
        var e = ModelManager_1.ModelManager.BirthdayModel.ThisBirthdayYear;
        UiManager_1.UiManager.OpenView("BirthdayRoleSelectView", new BirthdayDefine_1.BirthdayInfo(0, e));
      });
      SplashScreenController_1.SplashScreenController.PushSplashScreenTask(e);
    }
  }
  static UseBirthdayItem(e) {
    var r;
    var t = BirthDayByItemId_1.configBirthDayByItemId.GetConfig(e);
    var a = t.LimitYear;
    var n = ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(a);
    if (n) {
      (r = new LogReportDefine_1.BirthdayRepeatEnterEvent()).i_item_id = e;
      r.i_trigger_type = 1;
      r.bird_round_id = t.Id;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r);
      UiManager_1.UiManager.OpenView("BirthdayLetterView", new BirthdayDefine_1.BirthdayInfo(1, a, n));
    } else {
      UiManager_1.UiManager.OpenView("BirthdayRoleSelectView", new BirthdayDefine_1.BirthdayInfo(1, a));
    }
  }
}
exports.BirthdayController = BirthdayController;
(_a = BirthdayController).OnWorldDone = () => {
  var e = ModelManager_1.ModelManager.BirthdayModel.IsDuringBirthday();
  if (!ModelManager_1.ModelManager.BirthdayModel.IsReceiveBirthdayReward && e) {
    _a.TryOpenBirthdayView();
  }
};
BirthdayController.OnCrossDayZone = () => {
  var e = ModelManager_1.ModelManager.BirthdayModel.IsDuringBirthday();
  if (!ModelManager_1.ModelManager.BirthdayModel.IsReceiveBirthdayReward && e) {
    _a.TryOpenBirthdayView();
  }
}; //# sourceMappingURL=BirthdayController.js.map