"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeLocatingHelper = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../../Ui/UiLayer");
class QuestTreeNodeLocatingHelper {
  constructor(e) {
    this.qUt = e;
    this.Aae = new UE.Vector(0, 0, 0);
    this.MoveTweener = undefined;
  }
  LocateToNode(i, s = false, r = false) {
    if (this.qUt && i) {
      this.qUt.StopMovement();
      var h = this.qUt.GetContent().GetUIItem();
      var a = i.GetLGUISpaceAbsolutePosition();
      var o = h.GetLGUISpaceAbsolutePosition();
      var r = r ? UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Normal) : this.qUt.GetRootComponent();
      var U = r.GetWidth();
      var l = r.GetHeight();
      var u = r.GetLGUISpaceAbsolutePosition().X;
      var c = r.GetLGUISpaceAbsolutePosition().Y;
      var y = h.GetWidth() * h.RelativeScale3D.X;
      var L = h.GetHeight() * h.RelativeScale3D.Y;
      var _ = u - Math.max(y - U, 0) - r.GetPivot().X * U + h.GetPivot().X * y;
      var u = u - r.GetPivot().X * U + h.GetPivot().X * y;
      let e = c + Math.max(L - l, 0) + r.GetPivot().Y * l - h.GetPivot().Y * L;
      let t = c + r.GetPivot().Y * l - h.GetPivot().Y * L;
      if (L < l) {
        t += (L - l) * 0.5;
        e = t;
      }
      y = l * 0.5;
      c = U * 0.5 - (a.X + (0.5 - i.GetPivot().X) * i.GetWidth()) + o.X;
      r = y - (a.Y + (0.5 - i.GetPivot().Y) * i.GetHeight()) + o.Y;
      this.Aae.X = MathUtils_1.MathUtils.Clamp(c, _, u);
      this.Aae.Y = MathUtils_1.MathUtils.Clamp(r, t, e);
      if (this.MoveTweener) {
        this.MoveTweener.Kill();
      }
      if (s) {
        L = h.GetRelativeTransform().GetLocation();
        l = this.Aae.X - o.X;
        U = this.Aae.Y - o.Y;
        L.X += l;
        L.Y += U;
        this.MoveTweener = UE.LTweenBPLibrary.LocalPositionTo(h, L, 0.5, 0);
      } else {
        h.SetLGUISpaceAbsolutePosition(this.Aae);
      }
    }
  }
  Clear() {
    if (this.MoveTweener) {
      this.MoveTweener.Kill();
      this.MoveTweener = undefined;
    }
  }
}
exports.QuestTreeNodeLocatingHelper = QuestTreeNodeLocatingHelper;
//# sourceMappingURL=QuestTreeNodeLocatingHelper.js.map