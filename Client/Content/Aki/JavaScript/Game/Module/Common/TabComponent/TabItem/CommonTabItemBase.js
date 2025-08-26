"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTabItemBase = exports.CommonTabItemData = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class CommonTabItemData {
  constructor() {
    this.Index = 0;
    this.Data = undefined;
    this.RedDotName = undefined;
    this.RedDotUid = undefined;
    this.NeedUnBindAllRedDot = true;
  }
}
exports.CommonTabItemData = CommonTabItemData;
class CommonTabItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.CurrentData = undefined;
    this.Fbt = false;
    this.SelectedCallBack = undefined;
    this.Vbt = undefined;
    this.Lke = () => {
      var t;
      return !this.Vbt || (t = this.Vbt(this.GridIndex, this.Fbt), this.Fbt = false, t);
    };
  }
  Refresh(t, e, s) {
    this.CurrentData = t;
    this.OnRefresh(t, e, s);
  }
  OnRefresh(t, e, s) {}
  Clear() {
    this.OnClear();
  }
  OnClear() {}
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return this.GridIndex;
  }
  InitTabItem() {}
  OnStart() {
    this.GetTabToggle().CanExecuteChange.Bind(this.Lke);
  }
  SetSelectedCallBack(t) {
    this.SelectedCallBack = t;
  }
  SetCanExecuteChange(t) {
    this.Vbt = t;
  }
  UpdateTabIcon(t) {
    this.OnUpdateTabIcon(t);
  }
  SetForceSwitch(t, e = false) {
    this.Fbt = true;
    this.SetToggleState(t, e);
  }
  SetToggleState(t, e = false) {
    this.OnSetToggleState(t, e);
  }
}
exports.CommonTabItemBase = CommonTabItemBase;
//# sourceMappingURL=CommonTabItemBase.js.map