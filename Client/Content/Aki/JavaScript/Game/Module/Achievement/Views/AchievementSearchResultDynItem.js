"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementSearchResultDynItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementSearchResultDynItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.MGe = undefined;
    this.EGe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.MGe = Vector2D_1.Vector2D.Create();
    let e = this.GetItem(0);
    this.MGe.Set(e.GetWidth(), e.GetHeight());
    this.EGe = Vector2D_1.Vector2D.Create();
    e = this.GetItem(1);
    this.EGe.Set(e.GetWidth(), e.GetHeight());
  }
  GetItemSize(e) {
    if (e.AchievementSearchGroupData) {
      return this.MGe.ToUeVector2D(true);
    } else if (e.AchievementData) {
      return this.EGe.ToUeVector2D(true);
    } else {
      return new Vector2D_1.Vector2D().ToUeVector2D();
    }
  }
  ClearItem() {}
}
exports.AchievementSearchResultDynItem = AchievementSearchResultDynItem;
//# sourceMappingURL=AchievementSearchResultDynItem.js.map