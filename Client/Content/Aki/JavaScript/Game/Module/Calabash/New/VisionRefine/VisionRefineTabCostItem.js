"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineTabCostItemData = exports.VisionRefineTabCostItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionRefineTabCostItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eZs = undefined;
    this.DisplayIndex = 0;
    this.GridIndex = 0;
    this.ScrollViewDelegate = undefined;
    this.eTt = () => {
      this.eZs?.OnClick?.();
    };
    this.j7g = () => !this.eZs?.CanChangeExecute || this.eZs.CanChangeExecute(this.eZs.CostType);
  }
  Clear() {
    this.eZs = undefined;
    this.DisplayIndex = 0;
    this.GridIndex = 0;
  }
  GetKey(i, t) {
    return i.CostType;
  }
  OnDeselected(i) {
    if (this.eZs !== undefined) {
      this.eZs.IsChosen = false;
    }
    var t = this.GetExtendToggle(0);
    if (t !== undefined) {
      t.SetToggleState(0, i);
    }
  }
  OnSelected(i) {
    if (this.eZs !== undefined) {
      this.eZs.IsChosen = true;
    }
    var t = this.GetExtendToggle(0);
    if (t !== undefined) {
      t.SetToggleState(1, i);
    }
  }
  Refresh(i, t, s) {
    if ((this.eZs = i).TabTextId !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TabTextId);
    }
    var e = this.GetExtendToggle(0);
    if (e !== undefined) {
      e.SetToggleState(i.IsChosen ? 1 : 0, false);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(this.j7g);
  }
  CheckChosen(i) {
    return i === this.eZs?.CostType;
  }
}
exports.VisionRefineTabCostItem = VisionRefineTabCostItem;
class VisionRefineTabCostItemData {
  constructor() {
    this.IsChosen = false;
    this.CostType = 0;
    this.TabTextId = undefined;
    this.OnClick = undefined;
    this.CanChangeExecute = undefined;
  }
}
exports.VisionRefineTabCostItemData = VisionRefineTabCostItemData;
//# sourceMappingURL=VisionRefineTabCostItem.js.map