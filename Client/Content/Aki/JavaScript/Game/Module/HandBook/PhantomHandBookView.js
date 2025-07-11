"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomHandBookView = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const HandBookBaseView_1 = require("./HandBookBaseView");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const HandBookFetterItem_1 = require("./HandBookFetterItem");
const HandBookPhantomItem_1 = require("./HandBookPhantomItem");
class PhantomHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments);
    this.oti = [];
    this.rti = [];
    this.nti = [];
    this.BZt = [];
    this.sti = undefined;
    this.bZt = undefined;
    this.Refresh = () => {
      this.RefreshTabComponent();
      this.RefreshPhantomTitle();
      this.RefreshPhantom();
      this.RefreshCollectText();
      this.RefreshLockText();
    };
    this.OnHandBookRead = (e, t) => {
      if (e === 1) {
        var n = this.BZt.length;
        for (let e = 0; e < n; e++) {
          var o = this.BZt[e];
          var i = o.GetData();
          if (i.Config.Id === t) {
            i.IsNew = false;
            o.SetNewFlagVisible(false);
            break;
          }
        }
      }
    };
    this.TabToggleCallBack = e => {
      this.SetDefaultState();
      this.GetItem(0).SetUIActive(true);
      e = this.oti[e].Id;
      if ((this.sti = e) === 0) {
        this.RefreshPhantomTitle();
        this.RefreshPhantom();
      } else {
        this.RefreshPhantomFetterTitle();
        this.RefreshPhantomFetter();
      }
    };
    this.InitHandBookCommonItem = () => {
      var e = new HandBookCommonItem_1.HandBookCommonItem();
      this.BZt.push(e);
      e.BindOnExtendToggleStateChanged(this.OnToggleClick);
      return e;
    };
    this.OnToggleClick = e => {
      var t = e.Data;
      var e = e.MediumItemGrid.GridIndex;
      this.ScrollViewCommon.DeselectCurrentGridProxy();
      this.ScrollViewCommon.SelectGridProxy(e);
      this.ScrollViewCommon.RefreshGridProxy(e);
      if (t.IsLock) {
        this.SetLockState(true);
      } else {
        this.SetLockState(false);
        this.RefreshPhantomContent(t);
      }
    };
    this.TabItemProxyCreate = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.aei = (e, t) => e.Id - t.Id;
    this.InitHandBookPhantom = (e, t, n) => {
      var o = new HandBookPhantomItem_1.HandBookPhantomItem();
      o.Initialize(e, t);
      o.BindToggleCallback(this.OnPhantomToggleClick);
      this.nti.push(o);
      return {
        Key: n,
        Value: o
      };
    };
    this.OnPhantomToggleClick = e => {
      var t;
      var n;
      if (this.sti !== 0) {
        t = e.Config;
        this.SetLockState(false);
        if (e.IsNew) {
          HandBookController_1.HandBookController.SendIllustratedReadRequest(1, t.ItemId);
        }
        if (n = ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfigById(t.MonsterId)) {
          if (!e.IsLock) {
            HandBookController_1.HandBookController.SetPhantomMeshShow(n.Id, this.qZt);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 58, "怪物id为:" + t.MonsterId + "对应声骸图鉴数据找不到！");
        }
      }
    };
    this.InitHandBookFetterItem = () => {
      var e = new HandBookFetterItem_1.HandBookFetterItem();
      e.BindFetterToggleCallback(this.Gei);
      this.rti.push(e);
      return e;
    };
    this.Gei = e => {
      var t = e.GetGirdIndex();
      this.ScrollViewFetter.DeselectCurrentGridProxy();
      this.ScrollViewFetter.SelectGridProxy(t);
      this.ScrollViewFetter.RefreshGridProxy(t);
      var t = e.GetPhantomFetter();
      var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
      this.SetNameText(e);
      this.RefreshPhantomFetterLayout(t);
      this.RefreshHandBookPhantomLayout(t);
    };
    this.qZt = undefined;
  }
  OnStart() {
    this.SetDefaultState();
    this.Refresh();
  }
  OnAfterShow() {
    this.bZt = UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName("1062");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  RefreshPhantomContent(e) {
    var t;
    var n;
    var o;
    var i;
    if (this.sti !== 1) {
      this.GetVerticalLayout(18).RootUIComp.SetUIActive(false);
      i = e.Config;
      if (n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, i.Id)) {
        this.SetDateText(n.CreateTime);
      }
      if (e.IsNew) {
        HandBookController_1.HandBookController.SendIllustratedReadRequest(1, i.Id);
      }
      n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.TypeDescrtption);
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Intensity);
      (o = []).push(t, e);
      this.SetNameText(n);
      this.InitInfoItemLayout(o);
      HandBookController_1.HandBookController.SetPhantomMeshShow(i.Id, this.qZt);
      t = [];
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title1);
      n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Descrtption1);
      o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title2);
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Descrtption2);
      t.push(new HandBookDefine_1.HandBookContentItemData(e, n), new HandBookDefine_1.HandBookContentItemData(o, i));
      this.InitContentItemLayout(t);
    }
  }
  RefreshPhantom() {
    this.RefreshCollectText();
    this.GetItem(26).SetUIActive(true);
    var t = ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig();
    var n = [];
    var o = t.length;
    for (let e = 0; e < o; e++) {
      var i;
      var a;
      var r = t[e];
      var s = new HandBookDefine_1.HandBookCommonItemData();
      s.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.TypeDescrtption);
      var h = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfigListByMonsterId(r.Id);
      if (!!h && !(h.length <= 0)) {
        h = h[0];
        i = (a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, h.MonsterId)) === undefined;
        a = a !== undefined && !a.IsRead;
        s.Icon = h.IconSmall;
        s.Config = r;
        s.IsLock = i;
        s.IsNew = a;
        n.push(s);
      }
    }
    this.BZt = [];
    this.InitScrollViewByCommonItem(n);
  }
  GetTabItemData(e) {
    var t = e.length;
    var n = new Array();
    for (let e = 0; e < t; e++) {
      var o = new CommonTabItemBase_1.CommonTabItemData();
      if ((o.Index = e) === 0) {
        o.RedDotName = "PhantomHandBook";
      }
      o.Data = this.TabList[e];
      n.push(o);
    }
    return n;
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(1);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("PhantomHandBookLock");
    this.SetLockText(e);
  }
  RefreshTabComponent() {
    this.oti = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookPageConfig());
    this.oti.sort(this.aei);
    var t = this.oti.length;
    var n = [];
    for (let e = 0; e < t; e++) {
      var o = this.oti[e];
      n.push(new CommonTabData_1.CommonTabData(o.Icon, undefined));
    }
    this.InitTabComponent(n);
    this.SetTabToggleCallBack(this.TabToggleCallBack);
  }
  RefreshPhantomTitle() {
    var e = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(1);
    this.InitCommonTabTitle(e.TitleIcon, new CommonTabTitleData_1.CommonTabTitleData(e.Name));
  }
  RefreshPhantomFetterTitle() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("Fetter");
    var t = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(1);
    this.InitCommonTabTitle(t.TitleIcon, new CommonTabTitleData_1.CommonTabTitleData(e));
  }
  RefreshPhantomFetter() {
    this.GetItem(26).SetUIActive(true);
    this.GetText(23).SetUIActive(false);
    var t = ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomFetterHandBookConfig();
    var n = [];
    var o = t.length;
    for (let e = 0; e < o; e++) {
      var i = t[e];
      var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(i.Id);
      n.push(i);
    }
    this.rti = [];
    this.InitScrollViewByFetterItem(n);
    this.InitToggleState();
    this.GetText(17).SetUIActive(false);
  }
  InitToggleState() {
    var t = this.rti.length;
    for (let e = 0; e < t; e++) {
      var n = this.rti[e];
      if (e === 0) {
        n.SetToggleStateForce(1);
        n.OnSelected(true);
      } else {
        n.SetToggleStateForce(0);
      }
    }
  }
  RefreshHandBookPhantomLayout(e) {
    this.InitHandBookPhantomLayout([]);
    this.RefreshHandBookPhantomItemToggleState();
  }
  RefreshHandBookPhantomItemToggleState() {
    var t = this.nti.length;
    if (t !== 0) {
      for (let e = 0; e < t; e++) {
        var n = this.nti[e];
        if (e === 0) {
          n.SetToggleStateForce(1);
          n.OnSelected(true);
        } else {
          n.SetToggleStateForce(0);
        }
      }
    }
  }
  RefreshPhantomFetterLayout(e) {
    var t = [];
    var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("FetterEffectDescription");
    var o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.EffectDescription);
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("FetterEffectDefineDescription");
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.EffectDefineDescription);
    t.push(new HandBookDefine_1.HandBookContentItemData(n, o), new HandBookDefine_1.HandBookContentItemData(i, e));
    this.InitContentItemLayout(t);
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(this.bZt);
  }
  OnBeforeCreate() {
    UiSceneManager_1.UiSceneManager.InitPhantomObserver();
    this.qZt = UiSceneManager_1.UiSceneManager.GetPhantomObserver();
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyPhantomObserver();
    this.qZt = undefined;
    this.oti = [];
    this.rti = [];
    this.nti = [];
    this.BZt = [];
  }
}
exports.PhantomHandBookView = PhantomHandBookView;
//# sourceMappingURL=PhantomHandBookView.js.map