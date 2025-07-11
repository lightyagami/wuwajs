"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SummaryPopView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class SummaryPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.mCa = false;
    this.OnConfirm = () => {
      if (!this.mCa) {
        this.mCa = true;
        const s = this.OpenParam.ConfirmFunc;
        this.CloseMe(() => {
          s?.();
        });
      }
    };
    this.OnCancel = () => {
      if (!this.mCa) {
        this.mCa = true;
        const s = this.OpenParam.CancelFunc;
        this.CloseMe(() => {
          s?.();
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText]];
    this.BtnBindInfo = [[1, this.OnConfirm], [2, this.OnCancel], [0, this.OnCancel]];
  }
  OnStart() {
    this.mCa = false;
    var s = this.OpenParam;
    this.GetText(3).SetText(s.Text);
  }
}
exports.SummaryPopView = SummaryPopView;
//# sourceMappingURL=SummaryPopView.js.map