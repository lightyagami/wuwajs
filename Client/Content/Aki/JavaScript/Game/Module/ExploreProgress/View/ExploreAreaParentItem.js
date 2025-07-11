"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreAreaParentItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ExploreAreaItem_1 = require("./ExploreAreaItem");
const ExploreCountryItem_1 = require("./ExploreCountryItem");
class ExploreAreaParentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.zVt = undefined;
    this.ExploreAreaItem = undefined;
    this.ZVt = undefined;
    this.e6t = undefined;
    this.t6t = (t, e, i) => {
      if (this.ZVt) {
        this.ZVt(t, e, i);
      }
    };
    this.i6t = (t, e, i) => {
      if (this.e6t) {
        this.e6t(t, e, i);
      }
    };
    this.o6t = () => true;
    this.r6t = () => true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetUsingItem(t) {
    if (t.IsCountry) {
      const e = this.GetItem(0);
      return e.GetOwner();
    }
    const e = this.GetItem(1);
    return e.GetOwner();
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  OnStart() {
    this.zVt = new ExploreCountryItem_1.ExploreCountryItem();
    this.zVt.Initialize(this.GetItem(0));
    this.ExploreAreaItem = new ExploreAreaItem_1.ExploreAreaItem();
    this.ExploreAreaItem.Initialize(this.GetItem(1));
  }
  Update(t, e) {
    var i = (this.Data = t).IsCountry;
    (i ? (this.zVt.BindOnSelected(this.t6t), this.zVt.BindCanExecuteChange(this.o6t), this.zVt) : (this.ExploreAreaItem.BindOnSelected(this.i6t), this.ExploreAreaItem.BindCanExecuteChange(this.r6t), this.ExploreAreaItem)).Refresh(t);
    this.zVt.SetActive(i);
    this.ExploreAreaItem.SetActive(!i);
  }
  BindOnCountrySelected(t) {
    this.ZVt = t;
  }
  BindOnAreaSelected(t) {
    this.e6t = t;
  }
  ClearItem() {
    this.Data = undefined;
    this.zVt?.Destroy();
    this.zVt = undefined;
    this.ExploreAreaItem?.Destroy();
    this.ExploreAreaItem = undefined;
  }
}
exports.ExploreAreaParentItem = ExploreAreaParentItem;
//# sourceMappingURL=ExploreAreaParentItem.js.map