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
    this.M6d = 0;
    this.hai = 0;
    this.Rqd = () => {
      if (!(this.Pe.State < 4)) {
        UiManager_1.UiManager.OpenView("QuestTreeNodeImageView", this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Rqd]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetTexture(1);
    this.M6d = t.GetWidth();
    this.hai = t.GetHeight();
    await this.SetTextureAsync(this.Pe.ImageLarge, t);
    this.E6d();
  }
  OnStart() {
    this.brd();
  }
  RefreshInfo(t) {
    this.I6d(t);
  }
  async I6d(t) {
    this.Pe = t;
    await this.SetTextureAsync(this.Pe.ImageSmall, this.GetTexture(1));
    this.E6d();
    this.brd();
  }
  brd() {
    this.GetItem(2).SetUIActive(this.Pe.State === 1);
    this.GetItem(4).SetUIActive(this.Pe.State === 3);
    this.GetItem(5).SetUIActive(this.Pe.State >= 4);
  }
  E6d() {
    var t;
    var e;
    var s;
    var i = this.GetTexture(1);
    var h = i.GetTexture();
    if (h) {
      s = this.M6d;
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