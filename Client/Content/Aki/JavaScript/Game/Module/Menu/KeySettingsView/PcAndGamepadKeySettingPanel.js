"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PcAndGamepadKeySettingPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const KeySettingById_1 = require("../../../../Core/Define/ConfigQuery/KeySettingById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
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
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
const ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController");
const KeySettingDefine_1 = require("../../KeySetting/KeySettingDefine");
const RouletteController_1 = require("../../Roulette/RouletteController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MenuController_1 = require("../MenuController");
const MenuDefine_1 = require("../MenuDefine");
const KeySettingExclusiveTypeTabItem_1 = require("./KeySettingExclusiveTypeTabItem");
const KeySettingPanel_1 = require("./KeySettingPanel");
const KeySettingPanelResetButton_1 = require("./KeySettingPanelResetButton");
const KeySettingRowData_1 = require("./KeySettingRowData");
const PsGamepadItem_1 = require("./PsGamepadItem");
const XboxGamepadItem_1 = require("./XboxGamepadItem");
const keySettingRowDataHiddenTypeList = [0, 1];
const keySettingRowDataControllerTypeList = [1, 2];
const resetBtnTextMap = [];
resetBtnTextMap[1] = [];
resetBtnTextMap[2] = [];
resetBtnTextMap[1][0] = "KeyPositionReset_PC_Walk";
resetBtnTextMap[1][2] = "KeyPositionReset_PC_Drive";
resetBtnTextMap[2][0] = "KeyPositionReset_Handle_Walk";
resetBtnTextMap[2][2] = "KeyPositionReset_Handle_Drive";
class PcAndGamepadKeySettingPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.axi = undefined;
    this.hxi = undefined;
    this.a_f = [];
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
    this.h_f = undefined;
    this.l_f = 0;
    this.__f = 0;
    this.u_f = undefined;
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
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(446);
      var e = resetBtnTextMap?.at(this.oxi)?.at(this.l_f);
      if (e) {
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
        t.SetTextArgs(e);
      }
      t.FunctionMap.set(2, () => {
        keySettingRowDataHiddenTypeList.forEach(i => {
          keySettingRowDataControllerTypeList.forEach(t => {
            for (const e of this.c_f(t, this.l_f, i)) {
              e.ResetKey(t);
            }
          });
        });
        InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
        this.Refresh(this.oxi);
      });
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.Prh = () => {
      UiManager_1.UiManager.OpenView("OperationPreferencesView");
    };
    this.d_f = () => new KeySettingExclusiveTypeTabItem_1.KeySettingExclusiveTypeTabItem();
    this.m_f = t => {
      this.f_f(t);
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
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InputSettings", 95, "[KeySetting] 输入");
        }
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
            let t = this.c_f(2, this.l_f, 0);
            if (InputSettings_1.InputSettings.IsKeyboardKey(i) || InputSettings_1.InputSettings.IsMouseButton(i)) {
              t = this.c_f(1, this.l_f, 0);
            }
            const o = this.Bxi(t, this.fxi, this.cxi);
            if (o && o.IsCheckSameKey) {
              s = this.cxi.GetCurrentKeyName(this.oxi);
              if (!o.CanCombination && s.length > 1) {
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("CombineKeyDisable");
                this.wxi();
                return;
              }
              if (this.cxi.CanDisable) {
                this.Lxi();
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("KeyUnalterable_Text");
                return;
              }
              const h = [this.fxi[0]];
              e = this.fxi[1];
              if (e) {
                h.push(e);
              }
              i = {
                InputControllerType: this.oxi,
                CurrentKeySettingRowData: this.cxi,
                RepeatKeySettingRowData: o,
                OnCloseCallback: t => {
                  var e;
                  var i;
                  var s;
                  var n;
                  var r;
                  if (t) {
                    this.Lxi();
                    t = this.cxi.GetCurrentKeyName(this.oxi);
                    if (o.IsActionOrAxis || this.cxi.IsActionOrAxis || o.GetActionOrAxisName() !== this.cxi.GetActionOrAxisName() || o.IsCombination(this.oxi) || this.cxi.IsCombination(this.oxi)) {
                      o.SetKey(t, this.oxi);
                      this.cxi.SetKey(h, this.oxi);
                    } else {
                      e = this.cxi.GetAxisKeyScaleMap();
                      r = this.cxi.ConvertKeyToActionOrAxis(h[0]);
                      i = this.cxi.ConvertKeyToActionOrAxis(t[0]);
                      s = e.get(r);
                      if (n = e.get(i)) {
                        e.set(r, n);
                      }
                      if (s) {
                        e.set(i, s);
                      }
                      this.cxi.SetAxisBindingKeys(e, this.cxi.BindingType);
                    }
                    (r = this.bxi())?.RefreshRow(this.cxi);
                    r?.RefreshRow(o);
                    this.Dkn(this.cxi, h);
                    this.Dkn(o, t);
                    InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
                    InputSettings_1.InputSettings.SaveKeyMappings();
                  } else {
                    this.qxi(true);
                  }
                }
              };
              this.qxi(false);
              UiManager_1.UiManager.OpenView("RepeatKeyTipsView", i);
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
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent], [17, UE.UIItem]];
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
    this.u_f = new KeySettingPanelResetButton_1.KeySettingPanelResetButton();
    var n = this.u_f.CreateByActorAsync(this.GetButton(9).GetOwner());
    var r = this.g_f();
    await Promise.all([t, e, i, s, n, r]);
  }
  async g_f() {
    var t = [];
    this.h_f = new TabComponent_1.TabComponent(this.GetItem(17), this.d_f, this.m_f, undefined);
    var e = this.C_f();
    t.push(this.h_f.RefreshTabItemAsync(e));
    await Promise.all(t);
  }
  f_f(t) {
    var e = KeySettingDefine_1.menuKeySettingExclusiveTypeList[t];
    if (e !== this.l_f && (this.l_f = e, this.__f = t, this.Refresh(this.oxi), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Menu", 95, "[KeySetting] 切换独占类型页签", ["index", t]);
    }
  }
  C_f() {
    var t = [];
    for (const s of KeySettingDefine_1.menuKeySettingExclusiveTypeList) {
      var e;
      var i = ConfigManager_1.ConfigManager.MenuBaseConfig.GetExclusiveTypeConfigById(s);
      if (i) {
        e = new CommonTabItemBase_1.CommonTabItemData();
        i = new CommonTabData_1.CommonTabData(i.IconSpritePath, new CommonTabTitleData_1.CommonTabTitleData(i.Name));
        e.Data = i;
        t.push(e);
      }
    }
    return t;
  }
  p_f(t) {
    if (t) {
      this.h_f.GetTabItemMap().forEach(t => {
        t.SetForceSwitch(0, false);
      });
      this.h_f.SelectToggleByIndex(this.__f, true, true);
    } else {
      this.h_f.ResetSelectIndex();
      this.h_f.GetTabItemMap().forEach(t => {
        t.SetForceSwitch(2, false);
      });
    }
  }
  P4f() {
    let t = undefined;
    if (ModelManager_1.ModelManager.BattleUiModel?.MotorcycleData?.IsDriving) {
      t = 2;
    }
    return KeySettingDefine_1.menuKeySettingExclusiveTypeList.indexOf(t ?? 0);
  }
  v_f(t) {
    for (const s of keySettingRowDataControllerTypeList) {
      for (const n of KeySettingDefine_1.menuKeySettingExclusiveTypeList) {
        var e = this.c_f(s, n, 0);
        var i = this.c_f(s, n, 1);
        this.y_f(e, i, t, s, n);
      }
    }
  }
  OnStart() {
    var t = ConfigManager_1.ConfigManager.MenuBaseConfig.GetAllKeyTypeConfig();
    if (t) {
      this.Lkn.clear();
      this.wd1.clear();
      this.Gxi();
      this.v_f(t);
      this.Rka();
      this.Fxi();
      this.Ore();
      t = this.P4f();
      this.h_f.SelectToggleByIndex(t, true);
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
  Akn(e, i) {
    var s = [];
    for (const r of e.ConnectedKeySettingIdList) {
      let t = undefined;
      var n = KeySettingById_1.configKeySettingById.GetConfig(r);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 95, "[KeySetting] 设置连锁键位 连锁Id", ["KeySettingRowData", e.GetKeySettingConfig()?.Id], ["Id", r]);
      }
      if (t = n && n.OnlyWorkNotShow ? this.Ad1(r) : this.Ukn(r)) {
        t.SetKey(i, this.oxi);
        s.push(t);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 95, "[KeySetting] 设置连锁键位 连锁Id 找不到数据", ["KeySettingRowData", e.GetKeySettingConfig()?.Id], ["Id", r]);
      }
    }
    return s;
  }
  Dkn(t, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 95, "[KeySetting] 设置连锁键位", ["KeySettingRowData", t.GetKeySettingConfig()?.Id], ["KeyNameList", e], ["连锁列表", t.ConnectedKeySettingIdList]);
    }
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
  c_f(t, e, i) {
    let s = this.a_f[t];
    if (!s) {
      s = [];
      this.a_f[t] = s;
    }
    let n = s[e];
    if (!n) {
      n = [];
      s[e] = n;
    }
    let r = n[i];
    if (!r) {
      r = [];
      n[i] = r;
    }
    return r;
  }
  y_f(e, i, t, s, n) {
    e.length = 0;
    i.length = 0;
    var r = ConfigManager_1.ConfigManager.MenuBaseConfig;
    for (const _ of t) {
      var o = _.TypeId;
      var h = r.GetExclusiveKeySettingConfigByTypeIdAndInputControllerType(o, s, n) ?? [];
      var o = r.GetExclusiveKeySettingConfigByTypeIdAndInputControllerType(o, 0, n) ?? [];
      var h = h.concat(o);
      if (!(h.length <= 0)) {
        let t = false;
        for (const l of h) {
          if (!l.OnlyWorkNotShow) {
            t = true;
            break;
          }
        }
        if (t) {
          (o = new KeySettingRowData_1.KeySettingRowData()).InitializeKeyType(_);
          e.push(o);
        }
        h.sort((t, e) => t.SortId === e.SortId ? t.Id - e.Id : t.SortId - e.SortId);
        for (const g of h) {
          var a = new KeySettingRowData_1.KeySettingRowData();
          a.InitializeKeySetting(g);
          (g.OnlyWorkNotShow ? (i.push(a), this.wd1) : (e.push(a), this.Lkn)).set(g.Id, a);
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
    this.Wxi(t, this.l_f);
    this.Kxi(t);
    this.S_f(t);
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
  Pn1(t, e) {
    this.axi?.Refresh(this.c_f(1, e, 0), t);
    this.axi?.SetActive(true);
    this.hxi?.SetActive(false);
    this.GetItem(4)?.SetUIActive(true);
    this.GetItem(3)?.SetUIActive(false);
    this.cGu(t);
  }
  xn1(t, e) {
    this.hxi?.Refresh(this.c_f(2, e, 0), t);
    this.hxi?.SetActive(true);
    this.axi?.SetActive(false);
    this.GetItem(4)?.SetUIActive(false);
    this.GetItem(3)?.SetUIActive(true);
    this.cGu(t);
  }
  cGu(t) {
    var e;
    if (t === 1) {
      this.GetButton(9)?.RootUIComp.SetUIActive(true);
      this.GetButton(15)?.RootUIComp.SetUIActive(false);
      this.GetButton(16)?.RootUIComp.SetUIActive(false);
      this.GetItem(13)?.SetUIActive(false);
    } else if (t === 2) {
      t = Platform_1.Platform.IsPs5Platform();
      e = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum();
      e = Info_1.Info.CheckIsBackBoneGamepad(e);
      t = t || e;
      this.GetButton(9)?.RootUIComp.SetUIActive(!t);
      this.GetButton(15)?.RootUIComp.SetUIActive(!t);
      this.GetButton(16)?.RootUIComp.SetUIActive(t);
      this.GetItem(13)?.SetUIActive(t);
    }
  }
  Wxi(t, e) {
    switch (t) {
      case 1:
        this.Pn1(t, e);
        break;
      case 2:
        this.xn1(t, e);
    }
  }
  Kxi(t) {
    (t === 2 ? (t = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum(), Info_1.Info.CheckIsPsGamepad(t) ? (this.GamepadItem = this.vxi, this.vxi?.SetActive(true), this.pxi) : (this.GamepadItem = this.pxi, this.pxi?.SetActive(true), this.vxi)) : (this.GamepadItem = undefined, this.vxi?.SetActive(false), this.pxi))?.SetActive(false);
  }
  S_f(t) {
    if (t === 1) {
      this.u_f?.SetConfirmText("PlayerController_ResetButton");
    } else if (t === 2) {
      this.u_f?.SetConfirmText("PlayerController_ResetButton_Controller");
    }
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
    this.p_f(false);
    this.GetButton(9)?.RootUIComp.SetUIActive(false);
    this.dxi = TimerSystem_1.GameplayTimerSystem.Next(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "[KeySetting]当等待键盘输入改键时26");
      }
      this.GamepadItem?.SetAllKeyDisable();
      this.Mxi = undefined;
      this.Vxi();
      this.qxi(true);
      this.Fxi("EditKey_Text");
    });
    this.h_f.GetTabItemMap().forEach(t => {
      t.SetForceSwitch(2, false);
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
    this.p_f(true);
    this.cGu(this.oxi);
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