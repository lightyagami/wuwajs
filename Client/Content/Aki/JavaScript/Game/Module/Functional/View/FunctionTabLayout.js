"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionTabLayout = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class FunctionTabItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  SetToggleState(t) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, false);
  }
}
class FunctionTabLayout extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.B7t = undefined;
    this.b7t = -1;
    this.q7t = 0;
    this.C5e = (t, e, s) => {
      return {
        Key: s,
        Value: new FunctionTabItem(e)
      };
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem]];
  }
  OnStart() {
    this.B7t = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(0), this.C5e, this.GetItem(1));
  }
  OnBeforeDestroy() {
    this.B7t.ClearChildren();
  }
  RefreshTab(t) {
    if ((this.q7t = t) > 1) {
      this.SetActive(true);
      this.B7t.RebuildLayoutByDataNew(undefined, t);
    } else {
      this.SetActive(false);
    }
  }
  SetToggleSelectByIndex(t) {
    if (!(this.q7t <= 1) && this.b7t !== t) {
      if (this.b7t !== -1) {
        const e = this.B7t.GetLayoutItemByKey(this.b7t);
        e.SetToggleState(false);
      }
      const e = this.B7t.GetLayoutItemByKey(t);
      e.SetToggleState(true);
      this.b7t = t;
    }
  }
}
exports.FunctionTabLayout = FunctionTabLayout;
//# sourceMappingURL=FunctionTabLayout.js.map