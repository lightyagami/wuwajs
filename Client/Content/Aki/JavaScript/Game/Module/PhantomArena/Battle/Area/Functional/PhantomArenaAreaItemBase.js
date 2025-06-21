"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAreaItemBase = void 0;
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class PhantomArenaAreaItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.QTc = Vector_1.Vector.Create(), this.Proxy = void 0
  }
  OnStart() {
    this.QTc.FromUeVector(this.GetRootItem().K2_GetComponentToWorld().GetLocation()), this.SetHoverStateActive(!1), this.SetCanUseStateActive(!1), this.OnStartImplement()
  }
  GetWorldLocation() {
    return this.QTc
  }
  OnStartImplement() {}
  SetProxy(e) {
    this.Proxy = e
  }
}
exports.PhantomArenaAreaItemBase = PhantomArenaAreaItemBase;
//# sourceMappingURL=PhantomArenaAreaItemBase.js.map