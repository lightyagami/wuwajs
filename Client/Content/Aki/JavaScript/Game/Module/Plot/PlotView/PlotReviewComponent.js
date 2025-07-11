"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotReviewComponent = undefined;
class PlotReviewComponent {
  constructor(t, s) {
    this.dce = false;
    this.quc = undefined;
    this.EnableReviewButton = t => {
      if (this.dce !== t) {
        this.dce = t;
        this.Ouc.SetUIActive(this.dce);
      }
    };
    this.Guc = () => {
      if (this.dce) {
        this.NTt?.();
      }
    };
    this.quc = t;
    this.Ouc = t.RootUIComp;
    this.NTt = s;
    this.quc.OnClickCallBack.Bind(this.Guc);
    this.dce = false;
  }
  OnClear() {
    this.dce = false;
    this.NTt = undefined;
    this.quc?.OnClickCallBack.Unbind();
  }
}
exports.PlotReviewComponent = PlotReviewComponent;
//# sourceMappingURL=PlotReviewComponent.js.map