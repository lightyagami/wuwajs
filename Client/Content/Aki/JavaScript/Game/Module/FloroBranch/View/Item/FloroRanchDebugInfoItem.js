"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDebugInfoItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class FloroRanchDebugInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e, s, t) {
    this.GetText(0).SetText(e);
  }
  async RefreshAsync(e, s, t) {}
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, s) {}
}
exports.FloroRanchDebugInfoItem = FloroRanchDebugInfoItem;
//# sourceMappingURL=FloroRanchDebugInfoItem.js.map