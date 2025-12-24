"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewPermanentRogue = exports.RogueResActivitySubViewGeneralInfo = undefined;
const UE = require("ue");
const RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA");
const ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase");
const HelpController_1 = require("../../Help/HelpController");
const PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueResActivitySubViewGeneralInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.k5e = undefined;
    this.DFe = () => {
      this.k5e?.(this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var i = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var e = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(t.GetOwner()), this.DNe.CreateThenShowByActorAsync(i.GetOwner()), this.UNe.CreateThenShowByActorAsync(e.GetOwner()), this.ANe.CreateThenShowByActorAsync(s.GetOwner())]);
  }
  OnStart() {
    var t;
    var i;
    var e = this.ActivityBaseData.LocalConfig;
    if (e) {
      t = e.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(t);
      this.LNe.SetActivityBaseData(this.ActivityBaseData);
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      this.LNe.SetSubTitleVisible(i);
      this.LNe.SetTimeTextVisible(false);
      if (i && (i = e.DescThemeIcon, this.LNe.SetSubTitleByTextId(t), i)) {
        this.LNe?.SetSubTitleIconByPath(i);
      }
      t = e.Desc;
      this.DNe.SetContentByTextId(t);
      i = this.ActivityBaseData.GetPreviewReward();
      this.UNe.SetTitleByTextId("CollectActivity_reward");
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(i);
      this.ANe.FunctionButton.SetFunction(this.DFe);
      this.ANe.FunctionButton.SetLocalTextNew("CollectActivity_reward");
      this.OnRefreshView();
    }
  }
  OnRefreshView() {
    this.RefreshFunction();
  }
  RefreshFunction() {
    var t = this.ActivityBaseData.IsUnLock();
    this.ANe?.FunctionButton?.SetUiActive(t);
    this.ANe?.SetPanelConditionVisible(!t);
    if (!t) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
  }
  SetData(t) {
    this.ActivityBaseData = t;
  }
  SetBtnText(t, ...i) {
    this.ANe?.FunctionButton?.SetLocalTextNew(t, i);
  }
  SetClickFunc(t) {
    this.k5e = t;
  }
  SetFunctionRedDotVisible(t) {
    this.ANe?.SetFunctionRedDotVisible(t);
  }
  SetRewardButtonFunction(t) {
    this.ANe?.SetRewardButtonFunction(t);
  }
  SetSubTitleTextById(t) {
    this.LNe.SetSubTitleVisible(true);
    this.LNe.SetSubTitleByTextId(t);
  }
  GetFunctional() {
    return this.ANe;
  }
}
exports.RogueResActivitySubViewGeneralInfo = RogueResActivitySubViewGeneralInfo;
class ActivitySubViewPermanentRogue extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.X6c = undefined;
    this.Y6c = undefined;
    this.z6c = undefined;
    this.ie1 = 0;
    this.J6c = () => {
      var t;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        t = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.ie1);
        UiManager_1.UiManager.OpenView(t.ViewName, this.ie1);
      } else {
        t = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", t);
      }
    };
    this.Z6c = () => {
      if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTaskOpen() <= TimeUtil_1.TimeUtil.GetServerTime()) {
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheTaskOpen();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate);
      }
      UiManager_1.UiManager.OpenView("RogueTaskView");
    };
    this.iyi = () => {
      if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckShopRedDot(this.ie1)) {
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.RefreshShopRedDot(this.ie1);
      }
      var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.ie1).ShopId;
      var i = new PayShopViewData_1.PayShopViewData();
      i.PayShopId = t;
      i.ShowShopIdList = [t];
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(i, () => {
        var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetShopCount(this.ie1);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshShopAccumulateCurrency, "Item_Cumulative_Acquisition", t[0] + "/" + t[1]);
      });
    };
    this.XL1 = () => {
      var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSeasonHelpId(this.ie1);
      if (t) {
        HelpController_1.HelpController.OpenHelpById(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UITexture], [8, UE.SpineSkeletonAnimationComponent], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[1, this.XL1]];
  }
  async OnBeforeStartAsync() {
    this.X6c = new RogueResActivitySubViewGeneralInfo();
    this.X6c.SetData(this.ActivityBaseData);
    await this.X6c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.X6c?.SetClickFunc(this.J6c);
    this.Y6c = new RogueOutButtonItem_1.RogueButtonItemA();
    this.Y6c.SetOnClickCall(this.Z6c);
    await this.Y6c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.z6c = new RogueOutButtonItem_1.RogueButtonItemA();
    this.z6c.SetOnClickCall(this.iyi);
    await this.z6c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    this.X6c.SetBtnText("PrefabTextItem_632974650_Text");
  }
  OnRefreshView() {
    this.ie1 = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().CheckAllRightSideRedDot();
    this.X6c?.SetFunctionRedDotVisible(t);
    this.zao();
    this.K8e();
    this.ws1();
    var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.ie1);
    this.X6c?.SetSubTitleTextById(t.Name);
    var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.ie1);
    var t = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 0 ? t.CoverF : t.CoverM;
    this.SetTextureByPath(t, this.GetTexture(7));
    this.GetSpine(8).SetAnimation(0, "idle", true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
    var t = this.ActivityBaseData.SaveFirstCheckRedDotState(0);
    if (!t) {
      this.XL1();
    }
  }
  OnBeforeHide() {
    this.W8e();
  }
  OnBeforeDestroy() {
    this.X6c = undefined;
    this.Y6c = undefined;
    this.z6c = undefined;
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  K8e() {
    this.Y6c?.BindRedDot("RogueResTask");
    this.z6c?.BindRedDot("RogueResShop", this.ie1);
  }
  W8e() {
    this.Y6c?.UnBindRedDot();
    this.z6c?.UnBindRedDot();
  }
  zao() {
    var t;
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel;
    var e = this.ActivityBaseData.IsUnLock();
    var s = this.ActivityBaseData.GetPreGuideQuestFinishState();
    if (e && s) {
      s = i.GetTaskCount();
      t = i.GetTaskIsEnd();
      this.GetItem(9)?.SetUIActive(!t);
      this.Y6c?.SetUiActive(!t);
      this.Y6c?.SetNum(s[0] + "/" + s[1]);
      this.z6c?.SetUiActive(true);
      t = i.GetShopCount(this.ie1);
      this.z6c?.SetNum(t[0] + "/" + t[1]);
    } else {
      this.Y6c?.SetUiActive(false);
      this.z6c?.SetUiActive(false);
    }
    this.X6c?.GetFunctional()?.FunctionButton?.SetUiActive(e);
  }
  ws1() {
    var t = this.ActivityBaseData.IsUnLock();
    var i = this.ActivityBaseData.GetPreGuideQuestFinishState();
    if (t && i) {
      this.GetItem(4)?.SetUIActive(true);
      t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeonIndex(this.ie1);
      this.GetItem(6).SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PrefabTextItem_2589264504_Text", t + 1);
    } else {
      this.GetItem(4)?.SetUIActive(false);
    }
  }
  OnTimer(t) {
    if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskIsEnd()) {
      this.GetItem(9)?.SetUIActive(false);
    } else {
      this.GetItem(9)?.SetUIActive(true);
      this.Y6c?.SetLimitTime(this.GetRemainTime());
    }
  }
  GetRemainTime() {
    var t = MathUtils_1.MathUtils.LongToNumber(ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskEndTime());
    return ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(t, "{0}") ?? "";
  }
}
exports.ActivitySubViewPermanentRogue = ActivitySubViewPermanentRogue;
//# sourceMappingURL=PermanentRogueSubView.js.map