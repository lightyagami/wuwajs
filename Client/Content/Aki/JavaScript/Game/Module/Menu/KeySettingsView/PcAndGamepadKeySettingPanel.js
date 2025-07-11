"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcAndGamepadKeySettingPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const KeySettingById_1 = require("../../../../Core/Define/ConfigQuery/KeySettingById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputKeyUtils_1 = require("../../../InputSettings/InputKeyUtils");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const InputSettingsController_1 = require("../../../InputSettings/InputSettingsController");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController");
const RouletteController_1 = require("../../Roulette/RouletteController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MenuController_1 = require("../MenuController");
const MenuDefine_1 = require("../MenuDefine");
const KeySettingPanel_1 = require("./KeySettingPanel");
const KeySettingRowData_1 = require("./KeySettingRowData");
const PsGamepadItem_1 = require("./PsGamepadItem");
const XboxGamepadItem_1 = require("./XboxGamepadItem");
class PcAndGamepadKeySettingPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.axi = undefined;
    this.hxi = undefined;
    this.lxi = [];
    this.bAn = [];
    this.Lkn = new Map();
    this.wd1 = new Map();
    this.oxi = 0;
    this.cxi = undefined;
    this.mxi = undefined;
    this.dxi = undefined;
    this.Cxi = new Map();
    this.gxi = 0;
    this.fxi = [];
    this.pxi = undefined;
    this.vxi = undefined;
    this.GamepadItem = undefined;
    this.Mxi = undefined;
    this.m2n = undefined;
    this.Exi = () => {
      let t = this.oxi;
      t = this.gxi === 1 ? this.Sxi(2) : this.Sxi(1);
      this.Refresh(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, MenuDefine_1.STOP_GUIDE_TAG);
    };
    this.yxi = () => {
      let t = this.oxi;
      t = this.gxi === 1 ? this.Sxi(2) : this.Sxi(1);
      this.Refresh(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, MenuDefine_1.STOP_GUIDE_TAG);
    };
    this.Ixi = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(179);
      t.FunctionMap.set(2, () => {
        InputSettingsManager_1.InputSettingsManager.ResetDefaultInputKey();
        InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
        this.Refresh(this.oxi);
      });
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.Prh = () => {
      UiManager_1.UiManager.OpenView("OperationPreferencesView");
    };
    this.Txi = (t, e, i) => {
      this.axi?.SelectKeySettingRow(i);
      var i = t.OpenViewType;
      if (i !== 0) {
        switch (i) {
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
      } else {
        this.cxi = t;
        this.mxi = e;
        if (t.BothActionName.length === 2) {
          i = {
            InputControllerType: this.oxi,
            KeySettingRowData: t,
            OnConfirmCallback: this.Dxi
          };
          UiManager_1.UiManager.OpenView("ChangeActionTipsView", i);
          this.Lxi();
        } else {
          this.Rxi();
        }
      }
    };
    this.Uxi = t => {
      if (this.oxi !== 1 && (this.Mxi = t) && (t = t.GetDisplayKeyName(this.oxi))) {
        this.GamepadItem?.SetKeysEnable(t);
      } else {
        this.GamepadItem?.SetAllKeyDisable();
      }
    };
    this.Axi = t => {
      if (this.oxi === 1 || !this.Mxi || this.Mxi.ConfigId === t?.ConfigId) {
        this.GamepadItem?.SetAllKeyDisable();
      }
    };
    this.Pxi = (t, e, i) => {
      this.hxi?.SelectKeySettingRow(i);
      var i = t.OpenViewType;
      if (i !== 0) {
        switch (i) {
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
      } else {
        this.cxi = t;
        this.mxi = e;
        if (t.BothActionName.length === 2) {
          i = {
            InputControllerType: this.oxi,
            KeySettingRowData: t,
            OnConfirmCallback: this.Dxi
          };
          UiManager_1.UiManager.OpenView("ChangeActionTipsView", i);
          this.Lxi();
        } else {
          this.Rxi();
        }
      }
    };
    this.Dxi = t => {
      if (this.cxi && t) {
        this.cxi.ChangeBothAction(this.oxi);
        this.mxi?.Refresh(this.cxi, this.oxi);
        InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
        InputSettings_1.InputSettings.SaveKeyMappings();
      }
      this.Lxi();
    };
    this.rAt = (e, i) => {
      if (!UiManager_1.UiManager.IsViewOpen("RepeatKeyTipsView") && ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput) {
        var i = i.KeyName.toString();
        var s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(InputMappingsDefine_1.actionMappings.放弃改键);
        if (s && s.HasKey(i)) {
          this.Lxi();
        } else if (this.cxi) {
          if (this.cxi.IsLock) {
            GenericPromptController_1.GenericPromptController.ShowPromptByCode("KeyLock");
            this.Lxi();
          } else if (e) {
            this.xxi(i);
          } else {
            if (this.fxi.length > 1) {
              if (!this.cxi.CanCombination) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("InputSettings", 10, "[KeySetting]改键失败，原因：该输入在配置上不允许修改成组合键", ["ActionOrAxisName", this.cxi.GetActionOrAxisName()]);
                }
                GenericPromptController_1.GenericPromptController.ShowPromptByCode("ErrorKey");
                this.wxi();
                return;
              }
              if (!this.cxi.IsAllowCombinationKey(this.fxi[0], this.fxi[1])) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("InputSettings", 10, "[KeySetting]改键失败，原因：尝试修改为组合输入，但不在允许设置的组合按键范围配置里内", ["ActionOrAxisName", this.cxi.GetActionOrAxisName()], ["MainKey", this.fxi[0]], ["SecondKey", this.fxi[1]]);
                }
                GenericPromptController_1.GenericPromptController.ShowPromptByCode("ErrorKey");
                this.wxi();
                return;
              }
            } else {
              if (!this.cxi.IsAllowKey(this.fxi[0])) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("InputSettings", 10, "[KeySetting]改键失败，原因：不在允许设置的组合按键范围配置里内", ["ActionOrAxisName", this.cxi.GetActionOrAxisName()], ["this.EditKeyNameList[0]", this.fxi[0]]);
                }
                GenericPromptController_1.GenericPromptController.ShowPromptByCode("ErrorKey");
                this.wxi();
                return;
              }
              if (!MenuController_1.MenuController.IsInputControllerTypeIncludeKey(this.oxi, this.fxi[0])) {
                GenericPromptController_1.GenericPromptController.ShowPromptByCode("ErrorKey");
                this.wxi();
                return;
              }
            }
            let t = this.bAn;
            if (InputSettings_1.InputSettings.IsKeyboardKey(i) || InputSettings_1.InputSettings.IsMouseButton(i)) {
              t = this.lxi;
            }
            const h = this.Bxi(t, this.fxi, this.cxi);
            if (h && h.IsCheckSameKey) {
              const o = [this.fxi[0]];
              s = this.fxi[1];
              if (s) {
                o.push(s);
              }
              e = {
                InputControllerType: this.oxi,
                CurrentKeySettingRowData: this.cxi,
                RepeatKeySettingRowData: h,
                OnCloseCallback: t => {
                  var e;
                  var i;
                  var s;
                  var n;
                  var r;
                  if (t) {
                    this.Lxi();
                    t = this.cxi.GetCurrentKeyName(this.oxi);
                    if (h.IsActionOrAxis || this.cxi.IsActionOrAxis || h.GetActionOrAxisName() !== this.cxi.GetActionOrAxisName() || h.IsCombination(this.oxi) || this.cxi.IsCombination(this.oxi)) {
                      h.SetKey(t, this.oxi);
                      this.cxi.SetKey(o, this.oxi);
                    } else {
                      e = this.cxi.GetAxisKeyScaleMap();
                      r = o[0];
                      i = t[0];
                      s = e.get(r);
                      if (n = e.get(i)) {
                        e.set(r, n);
                      }
                      if (s) {
                        e.set(i, s);
                      }
                      this.cxi.SetAxisBindingKeys(e);
                    }
                    (r = this.bxi())?.RefreshRow(this.cxi);
                    r?.RefreshRow(h);
                    this.Dkn(this.cxi, o);
                    this.Dkn(h, t);
                    InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
                    InputSettings_1.InputSettings.SaveKeyMappings();
                  } else {
                    this.qxi(true);
                  }
                }
              };
              this.qxi(false);
              UiManager_1.UiManager.OpenView("RepeatKeyTipsView", e);
            } else if (this.fxi.length > 0) {
              this.cxi.SetKey(this.fxi, this.oxi);
              this.mxi?.Refresh(this.cxi, this.oxi);
              this.Dkn(this.cxi, this.fxi);
              InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
              InputSettings_1.InputSettings.SaveKeyMappings();
              this.Lxi();
            }
          }
        } else {
          this.Lxi();
        }
      }
    };
    this.TZa = () => {
      if (this.gxi === 1) {
        if (this.GetItem(7)?.bIsUIActive) {
          this.Lxi();
        }
        this.Refresh(1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Exi], [1, this.yxi], [9, this.Ixi], [14, this.Ixi], [15, this.Prh], [16, this.Prh]];
  }
  async OnBeforeStartAsync() {
    this.axi = new KeySettingPanel_1.KeySettingPanel();
    this.axi.BindOnWaitInput(this.Txi);
    this.axi.BindOnHover(this.Uxi);
    this.axi.BindOnUnHover(this.Axi);
    var t = this.axi.CreateByActorAsync(this.GetItem(6).GetOwner());
    this.hxi = new KeySettingPanel_1.KeySettingPanel();
    this.hxi.BindOnWaitInput(this.Pxi);
    this.hxi.BindOnHover(this.Uxi);
    this.hxi.BindOnUnHover(this.Axi);
    var e = this.hxi.CreateByActorAsync(this.GetItem(5).GetOwner());
    this.pxi = new XboxGamepadItem_1.XboxGamepadItem();
    var i = this.pxi.CreateByResourceIdAsync("UiItem_HandleSetXBox", this.GetItem(10));
    this.vxi = new PsGamepadItem_1.PsGamepadItem();
    var s = this.vxi.CreateByResourceIdAsync("UiItem_HandleSetPs", this.GetItem(10));
    this.m2n = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7));
    await Promise.all([t, e, i, s]);
  }
  OnStart() {
    var t = ConfigManager_1.ConfigManager.MenuBaseConfig.GetAllKeyTypeConfig();
    if (t) {
      this.Lkn.clear();
      this.wd1.clear();
      this.Gxi();
      this.Nxi(t);
      this.Oxi(t);
      this.Rka();
      this.Fxi();
      this.Ore();
    }
  }
  OnBeforeDestroy() {
    this.kre();
    this.Vxi();
    this.m2n?.Clear();
    this.m2n = undefined;
    this.axi = undefined;
    this.hxi = undefined;
    this.cxi = undefined;
    this.mxi = undefined;
    this.pxi = undefined;
    this.vxi = undefined;
    this.GamepadItem = undefined;
    this.Mxi = undefined;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDeviceLangChange, this.TZa);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDeviceLangChange, this.TZa);
  }
  Akn(t, e) {
    var i = [];
    for (const n of t.ConnectedKeySettingIdList) {
      let t = undefined;
      var s = KeySettingById_1.configKeySettingById.GetConfig(n);
      if (t = s && s.OnlyWorkNotShow ? this.Ad1(n) : this.Ukn(n)) {
        t.SetKey(e, this.oxi);
        i.push(t);
      }
    }
    return i;
  }
  Dkn(t, e) {
    var t = this.Akn(t, e);
    var i = this.bxi();
    for (const s of t) {
      i?.RefreshRow(s);
    }
  }
  Gxi() {
    this.Cxi.set(1, {
      DeviceType: 1,
      NameTextId: "Text_KeyBoard_Text"
    });
    this.Cxi.set(2, {
      DeviceType: 2,
      NameTextId: "Text_Handle_Text"
    });
  }
  Nxi(t) {
    this.lxi.length = 0;
    var e = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const r of t) {
      var i = r.TypeId;
      var s = e.GetKeySettingConfigListByTypeIdAndInputControllerType(i, 1) ?? [];
      var i = e.GetKeySettingConfigListByTypeIdAndInputControllerType(i, 0) ?? [];
      var s = s.concat(i);
      if (!(s.length <= 0)) {
        i = new KeySettingRowData_1.KeySettingRowData();
        i.InitializeKeyType(r);
        this.lxi.push(i);
        s.sort((t, e) => t.SortId === e.SortId ? t.Id - e.Id : t.SortId - e.SortId);
        for (const h of s) {
          var n = new KeySettingRowData_1.KeySettingRowData();
          n.InitializeKeySetting(h);
          (h.OnlyWorkNotShow ? this.wd1 : (this.lxi.push(n), this.Lkn)).set(h.Id, n);
        }
      }
    }
  }
  Oxi(t) {
    this.bAn.length = 0;
    var e = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const r of t) {
      var i = r.TypeId;
      var s = e.GetKeySettingConfigListByTypeIdAndInputControllerType(i, 2) ?? [];
      var i = e.GetKeySettingConfigListByTypeIdAndInputControllerType(i, 0) ?? [];
      var s = s.concat(i);
      if (!(s.length <= 0)) {
        i = new KeySettingRowData_1.KeySettingRowData();
        i.InitializeKeyType(r);
        this.bAn.push(i);
        s.sort((t, e) => t.SortId === e.SortId ? t.Id - e.Id : t.SortId - e.SortId);
        for (const h of s) {
          var n = new KeySettingRowData_1.KeySettingRowData();
          n.InitializeKeySetting(h);
          (h.OnlyWorkNotShow ? this.wd1 : (this.bAn.push(n), this.Lkn)).set(h.Id, n);
        }
      }
    }
  }
  Rka() {
    var t = Platform_1.Platform.IsPs5Platform();
    var e = Info_1.Info.IsMobileInputModel() && Info_1.Info.IsInGamepad();
    this.GetButton(0)?.RootUIComp.SetUIActive(!t && !e);
    this.GetButton(1)?.RootUIComp.SetUIActive(!t && !e);
    var e = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum();
    var e = Info_1.Info.IsInGamepad() && Info_1.Info.CheckIsBackBoneGamepad(e);
    var t = t || e;
    this.GetItem(12)?.SetUIActive(!t);
  }
  Refresh(t) {
    this.oxi = t;
    var e = this.Hxi(t);
    this.jxi(e);
    this.Wxi(t);
    this.Kxi(t);
  }
  jxi(t) {
    this.gxi = t;
    var t = this.Cxi.get(t);
    if (t) {
      t = t.NameTextId;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
      if (this.gxi === 1) {
        this.GetButton(0)?.SetSelfInteractive(false);
        this.GetButton(1)?.SetSelfInteractive(true);
      } else {
        this.GetButton(0)?.SetSelfInteractive(true);
        this.GetButton(1)?.SetSelfInteractive(false);
      }
    }
  }
  Pn1(t) {
    this.axi?.Refresh(this.lxi, t);
    this.axi?.SetActive(true);
    this.hxi?.SetActive(false);
    this.GetItem(4)?.SetUIActive(true);
    this.GetItem(3)?.SetUIActive(false);
    this.GetButton(9)?.RootUIComp.SetUIActive(true);
    this.GetButton(15)?.RootUIComp.SetUIActive(false);
    this.GetButton(16)?.RootUIComp.SetUIActive(false);
    this.GetItem(13)?.SetUIActive(false);
  }
  xn1(t) {
    var e = Platform_1.Platform.IsPs5Platform();
    var i = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum();
    var i = Info_1.Info.CheckIsBackBoneGamepad(i);
    var e = e || i;
    this.hxi?.Refresh(this.bAn, t);
    this.hxi?.SetActive(true);
    this.axi?.SetActive(false);
    this.GetItem(4)?.SetUIActive(false);
    this.GetItem(3)?.SetUIActive(true);
    this.GetButton(9)?.RootUIComp.SetUIActive(!e);
    this.GetButton(15)?.RootUIComp.SetUIActive(!e);
    this.GetButton(16)?.RootUIComp.SetUIActive(e);
    this.GetItem(13)?.SetUIActive(e);
  }
  Wxi(t) {
    switch (t) {
      case 1:
        this.Pn1(t);
        break;
      case 2:
        this.xn1(t);
    }
  }
  Kxi(t) {
    (t === 2 ? (t = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum(), Info_1.Info.CheckIsPsGamepad(t) ? (this.GamepadItem = this.vxi, this.vxi?.SetActive(true), this.pxi) : (this.GamepadItem = this.pxi, this.pxi?.SetActive(true), this.vxi)) : (this.GamepadItem = undefined, this.vxi?.SetActive(false), this.pxi))?.SetActive(false);
  }
  Hxi(t) {
    switch (t) {
      case 1:
        return 1;
      case 2:
        return 2;
    }
    return 0;
  }
  Sxi(t) {
    if (t === 1) {
      return 1;
    } else {
      return 2;
    }
  }
  Bxi(t, e, i) {
    if (!(e.length <= 0)) {
      for (const s of t) {
        if (s !== i && s.HasKey(e, this.oxi)) {
          return s;
        }
      }
    }
  }
  Rxi() {
    this.axi?.StopScroll();
    this.hxi?.StopScroll();
    this.dxi = TimerSystem_1.GameplayTimerSystem.Next(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "[KeySetting]当等待键盘输入改键时");
      }
      this.GamepadItem?.SetAllKeyDisable();
      this.Mxi = undefined;
      this.Vxi();
      this.qxi(true);
      this.Fxi("EditKey_Text");
    });
  }
  Lxi() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[KeySetting]当输入改键结束时");
    }
    this.qxi(false);
    this.Vxi();
    this.Fxi();
    this.bxi()?.SelectKeySettingRow(undefined);
    UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", false);
  }
  xxi(t) {
    this.fxi.push(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[KeySetting]记录要设置的按键", ["EditKeyNameList", this.fxi]);
    }
  }
  qxi(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[KeySetting]设置是否允许输入", ["isWait", t]);
    }
    this.wxi();
    ModelManager_1.ModelManager.MenuModel.IsWaitForKeyInput = t;
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    UiLayer_1.UiLayer.SetShowMaskLayer("KeySettingMask", t);
  }
  wxi() {
    this.fxi.length = 0;
  }
  Vxi() {
    if (this.dxi && TimerSystem_1.GameplayTimerSystem.Has(this.dxi)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.dxi);
      this.dxi = undefined;
    }
  }
  Fxi(t) {
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      this.GetItem(7)?.SetUIActive(false);
      this.GetItem(11)?.SetUIActive(true);
      this.m2n.StopCurrentSequence();
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t);
      this.GetItem(7)?.SetUIActive(true);
      this.GetItem(11)?.SetUIActive(false);
      this.m2n.PlayLevelSequenceByName("Start");
    }
  }
  Ukn(t) {
    return this.Lkn.get(t);
  }
  Ad1(t) {
    return this.wd1.get(t);
  }
  bxi() {
    switch (this.oxi) {
      case 1:
        return this.axi;
      case 2:
        return this.hxi;
    }
  }
  GetGuideItemByKeySettingId(t, e) {
    var i = this.bxi();
    var t = this.Ukn(t);
    if (i && t) {
      return i.GetRowByData(t, e)?.GetRootItem();
    }
  }
}
exports.PcAndGamepadKeySettingPanel = PcAndGamepadKeySettingPanel;
//# sourceMappingURL=PcAndGamepadKeySettingPanel.js.map