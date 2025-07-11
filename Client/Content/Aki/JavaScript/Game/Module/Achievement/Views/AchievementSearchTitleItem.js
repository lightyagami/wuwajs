"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementSearchTitleItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementSearchTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Pe = undefined;
    this.wqe = undefined;
    this.wqe = e;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {}
  OnBeforeDestroy() {}
  Update(e) {
    this.Pe = e;
    this.mGe();
  }
  mGe() {
    if (this.Pe) {
      this.GetText(0).SetText(this.Pe.AchievementCategoryData.GetTitle());
    }
  }
  GetItemSize(e) {
    var t = this.GetRootItem();
    e.Set(t.GetWidth(), t.GetHeight());
    return e.ToUeVector2D(true);
  }
  GetUsingItem() {
    return this.GetRootItem().GetOwner();
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.AchievementSearchTitleItem = AchievementSearchTitleItem;
//# sourceMappingURL=AchievementSearchTitleItem.js.map