"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemHintView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const ItemHintItem_1 = require("./ItemHintItem");
const ItemPriorHintItem_1 = require("./ItemPriorHintItem");
const ListSliderControl_1 = require("./ListSliderControl");
class ItemHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.e0i = undefined;
    this.t0i = undefined;
    this.i0i = () => ConfigManager_1.ConfigManager.ItemConfig.GetItemListMaxSize();
    this.o0i = () => ConfigManager_1.ConfigManager.ItemConfig.GetPriorItemListMaxSize();
    this.r0i = () => !ModelManager_1.ModelManager.ItemHintModel.IsMainInterfaceDataEmpty;
    this.n0i = () => !ModelManager_1.ModelManager.ItemHintModel.IsPriorInterfaceDataEmpty;
    this.s0i = () => ConfigManager_1.ConfigManager.RewardConfig.GetNextItemTime();
    this.HDe = () => {
      if (this.t0i.IsFinish && this.e0i.IsFinish) {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [0, UE.UIItem]];
  }
  OnBeforeDestroy() {
    if (this.e0i) {
      this.e0i.DestroyMe();
      this.e0i = undefined;
    }
    if (this.t0i) {
      this.t0i.DestroyMe();
      this.t0i = undefined;
    }
  }
  OnStart() {
    if (this.r0i() || this.n0i()) {
      this.e0i = new ListSliderControl_1.ListSliderControl(ItemHintItem_1.ItemHintItem, this.GetItem(1), this.i0i, this.r0i, this.s0i, this.HDe, 0);
      this.e0i.SetDynamicLoadResourceId("UiItem_ItemListB");
      this.e0i.DisEnableParentLayout();
      this.t0i = new ListSliderControl_1.ListSliderControl(ItemPriorHintItem_1.ItemPriorHintItem, this.GetItem(0), this.o0i, this.n0i, this.s0i, this.HDe, 0);
      this.t0i.SetDynamicLoadResourceId("UiItem_ItemListA");
      this.t0i.DisEnableParentLayout();
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ItemHint", 8, "进包列表为空, 但打开了界面!");
      }
      this.CloseMe();
    }
  }
  OnTick(i) {
    if (this.t0i) {
      this.t0i.Tick(i);
    }
    if (this.e0i) {
      this.e0i.Tick(i);
    }
  }
}
exports.ItemHintView = ItemHintView;
//# sourceMappingURL=ItemHintView.js.map