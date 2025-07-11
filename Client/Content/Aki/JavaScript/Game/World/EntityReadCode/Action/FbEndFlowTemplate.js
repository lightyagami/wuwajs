"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEndFlowTemplate = undefined;
class FbEndFlowTemplate {
  constructor(t) {
    this.FbDataInternal = t;
    this.$Mh = false;
    this.XMh = false;
  }
  static Create(t) {
    if (t) {
      return new FbEndFlowTemplate(t);
    }
  }
  get IsResetPosition() {
    if (!this.$Mh) {
      this.$Mh = true;
      this.XMh = this.FbDataInternal.isResetPosition();
    }
    return this.XMh;
  }
}
exports.FbEndFlowTemplate = FbEndFlowTemplate;
//# sourceMappingURL=FbEndFlowTemplate.js.map