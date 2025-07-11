"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemPriorHintItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemHintItem_1 = require("./ItemHintItem");
class ItemPriorHintItem extends ItemHintItem_1.ItemHintItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [3, UE.UIText], [2, UE.UIText], [4, UE.UITexture], [5, UE.UISprite], [6, UE.UINiagara]];
  }
  async AsyncLoadUiResource() {
    this.Data = ModelManager_1.ModelManager.ItemHintModel.ShiftPriorInterfaceData();
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityByItemIdAndQuality(this.Data.ItemId, this.Data.Quality);
    this.SetTextureByPath(e.AcquireQualityTexPath, this.GetTexture(4));
    const i = new CustomPromise_1.CustomPromise();
    const r = this.Data.Quality >= 5;
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r ? "NS_Fx_LGUI_ItemList_Golden" : "NS_Fx_LGUI_ItemList_Other");
    const s = UE.Color.FromHex(e.TextColor);
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, e => {
      var t;
      i.SetResult(undefined);
      if (e && UiManager_1.UiManager.IsViewOpen("ItemHintView") && this.RootItem) {
        (t = this.GetUiNiagara(6)).SetNiagaraSystem(e);
        if (!r) {
          t.ColorParameter.Get("Color").Constant = UE.LinearColor.FromSRGBColor(s);
        }
      }
    });
    this.SetSpriteByPath(e.AcquireQualitySpritePath, this.GetSprite(5), false);
    const o = new CustomPromise_1.CustomPromise();
    this.SetItemIcon(this.GetTexture(0), this.Data.ItemId, undefined, () => {
      o.SetResult(undefined);
    });
    await Promise.all([o.Promise, i.Promise]);
  }
}
exports.ItemPriorHintItem = ItemPriorHintItem;
//# sourceMappingURL=ItemPriorHintItem.js.map