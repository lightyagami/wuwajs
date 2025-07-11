"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkRewardEnergyItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivitySmallItemGrid_1 = require("../../../Activity/ActivityContent/UniversalComponents/ActivitySmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const DreamLinkController_1 = require("../../DreamLinkController");
class DreamLinkRewardEnergyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.RewardScrollView = undefined;
    this.W2e = () => {
      return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    };
    this.qOe = () => {
      DreamLinkController_1.DreamLinkController.EnergyRewardRequest(this.Data.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [0, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIText]];
    this.BtnBindInfo = [[1, this.qOe]];
  }
  OnStart() {
    this.RewardScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.W2e);
    this.GetButton(0).RootUIComp.SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
  }
  Refresh(e, r, i) {
    this.Data = e;
    var t;
    var s;
    var n = ConfigManager_1.ConfigManager.DreamLinkConfig.GetEnergyRewardConfig(e.Id);
    if (n) {
      t = e.Status === 1;
      s = e.Status === 2;
      e = e.Status === 0;
      this.jqe(n.DropId, s);
      this.GetText(3).SetText(n.NeedEnergy.toString());
      this.GetText(7).SetUIActive(t);
      this.GetItem(2).SetUIActive(s);
      this.GetButton(1).RootUIComp.SetUIActive(e);
    }
  }
  jqe(e, r) {
    var i = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e)) {
      var t = {
        Item: s,
        HasClaimed: r
      };
      i.push(t);
    }
    this.RewardScrollView.RefreshByData(i);
  }
}
exports.DreamLinkRewardEnergyItem = DreamLinkRewardEnergyItem;
//# sourceMappingURL=DreamLinkRewardEnergyItem.js.map