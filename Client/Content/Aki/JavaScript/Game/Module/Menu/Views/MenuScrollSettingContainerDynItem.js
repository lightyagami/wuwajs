"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingContainerDynItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MenuScrollSettingContainerDynItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IGe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  GetItemSize(e) {
    if (this.IGe === undefined) {
      this.IGe = Vector2D_1.Vector2D.Create();
    }
    e = this.$Bi(e);
    if (e) {
      this.IGe.Set(e.GetWidth(), e.GetHeight());
    } else {
      this.IGe.Set(0, 0);
    }
    return this.IGe.ToUeVector2D(true);
  }
  $Bi(e) {
    if (e.Type === 0) {
      return this.GetItem(1);
    }
    switch (e.Data.SetType) {
      case 1:
        return this.GetItem(4);
      case 2:
        return this.GetItem(3);
      case 3:
      case 4:
        return this.GetItem(2);
      case 5:
        return this.GetItem(5);
    }
  }
  ClearItem() {}
}
exports.MenuScrollSettingContainerDynItem = MenuScrollSettingContainerDynItem;
//# sourceMappingURL=MenuScrollSettingContainerDynItem.js.map