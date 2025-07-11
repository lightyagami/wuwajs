"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySelectContentBase = undefined;
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivitySelectContentBase extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  ClearItem() {}
  GetItemSize(e) {
    var t = Vector2D_1.Vector2D.Create();
    t.Set(this.RootItem.Width, this.RootItem.Height);
    return t.ToUeVector2D();
  }
}
exports.ActivitySelectContentBase = ActivitySelectContentBase;
//# sourceMappingURL=ActivitySelectContentBase.js.map