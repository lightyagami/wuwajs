"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyBaseComponent = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const PcAndGamepadProgressBar_1 = require("./PcAndGamepadProgressBar");
class KeyBaseComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._wo = false;
    this.uwo = undefined;
    this.cwo = undefined;
    this.HEe = "";
    this.mwo = false;
    this.MSo = "";
  }
  async OnBeforeStartAsync() {
    if (this.mwo) {
      this.cwo = new PcAndGamepadProgressBar_1.PcAndGamepadProgressBar();
      await this.cwo.Init(this.GetSquareItem(), this.GetCircleItem());
    }
    if (this.HEe) {
      await this.dwo(this.HEe);
    }
    this.But(this.mwo);
  }
  SetKeyName(e) {
    this.HEe = e;
  }
  SetIsNeedLongPress(e) {
    this.mwo = e;
  }
  RefreshKeyIcon(e) {
    this.SetKeyName(e);
    this.Cwo(e);
  }
  RefreshNameText(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e) && e !== HotKeyViewDefine_1.SPECIAL_TEXT && (e = ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyText(e))) {
      this.SetNameTextById(e);
      this.SetNameTextVisible(true);
    } else {
      this.SetNameTextVisible(false);
    }
  }
  Cwo(e) {
    this.dwo(e);
  }
  async dwo(e) {
    const t = this.GetKeyTexture();
    if (t && !StringUtils_1.StringUtils.IsEmpty(e)) {
      var i = InputSettings_1.InputSettings.GetKey(e);
      if (i) {
        i = i.GetKeyIconPath();
        if (!StringUtils_1.StringUtils.IsEmpty(i) && i !== this.MSo) {
          if ((this.MSo = i) === "0" && Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiNavigationHotKey", 10, "读取到图片路径为0的情况", ["keyName", e]);
          }
          const s = new CustomPromise_1.CustomPromise();
          this.gwo(false);
          this.SetTextureByPath(i, t, undefined, () => {
            t.SetSizeFromTexture();
            s.SetResult();
          });
          await s.Promise;
          this.gwo(true);
        }
      }
    }
  }
  gwo(e) {
    var t = this.GetKeyTexture();
    if (t) {
      t.SetUIActive(e);
    }
  }
  SetNameTextById(e) {
    var t;
    if (!this._wo) {
      if (t = this.GetNameText()) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
      }
    }
  }
  SetNameText(e) {
    var t = this.GetNameText();
    if (t) {
      t.SetText(e);
    }
  }
  SetNameTextForce(e) {
    this._wo = e;
  }
  GetIsForceSetText() {
    return this._wo;
  }
  SetNameTextVisible(e) {
    var t = this.GetNameText();
    if (t) {
      t.SetUIActive(e);
    }
  }
  But(e) {
    var t = this.GetLongPressItem();
    if (t && t.bIsUIActive !== e) {
      t.SetUIActive(e);
    }
  }
  SetLongPressState(e) {
    this.but(e);
    this.fwo(e === 0);
  }
  SetLongPressItemAlpha(e) {
    this.RootItem?.SetAlpha(e);
  }
  but(e) {
    if (this.cwo) {
      this.cwo.SetProgressPercent(e);
    }
  }
  fwo(e) {
    var t = this.GetLongPressTipTexture();
    if (t) {
      t.SetUIActive(e);
    }
  }
  SetHotKeyType(e) {
    this.uwo = e;
  }
  RefreshPcAndGamepad() {
    if (this.mwo) {
      this.cwo?.RefreshProgressVisible();
    }
  }
  SetActive(e) {
    super.SetActive(e);
    this.uwo?.KeyItemNotifySetActive(e);
  }
}
exports.KeyBaseComponent = KeyBaseComponent;
//# sourceMappingURL=KeyComponent.js.map