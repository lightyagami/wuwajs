"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalHandBookView = undefined;
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
const HandBookCommonItem_1 = require("./HandBookCommonItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
class AnimalHandBookView extends HandBookBaseView_1.HandBookBaseView {
  constructor() {
    super(...arguments);
    this.wZt = [];
    this.BZt = [];
    this.bZt = undefined;
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
      HandBookController_1.HandBookController.ClearEffect();
      if (t.IsLock) {
        this.SetLockState(true);
      } else {
        e = t.Config;
        if (t.IsNew) {
          HandBookController_1.HandBookController.SendIllustratedReadRequest(4, e.Id);
        }
        this.SetLockState(false);
        if (n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(4, e.Id)) {
          this.SetDateText(n.CreateTime);
        }
        if (t.IsNew) {
          HandBookController_1.HandBookController.SendIllustratedReadRequest(4, e.Id);
        }
        n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
        this.SetNameText(n);
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Descrtption);
        this.SetTypeText(t);
        this.RefreshInfoItemLayout(e);
        this.RefreshDropItem(e);
        HandBookController_1.HandBookController.SetAnimalMeshShow(e.Id, this.qZt);
      }
    };
    this.Refresh = () => {
      this.wZt = ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
      var n = [];
      var t = this.wZt.length;
      for (let e = 0; e < t; e++) {
        var o = this.wZt[e];
        var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(4, o.Id);
        var a = i === undefined;
        var i = i !== undefined && !i.IsRead;
        var r = new HandBookDefine_1.HandBookCommonItemData();
        r.Icon = o.Icon;
        r.Config = o;
        r.IsLock = a;
        r.IsNew = i;
        n.push(r);
      }
      this.BZt = [];
      this.InitScrollViewByCommonItem(n);
      var e = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(4);
      this.InitCommonTabTitle(e.TitleIcon, new CommonTabTitleData_1.CommonTabTitleData(e.Name));
      this.RefreshCollectText();
    };
    this.OnHandBookRead = (e, n) => {
      if (e === 4) {
        var t = this.BZt.length;
        for (let e = 0; e < t; e++) {
          var o = this.BZt[e];
          if (o.GetData().Config.Id === n) {
            o.SetNewFlagVisible(false);
            return;
          }
        }
      }
    };
    this.qZt = undefined;
  }
  OnStart() {
    this.SetDefaultState();
    this.Refresh();
    this.RefreshLockText();
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
  GetTabItemData(e) {
    var n = new Array();
    var t = this.TabList.length;
    for (let e = 0; e < t; e++) {
      var o = new CommonTabItemBase_1.CommonTabItemData();
      o.Index = e;
      o.Data = this.TabList[e];
      n.push(o);
    }
    return n;
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(4);
    this.SetCollectText(e[0], e[1]);
  }
  RefreshLockText() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("AnimalHandBookLock");
    this.SetLockText(e);
  }
  RefreshDropItem(e) {
    var n = [];
    var t = e.DropItemId;
    var o = t.length;
    for (let e = 0; e < o; e++) {
      var i = t[e];
      n.push([{
        IncId: 0,
        ItemId: i
      }, 0]);
    }
  }
  RefreshInfoItemLayout(e) {
    var n = [];
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TypeDescrtption);
    n.push(e);
    this.InitInfoItemLayout(n);
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
    HandBookController_1.HandBookController.ClearEffect();
    this.wZt = [];
    this.BZt = [];
  }
}
exports.AnimalHandBookView = AnimalHandBookView;
//# sourceMappingURL=AnimalHandBookView.js.map