"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCSharpProxyController = undefined;
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
class InputCSharpProxyController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveSetupInputComponent, this.y_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveBeginPlay, this.S_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveDestroyed, this.M_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveTick, this.E_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceivedPlayer, this.I_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInitInputHandle, this.T_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerAddInputBinding, this.b_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerClearInputBinding, this.R_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnSetupInputComponent, this.w_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerBindTouchHandle, this.L_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAction, this.P_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAxis, this.A_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchBegin, this.D_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchEnd, this.U_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchMove, this.x_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnPressAnyKey, this.B_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnReleaseAnyKey, this.k_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveActionHandle, this.q_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerGetActionHandle, this.O_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveAxisHandle, this.G_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerGetAxisHandle, this.F_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerIsInTouch, this.N_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerSetIsPrintKeyName, this.V_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchBegin, this.j_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchEnd, this.H_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchMove, this.$_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerPressAnyKey, this.W_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReleaseAnyKey, this.Q_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveBeginPlay, this.K_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveDestroyed, this.X_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePossess, this.Y_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveUnPossess, this.z_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerOnSetupInputComponent, this.J_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePreProcessInput, this.Z_m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePostProcessInput, this.eum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootActive, this.tum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootDeactivate, this.ium);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyInfoSwitchInputControllerType, this.rum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerAwakeBP, this.oum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerStartBP, this.aum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationEnterBP, this.hum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationSelectBP, this.lum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnEnableBP, this._um);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDisableBP, this.uum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyInteractiveBP, this.cum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNotInteractiveBP, this.dum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDestroyBP, this.mum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckCanSetNavigationBP, this.fum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckLoopScrollChangeNavigationBP, this.gum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigAwakeBP, this.Cum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigStartBP, this.pum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnEnableBP, this.vum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDisableBP, this.yum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDestroyBP, this.Mum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiBlurSetEnableUiBlur, this.Eum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentAwakeBP, this.Ium);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentStartBP, this.Tum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnEnableBP, this.bum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDisableBP, this.Rum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDestroyBP, this.wum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerAwakeBP, this.Lum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerStartBP, this.Pum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerOnNotifyTextChangeBP, this.Aum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTrigger, this.Dum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputNavigation, this.Uum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTriggerForNavigation, this.xum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputScroll, this.Bum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchTrigger, this.kum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchMove, this.qum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorSetClickThresholdWithInputKeyType, this.Oum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorGetNowHitComponent, this.Gum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorGetPointerEventData, this.Fum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorIsPointerEventDataLineTrace, this.Vum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerAwakeBP, this.jum);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerOnDestroyBP, this.Hum);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveSetupInputComponent, this.y_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveBeginPlay, this.S_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveDestroyed, this.M_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveTick, this.E_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceivedPlayer, this.I_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInitInputHandle, this.T_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerAddInputBinding, this.b_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerClearInputBinding, this.R_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnSetupInputComponent, this.w_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerBindTouchHandle, this.L_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAction, this.P_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAxis, this.A_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchBegin, this.D_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchEnd, this.U_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchMove, this.x_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnPressAnyKey, this.B_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnReleaseAnyKey, this.k_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveActionHandle, this.q_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerGetActionHandle, this.O_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveAxisHandle, this.G_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerGetAxisHandle, this.F_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerIsInTouch, this.N_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerSetIsPrintKeyName, this.V_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchBegin, this.j_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchEnd, this.H_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchMove, this.$_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerPressAnyKey, this.W_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReleaseAnyKey, this.Q_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveBeginPlay, this.K_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveDestroyed, this.X_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePossess, this.Y_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveUnPossess, this.z_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerOnSetupInputComponent, this.J_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePreProcessInput, this.Z_m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePostProcessInput, this.eum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootActive, this.tum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootDeactivate, this.ium);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyInfoSwitchInputControllerType, this.rum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerAwakeBP, this.oum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerStartBP, this.aum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationEnterBP, this.hum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationSelectBP, this.lum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnEnableBP, this._um);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDisableBP, this.uum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyInteractiveBP, this.cum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNotInteractiveBP, this.dum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDestroyBP, this.mum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckCanSetNavigationBP, this.fum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckLoopScrollChangeNavigationBP, this.gum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigAwakeBP, this.Cum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigStartBP, this.pum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnEnableBP, this.vum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDisableBP, this.yum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDestroyBP, this.Mum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiBlurSetEnableUiBlur, this.Eum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentAwakeBP, this.Ium);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentStartBP, this.Tum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnEnableBP, this.bum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDisableBP, this.Rum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDestroyBP, this.wum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerAwakeBP, this.Lum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerStartBP, this.Pum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerOnNotifyTextChangeBP, this.Aum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTrigger, this.Dum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputNavigation, this.Uum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTriggerForNavigation, this.xum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputScroll, this.Bum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchTrigger, this.kum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchMove, this.qum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorSetClickThresholdWithInputKeyType, this.Oum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerAwakeBP, this.jum);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerOnDestroyBP, this.Hum);
    return true;
  }
  static y_m(e) {
    e?.OnCSharpReceiveSetupInputComponent();
  }
  static S_m(e) {
    e?.OnCSharpReceiveBeginPlay();
  }
  static M_m(e) {
    e?.ReceiveDestroyed();
  }
  static E_m(e, t) {
    e?.OnCSharpReceiveTick(t);
  }
  static I_m(e) {
    e?.OnCSharpReceivedPlayer();
  }
  static T_m(e) {
    e?.InitInputHandle();
  }
  static b_m(e) {
    e?.AddInputBinding();
  }
  static R_m(e) {
    e?.ClearInputBinding();
  }
  static w_m(e) {
    e?.OnCSharpOnSetupInputComponent();
  }
  static L_m(e) {
    e?.OnCSharpBindTouchHandle();
  }
  static D_m(e, t, n) {
    e?.OnCSharpTouchBegin(t, n);
  }
  static U_m(e, t, n) {
    e?.OnCSharpTouchEnd(t, n);
  }
  static x_m(e, t, n) {
    e?.OnCSharpTouchMove(t, n);
  }
  static B_m(e, t) {
    e?.OnCSharpPressAnyKey(t);
  }
  static k_m(e, t) {
    e?.OnCSharpReleaseAnyKey(t);
  }
  static q_m(e, t) {
    e?.OnCSharpRemoveActionHandle(t);
  }
  static O_m(e, t, n) {
    e = e?.OnCSharpGetActionHandle(n);
    if (UE.KuroVariableFunctionLibrary.HasObject(t)) {
      UE.KuroVariableFunctionLibrary.RemoveObject(t);
    }
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static G_m(e, t) {
    e?.OnCSharpRemoveAxisHandle(t);
  }
  static F_m(e, t, n) {
    e = e?.OnCSharpGetAxisHandle(n);
    if (UE.KuroVariableFunctionLibrary.HasObject(t)) {
      UE.KuroVariableFunctionLibrary.RemoveObject(t);
    }
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static N_m(e, t, n) {
    e = e?.IsInTouch(n) ?? false;
    if (UE.KuroVariableFunctionLibrary.HasBoolValue(t)) {
      UE.KuroVariableFunctionLibrary.RemoveBoolValue(t);
    }
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static V_m(e, t) {
    e?.SetIsPrintKeyName(t);
  }
  static P_m(e, t, n, i) {
    e?.OnCSharpInputAction(t, n, i);
  }
  static A_m(e, t, n, i = false) {
    e?.OnCSharpInputAxis(t, n, i);
  }
  static j_m(e, t, n) {
    e?.OnCSharpTouchBegin(t, n);
  }
  static H_m(e, t, n) {
    e?.OnCSharpTouchEnd(t, n);
  }
  static $_m(e, t, n) {
    e?.OnCSharpTouchMove(t, n);
  }
  static W_m(e, t) {
    e?.OnCSharpPressAnyKey(t);
  }
  static Q_m(e, t) {
    e?.OnCSharpReleaseAnyKey(t);
  }
  static K_m(e) {
    e?.OnCSharpReceiveBeginPlay();
  }
  static X_m(e) {
    e?.OnCSharpReceiveDestroyed();
  }
  static Y_m(e, t) {
    e?.OnCSharpReceivePossess(t);
  }
  static z_m(e, t) {
    e?.OnCSharpReceiveUnPossess(t);
  }
  static J_m(e) {
    e?.OnCSharpOnSetupInputComponent();
  }
  static Z_m(e, t, n) {
    e?.OnCSharpReceivePreProcessInput(t, n);
  }
  static eum(e, t, n) {
    e?.OnCSharpReceivePostProcessInput(t, n);
  }
  static tum(e) {
    e?.OnCSharpSetUiRootActive();
  }
  static ium(e) {
    e?.OnCSharpSetUiRootDeactivate();
  }
  static rum(e, t) {
    Info_1.Info.SwitchInputControllerType(e, t);
  }
  static oum(e) {
    e.AwakeBP();
  }
  static aum(e) {
    e.StartBP();
  }
  static hum(e, t) {
    if (t) {
      e.OnNotifyNavigationEnterBP(t);
    }
  }
  static lum(e, t) {
    if (t) {
      e.OnNotifyNavigationSelectBP(t);
    }
  }
  static _um(e) {
    e.OnEnableBP();
  }
  static uum(e) {
    e.OnDisableBP();
  }
  static cum(e) {
    e.OnNotifyInteractiveBP();
  }
  static dum(e) {
    e.OnNotifyNotInteractiveBP();
  }
  static mum(e) {
    e.OnDestroyBP();
  }
  static fum(e, t) {
    e = e.OnCheckCanSetNavigationBP();
    if (UE.KuroVariableFunctionLibrary.HasBoolValue(t)) {
      UE.KuroVariableFunctionLibrary.RemoveBoolValue(t);
    }
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static gum(e, t) {
    e = e.OnCheckLoopScrollChangeNavigationBP();
    if (UE.KuroVariableFunctionLibrary.HasBoolValue(t)) {
      UE.KuroVariableFunctionLibrary.RemoveBoolValue(t);
    }
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static Cum(e) {
    e.AwakeBP();
  }
  static pum(e) {
    e.StartBP();
  }
  static vum(e) {
    e.OnEnableBP();
  }
  static yum(e) {
    e.OnDisableBP();
  }
  static Mum(e) {
    e.OnDestroyBP();
  }
  static Eum(e, t) {
    e.SetEnableUiBlur(t);
  }
  static Ium(e) {
    e.AwakeBP();
  }
  static Tum(e) {
    e.StartBP();
  }
  static bum(e) {
    e.OnEnableBP();
  }
  static Rum(e) {
    e.OnDisableBP();
  }
  static wum(e) {
    e.OnDestroyBP();
  }
  static Lum(e) {
    e.AwakeBP();
  }
  static Pum(e) {
    e.StartBP();
  }
  static Aum(e, t) {
    e.OnNotifyTextChangeBP(t);
  }
  static Dum(e, t, n) {
    e.InputTrigger(t, n);
  }
  static Uum(e, t, n, i) {
    e.InputNavigation(t, n, i);
  }
  static xum(e, t) {
    e.InputTriggerForNavigation(t);
  }
  static Bum(e, t) {
    e.InputScroll(t);
  }
  static kum(e, t, n, i) {
    e.InputTouchTrigger(t, n, i);
  }
  static qum(e, t, n) {
    e.InputTouchMove(t, n);
  }
  static Oum(e, t) {
    e.SetClickThresholdWithInputKeyType(t);
  }
  static Gum(e, t) {
    e = e.GetNowHitComponent();
    if (UE.KuroVariableFunctionLibrary.HasObject(t)) {
      UE.KuroVariableFunctionLibrary.RemoveObject(t);
    }
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static Fum(e, t, n, i) {
    e = e.GetPointerEventData(n, i);
    if (UE.KuroVariableFunctionLibrary.HasObject(t)) {
      UE.KuroVariableFunctionLibrary.RemoveObject(t);
    }
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static Vum(e, t, n) {
    e = e.IsPointerEventDataLineTrace(n);
    if (UE.KuroVariableFunctionLibrary.HasBoolValue(t)) {
      UE.KuroVariableFunctionLibrary.RemoveBoolValue(t);
    }
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static jum(e) {
    e.AwakeBP();
  }
  static Hum(e) {
    e.OnDestroyBP();
  }
}
exports.InputCSharpProxyController = InputCSharpProxyController;
//# sourceMappingURL=InputCSharpProxyController.js.map