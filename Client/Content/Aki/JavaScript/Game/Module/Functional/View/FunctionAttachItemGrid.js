"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionAttachItemGrid = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const FunctionItem_1 = require("./FunctionItem");
class FunctionAttachItemGrid extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.P7t = false;
  }
  OnRefreshItem(t) {
    if (t) {
      this.Layout?.SetNeedAnim(this.P7t);
      this.Layout?.RebuildLayoutByDataNew(t);
      this.P7t = false;
    }
  }
  OnSelect() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FunctionGridSelected, this.GetCurrentShowItemIndex());
  }
  OnUnSelect() {}
  OnMoveItem() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem]];
  }
  OnStart() {
    this.Layout = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(0), (t, e, n) => this.x7t(t, e, n), this.GetItem(1));
  }
  x7t(t, e, n) {
    e = new FunctionItem_1.FunctionItem(e);
    e.UpdateItem(t);
    return {
      Key: t,
      Value: e
    };
  }
  SetNeedAnim(t) {
    this.P7t = t;
  }
  OnBeforeDestroy() {
    this.Layout.ClearGridController();
    for (const t of this.Layout.GetLayoutItemList()) {
      this.AddChild(t);
    }
  }
  GetFunctionItem(t) {
    return this.Layout.GetLayoutItemByKey(t);
  }
}
exports.FunctionAttachItemGrid = FunctionAttachItemGrid;
//# sourceMappingURL=FunctionAttachItemGrid.js.map