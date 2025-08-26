"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossActivityController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const LineCrossActivityData_1 = require("./LineCrossActivityData");
const LineCrossSubView_1 = require("./LineCrossSubView");
class LineCrossActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.ded = e => {
      const n = new Array();
      const i = new Array();
      e.mps.forEach(e => {
        var r = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossChallengeById(e.e8n);
        var t = this.wPu(r.ActivityId);
        if (t) {
          t.OnChallengeDataUpdate(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshLineCrossChallengeRedDot, e.e8n);
        }
        if (!i.includes(r.GroupId)) {
          i.push(r.GroupId);
        }
        if (!n.includes(r.ActivityId)) {
          n.push(r.ActivityId);
        }
      });
      n.forEach(e => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
      });
      i.forEach(e => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshLineCrossGroupRedDot, e);
      });
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityCrossline";
  }
  OnCreateSubPageComponent(e) {
    return new LineCrossSubView_1.LineCrossSubView();
  }
  OnCreateActivityData(e) {
    return new LineCrossActivityData_1.LineCrossActivityData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(22460, this.ded);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22460);
  }
  wPu(e) {
    if (ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) {
      return ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    }
  }
  RequestStartChallenge(e, r) {
    var t = new Protocol_1.Aki.Protocol.fJc();
    t.s5n = r;
    ModelManager_1.ModelManager.LineCrossModel.CurrentChallengeFinishState = ModelManager_1.ModelManager.LineCrossModel.GetChallengeFinishState(e, r);
    Net_1.Net.Call(23905, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28580);
      }
    });
  }
  async OpenLineCrossActivityView() {
    let e = undefined;
    for (const t of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
      if (t.Type === Protocol_1.Aki.Protocol.uks.Proto_LineCross) {
        var r = t;
        e = r;
        break;
      }
    }
    return !!e && !!(await UiManager_1.UiManager.OpenViewAsync("LineCrossEntranceView", e));
  }
  async OnOpenSubView(e) {
    if (e === "LineCrossEntranceView") {
      await this.OpenLineCrossActivityView();
    }
    return Promise.resolve(false);
  }
}
exports.LineCrossActivityController = LineCrossActivityController;
//# sourceMappingURL=LineCrossActivityController.js.map