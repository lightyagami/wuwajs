"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDungeonRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.W1i = -1;
    this.YVe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIGridLayout]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.YVe);
  }
  Refresh(e, t, r) {
    var i = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e[1]);
    var n = new Array();
    for (const s of i.keys()) {
      var o = [{
        IncId: 0,
        ItemId: s
      }, i.get(s)];
      n.push(o);
    }
    this.eGe.RefreshByData(n);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "InstanceRewardDes", e[0]);
    this.W1i = e[0];
  }
  SetCurrentItem(e) {
    this.GetItem(1)?.SetUIActive(this.W1i === e);
  }
}
exports.InstanceDungeonRewardItem = InstanceDungeonRewardItem;
//# sourceMappingURL=InstanceDungeonRewardItem.js.map