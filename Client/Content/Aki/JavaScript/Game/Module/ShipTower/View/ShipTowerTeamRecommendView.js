"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerTeamRecommendView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerTeamRecommendItem_1 = require("./ShipTowerTeamRecommendItem");
class ShipTowerTeamRecommendView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.BD_ = undefined;
    this.kD_ = () => {
      var e = new ShipTowerTeamRecommendItem_1.ShipTowerTeamRecommendItem();
      e.ClickCallBack = this.qD_;
      return e;
    };
    this.qD_ = e => {
      if (!!this.OpenParam?.StageData.IsCanApplyTeamRecommend(e) && this.OpenParam?.StageData.UseTeamRecommend(e)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(ShipTowerDefine_1.shipTowerTextKey.TeamUsed);
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIText]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam?.StageData.Id]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    await this.OpenParam?.StageData.RequestTeamRecommendList();
    this.BD_ = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.kD_);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    var e = this.OpenParam?.StageData.TeamRecommendList ?? [];
    this.BD_?.RefreshByData(e);
    this.GetText(1)?.SetUIActive(e.length <= 0);
  }
}
exports.ShipTowerTeamRecommendView = ShipTowerTeamRecommendView;
//# sourceMappingURL=ShipTowerTeamRecommendView.js.map