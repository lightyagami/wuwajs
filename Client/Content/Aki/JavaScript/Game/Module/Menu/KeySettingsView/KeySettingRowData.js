"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingRowData = undefined;
const KeyPoolById_1 = require("../../../../Core/Define/ConfigQuery/KeyPoolById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const InputKeyUtils_1 = require("../../../InputSettings/InputKeyUtils");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class KeySettingRowData {
  constructor() {
    this.xPi = undefined;
    this.wPi = undefined;
    this.BPi = 0;
    this.IsExpandDetail = false;
    this.bPi = "";
    this.qPi = "";
    this.Hdm = new Set();
    this.IsActionOrAxis = true;
    this.ActionBinding = undefined;
    this.AxisBinding = undefined;
    this.CombinationAxisBinding = undefined;
    this.OneActionBinding = undefined;
    this.TwoActionBinding = undefined;
    this.kPi = 0;
    this.wAn = 0;
    this.HPi = 0;
    this.BAn = 0;
    this.IsLock = false;
    this.W_1 = "";
    this.Q_1 = "";
    this.K_1 = "";
    this.ConnectedKeySettingIdList = [];
    this.KeyTypeName = "";
    this.KeyTypeIconSpritePath = "";
    this.DetailTextId = "";
    this.ConfigId = 0;
    this.SortId = 0;
    this.BothActionName = [];
    this.CanCombination = false;
    this.OpenViewType = 0;
    this.IsCheckSameKey = true;
    this.ButtonTextId = undefined;
    this.CanDisable = false;
  }
  get KPi() {
    if (this.W_1 === "") {
      return [];
    } else {
      return KeyPoolById_1.configKeyPoolById.GetConfig(this.W_1)?.ValidKeys ?? [];
    }
  }
  get QPi() {
    if (this.Q_1 === "") {
      return [];
    } else {
      return KeyPoolById_1.configKeyPoolById.GetConfig(this.Q_1)?.ValidKeys ?? [];
    }
  }
  get XPi() {
    if (this.K_1 === "") {
      return [];
    } else {
      return KeyPoolById_1.configKeyPoolById.GetConfig(this.K_1)?.ValidKeys ?? [];
    }
  }
  InitializeKeyType(t) {
    this.ConfigId = t.TypeId;
    this.xPi = t;
    this.BPi = 1;
    this.KeyTypeName = t.Name;
    this.KeyTypeIconSpritePath = t.IconSpritePath;
  }
  InitializeKeySetting(t) {
    var i;
    this.ConfigId = t.Id;
    this.SortId = t.SortId;
    this.wPi = t;
    this.BPi = 2;
    this.bPi = t.Name;
    this.qPi = t.ActionOrAxisName;
    this.IsActionOrAxis = t.ActionOrAxis === 1;
    this.kPi = t.PcKeyIndex;
    this.wAn = t.XBoxKeyIndex;
    this.HPi = t.PcAxisValue;
    this.BAn = t.XBoxAxisValue;
    this.IsLock = t.IsLock;
    this.DetailTextId = t.DetailTextId;
    this.BothActionName = t.BothActionName;
    this.CanCombination = t.CanCombination;
    this.OpenViewType = t.OpenViewType;
    this.IsCheckSameKey = t.IsCheckSameKey;
    this.ButtonTextId = t.ButtonTextId;
    this.ConnectedKeySettingIdList = t.ConnectedKeySettingIdList;
    this.CanDisable = t.CanDisable;
    this.W_1 = t.AllowKeysPool;
    this.Q_1 = t.AllowMainKeysPool;
    this.K_1 = t.AllowSecondKeysPool;
    if (this.BothActionName && this.BothActionName.length === 2) {
      t = this.BothActionName[0];
      i = this.BothActionName[1];
      this.OneActionBinding = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
      this.TwoActionBinding = InputSettingsManager_1.InputSettingsManager.GetActionBinding(i);
    } else if (this.IsActionOrAxis) {
      this.ActionBinding = InputSettingsManager_1.InputSettingsManager.GetActionBinding(this.qPi);
    } else {
      this.CombinationAxisBinding = InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingByAxisName(this.qPi);
      this.AxisBinding = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(this.qPi);
    }
    this.$dm();
  }
  $dm() {
    this.Hdm.clear();
    if (InputSettingsManager_1.InputSettingsManager.IsOriginalCombinationActionName(this.qPi, 1)) {
      this.Hdm.add(1);
    }
    if (InputSettingsManager_1.InputSettingsManager.IsOriginalCombinationActionName(this.qPi, 2)) {
      this.Hdm.add(2);
    }
  }
  FindCombinationActionBinding() {
    return InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(this.qPi);
  }
  Clear() {
    this.ActionBinding = undefined;
    this.AxisBinding = undefined;
    this.CombinationAxisBinding = undefined;
    this.OneActionBinding = undefined;
    this.TwoActionBinding = undefined;
  }
  GetRowType() {
    return this.BPi;
  }
  GetKeyTypeConfig() {
    return this.xPi;
  }
  GetKeySettingConfig() {
    return this.wPi;
  }
  GetSettingName() {
    return this.bPi;
  }
  GetDisplayKeyName(t) {
    if (this.OneActionBinding && this.TwoActionBinding) {
      return this.GetBothActionKeyName(this.OneActionBinding, this.TwoActionBinding, t);
    } else {
      return this.GetCurrentKeyName(t);
    }
  }
  GetBothActionKeyName(t, i, s) {
    if (t && i) {
      t.GetKeyNameList(t = []);
      i.GetKeyNameList(i = []);
      return [t[this.GetKeyIndex(s)], i[this.GetKeyIndex(s)]];
    }
  }
  GetCurrentKeyName(t) {
    if (this.IsActionOrAxis) {
      return this.YPi(t);
    } else {
      return this.JPi(t);
    }
  }
  GetCurrentKeyNameRichText(t, i = "+") {
    var s = this.GetDisplayKeyName(t);
    if (s) {
      return this.GetKeyNameRichTextByKeyNameList(t, s, i);
    } else {
      return "";
    }
  }
  GetKeyNameRichTextByKeyNameList(i, s, e = "+") {
    if (!s) {
      return "";
    }
    let h = "";
    for (let t = 0; t < s.length; t++) {
      var r = s[t];
      var r = this.GetKeyIconPath(r, i);
      if (r) {
        h += `<texture=${r}>`;
      }
      if (t < s.length - 1) {
        h += e;
      }
    }
    return h;
  }
  GetKeyIconPath(t, i) {
    var s = ConfigManager_1.ConfigManager.InputSettingsConfig;
    switch (i) {
      case 1:
        var e = InputKeyUtils_1.InputKeyUtils.GetPcKeyIconPathByCurrentPlatform(t);
        if (e) {
          return e;
        }
        break;
      case 2:
        if (s?.GetGamepadKeyConfig(t)) {
          e = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum();
          e = InputKeyUtils_1.InputKeyUtils.GetGamepadKeyIconPathByType(t, e);
          if (StringUtils_1.StringUtils.IsBlank(e)) {
            return undefined;
          } else {
            return e;
          }
        }
        break;
      default:
        return;
    }
  }
  zPi(t) {
    var i;
    return !!this.ActionBinding && (t = this.GetKeyIndex(t), this.ActionBinding.GetKeyNameList(i = []), !!(i = i[t])) && InputSettings_1.InputSettings.IsValidKey(i);
  }
  IsCombination(t) {
    if (this.IsActionOrAxis) {
      var i = this.FindCombinationActionBinding();
      if ((i || this.zPi(t)) && i) {
        switch (t) {
          case 1:
            return i.HasKeyboardCombinationAction();
          case 2:
            return i.HasGamepadCombinationAction();
        }
      }
    } else if (this.CombinationAxisBinding) {
      switch (t) {
        case 1:
          return this.CombinationAxisBinding.HasKeyboardCombinationAxis();
        case 2:
          return this.CombinationAxisBinding.HasGamepadCombinationAxis();
      }
    }
    return false;
  }
  YPi(t) {
    if (this.IsCombination(t)) {
      var i;
      var s;
      var e = new Map();
      switch (t) {
        case 1:
          this.FindCombinationActionBinding()?.GetPcKeyNameMap(e);
          break;
        case 2:
          this.FindCombinationActionBinding()?.GetGamepadKeyNameMap(e);
          break;
        default:
          return;
      }
      if (e) {
        for ([i, s] of e) {
          return [i, s];
        }
      }
    } else if (this.ActionBinding) {
      var h = [];
      this.ActionBinding?.GetKeyNameList(h);
      if (!(h.length <= 0)) {
        switch (t) {
          case 1:
            return [h[this.kPi]];
          case 2:
            return [h[this.wAn]];
          default:
            return;
        }
      }
    }
  }
  JPi(t) {
    if (this.IsCombination(t)) {
      var i;
      var s;
      var e = new Map();
      switch (t) {
        case 1:
          this.CombinationAxisBinding?.GetPcKeyNameMap(e);
          break;
        case 2:
          this.CombinationAxisBinding?.GetGamepadKeyNameMap(e);
          break;
        default:
          return;
      }
      if (e) {
        for ([i, s] of e) {
          return [i, s];
        }
      }
    } else {
      t = this.yWa(t);
      if (t) {
        return [t];
      }
    }
  }
  yWa(t) {
    var i = this.AxisBinding?.GetInputAxisKeyMap();
    if (i) {
      for (var [s, e] of i) {
        var h = e.GetKey();
        if (h) {
          switch (t) {
            case 1:
              if ((h.IsKeyboardKey || h.IsMouseButton) && e.Scale === this.HPi) {
                return s;
              }
              break;
            case 2:
              if (h.IsGamepadKey && e.Scale === this.BAn) {
                return s;
              }
              break;
            default:
              return;
          }
        }
      }
    }
  }
  ChangeBothAction(t) {
    var i;
    var s;
    var e;
    if (this.OneActionBinding && this.TwoActionBinding && (s = [], this.OneActionBinding.GetKeyNameList(i = []), this.TwoActionBinding.GetKeyNameList(s), i) && s) {
      e = s[t = this.GetKeyIndex(t)];
      s[t] = i[t];
      i[t] = e;
      this.OneActionBinding.SetKeys(i);
      this.TwoActionBinding.SetKeys(s);
    }
  }
  IsBothAction() {
    return this.OneActionBinding !== undefined && this.TwoActionBinding !== undefined;
  }
  ZPi(t, i) {
    var s;
    if (this.ActionBinding) {
      this.ActionBinding.GetKeyNameList(s = []);
      s[t] = this.EWa(i);
      this.ActionBinding.SetKeys(s);
    }
  }
  EWa(t) {
    switch (t) {
      case 1:
        return "Keyboard_Invalid";
      case 2:
        return "Gamepad_Invalid";
      default:
        return "Keyboard_Invalid";
    }
  }
  IWa(t) {
    var i;
    var s;
    var e;
    if (this.AxisBinding && this.AxisBinding.GetInputAxisKeyMap() && (e = this.yWa(t)) && (s = (i = this.GetAxisKeyScaleMap()).get(e)) !== undefined) {
      i.delete(e);
      e = this.EWa(t);
      i.set(e, s);
      this.AxisBinding.SetKeys(i);
    }
  }
  exi(i, s) {
    for (let t = 0; t < i.length; t++) {
      i[t] ||= this.EWa(s);
    }
  }
  SetKey(t, i) {
    if (this.IsActionOrAxis) {
      return this.txi(t, i);
    } else {
      return !this.IsCombination(i) && this.ixi(t[0], i);
    }
  }
  DisableKey(t) {
    if (!this.OneActionBinding || !this.TwoActionBinding) {
      if (this.IsActionOrAxis) {
        this.TWa(t);
      } else {
        this.LWa(t);
      }
    }
  }
  txi(t, i) {
    if (!t || t.length <= 0) {
      if (this.ActionBinding) {
        s = this.GetKeyIndex(i);
        this.ZPi(s, i);
      }
      InputSettingsManager_1.InputSettingsManager.ClearCombinationActionKeyMap();
    } else {
      var s = this.GetCurrentKeyName(i);
      if (!s || s[0] !== t[0] || s[1] !== t[1]) {
        if (s && s.length > 1) {
          InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(this.qPi, s[0], s[1]);
        }
        if (t.length !== 1 && this.CanCombination) {
          if (t.length > 1) {
            InputSettingsManager_1.InputSettingsManager.AddCombinationActionKeyMap(this.qPi, t[0], t[1]);
            s = this.GetKeyIndex(i);
            this.ZPi(s, i);
          }
        } else {
          var s = t[0];
          var e = this.GetKeyIndex(i);
          if (this.ActionBinding) {
            const t = [];
            this.ActionBinding.GetKeyNameList(t);
            if (t) {
              t[e] = s;
              this.exi(t, i);
              this.ActionBinding.SetKeys(t);
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  TWa(t) {
    var i;
    if (this.IsCombination(t)) {
      if ((i = this.GetCurrentKeyName(t)).length > 1) {
        InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(this.qPi, i[0], i[1]);
      }
    } else if (this.ActionBinding) {
      i = this.GetKeyIndex(t);
      this.ZPi(i, t);
    }
  }
  ixi(s, e) {
    if (!this.AxisBinding) {
      return false;
    }
    if (!s && this.AxisBinding) {
      const a = new Map();
      this.AxisBinding.SetKeys(a);
    } else {
      let t = undefined;
      let i = undefined;
      const a = this.GetAxisKeyScaleMap();
      for (var [h, r] of a) {
        var n = InputSettings_1.InputSettings.GetKey(h);
        if (n) {
          if ((n.IsKeyboardKey || n.IsMouseButton) && e === 1 && r === this.HPi) {
            t = h;
            i = r;
            break;
          }
          if (n.IsGamepadKey && e === 2 && r === this.BAn) {
            t = h;
            i = r;
            break;
          }
        }
      }
      if (t) {
        a.delete(t);
      }
      if (i && s) {
        a.set(s, i);
      }
      this.AxisBinding.SetKeys(a);
    }
    return true;
  }
  LWa(t) {
    if (!this.IsCombination(t)) {
      this.IWa(t);
    }
  }
  SetAxisBindingKeys(t) {
    this.AxisBinding?.SetKeys(t);
  }
  GetAxisKeyScaleMap() {
    var t = new Map();
    if (this.AxisBinding) {
      var i = this.AxisBinding.GetInputAxisKeyMap();
      if (i) {
        for (var [s, e] of i) {
          t.set(s, e.Scale);
        }
      }
    }
    return t;
  }
  GetKeyIndex(t) {
    switch (t) {
      case 1:
        return this.kPi;
      case 2:
        return this.wAn;
      default:
        return -1;
    }
  }
  GetKeyScale(t) {
    switch (t) {
      case 1:
        return this.HPi;
      case 2:
        return this.BAn;
      default:
        return 0;
    }
  }
  IsAllowKey(t) {
    return !this.KPi || this.KPi.length <= 0 || this.KPi.includes(t);
  }
  IsAllowCombinationKey(t, i) {
    let s = false;
    if (!(s = !this.QPi || this.QPi.length <= 0 || this.QPi.includes(t))) {
      return false;
    }
    let e = false;
    return e = !this.XPi || this.XPi.length <= 0 || this.XPi.includes(i);
  }
  HasKey(t, i) {
    if (t.length > 1) {
      if (this.IsCombination(i)) {
        var s = this.FindCombinationActionBinding();
        if (s) {
          return s.HasKey(t[0], t[1]);
        }
        if (this.CombinationAxisBinding) {
          return this.CombinationAxisBinding.HasKey(t[0], t[1]);
        }
      }
    } else {
      var e = t[0];
      if (this.ActionBinding) {
        s = this.GetKeyIndex(i);
        this.ActionBinding.GetKeyNameList(t = []);
        return t[s] === e;
      }
      if (this.AxisBinding) {
        t = this.GetKeyScale(i);
        for (const h of this.AxisBinding.GetKey(t)) {
          if (h.KeyName === e) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetActionOrAxisName() {
    return this.qPi;
  }
  ResetKey(t) {
    if (this.qPi) {
      if (this.BothActionName && this.BothActionName.length === 2) {
        InputSettingsManager_1.InputSettingsManager.ResetActionKeyByName(this.BothActionName[0]);
        InputSettingsManager_1.InputSettingsManager.ResetActionKeyByName(this.BothActionName[1]);
      } else if (this.IsCombination(t) || this.Hdm.has(t)) {
        if (this.IsActionOrAxis) {
          InputSettingsManager_1.InputSettingsManager.ResetCombinationActionKeyByName(this.qPi, t);
        }
      } else if (this.IsActionOrAxis) {
        InputSettingsManager_1.InputSettingsManager.ResetActionKeyByName(this.qPi);
      } else {
        InputSettingsManager_1.InputSettingsManager.ResetAxisKeyByName(this.qPi);
      }
    }
  }
}
exports.KeySettingRowData = KeySettingRowData;
//# sourceMappingURL=KeySettingRowData.js.map