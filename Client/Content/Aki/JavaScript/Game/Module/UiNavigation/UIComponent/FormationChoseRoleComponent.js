"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationChoseRoleComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const HotKeyComponent_1 = require("./HotKeyComponent");
class FormationChoseRoleComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor(o) {
    super(o);
    ControllerHolder_1.ControllerHolder.FormationDragController.AddCustomShieldHotKeyComponentSetData(this.HotKeyMapIndex);
  }
  OnPress(o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Formation", 5, "FormationChoseRoleComponent-OnPress");
    }
    if (!ControllerHolder_1.ControllerHolder.FormationDragController.GamePadSelectModel) {
      ControllerHolder_1.ControllerHolder.FormationDragController.OnGamePadPress();
    }
  }
  OnRelease(o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Formation", 5, "FormationChoseRoleComponent-OnRelease");
    }
    if (ControllerHolder_1.ControllerHolder.FormationDragController.DragStartMoveFirstRelease) {
      ControllerHolder_1.ControllerHolder.FormationDragController.DragStartMoveFirstRelease = false;
    } else if (ControllerHolder_1.ControllerHolder.FormationDragController.GamePadSelectModel) {
      ControllerHolder_1.ControllerHolder.FormationDragController.DragConfirm();
    } else {
      ControllerHolder_1.ControllerHolder.FormationDragController.OnGamePadRelease();
    }
  }
  OnRefreshSelfHotKeyState(o) {
    var e = this.GetBindButtonTag();
    if (e && !StringUtils_1.StringUtils.IsEmpty(e)) {
      if ((o = o.GetFocusListener()) && this.IsLinkListener(o.GetOwner())) {
        this.SetVisibleMode(2, (o.TagArray?.FindIndex(e) ?? -1) >= 0);
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.FormationChoseRoleComponent = FormationChoseRoleComponent;
//# sourceMappingURL=FormationChoseRoleComponent.js.map