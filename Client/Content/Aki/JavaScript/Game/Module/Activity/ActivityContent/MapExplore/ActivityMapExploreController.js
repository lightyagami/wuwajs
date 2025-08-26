"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMapExploreController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityMapExploreData_1 = require("./ActivityMapExploreData");
const ActivitySubViewMapExplore_1 = require("./ActivitySubViewMapExplore");
class ActivityMapExploreController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_MapExplorationMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMapExplore_1.ActivitySubViewMapExplore();
  }
  OnCreateActivityData(e) {
    this.Data = new ActivityMapExploreData_1.ActivityMapExploreData();
    return this.Data;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21438, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 69, "stc", ["", e]);
      }
      this.Data.UpdateTaskState(e.E$s);
      this.rqc();
    });
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21438);
  }
  async RequestGetReward(e) {
    var t = new Protocol_1.Aki.Protocol.atc();
    t.gps = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "atc", ["", t]);
    }
    var e = await Net_1.Net.CallAsync(25047, t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "htc", ["", e]);
    }
    if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25047);
    }
  }
  rqc() {
    if (this.Data?.Id) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Data.Id);
    }
  }
}
exports.ActivityMapExploreController = ActivityMapExploreController;
//# sourceMappingURL=ActivityMapExploreController.js.map