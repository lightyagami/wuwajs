"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueRoleDynamicItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class WeeklyRogueRoleDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eqe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem]];
  }
  GetItemSize(e) {
    if (this.eqe === undefined) {
      this.eqe = Vector2D_1.Vector2D.Create();
    }
    if (e.IsTitleType) {
      e = this.GetItem(2);
      this.eqe.Set(e.GetWidth(), e.GetHeight());
    } else {
      e = this.GetGridLayout(0).RootUIComp;
      this.eqe.Set(e.GetWidth(), e.GetHeight());
    }
    return this.eqe.ToUeVector2D(true);
  }
  ClearItem() {}
}
exports.WeeklyRogueRoleDynamicItem = WeeklyRogueRoleDynamicItem;
//# sourceMappingURL=WeeklyRogueRoleDynamicItem.js.map