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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveSetupInputComponent, this.Hjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveBeginPlay, this.a5d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveDestroyed, this.h5d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveTick, this.$jd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReceivedPlayer, this.Wjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInitInputHandle, this.j$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerAddInputBinding, this.H$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerClearInputBinding, this.$$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnSetupInputComponent, this.W$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerBindTouchHandle, this.Q$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAction, this.Qjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAxis, this.Kjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchBegin, this.K$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchEnd, this.X$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchMove, this.Y$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnPressAnyKey, this.z$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerOnReleaseAnyKey, this.J$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveActionHandle, this.Z$d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerGetActionHandle, this.eWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveAxisHandle, this.tWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerGetAxisHandle, this.iWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerIsInTouch, this.rWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerSetIsPrintKeyName, this.oWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchBegin, this.Xjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchEnd, this.Yjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchMove, this.zjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerPressAnyKey, this.Jjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsBasePlayerControllerReleaseAnyKey, this.Zjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveBeginPlay, this.nWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveDestroyed, this.sWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePossess, this.eHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceiveUnPossess, this.tHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerOnSetupInputComponent, this.aWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePreProcessInput, this.iHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerReceivePostProcessInput, this.rHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootActive, this.oHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootDeactivate, this.nHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyInfoSwitchInputControllerType, this.sHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerAwakeBP, this.aHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerStartBP, this.hHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationEnterBP, this.lHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationSelectBP, this._Hd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnEnableBP, this.uHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDisableBP, this.cHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyInteractiveBP, this.dHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNotInteractiveBP, this.mHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDestroyBP, this.fHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckCanSetNavigationBP, this.hWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckLoopScrollChangeNavigationBP, this.lWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigAwakeBP, this.gHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigStartBP, this.CHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnEnableBP, this.pHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDisableBP, this.vHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDestroyBP, this.yHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiBlurSetEnableUiBlur, this.SHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentAwakeBP, this.MHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentStartBP, this.EHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnEnableBP, this.IHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDisableBP, this.THd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDestroyBP, this.bHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerAwakeBP, this.RHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerStartBP, this.wHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerOnNotifyTextChangeBP, this.LHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTrigger, this.PHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputNavigation, this.AHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTriggerForNavigation, this.DHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputScroll, this.UHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchTrigger, this.xHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchMove, this.BHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorSetClickThresholdWithInputKeyType, this.kHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorGetNowHitComponent, this._Wd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorGetPointerEventData, this.uWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorIsPointerEventDataLineTrace, this.cWd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerAwakeBP, this.OHd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerOnDestroyBP, this.qHd);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveSetupInputComponent, this.Hjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveBeginPlay, this.a5d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveDestroyed, this.h5d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceiveTick, this.$jd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReceivedPlayer, this.Wjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInitInputHandle, this.j$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerAddInputBinding, this.H$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerClearInputBinding, this.$$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnSetupInputComponent, this.W$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerBindTouchHandle, this.Q$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAction, this.Qjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerInputAxis, this.Kjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchBegin, this.K$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchEnd, this.X$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnTouchMove, this.Y$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnPressAnyKey, this.z$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerOnReleaseAnyKey, this.J$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveActionHandle, this.Z$d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerGetActionHandle, this.eWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerRemoveAxisHandle, this.tWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerGetAxisHandle, this.iWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerIsInTouch, this.rWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerSetIsPrintKeyName, this.oWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchBegin, this.Xjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchEnd, this.Yjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerTouchMove, this.zjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerPressAnyKey, this.Jjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsBasePlayerControllerReleaseAnyKey, this.Zjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveBeginPlay, this.nWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveDestroyed, this.sWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePossess, this.eHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceiveUnPossess, this.tHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerOnSetupInputComponent, this.aWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePreProcessInput, this.iHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerReceivePostProcessInput, this.rHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootActive, this.oHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTsCharacterControllerSetUiRootDeactivate, this.nHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyInfoSwitchInputControllerType, this.sHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerAwakeBP, this.aHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerStartBP, this.hHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationEnterBP, this.lHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNavigationSelectBP, this._Hd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnEnableBP, this.uHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDisableBP, this.cHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyInteractiveBP, this.dHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnNotifyNotInteractiveBP, this.mHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnDestroyBP, this.fHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckCanSetNavigationBP, this.hWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationBehaviorListenerOnCheckLoopScrollChangeNavigationBP, this.lWd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigAwakeBP, this.gHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigStartBP, this.CHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnEnableBP, this.pHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDisableBP, this.vHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPanelConfigOnDestroyBP, this.yHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiBlurSetEnableUiBlur, this.SHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentAwakeBP, this.MHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentStartBP, this.EHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnEnableBP, this.IHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDisableBP, this.THd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiHotKeyActorComponentOnDestroyBP, this.bHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerAwakeBP, this.RHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerStartBP, this.wHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationTextChangeListenerOnNotifyTextChangeBP, this.LHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTrigger, this.PHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputNavigation, this.AHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTriggerForNavigation, this.DHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputScroll, this.UHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchTrigger, this.xHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorInputTouchMove, this.BHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsLguiEventSystemActorSetClickThresholdWithInputKeyType, this.kHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerAwakeBP, this.OHd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsUiNavigationPlatformChangeListenerOnDestroyBP, this.qHd);
    return true;
  }
  static Hjd(e) {
    e.OnCSharpReceiveSetupInputComponent();
  }
  static a5d(e) {
    e.OnCSharpReceiveBeginPlay();
  }
  static h5d(e) {
    e.ReceiveDestroyed();
  }
  static $jd(e, t) {
    e.OnCSharpReceiveTick(t);
  }
  static Wjd(e) {
    e.OnCSharpReceivedPlayer();
  }
  static j$d(e) {
    e.InitInputHandle();
  }
  static H$d(e) {
    e.AddInputBinding();
  }
  static $$d(e) {
    e.ClearInputBinding();
  }
  static W$d(e) {
    e.OnCSharpOnSetupInputComponent();
  }
  static Q$d(e) {
    e.OnCSharpBindTouchHandle();
  }
  static K$d(e, t, n) {
    e.OnCSharpTouchBegin(t, n);
  }
  static X$d(e, t, n) {
    e.OnCSharpTouchEnd(t, n);
  }
  static Y$d(e, t, n) {
    e.OnCSharpTouchMove(t, n);
  }
  static z$d(e, t) {
    e.OnCSharpPressAnyKey(t);
  }
  static J$d(e, t) {
    e.OnCSharpReleaseAnyKey(t);
  }
  static Z$d(e, t) {
    e.OnCSharpRemoveActionHandle(t);
  }
  static eWd(e, t, n) {
    e = e.OnCSharpGetActionHandle(n);
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static tWd(e, t) {
    e.OnCSharpRemoveAxisHandle(t);
  }
  static iWd(e, t, n) {
    e = e.OnCSharpGetAxisHandle(n);
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static rWd(e, t, n) {
    e = e.IsInTouch(n);
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static oWd(e, t) {
    e.SetIsPrintKeyName(t);
  }
  static Qjd(e, t, n, i) {
    e.OnCSharpInputAction(t, n, i);
  }
  static Kjd(e, t, n, i = false) {
    e.OnCSharpInputAxis(t, n, i);
  }
  static Xjd(e, t, n) {
    e.OnCSharpTouchBegin(t, n);
  }
  static Yjd(e, t, n) {
    e.OnCSharpTouchEnd(t, n);
  }
  static zjd(e, t, n) {
    e.OnCSharpTouchMove(t, n);
  }
  static Jjd(e, t) {
    e.OnCSharpPressAnyKey(t);
  }
  static Zjd(e, t) {
    e.OnCSharpReleaseAnyKey(t);
  }
  static nWd(e) {
    e.OnCSharpReceiveBeginPlay();
  }
  static sWd(e) {
    e.OnCSharpReceiveDestroyed();
  }
  static eHd(e, t) {
    e.OnCSharpReceivePossess(t);
  }
  static tHd(e, t) {
    e.OnCSharpReceiveUnPossess(t);
  }
  static aWd(e) {
    e.OnCSharpOnSetupInputComponent();
  }
  static iHd(e, t, n) {
    e.OnCSharpReceivePreProcessInput(t, n);
  }
  static rHd(e, t, n) {
    e.OnCSharpReceivePostProcessInput(t, n);
  }
  static oHd(e) {
    e.OnCSharpSetUiRootActive();
  }
  static nHd(e) {
    e.OnCSharpSetUiRootDeactivate();
  }
  static sHd(e, t) {
    Info_1.Info.SwitchInputControllerType(e, t);
  }
  static aHd(e) {
    e.AwakeBP();
  }
  static hHd(e) {
    e.StartBP();
  }
  static lHd(e, t) {
    if (t) {
      e.OnNotifyNavigationEnterBP(t);
    }
  }
  static _Hd(e, t) {
    if (t) {
      e.OnNotifyNavigationSelectBP(t);
    }
  }
  static uHd(e) {
    e.OnEnableBP();
  }
  static cHd(e) {
    e.OnDisableBP();
  }
  static dHd(e) {
    e.OnNotifyInteractiveBP();
  }
  static mHd(e) {
    e.OnNotifyNotInteractiveBP();
  }
  static fHd(e) {
    e.OnDestroyBP();
  }
  static hWd(e, t) {
    e = e.OnCheckCanSetNavigationBP();
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static lWd(e, t) {
    e = e.OnCheckLoopScrollChangeNavigationBP();
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static gHd(e) {
    e.AwakeBP();
  }
  static CHd(e) {
    e.StartBP();
  }
  static pHd(e) {
    e.OnEnableBP();
  }
  static vHd(e) {
    e.OnDisableBP();
  }
  static yHd(e) {
    e.OnDestroyBP();
  }
  static SHd(e, t) {
    e.SetEnableUiBlur(t);
  }
  static MHd(e) {
    e.AwakeBP();
  }
  static EHd(e) {
    e.StartBP();
  }
  static IHd(e) {
    e.OnEnableBP();
  }
  static THd(e) {
    e.OnDisableBP();
  }
  static bHd(e) {
    e.OnDestroyBP();
  }
  static RHd(e) {
    e.AwakeBP();
  }
  static wHd(e) {
    e.StartBP();
  }
  static LHd(e, t) {
    e.OnNotifyTextChangeBP(t);
  }
  static PHd(e, t, n) {
    e.InputTrigger(t, n);
  }
  static AHd(e, t, n, i) {
    e.InputNavigation(t, n, i);
  }
  static DHd(e, t) {
    e.InputTriggerForNavigation(t);
  }
  static UHd(e, t) {
    e.InputScroll(t);
  }
  static xHd(e, t, n, i) {
    e.InputTouchTrigger(t, n, i);
  }
  static BHd(e, t, n) {
    e.InputTouchMove(t, n);
  }
  static kHd(e, t) {
    e.SetClickThresholdWithInputKeyType(t);
  }
  static _Wd(e, t) {
    e = e.GetNowHitComponent();
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static uWd(e, t, n, i) {
    e = e.GetPointerEventData(n, i);
    UE.KuroVariableFunctionLibrary.SetObject(t, e);
  }
  static cWd(e, t, n) {
    e = e.IsPointerEventDataLineTrace(n);
    UE.KuroVariableFunctionLibrary.SetBoolValue(t, e);
  }
  static OHd(e) {
    e.AwakeBP();
  }
  static qHd(e) {
    e.OnDestroyBP();
  }
}
exports.InputCSharpProxyController = InputCSharpProxyController;
//# sourceMappingURL=InputCSharpProxyController.js.map