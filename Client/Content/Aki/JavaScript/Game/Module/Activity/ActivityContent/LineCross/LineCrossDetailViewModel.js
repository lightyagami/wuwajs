"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossDetailViewModel = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class LineCrossDetailViewModel {
  constructor() {
    this.LineCrossActivityData = undefined;
    this.QPu = 0;
    this.GroupId = 0;
    this.GridIndex = 0;
    this.Xmt = undefined;
  }
  RegisterView(e) {
    this.Xmt = e;
    e = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(this.GroupId).ChallengeList;
    this.QPu = e[0];
    for (const t of e) {
      if (!ModelManager_1.ModelManager.LineCrossModel.GetChallengeFinishState(this.LineCrossActivityData.Id, t)) {
        this.QPu = t;
        break;
      }
    }
  }
  OnSelectChallenge(e) {
    this.QPu = e;
    this.RefreshRewardLayout();
    this.Nft();
    this.Lid();
    this.Iwn();
    this.Aid();
    this.SaveCurrentChallengeRedDotState();
    this.sFe();
  }
  OnShowView() {
    this.RefreshRewardLayout();
    this.XPu();
    this.Iwn();
    this.Nft();
    this.Lid();
    this.Did();
    this.Aid();
    this.xid();
    this.SaveCurrentChallengeRedDotState();
  }
  GetCurrentChallengeFinishRewardState() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LineCrossActivityData.Id);
    return !!e && e.GetChallengeIfGetReward(this.QPu);
  }
  RefreshRewardLayout() {
    var e = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossChallengeById(this.QPu).RewardId;
    var t = [];
    var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview;
    if (e !== undefined) {
      for (var [i, s] of e) {
        i = [{
          IncId: 0,
          ItemId: i
        }, s];
        t.push(i);
      }
      this.Xmt?.RefreshRewardLayout(t);
    }
  }
  Did() {
    var e = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(this.GroupId).ChallengeList;
    this.Xmt?.RefreshDifficultItem(e, this.QPu);
  }
  Aid() {
    this.Xmt?.RefreshDifficultItemSelection(this.QPu);
  }
  XPu() {
    var e = this.GridIndex + 1;
    this.Xmt?.RefreshNumText(e);
  }
  Nft() {
    var e = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossChallengeById(this.QPu).Name;
    this.Xmt?.RefreshTitleText(e);
  }
  Lid() {
    var e = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossChallengeById(this.QPu).DifficultDesc;
    this.Xmt?.RefreshDifficultDescText(e);
  }
  Iwn() {
    var e = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossChallengeById(this.QPu).Desc;
    this.Xmt?.ShowDescText(e);
  }
  xid() {
    var e = ModelManager_1.ModelManager.LineCrossModel.GetIfHiddenGroup(this.LineCrossActivityData.Id, this.GroupId);
    var t = ModelManager_1.ModelManager.LineCrossModel.GetGroupState(this.LineCrossActivityData.Id, this.GroupId);
    this.Xmt?.RefreshMiddleByChallengeState(e, t);
  }
  sFe() {
    this.Xmt?.PlaySwitchSequence();
  }
  GetChallengeTitleId(e) {
    return ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossChallengeById(e).SubTitle;
  }
  GetChallengeLockState(e) {
    return !ModelManager_1.ModelManager.LineCrossModel.GetChallengeRequireFinishState(this.LineCrossActivityData.Id, e);
  }
  GetChallengeFinishState(e) {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LineCrossActivityData.Id);
    return !!t && t.GetChallengeIfGetReward(e);
  }
  GetCurrentChallengeId() {
    return this.QPu;
  }
  SaveCurrentChallengeRedDotState() {
    var e = this.GetCurrentChallengeId();
    ModelManager_1.ModelManager.LineCrossModel.SaveChallengeRedDotState(this.LineCrossActivityData.Id, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshLineCrossGroupRedDot, this.GroupId);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshLineCrossChallengeRedDot, e);
  }
}
exports.LineCrossDetailViewModel = LineCrossDetailViewModel;
//# sourceMappingURL=LineCrossDetailViewModel.js.map