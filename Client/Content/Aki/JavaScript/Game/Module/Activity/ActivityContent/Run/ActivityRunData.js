"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRunData = exports.ActivityRun = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ACTIVITYSELECTCACHEKEY = -256;
class ActivityRun extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.OFe = new Map();
    this.kFe = new Array();
  }
  PhraseEx(i) {
    this.kFe = new Array();
    i.Gps.mps.forEach(t => {
      var e = ModelManager_1.ModelManager.ActivityRunModel.CreateActivityRunData(i.s5n, t.e8n);
      e.Phrase(t);
      this.kFe.push(e);
      this.OFe.set(t.e8n, i.s5n);
    });
  }
  GetChallengeActivityId(t) {
    return this.OFe.get(t);
  }
  GetChallengeDataArray() {
    return this.kFe;
  }
  SetActivityContentIndex(t) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, ACTIVITYSELECTCACHEKEY, this.Id, 0, t);
  }
  GetActivityContentIndex() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, ACTIVITYSELECTCACHEKEY, this.Id, 0);
  }
  GetExDataRedPointShowState() {
    var e = this.kFe.length;
    for (let t = 0; t < e; t++) {
      if (this.kFe[t].GetRedPoint()) {
        return true;
      }
    }
    return false;
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  IfAllFinish() {
    var e = this.kFe.length;
    for (let t = 0; t < e; t++) {
      if (!this.kFe[t].GetIfRewardAllFinished()) {
        return false;
      }
    }
    return true;
  }
}
exports.ActivityRun = ActivityRun;
class ActivityRunData extends ActivityData_1.ActivityExData {
  constructor() {
    super(...arguments);
    this.FFe = 0;
    this.VFe = new Array();
    this.xte = 0;
    this.pne = 0;
    this.HFe = 0;
    this.Cce = -0;
    this.jFe = false;
    this.WFe = -0;
    this.KFe = -0;
    this.QFe = undefined;
  }
  get Id() {
    return this.FFe;
  }
  GetMaxScore() {
    return this.xte;
  }
  GetMiniTime() {
    return this.pne;
  }
  GetRedPoint() {
    return !!this.GetIsShow() && (!!this.GetChallengeNewLocalRedPoint() || !!this.XFe());
  }
  GetScoreArray() {
    const e = new Array();
    this.QFe.forEach(t => {
      e.push(t[0]);
    });
    return e;
  }
  GetScoreIndexScore(t) {
    t = this.QFe.get(t);
    if (t) {
      return t[0];
    } else {
      return 0;
    }
  }
  GetScoreIndexPreviewItem(e) {
    var i = Array.from(this.QFe.keys());
    var r = i.length;
    let n = 0;
    for (let t = 0; t < r; t++) {
      if (i[t] === e) {
        var s = this.QFe.get(i[t]);
        n = s[1];
        break;
      }
    }
    var t;
    var h;
    var a = [];
    if (n > 0) {
      for ([t, h] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(n).DropPreview) {
        var o = [{
          IncId: 0,
          ItemId: t
        }, h];
        a.push(o);
      }
    }
    return a;
  }
  GetScoreIndex(e) {
    var i = Array.from(this.QFe.keys()).length;
    for (let t = 0; t < i; t++) {
      if (e === this.QFe.get(t)?.[0]) {
        return t;
      }
    }
    return 0;
  }
  GetScoreIndexCannotGetReward(t) {
    var e;
    var i = Array.from(this.QFe.keys());
    let r = 0;
    if (this.QFe.get(t)) {
      e = this.QFe.get(t);
      r = e[0];
    }
    if (this.xte >= r) {
      if (this.VFe.includes(i[t])) {
        return 2;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
  XFe() {
    var e = Array.from(this.QFe.keys()).length;
    for (let t = 0; t < e; t++) {
      if (this.GetScoreIndexCannotGetReward(t) === 1) {
        return true;
      }
    }
    return false;
  }
  GetIfRewardAllFinished() {
    var e = Array.from(this.QFe.keys()).length;
    for (let t = 0; t < e; t++) {
      if (this.GetScoreIndexCannotGetReward(t) !== 2) {
        return false;
      }
    }
    return true;
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunTitle(this.FFe);
  }
  GetMarkId() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunMarkId(this.FFe);
  }
  GetBackgroundTexturePath() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunTexture(this.FFe);
  }
  SetChallengeLocalRedPointState(t) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.ActivityId, this.FFe, 0, 0, t ? 1 : 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRunActivityRedDot, this.FFe);
    this.RefreshActivityRedPoint();
  }
  GetChallengeNewLocalRedPoint() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.ActivityId, 1, this.FFe, 0, 0) === 1;
  }
  GetIsShow() {
    return !!this.jFe && !!this.CheckIfInShowTime();
  }
  SetIsOpen(t) {
    this.jFe = t;
  }
  get BeginOpenTime() {
    return this.WFe;
  }
  get EndOpenTime() {
    return this.KFe;
  }
  OnGetScoreReward(t) {
    if (!this.VFe.includes(t)) {
      this.VFe.push(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRunActivityRedDot, this.FFe);
      this.RefreshActivityRedPoint();
    }
  }
  CheckIfInShowTime() {
    var t;
    return this.BeginOpenTime === 0 && this.EndOpenTime === 0 || (t = TimeUtil_1.TimeUtil.GetServerTime()) >= this.BeginOpenTime && t <= this.EndOpenTime;
  }
  OnChallengeEnd(t) {
    this.HFe = t.SMs;
    this.Cce = t.n5n;
    if (this.HFe > this.xte) {
      this.xte = this.HFe;
    }
    if (this.Cce < this.pne || this.pne === 0) {
      this.pne = this.Cce;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRunActivityRedDot, this.FFe);
    this.RefreshActivityRedPoint();
  }
  Phrase(t) {
    if (t instanceof Protocol_1.Aki.Protocol.$5s) {
      this.FFe = t.e8n;
      this.VFe = [];
      t.rBs.forEach(t => {
        this.VFe.push(t);
      });
      this.xte = t.tBs;
      this.pne = t.iBs;
    } else if (t instanceof Protocol_1.Aki.Protocol.cks) {
      this.FFe = t.e8n;
      this.WFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.cps));
      this.KFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.dps));
    }
    this.QFe ||= ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunScoreMap(this.FFe);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRunActivityRedDot, this.FFe);
    this.RefreshActivityRedPoint();
  }
}
exports.ActivityRunData = ActivityRunData;
//# sourceMappingURL=ActivityRunData.js.map