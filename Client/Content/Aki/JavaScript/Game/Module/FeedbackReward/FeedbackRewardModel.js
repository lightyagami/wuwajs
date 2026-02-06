"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackRewardModel = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class FeedbackRewardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.g0g = new Map();
    this.C0g = new Map();
    this.MaxShowScore = 0;
    this.CurrentPointCount = 0;
    this.CurrentLoginDayCount = 0;
  }
  OnInit() {
    for (const e of ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardAll() ?? []) {
      this.g0g.set(e.Id, 0);
    }
    for (const r of ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackTaskAll() ?? []) {
      this.C0g.set(r.TaskId, 0);
    }
    this.MaxShowScore = CommonParamById_1.configCommonParamById.GetIntConfig("FeedbackRewardMaxScore") ?? 0;
    return true;
  }
  GetAllRewardList() {
    return Array.from(this.g0g.keys());
  }
  GetFeedbackRewardState(e) {
    return this.g0g.get(e) ?? 0;
  }
  GetFeedbackTaskCurrentPoint(e) {
    return this.C0g.get(e) ?? 0;
  }
  GetFeedbackTaskList() {
    return Array.from(this.C0g.keys());
  }
  GetFeedbackRewardCanClaim() {
    var e;
    var r;
    var a = [];
    for ([e, r] of this.g0g) {
      if (r === 1) {
        a.push(e);
      }
    }
    return a;
  }
  RefreshFeedBackRewardMapState(e) {
    for (var [r] of this.g0g) {
      if (e.includes(r)) {
        this.g0g.set(r, 2);
      } else if (ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardById(r).Target <= this.CurrentPointCount) {
        this.g0g.set(r, 1);
      }
    }
  }
  RefreshFeedBackTask(e) {
    for (const r of e) {
      this.C0g.set(r.s5n, r.SMs);
    }
  }
  GetCanFinishRewardId() {
    var e;
    var r;
    var a = [];
    for ([e, r] of this.g0g) {
      if (r === 1) {
        a.push(e);
      }
    }
    return a;
  }
  CheckRedDot() {
    for (var [, e] of this.g0g) {
      if (e === 1) {
        return true;
      }
    }
    return false;
  }
  GetMaxFinishRewardId() {
    let e = 0;
    for (var [r, a] of this.g0g) {
      if (a === 1 && e < r) {
        e = r;
      }
    }
    return e;
  }
  GetCanClaimRewardIds() {
    var e;
    var r;
    var a = [];
    for ([e, r] of this.g0g) {
      if (r === 1) {
        a.push(e);
      }
    }
    return a;
  }
}
exports.FeedbackRewardModel = FeedbackRewardModel;
//# sourceMappingURL=FeedbackRewardModel.js.map