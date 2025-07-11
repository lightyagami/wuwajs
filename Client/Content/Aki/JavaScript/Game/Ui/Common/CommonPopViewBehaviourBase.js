"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonPopViewBase = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonCurrencyItemListComponent_1 = require("../../Module/Common/CommonCurrencyItemListComponent");
const UiPanelBase_1 = require("../Base/UiPanelBase");
const UiManager_1 = require("../UiManager");
class CommonPopViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ucr = undefined;
    this.ccr = true;
    this.mcr = undefined;
    this.ContentItem = undefined;
    this.ViewInfo = undefined;
    this.OnClickBtnBtnCall = () => {};
    this.dcr = false;
    this.OnClickMaskButton = () => {
      if (this.ccr) {
        this.TryHideSelf();
      }
    };
    this.OnClickCloseBtn = () => {
      this.TryHideSelf();
    };
  }
  AttachItem(t, e) {
    var i;
    var s;
    var o;
    var n;
    var r;
    var a;
    var h = this.GetAttachParent();
    if (h && (i = t.GetAnchorHAlign(), s = t.GetAnchorVAlign(), o = t.GetStretchBottom(), n = t.GetStretchLeft(), r = t.GetStretchRight(), a = t.GetStretchTop(), t.SetUIParent(h), t.SetAnchorAlign(i, s), t.SetStretchBottom(o), t.SetStretchLeft(n), t.SetStretchRight(r), t.SetStretchTop(a), e !== t)) {
      e.SetAnchorAlign(i, s);
      e.SetStretchBottom(o);
      e.SetStretchLeft(n);
      e.SetStretchRight(r);
      e.SetStretchTop(a);
    }
  }
  GetAttachParent() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 27, "子类没有重写获取父物体方法");
    }
  }
  GetCostParent() {}
  SetViewInfo(t) {
    this.ViewInfo = t;
  }
  SetPopupViewBase() {
    this.mcr = this;
  }
  TryHideSelf() {
    this.Ccr();
  }
  OverrideBackBtnCallBack(t) {
    this.OnClickBtnBtnCall = t;
    this.dcr = true;
  }
  Ccr() {
    if (this.dcr) {
      this.OnClickBtnBtnCall();
    } else {
      UiManager_1.UiManager.CloseView(this.ViewInfo.Name);
    }
  }
  SetCloseBtnInteractive(t) {
    this.mcr.OnSetCloseBtnInteractive(t);
  }
  SetHelpButtonActive(t) {
    this.mcr.OnSetHelpButtonActive(t);
  }
  SetTitleByTextIdAndArg(t, ...e) {
    this.mcr.OnSetTitleByTextIdAndArg(t, e);
  }
  SetBackBtnShowState(t) {
    this.mcr.OnSetBackBtnShowState(t);
  }
  RefreshCost(t) {
    this.mcr.OnRefreshCost(t);
  }
  SetMaskResponsibleState(t) {
    this.ccr = t;
  }
  async SetCurrencyItemList(t) {
    var e = this.GetCostParent();
    if (e) {
      this.ucr ||= new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(e);
      await this.ucr.SetCurrencyItemList(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 27, "找不到CostParent");
    }
  }
  GetCurrencyComponent() {
    return this.ucr;
  }
  SetTitleVisible(t) {}
  SetTitleText(t) {}
  SetTexBgVisible(t) {}
}
exports.CommonPopViewBase = CommonPopViewBase;
//# sourceMappingURL=CommonPopViewBehaviourBase.js.map