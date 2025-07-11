"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerRecommendView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TowerRecommendItem_1 = require("./TowerRecommendItem");
class TowerRecommendView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.rRo = undefined;
    this.sbi = () => {
      return new TowerRecommendItem_1.TowerRecommendItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIText]];
  }
  OnStart() {
    this.rRo = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.sbi);
    this.Og();
  }
  OnBeforeDestroy() {
    this.rRo = undefined;
  }
  Og() {
    if (ModelManager_1.ModelManager.TowerModel.RecommendFormation && ModelManager_1.ModelManager.TowerModel.RecommendFormation?.length > 0) {
      this.rRo.SetActive(true);
      this.rRo.RefreshByData(ModelManager_1.ModelManager.TowerModel.RecommendFormation);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_DataFromOther_Text");
    } else {
      this.rRo.SetActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_DataCollation_Text");
    }
  }
}
exports.TowerRecommendView = TowerRecommendView;
//# sourceMappingURL=TowerRecommendView.js.map