"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PlotReviewComponent = void 0;
class PlotReviewComponent {
  constructor(t, s) {
    this.dce = !1, this.quc = void 0, this.EnableReviewButton = t => {
      this.dce !== t && (this.dce = t, this.Ouc.SetUIActive(this.dce))
    }, this.Guc = () => {
      this.dce && this.NTt?.()
    }, this.quc = t, this.Ouc = t.RootUIComp, this.NTt = s, this.quc.OnClickCallBack.Bind(this.Guc), this.dce = !1
  }
  OnClear() {
    this.dce = !1, this.NTt = void 0, this.quc?.OnClickCallBack.Unbind()
  }
}
exports.PlotReviewComponent = PlotReviewComponent;
//# sourceMappingURL=PlotReviewComponent.js.map