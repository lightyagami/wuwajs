"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetBattleTag = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbSetEntityTag_1 = require("./FbSetEntityTag");
class FbSetBattleTag {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Avh = false;
    this.xvh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetBattleTag(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SetTags() {
    if (!this.Avh) {
      this.Avh = true;
      this.xvh = new Array();
      var e = this.FbDataInternal.setTagsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.setTags(t, new fb_action_1.SetEntityTag());
          this.xvh.push(FbSetEntityTag_1.FbSetEntityTag.Create(i));
        }
      }
    }
    return this.xvh;
  }
}
exports.FbSetBattleTag = FbSetBattleTag;
//# sourceMappingURL=FbSetBattleTag.js.map