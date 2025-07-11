"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridLockAndDeprecateComponent = undefined;
const UE = require("ue");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridLockAndDeprecateComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  GetResourceId() {
    return "UiItem_InventoryItemState";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
  }
  OnRefresh(e) {
    var t = e.IsLock ?? false;
    var e = e.IsDeprecate ?? false;
    this.GetSprite(0).SetUIActive(t);
    this.GetSprite(1).SetUIActive(e);
    this.SetActive(t || e);
  }
}
exports.SmallItemGridLockAndDeprecateComponent = SmallItemGridLockAndDeprecateComponent;
//# sourceMappingURL=SmallItemGridLockAndDeprecateComponent.js.map