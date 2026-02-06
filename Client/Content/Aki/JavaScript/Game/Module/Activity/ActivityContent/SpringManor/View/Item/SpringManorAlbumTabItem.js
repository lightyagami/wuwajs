"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorAlbumTabItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class SpringManorAlbumTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Ryg = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem]];
  }
  SetTitle(e) {
    this.GetText(1)?.ShowTextNew(e);
  }
  InitProgress(e, t) {
    this.Ryg = t;
    this.SetCurProgress(e);
  }
  SetCurProgress(e) {
    this.GetText(2)?.SetText(e + "/" + this.Ryg);
  }
  SetSelected(e) {
    this.GetExtendToggle(0)?.SetToggleState(e ? 1 : 0);
  }
  SetRedDotActive(e) {
    this.GetItem(3)?.SetUIActive(e);
  }
}
exports.SpringManorAlbumTabItem = SpringManorAlbumTabItem;
//# sourceMappingURL=SpringManorAlbumTabItem.js.map