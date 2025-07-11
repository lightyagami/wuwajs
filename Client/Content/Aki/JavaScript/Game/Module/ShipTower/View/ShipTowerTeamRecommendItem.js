"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerTeamRecommendItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerMediumItem_1 = require("./ShipTowerMediumItem");
class ShipTowerTeamRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.PD_ = undefined;
    this.xD_ = undefined;
    this.ClickCallBack = undefined;
    this.i7_ = undefined;
    this.UD_ = () => {
      this.ClickCallBack?.(this.fGt);
    };
    this.DD_ = () => {
      var e = new ShipTowerMediumItem_1.ShipTowerMediumItem();
      e.RefreshCallBack = e.RefreshRecommend.bind(e);
      e.GetStageIdCallback = this.BW_;
      return e;
    };
    this.BW_ = () => this.fGt.StageData?.Id;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIHorizontalLayout], [4, UE.UIButtonComponent]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.PD_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.DD_);
    this.xD_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.DD_);
    this.i7_ = new ButtonItem_1.ButtonItem(this.GetButton(4)?.RootUIComp);
    this.i7_.SetFunction(this.UD_);
    this.i7_.SetShowText(ShipTowerDefine_1.shipTowerTextKey.Use);
  }
  OnStart() {}
  Refresh(e, t, i) {
    var r = [...(this.fGt = e).RoleIdList1, {
      Id: e.Buff1,
      Count: 1
    }];
    var s = [...e.RoleIdList2, {
      Id: e.Buff2,
      Count: 1
    }];
    this.PD_?.RefreshByData(r);
    this.xD_?.RefreshByData(s);
    this.GetText(0)?.SetText(e.Name);
    this.GetText(1)?.SetText(e.UseRate + "%");
    var r = !!this.fGt.StageData?.IsCanApplyTeamRecommend(this.fGt);
    this.i7_.SetEnableClick(r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerTeamRecommendItem", ["Refresh", this.fGt.Name]);
    }
  }
}
exports.ShipTowerTeamRecommendItem = ShipTowerTeamRecommendItem;
//# sourceMappingURL=ShipTowerTeamRecommendItem.js.map