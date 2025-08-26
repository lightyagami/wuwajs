"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingViewBase = undefined;
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const KeySettingViewModel_1 = require("./KeySettingViewModel");
class KeySettingViewBase extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qzu = (e, t) => {
      this.OnWaitKeySetting();
    };
    this.Kzu = () => {
      this.OnBeforeBeginEditKey();
    };
    this.Xzu = () => {
      this.OnBeginEditKey();
    };
    this.Yzu = () => {
      this.OnFinishEditKey();
    };
    this.zzu = (e, t) => {
      this.OnKeyChange(e, t);
    };
    this.Jzu = e => {
      this.OnKeySelected(e);
    };
    this.Zzu = e => {
      this.OnKeyHover(e);
    };
    this.eJu = e => {
      this.OnKeyUnHover(e);
    };
  }
  OnStartImplementImplement() {
    KeySettingViewModel_1.KeySettingViewModel.OnViewStart();
    KeySettingViewModel_1.KeySettingViewModel.AddOnWaitKeySettingDelegate(this.Qzu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnBeforeBeginEditKeyDelegate(this.Kzu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnBeginEditKeyDelegate(this.Xzu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnFinishEditKeyDelegate(this.Yzu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeySelectedDelegate(this.Jzu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeyChangeDelegate(this.zzu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeyHoverDelegate(this.Zzu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeyUnHoverDelegate(this.eJu);
  }
  OnBeforeDestroyImplement() {
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnWaitKeySettingDelegate(this.Qzu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnBeforeBeginEditKeyDelegate(this.Kzu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnBeginEditKeyDelegate(this.Xzu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnFinishEditKeyDelegate(this.Yzu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeySelectedDelegate(this.Jzu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeyChangeDelegate(this.zzu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeyHoverDelegate(this.Zzu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeyUnHoverDelegate(this.eJu);
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
exports.KeySettingViewBase = KeySettingViewBase;
//# sourceMappingURL=KeySettingViewBase.js.map