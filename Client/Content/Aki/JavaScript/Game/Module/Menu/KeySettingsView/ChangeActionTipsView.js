"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeActionTipsView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ChangeActionRowView_1 = require("./ChangeActionRowView");
class ChangeActionTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.JGt = undefined;
    this.uPi = undefined;
    this.cPi = undefined;
    this.mPi = undefined;
    this.dPi = false;
    this.CPi = () => {
      if (this.JGt) {
        this.JGt(this.dPi);
      }
      this.CloseMe();
    };
    this.gPi = () => {
      this.CloseMe();
    };
    this.fPi = (i, t) => {
      this.cPi.SetSelected(this.cPi.IsRevert === t);
      this.mPi.SetSelected(this.mPi.IsRevert === t);
      this.dPi = t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.CPi], [1, this.gPi]];
  }
  async OnBeforeStartAsync() {
    this.cPi = new ChangeActionRowView_1.ChangeActionRowView();
    this.mPi = new ChangeActionRowView_1.ChangeActionRowView();
    this.cPi.BindOnSelected(this.fPi);
    this.mPi.BindOnSelected(this.fPi);
    var i = this.cPi.CreateByActorAsync(this.GetItem(2).GetOwner());
    var t = this.mPi.CreateByActorAsync(this.GetItem(3).GetOwner());
    await Promise.all([i, t]);
  }
  OnStart() {
    var i = this.OpenParam;
    var t = i.InputControllerType;
    this.JGt = i.OnConfirmCallback;
    this.uPi = i.KeySettingRowData;
    this.cPi?.Refresh(this.uPi, t, false);
    this.mPi?.Refresh(this.uPi, t, true);
    this.cPi?.SetSelected(true);
    this.cPi?.SetActive(true);
    this.mPi?.SetActive(true);
  }
  OnBeforeDestroy() {
    this.cPi = undefined;
    this.mPi = undefined;
    this.JGt = undefined;
  }
}
exports.ChangeActionTipsView = ChangeActionTipsView;
//# sourceMappingURL=ChangeActionTipsView.js.map