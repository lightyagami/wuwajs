"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingHandBookRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const FishingController_1 = require("../FishingController");
const TAKEN_ALPHA = 0.6;
class FishingHandBookRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Jkt = 0;
    this.bOe = undefined;
    this.YVe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.YDo = () => {
      var e = ModelManager_1.ModelManager.FishingModel.FishingItemHandBookRewardMap;
      var e = Array.from(e.values()).filter(e => e.IsFinished && !e.IsTaken).map(e => e.Id);
      FishingController_1.FishingController.RequestMultiFishingIllustratedRewardRequest(e);
    };
    this.Ykt = () => {
      var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingIllustratedRewardById(this.Jkt);
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.AccessPath);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.YDo], [1, this.Ykt]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.YVe);
  }
  Refresh(e, i, r) {
    this.Jkt = e;
    var e = ModelManager_1.ModelManager.FishingModel.FishingItemHandBookRewardMap.get(this.Jkt);
    this.GetItem(3)?.SetUIActive(false);
    this.GetButton(0)?.RootUIComp.SetUIActive(false);
    this.GetButton(1)?.RootUIComp.SetUIActive(false);
    if (e?.IsTaken) {
      this.GetItem(3)?.SetUIActive(true);
      this.GetItem(7).SetAlpha(TAKEN_ALPHA);
    } else {
      (e?.IsFinished ? this.GetButton(0) : this.GetButton(1))?.RootUIComp.SetUIActive(true);
      this.GetItem(7).SetAlpha(1);
    }
    this.GetText(5).SetText(e?.Current + "/" + e?.Target);
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingIllustratedRewardById(this.Jkt);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Desc);
    var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e.DropId);
    var s = new Array();
    for (const n of t.keys()) {
      var a = [{
        IncId: 0,
        ItemId: n
      }, t.get(n)];
      s.push(a);
    }
    this.bOe?.RefreshByData(s);
  }
}
exports.FishingHandBookRewardItem = FishingHandBookRewardItem;
//# sourceMappingURL=FishingHandBookRewardItem.js.map