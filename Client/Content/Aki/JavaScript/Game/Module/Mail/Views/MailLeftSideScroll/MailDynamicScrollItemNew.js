"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailDynamicScrollItemNew = undefined;
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class MailDynamicScrollItemNew extends UiPanelBase_1.UiPanelBase {
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
  ClearItem() {}
}
exports.MailDynamicScrollItemNew = MailDynamicScrollItemNew;
//# sourceMappingURL=MailDynamicScrollItemNew.js.map