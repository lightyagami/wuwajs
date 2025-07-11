"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterHandBookView = undefined;
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const HandBookBaseView_1 = require("./HandBookBaseView");
const HandBookCommonTypeItem_1 = require("./HandBookCommonTypeItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
class MonsterHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments);
    this.eti = [];
    this.tti = [];
    this.bZt = undefined;
    this.gU = false;
    this.iti = undefined;
    this.OnHandBookRead = (e, n) => {
      if (e === 0) {
        var t = this.tti.length;
        for (let e = 0; e < t; e++) {
          var i = this.tti[e].GetHandBookCommonItemList();
          var o = i.length;
          for (let e = 0; e < o; e++) {
            var a = i[e];
            if (a.GetData().Config.Id === n) {
              a.SetNewFlagVisible(false);
              return;
            }
          }
        }
      }
    };
    this.Refresh = () => {
      var n = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookTypeConfig());
      n.sort(this.aei);
      var t = n.length;
      var i = [];
      for (let e = 0; e < t; e++) {
        var o = n[e];
        var a = o.Id;
        var r = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigByType(a);
        this.eti.push(r);
        var s = r.length;
        var m = [];
        for (let e = 0; e < s; e++) {
          var h = r[e];
          var _ = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(h.Id);
          var g = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(0, h.Id);
          var v = g === undefined;
          var g = g !== undefined && !g.IsRead;
          var C = new HandBookDefine_1.HandBookCommonItemData();
          C.Icon = _;
          C.Config = h;
          C.IsLock = v;
          C.IsNew = g;
          C.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Descrtption);
          m.push(C);
        }
        i.push(m);
      }
      this.tti = [];
      this.gU = false;
      this.InitScrollViewByCommonTypeItem(i);
      var e = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(0);
      this.InitCommonTabTitle(e.TitleIcon, new CommonTabTitleData_1.CommonTabTitleData(e.Name));
      this.gU = true;
      if (this.tti.length > 0) {
        this.iti = this.tti[0].SetToggleChecked();
      }
    };
    this.InitHandBookCommonTypeItem = (e, n, t) => {
      var i = new HandBookCommonTypeItem_1.HandBookCommonTypeItem();
      i.Initialize(n);
      i.BindToggleCallback(this.OnToggleClick);
      i.Refresh(e, false, t);
      this.tti.push(i);
      return {
        Key: t,
        Value: i
      };
    };
    this.OnToggleClick = (e, t) => {
      if (this.gU) {
        this.iti?.SetSelected(false);
        (this.iti = t).SetSelected(true);
        t = e.Config;
        if (e.IsLock) {
          this.SetLockState(true);
        } else {
          this.SetLockState(false);
          if (e.IsNew) {
            HandBookController_1.HandBookController.SendIllustratedReadRequest(0, t.Id);
          }
          var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(t.Id);
          var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
          this.SetNameText(i);
          var i = [];
          var o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.TypeDescrtption);
          i.push(o);
          this.InitInfoItemLayout(i);
          var o = [];
          var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Descrtption);
          var a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("FightSkill");
          var r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.FightSkillDescrtption);
          o.push(new HandBookDefine_1.HandBookContentItemData("", i), new HandBookDefine_1.HandBookContentItemData(a, r));
          this.InitContentItemLayout(o);
          var s = [];
          var m = t.PhantomItem;
          var h = m.length;
          for (let e = 0; e < h; e++) {
            var _ = m[e];
            s.push([{
              IncId: 0,
              ItemId: _
            }, 0]);
          }
          var g = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterPerch(e.Id);
          var v = g.length;
          let n = "";
          for (let e = 0; e < v; e++) {
            var C = g[e];
            if (e === v - 1) {
              n += C;
            } else {
              n = n + C + ",";
            }
          }
          i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(0, t.Id);
          this.SetKillText(i.Num);
          HandBookController_1.HandBookController.SetMonsterMeshShow(t.Id, this.qZt);
        }
      }
    };
    this.aei = (e, n) => e.Id - n.Id;
    this.qZt = undefined;
  }
  OnStart() {
    this.SetDefaultState();
    this.RefreshCollectText();
    this.RefreshLockText();
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
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(0);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("MonsterHandBookLock");
    this.SetLockText(e);
  }
  ResetAllToggleState(n) {
    var t = this.tti.length;
    for (let e = 0; e < t; e++) {
      var i = this.tti[e];
      if (e !== n) {
        i.ResetAllToggleState();
      }
    }
  }
  GetTabItemData(e) {
    var n = new Array();
    var t = this.TabList.length;
    for (let e = 0; e < t; e++) {
      var i = new CommonTabItemBase_1.CommonTabItemData();
      i.Index = e;
      i.Data = this.TabList[e];
      n.push(i);
    }
    return n;
  }
  OnBeforePlayCloseSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(this.bZt);
  }
  OnBeforeCreate() {
    UiSceneManager_1.UiSceneManager.InitHandBookObserver();
    this.qZt = UiSceneManager_1.UiSceneManager.GetHandBookObserver();
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyHandBookObserver();
    this.qZt = undefined;
    this.eti = [];
    this.tti = [];
    this.bZt = undefined;
  }
}
exports.MonsterHandBookView = MonsterHandBookView;
//# sourceMappingURL=MonsterHandBookView.js.map