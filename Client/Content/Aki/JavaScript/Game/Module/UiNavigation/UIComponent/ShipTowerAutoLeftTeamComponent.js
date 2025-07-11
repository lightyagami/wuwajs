"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerAutoLeftTeamComponent = undefined;
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const UiNavigationViewManager_1 = require("../New/UiNavigationViewManager");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ShipTowerAutoLeftTeamComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.LDe = TickSystem_1.TickSystem.InvalidId;
    this.J_ = e => {
      var i;
      var t = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener();
      if (t && (i = (t = t.GetNavigationGroup()).NextGroupName, UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetActiveNavigationGroupByNameCheckAll(i)?.ActiveListenerList[0]?.PanelConfig)) {
        UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroupByName(t.GroupName, i);
        this.TKl();
      }
    };
  }
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(e.BindButtonTag);
    this.IKl();
  }
  OnUnRegisterMe() {
    this.TKl();
  }
  IKl() {
    if (this.LDe === TickSystem_1.TickSystem.InvalidId) {
      this.LDe = TickSystem_1.TickSystem.Add(this.J_, "NavigationDraggableComponent", 0, true, undefined, true).Id;
    }
  }
  TKl() {
    if (this.LDe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.LDe);
      this.LDe = TickSystem_1.TickSystem.InvalidId;
    }
  }
  OnRefreshSelfHotKeyState(i) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      i = i.GetFocusListener();
      if (i) {
        if (this.IsLinkListener(i.GetOwner())) {
          let e = UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(i, t);
          e = e || i.GetChildListenerByTag(t);
          this.SetVisibleMode(2, e?.IsListenerActive() ?? false);
        } else {
          this.SetVisibleMode(2, false);
        }
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.ShipTowerAutoLeftTeamComponent = ShipTowerAutoLeftTeamComponent;
//# sourceMappingURL=ShipTowerAutoLeftTeamComponent.js.map