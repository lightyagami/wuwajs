"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerBuffDetailItem = undefined;
const UE = require("ue");
const BabelTowerBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerBuffById");
const BabelTowerDeTermById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerDeTermById");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const BabelTowerBuffStarAndDescItem_1 = require("./BabelTowerBuffStarAndDescItem");
class BabelTowerBuffDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.muc = undefined;
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [2, UE.UITexture], [1, UE.UITexture], [4, UE.UIItem], [3, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    this.muc = new BabelTowerBuffStarAndDescItem_1.BabelTowerBuffStarAndDescItem();
    await this.muc.CreateThenShowByResourceIdAsync("UiItem_TipsBuff", this.GetItem(4));
  }
  Update(e) {
    this.Pe = e;
    this.Refresh();
  }
  Refresh() {
    if (this.Pe) {
      let e = undefined;
      let i = undefined;
      let r = undefined;
      let t = undefined;
      t = (this.Pe.IsDeTerm ? (a = BabelTowerDeTermById_1.configBabelTowerDeTermById.GetConfig(this.Pe.Id), e = a.NameText, i = a.Texture, r = a.DesText, a) : (a = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(this.Pe.Id), e = a.NameText, i = a.Texture, r = a.DesText, a)).Star;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
      this.muc.Refresh(t.toString(), this.Pe.ShowStar ?? false, r);
      this.SetTextureByPath(i, this.GetTexture(2));
      var a = ModelManager_1.ModelManager.BabelTowerModel.CoverStarNumToQualityId(t);
      var s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TipsQualityTypeLevel" + a);
      this.SetTextureByPath(s, this.GetTexture(1));
      var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(a).QualityColor;
      var a = UE.Color.FromHex(s);
      var s = this.GetUiNiagara(3);
      s.SetColor(a);
      s.ActivateSystem(true);
    }
  }
}
exports.BabelTowerBuffDetailItem = BabelTowerBuffDetailItem;
//# sourceMappingURL=BabelTowerBuffDetailItem.js.map