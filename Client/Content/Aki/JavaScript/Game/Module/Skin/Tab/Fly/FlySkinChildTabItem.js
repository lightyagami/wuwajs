"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinChildTabItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FlySkinChildTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.h3c = 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIItem]];
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
  Update(e) {
    this.h3c = e;
    e = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinTabName(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
    this.Ovt();
    this.K8e();
  }
  K8e() {
    var e = this.GetItem(2);
    RedDotController_1.RedDotController.BindRedDot("FlySkinChildTab", e, undefined, this.h3c);
  }
  Ovt() {
    var e = this.GetItem(2);
    RedDotController_1.RedDotController.UnBindGivenUi("FlySkinChildTab", e, this.h3c);
  }
  SetItemToggleState(e, t) {
    this.GetExtendToggle(1).SetToggleState(e, t);
  }
  AddItemToggleStateChange(e) {
    this.GetExtendToggle(1).OnStateChange.Add(e);
  }
  SetCanItemToggleStateChange(e) {
    this.GetExtendToggle(1).CanExecuteChange.Bind(e);
  }
}
exports.FlySkinChildTabItem = FlySkinChildTabItem;
//# sourceMappingURL=FlySkinChildTabItem.js.map