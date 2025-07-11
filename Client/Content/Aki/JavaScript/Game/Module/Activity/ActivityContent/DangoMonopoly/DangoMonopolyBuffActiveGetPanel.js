"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyBuffActiveGetPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DangoMonopolyBuffActiveGetPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.GridData = undefined;
    this.OnClickCallback = undefined;
    this.OnClickBtnConfirm = () => {
      this.OnClickCallback?.();
    };
  }
  async Init(t, e) {
    this.GridData = e;
    await this.CreateByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.OnClickBtnConfirm]];
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    var t = this.GridData.GetDangoData();
    var e = this.GridData.GetAddPropertyConfig();
    var s = t?.NameKey ?? "DangoName";
    var t = t?.DangoSay ?? "";
    this.GetText(1)?.ShowTextNew(s);
    this.GetText(5)?.ShowTextNew(e?.Desc ?? "");
    this.GetItem(4)?.SetUIActive(false);
    this.GetButton(0)?.RootUIComp.SetUIActive(false);
    this.UpdateDangoSay(t);
  }
  SetDialogVisible(t) {
    this.GetItem(2)?.SetUIActive(t);
  }
  UpdateDangoSay(t) {
    var e = !!t;
    this.SetDialogVisible(e);
    if (e) {
      this.GetText(3)?.ShowTextNew(t);
    }
  }
}
exports.DangoMonopolyBuffActiveGetPanel = DangoMonopolyBuffActiveGetPanel;
//# sourceMappingURL=DangoMonopolyBuffActiveGetPanel.js.map