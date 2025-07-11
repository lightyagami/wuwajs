"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQteSuccessView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const DockyardItemListItem_1 = require("../../../Module/Activity/ActivityContent/Fishing/Dockyard/List/DockyardItemListItem");
const GenericScrollViewNew_1 = require("../../../Module/Util/ScrollView/GenericScrollViewNew");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class FishingQteSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.kGe = undefined;
    this.W2e = () => {
      var e = new DockyardItemListItem_1.DockyardItemListItem();
      e.NeedInteract = false;
      return e;
    };
    this.Lxt = () => {
      ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardWareHouseView(false);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Lxt], [1, this.Lxt]];
  }
  OnStart() {
    this.kGe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.W2e);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.kGe.RefreshByData(e, undefined, true);
  }
}
exports.FishingQteSuccessView = FishingQteSuccessView;
//# sourceMappingURL=FishingQteSuccessView.js.map