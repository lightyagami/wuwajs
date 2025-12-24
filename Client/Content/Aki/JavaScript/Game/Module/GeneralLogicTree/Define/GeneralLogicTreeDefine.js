"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportSettlementViewParams = exports.MotorSettlementViewParams = exports.FlySettlementViewParams = exports.ChallengeCountDownViewParams = exports.ModifyTrackAreaConfig = exports.SilentAreaShowInfo = exports.TreeTrackTextExpressionInfo = exports.BtCustomUiConfig = exports.btChildQuestNodeStatusLogString = exports.btNodeStatusLogString = exports.btTypeLogString = exports.NodeInfo = exports.NPCFARAWAY_TIMERTYPE = exports.OUTRANGEFAILED_TIMERTYPE = exports.CHALLENGELEVELPLAY_TRACKICONID = exports.COMMONLEVELPLAY_TRACKICONID = exports.INVALID_INTERACTOPTION_ID = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const MissionViewDefine_1 = require("../../BattleUi/Views/MissionView/MissionViewDefine");
exports.INVALID_INTERACTOPTION_ID = -1;
exports.COMMONLEVELPLAY_TRACKICONID = 8;
exports.CHALLENGELEVELPLAY_TRACKICONID = 9;
exports.OUTRANGEFAILED_TIMERTYPE = "FailedNodeOutRangeTimerType";
exports.NPCFARAWAY_TIMERTYPE = "NpcFarAwayOutRangeTimerType";
class NodeInfo extends Protocol_1.Aki.Protocol.qNs {
  constructor() {
    super(...arguments);
    this.NodeId = 0;
  }
}
exports.NodeInfo = NodeInfo;
exports.btTypeLogString = {
  [Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid]: "无效",
  [Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest]: "任务",
  [Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay]: "玩法",
  [Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst]: "副本"
};
exports.btNodeStatusLogString = {
  [Protocol_1.Aki.Protocol.BNs.Proto_NotActive]: "0-未激活",
  [Protocol_1.Aki.Protocol.BNs._5n]: "1-激活",
  [Protocol_1.Aki.Protocol.BNs.Proto_Completing]: "2-完成中",
  [Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess]: "3-成功完成",
  [Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed]: "4-失败完成",
  [Protocol_1.Aki.Protocol.BNs.Proto_Destroy]: "6-销毁"
};
exports.btChildQuestNodeStatusLogString = {
  [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_NotActive]: "0-未激活",
  [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Enter]: "1-进入",
  [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_EnterAction]: "2-执行进入行为中",
  [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress]: "3-进行中",
  [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished]: "4-完成"
};
class BtCustomUiConfig {
  constructor(t, o) {
    this.SourceOfAdd = t;
    this.CustomUiConfig = o;
  }
}
exports.BtCustomUiConfig = BtCustomUiConfig;
class TreeTrackTextExpressionInfo {
  constructor() {
    this.MainTitle = undefined;
    this.SubTitles = [];
    this.MainTitle = undefined;
  }
  Clear() {
    this.MainTitle = undefined;
    this.ClearSubTitle();
  }
  SetMainTitle(t) {
    this.MainTitle = t ? new MissionViewDefine_1.BehaviorTreeStepTextInfo(t.TidTitle, t.QuestScheduleType) : undefined;
  }
  AddSubTitle(t) {
    this.SubTitles.push(new MissionViewDefine_1.BehaviorTreeStepTextInfo(t.TidTitle, t.QuestScheduleType, t.ShowConditions, t.ConditionText, t.ProgressBar, t.BlankTitleStillShow, t.CustomPlaceholderBindingProgressList));
  }
  ClearSubTitle() {
    this.SubTitles = [];
  }
  CopyConfig(t) {
    this.SetMainTitle(t.MainTitle);
    this.ClearSubTitle();
    for (const o of t.SubTitles) {
      this.AddSubTitle(o);
    }
  }
  IsSubTitle(o) {
    return !!this.SubTitles && this.SubTitles.length !== 0 && this.SubTitles.find(t => {
      t = t.QuestScheduleType;
      return t !== undefined && t.ChildQuestId === o;
    }) !== undefined;
  }
}
exports.TreeTrackTextExpressionInfo = TreeTrackTextExpressionInfo;
class SilentAreaShowInfo {
  constructor(t, o) {
    this.SourceOfAdd = t;
    this.ShowInfo = o;
  }
}
exports.SilentAreaShowInfo = SilentAreaShowInfo;
class ModifyTrackAreaConfig {
  constructor(t, o) {
    this.SourceOfAdd = t;
    this.TrackConfig = o;
    this.ModifyTrackAreaText = "";
    this.ModifyTrackAreaText = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.TrackConfig.Tid);
  }
}
exports.ModifyTrackAreaConfig = ModifyTrackAreaConfig;
class ChallengeCountDownViewParams {
  constructor(t, o) {
    this.TimerEndTime = t;
    this.UiTitleKey = o;
  }
}
exports.ChallengeCountDownViewParams = ChallengeCountDownViewParams;
class FlySettlementViewParams {
  constructor(t, o, s, e, r, i) {
    this.Score = t;
    this.RankS = o;
    this.RankA = s;
    this.RankB = e;
    this.BestRecordScore = r;
    this.IncId = i;
  }
}
exports.FlySettlementViewParams = FlySettlementViewParams;
class MotorSettlementViewParams {
  constructor(t, o, s, e, r) {
    this.Score = t;
    this.RankS = o;
    this.RankA = s;
    this.RankB = e;
    this.IncId = r;
  }
}
exports.MotorSettlementViewParams = MotorSettlementViewParams;
class PunishReportSettlementViewParams {
  constructor(t, o) {
    this.TreeConfigId = t;
    this.States = o;
  }
}
exports.PunishReportSettlementViewParams = PunishReportSettlementViewParams;
//# sourceMappingURL=GeneralLogicTreeDefine.js.map