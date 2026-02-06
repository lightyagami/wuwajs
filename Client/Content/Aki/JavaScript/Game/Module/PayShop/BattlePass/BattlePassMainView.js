"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassMainView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiModel_1 = require("../../../Ui/UiModel");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeaponDefine_1 = require("../../Weapon/WeaponDefine");
const BattlePassController_1 = require("./BattlePassController");
class BattlePassMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabViewComponent = undefined;
    this.TabComponent = undefined;
    this.TabDataList = [];
    this.Eki = 0;
    this.TDe = undefined;
    this.R6e = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = e => {
      var t = this.TabDataList[e];
      var i = t.ChildViewName;
      var a = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, a, this.yki);
      this.q8a();
      this.GetItem(2).SetUIActive(i !== "BattlePassWeaponView");
      this.GetItem(4).SetUIActive(i !== "BattlePassWeaponView");
      this.GetItem(5).SetUIActive(i !== "BattlePassWeaponView");
      this.GetItem(6).SetUIActive(i !== "BattlePassWeaponView");
      this.TabComponent?.SetPopupToggleVisible(i === "BattlePassWeaponView");
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName = i;
      var t = new LogReportDefine_1.OnClickBattlePassTabViewLogEvent();
      t.i_tabIndex = e;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.Rvt = () => {
      this.CloseMe();
    };
    this.Iki = () => {
      let e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop);
      if ((e = e || UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal)).Info.Name === this.Info.Name) {
        BattlePassController_1.BattlePassController.TryShowUpLevelView(false);
      }
    };
    this.xE1 = e => {
      this.jj1(e);
    };
    this.Sya = e => {
      var t;
      if (this.TabViewComponent.GetCurrentTabViewName() === "BattlePassWeaponView" && (t = this.TabViewComponent.GetCurrentTabView()) !== undefined) {
        t.OnClickFullLevelToggle(e);
      }
    };
    this.RefreshLeftTime = () => {
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      var e = this.Eki - e;
      if (e < 0) {
        if (!this.WaitToDestroy) {
          BattlePassController_1.BattlePassController.ShowTimePassConfirm();
        }
      } else {
        e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Text_GachaRemainingTime_Text", e.CountDownText);
      }
    };
    this.yki = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.TabDataList = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("BattlePassMainView");
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.Rvt);
    await this.TabComponent.RefreshTabItemByLengthAsync(this.TabDataList.length);
    await this.TabComponent.CreatePopupToggleTab(this.Sya);
    this.TabComponent.SetPopupToggleName("PrefabTextItem_3652268202_Text");
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
    this.Eki = ModelManager_1.ModelManager.BattlePassModel.GetBattlePassEndTime();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(this.RefreshLeftTime, CommonDefine_1.MILLIONSECOND_PER_SECOND);
    this.RefreshLeftTime();
  }
  OnStart() {
    this.TabComponent.SelectToggleByIndex(0, true);
  }
  q8a() {
    var e;
    var t;
    if (this.TabViewComponent.GetCurrentTabViewName() === "BattlePassWeaponView") {
      e = this.TabViewComponent.GetCurrentTabView();
      t = this.TabComponent.GetCaptionToggleState();
      e.RefreshToggleState(t);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattlePassLevelUpEvent, this.Iki);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattlePassSkip, this.xE1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattlePassLevelUpEvent, this.Iki);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattlePassSkip, this.xE1);
  }
  async jj1(e) {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "BattlePassSkip");
    await this.CloseMeAsync();
    SkipTaskManager_1.SkipTaskManager.RunByConfigId(e);
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "BattlePassSkip");
  }
  BindTabViewRed(t, e) {
    var i = this.TabDataList.findIndex(e => e.ChildViewName === t);
    this.TabComponent.GetTabItemByIndex(i).BindRedDot(e);
  }
  Tki(t) {
    var e = this.TabDataList.findIndex(e => e.ChildViewName === t);
    this.TabComponent.GetTabItemByIndex(e).UnBindRedDot();
  }
  OnBeforeShow() {
    this.TabViewComponent.SetCurrentTabViewState(true);
    this.BindTabViewRed("BattlePassRewardView", "BattlePassReward");
    this.BindTabViewRed("BattlePassTaskView", "BattlePassTask");
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattlePassMainViewHide);
    this.TabViewComponent.SetCurrentTabViewState(false);
    this.Tki("BattlePassRewardView");
    this.Tki("BattlePassTaskView");
  }
  OnBeforeDestroy() {
    this.TDe?.Remove();
    this.TDe = undefined;
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
    this.TabDataList = [];
    UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.yki.WeaponObserver);
    UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.yki.WeaponScabbardObserver);
    this.yki = undefined;
  }
  OnBeforeCreate() {
    var e = UiSceneManager_1.UiSceneManager.InitWeaponObserver(true);
    e.Model?.CheckGetComponent(3)?.SetLoadingActive(false);
    var t = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver();
    this.yki = new WeaponDefine_1.WeaponSkeletalObserverHandles(e, t);
  }
}
exports.BattlePassMainView = BattlePassMainView;
//# sourceMappingURL=BattlePassMainView.js.map