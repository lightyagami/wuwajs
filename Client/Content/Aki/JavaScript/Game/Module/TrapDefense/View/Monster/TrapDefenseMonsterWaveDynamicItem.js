"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterWaveDynamicItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TrapDefenseMonsterWaveDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IGe = undefined;
    this.nHd = 0;
    this.sHd = 0;
    this.aHd = 0;
    this.hHd = 0;
    this.lHd = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIArtText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIGridLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIVerticalLayout]];
  }
  GetItemSize(t) {
    if (this.IGe === undefined) {
      this.IGe = Vector2D_1.Vector2D.Create();
    }
    this._Hd();
    var s = t.GetMonsterDataList().length;
    var s = Math.ceil(s / this.hHd);
    var t = t.IsEndlessStart ? this.aHd : 0;
    var t = this.sHd + t + (s - 1) * this.lHd;
    this.IGe.Set(this.nHd, t);
    return this.IGe.ToUeVector2D(true);
  }
  _Hd() {
    var t;
    var s;
    var e;
    var i;
    if (!this.nHd) {
      s = this.GetItem(10);
      t = this.GetGridLayout(7);
      i = this.GetItem(9);
      e = this.GetVerticalLayout(12);
      this.nHd = this.RootItem.GetWidth() - 10;
      this.sHd = s.GetHeight();
      this.aHd = e.Padding.Top + e.Padding.Bottom + i.GetHeight();
      s = t.CellSize;
      e = t.Padding;
      i = t.Spacing;
      this.lHd = s.Y + i.Y;
      this.hHd = Math.floor((this.nHd - e.Left - e.Right + i.X) / this.lHd);
    }
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner());
  }
  ClearItem() {}
}
exports.TrapDefenseMonsterWaveDynamicItem = TrapDefenseMonsterWaveDynamicItem;
//# sourceMappingURL=TrapDefenseMonsterWaveDynamicItem.js.map