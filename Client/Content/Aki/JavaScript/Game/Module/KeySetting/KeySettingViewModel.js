"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingViewModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const KeySettingById_1 = require("../../../Core/Define/ConfigQuery/KeySettingById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const InputSettingsController_1 = require("../../InputSettings/InputSettingsController");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const GenericPromptController_1 = require("../GenericPrompt/GenericPromptController");
const KeySettingRowData_1 = require("../Menu/KeySettingsView/KeySettingRowData");
const MenuController_1 = require("../Menu/MenuController");
const RouletteController_1 = require("../Roulette/RouletteController");
class KeySettingViewModel {
  static get IsEditing() {
    return this.Fsd;
  }
  static get InputControllerType() {
    return this.rEa;
  }
  static set InputControllerType(t) {
    this.rEa = t;
  }
  static get CurrentDeviceType() {
    switch (this.InputControllerType) {
      case 1:
        return 1;
      case 2:
        return 2;
    }
    return 0;
  }
  static OnViewStart() {
    this.Ore();
    if (Info_1.Info.IsInKeyBoard()) {
      this.InputControllerType = 1;
    } else if (Info_1.Info.IsInGamepad()) {
      this.InputControllerType = 2;
    }
  }
  static InitData(t = 0) {
    var e = ConfigManager_1.ConfigManager.MenuBaseConfig.GetAllKeyTypeConfig();
    if (e) {
      this.Lkn.clear();
      this.wd1.clear();
      this.Nxi(e, t);
      this.Oxi(e, t);
    }
  }
  static GetKeySettingDataList() {
    if (this.InputControllerType === 1) {
      return this.lxi;
    } else if (this.InputControllerType === 2) {
      return this.bAn;
    } else {
      return [];
    }
  }
  static OnViewDestroy() {
    this.ht();
  }
  static ResetSettings() {
    for (const t of this.lxi) {
      t.ResetKey(1);
    }
    for (const e of this.rKd) {
      e.ResetKey(1);
    }
    for (const i of this.bAn) {
      i.ResetKey(2);
    }
    for (const n of this.oKd) {
      n.ResetKey(2);
    }
  }
  static ExternalFinishEditKey() {
    this.Lxi();
  }
  static WaitKeySetting(t, e) {
    this.cxi = t;
    this.SelectKey(t);
    this.NYu(t, e);
    var e = t.OpenViewType;
    if (e !== 0) {
      switch (e) {
        case 1:
          RouletteController_1.RouletteController.OpenAssemblyView(1);
          break;
        case 2:
          MenuController_1.MenuController.OpenChangeLockView();
      }
      this.Lxi();
    } else if (t.IsLock) {
      GenericPromptController_1.GenericPromptController.ShowPromptByCode("KeyLock");
      this.Lxi();
    } else if ((this.cxi = t).BothActionName.length === 2) {
      e = {
        InputControllerType: this.InputControllerType,
        KeySettingRowData: t,
        OnConfirmCallback: this.Dxi
      };
      UiManager_1.UiManager.OpenView("ChangeActionTipsView", e);
      this.Lxi();
    } else {
      this.Rxi();
    }
  }
  static SelectKey(t) {
    this.VYu(t);
  }
  static HoverKey(t) {
    this.jYu(t);
  }
  static UnHoverKey(t) {
    this.HYu(t);
  }
  static AddOnWaitKeySettingDelegate(t) {
    if (!this.$Yu.includes(t)) {
      this.$Yu.push(t);
    }
  }
  static RemoveOnWaitKeySettingDelegate(t) {
    t = this.$Yu.indexOf(t);
    if (t !== -1) {
      this.$Yu.splice(t, 1);
    }
  }
  static AddOnKeyChangeDelegate(t) {
    if (!this.WYu.includes(t)) {
      this.WYu.push(t);
    }
  }
  static RemoveOnKeyChangeDelegate(t) {
    t = this.WYu.indexOf(t);
    if (t !== -1) {
      this.WYu.splice(t, 1);
    }
  }
  static AddOnKeySelectedDelegate(t) {
    if (!this.QYu.includes(t)) {
      this.QYu.push(t);
    }
  }
  static RemoveOnKeySelectedDelegate(t) {
    t = this.QYu.indexOf(t);
    if (t !== -1) {
      this.QYu.splice(t, 1);
    }
  }
  static AddOnBeforeBeginEditKeyDelegate(t) {
    if (!this.KYu.includes(t)) {
      this.KYu.push(t);
    }
  }
  static RemoveOnBeforeBeginEditKeyDelegate(t) {
    t = this.KYu.indexOf(t);
    if (t !== -1) {
      this.KYu.splice(t, 1);
    }
  }
  static AddOnBeginEditKeyDelegate(t) {
    if (!this.XYu.includes(t)) {
      this.XYu.push(t);
    }
  }
  static RemoveOnBeginEditKeyDelegate(t) {
    t = this.XYu.indexOf(t);
    if (t !== -1) {
      this.XYu.splice(t, 1);
    }
  }
  static AddOnFinishEditKeyDelegate(t) {
    if (!this.YYu.includes(t)) {
      this.YYu.push(t);
    }
  }
  static RemoveOnFinishEditKeyDelegate(t) {
    t = this.YYu.indexOf(t);
    if (t !== -1) {
      this.YYu.splice(t, 1);
    }
  }
  static AddOnKeyHoverDelegate(t) {
    if (!this.zYu.includes(t)) {
      this.zYu.push(t);
    }
  }
  static RemoveOnKeyHoverDelegate(t) {
    t = this.zYu.indexOf(t);
    if (t !== -1) {
      this.zYu.splice(t, 1);
    }
  }
  static AddOnKeyUnHoverDelegate(t) {
    if (!this.JYu.includes(t)) {
      this.JYu.push(t);
    }
  }
  static RemoveOnKeyUnHoverDelegate(t) {
    t = this.JYu.indexOf(t);
    if (t !== -1) {
      this.JYu.splice(t, 1);
    }
  }
  static NYu(e, i) {
    this.$Yu.forEach(t => {
      t(e, i);
    });
  }
  static ZYu(e, i) {
    this.WYu.forEach(t => {
      t(e, i);
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCommonKeySettingKeyChange, e, i);
  }
  static VYu(e) {
    this.QYu.forEach(t => {
      t(e);
    });
  }
  static ezu() {
    this.KYu.forEach(t => {
      t();
    });
  }
  static tzu() {
    this.XYu.forEach(t => {
      t();
    });
  }
  static izu() {
    this.YYu.forEach(t => {
      t();
    });
  }
  static jYu(e) {
    this.zYu.forEach(t => {
      t(e);
    });
  }
  static HYu(e) {
    this.JYu.forEach(t => {
      t(e);
    });
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
  }
  static ht() {
    this.$Yu.length = 0;
    this.WYu.length = 0;
    this.QYu.length = 0;
    this.KYu.length = 0;
    this.XYu.length = 0;
    this.YYu.length = 0;
    this.zYu.length = 0;
    this.JYu.length = 0;
    this.cxi = undefined;
    this.fxi.length = 0;
    this.bAn.length = 0;
    this.lxi.length = 0;
    this.Lkn.clear();
    this.wd1.clear();
    this.InputControllerType = 0;
    this.Vxi();
    this.kre();
  }
  static Nxi(t, e) {
    this.lxi.length = 0;
    var i = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const r of t) {
      var n = r.TypeId;
      var a = i.GetExclusiveKeySettingConfigByTypeIdAndInputControllerType(n, 1, e) ?? [];
      var n = i.GetExclusiveKeySettingConfigByTypeIdAndInputControllerType(n, 0, e) ?? [];
      var a = a.concat(n);
      if (!(a.length <= 0)) {
        n = new KeySettingRowData_1.KeySettingRowData();
        n.InitializeKeyType(r);
        this.lxi.push(n);
        a.sort((t, e) => t.SortId === e.SortId ? t.Id - e.Id : t.SortId - e.SortId);
        for (const o of a) {
          var s = new KeySettingRowData_1.KeySettingRowData();
          s.InitializeKeySetting(o);
          (o.OnlyWorkNotShow ? this.wd1 : (this.lxi.push(s), this.Lkn)).set(o.Id, s);
        }
      }
    }
  }
  static Oxi(t, e) {
    this.bAn.length = 0;
    var i = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const r of t) {
      var n = r.TypeId;
      var a = i.GetExclusiveKeySettingConfigByTypeIdAndInputControllerType(n, 2, e) ?? [];
      var n = i.GetExclusiveKeySettingConfigByTypeIdAndInputControllerType(n, 0, e) ?? [];
      var a = a.concat(n);
      if (!(a.length <= 0)) {
        n = new KeySettingRowData_1.KeySettingRowData();
        n.InitializeKeyType(r);
        this.bAn.push(n);
        a.sort((t, e) => t.SortId === e.SortId ? t.Id - e.Id : t.SortId - e.SortId);
        for (const o of a) {
          var s = new KeySettingRowData_1.KeySettingRowData();
          s.InitializeKeySetting(o);
          (o.OnlyWorkNotShow ? this.wd1 : (this.bAn.push(s), this.Lkn)).set(o.Id, s);
        }
      }
    }
  }
  static xxi(t) {
    this.fxi.push(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[KeySetting]记录要设置的按键", ["EditKeyNameList", this.fxi]);
    }
  }
  static wxi() {
    this.fxi.length = 0;
  }
  static Rxi() {
    this.ezu();
    this.dxi = TimerSystem_1.GameplayTimerSystem.Next(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "[KeySetting]当等待键盘输入改键时");
      }
      this.Vxi();
      this.qxi(true);
      this.tzu();
      this.Fsd = true;
    });
  }
  static Lxi() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[KeySetting]当输入改键结束时");
    }
    this.qxi(false);
    this.Vxi();
    this.SelectKey(undefined);
    UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", false);
    this.izu();
    this.Fsd = false;
  }
  static qxi(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[KeySetting]设置是否允许输入", ["isWait", t]);
    }
    this.wxi();
    ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput = t;
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", t);
  }
  static Vxi() {
    if (this.dxi && TimerSystem_1.TimerSystem.Has(this.dxi)) {
      TimerSystem_1.TimerSystem.Remove(this.dxi);
      this.dxi = undefined;
    }
  }
  static Bxi(t, e, i) {
    if (!(e.length <= 0)) {
      for (const n of t) {
        if (n !== i && n.HasKey(e, this.InputControllerType)) {
          return n;
        }
      }
    }
  }
  static Akn(t, e) {
    var i = [];
    for (const a of t.ConnectedKeySettingIdList) {
      let t = undefined;
      var n = KeySettingById_1.configKeySettingById.GetConfig(a);
      if (t = (n && n.OnlyWorkNotShow ? this.wd1 : this.Lkn).get(a)) {
        t.SetKey(e, this.InputControllerType);
        i.push(t);
      }
    }
    return i;
  }
  static Dkn(t, e) {
    for (const i of this.Akn(t, e)) {
      this.ZYu(i, this.InputControllerType);
    }
  }
}
exports.KeySettingViewModel = KeySettingViewModel;
(_a = KeySettingViewModel).$Yu = [];
KeySettingViewModel.WYu = [];
KeySettingViewModel.QYu = [];
KeySettingViewModel.KYu = [];
KeySettingViewModel.XYu = [];
KeySettingViewModel.YYu = [];
KeySettingViewModel.zYu = [];
KeySettingViewModel.JYu = [];
KeySettingViewModel.cxi = undefined;
KeySettingViewModel.fxi = [];
KeySettingViewModel.bAn = [];
KeySettingViewModel.oKd = [];
KeySettingViewModel.lxi = [];
KeySettingViewModel.rKd = [];
KeySettingViewModel.Lkn = new Map();
KeySettingViewModel.wd1 = new Map();
KeySettingViewModel.rEa = 0;
KeySettingViewModel.Fsd = false;
KeySettingViewModel.dxi = undefined;
KeySettingViewModel.rAt = (e, i) => {
  if (!UiManager_1.UiManager.IsViewOpen("RepeatKeyTipsView") && ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput) {
    var i = i.KeyName.toString();
    var n = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.放弃改键);
    if (n && n.HasKey(i)) {
      _a.Lxi();
    } else if (_a.cxi) {
      if (_a.cxi.IsLock) {
        GenericPromptController_1.GenericPromptController.ShowPromptByCode("KeyLock");
        _a.Lxi();
      } else if (e) {
        _a.xxi(i);
      } else {
        if (_a.fxi.length > 1) {
          if (!_a.cxi.CanCombination) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("InputSettings", 10, "[KeySetting]改键失败，原因：该输入在配置上不允许修改成组合键", ["ActionOrAxisName", _a.cxi.GetActionOrAxisName()]);
            }
            GenericPromptController_1.GenericPromptController.ShowPromptByCode("ErrorKey");
            _a.wxi();
            return;
          }
          if (!_a.cxi.IsAllowCombinationKey(_a.fxi[0], _a.fxi[1])) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("InputSettings", 10, "[KeySetting]改键失败，原因：尝试修改为组合输入，但不在允许设置的组合按键范围配置里内", ["ActionOrAxisName", _a.cxi.GetActionOrAxisName()], ["MainKey", _a.fxi[0]], ["SecondKey", _a.fxi[1]]);
            }
            GenericPromptController_1.GenericPromptController.ShowPromptByCode("ErrorKey");
            _a.wxi();
            return;
          }
        } else {
          if (!_a.cxi.IsAllowKey(_a.fxi[0])) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("InputSettings", 10, "[KeySetting]改键失败，原因：不在允许设置的组合按键范围配置里内", ["ActionOrAxisName", _a.cxi.GetActionOrAxisName()], ["this.EditKeyNameList[0]", _a.fxi[0]]);
            }
            GenericPromptController_1.GenericPromptController.ShowPromptByCode("ErrorKey");
            _a.wxi();
            return;
          }
          if (!MenuController_1.MenuController.IsInputControllerTypeIncludeKey(_a.InputControllerType, _a.fxi[0])) {
            GenericPromptController_1.GenericPromptController.ShowPromptByCode("ErrorKey");
            _a.wxi();
            return;
          }
        }
        let t = _a.bAn;
        if (InputSettings_1.InputSettings.IsKeyboardKey(i) || InputSettings_1.InputSettings.IsMouseButton(i)) {
          t = _a.lxi;
        }
        const r = _a.Bxi(t, _a.fxi, _a.cxi);
        if (r && r.IsCheckSameKey) {
          const o = [_a.fxi[0]];
          n = _a.fxi[1];
          if (n) {
            o.push(n);
          }
          e = {
            InputControllerType: _a.InputControllerType,
            CurrentKeySettingRowData: _a.cxi,
            RepeatKeySettingRowData: r,
            OnCloseCallback: t => {
              var e;
              var i;
              var n;
              var a;
              var s;
              if (t) {
                _a.Lxi();
                t = _a.cxi.GetCurrentKeyName(_a.InputControllerType);
                if (r.IsActionOrAxis || _a.cxi.IsActionOrAxis || r.GetActionOrAxisName() !== _a.cxi.GetActionOrAxisName() || r.IsCombination(_a.InputControllerType) || _a.cxi.IsCombination(_a.InputControllerType)) {
                  r.SetKey(t, _a.InputControllerType);
                  _a.cxi.SetKey(o, _a.InputControllerType);
                } else {
                  e = _a.cxi.GetAxisKeyScaleMap();
                  i = o[0];
                  n = t[0];
                  a = e.get(i);
                  if (s = e.get(n)) {
                    e.set(i, s);
                  }
                  if (a) {
                    e.set(n, a);
                  }
                  _a.cxi.SetAxisBindingKeys(e);
                }
                _a.ZYu(_a.cxi, _a.InputControllerType);
                _a.ZYu(r, _a.InputControllerType);
                _a.Dkn(_a.cxi, o);
                _a.Dkn(r, t);
                InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
                InputSettings_1.InputSettings.SaveKeyMappings();
              } else {
                _a.qxi(true);
              }
            }
          };
          _a.qxi(false);
          UiManager_1.UiManager.OpenView("RepeatKeyTipsView", e);
        } else if (_a.fxi.length > 0) {
          _a.cxi.SetKey(_a.fxi, _a.InputControllerType);
          _a.ZYu(_a.cxi, _a.InputControllerType);
          _a.Dkn(_a.cxi, _a.fxi);
          InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
          InputSettings_1.InputSettings.SaveKeyMappings();
          _a.Lxi();
        }
      }
    } else {
      _a.Lxi();
    }
  }
};
KeySettingViewModel.Dxi = t => {
  if (_a.cxi && t) {
    _a.cxi.ChangeBothAction(_a.InputControllerType);
    _a.ZYu(_a.cxi, _a.InputControllerType);
    InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
    InputSettings_1.InputSettings.SaveKeyMappings();
  }
  _a.Lxi();
}; //# sourceMappingURL=KeySettingViewModel.js.map