"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialDynItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TutorialDynItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eqe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIExtendToggle], [3, UE.UIItem], [4, UE.UIText]];
  }
  GetItemSize(e) {
    if (this.eqe === undefined) {
      this.eqe = Vector2D_1.Vector2D.Create();
    }
    if (e.IsTypeTitle) {
      e = this.GetItem(0);
      this.eqe.Set(e.GetWidth(), e.GetHeight());
    } else {
      e = this.GetRootItem();
      this.eqe.Set(e.GetWidth(), e.GetHeight());
    }
    return this.eqe.ToUeVector2D(true);
  }
  ClearItem() {}
}
exports.TutorialDynItem = TutorialDynItem;
//# sourceMappingURL=TutorialDynItem.js.map