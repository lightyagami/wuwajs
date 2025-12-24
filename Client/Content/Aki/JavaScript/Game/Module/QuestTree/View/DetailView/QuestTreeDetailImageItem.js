"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeDetailImageItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
class QuestTreeDetailImageItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Pe = t;
    this.PKd = 0;
    this.hai = 0;
    this.e3d = () => {
      if (!(this.Pe.State < 4)) {
        UiManager_1.UiManager.OpenView("QuestTreeNodeImageView", this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[3, this.e3d]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetTexture(1);
    this.PKd = t.GetWidth();
    this.hai = t.GetHeight();
    await this.SetTextureAsync(this.Pe.ImageLarge, t);
    this.AKd();
  }
  OnStart() {
    this.brd();
  }
  RefreshInfo(t) {
    this.DKd(t);
  }
  async DKd(t) {
    this.Pe = t;
    await this.SetTextureAsync(this.Pe.ImageSmall, this.GetTexture(1));
    this.AKd();
    this.brd();
  }
  brd() {
    this.GetItem(2).SetUIActive(this.Pe.State === 1);
    this.GetItem(4).SetUIActive(this.Pe.State === 3);
    this.GetItem(5).SetUIActive(this.Pe.State >= 4);
  }
  AKd() {
    var t;
    var e;
    var s;
    var i = this.GetTexture(1);
    var h = i.GetTexture();
    if (h) {
      s = this.PKd;
      t = this.hai;
      e = h.Blueprint_GetSizeX();
      h = h.Blueprint_GetSizeY();
      s = Math.max(s / e, t / h);
      i.SetWidth(e * s);
      i.SetHeight(h * s);
    }
  }
}
exports.QuestTreeDetailImageItem = QuestTreeDetailImageItem;
//# sourceMappingURL=QuestTreeDetailImageItem.js.map