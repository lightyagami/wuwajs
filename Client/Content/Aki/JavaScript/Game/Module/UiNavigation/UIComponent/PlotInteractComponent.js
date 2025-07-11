"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotNextPageComponent = exports.PlotZoomComponent = exports.PlotMoveRightComponent = exports.PlotMoveForwardComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../Input/InputEnums");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
const ZOOM_RATE = 30;
const MOVE_RATE = 0.7;
class PlotInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.Nxo = undefined;
    this.i8a = e => {
      var e = e && this.CheckAxisCanInput() && this.t_h();
      var t = this.Nxo?.IsListenerActive() ?? false;
      this.SetVisibleMode(2, t && e);
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotEnableControlView, this.i8a);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotEnableControlView, this.i8a);
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = e.GetActiveListenerByTag(t);
      this.Nxo = e;
      t = this.Nxo?.IsListenerActive() ?? false;
      e = ModelManager_1.ModelManager.PlotModel.CanControlView && this.CheckAxisCanInput() && this.t_h();
      this.SetVisibleMode(2, t && e);
    }
  }
  t_h() {
    return ModelManager_1.ModelManager.CameraModel.CameraMode === 0;
  }
  CheckAxisCanInput() {
    return true;
  }
}
class PlotMoveForwardComponent extends PlotInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationTriggerPlotForward, t * MOVE_RATE);
  }
  CheckAxisCanInput() {
    return !ModelManager_1.ModelManager.InputModel?.IsAxisBlock(InputEnums_1.EInputAxis.LookUp);
  }
}
exports.PlotMoveForwardComponent = PlotMoveForwardComponent;
class PlotMoveRightComponent extends PlotInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationTriggerPlotRight, t * MOVE_RATE);
  }
  CheckAxisCanInput() {
    return !ModelManager_1.ModelManager.InputModel?.IsAxisBlock(InputEnums_1.EInputAxis.Turn);
  }
}
exports.PlotMoveRightComponent = PlotMoveRightComponent;
class PlotZoomComponent extends PlotInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NavigationTriggerPlotZoom, t * ZOOM_RATE);
  }
  CheckAxisCanInput() {
    return !ModelManager_1.ModelManager.InputModel?.IsAxisBlock(InputEnums_1.EInputAxis.Zoom);
  }
}
exports.PlotZoomComponent = PlotZoomComponent;
class PlotNextPageComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.Nxo = undefined;
    this.Y5a = e => {
      var t = this.Nxo?.IsListenerActive() ?? false;
      this.SetVisibleMode(2, t && e);
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationRefreshPlotNextPage, this.Y5a);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationRefreshPlotNextPage, this.Y5a);
  }
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.ClickButton(e.BindButtonTag);
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = e.GetActiveListenerByTag(t);
      this.Nxo = e;
      t = this.Nxo?.IsListenerActive() ?? false;
      e = ModelManager_1.ModelManager.PlotModel?.CanClick ?? false;
      this.SetVisibleMode(2, t && e);
    }
  }
}
exports.PlotNextPageComponent = PlotNextPageComponent;
//# sourceMappingURL=PlotInteractComponent.js.map