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
    this.Qld = () => new ItemHintItem_1.ItemHintItem();
    this.Kld = () => new ItemPriorHintItem_1.ItemPriorHintItem();
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
    var i;
    var e;
    if (this.r0i() || this.n0i()) {
      i = this.GetItem(1);
      e = this.GetItem(0);
      i.SetUIActive(false);
      e.SetUIActive(false);
      this.e0i = new ListSliderControl_1.ListSliderControl({
        CreateProxyFunction: this.Qld,
        ParentUi: i.GetParentAsUIItem(),
        CheckNext: this.r0i,
        MaxShowCount: this.i0i(),
        AddItemTime: this.s0i(),
        ItemSliderTime: ConfigManager_1.ConfigManager.RewardConfig.GetSliderTime(),
        ItemShowTime: ConfigManager_1.ConfigManager.RewardConfig.GetShowTime(),
        FinishCallback: this.HDe,
        SliderMode: 0,
        ChildResourceId: "UiItem_ItemListB"
      });
      this.e0i.DisEnableParentLayout();
      this.t0i = new ListSliderControl_1.ListSliderControl({
        CreateProxyFunction: this.Kld,
        ParentUi: e.GetParentAsUIItem(),
        CheckNext: this.n0i,
        MaxShowCount: this.o0i(),
        AddItemTime: this.s0i(),
        ItemSliderTime: ConfigManager_1.ConfigManager.RewardConfig.GetSliderTime(),
        ItemShowTime: ConfigManager_1.ConfigManager.RewardConfig.GetShowTime(),
        FinishCallback: this.HDe,
        SliderMode: 0,
        ChildResourceId: "UiItem_ItemListA"
      });
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