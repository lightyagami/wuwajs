"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseHeadStateView = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDefenseHeadStateView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.nKu = undefined;
    this.sKu = undefined;
    this.aKu = undefined;
    this.nYu = [];
    this.Lz = Vector_1.Vector.Create();
    this.CTn = new UE.Vector2D();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite]];
  }
  OnStart() {
    this.nKu = this.GetSprite(0);
    this.sKu = this.GetSprite(1);
    this.aKu = this.GetSprite(2);
    this.sYu();
  }
  sYu() {
    var s = UE.LGUIBPLibrary.GetComponentsInChildrenWithHirerarchyIndex(this.RootActor, UE.UITextAdditionalUVModifier.StaticClass(), false);
    var i = s.Num();
    for (let t = 0; t < i; t++) {
      this.nYu.push(s.Get(t));
    }
  }
  Refresh(t, s) {
    t.Position.Subtraction(s, this.Lz);
    this.CTn.Set(this.Lz.X, this.Lz.Y);
    for (const r of this.nYu) {
      r.SetAdditionalUV(0, this.CTn);
    }
    this.CTn.Set(this.Lz.Z, t.ActorScale.X);
    for (const o of this.nYu) {
      o.SetAdditionalUV(1, this.CTn);
    }
    for (const a of this.nYu) {
      var i = a.GetOwner();
      let t = i.GetUIItem()?.GetPivot().X;
      if (t == null) {
        t = 0;
      }
      let s = i.GetUIItem()?.GetWidth();
      if (s == null) {
        s = 1;
      }
      this.CTn.Set(t, s);
      a.SetAdditionalUV(2, this.CTn);
      this.CTn.Set(1, 0);
      a.SetAdditionalUV(-1, this.CTn);
    }
    var s = this.nKu?.GetOwner()?.GetComponentByClass(UE.UITextAdditionalUVModifier.StaticClass());
    var e = this.sKu?.GetOwner()?.GetComponentByClass(UE.UITextAdditionalUVModifier.StaticClass());
    var h = this.aKu?.GetOwner()?.GetComponentByClass(UE.UITextAdditionalUVModifier.StaticClass());
    this.CTn.Set(t.HpPercent, 0);
    s.SetAdditionalUV(-1, this.CTn);
    this.CTn.Set(t.HpBufferPercent, 0);
    e.SetAdditionalUV(-1, this.CTn);
    this.CTn.Set(t.ShieldPercent, 0);
    h.SetAdditionalUV(-1, this.CTn);
  }
}
exports.TowerDefenseHeadStateView = TowerDefenseHeadStateView;
//# sourceMappingURL=TowerDefenseHeadStateView.js.map