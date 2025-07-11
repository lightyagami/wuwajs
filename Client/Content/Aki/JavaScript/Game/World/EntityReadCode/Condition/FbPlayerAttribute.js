"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayerAttribute = undefined;
const UnionPlayerAttributeHelper_1 = require("./UnionPlayerAttributeHelper");
class FbPlayerAttribute {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.s_h = false;
    this.Hye = undefined;
    this.rJh = false;
    this.oJh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPlayerAttribute(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Option() {
    if (!this.s_h) {
      this.s_h = true;
      this.Hye = this.FbDataInternal.option();
    }
    return this.Hye;
  }
  get AttributeTypes() {
    if (!this.rJh) {
      this.rJh = true;
      this.oJh = new Array();
      var i = this.FbDataInternal.attributeTypesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.attributeTypesType(t);
          var r = UnionPlayerAttributeHelper_1.UnionPlayerAttributeHelper.GetUnionPlayerAttributeObject(e);
          if (r && (e = UnionPlayerAttributeHelper_1.UnionPlayerAttributeHelper.ReadUnionPlayerAttribute(e, this.FbDataInternal.attributeTypes(t, r))) !== undefined) {
            this.oJh.push(e);
          }
        }
      }
    }
    return this.oJh;
  }
}
exports.FbPlayerAttribute = FbPlayerAttribute;
//# sourceMappingURL=FbPlayerAttribute.js.map