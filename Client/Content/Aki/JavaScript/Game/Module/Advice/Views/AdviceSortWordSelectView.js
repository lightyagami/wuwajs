"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceSortWordSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const AdviceWordItem_1 = require("./AdviceWordItem");
const AdviceWordTypeItem_1 = require("./AdviceWordTypeItem");
const WAITUPDATECOUNT = 1;
class AdviceSortWordSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.hje = undefined;
    this.kHe = undefined;
    this.FHe = false;
    this.VHe = 0;
    this.lje = false;
    this.jHe = 0;
    this.WHe = (e, i, t) => {
      i = new AdviceWordTypeItem_1.AdviceWordTypeItem(i);
      i.UpdateItem(e);
      return {
        Key: t,
        Value: i
      };
    };
    this.KHe = (e, i, t) => {
      i = new AdviceWordItem_1.AdviceWordItem(i);
      i.UpdateItem(e);
      return {
        Key: t,
        Value: i
      };
    };
    this.L3e = () => {
      var e = ModelManager_1.ModelManager.AdviceModel;
      e.CurrentWordMap.set(e.CurrentSelectWordIndex, e.PreSelectSortWordId);
      this.CloseMe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectAdviceWord);
    };
    this.uHe = () => {
      this.CloseMe();
    };
    this.QHe = () => {
      var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
      const i = new Array();
      e.forEach(e => {
        i.push(e.Id);
      });
      this.hje.RefreshByData(i);
      this.XHe();
      this.jHe = 0;
      this.hje.UnBindLateUpdate();
      this.lje = true;
      this.hje.BindLateUpdate(this._je);
    };
    this._je = e => {
      var i;
      if (this.lje && this.jHe >= WAITUPDATECOUNT) {
        this.lje = false;
        i = this.YHe();
        this.GetScrollViewWithScrollbar(0).SetScrollProgress(i);
        this.hje.UnBindLateUpdate();
      }
      this.jHe++;
    };
    this.XHe = () => {
      var e = ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId;
      var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordConfigsByType(e);
      const i = new Array();
      e.forEach(e => {
        i.push(e.Id);
      });
      this.kHe.RefreshByData(i);
      this.VHe = 0;
      this.kHe.UnBindLateUpdate();
      this.FHe = true;
      this.kHe.BindLateUpdate(this.JHe);
    };
    this.JHe = e => {
      var i;
      if (this.FHe && this.VHe >= WAITUPDATECOUNT) {
        this.FHe = false;
        i = this.zHe();
        this.GetScrollViewWithScrollbar(2).SetScrollProgress(i);
      }
      if (this.VHe >= WAITUPDATECOUNT + 1) {
        i = this.zHe();
        this.GetScrollScrollbar(6).SetValue(i);
        this.kHe.UnBindLateUpdate();
      }
      this.VHe++;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [5, UE.UIButtonComponent], [4, UE.UIButtonComponent], [6, UE.UIScrollbarComponent], [7, UE.UIText]];
    this.BtnBindInfo = [[4, this.uHe], [5, this.L3e]];
  }
  OnStart() {
    this.hje = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.WHe);
    this.kHe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(2), this.KHe);
    var e;
    var i = this.kHe.TempOriginalItem;
    if (i && (e = (i = i.GetOwner()).GetComponentByClass(UE.UIButtonComponent.StaticClass()))) {
      i.K2_DestroyComponent(e);
    }
    ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId = ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortTypeId;
    ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId = ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortWordId;
    this.QHe();
    this.mGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickAdviceSort, this.XHe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickAdviceSort, this.XHe);
  }
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "AdviceSelectWord");
  }
  YHe() {
    var i = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
    let t = 0;
    for (let e = 0; e < i.length; e++) {
      if (i[e].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId) {
        t = e;
        break;
      }
    }
    return t / (i.length - 1);
  }
  zHe() {
    var e = ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId;
    var i = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordConfigsByType(e);
    let t = 0;
    for (let e = 0; e < i.length; e++) {
      if (i[e].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId) {
        t = e;
        break;
      }
    }
    return t / (i.length - 1);
  }
  OnBeforeDestroy() {
    if (this.hje) {
      this.hje.ClearChildren();
      this.hje = undefined;
    }
    if (this.kHe) {
      this.kHe.ClearChildren();
      this.kHe = undefined;
    }
  }
}
exports.AdviceSortWordSelectView = AdviceSortWordSelectView;
//# sourceMappingURL=AdviceSortWordSelectView.js.map