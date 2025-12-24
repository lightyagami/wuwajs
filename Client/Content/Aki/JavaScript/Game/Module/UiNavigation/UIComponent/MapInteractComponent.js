"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapFocusPlayerComponent = exports.MapCheckComponent = exports.MapZoomComponent = exports.MapMoveRightComponent = exports.MapMoveForwardComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class MapInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    var t;
    var n = this.GetBindButtonTag();
    if (n && (e = e.GetFocusListener()) && (t = e.GetNavigationGroup(), !StringUtils_1.StringUtils.IsEmpty(t.GroupName)) && e.TagArray?.Contains(n)) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
class MapMoveForwardComponent extends HotKeyComponent_1.HotKeyComponent {
  OnInit() {
    var e = this.GetAxisName();
    ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation.InitAxisLock(e);
  }
  OnRefreshSelfHotKeyState(e) {
    var e = e.GetFocusListener();
    if (e && (e = e.GetNavigationGroup(), StringUtils_1.StringUtils.IsEmpty(e.GroupName) || e.GroupName !== "GroupCursor")) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
  OnInputAxis(e, t) {
    var n = ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation;
    n.InputAxis(e, t);
    if (!n.IsInValid) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationTriggerMapForward, t);
    }
  }
}
exports.MapMoveForwardComponent = MapMoveForwardComponent;
class MapMoveRightComponent extends HotKeyComponent_1.HotKeyComponent {
  OnInit() {
    var e = this.GetAxisName();
    ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation.InitAxisLock(e);
  }
  OnRefreshSelfHotKeyState(e) {
    var e = e.GetFocusListener();
    if (e && (e = e.GetNavigationGroup(), StringUtils_1.StringUtils.IsEmpty(e.GroupName) || e.GroupName !== "GroupCursor")) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
  OnInputAxis(e, t) {
    var n = ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation;
    n.InputAxis(e, t);
    if (!n.IsInValid) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationTriggerMapRight, t);
    }
  }
}
exports.MapMoveRightComponent = MapMoveRightComponent;
class MapZoomComponent extends MapInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationTriggerMapZoom, e, t);
  }
}
exports.MapZoomComponent = MapZoomComponent;
class MapCheckComponent extends MapInteractComponentBase {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.ClickButton(e.BindButtonTag);
  }
}
exports.MapCheckComponent = MapCheckComponent;
class MapFocusPlayerComponent extends MapInteractComponentBase {
  OnPress(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapShowTrackList);
  }
  OnRefreshSelfHotKeyState(e) {
    var t;
    var n = this.GetBindButtonTag();
    if (!n || !(e = e.GetFocusListener()) || (t = e.GetNavigationGroup(), StringUtils_1.StringUtils.IsEmpty(t.GroupName)) || !e.TagArray?.Contains(n) || ModelManager_1.ModelManager.WorldMapModel.WorldExtraUiCount > 0) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
}
exports.MapFocusPlayerComponent = MapFocusPlayerComponent;
//# sourceMappingURL=MapInteractComponent.js.map