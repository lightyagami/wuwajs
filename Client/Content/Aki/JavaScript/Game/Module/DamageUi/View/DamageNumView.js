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
    this.eSu = undefined;
    this.tSu = undefined;
    this.iSu = [];
    this.rSu = [];
    this.oSu = false;
  }
  Init() {
    var i = UiLayer_1.UiLayer.GetBattleViewUnit(0);
    this.CreateThenShowByResourceIdAsync("UiItem_DamageView_Num_Prefab", i).then(undefined);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIDynamicBatchMesh], [8, UE.UIItem]];
  }
  OnStart() {
    this.eSu = this.GetDynamicBatchMesh(7);
    this.tSu = this.GetItem(8);
    for (let i = 0; i <= 6; i++) {
      var t = this.GetText(i);
      var e = t.GetOwner().GetComponentByClass(UE.UITextAdditionalUVModifier.StaticClass());
      this.iSu.push(t);
      this.rSu.push(e);
    }
    if (Info_1.Info.IsMobilePlatform()) {
      this.RefreshMobileFontSize();
    }
  }
  RefreshMobileFontSize() {
    if (!this.oSu) {
      this.oSu = true;
      for (const t of this.iSu) {
        var i = Math.floor(t.GetSize() * MOBLIE_FONT_SIZE_SCALE);
        t.SetFontSize(i);
      }
    }
  }
  PlayNumBatch(i, t, e, s = 1) {
    var a;
    var h;
    if (this.tSu) {
      DamageNumView.MFt.Start();
      a = this.iSu[s - 1];
      s = this.rSu[s - 1];
      this.tSu.SetAnchorOffset(t);
      t = UE.LGUIBPLibrary.GetUIWorldPosForceUpdate(this.tSu);
      h = a.GetUIWorldPosition();
      this.CTn.X = t.X - h.X;
      this.CTn.Y = t.Z - h.Z;
      s.SetAdditionalUV(1, this.CTn);
      a.SetText(i);
      a.SetColor(e);
      this.CTn.X = UE.GameplayStatics.GetUnpausedTimeSeconds(this.RootActor);
      this.CTn.Y = 0;
      s.SetAdditionalUV(0, this.CTn);
      t = this.eSu?.AddBatchGeometryRenderable(a);
      DamageNumView.MFt.Stop();
      return t;
    }
  }
  UpdateDamageLocation(i, t, e = 1) {
    if (this.tSu) {
      this.tSu.SetAnchorOffset(t);
      t = UE.LGUIBPLibrary.GetUIWorldPosForceUpdate(this.tSu);
      e = this.iSu[e - 1].GetUIWorldPosition();
      this.CTn.X = t.X - e.X;
      this.CTn.Y = t.Z - e.Z;
      i.SetAdditionalUV(1, this.CTn);
    }
  }
}
(exports.DamageNumView = DamageNumView).MFt = Stats_1.Stat.Create("[DamageNumView]InitializeDamageView");
//# sourceMappingURL=DamageNumView.js.map