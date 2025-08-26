"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTrapDefenseRewardBtn = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityTrapDefenseRewardBtn extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RedDotName = undefined;
    this.OnClickBtnCallback = undefined;
    this.OnClickBtnSelf = () => {
      this.OnClickBtnCallback?.();
    };
  }
  async Init(t) {
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickBtnSelf]];
  }
  OnStart() {
    this.SetRedDotVisible(false);
  }
  OnBeforeShow() {}
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  SetEnableClick(t) {
    this.GetBtn().SetSelfInteractive(t);
  }
  SetRedDotVisible(t) {
    this.GetRedDotItem().SetUIActive(t);
  }
  BindRedDot(t, e = 0) {
    this.UnBindRedDot();
    this.RedDotName = t;
    if (this.RedDotName) {
      RedDotController_1.RedDotController.BindRedDot(t, this.GetRedDotItem(), undefined, e);
    }
  }
  BindGivenUid(t, e) {
    this.RedDotName = t;
    if (this.RedDotName) {
      RedDotController_1.RedDotController.BindRedDot(t, this.GetRedDotItem(), undefined, e);
    }
  }
  UnBindGivenUid(t) {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.RedDotName, this.GetRedDotItem(), t);
    }
  }
  UnBindRedDot() {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindRedDot(this.RedDotName);
      this.RedDotName = undefined;
    }
  }
  GetBtn() {
    return this.GetButton(0);
  }
  GetRedDotItem() {
    return this.GetItem(3);
  }
  GetTitleText() {
    return this.GetText(1);
  }
  GetProgressText() {
    return this.GetText(2);
  }
}
exports.ActivityTrapDefenseRewardBtn = ActivityTrapDefenseRewardBtn;
//# sourceMappingURL=ActivityTrapDefenseRewardBtn.js.map