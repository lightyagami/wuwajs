"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerMonsterListItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const ShipTowerMonsterInfoItem_1 = require("./ShipTowerMonsterInfoItem");
class ShipTowerMonsterListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LD_ = undefined;
    this.Bqe = () => {
      return new ShipTowerMonsterInfoItem_1.ShipTowerMonsterInfoItem();
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.LD_ = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.Bqe);
  }
  UpdateData(e) {
    this.GetText(0).SetText(e.Title);
    this.LD_?.RefreshByData(e.MonsterInfoList);
  }
}
exports.ShipTowerMonsterListItem = ShipTowerMonsterListItem;
//# sourceMappingURL=ShipTowerMonsterListItem.js.map