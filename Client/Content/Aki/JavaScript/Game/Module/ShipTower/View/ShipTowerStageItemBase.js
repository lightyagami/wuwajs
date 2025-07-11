"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerStageItemEndless = exports.ShipTowerStageItemRefresh = exports.ShipTowerStageItemOneTime = exports.ShipTowerStageItemBase = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ShipTowerStageItem_1 = require("./ShipTowerStageItem");
class ShipTowerStageItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.StageItem = undefined;
    this.ItemData = undefined;
    this.OnClickBtnEnter = () => {
      this.ItemData.OpenViewStageDesc();
    };
  }
  async Init(e, t) {
    this.ItemData = t;
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.OnClickBtnEnter]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.StageItem = new ShipTowerStageItem_1.ShipTowerStageItem();
    await this.StageItem.Init(e, this.ItemData);
  }
  UpdateData() {
    this.StageItem.UpdateData();
  }
  SetClickEnable(e) {
    this.GetButton(1)?.SetSelfInteractive(e);
  }
}
class ShipTowerStageItemOneTime extends (exports.ShipTowerStageItemBase = ShipTowerStageItemBase) {}
exports.ShipTowerStageItemOneTime = ShipTowerStageItemOneTime;
class ShipTowerStageItemRefresh extends ShipTowerStageItemBase {}
exports.ShipTowerStageItemRefresh = ShipTowerStageItemRefresh;
class ShipTowerStageItemEndless extends ShipTowerStageItemBase {}
exports.ShipTowerStageItemEndless = ShipTowerStageItemEndless;
//# sourceMappingURL=ShipTowerStageItemBase.js.map