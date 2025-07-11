"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementGroupSmallDynItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementGroupSmallDynItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eqe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [4, UE.UIItem], [1, UE.UIExtendToggle], [3, UE.UIText]];
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
exports.AchievementGroupSmallDynItem = AchievementGroupSmallDynItem;
//# sourceMappingURL=AchievementGroupSmallDynItem.js.map