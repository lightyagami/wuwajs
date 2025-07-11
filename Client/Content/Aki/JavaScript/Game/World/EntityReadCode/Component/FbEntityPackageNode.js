"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityPackageNode = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
class FbEntityPackageNode {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.bxh = false;
    this.Lxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityPackageNode(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Children() {
    if (!this.bxh) {
      this.bxh = true;
      this.Lxh = new Array();
      var e = this.FbDataInternal.childrenLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.children(t, new fb_component_1.EntityPackageNode());
          this.Lxh.push(FbEntityPackageNode.Create(i));
        }
      }
    }
    return this.Lxh;
  }
}
exports.FbEntityPackageNode = FbEntityPackageNode;
//# sourceMappingURL=FbEntityPackageNode.js.map