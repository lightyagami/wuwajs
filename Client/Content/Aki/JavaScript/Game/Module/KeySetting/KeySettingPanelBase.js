"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingPanelBase = undefined;
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const KeySettingViewModel_1 = require("./KeySettingViewModel");
class KeySettingPanelBase extends UiPanelBase_1.UiPanelBase {
  constructor(e = 0) {
    super();
    this.T_u = e;
    this.DYu = (e, t) => {
      this.OnWaitKeySetting();
    };
    this.UYu = () => {
      this.OnBeforeBeginEditKey();
    };
    this.BYu = () => {
      this.OnBeginEditKey();
    };
    this.kYu = () => {
      this.OnFinishEditKey();
    };
    this.OYu = (e, t) => {
      this.OnKeyChange(e, t);
    };
    this.qYu = e => {
      this.OnKeySelected(e);
    };
    this.GYu = e => {
      this.OnKeyHover(e);
    };
    this.FYu = e => {
      this.OnKeyUnHover(e);
    };
  }
  OnStartImplement() {
    KeySettingViewModel_1.KeySettingViewModel.InitData(this.T_u);
    KeySettingViewModel_1.KeySettingViewModel.OnViewStart();
    KeySettingViewModel_1.KeySettingViewModel.AddOnWaitKeySettingDelegate(this.DYu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnBeforeBeginEditKeyDelegate(this.UYu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnBeginEditKeyDelegate(this.BYu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnFinishEditKeyDelegate(this.kYu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeySelectedDelegate(this.qYu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeyChangeDelegate(this.OYu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeyHoverDelegate(this.GYu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeyUnHoverDelegate(this.FYu);
  }
  OnBeforeDestroyImplement() {
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnWaitKeySettingDelegate(this.DYu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnBeforeBeginEditKeyDelegate(this.UYu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnBeginEditKeyDelegate(this.BYu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnFinishEditKeyDelegate(this.kYu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeySelectedDelegate(this.qYu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeyChangeDelegate(this.OYu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeyHoverDelegate(this.GYu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeyUnHoverDelegate(this.FYu);
    KeySettingViewModel_1.KeySettingViewModel.OnViewDestroy();
  }
  OnWaitKeySetting() {}
  OnBeforeBeginEditKey() {}
  OnBeginEditKey() {}
  OnFinishEditKey() {}
  OnKeyChange(e, t) {}
  OnKeySelected(e) {}
  OnKeyHover(e) {}
  OnKeyUnHover(e) {}
}
exports.KeySettingPanelBase = KeySettingPanelBase;
//# sourceMappingURL=KeySettingPanelBase.js.map