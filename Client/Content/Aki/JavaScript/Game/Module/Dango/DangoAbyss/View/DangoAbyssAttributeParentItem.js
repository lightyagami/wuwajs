"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssAttributeParentItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const DangoAbyssAttributeItems_1 = require("./DangoAbyssAttributeItems");
class DangoAbyssAttributeParentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.ItemTitle = undefined;
    this.ItemAttribute = undefined;
    this.ItemTag = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  GetUsingItem(t) {
    if (t.Attribute) {
      const s = this.GetItem(1);
      return s.GetOwner();
    }
    if (t.Tag) {
      const s = this.GetItem(2);
      return s.GetOwner();
    }
    const s = this.GetItem(0);
    return s.GetOwner();
  }
  OnStart() {
    this.ItemTitle = new DangoAbyssAttributeItems_1.DangoAbyssAttributeTitleItem();
    this.ItemTitle.Initialize(this.GetItem(0));
    this.ItemAttribute = new DangoAbyssAttributeItems_1.DangoAbyssAttributeItem();
    this.ItemAttribute.Initialize(this.GetItem(1));
    this.ItemTag = new DangoAbyssAttributeItems_1.DangoAbyssAttributeTagItem();
    this.ItemTag.Initialize(this.GetItem(2));
  }
  Update(t, s) {
    this.Data = t;
    this.ItemAttribute.SetUiActive(false);
    this.ItemTag.SetUiActive(false);
    this.ItemTitle.SetUiActive(false);
    (t.Attribute ? this.ItemAttribute : t.Tag ? this.ItemTag : this.ItemTitle).Refresh(t);
  }
  ClearItem() {
    this.Data = undefined;
    this.ItemTitle?.Destroy();
    this.ItemTitle = undefined;
    this.ItemAttribute?.Destroy();
    this.ItemAttribute = undefined;
    this.ItemTag?.Destroy();
    this.ItemTag = undefined;
  }
}
exports.DangoAbyssAttributeParentItem = DangoAbyssAttributeParentItem;
//# sourceMappingURL=DangoAbyssAttributeParentItem.js.map