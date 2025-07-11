"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerRecordItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const ShipTowerMediumItem_1 = require("./ShipTowerMediumItem");
class ShipTowerRecordItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.H3e = undefined;
    this.ClickCallBack = undefined;
    this.wD_ = () => {
      var e = new ShipTowerMediumItem_1.ShipTowerMediumItem();
      e.RefreshCallBack = e.RefreshRecord.bind(e);
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.wD_);
  }
  Refresh(e) {
    this.fGt = e;
    this.GetText(0)?.SetText(this.fGt.Title);
    this.GetText(1)?.SetText(this.fGt.Score.toString());
    this.GetText(2)?.SetText(this.fGt.Wave.toString());
    e = [...this.fGt.TeamList, {
      Id: this.fGt.BuffId,
      Count: 1
    }];
    this.H3e?.RefreshByData(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerRecordItem", ["Refresh", this.fGt]);
    }
  }
}
exports.ShipTowerRecordItem = ShipTowerRecordItem;
//# sourceMappingURL=ShipTowerRecordItem.js.map