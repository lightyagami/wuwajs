"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeRootView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const AdvanceNoticeDefine_1 = require("./AdvanceNoticeDefine");
const AdvanceNoticeSwitchComponent_1 = require("./AdvanceNoticeSwitchComponent");
const AdvanceNoticeTabItem_1 = require("./AdvanceNoticeTabItem");
class AdvanceNoticeRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ViewModel = undefined;
    this.TabComponent = undefined;
    this.TabViewComponent = undefined;
    this.AdvanceNoticeSwitchComponent = undefined;
    this.HasTabScrollFirstLateUpdate = false;
    this.R6e = (t, i) => {
      return new AdvanceNoticeTabItem_1.AdvanceNoticeTabItem();
    };
    this.pqe = t => {
      var i = this.TabComponent.GetTabItemByIndex(t);
      var e = this.ViewModel.TabList[t];
      var e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabInfoById(e);
      var e = AdvanceNoticeDefine_1.advanceNoticeTabTypeToTabViewName[e.Type];
      this.TabViewComponent.ToggleCallBack(this.ViewModel, e, i);
      this.ViewModel.UpdateTabDataOnTabChange(t);
      this.AdvanceNoticeSwitchComponent.Refresh(this.ViewModel);
    };
    this.yqe = t => {
      var t = this.ViewModel.TabList[t];
      var t = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabInfoById(t);
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("AdvanceNoticeTitleIcon");
      var t = new CommonTabData_1.CommonTabData(t.TabIcon, new CommonTabTitleData_1.CommonTabTitleData("Advertising_SubTitle"), new CommonTabTitleData_1.CommonTabTitleData(t.TabTitle));
      t.SetSmallIcon(i);
      return t;
    };
    this._ym = t => {
      var i = this.TabViewComponent.GetTabViewByTabKey(this.ViewModel.CurrentTabView);
      if (i) {
        i.OnSwitchSubTab(t);
      }
    };
    this.TIc = () => {
      this.CloseMe();
    };
    this.JA1 = () => {
      this.AdvanceNoticeSwitchComponent.SelectPreviousThumb();
    };
    this.ZA1 = () => {
      this.AdvanceNoticeSwitchComponent.SelectNextThumb();
    };
    this.iIm = () => {
      if (this.HasTabScrollFirstLateUpdate) {
        this.gsi();
      }
    };
    this.rIm = () => {
      if (!this.HasTabScrollFirstLateUpdate) {
        this.gsi();
        this.HasTabScrollFirstLateUpdate = true;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIText]];
    this.BtnBindInfo = [[6, this.JA1], [7, this.ZA1]];
  }
  async OnBeforeStartAsync() {
    this.ViewModel = this.OpenParam;
    this.ViewModel.OnSwitchSubTabDelegate = this._ym;
    this.InitTabComponent();
    this.AdvanceNoticeSwitchComponent = new AdvanceNoticeSwitchComponent_1.AdvanceNoticeSwitchComponent();
    this.AdvanceNoticeSwitchComponent.Initialize(this.GetButton(6), this.GetButton(7), this.GetScrollViewWithScrollbar(4), this.GetItem(5));
    await this.qdm();
    var t = this.TabComponent.GetScrollView();
    t.OnScrollValueChange.Bind(this.iIm);
    t.OnLateUpdate.Bind(this.rIm);
    var t = this.ViewModel?.ActivityId;
    var t = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingPageInfoByActivityId(t);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(8), "Advertising_VersionText", t?.TitleVersion);
  }
  OnBeforeShow() {
    this.oIm();
    this.HasTabScrollFirstLateUpdate = false;
    let t = this.ViewModel.TabIndex;
    if (!t || t === -1) {
      t = 0;
    }
    this.TabComponent.LateScrollToToggleByIndex(t);
  }
  InitTabComponent() {
    var t = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), t, this.TIc);
    this.TabComponent.SetHelpButtonShowState(false);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  async qdm() {
    var t = this.ViewModel.TabList.length;
    var t = this.TabComponent.CreateTabItemDataByLength(t);
    await this.TabComponent.RefreshTabItemAsync(t);
    let i = this.ViewModel.TabList.findIndex(t => t === this.ViewModel.DefaultSelectedTabId);
    if (i === -1) {
      i = 0;
    }
    this.TabComponent.SelectToggleByIndex(i, true);
  }
  gsi() {
    var t;
    var i;
    var e;
    var o;
    var s = this.ViewModel.TabList.length;
    if (this.TabComponent && !(s <= 0) && (t = this.TabComponent.GetScrollView(), e = this.TabComponent.GetTabItemByIndex(0)?.GetRootItem(), s = this.TabComponent.GetTabItemByIndex(s - 1)?.GetRootItem(), e) && s) {
      i = (0, puerts_1.$ref)(3);
      o = (0, puerts_1.$ref)(3);
      t.GetOutOfBottomBoundsType(e, i, o, ActivityCommonDefine_1.REDDOT_TOLERANCE);
      e = (0, puerts_1.$ref)(3);
      o = (0, puerts_1.$ref)(3);
      t.GetOutOfBottomBoundsType(s, e, o, ActivityCommonDefine_1.REDDOT_TOLERANCE);
      this.GetItem(2).SetUIActive((0, puerts_1.$unref)(i) === 1);
      this.GetItem(3).SetUIActive((0, puerts_1.$unref)(e) === 2);
    } else {
      this.oIm();
    }
  }
  oIm() {
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
  }
  OnBeforeDestroy() {
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
  }
}
exports.AdvanceNoticeRootView = AdvanceNoticeRootView;
//# sourceMappingURL=AdvanceNoticeRootView.js.map