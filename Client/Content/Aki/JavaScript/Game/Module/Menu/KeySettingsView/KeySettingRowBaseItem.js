"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingRowBaseItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class KeySettingRowBaseItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  ClearItem() {}
  GetItemSize(e) {
    var t = Vector2D_1.Vector2D.Create();
    let s = undefined;
    switch (e.GetRowType()) {
      case 1:
        s = this.GetItem(1);
        break;
      case 2:
        s = this.GetItem(2);
    }
    if (s) {
      t.X = s.GetWidth();
      t.Y = s.GetHeight();
    }
    return t.ToUeVector2D();
  }
}
exports.KeySettingRowBaseItem = KeySettingRowBaseItem;
//# sourceMappingURL=KeySettingRowBaseItem.js.map