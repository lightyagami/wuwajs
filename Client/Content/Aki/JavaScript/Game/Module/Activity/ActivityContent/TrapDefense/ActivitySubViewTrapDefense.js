"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewTrapDefense = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
const RecommendQuestTipsSubPanel_1 = require("../DirectTrain/SubView/RecommendQuestTipsSubPanel");
const ActivityTrapDefenseRewardBtn_1 = require("./ActivityTrapDefenseRewardBtn");
class ActivitySubViewTrapDefense extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.FixedRewardItem = undefined;
    this.LimitRewardItem = undefined;
    this.PanelRougeModeTips = undefined;
    this.Jk_ = () => {
      var e;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        ModelManager_1.ModelManager.TrapDefenseModel?.OpenMainEntryView();
        if (ModelManager_1.ModelManager.TrapDefenseModel?.RougeModeData.CheckModeOpenSubState()) {
          this.UpdateRougeModeTips();
        }
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.OnClickBtnFixedReward = () => {
      ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewFixedReward();
    };
    this.OnClickBtnLimitReward = () => {
      ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewLimitReward();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    var e = this.GetItem(0).GetOwner();
    await this.CommonInfoPanel.CreateThenShowByActorAsync(e);
    this.CommonInfoPanel.SetClickFunc(this.Jk_);
    this.CommonInfoPanel.HideRemainTime();
    this.CommonInfoPanel.SetBtnText("TrapDefense_GoToMainView");
    var e = this.GetItem(2);
    this.FixedRewardItem = new ActivityTrapDefenseRewardBtn_1.ActivityTrapDefenseRewardBtn();
    this.FixedRewardItem.OnClickBtnCallback = this.OnClickBtnFixedReward;
    await this.FixedRewardItem.Init(e);
    var e = this.GetItem(3);
    this.LimitRewardItem = new ActivityTrapDefenseRewardBtn_1.ActivityTrapDefenseRewardBtn();
    this.LimitRewardItem.OnClickBtnCallback = this.OnClickBtnLimitReward;
    await this.LimitRewardItem.Init(e);
    var e = this.GetItem(4);
    this.PanelRougeModeTips = new RecommendQuestTipsSubPanel_1.RecommendQuestTipsSubPanel();
    await this.PanelRougeModeTips.CreateByActorAsync(e.GetOwner());
    this.PanelRougeModeTips.SetBtnActive(false);
    await this.UpdateSpine();
  }
  OnAddEventListener() {
    this.CommonInfoPanel?.GetFunctional()?.FunctionButton?.BindRedDot("TrapDefense");
    this.FixedRewardItem.BindRedDot("TrapDefenseFixedReward");
    this.LimitRewardItem.BindRedDot("TrapDefenseLimitReward");
  }
  OnRemoveEventListener() {
    this.CommonInfoPanel?.GetFunctional()?.FunctionButton?.UnBindGivenUid(0);
    this.FixedRewardItem.UnBindGivenUid(0);
    this.LimitRewardItem.UnBindGivenUid(0);
  }
  OnRefreshView() {
    this.UpdateFixedReward();
    this.UpdateLimitReward();
    this.UpdateRougeModeTips();
  }
  UpdateFixedReward() {
    var [e, i] = ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetFixedRewardTotalProgress();
    this.FixedRewardItem.GetProgressText().SetText(e + "/" + i);
  }
  UpdateLimitReward() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.RewardData;
    var i = e.IsOpenLimitReward();
    this.LimitRewardItem.SetActive(i);
    if (i) {
      [i, e] = e.GetLimitRewardTotalProgress();
      this.LimitRewardItem.GetProgressText().SetText(i + "/" + e);
      this.UpdateLimitRewardDownTime();
    }
  }
  UpdateLimitRewardDownTime() {
    var e = this.GetText(1);
    var i = ModelManager_1.ModelManager.TrapDefenseModel.RewardData;
    var t = i.IsOpenLimitReward();
    e.SetUIActive(t);
    if (t) {
      t = i.GetLimitRewardRemainTimeStr();
      e.SetText(t);
    }
  }
  OnTimer(e) {
    this.UpdateLimitRewardDownTime();
  }
  async UpdateSpine() {
    var e;
    var i;
    var t = this.GetSpine(5);
    if (t) {
      e = (i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0) ? "TrapDefenseActivitySpineFemaleAtlas" : "TrapDefenseActivitySpineMaleAtlas";
      i = i ? "TrapDefenseActivitySpineFemaleData" : "TrapDefenseActivitySpineMaleData";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      await this.SetSpineAssetByPath(e, i, t);
    }
  }
  UpdateRougeModeTips() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.IsShowRougeModeTipsToActivity();
    this.PanelRougeModeTips.SetActive(e);
  }
}
exports.ActivitySubViewTrapDefense = ActivitySubViewTrapDefense;
//# sourceMappingURL=ActivitySubViewTrapDefense.js.map