"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonSignInController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const MoonSignInData_1 = require("./MoonSignInData");
const MoonSignInSubView_1 = require("./MoonSignInSubView");
class MoonSignInController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.JCi = e => {
      var n = MoonSignInController.GetData();
      if (n) {
        for (const t of e) {
          if (t.s5n === n.UseItemId) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, n.Id);
          }
        }
      }
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMoonPhase";
  }
  OnCreateSubPageComponent(e) {
    return new MoonSignInSubView_1.MoonSignInSubView();
  }
  OnCreateActivityData(e) {
    MoonSignInController.LOe = e.s5n;
    return new MoonSignInData_1.MoonSignInData();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemNotify, this.JCi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemNotify, this.JCi);
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static GetData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(MoonSignInController.LOe);
  }
  static MoonPhaseRandomRequest(t) {
    var e = Protocol_1.Aki.Protocol.eid.create();
    Net_1.Net.Call(21356, e, e => {
      var n;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15854);
        } else {
          n = this.GetData();
          if (e.j7n && n) {
            n.HaveSelectMoonPhaseSelectList.push(e.j7n);
            n.SelectMoonPhaseList.push(e.j7n.nid);
            n.CurrentMoonId = e.j7n.nid;
          }
          n = {
            MoonId: e.j7n.nid,
            Wishing: true
          };
          UiManager_1.UiManager.OpenView("MoonSignInDetailView", n);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
        }
      }
    });
  }
  static MoonPhaseRewardRequest(n) {
    var e = Protocol_1.Aki.Protocol.iid.create();
    Net_1.Net.Call(29908, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21587);
        }
        if (e = MoonSignInController.GetData()) {
          e.MoonGrandReward = true;
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoonSignRewardRefresh);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, n);
      }
    });
  }
}
(exports.MoonSignInController = MoonSignInController).LOe = 0;
//# sourceMappingURL=MoonSignInController.js.map