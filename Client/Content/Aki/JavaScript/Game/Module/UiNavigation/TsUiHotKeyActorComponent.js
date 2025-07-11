"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiHotKeyActorComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const GlobalData_1 = require("../../GlobalData");
const UiNavigationLogic_1 = require("./New/UiNavigationLogic");
const HotKeyItemFactory_1 = require("./UIItem/HotKeyItemFactory");
const UiNavigationUtil_1 = require("./UiNavigationUtil");
class TsUiHotKeyActorComponent extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments);
    this.Mode = "";
    this.Index = 0;
    this.IsUsePool = false;
    this.HotKeyItem = undefined;
    this.PanelConfig = undefined;
    this.UiHotKeyState = 0;
  }
  Constructor() {
    this.HotKeyItem = undefined;
    this.PanelConfig = undefined;
    this.UiHotKeyState = 0;
  }
  AwakeBP() {
    this.UiHotKeyState = 1;
  }
  StartBP() {
    if (GlobalData_1.GlobalData?.GameInstance) {
      if (this.Index <= 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiNavigation", 10, "当前配置的热键id是无效的,无法执行TsUiHotKeyActorComponent逻辑", ["Path", UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(this.RootUIComp.GetOwner())], ["Index", this.Index]);
        }
      } else {
        this.Start();
      }
    }
  }
  async Start() {
    await this.RegisterHotKeyItem();
  }
  OnEnableBP() {
    if (this.HotKeyItem) {
      this.RegisterAllHotKeyComponent();
      this.TryResetPanelConfig();
    }
  }
  OnDisableBP() {
    if (this.HotKeyItem) {
      this.UnRegisterAllHotKeyComponent();
    }
  }
  OnDestroyBP() {
    this.UnRegisterHotKeyItem();
    this.UiHotKeyState = 6;
  }
  async RegisterHotKeyItem() {
    this.UiHotKeyState = 2;
    this.HotKeyItem = await HotKeyItemFactory_1.HotKeyItemFactory.CreateHotKeyItem(this.GetOwner(), this.Mode, this.Index);
    this.UiHotKeyState = 3;
    if (this.HotKeyItem && (this.RegisterAllHotKeyComponent(), this.PanelConfig = UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(this.GetOwner()), this.PanelConfig)) {
      this.PanelConfig.AddHotKeyItem(this.HotKeyItem);
    }
  }
  TryResetPanelConfig() {
    if (!!this.IsUsePool && !(this.UiHotKeyState < 3) && !!this.HotKeyItem && (!this.PanelConfig?.IsValid() || !this.PanelConfig?.RootUIComp?.IsValid())) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "可能存在从对象池获取的情况[UiHotKeyActorComponent]", ["GroupName", this.Index], ["Name", this.RootUIComp.displayName]);
      }
      this.PanelConfig = UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(this.GetOwner());
      if (this.PanelConfig) {
        this.PanelConfig.AddHotKeyItem(this.HotKeyItem);
      }
    }
  }
  UnRegisterHotKeyItem() {
    if (this.HotKeyItem && (this.UnRegisterAllHotKeyComponent(), this.HotKeyItem.Clear(), this.PanelConfig)) {
      this.PanelConfig.DeleteKeyItem(this.HotKeyItem);
    }
  }
  RegisterAllHotKeyComponent() {
    if (!(this.UiHotKeyState < 3) && this.UiHotKeyState !== 4) {
      this.UiHotKeyState = 4;
      for (const t of this.HotKeyItem.GetHotKeyComponentArray()) {
        if (t) {
          this.RegisterHotKeyComponent(t);
        }
      }
    }
  }
  UnRegisterAllHotKeyComponent() {
    if (this.UiHotKeyState === 4) {
      this.UiHotKeyState = 5;
      for (const t of this.HotKeyItem.GetHotKeyComponentArray()) {
        if (t) {
          this.UnRegisterHotKeyComponent(t);
        }
      }
    }
  }
  RegisterHotKeyComponent(t) {
    t.RegisterMe();
    UiNavigationLogic_1.UiNavigationLogic.BindHotKeyComponentAction(t, true);
    UiNavigationLogic_1.UiNavigationLogic.BindHotKeyComponentAxis(t, true);
  }
  UnRegisterHotKeyComponent(t) {
    t.UnRegisterMe();
    UiNavigationLogic_1.UiNavigationLogic.BindHotKeyComponentAction(t, false);
    UiNavigationLogic_1.UiNavigationLogic.BindHotKeyComponentAxis(t, false);
  }
}
exports.TsUiHotKeyActorComponent = TsUiHotKeyActorComponent;
exports.default = TsUiHotKeyActorComponent; //# sourceMappingURL=TsUiHotKeyActorComponent.js.map