"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRewardPreviewView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class MotorcycleRewardPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.avt = [];
    this.vVt = undefined;
    this.cHe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem]];
  }
  OnStart() {
    var e = this.OpenParam;
    var i = this.GetItem(1).GetOwner();
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), i, this.cHe);
    this.avt = e;
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    this.vVt.RefreshByData(this.avt);
  }
}
exports.MotorcycleRewardPreviewView = MotorcycleRewardPreviewView;
//# sourceMappingURL=MotorcycleRewardPreviewView.js.map