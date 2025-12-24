"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyFrameTabView = undefined;
const UE = require("ue");
const UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const MotorcycleDiyFrameItem_1 = require("../../Item/MotorcycleDiyFrameItem");
class MotorcycleDiyFrameTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.OCf = undefined;
    this.GCf = () => {
      return new MotorcycleDiyFrameItem_1.FrameItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.OCf = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(2).GetOwner(), this.GCf, true);
  }
  RefreshByData() {
    this.OCf?.RefreshByData([]);
  }
}
exports.MotorcycleDiyFrameTabView = MotorcycleDiyFrameTabView;
//# sourceMappingURL=MotorcycleDiyFrameTabView.js.map