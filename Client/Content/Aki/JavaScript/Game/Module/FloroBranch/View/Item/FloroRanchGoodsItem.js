"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGoodsItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FloroRanchGoodsItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.NTt = undefined;
    this.BRu = () => {
      this.NTt?.(this.GridIndex, this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UITexture], [3, UE.UISprite], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [0, UE.UIExtendToggle], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.BRu]];
  }
  Refresh(t, s, i) {
    this.Pe = t;
    this.SetTextureByPath(this.Pe.GetIcon(), this.GetTexture(2));
    var t = this.Pe.GetQualityData();
    this.SetSpriteByPath(t.GetRarityShopItemBg(), this.GetSprite(3), true);
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
    this.SetTextureByPath(t.ConfigData.GetSmallIcon(), this.GetTexture(4));
    var e = this.Pe.Price;
    var t = t.GetAmount() >= e;
    var r = this.GetText(5);
    r.SetText(e.toString());
    r.SetChangeColor(!t, r.changeColor);
    this.GetText(6)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
    this.GetItem(8)?.SetUIActive(this.Pe.IsSold);
  }
  BindClickCallback(t) {
    this.NTt = t;
  }
  SetSelectState(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0);
  }
}
exports.FloroRanchGoodsItem = FloroRanchGoodsItem;
//# sourceMappingURL=FloroRanchGoodsItem.js.map