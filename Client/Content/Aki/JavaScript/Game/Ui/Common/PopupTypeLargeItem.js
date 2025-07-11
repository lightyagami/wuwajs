"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupTypeLargeItem = undefined;
const UE = require("ue");
const CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase");
const PopupCaptionItem_1 = require("./PopupCaptionItem");
class PopupTypeLargeItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super(...arguments);
    this.n6t = undefined;
  }
  GetAttachParent() {
    return this.GetItem(1);
  }
  GetCostParent() {
    return this.GetItem(2);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickCloseBtn]];
  }
  OnStart() {
    this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(3));
    this.n6t.SetCloseCallBack(() => {
      this.TryHideSelf();
    });
  }
  OnSetHelpButtonActive(t) {
    this.n6t.SetHelpBtnActive(t);
  }
  OnSetTitleByTextIdAndArg(t, ...e) {
    this.n6t.SetTitleByTextIdAndArg(t, e);
  }
  OnSetBackBtnShowState(t) {
    this.n6t.SetCloseBtnActive(t);
  }
  OnSetCloseBtnInteractive(t) {}
  OnRefreshCost(t) {
    t.forEach(t => {
      t.GetRootItem().SetUIParent(this.GetItem(2));
    });
  }
}
exports.PopupTypeLargeItem = PopupTypeLargeItem;
//# sourceMappingURL=PopupTypeLargeItem.js.map