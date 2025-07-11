"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedRingSubItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BigStuffedRingSubItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.RingId = e;
    this.RingConfig = t;
    this.Type = undefined;
    this.TextureRing = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture]];
  }
  OnStart() {
    this.TextureRing = this.GetTexture(1);
  }
  OnBeforeDestroy() {
    this.TextureRing = undefined;
  }
}
exports.BigStuffedRingSubItem = BigStuffedRingSubItem;
//# sourceMappingURL=BigStuffedRingSubItem.js.map