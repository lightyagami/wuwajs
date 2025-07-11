"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VersionPreheatActivityContext = undefined;
const ActivityData_1 = require("../../../ActivityData");
const Log_1 = require("../../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class VersionPreheatActivityContext extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.y_l = new Map();
    this.E_l = new Map();
  }
  PhraseEx(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VersionPreheat", 64, "解析活动数据", ["ActivityData", t]);
    }
    t = t.$S_;
    if (t !== undefined) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("VersionPreheat", 64, "解析活动数据:[具体]", ["ActivityInfo", t]);
      }
      this.E_l.clear();
      for (const i of t.bM_) {
        var e = {
          Meta: i,
          Id: i.M_l,
          UnlockTimestamp: MathUtils_1.MathUtils.LongToNumber(i.yzs),
          Rewarded: i.mLs
        };
        this.E_l.set(i.M_l, e);
      }
    }
  }
  GetExDataRedPointShowState() {
    return ModelManager_1.ModelManager.VersionPreheatModel.HasNewQuest;
  }
  Dispose() {}
  SyncPreheatSignSurveyInfo(t, e) {
    this.y_l.set(t, e);
  }
  SyncPreheatRewardedState(t) {
    t = this.E_l.get(t);
    if (t !== undefined) {
      t.Rewarded = true;
    }
  }
  GetVoteLeftCountById(t) {
    t = this.y_l.get(t);
    if (t === undefined) {
      return 0;
    } else {
      return MathUtils_1.MathUtils.LongToNumber(t.PM_);
    }
  }
  GetVoteRightCountById(t) {
    t = this.y_l.get(t);
    if (t === undefined) {
      return 0;
    } else {
      return MathUtils_1.MathUtils.LongToNumber(t.xM_);
    }
  }
  IsRewardedById(t) {
    t = this.E_l.get(t);
    return t !== undefined && t.Rewarded;
  }
  IsLeftChosen(t) {
    t = this.y_l.get(t);
    if (t !== undefined) {
      return t.S_l;
    }
  }
  get QuestCache() {
    return this.E_l;
  }
}
exports.VersionPreheatActivityContext = VersionPreheatActivityContext;
//# sourceMappingURL=VersionPreheatActivityContext.js.map