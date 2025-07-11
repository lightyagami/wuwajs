"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewRogue = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const PayShopViewData_1 = require("../../../PayShop/PayShopData/PayShopViewData");
const RoguelikeBlackFlowerItem_1 = require("../../../Roguelike/View/RoguelikeBlackFlowerItem");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRogueController_1 = require("./ActivityRogueController");
class ActivitySubViewRogue extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.Sgl = undefined;
    this.OnBtnAchievement = () => {
      if (ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData().GetRogueActivityState() === 2) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_End_Tip");
      } else {
        UiManager_1.UiManager.OpenView("RoguelikeAchievementView");
      }
    };
    this.OnBtnShop = () => {
      var i;
      var e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
      if (e.GetRogueActivityState() === 2) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_End_Tip");
      } else if ((e = e?.SeasonData) !== undefined) {
        e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(e.UHn);
        (i = new PayShopViewData_1.PayShopViewData()).ShowShopIdList = [e.ShopId];
        i.PayShopId = e.ShopId;
        ModelManager_1.ModelManager.RoguelikeModel?.RecordRoguelikeShopRedDot(true);
        e = TimeUtil_1.TimeUtil.GetNextDayTimeStamp();
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopNextTimeStamp, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeDataUpdate);
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(i);
      }
    };
    this.DFe = () => {
      var i = this.ActivityBaseData.GetPreGuideQuestFinishState();
      var e = this.ActivityBaseData.GetRogueActivityState();
      if (i || e !== 0) {
        ActivityRogueController_1.ActivityRogueController.ActivityFunctionExecute(this.ActivityBaseData.Id);
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
      this.ActivityBaseData.FunctionBtnRedDot = false;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[4, this.OnBtnAchievement], [5, this.OnBtnShop]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(10);
    this.Sgl = new RoguelikeBlackFlowerItem_1.RoguelikeBlackFlowerItem();
    await this.Sgl.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i;
    var e = this.ActivityBaseData.LocalConfig;
    var t = this.ActivityBaseData.GetExtraConfig();
    if (e && t) {
      t = e.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(t);
      this.LNe.SetSubTitleVisible(i);
      if (i) {
        this.LNe.SetSubTitleByTextId(t);
      }
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      i = e.Desc;
      this.DNe.SetContentByTextId(i);
      t = this.ActivityBaseData.GetPreviewReward();
      this.UNe.SetTitleByTextId("CollectActivity_reward");
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(t);
      this.ANe.FunctionButton.SetFunction(this.DFe);
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
      this.ANe.FunctionButton.SetText(e);
      this.OnRefreshView();
    }
  }
  async OnBeforeHideSelfAsync() {
    RedDotController_1.RedDotController.UnBindRedDot("RoguelikeAchievement");
    RedDotController_1.RedDotController.UnBindRedDot("RoguelikeShop");
  }
  OnRefreshView() {
    this._Fe();
    this.FNe();
    this.BNe();
    RedDotController_1.RedDotController.BindRedDot("RoguelikeAchievement", this.GetItem(6));
    RedDotController_1.RedDotController.BindRedDot("RoguelikeShop", this.GetItem(7), i => {
      this.GetItem(7)?.SetUIActive(i);
    });
    var i = this.ActivityBaseData.GetPreGuideQuestFinishState();
    this.GetItem(8).SetUIActive(i);
    this.GetItem(9).SetUIActive(i);
  }
  OnTimer(i) {
    this._Fe();
    this.FNe();
    this.BNe();
  }
  BNe() {
    this.ANe?.SetFunctionRedDotVisible(this.ActivityBaseData.RedPointShowState);
  }
  FNe() {
    var [, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextByText(i);
  }
  _Fe() {
    var i;
    var e = this.ActivityBaseData.GetExtraConfig();
    if (e) {
      i = this.ActivityBaseData.IsUnLock();
      e = e.FunctionType === 0;
      if (i) {
        if (e) {
          this.ANe.FunctionButton?.SetUiActive(false);
          this.ANe.SetPanelConditionVisible(false);
        } else {
          i = this.ActivityBaseData.GetRogueActivityState();
          this.ANe.FunctionButton?.SetUiActive(i !== 2);
          this.ANe.SetPanelConditionVisible(i === 2);
          this.ANe.SetLockTextByTextId("Rogue_Function_End_Tip");
        }
      } else {
        this.ANe.FunctionButton?.SetUiActive(false);
        this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
      }
    }
  }
}
exports.ActivitySubViewRogue = ActivitySubViewRogue;
//# sourceMappingURL=ActivitySubViewRogue.js.map