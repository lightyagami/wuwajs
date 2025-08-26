"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageNumView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Stats_1 = require("../../../../Core/Common/Stats");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const MOBLIE_FONT_SIZE_SCALE = 1.5;
class DamageNumView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CTn = new UE.Vector2D();
    this.t7c = undefined;
    this.i7c = undefined;
    this.r7c = [];
    this.o7c = [];
    this.n7c = false;
  }
  Init() {
    var i = UiLayer_1.UiLayer.GetBattleViewUnit(0);
    this.CreateThenShowByResourceIdAsync("UiItem_DamageView_Num_Prefab", i).then(undefined);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIDynamicBatchMesh], [8, UE.UIItem]];
  }
  OnStart() {
    this.t7c = this.GetDynamicBatchMesh(7);
    this.i7c = this.GetItem(8);
    for (let i = 0; i <= 6; i++) {
      var t = this.GetText(i);
      var e = t.GetOwner().GetComponentByClass(UE.UITextAdditionalUVModifier.StaticClass());
      this.r7c.push(t);
      this.o7c.push(e);
    }
    if (Info_1.Info.IsMobilePlatform()) {
      this.RefreshMobileFontSize();
    }
  }
  RefreshMobileFontSize() {
    if (!this.n7c) {
      this.n7c = true;
      for (const t of this.r7c) {
        var i = Math.floor(t.GetSize() * MOBLIE_FONT_SIZE_SCALE);
        t.SetFontSize(i);
      }
    }
  }
  PlayNumBatch(i, t, e, s = 1) {
    var a;
    var h;
    if (this.i7c) {
      DamageNumView.MFt.Start();
      a = this.r7c[s - 1];
      s = this.o7c[s - 1];
      this.i7c.SetAnchorOffset(t);
      t = UE.LGUIBPLibrary.GetUIWorldPosForceUpdate(this.i7c);
      h = a.GetUIWorldPosition();
      this.CTn.X = t.X - h.X;
      this.CTn.Y = t.Z - h.Z;
      s.SetAdditionalUV(1, this.CTn);
      a.SetText(i);
      a.SetColor(e);
      this.CTn.X = UE.GameplayStatics.GetUnpausedTimeSeconds(this.RootActor);
      this.CTn.Y = 0;
      s.SetAdditionalUV(0, this.CTn);
      t = this.t7c?.AddBatchGeometryRenderable(a);
      DamageNumView.MFt.Stop();
      return t;
    }
  }
  UpdateDamageLocation(i, t, e = 1) {
    if (this.i7c) {
      this.i7c.SetAnchorOffset(t);
      t = UE.LGUIBPLibrary.GetUIWorldPosForceUpdate(this.i7c);
      e = this.r7c[e - 1].GetUIWorldPosition();
      this.CTn.X = t.X - e.X;
      this.CTn.Y = t.Z - e.Z;
      i.SetAdditionalUV(1, this.CTn);
    }
  }
}
(exports.DamageNumView = DamageNumView).MFt = Stats_1.Stat.Create("[DamageNumView]InitializeDamageView");
//# sourceMappingURL=DamageNumView.js.map