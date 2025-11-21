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
    this.msd = new Map();
    this.fsd = [];
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
          this.msd.set(e.e8n, r);
          this.fsd.push(r);
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
  Csd() {
    var e = Array.from(this.fsd);
    e.sort((e, t) => {
      var r = e.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayCanReward);
      var a = t.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayCanReward);
      if (r !== a) {
        if (r) {
          return -1;
        } else {
          return 1;
        }
      } else if (r && a) {
        r = e.Index;
        return t.Index - r;
      } else if ((a = e.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayRewarded)) !== t.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayRewarded)) {
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
    return this.fsd;
  }
  GetChallengeData(e) {
    return this.msd.get(e);
  }
  SetCurrentChallengeData(e) {
    this.bFe = this.GetChallengeData(e);
  }
  GetCurrentChallengeData() {
    return this.bFe;
  }
  GetDefaultSelectIndex() {
    var e = this.Csd();
    if (e.length > 0) {
      return e[0].Index;
    } else {
      return 0;
    }
  }
  GetHasInternalRedDot() {
    for (const e of this.msd.values()) {
      if (e.GetRedPoint()) {
        return true;
      }
    }
    return false;
  }
  IsAllRewardClaimed() {
    if (this.fsd.length === 0) {
      return false;
    }
    for (const e of this.fsd) {
      if (!e.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayRewarded)) {
        return false;
      }
    }
    return true;
  }
  OnClear() {
    this.msd.clear();
    return !(this.fsd.length = 0);
  }
}
exports.ActivityFunPlayModel = ActivityFunPlayModel;
//# sourceMappingURL=ActivityFunPlayModel.js.map