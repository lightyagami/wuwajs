"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerBuffItem = undefined;
const UE = require("ue");
const BabelTowerBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerBuffById");
const BabelTowerDeTermById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerDeTermById");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const BabelTowerBuffStarItem_1 = require("./BabelTowerBuffStarItem");
class BabelTowerBuffItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.tqe = undefined;
    this.OnToggleClick = undefined;
    this.LZ_ = () => {
      this.OnToggleClick?.(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIExtendToggle]];
    this.BtnBindInfo = [[6, this.LZ_]];
  }
  async OnBeforeStartAsync() {
    this.tqe = new BabelTowerBuffStarItem_1.BabelTowerStarItem();
    await this.tqe.CreateThenShowByResourceIdAsync("UiItem_ItemAStar", this.GetItem(4));
  }
  Refresh(e, t, r) {
    this.Pe = e;
    var i = this.GetExtendToggle(6);
    i.SetSelfInteractive(e.CanClick);
    i.SetToggleState(t ? 1 : 0);
    let s = undefined;
    let o = undefined;
    let a = undefined;
    a = (this.Pe.IsDeTerm ? (i = BabelTowerDeTermById_1.configBabelTowerDeTermById.GetConfig(this.Pe.Id), s = i.NameText, o = i.Texture, i) : (t = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(this.Pe.Id), s = t.NameText, o = t.Texture, t)).Star;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s);
    this.SetTextureByPath(o, this.GetTexture(1));
    if (e.ShowStar) {
      this.tqe.SetActive(true);
      this.tqe.SetText(a.toString());
    } else {
      this.tqe.SetActive(false);
    }
    i = ModelManager_1.ModelManager.BabelTowerModel.CoverStarNumToQualityId(a);
    this.SetQualityIconById(this.GetSprite(0), i);
  }
  OnSelected(e) {
    this.GetExtendToggle(6).SetToggleState(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(6).SetToggleState(0);
  }
}
exports.BabelTowerBuffItem = BabelTowerBuffItem;
//# sourceMappingURL=BabelTowerBuffItem.js.map