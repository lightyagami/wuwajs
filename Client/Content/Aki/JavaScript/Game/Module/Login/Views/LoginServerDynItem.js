"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginServerDynItem = undefined;
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LoginServerDynItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eqe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  GetItemSize(e) {
    if (this.eqe === undefined) {
      this.eqe = Vector2D_1.Vector2D.Create();
    }
    var t = this.GetRootItem();
    this.eqe.Set(t.GetWidth(), t.GetHeight());
    return this.eqe.ToUeVector2D(true);
  }
  GetUsingItem() {
    return this.GetRootItem().GetOwner();
  }
  ClearItem() {}
}
exports.LoginServerDynItem = LoginServerDynItem;
//# sourceMappingURL=LoginServerDynItem.js.map