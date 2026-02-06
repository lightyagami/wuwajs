"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTabItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem");
const UiTabCamera_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabCamera");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class MotorcycleTabItem extends CommonTabItem_1.CommonTabItem {
  constructor() {
    super(...arguments);
    this.PEg = undefined;
    this.OnRegisterViewCallback = undefined;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([4, UE.UISprite]);
  }
  OnStart() {
    super.OnStart();
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("MotorPreviewRedDotIcon");
    if (e) {
      this.SetSpriteByPath(e, this.GetSprite(4), true);
    }
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabCamera_1.UiTabCamera).SetTabData(e.GetViewName());
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
    this.OnRegisterViewCallback?.(e);
  }
  BindPreviewRedDot(e) {
    this.UnBindPreviewRedDot();
    var o = this.GetSprite(4);
    this.PEg = e;
    RedDotController_1.RedDotController.BindRedDot(e, o);
  }
  UnBindPreviewRedDot() {
    if (this.PEg) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.PEg, this.GetSprite(4));
      this.PEg = undefined;
    }
  }
}
exports.MotorcycleTabItem = MotorcycleTabItem;
//# sourceMappingURL=MotorcycleTabItem.js.map