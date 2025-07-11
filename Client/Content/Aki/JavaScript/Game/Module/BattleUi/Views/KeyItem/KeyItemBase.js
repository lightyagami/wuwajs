"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyItemBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputSettings_1 = require("../../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DISABLE_ALPHA = 0.2;
class KeyItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.ActionName = undefined;
    this.AxisName = undefined;
    this.Lut = undefined;
    this.HEe = undefined;
    this.KeyTexturePath = undefined;
    this.IsEnable = false;
    this.IsGray = false;
    this.XBo = () => {
      if (StringUtils_1.StringUtils.IsEmpty(this.ActionName)) {
        if (!StringUtils_1.StringUtils.IsEmpty(this.AxisName)) {
          this.RefreshAxis(this.AxisName);
        }
      } else {
        this.RefreshAction(this.ActionName);
      }
    };
    this.Dut = t => {
      if (!StringUtils_1.StringUtils.IsEmpty(this.ActionName) && this.ActionName === t) {
        this.RefreshAction(this.ActionName);
      }
    };
    this.Rut = t => {
      if (!StringUtils_1.StringUtils.IsEmpty(this.AxisName) && this.AxisName === t) {
        this.RefreshAxis(this.AxisName);
      }
    };
    this.Uut = (t, i) => {
      this.OnInputAction(t, i);
    };
  }
  OnStartImplement() {
    this.AddEvents();
  }
  OnBeforeDestroyImplement() {
    this.UnBindAction();
    this.RemoveEvents();
    this.Reset();
  }
  Reset() {
    this.Lut = undefined;
    this.HEe = undefined;
    this.ActionName = undefined;
    this.AxisName = undefined;
    this.KeyTexturePath = undefined;
  }
  SetCustomKeyName(t) {
    this.Lut = t;
  }
  RefreshAction(t) {
    this.UnBindAction();
    this.ActionName = t;
    this.AxisName = undefined;
    if (this.Lut) {
      this.RefreshKey(InputSettings_1.InputSettings.GetKey(this.Lut));
    } else {
      t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(this.ActionName);
      if (!t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 10, "[KeyItem]刷新按键图标时找不到对应Action", ["actionName", this.ActionName]);
        }
        return;
      }
      t = t.GetCurrentPlatformKey();
      if (!t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 10, "[KeyItem]刷新按键图标时Action没有对应按键", ["actionName", this.ActionName]);
        }
        return;
      }
      this.RefreshKey(t);
    }
    this.BindAction();
  }
  RefreshAxis(t) {
    this.UnBindAction();
    this.AxisName = t;
    this.ActionName = undefined;
    if (this.Lut) {
      this.RefreshKey(InputSettings_1.InputSettings.GetKey(this.Lut));
    } else if ((t = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t)) && (t = t.GetCurrentPlatformKey())) {
      this.RefreshKey(t.GetKey());
    }
  }
  BindAction() {
    if (!StringUtils_1.StringUtils.IsEmpty(this.ActionName)) {
      InputDistributeController_1.InputDistributeController.BindAction(this.ActionName, this.Uut);
    }
  }
  UnBindAction() {
    if (!StringUtils_1.StringUtils.IsEmpty(this.ActionName)) {
      InputDistributeController_1.InputDistributeController.UnBindAction(this.ActionName, this.Uut);
    }
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAxisKeyChanged, this.Rut);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAxisKeyChanged, this.Rut);
  }
  OnInputAction(t, i) {}
  RefreshKey(t) {
    var i = t.GetKeyName();
    var t = t.GetKeyIconPath();
    if (this.HEe !== i || this.KeyTexturePath != t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 10, "[KeyItem]设置按键图片", ["actionName", this.ActionName], ["keyName", i], ["keyTexturePath", t]);
      }
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        this.SetKeyText(i);
      } else {
        this.Aut(t);
      }
      this.HEe = i;
    }
  }
  RefreshKeyByName(t) {
    t = InputSettings_1.InputSettings.GetKey(t);
    if (t) {
      this.RefreshKey(t);
    }
  }
  SetKeyText(t) {
    var i = this.GetKeyText();
    this.GetKeyTexture()?.SetUIActive(false);
    if (i) {
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        i.SetUIActive(false);
      } else {
        i.SetText(t);
        i.SetUIActive(true);
      }
    }
  }
  SetLocalText(t, ...i) {
    var e = this.GetKeyText();
    this.GetKeyTexture()?.SetUIActive(false);
    if (e) {
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        e.SetUIActive(false);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(e, t, ...i);
        e.SetUIActive(true);
      }
    }
  }
  Aut(t) {
    this.GetKeyText()?.SetUIActive(false);
    const i = this.GetKeyTexture();
    if (i) {
      i.SetUIActive(false);
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        this.KeyTexturePath = t;
        this.SetTextureByPath(t, i, undefined, () => {
          if (this.KeyTexturePath === t) {
            i.SetSizeFromTexture();
            i.SetUIActive(true);
          }
        });
      }
    }
  }
  SetEnable(t, i = false) {
    if (this.IsEnable !== t || !!i) {
      if (t) {
        this.RootItem.SetAlpha(1);
      } else {
        this.RootItem.SetAlpha(DISABLE_ALPHA);
      }
      this.IsEnable = t;
    }
  }
  SetGray(t) {
    if (this.IsGray !== t) {
      this.IsGray = t;
      this.OnSetGray();
    }
  }
  OnSetGray() {}
}
exports.KeyItemBase = KeyItemBase;
//# sourceMappingURL=KeyItemBase.js.map