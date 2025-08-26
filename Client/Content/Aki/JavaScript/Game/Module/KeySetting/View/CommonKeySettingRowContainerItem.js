"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonKeySettingRowContainerItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const KeySettingViewModel_1 = require("../KeySettingViewModel");
const CommonKeySettingRowKeyItem_1 = require("./CommonKeySettingRowKeyItem");
const CommonKeySettingRowTypeItem_1 = require("./CommonKeySettingRowTypeItem");
class CommonKeySettingRowContainerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.KeySettingRowData = undefined;
    this.DPi = undefined;
    this.RPi = undefined;
    this.UPi = t => {
      if (t === 0) {
        this.DPi?.SetDetailItemVisible(false);
      } else {
        this.DPi?.SetDetailItemVisible(true);
      }
    };
    this._ui = () => {
      KeySettingViewModel_1.KeySettingViewModel.HoverKey(this.KeySettingRowData);
    };
    this.uui = () => {
      KeySettingViewModel_1.KeySettingViewModel.UnHoverKey(this.KeySettingRowData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    var t = this.GetExtendToggle(0);
    t?.OnStateChange.Add(this.UPi);
    t?.OnHover.Add(this._ui);
    t?.OnUnHover.Add(this.uui);
    this.SetActive(true);
  }
  OnBeforeDestroy() {
    this.KeySettingRowData = undefined;
    this.DPi = undefined;
    this.RPi = undefined;
    var t = this.GetExtendToggle(0);
    t?.OnStateChange.Remove(this.UPi);
    t?.OnHover.Remove(this._ui);
    t?.OnUnHover.Remove(this.uui);
  }
  async Init(t) {
    await Promise.all([this.CreateByActorAsync(t.GetOwner(), undefined, true), this.PPi(), this.APi()]);
  }
  Update(t, e) {
    this.KeySettingRowData = t;
    var i = KeySettingViewModel_1.KeySettingViewModel.InputControllerType;
    switch (t.GetRowType()) {
      case 2:
        this.GetExtendToggle(0)?.SetSelfInteractive(true);
        this.DPi.Refresh(t, i);
        this.GetItem(2).SetUIActive(true);
        this.GetItem(1).SetUIActive(false);
        break;
      case 1:
        this.GetExtendToggle(0)?.SetSelfInteractive(false);
        this.RPi.Refresh(t);
        this.GetItem(2).SetUIActive(false);
        this.GetItem(1).SetUIActive(true);
    }
    this.EUt(t.IsExpandDetail);
  }
  ClearItem() {}
  GetUsingItem(t) {
    switch (t.GetRowType()) {
      case 1:
        return this.GetItem(1).GetOwner();
      case 2:
        return this.GetItem(2).GetOwner();
      default:
        return;
    }
  }
  async PPi() {
    var t = this.GetItem(2)?.GetOwner();
    if (t) {
      this.DPi = new CommonKeySettingRowKeyItem_1.CommonKeySettingRowKeyItem();
      await this.DPi.CreateThenShowByActorAsync(t);
    }
  }
  async APi() {
    var t = this.GetItem(1)?.GetOwner();
    if (t) {
      this.RPi = new CommonKeySettingRowTypeItem_1.CommonKeySettingRowTypeItem();
      await this.RPi.CreateThenShowByActorAsync(t);
    }
  }
  EUt(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0);
  }
}
exports.CommonKeySettingRowContainerItem = CommonKeySettingRowContainerItem;
//# sourceMappingURL=CommonKeySettingRowContainerItem.js.map