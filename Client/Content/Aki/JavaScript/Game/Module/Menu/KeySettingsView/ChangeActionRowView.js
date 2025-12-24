"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeActionRowView = undefined;
const UE = require("ue");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ChangeActionRowView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.uPi = undefined;
    this.IsRevert = false;
    this.q6e = undefined;
    this.Jgt = t => {
      if (t === 1 && this.q6e) {
        this.q6e(this, this.IsRevert);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIText], [0, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.Jgt]];
  }
  OnBeforeDestroy() {
    this.uPi = undefined;
  }
  Refresh(t, i, e) {
    this.uPi = t;
    this.IsRevert = e;
    var t = this.uPi.BothActionName;
    var s = t[0];
    var t = t[1];
    var s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(s);
    var t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
    var n = [];
    var h = [];
    s.GetKeyNameListByBindingType(n, this.uPi.BindingType);
    t.GetKeyNameListByBindingType(h, this.uPi.BindingType);
    var s = n[this.uPi.GetKeyIndex(i)];
    var t = h[this.uPi.GetKeyIndex(i)];
    var n = this.uPi.GetSettingName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), n);
    var h = e ? [t, s] : [s, t];
    var n = this.uPi.GetKeyNameRichTextByKeyNameList(i, h, "/");
    this.GetText(2)?.SetText(n);
  }
  BindOnSelected(t) {
    this.q6e = t;
  }
  SetSelected(t) {
    if (t) {
      this.GetExtendToggle(0)?.SetToggleState(1);
    } else {
      this.GetExtendToggle(0)?.SetToggleState(0);
    }
  }
}
exports.ChangeActionRowView = ChangeActionRowView;
//# sourceMappingURL=ChangeActionRowView.js.map