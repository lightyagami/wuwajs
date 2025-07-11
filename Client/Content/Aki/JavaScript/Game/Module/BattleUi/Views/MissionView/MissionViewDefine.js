"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestUpdateTipsShowData = exports.LackResourceQuestViewShowData = exports.FishingEntrustViewShowData = exports.BehaviorTreeViewShowData = exports.LackResourceQuestTextInfo = exports.FishingEntrustStepTextInfo = exports.BehaviorTreeStepTextInfo = undefined;
class MissionViewStepTextInfoBase {
  constructor(t, s, e) {
    this.InnerTidTitle = t;
    this.ShowConditions = s;
    this.ConditionText = e;
    this.CurConditionTextIndex = undefined;
  }
}
class BehaviorTreeStepTextInfo extends MissionViewStepTextInfoBase {
  constructor(t, s, e, i, h, r) {
    super(t, e, i);
    this.ShowSource = 0;
    this.Wfc = undefined;
    this.ProgressBar = undefined;
    this.BlankTitleStillShow = undefined;
    this.UsePreStateText = false;
    this.Wfc = s;
    this.ProgressBar = h;
    this.BlankTitleStillShow = r;
  }
  get TidTitle() {
    if (this.CurConditionTextIndex === undefined) {
      return this.InnerTidTitle;
    } else {
      return this.ConditionText[this.CurConditionTextIndex].TidTitle;
    }
  }
  get QuestScheduleType() {
    if (this.CurConditionTextIndex !== undefined && this.ConditionText) {
      return this.ConditionText[this.CurConditionTextIndex].QuestScheduleType;
    } else {
      return this.Wfc;
    }
  }
}
exports.BehaviorTreeStepTextInfo = BehaviorTreeStepTextInfo;
class FishingEntrustStepTextInfo extends MissionViewStepTextInfoBase {
  constructor(t, s) {
    super(t, undefined, undefined);
    this.ProgressTargetId = s;
    this.ShowSource = 1;
  }
  get TidTitle() {
    return this.InnerTidTitle;
  }
  get QuestScheduleType() {
    return "FishingEntrust";
  }
}
exports.FishingEntrustStepTextInfo = FishingEntrustStepTextInfo;
class LackResourceQuestTextInfo extends MissionViewStepTextInfoBase {
  constructor(t) {
    super(t, undefined, undefined);
    this.ShowSource = 2;
  }
  get TidTitle() {
    return this.InnerTidTitle;
  }
  get QuestScheduleType() {
    return "FishingEntrust";
  }
}
exports.LackResourceQuestTextInfo = LackResourceQuestTextInfo;
class BehaviorTreeViewShowData {
  constructor(t, s, e, i, h, r, o, a, n) {
    this.BtType = t;
    this.Id = s;
    this.TreeConfigId = e;
    this.IsInChallenge = i;
    this.TrackIconConfigId = h;
    this.ShowPriority = r;
    this.TitleTextKey = o;
    this.MainStepInfo = a;
    this.SubStepInfos = n;
    this.DataSource = 0;
  }
  static Create(t, s, e, i, h, r, o, a, n) {
    return new BehaviorTreeViewShowData(t, s, e, i, h, r, o, a, n);
  }
}
exports.BehaviorTreeViewShowData = BehaviorTreeViewShowData;
class FishingEntrustViewShowData {
  constructor(t, s, e, i, h) {
    this.Id = t;
    this.TrackIconConfigId = s;
    this.TitleTextKey = e;
    this.MainStepInfo = i;
    this.SubStepInfos = h;
    this.DataSource = 1;
    this.ShowPriority = 0;
    this.ShowPriority = t;
  }
  static Create(t, s, e, i, h) {
    return new FishingEntrustViewShowData(t, s, e, i, h);
  }
}
exports.FishingEntrustViewShowData = FishingEntrustViewShowData;
class LackResourceQuestViewShowData {
  constructor(t, s, e, i, h) {
    this.Id = t;
    this.TrackIconConfigId = s;
    this.TitleTextKey = e;
    this.MainStepInfo = i;
    this.SubStepInfos = h;
    this.DataSource = 2;
    this.ShowPriority = 0;
    this.ShowPriority = t;
  }
  static Create(t, s, e, i, h) {
    return new LackResourceQuestViewShowData(t, s, e, i, h);
  }
}
exports.LackResourceQuestViewShowData = LackResourceQuestViewShowData;
class QuestUpdateTipsShowData {
  constructor(t, s, e, i) {
    this.MissionViewShowData = t;
    this.IsSkipAnim = s;
    this.IsNewQuest = e;
    this.NodeId = i;
  }
  get QuestId() {
    let t = 0;
    switch (this.MissionViewShowData.DataSource) {
      case 0:
        t = this.MissionViewShowData.TreeConfigId;
        break;
      case 2:
        t = this.MissionViewShowData.Id;
    }
    return t;
  }
}
exports.QuestUpdateTipsShowData = QuestUpdateTipsShowData;
//# sourceMappingURL=MissionViewDefine.js.map