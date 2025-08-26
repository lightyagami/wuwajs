"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGoodsItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FloroRanchGoodsItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.NTt = undefined;
    this.oLu = () => {
      this.NTt?.(this.Data);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UITexture], [3, UE.UISprite], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [0, UE.UIExtendToggle], [1, UE.UIItem], [9, UE.UIItem], [10, UE.UITexture], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.oLu]];
  }
  Refresh(t, s, i) {
    this.Data = t;
    this.SetTextureByPath(this.Data.GetIcon(), this.GetTexture(2));
    var e = this.Data.GetQualityData();
    this.SetSpriteByPath(e.GetRarityShopItemBg(), this.GetSprite(3), true);
    this.GetItem(11)?.SetUIActive(this.Data.GetIsSpecialPhantom());
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
    this.SetTextureByPath(e.ConfigData.GetSmallIcon(), this.GetTexture(4));
    var r = this.Data.Price;
    var e = e.GetAmount() >= r;
    var o = this.GetText(5);
    o.SetText(r.toString());
    o.SetChangeColor(!e, o.changeColor);
    this.GetText(6)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
    this.GetItem(9)?.SetUIActive(false);
    if (t.Type === Protocol_1.Aki.Protocol.bou.Proto_ShopToy && (r = t.GetToyRaceData())) {
      this.SetTextureByPath(r.SmallIcon, this.GetTexture(10));
      this.GetItem(9)?.SetUIActive(true);
    }
    this.GetItem(8)?.SetUIActive(this.Data.IsSold);
  }
  BindClickCallback(t) {
    this.NTt = t;
  }
  SetSelectState(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0, false);
  }
}
exports.FloroRanchGoodsItem = FloroRanchGoodsItem;
//# sourceMappingURL=FloroRanchGoodsItem.js.map