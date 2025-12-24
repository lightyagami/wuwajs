"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingItemProxy = undefined;
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
const KeySettingViewModel_1 = require("./KeySettingViewModel");
class KeySettingItemProxy {
  constructor(t) {
    this.HOi = t;
    this.uPi = undefined;
    this.oxi = 0;
    this.c2n = undefined;
    this.rxi = t => {
      if (t === 1 && this.uPi) {
        KeySettingViewModel_1.KeySettingViewModel.WaitKeySetting(this.uPi, this.HOi);
      }
    };
    this.gPi = () => {
      if (!!this.uPi && !this.uPi.IsBothAction()) {
        if (this.uPi.OpenViewType === 0) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("InputSettings", 10, "按下清空按键按钮，清空此输入按键", ["ActionOrAxisName", this.uPi.GetActionOrAxisName()]);
          }
          this.uPi.DisableKey(this.oxi);
          this.nxi();
          InputSettings_1.InputSettings.SaveKeyMappings();
        }
      }
    };
    this.PYu = t => {
      if (this.uPi && this.HOi.GetSelectSprite) {
        t = this.uPi === t;
        this.HOi.GetSelectSprite().SetUIActive(t);
        this.HOi.GetKeySetToggle().SetToggleState(t ? 1 : 0, false);
        this.HOi.GetKeyNameUiText().SetUIActive(!t);
        this.HOi.GetCursorItem().SetUIActive(t);
        if (t) {
          this.c2n?.PlayLevelSequenceByName("Loop");
        } else {
          this.c2n?.StopCurrentSequence();
        }
      }
    };
    this.xYu = t => {
      if (t === this.uPi) {
        this.Refresh(t, KeySettingViewModel_1.KeySettingViewModel.InputControllerType);
      }
    };
  }
  OnStart() {
    this.HOi.GetKeySetToggle().OnStateChange.Add(this.rxi);
    if (this.HOi.GetCancelButton) {
      this.HOi.GetCancelButton().OnClickCallBack.Bind(this.gPi);
    }
    this.c2n = new LevelSequencePlayer_1.LevelSequencePlayer(this.HOi.GetCursorItem());
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeySelectedDelegate(this.PYu);
    KeySettingViewModel_1.KeySettingViewModel.AddOnKeyChangeDelegate(this.xYu);
  }
  OnBeforeDestroy() {
    this.HOi.GetKeySetToggle().OnStateChange.Remove(this.rxi);
    if (this.HOi.GetCancelButton) {
      this.HOi.GetCancelButton().OnClickCallBack.Unbind();
    }
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeySelectedDelegate(this.PYu);
    KeySettingViewModel_1.KeySettingViewModel.RemoveOnKeyChangeDelegate(this.xYu);
    this.c2n?.Clear();
  }
  SetDetailItemVisible(t) {
    var i;
    var s;
    if (this.HOi.GetDetailUiItem) {
      i = this.HOi.GetDetailUiItem();
      if (!this.uPi || (s = this.uPi.DetailTextId, StringUtils_1.StringUtils.IsEmpty(s))) {
        i.SetUIActive(false);
      } else {
        i.SetUIActive(t);
        this.uPi.IsExpandDetail = t;
      }
    }
  }
  Refresh(t, i) {
    this.uPi = t;
    this.oxi = i;
    this.Nft();
    this.nxi();
    this.sxi();
    this.Rxt();
    this.MOt();
  }
  Nft() {
    var t = this.HOi.GetTitleUiText();
    var i = this.uPi.GetSettingName();
    if (StringUtils_1.StringUtils.IsEmpty(i)) {
      t.SetText(this.uPi.GetActionOrAxisName());
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
    }
  }
  nxi() {
    var i = this.uPi.ButtonTextId;
    if (i && !StringUtils_1.StringUtils.IsBlank(i)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.HOi.GetKeyNameUiText(), i);
    } else {
      let t = "+";
      var s;
      var e;
      var h;
      var n;
      var r;
      var i = this.uPi.BothActionName;
      if (i && i.length > 1) {
        t = "/";
      }
      var i = this.uPi.GetCurrentKeyNameRichText(this.oxi, t);
      if (i.length <= 0) {
        r = this.uPi.FindCombinationActionBinding();
        s = this.uPi.CombinationAxisBinding;
        e = this.uPi.ActionBinding;
        h = this.uPi.AxisBinding;
        e?.GetKeyNameListByBindingType(e = [], this.uPi.BindingType);
        h?.GetKeyNameListByBindingType(h = [], this.uPi.BindingType);
        n = new Map();
        r?.GetKeyMapByBindingType(n, this.uPi.BindingType);
        r = new Map();
        s?.GetKeyMap(r, this.uPi.BindingType);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InputSettings", 10, "刷新按键设置项时，按键名称为空", ["ActionOrAxisName", this.uPi.GetActionOrAxisName()], ["IsActionOrAxis", this.uPi.IsActionOrAxis], ["ActionBindingKeys", e], ["AxisBindingKeys", h], ["combinationActionBindingKeyMap", n], ["combinationAxisBindingKeyMap", n]);
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.HOi.GetKeyNameUiText(), "NoneText");
      } else {
        this.HOi.GetKeyNameUiText().SetText(i);
      }
    }
  }
  sxi() {
    var t;
    if (this.HOi.GetDetailUiItem && this.HOi.GetDetailUiText && this.HOi.GetDetailSprite) {
      if (this.uPi.CanDisable || (t = this.uPi.DetailTextId, StringUtils_1.StringUtils.IsEmpty(t))) {
        this.HOi.GetDetailSprite().SetUIActive(false);
      } else {
        this.HOi.GetDetailSprite().SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.HOi.GetDetailUiText(), t);
      }
    }
  }
  Rxt() {
    var t;
    if (this.HOi.GetLockSprite) {
      t = this.uPi.IsLock;
      this.HOi.GetLockSprite().SetUIActive(t);
      this.HOi.GetKeySetToggle().SetSelfInteractive(!t);
    }
  }
  MOt() {
    var t;
    if (this.uPi && this.HOi.GetCancelButton && (t = this.HOi.GetCancelButton().GetOwner()?.GetUIItem())) {
      if (!this.uPi.CanDisable || this.uPi.IsLock || this.uPi.IsBothAction() || this.uPi.OpenViewType !== 0) {
        t.SetUIActive(false);
      } else {
        t.SetUIActive(true);
      }
    }
  }
}
exports.KeySettingItemProxy = KeySettingItemProxy;
//# sourceMappingURL=KeySettingItemProxy.js.map