"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionVarRefHelper = undefined;
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const FbConstVarRef_1 = require("./FbConstVarRef");
const FbGlobalVarRef_1 = require("./FbGlobalVarRef");
const FbOtherVarRef_1 = require("./FbOtherVarRef");
const FbSelfVarRef_1 = require("./FbSelfVarRef");
class UnionVarRefHelper {
  static GetUnionVarRefObject(e) {
    switch (e) {
      case fb_var_1.UnionVarRef.ConstVarRef:
        return new fb_var_1.ConstVarRef();
      case fb_var_1.UnionVarRef.GlobalVarRef:
        return new fb_var_1.GlobalVarRef();
      case fb_var_1.UnionVarRef.OtherVarRef:
        return new fb_var_1.OtherVarRef();
      case fb_var_1.UnionVarRef.SelfVarRef:
        return new fb_var_1.SelfVarRef();
      default:
        return;
    }
  }
  static ReadUnionVarRef(e, r) {
    if (r !== undefined) {
      switch (e) {
        case fb_var_1.UnionVarRef.ConstVarRef:
          return FbConstVarRef_1.FbConstVarRef.Create(r);
        case fb_var_1.UnionVarRef.GlobalVarRef:
          return FbGlobalVarRef_1.FbGlobalVarRef.Create(r);
        case fb_var_1.UnionVarRef.OtherVarRef:
          return FbOtherVarRef_1.FbOtherVarRef.Create(r);
        case fb_var_1.UnionVarRef.SelfVarRef:
          return FbSelfVarRef_1.FbSelfVarRef.Create(r);
        default:
          return;
      }
    }
  }
}
exports.UnionVarRefHelper = UnionVarRefHelper;
//# sourceMappingURL=UnionVarRefHelper.js.map