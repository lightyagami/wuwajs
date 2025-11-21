"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ItemController_1 = require("../../../Item/ItemController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const VisionRecoverySlotGridItem_1 = require("../VisionRecovery/VisionRecoverySlotGridItem");
class VisionRefineResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.c3a = undefined;
    this.fGt = undefined;
    this.OnCloseCallback = undefined;
    this.m3a = () => {
      return new VisionRecoverySlotGridItem_1.VisionRecoverySlotGridItem(this.zvt, false);
    };
    this.D1c = () => {
      this.CloseMe(this.OnCloseCallback);
    };
    this.JEd = () => {
      UiManager_1.UiManager.OpenView("VisionIntensifyView", this.fGt.GetUniqueId());
      this.CloseMe(e => {
        if (this.OnCloseCallback !== undefined) {
          this.OnCloseCallback(e);
        }
      });
    };
    this.zvt = (e, i) => {
      if (i !== undefined) {
        ItemController_1.ItemController.OpenItemTipsByItemUid(i.GetUniqueId(), i.GetConfigId());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIGridLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.JEd], [1, this.D1c], [6, this.D1c]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(false);
    this.GetGridLayout(4).RootUIComp.SetUIActive(false);
    this.GetGridLayout(2).SetAlign(1);
    var e = this.OpenParam;
    this.ZEd(e.ShowTips);
    var e = e.Response;
    if (e && e.xPs) {
      this.fGt = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataByPhantomItem(e.xPs);
      this.c3a = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.m3a, this.GetItem(0).GetOwner());
      await this.c3a.RefreshByDataAsync([this.fGt]);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 75, "Proto_PhantomPolishResponse.Proto_UpdateInfo为空");
    }
  }
  OnAfterShow() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.fGt.GetUniqueId());
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 75, "Proto_PhantomPolishResponse.Proto_UpdateInfo为空");
      }
    } else if (!e.GetIsLock()) {
      ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(this.fGt.GetUniqueId(), true);
    }
  }
  ZEd(e) {
    this.GetItem(5).SetUIActive(e);
    this.GetButton(1).SetSelfInteractive(!e);
  }
}
exports.VisionRefineResultView = VisionRefineResultView;
//# sourceMappingURL=VisionRefineResultView.js.map