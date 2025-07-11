"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkRewardLimitTimeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivitySmallItemGrid_1 = require("../../../Activity/ActivityContent/UniversalComponents/ActivitySmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const DreamLinkController_1 = require("../../DreamLinkController");
class DreamLinkRewardLimitTimeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.RewardScrollView = undefined;
    this.W2e = () => {
      return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    };
    this.qOe = () => {
      DreamLinkController_1.DreamLinkController.LimitTimeRewardRequest(this.Data.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [0, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIText], [8, UE.UIText]];
    this.BtnBindInfo = [[1, this.qOe]];
  }
  OnStart() {
    this.RewardScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.W2e);
    this.GetButton(0).RootUIComp.SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
  }
  Refresh(i, e, t) {
    this.Data = i;
    var r;
    var s;
    var n;
    var a = ConfigManager_1.ConfigManager.DreamLinkConfig.GetLimitTimeRewardConfig(i.Id);
    if (a) {
      n = i.Status === 1;
      r = i.Status === 2;
      s = i.Status === 0;
      this.jqe(a.TargetReward, r);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), a.TargetName);
      this.GetText(7).SetUIActive(n);
      this.GetItem(2).SetUIActive(r);
      this.GetButton(1).RootUIComp.SetUIActive(s);
      a = i.Current;
      n = i.Target;
      this.GetText(8).SetText(Math.min(a, n) + "/" + n);
    }
  }
  jqe(i, e) {
    var t = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(i)) {
      var r = {
        Item: s,
        HasClaimed: e
      };
      t.push(r);
    }
    this.RewardScrollView.RefreshByData(t);
  }
}
exports.DreamLinkRewardLimitTimeItem = DreamLinkRewardLimitTimeItem;
//# sourceMappingURL=DreamLinkRewardLimitTimeItem.js.map