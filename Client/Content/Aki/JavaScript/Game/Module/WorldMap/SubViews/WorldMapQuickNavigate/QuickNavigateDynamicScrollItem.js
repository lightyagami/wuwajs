"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickNavigateDynamicScrollItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const QuickNavigateItemPanelA_1 = require("./QuickNavigateItemPanelA");
const QuickNavigateItemPanelB_1 = require("./QuickNavigateItemPanelB");
class QuickNavigateDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AYa = undefined;
    this.DYa = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  async OnBeforeStartAsync() {
    this.AYa = new QuickNavigateItemPanelA_1.QuickNavigateItemPanelA();
    var e = this.GetItem(0).GetOwner();
    await this.AYa.CreateThenShowByActorAsync(e, undefined, true);
    this.DYa = new QuickNavigateItemPanelB_1.QuickNavigateItemPanelB();
    var e = this.GetItem(1).GetOwner();
    await this.DYa.CreateThenShowByActorAsync(e, undefined, true);
  }
  GetUsingItem(e) {
    if (e.ItemType === 0) {
      return this.cma(0);
    } else if (e.ItemType === 1) {
      return this.cma(1);
    } else {
      return undefined;
    }
  }
  cma(e) {
    return this.GetItem(e).GetOwner();
  }
  Update(e, t) {
    var i = e.ItemType === 0;
    this.AYa.SetActive(i);
    this.DYa.SetActive(!i);
    (i ? this.AYa : this.DYa).RefreshByData(e);
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.QuickNavigateDynamicScrollItem = QuickNavigateDynamicScrollItem;
//# sourceMappingURL=QuickNavigateDynamicScrollItem.js.map