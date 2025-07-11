"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAreaItemBase = undefined;
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class PhantomArenaAreaItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.QTc = Vector_1.Vector.Create();
    this.Proxy = undefined;
  }
  OnStart() {
    this.QTc.FromUeVector(this.GetRootItem().K2_GetComponentToWorld().GetLocation());
    this.SetHoverStateActive(false);
    this.SetCanUseStateActive(false);
    this.OnStartImplement();
  }
  GetWorldLocation() {
    return this.QTc;
  }
  OnStartImplement() {}
  SetProxy(e) {
    this.Proxy = e;
  }
}
exports.PhantomArenaAreaItemBase = PhantomArenaAreaItemBase;
//# sourceMappingURL=PhantomArenaAreaItemBase.js.map