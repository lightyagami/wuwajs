"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPasserbyNpcSourceHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPasserbyNpcTemplateSource_1 = require("./FbPasserbyNpcTemplateSource");
class UnionPasserbyNpcSourceHelper {
  static GetUnionPasserbyNpcSourceObject(e) {
    if (e === fb_component_1.UnionPasserbyNpcSource.PasserbyNpcTemplateSource) {
      return new fb_component_1.PasserbyNpcTemplateSource();
    }
  }
  static ReadUnionPasserbyNpcSource(e, o) {
    if (o !== undefined && e === fb_component_1.UnionPasserbyNpcSource.PasserbyNpcTemplateSource) {
      return FbPasserbyNpcTemplateSource_1.FbPasserbyNpcTemplateSource.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionPasserbyNpcSourceHelper = UnionPasserbyNpcSourceHelper;
//# sourceMappingURL=UnionPasserbyNpcSourceHelper.js.map