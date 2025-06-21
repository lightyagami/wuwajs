"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DamageNumView = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  MOBLIE_FONT_SIZE_SCALE = 1.5;
class DamageNumView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.CTn = new UE.Vector2D, this.J1u = void 0, this.Z1u = void 0, this.euu = [], this.tuu = [], this.iuu = !1
  }
  Init() {
    var i = UiLayer_1.UiLayer.GetBattleViewUnit(0);
    this.CreateThenShowByResourceIdAsync("UiItem_DamageView_Num_Prefab", i).then(void 0)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIDynamicBatchMesh],
      [8, UE.UIItem]
    ]
  }
  OnStart() {
    this.J1u = this.GetDynamicBatchMesh(7), this.Z1u = this.GetItem(8);
    for (let i = 0; i <= 6; i++) {
      var t = this.GetText(i),
        e = t.GetOwner().GetComponentByClass(UE.UITextAdditionalUVModifier.StaticClass());
      this.euu.push(t), this.tuu.push(e)
    }
    Info_1.Info.IsMobilePlatform() && this.RefreshMobileFontSize()
  }
  RefreshMobileFontSize() {
    if (!this.iuu) {
      this.iuu = !0;
      for (const t of this.euu) {
        var i = Math.floor(t.GetSize() * MOBLIE_FONT_SIZE_SCALE);
        t.SetFontSize(i)
      }
    }
  }
  PlayNumBatch(i, t, e, s = 1) {
    var a, h;
    if (this.Z1u) return DamageNumView.MFt.Start(), a = this.euu[s - 1], s = this.tuu[s - 1], this.Z1u.SetAnchorOffset(t), t = UE.LGUIBPLibrary.GetUIWorldPosForceUpdate(this.Z1u), h = a.GetUIWorldPosition(), this.CTn.X = t.X - h.X, this.CTn.Y = t.Z - h.Z, s.SetAdditionalUV(1, this.CTn), a.SetText(i), a.SetColor(e), this.CTn.X = UE.GameplayStatics.GetUnpausedTimeSeconds(this.RootActor), this.CTn.Y = 0, s.SetAdditionalUV(0, this.CTn), t = this.J1u?.AddBatchGeometryRenderable(a), DamageNumView.MFt.Stop(), t
  }
  UpdateDamageLocation(i, t, e = 1) {
    this.Z1u && (this.Z1u.SetAnchorOffset(t), t = UE.LGUIBPLibrary.GetUIWorldPosForceUpdate(this.Z1u), e = this.euu[e - 1].GetUIWorldPosition(), this.CTn.X = t.X - e.X, this.CTn.Y = t.Z - e.Z, i.SetAdditionalUV(1, this.CTn))
  }
}(exports.DamageNumView = DamageNumView).MFt = Stats_1.Stat.Create("[DamageNumView]InitializeDamageView");
//# sourceMappingURL=DamageNumView.js.map