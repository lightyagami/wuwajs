"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivitySubViewPermanentRogue = exports.RogueResActivitySubViewGeneralInfo = void 0;
const UE = require("ue"),
  RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase"),
  HelpController_1 = require("../../Help/HelpController"),
  PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueResActivitySubViewGeneralInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ActivityBaseData = void 0, this.LNe = void 0, this.DNe = void 0, this.UNe = void 0, this.ANe = void 0, this.k5e = void 0, this.DFe = () => {
      this.k5e?.(this.ActivityBaseData)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0),
      e = (this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA, this.GetItem(1)),
      i = (this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA, this.GetItem(2)),
      s = (this.UNe = new ActivityRewardList_1.ActivityRewardList, this.GetItem(3));
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData), await Promise.all([this.LNe.CreateThenShowByActorAsync(t.GetOwner()), this.DNe.CreateThenShowByActorAsync(e.GetOwner()), this.UNe.CreateThenShowByActorAsync(i.GetOwner()), this.ANe.CreateThenShowByActorAsync(s.GetOwner())])
  }
  OnStart() {
    var t, e, i = this.ActivityBaseData.LocalConfig;
    i && (t = i.DescTheme, e = !StringUtils_1.StringUtils.IsEmpty(t), this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()), this.LNe.SetSubTitleVisible(e), this.LNe.SetTimeTextVisible(!1), e && (e = i.DescThemeIcon, this.LNe.SetSubTitleByTextId(t), e) && this.LNe?.SetSubTitleIconByPath(e), t = i.Desc, this.DNe.SetContentByTextId(t), e = this.ActivityBaseData.GetPreviewReward(), this.UNe.SetTitleByTextId("CollectActivity_reward"), this.UNe.InitGridLayout(this.UNe.InitCommonGridItem), this.UNe.RefreshItemLayout(e), this.ANe.FunctionButton.SetFunction(this.DFe), this.ANe.FunctionButton.SetLocalTextNew("CollectActivity_reward"), this.OnRefreshView())
  }
  OnRefreshView() {
    this.RefreshFunction()
  }
  RefreshFunction() {
    var t = this.ActivityBaseData.IsUnLock();
    this.ANe?.FunctionButton?.SetUiActive(t), this.ANe?.SetPanelConditionVisible(!t), t || this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id)
  }
  SetData(t) {
    this.ActivityBaseData = t
  }
  SetBtnText(t, ...e) {
    this.ANe?.FunctionButton?.SetLocalTextNew(t, e)
  }
  SetClickFunc(t) {
    this.k5e = t
  }
  SetFunctionRedDotVisible(t) {
    this.ANe?.SetFunctionRedDotVisible(t)
  }
  SetRewardButtonFunction(t) {
    this.ANe?.SetRewardButtonFunction(t)
  }
  SetSubTitleTextById(t) {
    this.LNe.SetSubTitleVisible(!0), this.LNe.SetSubTitleByTextId(t)
  }
  GetFunctional() {
    return this.ANe
  }
}
exports.RogueResActivitySubViewGeneralInfo = RogueResActivitySubViewGeneralInfo;
class ActivitySubViewPermanentRogue extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments), this.X6c = void 0, this.Y6c = void 0, this.z6c = void 0, this.Z8c = 0, this.J6c = () => {
      var t;
      this.ActivityBaseData.GetPreGuideQuestFinishState() ? (t = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Z8c), UiManager_1.UiManager.OpenView(t.ViewName, this.Z8c)) : (t = this.ActivityBaseData.GetUnFinishPreGuideQuestId(), UiManager_1.UiManager.OpenView("QuestView", t))
    }, this.Z6c = () => {
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTaskOpen() <= TimeUtil_1.TimeUtil.GetServerTime() && (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheTaskOpen(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate)), UiManager_1.UiManager.OpenView("RogueTaskView")
    }, this.iyi = () => {
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckShopRedDot(this.Z8c) && ModelManager_1.ModelManager.ActivityPermanentRogueModel.RefreshShopRedDot(this.Z8c);
      var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Z8c).ShopId,
        e = new PayShopViewData_1.PayShopViewData;
      e.PayShopId = t, e.ShowShopIdList = [t], ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(e, () => {
        var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetShopCount(this.Z8c);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshShopAccumulateCurrency, "Item_Cumulative_Acquisition", t[0] + "/" + t[1])
      })
    }, this.EL1 = () => {
      var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSeasonHelpId(this.Z8c);
      t && HelpController_1.HelpController.OpenHelpById(t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.SpineSkeletonAnimationComponent]
    ], this.BtnBindInfo = [
      [1, this.EL1]
    ]
  }
  async OnBeforeStartAsync() {
    this.X6c = new RogueResActivitySubViewGeneralInfo, this.X6c.SetData(this.ActivityBaseData), await this.X6c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.X6c?.SetClickFunc(this.J6c), this.Y6c = new RogueOutButtonItem_1.RogueButtonItemA, this.Y6c.SetOnClickCall(this.Z6c), await this.Y6c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.z6c = new RogueOutButtonItem_1.RogueButtonItemA, this.z6c.SetOnClickCall(this.iyi), await this.z6c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())
  }
  OnStart() {
    this.X6c.SetBtnText("PrefabTextItem_632974650_Text")
  }
  OnRefreshView() {
    this.Z8c = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().CheckAllRedDot(),
      t = (this.X6c?.SetFunctionRedDotVisible(t), this.zao(), this.K8e(), this.as1(), RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Z8c)),
      t = (this.X6c?.SetSubTitleTextById(t.Name), RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Z8c)),
      t = 0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ? t.CoverF : t.CoverM;
    this.SetTextureByPath(t, this.GetTexture(7)), this.GetSpine(8).SetAnimation(0, "idle", !0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id)
  }
  OnBeforeHide() {
    this.W8e()
  }
  OnBeforeDestroy() {
    this.X6c = void 0, this.Y6c = void 0, this.z6c = void 0
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  K8e() {
    this.Y6c?.BindRedDot("RogueResTask"), this.z6c?.BindRedDot("RogueResShop", this.Z8c)
  }
  W8e() {
    this.Y6c?.UnBindRedDot(), this.z6c?.UnBindRedDot()
  }
  zao() {
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel,
      e = this.ActivityBaseData.IsUnLock(),
      i = this.ActivityBaseData.GetPreGuideQuestFinishState();
    e && i ? (this.Y6c?.SetUiActive(!0), i = t.GetTaskCount(), this.Y6c?.SetNum(i[0] + "/" + i[1]), this.z6c?.SetUiActive(!0), i = t.GetShopCount(this.Z8c), this.z6c?.SetNum(i[0] + "/" + i[1])) : (this.Y6c?.SetUiActive(!1), this.z6c?.SetUiActive(!1)), (this.X6c?.GetFunctional())?.FunctionButton?.SetUiActive(e)
  }
  as1() {
    var t = this.ActivityBaseData.IsUnLock(),
      e = this.ActivityBaseData.GetPreGuideQuestFinishState();
    t && e ? (this.GetItem(4)?.SetUIActive(!0), t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeonIndex(this.Z8c), this.GetItem(6).SetUIActive(!1), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PrefabTextItem_2589264504_Text", t + 1)) : this.GetItem(4)?.SetUIActive(!1)
  }
}
exports.ActivitySubViewPermanentRogue = ActivitySubViewPermanentRogue;
//# sourceMappingURL=PermanentRogueSubView.js.map