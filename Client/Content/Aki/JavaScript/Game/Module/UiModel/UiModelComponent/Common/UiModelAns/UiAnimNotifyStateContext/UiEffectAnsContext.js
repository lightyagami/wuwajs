"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiEffectAnsContext = undefined;
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiEffectAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
  constructor(t, s, i, e, h, n, o, r, c, x, u, a) {
    super();
    this.EffectPath = t;
    this.MeshComponent = s;
    this.Socket = i;
    this.Attached = e;
    this.AttachLocationOnly = h;
    this.Location = n;
    this.Rotation = o;
    this.Scale = r;
    this.PlayOnEnd = c;
    this.FasterStop = x;
    this.EffectContext = u;
    this.OnEffectSpawn = a;
    this.Handle = undefined;
  }
  IsValid() {
    return this.EffectPath !== undefined && this.Socket !== undefined && this.MeshComponent !== undefined;
  }
  IsEqual(t) {
    return t instanceof UiEffectAnsContext && !!this.IsValid() && !!t.IsValid() && this.EffectPath === t.EffectPath && this.Socket.op_Equality(t.Socket) && this.MeshComponent === t.MeshComponent;
  }
}
exports.UiEffectAnsContext = UiEffectAnsContext;
//# sourceMappingURL=UiEffectAnsContext.js.map