"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonFilterResetComponent = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const FindNavigationByListener_1 = require("../New/FindAction/FindNavigationByListener");
const LongTimeToTriggerComponent_1 = require("./LongTimeToTriggerComponent");
const listenerGroupNameArray = ["Group1", "Group2"];
class CommonFilterResetComponent extends LongTimeToTriggerComponent_1.LongTimeToTriggerComponent {
  ClickButton(e) {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.ClickButton(e);
    this.ResetToFindListener();
  }
  ResetToFindListener() {
    var e;
    var o = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener();
    if (o && o.IsScrollOrLayoutActor() && listenerGroupNameArray.includes(o.GroupName) && o.PanelConfig) {
      (e = new FindNavigationByListener_1.FindNavigationByListener()).PanelConfig = o.PanelConfig;
      e.AddParam([o]);
      o.PanelConfig.SetFindNavigationAction(e);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    }
  }
}
exports.CommonFilterResetComponent = CommonFilterResetComponent;
//# sourceMappingURL=CommonFilterResetComponent.js.map