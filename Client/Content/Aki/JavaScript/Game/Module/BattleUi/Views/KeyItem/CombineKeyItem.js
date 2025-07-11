"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombineKeyItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputSettings_1 = require("../../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const KeyItemBase_1 = require("./KeyItemBase");
class CombineKeyItem extends KeyItemBase_1.KeyItemBase {
  constructor() {
    super(...arguments);
    this.Tut = "";
    this.CUa = undefined;
    this.mhh = false;
    this.dhh = false;
    this.Lah = () => {
      if (Info_1.Info.IsInGamepad() && this.ActionName === InputMappingsDefine_1.actionMappings.幻象1) {
        this.RefreshAction(this.ActionName);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UITexture]];
  }
  Reset() {
    super.Reset();
    this.CUa = undefined;
  }
  AddEvents() {
    super.AddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged, this.Lah);
  }
  RemoveEvents() {
    super.RemoveEvents();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged, this.Lah);
  }
  GetKeyText() {}
  GetKeyTexture() {
    return this.GetTexture(0);
  }
  RefreshAction(t) {
    if (this.ActionName !== t) {
      this.UnBindAction();
      this.ActionName = t;
      this.AxisName = undefined;
      this.BindAction();
    }
    if (!this.Chh()) {
      var e = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(this.ActionName);
      if (e) {
        var i = new Map();
        e.GetCurrentPlatformKeyNameMap(i);
        if (i) {
          for (var [s, n] of i) {
            this.RefreshKey(InputSettings_1.InputSettings.GetKey(s));
            this.RefreshSubKey(InputSettings_1.InputSettings.GetKey(n));
            this.GetTexture(2).SetUIActive(true);
            this.GetText(1).SetUIActive(!this.mhh);
            this.GetKeyTexture().SetUIActive(!this.mhh);
            this.dhh = true;
            return;
          }
        }
      }
      this.dhh = false;
      this.GetTexture(2).SetUIActive(false);
      this.GetText(1).SetUIActive(false);
      this.GetKeyTexture().SetUIActive(!this.mhh);
      if (InputSettingsManager_1.InputSettingsManager.GetActionBinding(this.ActionName)) {
        super.RefreshAction(t);
      }
    }
  }
  Chh() {
    if (Info_1.Info.IsInGamepad() && this.ActionName === InputMappingsDefine_1.actionMappings.幻象1 && ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.State === 2) {
      var t = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(InputMappingsDefine_1.actionMappings.通用交互);
      if (t) {
        var e = new Map();
        t.GetCurrentPlatformKeyNameMap(e);
        if (e) {
          for (var [i, s] of e) {
            this.RefreshKey(InputSettings_1.InputSettings.GetKey(i));
            this.RefreshSubKey(InputSettings_1.InputSettings.GetKey(s));
            this.GetTexture(2).SetUIActive(true);
            this.GetText(1).SetUIActive(!this.mhh);
            this.GetKeyTexture().SetUIActive(!this.mhh);
            return this.dhh = true;
          }
        }
      }
      this.dhh = false;
      this.GetTexture(2).SetUIActive(false);
      this.GetText(1).SetUIActive(false);
      this.GetKeyTexture().SetUIActive(!this.mhh);
      t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.通用交互)?.GetCurrentPlatformKey();
      if (t) {
        this.RefreshKey(t);
        return true;
      }
    }
    return false;
  }
  RefreshSubKey(t) {
    var e = t.GetKeyName();
    if (this.Tut !== e) {
      const i = t.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        const s = this.GetTexture(2);
        s.SetUIActive(false);
        this.CUa = i;
        this.SetTextureByPath(i, s, undefined, () => {
          if (this.CUa === i) {
            s.SetSizeFromTexture();
            s.SetUIActive(true);
          }
        });
      }
      this.Tut = e;
    }
  }
  HideMainKey(t) {
    if (this.mhh !== t) {
      this.mhh = t;
      this.GetText(1).SetUIActive(!this.mhh && this.dhh);
      this.GetKeyTexture().SetUIActive(!this.mhh || !this.dhh);
    }
  }
  OnSetGray() {
    var t = this.GetTexture(0);
    t.SetChangeColor(this.IsGray, t.changeColor);
    var t = this.GetTexture(2);
    t.SetChangeColor(this.IsGray, t.changeColor);
  }
}
exports.CombineKeyItem = CombineKeyItem;
//# sourceMappingURL=CombineKeyItem.js.map