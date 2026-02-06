"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationCancelChoseRoleComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const HotKeyComponent_1 = require("./HotKeyComponent");
class FormationCancelChoseRoleComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor(o) {
    super(o);
    ControllerHolder_1.ControllerHolder.FormationDragController.AddCustomShieldHotKeyComponentSetData(this.HotKeyMapIndex);
  }
  OnPress(o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Formation", 5, "FormationCancelChoseRoleComponent-OnPress");
    }
    if (ControllerHolder_1.ControllerHolder.FormationDragController.GamePadSelectModel) {
      ControllerHolder_1.ControllerHolder.FormationDragController.CancelDrag();
    }
  }
  OnRefreshSelfHotKeyState(o) {
    var e = this.GetBindButtonTag();
    if (e && !StringUtils_1.StringUtils.IsEmpty(e)) {
      if ((o = o.GetFocusListener()) && this.IsLinkListener(o.GetOwner()) && ControllerHolder_1.ControllerHolder.FormationDragController.GetDragItemUiActive()) {
        this.SetVisibleMode(2, (o.TagArray?.FindIndex(e) ?? -1) >= 0);
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.FormationCancelChoseRoleComponent = FormationCancelChoseRoleComponent;
//# sourceMappingURL=FormationCancelChoseRoleComponent.js.map