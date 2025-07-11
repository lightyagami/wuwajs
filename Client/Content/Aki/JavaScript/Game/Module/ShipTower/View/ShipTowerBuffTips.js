"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerBuffTips = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const ShipTowerBuffWayItem_1 = require("./ShipTowerBuffWayItem");
class ShipTowerBuffTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.s4e = undefined;
    this.vs_ = () => {
      return new ShipTowerBuffWayItem_1.ShipTowerBuffWayItem();
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.s4e = new GenericLayout_1.GenericLayout(this.GetGridLayout(9), this.vs_);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIButtonComponent]];
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateData(e) {
    this.Pe = e;
    var e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(this.Pe.ItemId);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.Pe.ItemId);
    this.GetText(2).ShowTextNew(e.Title);
    this.GetText(3).ShowTextNew(i.BgDescription);
    this.SetTextureByPath(i.IconMiddle, this.GetTexture(4));
    var i = !!e.GetWayData?.length;
    this.GetGridLayout(9).RootUIComp.SetUIActive(i);
    if (i) {
      this.s4e?.RefreshByDataAsync(e.GetWayData);
    }
  }
}
exports.ShipTowerBuffTips = ShipTowerBuffTips;
//# sourceMappingURL=ShipTowerBuffTips.js.map