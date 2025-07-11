"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPasserbyNpcTemplateSource = undefined;
class FbPasserbyNpcTemplateSource {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.GQh = false;
    this.OQh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPasserbyNpcTemplateSource(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TemplateIds() {
    if (!this.GQh) {
      this.GQh = true;
      this.OQh = new Array();
      var s = this.FbDataInternal.templateIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.OQh.push(this.FbDataInternal.templateIds(t));
        }
      }
    }
    return this.OQh;
  }
}
exports.FbPasserbyNpcTemplateSource = FbPasserbyNpcTemplateSource;
//# sourceMappingURL=FbPasserbyNpcTemplateSource.js.map