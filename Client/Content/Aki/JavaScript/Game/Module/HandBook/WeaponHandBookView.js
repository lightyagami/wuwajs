"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponHandBookView = undefined;
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const HandBookBaseView_1 = require("./HandBookBaseView");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
class WeaponHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments);
    this.wZt = [];
    this.BZt = [];
    this.bZt = undefined;
    this.OnHandBookRead = (e, n) => {
      if (e === 3) {
        var t = this.BZt.length;
        for (let e = 0; e < t; e++) {
          var a = this.BZt[e];
          if (a.GetData().Config.Id === n) {
            a.SetNewFlagVisible(false);
            break;
          }
        }
      }
    };
    this.InitHandBookCommonItem = () => {
      var e = new HandBookCommonItem_1.HandBookCommonItem();
      e.BindOnExtendToggleStateChanged(this.OnToggleClick);
      this.BZt.push(e);
      return e;
    };
    this.OnToggleClick = e => {
      var n;
      var t = e.Data;
      var e = e.MediumItemGrid.GridIndex;
      this.ScrollViewCommon.DeselectCurrentGridProxy();
      this.ScrollViewCommon.SelectGridProxy(e);
      this.ScrollViewCommon.RefreshGridProxy(e);
      if (t.IsLock) {
        this.SetLockState(true);
      } else {
        this.SetLockState(false);
        e = t.Config;
        if (n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(3, e.Id)) {
          this.SetDateText(n.CreateTime);
        }
        if (t.IsNew) {
          HandBookController_1.HandBookController.SendIllustratedReadRequest(3, e.Id);
        }
        n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e.Id);
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.WeaponName);
        this.SetNameText(t);
        t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(n.WeaponType);
        this.SetTypeText(t);
        this.RefreshContentItemLayout(e);
        this.RefreshAttributeItemLayout(e);
        HandBookController_1.HandBookController.SetWeaponMeshShow(e.Id, this.qZt);
      }
    };
    this.Refresh = () => {
      this.wZt = ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
      var n = [];
      var t = this.wZt.length;
      for (let e = 0; e < t; e++) {
        var a = this.wZt[e];
        var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(3, a.Id);
        var o = i === undefined;
        var i = i !== undefined && !i.IsRead;
        var r = new HandBookDefine_1.HandBookCommonItemData();
        var s = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(a.Id);
        r.Icon = s.IconSmall;
        r.QualityId = s.QualityId;
        r.ConfigId = a.Id;
        r.Config = a;
        r.IsLock = o;
        r.IsNew = i;
        n.push(r);
      }
      this.InitScrollViewByCommonItem(n);
      var e = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(3);
      this.InitCommonTabTitle(e.TitleIcon, new CommonTabTitleData_1.CommonTabTitleData(e.Name));
      this.RefreshCollectText();
    };
    this.qZt = undefined;
  }
  OnStart() {
    this.SetDefaultState();
    this.Refresh();
    this.RefreshLockText();
  }
  OnAfterShow() {
    this.bZt = UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName("1060");
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
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(3);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHandBookLock");
    this.SetLockText(e);
  }
  RefreshAttributeItemLayout(e) {
    var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e.Id);
    var t = [];
    var a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n.FirstCurve, n.FirstPropId.Value, e.Level, e.Breach);
    var a = {
      Id: n.FirstPropId.Id,
      IsRatio: n.FirstPropId.IsRatio,
      CurValue: a,
      BgActive: true
    };
    var e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n.SecondCurve, n.SecondPropId.Value, e.Level, e.Breach);
    var n = {
      Id: n.SecondPropId.Id,
      IsRatio: n.SecondPropId.IsRatio,
      CurValue: e,
      BgActive: true
    };
    t.push(a, n);
    this.InitAttributeLayout(t);
  }
  RefreshContentItemLayout(e) {
    var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e.Id);
    var t = [];
    var a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponDescrtption");
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.AttributesDescription);
    var o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("EffectDescrtption");
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(n, e.Resonance);
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Desc);
    var n = StringUtils_1.StringUtils.Format(n, ...e);
    t.push(new HandBookDefine_1.HandBookContentItemData(a, i), new HandBookDefine_1.HandBookContentItemData(o, n));
    this.InitContentItemLayout(t);
  }
  GetTabItemData(e) {
    var n = new Array();
    var t = this.TabList.length;
    for (let e = 0; e < t; e++) {
      var a = new CommonTabItemBase_1.CommonTabItemData();
      a.Index = e;
      a.Data = this.TabList[e];
      n.push(a);
    }
    return n;
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(this.bZt);
  }
  OnBeforeCreate() {
    this.qZt = UiSceneManager_1.UiSceneManager.InitWeaponObserver();
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.qZt);
    this.qZt = undefined;
    this.wZt = [];
    this.BZt = [];
  }
}
exports.WeaponHandBookView = WeaponHandBookView;
//# sourceMappingURL=WeaponHandBookView.js.map