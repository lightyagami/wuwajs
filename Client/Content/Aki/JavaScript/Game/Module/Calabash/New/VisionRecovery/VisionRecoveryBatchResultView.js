"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoveryBatchResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ItemController_1 = require("../../../Item/ItemController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const VisionRecoverySlotGridItem_1 = require("./VisionRecoverySlotGridItem");
const CELLS_PER_LINE = 7;
class VisionRecoveryBatchResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.c3a = undefined;
    this.qWt = undefined;
    this.m3a = () => {
      return new VisionRecoverySlotGridItem_1.VisionRecoverySlotGridItem(this.zvt, false);
    };
    this.aRo = () => {
      this.CloseMe();
    };
    this.zvt = (e, i) => {
      if (i !== undefined) {
        ItemController_1.ItemController.OpenItemTipsByItemUid(i.GetUniqueId(), i.GetConfigId());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIGridLayout]];
    this.BtnBindInfo = [[1, this.aRo]];
  }
  async OnBeforeStartAsync() {
    var e;
    var i = this.OpenParam;
    if (i === undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Calabash", 58, "VisionRecoveryBatchResultView responseData为空");
      }
    } else {
      this.c3a = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.m3a, this.GetItem(0).GetOwner());
      this.qWt = new GenericLayout_1.GenericLayout(this.GetGridLayout(4), this.m3a, this.GetItem(0).GetOwner());
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRecoverySortPhantomItemList(i.bMs);
      await this.c3a.RefreshByDataAsync(e);
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRecoverySortPhantomItemList(i.GBs);
      await this.qWt.RefreshByDataAsync(i);
      this.GetItem(3).SetUIActive(i.length > 0);
      this.GetGridLayout(4).RootUIComp.SetUIActive(i.length > 0);
      e = e.length > CELLS_PER_LINE ? 0 : 1;
      this.GetGridLayout(2).SetAlign(e);
      e = i.length > CELLS_PER_LINE ? 0 : 1;
      this.GetGridLayout(4).SetAlign(e);
    }
  }
}
exports.VisionRecoveryBatchResultView = VisionRecoveryBatchResultView;
//# sourceMappingURL=VisionRecoveryBatchResultView.js.map