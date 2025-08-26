"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawDetailViewModel = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class LifePointDrawDetailViewModel {
  constructor() {
    this.LifePointDrawActivityData = undefined;
    this.GroupId = 0;
    this.QPu = 0;
    this.Xmt = undefined;
  }
  RegisterView(e) {
    this.Xmt = e;
    e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(this.GroupId).ChallengeList;
    this.QPu = e[0];
  }
  OnSelectChallenge(e) {
    this.QPu = e;
    this.RefreshLayout();
    this.KPu();
    this.RefreshRewardLayout();
    this.Nft();
    this.Iwn();
    this.SaveCurrentChallengeRedDotState();
    this.sFe();
  }
  RefreshLayout() {
    var e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(this.GroupId).ChallengeList;
    this.Xmt?.RefreshLayout(e);
  }
  OnShowView() {
    this.RefreshLayout();
    this.XPu();
    this.KPu();
    this.RefreshRewardLayout();
    this.Nft();
    this.Iwn();
    this.SaveCurrentChallengeRedDotState();
  }
  CheckChallengeIfSelect(e) {
    return this.QPu === e;
  }
  GetChallengeLockState(e) {
    return !ModelManager_1.ModelManager.LifePointDrawModel.GetChallengeRequireFinishState(this.LifePointDrawActivityData.Id, e);
  }
  XPu() {
    var e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(this.GroupId).LevelNumResource;
    this.Xmt?.RefreshLevelNumSprite(e);
  }
  Nft() {
    var e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointChallengeById(this.QPu).Name;
    this.Xmt?.ShowRightUpTitle(e);
  }
  Iwn() {
    var e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointChallengeById(this.QPu).Desc;
    this.Xmt?.ShowDescText(e);
  }
  sFe() {
    this.Xmt?.PlaySwitchSequence();
  }
  KPu() {
    var e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointChallengeById(this.QPu).DifficultTexture;
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.Xmt?.RefreshDifficultTexture(e);
  }
  GetChallengeTitleId(e) {
    return ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointChallengeById(e).SubTitle;
  }
  RefreshRewardLayout() {
    var e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointChallengeById(this.QPu).RewardId;
    var t = [];
    var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview;
    if (e !== undefined) {
      for (var [i, r] of e) {
        i = [{
          IncId: 0,
          ItemId: i
        }, r];
        t.push(i);
      }
      this.Xmt?.RefreshRewardLayout(t);
    }
  }
  GetCurrentChallengeFinishRewardState() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LifePointDrawActivityData.Id);
    return !!e && e.GetChallengeIfGetReward(this.QPu);
  }
  GetChallengeFinishState(e) {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LifePointDrawActivityData.Id);
    return !!t && t.GetChallengeIfGetReward(e);
  }
  GetCurrentChallengeId() {
    return this.QPu;
  }
  SaveCurrentChallengeRedDotState() {
    var e = this.GetCurrentChallengeId();
    ModelManager_1.ModelManager.LifePointDrawModel.SaveChallengeRedDotState(this.LifePointDrawActivityData.Id, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshLifePointDrawGroupRedDot, this.GroupId);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshLifePointDrawChallengeRedDot, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.LifePointDrawActivityData.Id);
  }
}
exports.LifePointDrawDetailViewModel = LifePointDrawDetailViewModel;
//# sourceMappingURL=LifePointDrawViewModel.js.map