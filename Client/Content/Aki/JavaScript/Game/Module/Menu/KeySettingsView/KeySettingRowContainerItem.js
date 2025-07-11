"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingRowContainerItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const KeySettingRowKeyItem_1 = require("./KeySettingRowKeyItem");
const KeySettingRowTypeItem_1 = require("./KeySettingRowTypeItem");
class KeySettingRowContainerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.KeySettingRowData = undefined;
    this.DPi = undefined;
    this.RPi = undefined;
    this.SPi = undefined;
    this.sui = undefined;
    this.tui = undefined;
    this.iui = undefined;
    this.UPi = t => {
      if (this.sui) {
        this.sui(this, t);
      }
    };
    this._ui = () => {
      if (this.tui) {
        this.tui(this.KeySettingRowData);
      }
    };
    this.uui = () => {
      if (this.iui) {
        this.iui(this.KeySettingRowData);
      }
    };
    this.LPi = (t, i) => {
      if (this.SPi) {
        this.SPi(t, i, this);
      }
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
    this.SPi = undefined;
    var t = this.GetExtendToggle(0);
    t?.OnStateChange.Remove(this.UPi);
    t?.OnHover.Remove(this._ui);
    t?.OnUnHover.Remove(this.uui);
  }
  BindOnToggleStateChanged(t) {
    this.sui = t;
  }
  BindOnHover(t) {
    this.tui = t;
  }
  BindOnUnHover(t) {
    this.iui = t;
  }
  async Init(t) {
    await Promise.all([this.CreateByActorAsync(t.GetOwner(), undefined, true), this.APi(), this.PPi()]);
  }
  ClearItem() {
    this.KeySettingRowData = undefined;
  }
  Update(t, i) {
    var e = ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType;
    switch ((this.KeySettingRowData = t).GetRowType()) {
      case 2:
        this.GetExtendToggle(0)?.SetSelfInteractive(true);
        this.DPi.Refresh(t, e);
        this.GetItem(2).SetUIActive(true);
        this.GetItem(1).SetUIActive(false);
        break;
      case 1:
        this.GetExtendToggle(0)?.SetSelfInteractive(false);
        this.RPi.Refresh(t);
        this.GetItem(2).SetUIActive(false);
        this.GetItem(1).SetUIActive(true);
    }
    this.SetSelected(false);
    this.EUt(t.IsExpandDetail);
  }
  async PPi() {
    var t = this.GetItem(2)?.GetOwner();
    if (t) {
      this.DPi = new KeySettingRowKeyItem_1.KeySettingRowKeyItem();
      this.DPi.BindOnWaitInput(this.LPi);
      await this.DPi.CreateThenShowByActorAsync(t);
    }
  }
  BindOnWaitInput(t) {
    this.SPi = t;
  }
  async APi() {
    var t = this.GetItem(1)?.GetOwner();
    if (t) {
      this.RPi = new KeySettingRowTypeItem_1.KeySettingRowTypeItem();
      await this.RPi.CreateThenShowByActorAsync(t);
    }
  }
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
  SetSelected(t) {
    this.DPi?.SetSelected(t);
  }
  SetDetailItemVisible(t) {
    this.DPi?.SetDetailItemVisible(t);
    this.EUt(t);
  }
  EUt(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0);
  }
}
exports.KeySettingRowContainerItem = KeySettingRowContainerItem;
//# sourceMappingURL=KeySettingRowContainerItem.js.map