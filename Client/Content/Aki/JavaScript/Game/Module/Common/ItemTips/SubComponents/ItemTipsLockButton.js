"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsLockButton = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InventoryController_1 = require("../../../Inventory/InventoryController");
class TipsLockButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this._Xe = 0;
    this.Kvt = undefined;
    this.gke = () => !this.Kvt || this.Kvt(this._Xe);
    this.L3a = e => {
      if (e === this._Xe) {
        this.Hqe(e);
      }
    };
    this.Uxt = () => {
      var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this._Xe);
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(this._Xe, !e.GetIsLock());
      }
    };
    this.A3a = () => {
      var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this._Xe);
      if (e !== undefined) {
        InventoryController_1.InventoryController.ItemDeprecateRequest(this._Xe, !e.GetIsDeprecated());
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.Uxt], [1, this.A3a]];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind();
    e.CanExecuteChange.Bind(this.gke);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.L3a);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.L3a);
  }
  Refresh(e, t) {
    this._Xe = e;
    this.Hqe(e);
    this.Kvt = t || undefined;
  }
  Hqe(e) {
    var t;
    var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
    if (e !== undefined) {
      this.GetExtendToggle(0).RootUIComp.SetUIActive(e.CanLock());
      this.GetExtendToggle(1).RootUIComp.SetUIActive(e.CanDeprecate());
      t = e.GetIsLock() ? 0 : 1;
      this.GetExtendToggle(0).SetToggleStateForce(t, false);
      t = e.GetIsDeprecated() ? 1 : 0;
      this.GetExtendToggle(1).SetToggleStateForce(t, false);
    }
  }
  SetDeprecateToggleVisible(e) {
    this.GetExtendToggle(1).RootUIComp.SetUIActive(e);
  }
}
exports.TipsLockButton = TipsLockButton;
//# sourceMappingURL=ItemTipsLockButton.js.map