"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiWeaponAnsContext = undefined;
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiWeaponAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
  constructor(t, s, e, n = undefined, o) {
    super();
    this.Index = t;
    this.ShowMaterialController = s;
    this.HideEffect = e;
    this.Transform = n;
    this.HangSocketName = o;
  }
  IsEqual(t) {
    return t instanceof UiWeaponAnsContext && this.Index === t.Index && this.HangSocketName.op_Equality(t.HangSocketName);
  }
}
exports.UiWeaponAnsContext = UiWeaponAnsContext;
//# sourceMappingURL=UiWeaponAnsContext.js.map