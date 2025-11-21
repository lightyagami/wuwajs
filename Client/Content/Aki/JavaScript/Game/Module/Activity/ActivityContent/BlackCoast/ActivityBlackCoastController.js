"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityBlackCoastController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityBlackCoastData_1 = require("./ActivityBlackCoastData");
const ActivitySubViewBlackCoast_1 = require("./ActivitySubViewBlackCoast");
class ActivityBlackCoastController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Pja = t => {
      for (const e of ActivityBlackCoastController.wja()) {
        e.StageUpdate(t.gMs);
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(18477, this.Pja);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18477);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityBlackCoastController.qdi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityBlackCoastController.qdi);
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const t of ["BlackCoastActivityMainView", "BlackCoastActivityTaskView"]) {
      if (UiManager_1.UiManager.IsViewOpen(t)) {
        return true;
      }
    }
    return false;
  }
  OnOpenView(t) {}
  OnGetActivityResource(t) {
    return "UiItem_ActivityBlackCoast";
  }
  OnCreateSubPageComponent(t) {
    return new ActivitySubViewBlackCoast_1.ActivitySubViewBlackCoast();
  }
  OnCreateActivityData(t) {
    return new ActivityBlackCoastData_1.ActivityBlackCoastData();
  }
  OnShowActivityFirstUnlockView(t) {
    UiManager_1.UiManager.OpenView("ActivityUnlockTipBlackCoastView");
  }
  static wja() {
    return ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_BlackCoastTheme);
  }
  static RequestDataProgressReward(t, e) {
    var o = new Protocol_1.Aki.Protocol.hf_();
    o.w6n = t;
    o.Bja = e;
    Net_1.Net.Call(27320, o, t => {
      if (t) {
        if (t.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.fMs, 28726);
        } else {
          for (const e of this.wja()) {
            e.SetProgressRewardDataGot(t.rM_);
          }
        }
      }
    });
  }
  static RequestTaskReward(o, r) {
    var t = new Protocol_1.Aki.Protocol.sf_();
    t.gps = r;
    Net_1.Net.Call(22209, t, t => {
      if (t) {
        if (t.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.fMs, 20255);
        } else {
          for (const e of this.wja()) {
            e.SetTaskRewardGot(o, r);
          }
        }
      }
    });
  }
}
exports.ActivityBlackCoastController = ActivityBlackCoastController;
(_a = ActivityBlackCoastController).qdi = (t, e) => {
  var o = _a.wja();
  if (o.length !== 0) {
    for (const r of o) {
      if (r.GetProgressItemId === t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, r.Id);
      }
    }
  }
}; //# sourceMappingURL=ActivityBlackCoastController.js.map