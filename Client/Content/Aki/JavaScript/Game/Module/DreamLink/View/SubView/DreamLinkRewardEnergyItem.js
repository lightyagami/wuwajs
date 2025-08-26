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
class DreamLinkRewardEnergyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.RewardScrollView = undefined;
    this.cKu = undefined;
    this.W2e = () => {
      return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    };
    this.qOe = () => {
      this.cKu?.();
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
  Refresh(e, i, t) {
    this.Data = e;
    var r;
    var s;
    var a = ConfigManager_1.ConfigManager.DreamLinkConfig.GetEnergyRewardConfig(e.Id);
    if (a) {
      r = e.Status === 1;
      s = e.Status === 2;
      e = e.Status === 0;
      this.jqe(a.DropId, s);
      this.GetText(3).SetText(a.NeedEnergy.toString());
      this.GetText(7).SetUIActive(r);
      this.GetItem(2).SetUIActive(s);
      this.GetButton(1).RootUIComp.SetUIActive(e);
    }
  }
  SetBtnClickCallback(e) {
    this.cKu = e;
  }
  jqe(e, i) {
    var t = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e)) {
      var r = {
        Item: s,
        HasClaimed: i
      };
      t.push(r);
    }
    this.RewardScrollView.RefreshByData(t);
  }
}
exports.DreamLinkRewardEnergyItem = DreamLinkRewardEnergyItem;
//# sourceMappingURL=DreamLinkRewardEnergyItem.js.map