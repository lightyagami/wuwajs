"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RunEndData = exports.ActivityRunModel = undefined;
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiViewData_1 = require("../../../../Ui/Define/UiViewData");
const ActivityRunData_1 = require("./ActivityRunData");
class ActivityRunModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentSelectChallengeId = 0;
    this.a3e = 0;
    this.h3e = new Map();
  }
  OnReceiveMessageData(e) {
    if (e.mps) {
      e.mps.forEach(e => {
        this.GetActivityRunData(e.e8n).Phrase(e);
      });
    }
    if (e.oBs) {
      e.oBs.forEach(e => {
        this.GetActivityRunData(e).SetIsOpen(true);
      });
    }
  }
  OnReceiveChallengeOpenNotify(e) {
    var t = this.GetActivityRunData(e.e8n);
    t.SetIsOpen(e.Sps);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.GetActivityId());
  }
  OnGetChallengeReward(e, t) {
    e = this.GetActivityRunData(e);
    e.OnGetScoreReward(t);
    e = e.GetScoreIndexScore(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetRunActivityReward, e);
  }
  GetOpenChallengeIds() {
    const i = new Array();
    this.h3e.forEach((e, t) => {
      if (e.GetIsShow()) {
        i.push(t);
      }
    });
    return i;
  }
  GetChallengeIds() {
    const i = new Array();
    this.h3e.forEach((e, t) => {
      i.push(t);
    });
    return i;
  }
  GetActivityRunData(e) {
    e = this.h3e.get(e);
    if (e) {
      return e;
    }
  }
  CreateActivityRunData(e, t) {
    let i = this.h3e.get(t);
    if (!i) {
      i = new ActivityRunData_1.ActivityRunData(e);
      this.h3e.set(t, i);
    }
    return i;
  }
  GetDefaultOpenUiChallengeIndex(e) {
    var t;
    if (e instanceof ActivityRunData_1.ActivityRun) {
      t = e.GetChallengeDataArray();
      if (e.IfAllFinish()) {
        this.a3e = t.length - 1;
        return t.length - 1;
      } else {
        return e.GetActivityContentIndex();
      }
    } else {
      return 0;
    }
  }
  SetStartViewSelectIndex(e) {
    this.a3e = e;
  }
  GetStartViewSelectIndex() {
    return this.a3e;
  }
  GetChallengeDataByMarkId(i) {
    var n = this.GetChallengeIds();
    var s = n.length;
    if (s !== 0) {
      let t = -1;
      for (let e = 0; e < s; e++) {
        if (this.GetActivityRunData(n[e])?.GetMarkId() === i) {
          t = e;
        }
      }
      if (t === -1) {
        t = 0;
      }
      return this.GetActivityRunData(n[t]);
    }
  }
}
exports.ActivityRunModel = ActivityRunModel;
class RunEndData extends UiViewData_1.UiViewData {
  constructor() {
    super(...arguments);
    this.CurrentChallengeId = 0;
    this.CurrentScore = 0;
    this.CurrentTime = -0;
    this.IfNewRecord = false;
  }
  Phrase(e) {
    this.CurrentChallengeId = e.e8n;
    this.CurrentScore = e.SMs;
    this.CurrentTime = e.n5n;
  }
  SetIfNewRecord(e) {
    this.IfNewRecord = e;
  }
}
exports.RunEndData = RunEndData;
//# sourceMappingURL=ActivityRunModel.js.map