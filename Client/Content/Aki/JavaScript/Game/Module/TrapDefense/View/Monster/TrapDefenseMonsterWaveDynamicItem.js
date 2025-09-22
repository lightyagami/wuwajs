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
    this.V4d = 0;
    this.j4d = 0;
    this.H4d = 0;
    this.$4d = 0;
    this.W4d = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIArtText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIGridLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIVerticalLayout]];
  }
  GetItemSize(t) {
    if (this.IGe === undefined) {
      this.IGe = Vector2D_1.Vector2D.Create();
    }
    this.Q4d();
    var s = t.GetMonsterDataList().length;
    var s = Math.ceil(s / this.$4d);
    var t = t.IsEndlessStart ? this.H4d : 0;
    var t = this.j4d + t + (s - 1) * this.W4d;
    this.IGe.Set(this.V4d, t);
    return this.IGe.ToUeVector2D(true);
  }
  Q4d() {
    var t;
    var s;
    var e;
    var i;
    if (!this.V4d) {
      s = this.GetItem(10);
      t = this.GetGridLayout(7);
      i = this.GetItem(9);
      e = this.GetVerticalLayout(12);
      this.V4d = this.RootItem.GetWidth() - 10;
      this.j4d = s.GetHeight();
      this.H4d = e.Padding.Top + e.Padding.Bottom + i.GetHeight();
      s = t.CellSize;
      e = t.Padding;
      i = t.Spacing;
      this.W4d = s.Y + i.Y;
      this.$4d = Math.floor((this.V4d - e.Left - e.Right + i.X) / this.W4d);
    }
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner());
  }
  ClearItem() {}
}
exports.TrapDefenseMonsterWaveDynamicItem = TrapDefenseMonsterWaveDynamicItem;
//# sourceMappingURL=TrapDefenseMonsterWaveDynamicItem.js.map