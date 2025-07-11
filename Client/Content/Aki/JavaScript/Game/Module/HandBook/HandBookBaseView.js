"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookBaseView = exports.initAttributeItem = exports.initContentItem = exports.initInfoItem = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const AttributeItem_1 = require("../Common/AttributeItem");
const CommonTabTitle_1 = require("../Common/TabComponent/CommonTabTitle");
const TabComponent_1 = require("../Common/TabComponent/TabComponent");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
const HandBookCommonTypeItem_1 = require("./HandBookCommonTypeItem");
const HandBookContentItem_1 = require("./HandBookContentItem");
const HandBookFetterItem_1 = require("./HandBookFetterItem");
const HandBookInfoTextItem_1 = require("./HandBookInfoTextItem");
const HandBookPhantomItem_1 = require("./HandBookPhantomItem");
const initInfoItem = (t, i, e) => {
  return {
    Key: e,
    Value: new HandBookInfoTextItem_1.HandBookInfoTextItem(t, i)
  };
};
exports.initInfoItem = initInfoItem;
const initContentItem = (t, i, e) => {
  return {
    Key: e,
    Value: new HandBookContentItem_1.HandBookContentItem(t, i)
  };
};
exports.initContentItem = initContentItem;
const initAttributeItem = () => new AttributeItem_1.AttributeItem();
exports.initAttributeItem = initAttributeItem;
class HandBookBaseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabComponent = undefined;
    this.TabList = [];
    this.OnToggleCallBack = undefined;
    this.OnPhantomToggleCallBack = undefined;
    this.CommonTabTitle = undefined;
    this.HandBookCommonItemDataList = [];
    this.PhantomFetterDataList = [];
    this.HandBookCommonTypeItemDataList = [];
    this.ScrollViewCommon = undefined;
    this.ScrollViewFetter = undefined;
    this.ScrollViewCommonType = undefined;
    this.InfoItemLayout = undefined;
    this.ContentItemLayout = undefined;
    this.StarItemLayout = undefined;
    this.HandBookPhantomLayout = undefined;
    this.AttributeLayout = undefined;
    this.InfoTextList = [];
    this.ContentTextList = [];
    this.AttributeList = [];
    this.PhantomDataList = [];
    this.StarCount = 0;
    this.OnPhantomToggleClick = t => {};
    this.pqe = t => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(t);
      }
    };
    this.TabItemProxyCreate = (t, i) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.InitHandBookCommonItem = () => {
      return new HandBookCommonItem_1.HandBookCommonItem();
    };
    this.InitHandBookFetterItem = () => {
      return new HandBookFetterItem_1.HandBookFetterItem();
    };
    this.InitHandBookCommonTypeItem = (t, i, e) => {
      var s = new HandBookCommonTypeItem_1.HandBookCommonTypeItem();
      s.Initialize();
      return {
        Key: e,
        Value: s
      };
    };
    this.Sei = t => this.PhantomFetterDataList[t];
    this.yei = t => this.HandBookCommonItemDataList[t];
    this.InitHandBookPhantom = (t, i, e) => {
      var s = new HandBookPhantomItem_1.HandBookPhantomItem();
      s.Initialize(t, i);
      s.BindToggleCallback(this.OnPhantomToggleClick);
      return {
        Key: e,
        Value: s
      };
    };
    this.CloseClick = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIVerticalLayout], [13, UE.UIItem], [14, UE.UIHorizontalLayout], [15, UE.UIItem], [16, UE.UIVerticalLayout], [17, UE.UIText], [18, UE.UIVerticalLayout], [19, UE.UIVerticalLayout], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIButtonComponent], [23, UE.UIText], [24, UE.UIText], [25, UE.UITexture], [26, UE.UIItem]];
    this.BtnBindInfo = [[22, this.CloseClick]];
  }
  SetDefaultState() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.GetLoopScrollViewComponent(4).RootUIComp.SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetScrollViewWithScrollbar(7).RootUIComp.SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetText(9).SetUIActive(false);
    this.GetText(10).SetUIActive(false);
    this.GetText(11).SetUIActive(false);
    this.GetVerticalLayout(12).RootUIComp.SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.GetHorizontalLayout(14).RootUIComp.SetUIActive(false);
    this.GetItem(15).SetUIActive(false);
    this.GetVerticalLayout(16).RootUIComp.SetUIActive(false);
    this.GetText(17).SetUIActive(false);
    this.GetVerticalLayout(18).RootUIComp.SetUIActive(false);
    this.GetVerticalLayout(19).RootUIComp.SetUIActive(false);
    this.GetTexture(25).SetUIActive(false);
    this.GetItem(26).SetUIActive(false);
  }
  InitTabComponent(t) {
    this.GetItem(26).SetUIActive(true);
    var i = this.GetItem(0);
    this.GetItem(1).SetUIActive(true);
    i.SetUIActive(true);
    this.TabComponent ||= new TabComponent_1.TabComponent(i, this.TabItemProxyCreate, this.pqe, undefined);
    this.TabList = t;
    var i = this.GetTabItemData(this.TabList);
    this.TabComponent.RefreshTabItem(i);
    this.TabComponent.SelectToggleByIndex(0);
  }
  InitCommonTabTitle(t, i) {
    var e = this.GetItem(2);
    e.SetUIActive(true);
    this.CommonTabTitle = new CommonTabTitle_1.CommonTabTitle(e);
    this.CommonTabTitle.UpdateIcon(t);
    this.CommonTabTitle.UpdateTitle(i);
  }
  UpdateTitle(t) {
    if (this.CommonTabTitle) {
      this.CommonTabTitle.UpdateTitle(t);
    }
  }
  SetTabToggleCallBack(t) {
    this.OnToggleCallBack = t;
  }
  InitScrollViewByCommonItem(t) {
    this.HandBookCommonItemDataList = t;
    var t = this.GetItem(6);
    var i = t.GetOwner();
    t.SetUIActive(true);
    var e = this.GetLoopScrollViewComponent(4);
    e.RootUIComp.SetUIActive(true);
    if (this.ScrollViewFetter) {
      this.ScrollViewFetter.ClearGridProxies();
      this.ScrollViewFetter = undefined;
    }
    this.ScrollViewCommon ||= new LoopScrollView_1.LoopScrollView(e, i, this.InitHandBookCommonItem);
    t.SetUIActive(false);
    this.ScrollViewCommon.ClearGridProxies();
    this.ScrollViewCommon.DeselectCurrentGridProxy();
    this.ScrollViewCommon.ReloadProxyData(this.yei, this.HandBookCommonItemDataList.length, false);
    this.ScrollViewCommon.RefreshAllGridProxies();
    if (this.ScrollViewCommon.Iei !== -1) {
      this.ScrollViewCommon.ScrollToGridIndex(0);
      this.ScrollViewCommon.SelectGridProxy(0, true);
    }
  }
  InitScrollViewByFetterItem(t) {
    this.PhantomFetterDataList = t;
    var t = this.GetItem(5);
    var i = t.GetOwner();
    t.SetUIActive(true);
    var e = this.GetLoopScrollViewComponent(4);
    e.RootUIComp.SetUIActive(true);
    if (this.ScrollViewCommon) {
      this.ScrollViewCommon.ClearGridProxies();
      this.ScrollViewCommon = undefined;
    }
    this.ScrollViewFetter ||= new LoopScrollView_1.LoopScrollView(e, i, this.InitHandBookFetterItem);
    t.SetUIActive(false);
    this.ScrollViewFetter.ClearGridProxies();
    this.ScrollViewFetter.ReloadProxyData(this.Sei, this.PhantomFetterDataList.length, false);
    this.ScrollViewFetter.RefreshAllGridProxies();
  }
  InitScrollViewByCommonTypeItem(t) {
    this.HandBookCommonTypeItemDataList = t;
    t = this.GetScrollViewWithScrollbar(7);
    t.RootUIComp.SetUIActive(true);
    this.ScrollViewCommonType ||= new GenericScrollView_1.GenericScrollView(t, this.InitHandBookCommonTypeItem);
    this.ScrollViewCommonType.RefreshByData(this.HandBookCommonTypeItemDataList);
  }
  SetNameText(t) {
    var i = this.GetText(9);
    i.SetUIActive(true);
    i.SetText(t);
  }
  SetTypeText(t) {
    var i = this.GetText(10);
    i.SetUIActive(true);
    i.SetText(t);
  }
  SetDescribeText(t) {
    var i = this.GetText(11);
    i.SetUIActive(true);
    i.SetText(t);
  }
  InitInfoItemLayout(t) {
    this.InfoTextList = t;
    t = this.GetVerticalLayout(12);
    t.RootUIComp.SetUIActive(true);
    this.InfoItemLayout ||= new GenericLayoutNew_1.GenericLayoutNew(t, exports.initInfoItem);
    this.InfoItemLayout.RebuildLayoutByDataNew(this.InfoTextList);
  }
  InitStarItemLayout(t) {
    this.StarCount = t;
    t = this.GetHorizontalLayout(14);
    t.RootUIComp.SetUIActive(true);
    this.StarItemLayout ||= new GenericLayoutNew_1.GenericLayoutNew(t, undefined);
    this.StarItemLayout.RebuildLayoutByDataNew(undefined, this.StarCount);
  }
  InitContentItemLayout(t) {
    this.ContentTextList = t;
    t = this.GetVerticalLayout(16);
    t.RootUIComp.SetUIActive(true);
    this.ContentItemLayout ||= new GenericLayoutNew_1.GenericLayoutNew(t, exports.initContentItem);
    this.ContentItemLayout.RebuildLayoutByDataNew(this.ContentTextList);
  }
  InitAttributeLayout(t) {
    this.GetVerticalLayout(19).RootUIComp.SetUIActive(true);
    this.AttributeList = t;
    this.AttributeLayout.RefreshByData(this.AttributeList);
  }
  InitHandBookPhantomLayout(t) {
    var i = this.GetVerticalLayout(18);
    i.RootUIComp.SetUIActive(true);
    this.PhantomDataList = t;
    this.HandBookPhantomLayout ||= new GenericLayoutNew_1.GenericLayoutNew(i, this.InitHandBookPhantom);
    this.HandBookPhantomLayout.RebuildLayoutByDataNew(this.PhantomDataList);
  }
  SetDateText(t) {
    var i = this.GetText(17);
    i.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalText(i, "HandBookGet", t);
  }
  SetCollectText(t, i) {
    this.GetText(23).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(23), "RoleExp", t, i);
  }
  SetOwnText(t) {
    this.GetText(17).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(17), "HandBookItemHaveNum", t);
  }
  SetKillText(t) {
    this.GetText(17).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(17), "KillCount", t);
  }
  SetLockState(t) {
    this.GetItem(21).SetUIActive(t);
    this.GetItem(20).SetUIActive(!t);
  }
  SetLockText(t) {
    this.GetText(24).SetText(t);
  }
  SetItemTexture(t) {
    var i = this.GetTexture(25);
    i.SetUIActive(true);
    this.SetTextureByPath(t, i);
  }
  OnStart() {}
  OnAfterShow() {}
  OnBeforeDestroy() {
    if (this.ScrollViewCommon) {
      this.ScrollViewCommon.ClearGridProxies();
      this.ScrollViewCommon = undefined;
    }
    if (this.ScrollViewFetter) {
      this.ScrollViewFetter.ClearGridProxies();
      this.ScrollViewFetter = undefined;
    }
    if (this.ScrollViewCommonType) {
      this.ScrollViewCommonType.ClearChildren();
      this.ScrollViewCommonType = undefined;
    }
    if (this.InfoItemLayout) {
      this.InfoItemLayout.ClearChildren();
      this.InfoItemLayout = undefined;
    }
    if (this.ContentItemLayout) {
      this.ContentItemLayout.ClearChildren();
      this.ContentItemLayout = undefined;
    }
    if (this.StarItemLayout) {
      this.StarItemLayout.ClearChildren();
      this.StarItemLayout = undefined;
    }
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
    if (this.HandBookPhantomLayout) {
      this.HandBookPhantomLayout.ClearChildren();
      this.HandBookPhantomLayout = undefined;
    }
    this.TabList = [];
    this.OnToggleCallBack = undefined;
    this.OnPhantomToggleCallBack = undefined;
    this.CommonTabTitle = undefined;
    this.HandBookCommonItemDataList = [];
    this.PhantomFetterDataList = [];
    this.HandBookCommonTypeItemDataList = [];
    this.InfoTextList = [];
    this.ContentTextList = [];
    this.AttributeList = [];
    this.PhantomDataList = [];
    this.StarCount = 0;
  }
}
exports.HandBookBaseView = HandBookBaseView;
//# sourceMappingURL=HandBookBaseView.js.map