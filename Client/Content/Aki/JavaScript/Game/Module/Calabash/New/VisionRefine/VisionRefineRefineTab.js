"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineRefineTabData = exports.VisionRefineRefineTab = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionRefineRefineTab extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eZs = undefined;
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.eTt = () => {
      this.eZs?.OnClick?.();
    };
    this.j7g = () => !this.eZs?.CanChangeExecute || this.eZs.CanChangeExecute(this.eZs.RefineType);
  }
  Refresh(i, e, s) {
    if ((this.eZs = i).TabTextId !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TabTextId);
    }
    var t = this.GetExtendToggle(0);
    if (t !== undefined) {
      if (!t.CanExecuteChange.IsBound()) {
        t.CanExecuteChange.Bind(this.j7g);
      }
      t.SetToggleStateForce(i.IsChosen ? 1 : 0, false);
    }
  }
  Clear() {
    this.eZs = undefined;
    this.DisplayIndex = 0;
    this.GridIndex = 0;
  }
  OnSelected(i) {
    if (this.eZs !== undefined) {
      this.eZs.IsChosen = true;
    }
    var e = this.GetExtendToggle(0);
    if (e !== undefined) {
      e.SetToggleStateForce(1, i);
    }
  }
  OnDeselected(i) {
    if (this.eZs !== undefined) {
      this.eZs.IsChosen = false;
    }
    var e = this.GetExtendToggle(0);
    if (e !== undefined) {
      e.SetToggleStateForce(0, i);
    }
  }
  GetKey(i, e) {
    return i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  CheckChosen(i) {
    return i === this.eZs?.RefineType;
  }
}
exports.VisionRefineRefineTab = VisionRefineRefineTab;
class VisionRefineRefineTabData {
  constructor() {
    this.IsChosen = false;
    this.RefineType = 0;
    this.TabTextId = undefined;
    this.OnClick = undefined;
    this.CanChangeExecute = undefined;
  }
}
exports.VisionRefineRefineTabData = VisionRefineRefineTabData;
//# sourceMappingURL=VisionRefineRefineTab.js.map