"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerBuffListItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const ShipTowerBuffItem_1 = require("./ShipTowerBuffItem");
class ShipTowerBuffListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.s4e = undefined;
    this.OnItemClickCallback = undefined;
    this.GetStageIdCallback = undefined;
    this.BuffComponentLoadedCallback = undefined;
    this.gDo = () => {
      var t = new ShipTowerBuffItem_1.ShipTowerBuffItem();
      t.OnItemClickCallback = this.OnItemClickCallback;
      t.GetStageIdCallback = this.GetStageIdCallback;
      t.AllComponentLoadedCallback = this.BuffComponentLoadedCallback;
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.s4e = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.gDo);
  }
  async RefreshAsync(t) {
    this.fGt = t;
    await this.s4e?.RefreshByDataAsync(this.fGt?.BuffList, true);
    this.GetText(0).ShowTextNew(this.fGt.Title);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, this.constructor.name, ["RefreshAsync", this.fGt]);
    }
  }
  Refresh(t) {
    this.fGt = t;
    this.s4e?.RefreshByData(this.fGt?.BuffList, undefined, true);
    this.GetText(0).ShowTextNew(this.fGt.Title);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, this.constructor.name, ["Refresh", this.fGt]);
    }
  }
  UpdateBuffInfo() {
    this.s4e?.GetLayoutItemList().forEach(t => {
      t.UpdateBuffInfo();
    });
  }
  UpdateBuffSelected() {
    this.s4e?.GetLayoutItemList().forEach(t => {
      t.UpdateBuffSelected();
    });
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (this.fGt && this.fGt.BuffList.length !== 0 && t.length === 3) {
      t = Number(t[2]);
      if (!isNaN(t) && !(t < 0) && !(t >= this.fGt.BuffList.length) && (t = this.s4e?.GetItemByIndex(t))) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.ShipTowerBuffListItem = ShipTowerBuffListItem;
//# sourceMappingURL=ShipTowerBuffListItem.js.map