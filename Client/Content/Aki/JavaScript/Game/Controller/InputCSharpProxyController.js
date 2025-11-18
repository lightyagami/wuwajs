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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveSetupInputComponent, this.Asm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveBeginPlay, this.Dsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveDestroyed, this.Usm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveTick, this.xsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceivedPlayer, this.Bsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInitInputHandle, this.ksm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerAddInputBinding, this.qsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerClearInputBinding, this.Osm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnSetupInputComponent, this.Gsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerBindTouchHandle, this.Nsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAction, this.Vsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAxis, this.jsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchBegin, this.Hsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchEnd, this.$sm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchMove, this.Wsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnPressAnyKey, this.Qsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnReleaseAnyKey, this.Ksm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveActionHandle, this.Xsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerGetActionHandle, this.Ysm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveAxisHandle, this.zsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerGetAxisHandle, this.Jsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerIsInTouch, this.Zsm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerSetIsPrintKeyName, this.eam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchBegin, this.tam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchEnd, this.iam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchMove, this.ram);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerPressAnyKey, this.oam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReleaseAnyKey, this.nam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveBeginPlay, this.sam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveDestroyed, this.aam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePossess, this.ham);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveUnPossess, this.lam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerOnSetupInputComponent, this._am);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePreProcessInput, this.uam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePostProcessInput, this.cam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootActive, this.dam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootDeactivate, this.mam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyInfoSwitchInputControllerType, this.fam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerAwakeBP, this.gam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerStartBP, this.Cam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationEnterBP, this.pam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationSelectBP, this.vam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnEnableBP, this.yam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDisableBP, this.Sam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyInteractiveBP, this.Mam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNotInteractiveBP, this.Eam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDestroyBP, this.Iam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckCanSetNavigationBP, this.Tam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckLoopScrollChangeNavigationBP, this.bam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigAwakeBP, this.Ram);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigStartBP, this.wam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnEnableBP, this.Lam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDisableBP, this.Pam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDestroyBP, this.Aam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiBlurSetEnableUiBlur, this.Dam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentAwakeBP, this.Uam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentStartBP, this.xam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnEnableBP, this.Bam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDisableBP, this.kam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDestroyBP, this.qam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerAwakeBP, this.Oam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerStartBP, this.Gam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerOnNotifyTextChangeBP, this.Fam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTrigger, this.Nam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputNavigation, this.Vam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTriggerForNavigation, this.jam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputScroll, this.Ham);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchTrigger, this.$am);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchMove, this.Wam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorSetClickThresholdWithInputKeyType, this.Qam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorGetNowHitComponent, this.Kam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorGetPointerEventData, this.Xam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorIsPointerEventDataLineTrace, this.Yam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerAwakeBP, this.zam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerOnDestroyBP, this.Jam);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveSetupInputComponent, this.Asm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveBeginPlay, this.Dsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveDestroyed, this.Usm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveTick, this.xsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceivedPlayer, this.Bsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInitInputHandle, this.ksm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerAddInputBinding, this.qsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerClearInputBinding, this.Osm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnSetupInputComponent, this.Gsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerBindTouchHandle, this.Nsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAction, this.Vsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAxis, this.jsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchBegin, this.Hsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchEnd, this.$sm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchMove, this.Wsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnPressAnyKey, this.Qsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnReleaseAnyKey, this.Ksm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveActionHandle, this.Xsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerGetActionHandle, this.Ysm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveAxisHandle, this.zsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerGetAxisHandle, this.Jsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerIsInTouch, this.Zsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerSetIsPrintKeyName, this.eam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchBegin, this.tam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchEnd, this.iam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchMove, this.ram);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerPressAnyKey, this.oam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReleaseAnyKey, this.nam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveBeginPlay, this.sam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveDestroyed, this.aam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePossess, this.ham);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveUnPossess, this.lam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerOnSetupInputComponent, this._am);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePreProcessInput, this.uam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePostProcessInput, this.cam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootActive, this.dam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootDeactivate, this.mam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyInfoSwitchInputControllerType, this.fam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerAwakeBP, this.gam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerStartBP, this.Cam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationEnterBP, this.pam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationSelectBP, this.vam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnEnableBP, this.yam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDisableBP, this.Sam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyInteractiveBP, this.Mam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNotInteractiveBP, this.Eam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDestroyBP, this.Iam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckCanSetNavigationBP, this.Tam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckLoopScrollChangeNavigationBP, this.bam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigAwakeBP, this.Ram);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigStartBP, this.wam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnEnableBP, this.Lam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDisableBP, this.Pam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDestroyBP, this.Aam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiBlurSetEnableUiBlur, this.Dam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentAwakeBP, this.Uam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentStartBP, this.xam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnEnableBP, this.Bam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDisableBP, this.kam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDestroyBP, this.qam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerAwakeBP, this.Oam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerStartBP, this.Gam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerOnNotifyTextChangeBP, this.Fam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTrigger, this.Nam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputNavigation, this.Vam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTriggerForNavigation, this.jam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputScroll, this.Ham);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchTrigger, this.$am);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchMove, this.Wam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorSetClickThresholdWithInputKeyType, this.Qam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerAwakeBP, this.zam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerOnDestroyBP, this.Jam);
    return true;
  }
  static Asm(e) {
    e?.OnCSharpReceiveSetupInputComponent();
  }
  static Dsm(e) {
    e?.OnCSharpReceiveBeginPlay();
  }
  static Usm(e) {
    e?.ReceiveDestroyed();
  }
  static xsm(e, t) {
    e?.OnCSharpReceiveTick(t);
  }
  static Bsm(e) {
    e?.OnCSharpReceivedPlayer();
  }
  static ksm(e) {
    e?.InitInputHandle();
  }
  static qsm(e) {
    e?.AddInputBinding();
  }
  static Osm(e) {
    e?.ClearInputBinding();
  }
  static Gsm(e) {
    e?.OnCSharpOnSetupInputComponent();
  }
  static Nsm(e) {
    e?.OnCSharpBindTouchHandle();
  }
  static Hsm(e, t, n) {
    e?.OnCSharpTouchBegin(t, n);
  }
  static $sm(e, t, n) {
    e?.OnCSharpTouchEnd(t, n);
  }
  static Wsm(e, t, n) {
    e?.OnCSharpTouchMove(t, n);
  }
  static Qsm(e, t) {
    e?.OnCSharpPressAnyKey(t);
  }
  static Ksm(e, t) {
    e?.OnCSharpReleaseAnyKey(t);
  }
  static Xsm(e, t) {
    e?.OnCSharpRemoveActionHandle(t);
  }
  static Ysm(e, t, n) {
    e = e?.OnCSharpGetActionHandle(n);
    if (UE.KuroVariableFunctionLibrary.HasObject(t)) {
      UE.KuroVariableFunctionLibrary.RemoveObject(t);
    }
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static zsm(e, t) {
    e?.OnCSharpRemoveAxisHandle(t);
  }
  static Jsm(e, t, n) {
    e = e?.OnCSharpGetAxisHandle(n);
    if (UE.KuroVariableFunctionLibrary.HasObject(t)) {
      UE.KuroVariableFunctionLibrary.RemoveObject(t);
    }
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static Zsm(e, t, n) {
    e = e?.IsInTouch(n) ?? false;
    if (UE.KuroVariableFunctionLibrary.HasBoolValue(t)) {
      UE.KuroVariableFunctionLibrary.RemoveBoolValue(t);
    }
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static eam(e, t) {
    e?.SetIsPrintKeyName(t);
  }
  static Vsm(e, t, n, i) {
    e?.OnCSharpInputAction(t, n, i);
  }
  static jsm(e, t, n, i = false) {
    e?.OnCSharpInputAxis(t, n, i);
  }
  static tam(e, t, n) {
    e?.OnCSharpTouchBegin(t, n);
  }
  static iam(e, t, n) {
    e?.OnCSharpTouchEnd(t, n);
  }
  static ram(e, t, n) {
    e?.OnCSharpTouchMove(t, n);
  }
  static oam(e, t) {
    e?.OnCSharpPressAnyKey(t);
  }
  static nam(e, t) {
    e?.OnCSharpReleaseAnyKey(t);
  }
  static sam(e) {
    e?.OnCSharpReceiveBeginPlay();
  }
  static aam(e) {
    e?.OnCSharpReceiveDestroyed();
  }
  static ham(e, t) {
    e?.OnCSharpReceivePossess(t);
  }
  static lam(e, t) {
    e?.OnCSharpReceiveUnPossess(t);
  }
  static _am(e) {
    e?.OnCSharpOnSetupInputComponent();
  }
  static uam(e, t, n) {
    e?.OnCSharpReceivePreProcessInput(t, n);
  }
  static cam(e, t, n) {
    e?.OnCSharpReceivePostProcessInput(t, n);
  }
  static dam(e) {
    e?.OnCSharpSetUiRootActive();
  }
  static mam(e) {
    e?.OnCSharpSetUiRootDeactivate();
  }
  static fam(e, t) {
    Info_1.Info.SwitchInputControllerType(e, t);
  }
  static gam(e) {
    e.AwakeBP();
  }
  static Cam(e) {
    e.StartBP();
  }
  static pam(e, t) {
    if (t) {
      e.OnNotifyNavigationEnterBP(t);
    }
  }
  static vam(e, t) {
    if (t) {
      e.OnNotifyNavigationSelectBP(t);
    }
  }
  static yam(e) {
    e.OnEnableBP();
  }
  static Sam(e) {
    e.OnDisableBP();
  }
  static Mam(e) {
    e.OnNotifyInteractiveBP();
  }
  static Eam(e) {
    e.OnNotifyNotInteractiveBP();
  }
  static Iam(e) {
    e.OnDestroyBP();
  }
  static Tam(e, t) {
    e = e.OnCheckCanSetNavigationBP();
    if (UE.KuroVariableFunctionLibrary.HasBoolValue(t)) {
      UE.KuroVariableFunctionLibrary.RemoveBoolValue(t);
    }
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static bam(e, t) {
    e = e.OnCheckLoopScrollChangeNavigationBP();
    if (UE.KuroVariableFunctionLibrary.HasBoolValue(t)) {
      UE.KuroVariableFunctionLibrary.RemoveBoolValue(t);
    }
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static Ram(e) {
    e.AwakeBP();
  }
  static wam(e) {
    e.StartBP();
  }
  static Lam(e) {
    e.OnEnableBP();
  }
  static Pam(e) {
    e.OnDisableBP();
  }
  static Aam(e) {
    e.OnDestroyBP();
  }
  static Dam(e, t) {
    e.SetEnableUiBlur(t);
  }
  static Uam(e) {
    e.AwakeBP();
  }
  static xam(e) {
    e.StartBP();
  }
  static Bam(e) {
    e.OnEnableBP();
  }
  static kam(e) {
    e.OnDisableBP();
  }
  static qam(e) {
    e.OnDestroyBP();
  }
  static Oam(e) {
    e.AwakeBP();
  }
  static Gam(e) {
    e.StartBP();
  }
  static Fam(e, t) {
    e.OnNotifyTextChangeBP(t);
  }
  static Nam(e, t, n) {
    e.InputTrigger(t, n);
  }
  static Vam(e, t, n, i) {
    e.InputNavigation(t, n, i);
  }
  static jam(e, t) {
    e.InputTriggerForNavigation(t);
  }
  static Ham(e, t) {
    e.InputScroll(t);
  }
  static $am(e, t, n, i) {
    e.InputTouchTrigger(t, n, i);
  }
  static Wam(e, t, n) {
    e.InputTouchMove(t, n);
  }
  static Qam(e, t) {
    e.SetClickThresholdWithInputKeyType(t);
  }
  static Kam(e, t) {
    e = e.GetNowHitComponent();
    if (UE.KuroVariableFunctionLibrary.HasObject(t)) {
      UE.KuroVariableFunctionLibrary.RemoveObject(t);
    }
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static Xam(e, t, n, i) {
    e = e.GetPointerEventData(n, i);
    if (UE.KuroVariableFunctionLibrary.HasObject(t)) {
      UE.KuroVariableFunctionLibrary.RemoveObject(t);
    }
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static Yam(e, t, n) {
    e = e.IsPointerEventDataLineTrace(n);
    if (UE.KuroVariableFunctionLibrary.HasBoolValue(t)) {
      UE.KuroVariableFunctionLibrary.RemoveBoolValue(t);
    }
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static zam(e) {
    e.AwakeBP();
  }
  static Jam(e) {
    e.OnDestroyBP();
  }
}
exports.InputCSharpProxyController = InputCSharpProxyController;
//# sourceMappingURL=InputCSharpProxyController.js.map