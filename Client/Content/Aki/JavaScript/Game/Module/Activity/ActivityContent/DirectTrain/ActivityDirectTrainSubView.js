"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainSubView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const MapDefine_1 = require("../../../Map/MapDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const SplashScreenController_1 = require("../../../SplashScreen/SplashScreenController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityDirectTrainHelper_1 = require("./ActivityDirectTrainHelper");
const RecommendQuestTipsSubPanel_1 = require("./SubView/RecommendQuestTipsSubPanel");
class ActivityDirectTrainSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.uxl = undefined;
    this.cxl = undefined;
    this.Nda = () => {
      const e = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsGetActivityRewards(this.LOe);
      this.UNe.GetLayoutItemList().forEach(i => {
        i.SetReceivedVisible(e);
      });
    };
    this.mxl = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(237);
      i.FunctionMap.set(2, () => {
        var i = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetRecommendQuestLinkId(this.LOe);
        UiManager_1.UiManager.OpenView("QuestView", i);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.dxl = () => {
      this.ActivityDirectTrainData.HaveDisplayedGotoRedDot = true;
      var i = this.RPl();
      var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId(this.LOe);
      if (i) {
        if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 0) {
          if (this.uo_()) {
            const t = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetRecommendQuestLinkId(this.LOe);
            i = {
              GotoCallBack: () => {
                UiManager_1.UiManager.OpenView("QuestView", t);
              },
              SkipCallBack: () => {
                ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.RequestThroughTrain(this.LOe, () => {
                  UiManager_1.UiManager.ResetToBattleView();
                });
              },
              ActivityId: this.LOe
            };
            UiManager_1.UiManager.OpenView("SkipMainQuestWindowView", i);
          }
        } else {
          UiManager_1.UiManager.OpenView("QuestView", e);
        }
      } else {
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
  }
  get ActivityDirectTrainData() {
    return this.ActivityBaseData;
  }
  get LOe() {
    return this.ActivityBaseData.Id;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
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
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    var i = this.ActivityDirectTrainData;
    var e = this.GetItem(3);
    this.uxl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(i);
    await this.uxl.CreateThenShowByActorAsync(e.GetOwner());
    this.uxl.FunctionButton.SetFunction(this.dxl);
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
      this.uxl.FunctionButton.BindRedDot("ActivityDirectTrain", i.Id);
    } else {
      this.uxl.FunctionButton.BindRedDot("ActivityDirectTrainPro", i.Id);
    }
    var e = this.GetItem(4);
    this.cxl = new RecommendQuestTipsSubPanel_1.RecommendQuestTipsSubPanel();
    await this.cxl.CreateThenShowByActorAsync(e.GetOwner());
    this.cxl.BindClickBtnTipsCallBack(this.mxl);
  }
  OnStart() {
    this.mGe();
    this.ufo();
    this.KGt();
    this.NDn();
    this.Cxl();
  }
  OnBeforeShow() {
    ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.RequestThroughTrainFinishViewAsync(this.LOe);
    ModelManager_1.ModelManager.ActivityDirectTrainModel.AlreadyStartView = true;
    SplashScreenController_1.SplashScreenController.FinishCurTask(3);
  }
  OnRefreshView() {
    this.KGt();
    this.Cxl();
    this.NDn();
  }
  OnTimer(i) {
    this.gxl();
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length === 0 || i[0] !== "ConfirmBtn" || (i = this.uxl?.FunctionButton?.GetGuideUiItemAndUiItemForShowEx(i)) === undefined) {
      return undefined;
    } else {
      return i;
    }
  }
  mGe() {
    var i = this.ActivityDirectTrainData.GetTitle();
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(i);
    this.gxl();
  }
  gxl() {
    var i = this.ActivityDirectTrainData;
    var [e, t] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(i);
    if (i.EndShowTime !== 0 && i.EndShowTime < TimeUtil_1.TimeUtil.GetServerTime()) {
      this.LNe.SetTimeTextVisible(false);
    } else {
      this.LNe.SetTimeTextVisible(e);
      if (e) {
        this.LNe.SetTimeTextByText(t);
      }
    }
  }
  ufo() {
    var i = this.ActivityDirectTrainData.LocalConfig;
    var e = i.DescTheme;
    var i = i.Desc;
    var t = !StringUtils_1.StringUtils.IsEmpty(e);
    this.LNe.SetSubTitleVisible(t);
    if (t) {
      this.LNe.SetSubTitleByTextId(e);
    }
    this.DNe.SetContentByTextId(i);
  }
  KGt() {
    var i = this.ActivityDirectTrainData.GetPreviewReward();
    this.UNe.SetTitleByTextId("CollectActivity_reward");
    this.UNe.RefreshItemLayout(i, this.Nda);
  }
  RPl() {
    var i = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetRecommendQuestId(this.LOe);
    return !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(i);
  }
  Cxl() {
    var i = this.RPl();
    this.cxl.SetUiActive(i);
    if (i) {
      i = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetRecommendQuestTipsTextId(this.LOe);
      this.cxl.SetTipsTxtByTextId(i);
    }
  }
  NDn() {
    var i = this.ActivityDirectTrainData;
    var e = i.IsUnLock();
    var t = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId(this.LOe);
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t);
    var r = ModelManager_1.ModelManager.SubPackageDownLoadModel.CheckActivityTeleportHaveSubPackage(i.Id);
    if (e) {
      if (r) {
        this.uxl.FunctionButton.SetLocalTextNew(t === 0 ? "DirectTrainActivity_Button_Unlock" : "DirectTrainActivity_Button_Goto");
      } else {
        this.uxl.SetPerformanceSubPackageLock(i.LocalConfig.AreaTips, i.LocalConfig.AreaList);
        this.uxl.SetLockTextByTextId("SubPackageDownLoad_ActivityLock_Des");
      }
    } else {
      this.uxl.SetPerformanceConditionLock(i.ConditionGroupId, i.Id);
    }
    this.uxl.SetPanelConditionVisible(!e || !r);
    var i = t === 3;
    this.uxl.FunctionButton.SetUiActive(e && !i && r);
    this.uxl.PanelActivate.SetUiActive(e && i && r);
    if (i) {
      this.uxl.PanelActivate.SetTextByTextId("DirectTrainActivity_Finish");
    }
  }
  uo_() {
    var i = ModelManager_1.ModelManager.WorldMapModel.IsPlayerInInstanceDungeon();
    if (i || ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("DirectTrainActivity_Intercept_Content");
      return false;
    } else {
      return !!i || ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === MapDefine_1.BIG_WORLD_MAP_ID || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("DirectTrainActivity_LockAdvance_Text"), false);
    }
  }
}
exports.ActivityDirectTrainSubView = ActivityDirectTrainSubView;
//# sourceMappingURL=ActivityDirectTrainSubView.js.map