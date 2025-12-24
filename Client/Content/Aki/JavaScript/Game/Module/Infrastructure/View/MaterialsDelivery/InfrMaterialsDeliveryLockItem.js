"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrMaterialsDeliveryDoneItem = exports.InfrMaterialsDeliveryLockItem = exports.InfrMaterialsDeliveryLockItemBase = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class InfrMaterialsDeliveryLockItemBase extends UiPanelBase_1.UiPanelBase {
  Refresh(e) {
    var t = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.LockDescriptionTextId, e.LockDescriptionTextArgs);
  }
}
class InfrMaterialsDeliveryLockItem extends (exports.InfrMaterialsDeliveryLockItemBase = InfrMaterialsDeliveryLockItemBase) {
  constructor() {
    super(...arguments);
    this.T5m = undefined;
    this.GGt = () => {
      this.T5m?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.GGt]];
  }
  SetOnClickFunction(e) {
    this.T5m = e;
  }
}
exports.InfrMaterialsDeliveryLockItem = InfrMaterialsDeliveryLockItem;
class InfrMaterialsDeliveryDoneItem extends InfrMaterialsDeliveryLockItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
}
exports.InfrMaterialsDeliveryDoneItem = InfrMaterialsDeliveryDoneItem;
//# sourceMappingURL=InfrMaterialsDeliveryLockItem.js.map