"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeLevelDetailView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const MotorcycleTechTreeListLevelItem_1 = require("../Item/MotorcycleTechTreeListLevelItem");
class MotorcycleTechTreeLevelDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.xDf = undefined;
    this.sGe = () => new MotorcycleTechTreeListLevelItem_1.MotorcycleTechTreeListLevelItem();
    this.xpt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.xpt);
    this.lqe.SetTitleLocalText("MotorBike_TechTree_TechLevelDetail");
    this.lqe.SetHelpBtnActive(false);
    this.xDf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.sGe);
    var e = this.OpenParam;
    this.xDf.RefreshByData(e);
  }
  OnBeforeDestroy() {
    this.lqe.Destroy();
  }
}
exports.MotorcycleTechTreeLevelDetailView = MotorcycleTechTreeLevelDetailView;
//# sourceMappingURL=MotorcycleTechTreeLevelDetailView.js.map