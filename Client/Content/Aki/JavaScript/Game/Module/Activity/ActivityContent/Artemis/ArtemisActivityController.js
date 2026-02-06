"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisActivityController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ArtemisActivityData_1 = require("./ArtemisActivityData");
const ArtemisSubView_1 = require("./ArtemisSubView");
class ArtemisActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.tef = e => {
      var t;
      if (e) {
        (t = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(e.w6n))?.SetUnlockIndex(e.TMf);
        t?.SetRewardedIndex(e.bMf);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.w6n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnArtemisStateRefresh);
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29927, this.tef);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29927);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_AimisActivityMain";
  }
  OnCreateSubPageComponent(e) {
    return new ArtemisSubView_1.ArtemisSubView();
  }
  OnCreateActivityData(e) {
    return new ArtemisActivityData_1.ArtemisActivityData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static RequestArtemisStatus(t, r, i) {
    var e = Protocol_1.Aki.Protocol.XEm.create();
    e.w6n = t.GetCacheActivityId;
    e.c5n = r;
    Net_1.Net.Call(19528, e, e => {
      if (i) {
        i(e === undefined || e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs);
      }
      if (e) {
        if (e.fMs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          t?.SetRewardedIndex(r);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.GetCacheActivityId);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnArtemisStateRefresh);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 19661);
        }
      }
    });
  }
}
(exports.ArtemisActivityController = ArtemisActivityController).CurrentDayIndex = 0;
//# sourceMappingURL=ArtemisActivityController.js.map