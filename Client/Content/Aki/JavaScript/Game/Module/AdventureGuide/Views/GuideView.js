"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureGuideView = exports.AdventureGuideViewOpenData = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PowerController_1 = require("../../Power/PowerController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class AdventureGuideViewOpenData {
  constructor() {
    this.OpenTabViewName = undefined;
    this.OpenParam = undefined;
    this.NewSoundDetectTracingIdList = [];
  }
}
exports.AdventureGuideViewOpenData = AdventureGuideViewOpenData;
class AdventureGuideView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabViewComponent = undefined;
    this.TabComponent = undefined;
    this.y6e = undefined;
    this.I6e = 0;
    this.TabDataList = [];
    this.T6e = undefined;
    this.L6e = undefined;
    this.D6e = false;
    this.R6e = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      var t = this.TabDataList[e];
      var i = t.ChildViewName;
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName = i;
      this.U6e(false);
      for (const o of this.TabComponent.GetCurrencyItemList()) {
        o.SetUiActive(i === "NewSoundAreaView" || i === "DisposableChallengeView");
      }
      var n = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, n, this.T6e);
      this.I6e = e;
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.CanToggleChange = () => {
      var e;
      return !!Info_1.Info.IsInGamepad() || (e = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= e;
    };
    this.mo_ = e => {
      this.T6e = e;
      this.I6e = this.x6e(e.OpenTabViewName);
      this.TabComponent.SelectToggleByIndex(this.I6e, true);
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName = e.OpenTabViewName;
    };
    this.P6e = (e, t) => {
      var i = new AdventureGuideViewOpenData();
      i.OpenTabViewName = e;
      i.OpenParam = t;
      this.T6e = i;
      this.I6e = this.x6e(e);
      this.TabComponent.SelectToggleByIndex(this.I6e, true);
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName = e;
    };
    this.w6e = (e, t) => {
      if (StringUtils_1.StringUtils.IsEmpty(e) && StringUtils_1.StringUtils.IsEmpty(t)) {
        this.GetText(5).SetText("");
      } else {
        if (!this.D6e) {
          this.U6e(true);
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t, e);
      }
    };
    this.B6e = () => {
      UiManager_1.UiManager.CloseView("AdventureGuideView");
    };
    this.CloseClick = () => {
      this.CloseMe();
    };
    this.b6e = e => {
      this.GetButton(3).RootUIComp.SetUIActive(e !== 0);
      this.y6e.HelpGroupId = e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.B6e]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AdventureHelpBtn, this.b6e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DailyActivityCountDownUpdate, this.w6e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeChildView, this.P6e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SwitchAdventureGuideViewTab, this.mo_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AdventureHelpBtn, this.b6e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DailyActivityCountDownUpdate, this.w6e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeChildView, this.P6e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SwitchAdventureGuideViewTab, this.mo_);
  }
  async OnBeforeStartAsync() {
    var e;
    var t;
    var i;
    var n = [];
    this.y6e = this.GetButton(3);
    n.push(ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForAdventureManual());
    n.push(this.InitTabComponent());
    this.T6e = this.OpenParam;
    var o = this.T6e.OpenTabViewName;
    if (o) {
      this.I6e = this.x6e(o);
    } else {
      o = ModelManager_1.ModelManager.DailyActivityModel.CheckIsRewardWaitTake();
      e = ModelManager_1.ModelManager.DailyActivityModel.CheckIsFinish();
      t = ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetTaskAward();
      i = ModelManager_1.ModelManager.AdventureGuideModel.GetAllTaskFinish();
      this.I6e = o ? this.x6e("DailyActivityTabView") : this.x6e(t ? "AdventureTargetView" : e ? i ? "NewSoundAreaView" : "AdventureTargetView" : "DailyActivityTabView");
    }
    let r = undefined;
    r = ModelManager_1.ModelManager.FunctionModel.IsOpen(10066) ? [ItemDefines_1.EItemId.OverPower, ItemDefines_1.EItemId.Power] : [ItemDefines_1.EItemId.Power];
    n.push(this.TabComponent.SetCurrencyItemList(r));
    for (const h of this.TabComponent.GetCurrencyItemList()) {
      h.SetButtonFunction(() => {
        PowerController_1.PowerController.OpenPowerView();
      });
      h.SetUiActive(false);
    }
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName = this.TabDataList[this.I6e].ChildViewName;
    var a;
    var s;
    var [, o] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(63);
    for (const m of o) {
      if (m.SilentAreaDetectionRecord && (a = m.SilentAreaDetectionRecord.Conf.MapId, s = m.SilentAreaDetectionRecord.Conf.LevelPlayList[0], ModelManager_1.ModelManager.AdventureGuideModel.IsNightMareHaveConfig(a, s))) {
        n.push(ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestLevelPlayVarAsync(a, s));
      }
    }
    await Promise.all(n);
  }
  OnBeforeShow() {
    this.TabComponent.SelectToggleByIndex(this.I6e, true);
  }
  x6e(t) {
    var i = this.TabDataList.length;
    for (let e = 0; e < i; e++) {
      if (this.TabDataList[e].ChildViewName === t) {
        return e;
      }
    }
    return 0;
  }
  async InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(1), e, this.CloseClick);
    this.L6e = undefined;
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(2));
    await this.RebuildTabItem();
  }
  async RebuildTabItem() {
    this.TabDataList = ModelManager_1.ModelManager.AdventureGuideModel.GetAdventureGuideTabList();
    var t = this.TabDataList.length;
    var i = this.TabComponent.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++) {
      var n = this.TabDataList[e].ChildViewName;
      if (n === "AdventureTargetView") {
        i[e].RedDotName = "AdventureManual";
      } else if (n === "DailyActivityTabView") {
        i[e].RedDotName = "AdventureDailyActivityTab";
      } else if (n === "NewSoundAreaView") {
        i[e].RedDotName = "AdventureNewSoundAreaTab";
      } else if (n === "DisposableChallengeView") {
        i[e].RedDotName = "AdventureChallengeTab";
      } else if (n === "PeriodicityChallengeView") {
        i[e].RedDotName = "AdventurePeriodicityTab";
      }
    }
    await this.TabComponent.RefreshTabItemAsync(i);
  }
  U6e(e) {
    if (e) {
      this.w6e("", "");
    }
    this.GetItem(4).SetUIActive(e);
    this.D6e = e;
  }
  SetTabViewOpenData(e) {
    this.T6e = e;
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName = undefined;
    this.T6e = undefined;
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    var i = this.TabComponent.GetTabItemByIndex(this.TabDataList.findIndex(e => e.Id === t)).GetRootItem();
    if (i) {
      return [i, i];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    }
  }
}
exports.AdventureGuideView = AdventureGuideView;
//# sourceMappingURL=GuideView.js.map