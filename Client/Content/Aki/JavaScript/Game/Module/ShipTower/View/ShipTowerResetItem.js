"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerResetItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
class ShipTowerResetItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fDo = undefined;
    this.i8_ = undefined;
    this.Os_ = () => {
      var e = this.i8_?.BuffData?.ItemId ?? 1;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.fDo = new SmallItemGrid_1.SmallItemGrid();
    this.fDo.Initialize(this.GetItem(0).GetOwner());
    this.fDo.BindOnExtendToggleClicked(this.Os_);
    this.fDo.BindOnCanExecuteChange(() => false);
    var e = ShipTowerDefine_1.shipTowerTextKey.UseCount;
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    this.GetText(6).SetText(e);
  }
  UpdateData(e) {
    var i = (this.i8_ = e).BuffData?.ItemId ?? 1;
    this.fDo.Apply({
      Data: e,
      Type: 4,
      ItemConfigId: i
    });
    var i = e.BuffData?.IsUnlimited(e.StageId) ?? false;
    this.GetItem(4).SetUIActive(!i);
    this.GetText(5).SetUIActive(i);
    var t = this.GetText(1);
    t.ShowTextNew(e.BuffData?.ItemNameKey ?? "");
    t.SetColor(e.BuffData?.GetQualityColor());
    if (!i) {
      t = e.BuffData?.CanUseCount ?? 0;
      this.GetText(2).SetText(t.toString());
      this.GetText(3).SetText((t + 1).toString());
    }
  }
}
exports.ShipTowerResetItem = ShipTowerResetItem;
//# sourceMappingURL=ShipTowerResetItem.js.map