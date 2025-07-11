"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedRingBgItem = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const LguiUtil_1 = require("../../../Module/Util/LguiUtil");
const BigStuffedDefine_1 = require("../BigStuffedDefine");
const BigStuffedRingSubItem_1 = require("./BigStuffedRingSubItem");
class BigStuffedRingBgItem extends BigStuffedRingSubItem_1.BigStuffedRingSubItem {
  constructor(t, i, e) {
    super(t, i);
    this.Ebl = undefined;
    this.Type = 0;
    this.Ebl = e;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, UE.UIItem], [3, UE.UITexture]);
  }
  OnStart() {
    super.OnStart();
    this.TextureRing.SetTextureType(4);
    this.TextureRing.SetFillMethod(4);
    this.TextureRing.SetFillOrigin(2);
    this.TextureRing.SetFillDirectionFlip(true);
    this.GetItem(2).SetUIActive(false);
    this.xfl(this.TextureRing);
  }
  xfl(s) {
    var f = this.Ebl.GetValidAreas();
    this.Ebl.ClearValidAreas();
    var r = this.RingConfig.InvalidBox;
    let u = this.GetTexture(3);
    if (r.length === 0) {
      s.SetFillAmount(1);
      u.SetFillAmount(1);
      this.Ebl.AddValidArea(1, BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT);
    } else {
      var o;
      var g = [];
      for (const l of r) {
        if (Array.isArray(l)) {
          if (o = l) {
            g.push([o[0], o[1]]);
          }
        } else if (o = l) {
          g.push([o.ArrayInt[0], o.ArrayInt[1]]);
        }
      }
      g.sort((t, i) => t[0] - i[0]);
      let t = 1;
      let i = -1;
      for (const U of g) {
        var h = U[0];
        var n = U[1];
        if (t < h && (this.Ebl.AddValidArea(t, h - 1), t === 1)) {
          i = f.length - 1;
        }
        t = Math.max(t, n + 1);
      }
      if (t <= BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT) {
        if (i !== -1) {
          s = f.splice(i)[0];
          this.Ebl.AddValidArea(t, s.EndCellIndex);
          f.sort((t, i) => t.StartCellIndex - i.StartCellIndex);
        } else {
          this.Ebl.AddValidArea(t, BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT);
        }
      }
      let e = this.GetTexture(1);
      var _ = this.GetItem(2);
      for (let t = 0; t < f.length; t++) {
        var a = f[t].StartCellIndex;
        var d = f[t].EndCellIndex;
        if (t !== 0) {
          S = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), this.RootItem);
          e = S.GetComponentByClass(UE.UITexture.StaticClass());
          S = LguiUtil_1.LguiUtil.DuplicateActor(u.GetOwner(), this.RootItem);
          u = S.GetComponentByClass(UE.UITexture.StaticClass());
        }
        var S = Math.max(a - 1, 0) * BigStuffedDefine_1.SINGLECELL_ANGLE;
        var B = Rotator_1.Rotator.Create(0, -S, 0).ToUeRotator();
        e.SetUIRelativeRotation(B);
        var a = (0, BigStuffedDefine_1.calculateCellSize)(a, d) / BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT;
        e.SetFillAmount(a);
        u.SetUIRelativeRotation(B);
        u.SetFillAmount(a);
        if (r.length !== 0) {
          (B = LguiUtil_1.LguiUtil.CopyItem(_, this.RootItem)).SetUIRelativeRotation(Rotator_1.Rotator.Create(0, 0.5 - S, 0).ToUeRotator());
          B.SetUIActive(true);
          B.SetAsLastHierarchy();
        }
        if (r.length !== 0) {
          a = LguiUtil_1.LguiUtil.CopyItem(_, this.RootItem);
          B = d * BigStuffedDefine_1.SINGLECELL_ANGLE;
          a.SetUIRelativeRotation(Rotator_1.Rotator.Create(0, -B - 0.5, 0).ToUeRotator());
          a.SetUIActive(true);
          a.SetAsLastHierarchy();
        }
      }
    }
  }
}
exports.BigStuffedRingBgItem = BigStuffedRingBgItem;
//# sourceMappingURL=BigStuffedRingBgItem.js.map