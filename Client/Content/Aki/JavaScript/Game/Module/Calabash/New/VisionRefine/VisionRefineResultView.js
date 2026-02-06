"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ItemController_1 = require("../../../Item/ItemController");
const VisionIntensifyView_1 = require("../../../Phantom/Vision/View/VisionIntensifyView");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const VisionRecoverySlotGridItem_1 = require("../VisionRecovery/VisionRecoverySlotGridItem");
class VisionRefineResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.c3a = undefined;
    this.qGe = [];
    this.OnCloseCallback = undefined;
    this.m3a = () => {
      return new VisionRecoverySlotGridItem_1.VisionRecoverySlotGridItem(this.zvt, false);
    };
    this.D1c = () => {
      this.CloseMe(this.OnCloseCallback);
    };
    this.JEd = () => {
      var i;
      if (this.qGe.length === 1) {
        (i = new VisionIntensifyView_1.VisionIntensifyViewPassData()).UniqueId = this.qGe[0].GetUniqueId();
        UiManager_1.UiManager.OpenView("VisionIntensifyView", i);
        this.CloseMe(i => {
          if (this.OnCloseCallback !== undefined) {
            this.OnCloseCallback(i);
          }
        });
      }
    };
    this.zvt = (i, e) => {
      if (e !== undefined) {
        ItemController_1.ItemController.OpenItemTipsByItemUid(e.GetUniqueId(), e.GetConfigId());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIGridLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UIText], [11, UE.UIText]];
    this.BtnBindInfo = [[7, this.JEd], [1, this.D1c], [6, this.D1c]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(false);
    this.GetGridLayout(4).RootUIComp.SetUIActive(false);
    this.GetGridLayout(2).SetAlign(1);
    var i = this.OpenParam;
    this.ZEd(i.ShowTips);
    var e = i.Response;
    var o = i.ResponseBatch;
    let t = false;
    if (e !== undefined && e.xPs !== undefined) {
      this.qGe.push(ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataByPhantomItem(e.xPs));
      t = true;
    } else if (o !== undefined && o.TSg.length !== 0) {
      for (const r of o.TSg) {
        this.qGe.push(ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataByPhantomItem(r));
      }
      t = true;
    }
    if (t) {
      this.c3a = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.m3a, this.GetItem(0).GetOwner());
      await this.c3a.RefreshByDataAsync(this.qGe);
      if (i.PropIndexId !== undefined) {
        this.GetItem(8)?.SetUIActive(true);
        e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(i.PropIndexId);
        this.GetText(10).ShowTextNew(e.Name);
        this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(9));
      } else {
        this.GetItem(8)?.SetUIActive(false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 75, "Proto_UpdateInfo为空");
    }
  }
  OnAfterShow() {
    var i = [];
    for (const t of this.qGe) {
      var e = t.GetUniqueId();
      var o = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
      if (o === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Calabash", 75, "Proto_PhantomPolishResponse.Proto_UpdateInfo为空");
        }
      } else if (o.CanLock() && !o.GetIsLock()) {
        i.push(e);
      }
    }
    if (i.length > 0) {
      this.c5g(i);
    }
  }
  async c5g(i) {
    if (await ControllerHolder_1.ControllerHolder.InventoryController.PhantomFuncValueBatchRequest(i, Protocol_1.Aki.Protocol.Fxu.Z6n)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ItemLockSuccess");
    } else {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EchoAbandonToLock");
    }
    await this.c3a.RefreshByDataAsync(this.qGe);
  }
  ZEd(i) {
    this.GetItem(5).SetUIActive(i);
    this.GetButton(1).SetSelfInteractive(!i);
  }
}
exports.VisionRefineResultView = VisionRefineResultView;
//# sourceMappingURL=VisionRefineResultView.js.map