"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaActivitySubView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityCircleButtonItem_1 = require("../UniversalComponents/Functional/ActivityCircleButtonItem");
const ActivityQuestTipsItem_1 = require("../UniversalComponents/Functional/ActivityQuestTipsItem");
const CiacconaActivityInfoPanel_1 = require("./CiacconaActivityInfoPanel");
class CiacconaActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.P4c = undefined;
    this.x4c = undefined;
    this.U4c = undefined;
    this.D4c = undefined;
    this.OP1 = undefined;
    this.B4c = () => new CiacconaEndingIcon();
    this.k4c = () => {
      ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenEndingView();
    };
    this.O4c = () => {
      ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenRewardViewByActivityId(this.ActivityBaseData.Id);
    };
    this.qP1 = () => {
      var e = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(this.ActivityBaseData.Id);
      if (e.RecommendQuestId > 0) {
        UiManager_1.UiManager.OpenView("QuestView", e.RecommendQuestId);
      }
    };
    this.AOe = () => {
      this.bl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.P4c = new CiacconaActivityInfoPanel_1.CiacconaActivityInfoPanel(this.ActivityBaseData);
    this.U4c = new ActivityCircleButtonItem_1.ActivityCircleButtonItem();
    this.D4c = new ActivityCircleButtonItem_1.ActivityCircleButtonItem();
    this.OP1 = new ActivityQuestTipsItem_1.ActivityQuestTipsItem();
    var e = [];
    e.push(this.P4c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    e.push(this.U4c.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    e.push(this.D4c.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    e.push(this.OP1.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()));
    await Promise.all(e);
    this.U4c.SetOnClick(this.k4c);
    this.D4c.SetOnClick(this.O4c);
    this.x4c = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.B4c);
    this.OP1.SetRewardButtonFunction(this.qP1);
  }
  OnStart() {
    this.bl();
  }
  OnBeforeDestroy() {
    this.U4c?.UnBindRedDot();
    this.D4c?.UnBindRedDot();
  }
  OnRefreshView() {
    this.bl();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaActivityStateUpdate, this.AOe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate, this.AOe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaEndingDataUpdate, this.AOe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaRewardDataUpdate, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaActivityStateUpdate, this.AOe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate, this.AOe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaEndingDataUpdate, this.AOe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaRewardDataUpdate, this.AOe);
  }
  OnTimer() {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(this.ActivityBaseData?.Id ?? 0);
    if (e) {
      this.D4c?.SetUiActive(e.IsInRewardTime && e.State2Unlock);
      this.GetItem(8)?.SetUIActive(e.State2Unlock && e.IsInRewardTime);
      this.gj1();
    }
  }
  bl() {
    this.P4c.SetTitle(this.ActivityBaseData.GetTitle());
    var e = this.ActivityBaseData.LocalConfig;
    this.P4c.SetSubTitle(!StringUtils_1.StringUtils.IsEmpty(e?.DescTheme), e?.DescTheme ?? "");
    this.P4c.SetDesc(!StringUtils_1.StringUtils.IsEmpty(e?.Desc), e?.Desc ?? "");
    this.P4c.SetReward(true, this.ActivityBaseData.GetPreviewReward());
    this.sSt();
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(this.ActivityBaseData.Id);
    this.P4c.RefreshFunctionArea();
    var t = ModelManager_1.ModelManager.CiacconaGalModel.GetAllEndingDataList();
    this.x4c.RefreshByData(t);
    this.GetItem(7).SetUIActive(false);
    var [t, i] = ModelManager_1.ModelManager.CiacconaGalModel.GetProgressRewardProgress();
    this.GetSprite(6).fillAmount = t / i;
    this.GetText(5).SetText(t + "/" + i);
    this.GetItem(8).SetUIActive(e.State2Unlock && e.IsInRewardTime);
    this.gj1();
    this.OP1.SetContentByTextId(e.RecommendQuestTipsTextId);
    this.OP1.SetUiActive(e.RecommendQuestId > 0 && !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.RecommendQuestId));
    var [s, n] = ModelManager_1.ModelManager.CiacconaGalModel.GetEndingProgress();
    this.U4c.SetSubText(s + "/" + n);
    this.U4c.SetUiActive(e.State3Unlock);
    this.U4c.SetRedDotVisible(ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward());
    this.D4c.SetSubText(t + "/" + i);
    this.D4c.SetUiActive(e.IsInRewardTime && e.State2Unlock);
    this.D4c.SetRedDotVisible(ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward());
  }
  sSt() {
    var [, e] = this.GetTimeVisibleAndRemainTime();
    this.P4c?.SetTimer(false, e);
  }
  gj1() {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Xkjsx_Rewards_Timeless") + " " + ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.RewardRemainTimeStr;
    this.GetText(12)?.SetText(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      return this.P4c?.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
exports.CiacconaActivitySubView = CiacconaActivitySubView;
class CiacconaEndingIcon extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(e, t, i) {
    let s = "SP_PlotReasoningLock";
    if (e.IsFinished) {
      s = e.Type === 1 ? "SP_PlotReasoningFinishMain" : "SP_PlotReasoningFinishBranch";
    }
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    this.SetSpriteByPath(e, this.GetSprite(0), false);
  }
}
//# sourceMappingURL=CiacconaActivitySubView.js.map