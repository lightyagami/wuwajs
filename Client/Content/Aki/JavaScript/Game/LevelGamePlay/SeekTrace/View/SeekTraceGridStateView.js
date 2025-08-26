"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceGridStateView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class SeekTraceGridStateView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  Refresh(e, s, t) {
    var r = this.GetItem(0);
    var a = this.GetItem(1);
    switch (e) {
      case 0:
        r.SetUIActive(false);
        a.SetUIActive(false);
        break;
      case 1:
        r.SetUIActive(false);
        a.SetUIActive(true);
        break;
      case 2:
        r.SetUIActive(true);
        r.SetChangeColor(true, r.changeColor);
        a.SetUIActive(true);
        break;
      case 3:
        r.SetUIActive(true);
        r.SetChangeColor(false, r.changeColor);
        a.SetUIActive(false);
    }
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, s) {
    return this.GridIndex;
  }
}
exports.SeekTraceGridStateView = SeekTraceGridStateView;
//# sourceMappingURL=SeekTraceGridStateView.js.map