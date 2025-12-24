"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleConditionView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const MotorcycleConditionItem_1 = require("../Item/MotorcycleConditionItem");
class MotorcycleConditionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pol = [];
    this.o8a = undefined;
    this.n8a = () => new MotorcycleConditionItem_1.MotorcycleConditionItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem]];
  }
  OnStart() {
    this.Pol = this.OpenParam;
    this.CreateConditionLayout();
  }
  OnBeforeShow() {
    this.o8a.RefreshByData(this.Pol);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "MotorBike_ExpGuide");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "MotorBike_ExpGuide_Title");
  }
  CreateConditionLayout() {
    var i = this.GetLoopScrollViewComponent(2);
    var e = this.GetItem(3);
    this.o8a = new LoopScrollView_1.LoopScrollView(i, e.GetOwner(), this.n8a);
  }
}
exports.MotorcycleConditionView = MotorcycleConditionView;
//# sourceMappingURL=MotorcycleConditionView.js.map