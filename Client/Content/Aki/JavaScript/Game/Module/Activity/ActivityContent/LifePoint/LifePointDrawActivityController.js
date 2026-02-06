"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawActivityController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const LifePointDrawActivityData_1 = require("./LifePointDrawActivityData");
const LifePointSubView_1 = require("./LifePointSubView");
class LifePointDrawActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.RPu = e => {
      const i = new Array();
      const n = new Array();
      e.mps.forEach(e => {
        var t = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointChallengeById(e.e8n);
        var r = this.wPu(t.ActivityId);
        if (r) {
          r.OnLifePointChallengeDataUpdate(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshLifePointDrawChallengeRedDot, e.e8n);
        }
        if (!n.includes(t.GroupId)) {
          n.push(t.GroupId);
        }
        if (!i.includes(t.ActivityId)) {
          i.push(t.ActivityId);
        }
      });
      i.forEach(e => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
      });
      n.forEach(e => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshLifePointDrawGroupRedDot, e);
      });
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityColorfulMain";
  }
  OnCreateSubPageComponent(e) {
    return new LifePointSubView_1.LifePointSubView();
  }
  OnCreateActivityData(e) {
    return new LifePointDrawActivityData_1.LifePointDrawActivityData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(19909, this.RPu);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19909);
  }
  wPu(e) {
    if (ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) {
      return ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    }
  }
  RequestStartChallenge(e, t) {
    var r = new Protocol_1.Aki.Protocol.eAu();
    r.s5n = t;
    ModelManager_1.ModelManager.LifePointDrawModel.CurrentChallengeFinishState = ModelManager_1.ModelManager.LifePointDrawModel.GetChallengeFinishState(e, t);
    Net_1.Net.Call(27062, r, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15303);
      }
    });
  }
  async OpenLifePointDrawActivityView() {
    let e = undefined;
    for (const r of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
      if (r.Type === Protocol_1.Aki.Protocol.uks.iAu) {
        var t = r;
        e = t;
        break;
      }
    }
    return !!e && !!(await UiManager_1.UiManager.OpenViewAsync("LifePointDrawEntranceView", e));
  }
}
exports.LifePointDrawActivityController = LifePointDrawActivityController;
//# sourceMappingURL=LifePointDrawActivityController.js.map