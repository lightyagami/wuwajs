"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const ActivityFunPlayChallengeData_1 = require("./ActivityFunPlayChallengeData");
class ActivityFunPlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.bFe = undefined;
    this.Ird = new Map();
    this.Trd = [];
  }
  CreateChallengeData(e, a) {
    if (e) {
      e.forEach((e, t) => {
        let r = this.GetChallengeData(e.e8n);
        if (r) {
          r.Phrase(e);
        } else {
          (r = new ActivityFunPlayChallengeData_1.ActivityFunPlayChallengeData(a)).Phrase(e);
          r.SetIndex(t);
          this.Ird.set(e.e8n, r);
          this.Trd.push(r);
        }
      });
    }
  }
  UpdateChallengeData(e) {
    if (e) {
      var t = this.GetChallengeData(e.e8n);
      if (t) {
        t.Phrase(e);
        return t;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityFunPlay", 87, "服务器下发的更新关卡信息的id不存在", ["ChallengeId", e.e8n]);
      }
    }
  }
  Rrd() {
    var e = Array.from(this.Trd);
    e.sort((e, t) => {
      var r = e.CheckRewardStatus(Protocol_1.Aki.Protocol.Qju.Proto_FunPlayCanReward);
      var a = t.CheckRewardStatus(Protocol_1.Aki.Protocol.Qju.Proto_FunPlayCanReward);
      if (r !== a) {
        if (r) {
          return -1;
        } else {
          return 1;
        }
      } else if (r && a) {
        r = e.Index;
        return t.Index - r;
      } else if ((a = e.CheckRewardStatus(Protocol_1.Aki.Protocol.Qju.Proto_FunPlayRewarded)) !== t.CheckRewardStatus(Protocol_1.Aki.Protocol.Qju.Proto_FunPlayRewarded)) {
        if (a) {
          return 1;
        } else {
          return -1;
        }
      } else if ((r = e.GetIsUnlock()) !== t.GetIsUnlock()) {
        if (r) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return e.GetChallengeId() - t.GetChallengeId();
      }
    });
    return e;
  }
  GetAllChallengeData() {
    return this.Trd;
  }
  GetChallengeData(e) {
    return this.Ird.get(e);
  }
  SetCurrentChallengeData(e) {
    this.bFe = this.GetChallengeData(e);
  }
  GetCurrentChallengeData() {
    return this.bFe;
  }
  GetDefaultSelectIndex() {
    var e = this.Rrd();
    if (e.length > 0) {
      return e[0].Index;
    } else {
      return 0;
    }
  }
  GetHasInternalRedDot() {
    for (const e of this.Ird.values()) {
      if (e.GetRedPoint()) {
        return true;
      }
    }
    return false;
  }
  OnClear() {
    this.Ird.clear();
    return !(this.Trd.length = 0);
  }
}
exports.ActivityFunPlayModel = ActivityFunPlayModel;
//# sourceMappingURL=ActivityFunPlayModel.js.map