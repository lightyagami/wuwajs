"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerMonsterInfoItem = undefined;
const UE = require("ue");
const TowerElementItem_1 = require("../../TowerDetailUi/View/TowerElementItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ShipTowerMonsterInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.bD_ = undefined;
    this.Bqe = () => {
      return new TowerElementItem_1.TowerElementItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIHorizontalLayout]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.bD_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.Bqe);
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "LevelText", e.Level);
    this.GetText(0).ShowTextNew(e.Title);
    this.SetTextureByPath(e.MonsterIcon, this.GetTexture(2));
    this.bD_?.RefreshByData(e.ElementList);
  }
}
exports.ShipTowerMonsterInfoItem = ShipTowerMonsterInfoItem;
//# sourceMappingURL=ShipTowerMonsterInfoItem.js.map