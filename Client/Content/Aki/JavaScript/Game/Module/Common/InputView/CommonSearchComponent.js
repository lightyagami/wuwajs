"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSearchComponent = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonSearchComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s) {
    super();
    this.SearchFunction = i;
    this.ClearFunction = s;
    this.yAt = undefined;
    this.IAt = undefined;
    this.TAt = undefined;
    this.LAt = t => {
      if (t) {
        this.yAt.ActivateInputText();
      }
    };
    this.DAt = () => {
      var t = this.yAt.GetText();
      this.SearchFunction?.(t);
      this.RAt(false);
      this.UAt = true;
    };
    this.AAt = () => {
      this.ResetSearch(true);
    };
    this.ZGe = t => {
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        this.RAt(true);
        this.IAt.SetSelfInteractive(false);
        this.ClearFunction?.();
      } else {
        if (this.UAt) {
          this.RAt(true);
        }
        this.IAt.SetSelfInteractive(true);
      }
    };
    this.UAt = false;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITextInputComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.LAt], [1, this.DAt], [2, this.AAt]];
  }
  OnStart() {
    this.IAt = this.GetButton(1);
    this.TAt = this.GetButton(2);
    this.yAt = this.GetInputText(0);
    this.yAt.OnTextChange.Bind(this.ZGe);
    this.yAt.OnTextSubmit.Bind(this.DAt);
    this.ResetSearch(false);
    this.RAt(true);
    this.IAt.SetSelfInteractive(false);
  }
  OnBeforeDestroy() {
    this.yAt = undefined;
    this.IAt = undefined;
    this.TAt = undefined;
  }
  RAt(t) {
    this.IAt.RootUIComp.SetUIActive(t);
    this.TAt.RootUIComp.SetUIActive(!t);
    this.UAt = !t;
  }
  ResetSearch(t) {
    this.yAt.SetText("", t);
  }
}
exports.CommonSearchComponent = CommonSearchComponent;
//# sourceMappingURL=CommonSearchComponent.js.map