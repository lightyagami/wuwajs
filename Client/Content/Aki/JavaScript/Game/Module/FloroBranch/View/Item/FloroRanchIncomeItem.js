"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchIncomeItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FloroRanchIncomeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.yR = undefined;
    this.Gvr = undefined;
    this.Nji = () => {
      this.Gvr?.(this.GridIndex, this.yR);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIExtendToggle]];
    this.BtnBindInfo = [[9, this.Nji]];
  }
  Refresh(t, s, i) {
    this.yR = t.EntityData;
    this.Og(t.Rank);
  }
  Og(t) {
    this.GetText(0).SetText(t.toString());
    var t = this.yR.CheckGetComponent(0);
    var s = t.EntityType;
    var i = ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(t.Income);
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(1);
    this.SetTextureByPath(e.GetSmallIcon(), this.GetTexture(6));
    this.GetText(7).SetText(i);
    this.GetItem(3).SetUIActive(!t.IsValid);
    var e = t.Point;
    var i = e !== -1;
    this.GetItem(5).SetUIActive(i);
    this.GetItem(8).SetUIActive(!i);
    switch (s) {
      case 1:
        this.cHt();
        break;
      case 0:
        this.vbu();
        break;
      case 2:
        this.ybu();
    }
  }
  cHt() {
    var t = this.yR.CheckGetComponent(1).CardData;
    var s = t.GetCardQualityData();
    this.SetSpriteByPath(s.GetRaritySmallBg(), this.GetSprite(1), true);
    this.GetSprite(1).SetUIActive(true);
    var s = t.GetIcon();
    this.SetTextureByPath(s, this.GetTexture(2));
    var s = t.GetName();
    this.GetText(4).ShowTextNew(s);
  }
  vbu() {
    var t = this.yR.CheckGetComponent(2).TerrainData;
    this.GetSprite(1).SetUIActive(false);
    this.SetTextureByPath(t.Icon, this.GetTexture(2));
    this.GetText(4).SetText(t.Name);
  }
  ybu() {
    var t = this.yR.CheckGetComponent(3).ToyData;
    var s = t.GetToyQualityData();
    this.SetSpriteByPath(s.GetRaritySmallBg(), this.GetSprite(1), true);
    this.GetSprite(1).SetUIActive(true);
    var s = t.GetIcon();
    this.SetTextureByPath(s, this.GetTexture(2));
    var s = t.GetName();
    this.GetText(4).ShowTextNew(s);
  }
  BindClickCallBack(t) {
    this.Gvr = t;
  }
  SetSelectState(t) {
    this.GetExtendToggle(9)?.SetToggleState(t ? 1 : 0);
  }
}
exports.FloroRanchIncomeItem = FloroRanchIncomeItem;
//# sourceMappingURL=FloroRanchIncomeItem.js.map