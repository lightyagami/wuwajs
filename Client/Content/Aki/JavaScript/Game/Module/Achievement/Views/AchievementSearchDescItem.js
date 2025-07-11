"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementSearchDescItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementSearchDescItem extends UiPanelBase_1.UiPanelBase {
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
    this.Pqe();
  }
  Pqe() {
    if (this.Pe) {
      this.GetText(0).SetText(this.Pe.AchievementSearchGroupData.AchievementGroupData.GetTitle());
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
exports.AchievementSearchDescItem = AchievementSearchDescItem;
//# sourceMappingURL=AchievementSearchDescItem.js.map