"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetHeadIconVisible = undefined;
const UnionHeadStyleHelper_1 = require("./UnionHeadStyleHelper");
class FbSetHeadIconVisible {
  constructor(e) {
    this.FbDataInternal = e;
    this.Rmh = false;
    this.wmh = undefined;
    this.Amh = false;
    this.xmh = false;
  }
  static Create(e) {
    if (e) {
      return new FbSetHeadIconVisible(e);
    }
  }
  get HeadStyleConfig() {
    var e;
    var t;
    if (!this.Rmh && (this.Rmh = true, e = this.FbDataInternal.headStyleConfigType(), t = UnionHeadStyleHelper_1.UnionHeadStyleHelper.GetUnionHeadStyleObject(e))) {
      this.wmh = UnionHeadStyleHelper_1.UnionHeadStyleHelper.ReadUnionHeadStyle(e, this.FbDataInternal.headStyleConfig(t));
    }
    return this.wmh;
  }
  get Visible() {
    if (!this.Amh) {
      this.Amh = true;
      this.xmh = this.FbDataInternal.visible();
    }
    return this.xmh;
  }
}
exports.FbSetHeadIconVisible = FbSetHeadIconVisible;
//# sourceMappingURL=FbSetHeadIconVisible.js.map