"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsBasePlayerController = undefined;
Error.stackTraceLimit = 500;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Vector2D_1 = require("../../Core/Utils/Math/Vector2D");
const ObjectUtils_1 = require("../../Core/Utils/ObjectUtils");
const ModelManager_1 = require("../Manager/ModelManager");
const LogReportModel_1 = require("../Module/LogReport/LogReportModel");
const HotKeyViewDefine_1 = require("../Module/UiNavigation/HotKeyViewDefine");
const PlayerInputHandle_1 = require("./PlayerInputHandle");
const TsPureActionHandle_1 = require("./TsPureActionHandle");
const TsPureAxisHandle_1 = require("./TsPureAxisHandle");
const TsPureKeyHandle_1 = require("./TsPureKeyHandle");
const TsPureTouchHandle_1 = require("./TsPureTouchHandle");
class TsBasePlayerController extends UE.BasePlayerController {
  constructor() {
    super(...arguments);
    this.ActionHandleClass = undefined;
    this.AxisHandleClass = undefined;
    this.ActionHandleMap = undefined;
    this.AxisHandleMap = undefined;
    this.TsActionHandleMap = undefined;
    this.TsAxisHandleMap = undefined;
    this.CurrentInputPosition = undefined;
    this.OnInputActionCallback = undefined;
    this.OnInputAxisCallback = undefined;
    this.OnInputAxisCallbackNew = undefined;
    this.PlayerInputHandle = undefined;
    this.TsKeyHandle = undefined;
    this.TsTouchHandle = undefined;
  }
  Constructor() {
    this.TsActionHandleMap = undefined;
    this.TsAxisHandleMap = undefined;
    this.CurrentInputPosition = undefined;
    this.OnInputActionCallback = undefined;
    this.OnInputAxisCallback = undefined;
    this.OnInputAxisCallbackNew = undefined;
    this.PlayerInputHandle = undefined;
    this.TsKeyHandle = undefined;
    this.TsTouchHandle = undefined;
  }
  OnCSharpReceiveSetupInputComponent() {
    this.InitInputHandle();
    this.AddInputBinding();
    this.OnSetupInputComponent();
  }
  OnCSharpReceiveBeginPlay() {
    super.ReceiveBeginPlay();
    this.InitInputHandle();
  }
  OnCSharpReceiveTick(t) {
    super.ReceiveTick(t);
    this.PlayerInputHandle?.Tick(t);
  }
  OnCSharpReceivedPlayer() {
    UE.KuroInputFunctionLibrary.ResetInputMode(this);
  }
  OnCSharpInputAction(t, i, e) {
    this.OnInputAction(t, i, e);
  }
  OnCSharpInputAxis(t, i, e = false) {
    this.OnInputAxis(t, i, e);
  }
  OnCSharpTouchBegin(t, i) {
    if (this.TsTouchHandle) {
      this.TsTouchHandle.OnTouchBegin(t, i);
    }
  }
  OnCSharpTouchEnd(t, i) {
    if (this.TsTouchHandle) {
      this.TsTouchHandle.OnTouchBegin(t, i);
    }
  }
  OnCSharpTouchMove(t, i) {
    if (this.TsTouchHandle) {
      this.TsTouchHandle.OnTouchBegin(t, i);
    }
  }
  OnCSharpPressAnyKey(t) {
    LogReportModel_1.LogReportModel.RecordOperateTime();
    this.PlayerInputHandle.PressAnyKey(t);
    ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(t);
  }
  OnCSharpReleaseAnyKey(t) {
    this.PlayerInputHandle.ReleaseAnyKey(t);
  }
  OnCSharpOnSetupInputComponent() {
    this.OnSetupInputComponent();
  }
  OnCSharpBindTouchHandle() {
    this.BindTouchHandle();
  }
  OnCSharpRemoveActionHandle(t) {
    this.RemoveActionHandle(t);
  }
  OnCSharpGetActionHandle(t) {
    return this.GetActionHandle(t);
  }
  OnCSharpRemoveAxisHandle(t) {
    this.RemoveAxisHandle(t);
  }
  OnCSharpGetAxisHandle(t) {
    return this.GetAxisHandle(t);
  }
  ReceiveSetupInputComponent() {
    this.InitInputHandle();
    this.AddInputBinding();
    this.OnSetupInputComponent();
  }
  ReceiveBeginPlay() {
    super.ReceiveBeginPlay();
    this.InitInputHandle();
  }
  ReceiveDestroyed() {
    if (ObjectUtils_1.ObjectUtils.IsValid(this)) {
      this.ClearInputBinding();
      if (this.PlayerInputHandle) {
        this.PlayerInputHandle.Clear();
        this.PlayerInputHandle = undefined;
      }
      if (this.TsKeyHandle) {
        this.TsKeyHandle.Reset();
        this.TsKeyHandle = undefined;
      }
      if (this.TsTouchHandle) {
        this.TsTouchHandle.Reset();
        this.TsTouchHandle = undefined;
      }
      super.ReceiveDestroyed();
    }
  }
  ReceiveTick(t) {
    super.ReceiveTick(t);
    this.PlayerInputHandle?.Tick(t);
  }
  OnReceivedPlayer() {
    UE.KuroInputFunctionLibrary.ResetInputMode(this);
  }
  InitInputHandle() {
    if (!this.PlayerInputHandle && !(this.PlayerInputHandle = new PlayerInputHandle_1.PlayerInputHandle(), this.PlayerInputHandle.Initialize(), this.TsKeyHandle || (this.TsKeyHandle = new TsPureKeyHandle_1.TsPureKeyHandle(), this.TsKeyHandle.Initialize(this, this.PlayerInputHandle)), this.TsTouchHandle)) {
      this.TsTouchHandle = new TsPureTouchHandle_1.TsPureTouchHandle();
      this.TsTouchHandle.Initialize(this, this.PlayerInputHandle);
    }
  }
  AddInputBinding() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "添加PlayerController绑定输入", ["PlayerController", this.GetName()]);
    }
    this.BindActionHandle();
    this.BindAxisHandle();
    this.BindKeyHandle();
    this.BindTouchHandle();
  }
  ClearInputBinding() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "清理PlayerController绑定输入", ["PlayerController", this.GetName()]);
    }
    if (Info_1.Info.UseFastInputCallback) {
      cpp_1.FKuroInputInterface.ClearInputBinding(this);
    } else {
      this.ClearActionBindings();
      this.ClearAxisBindings();
      this.ClearKeyBindings();
      this.ClearTouchBindings();
    }
    this.ClearActionHandle();
    this.ClearAxisHandle();
    this.OnInputActionCallback = undefined;
    this.OnInputAxisCallback = undefined;
  }
  OnSetupInputComponent() {
    this.CurrentInputPosition = Vector2D_1.Vector2D.Create(0, 0);
  }
  BindActionHandle() {}
  BindAxisHandle() {}
  BindKeyHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsKeyHandle) {
        this.TsKeyHandle.BindKey();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 36, "BindKeyHandle Failed, TsKeyHandle is undefined");
      }
    } else {
      this.AddKeyBinding(new UE.InputChord(new UE.Key(FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY)), false, false, false, false), 0, this, new UE.FName(this.OnPressAnyKey.name));
      this.AddKeyBinding(new UE.InputChord(new UE.Key(FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY)), false, false, false, false), 1, this, new UE.FName(this.OnReleaseAnyKey.name));
    }
  }
  BindTouchHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsTouchHandle) {
        this.TsTouchHandle.BindTouch();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 36, "BindKeyHandle Failed, TsTouchHandle is undefined");
      }
    } else {
      this.AddTouchBinding(0, this, new UE.FName(this.OnTouchBegin.name));
      this.AddTouchBinding(1, this, new UE.FName(this.OnTouchEnd.name));
      this.AddTouchBinding(2, this, new UE.FName(this.OnTouchMove.name));
    }
  }
  OnInputAction(t, i, e) {
    LogReportModel_1.LogReportModel.RecordOperateTime();
    this.PlayerInputHandle.InputAction(t, i, e);
  }
  OnInputAxis(t, i, e = false) {
    LogReportModel_1.LogReportModel.RecordOperateTime(true, t, i);
    this.PlayerInputHandle.InputAxis(t, i, e);
  }
  OnTouchBegin(t, i) {
    this.PlayerInputHandle.TouchBegin(t, i);
    LogReportModel_1.LogReportModel.RecordOperateTime();
  }
  OnTouchEnd(t, i) {
    this.PlayerInputHandle.TouchEnd(t, i);
  }
  OnTouchMove(t, i) {
    this.PlayerInputHandle.TouchMove(t, i);
  }
  OnPressAnyKey(t) {
    LogReportModel_1.LogReportModel.RecordOperateTime();
    this.PlayerInputHandle.PressAnyKey(t);
    ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(t);
  }
  OnReleaseAnyKey(t) {
    this.PlayerInputHandle.ReleaseAnyKey(t);
  }
  AddActionHandle(i) {
    if (Info_1.Info.UseFastInputCallback) {
      this.TsActionHandleMap ||= new Map();
      let t = this.TsActionHandleMap.get(i);
      if (!t) {
        (t = new TsPureActionHandle_1.TsPureActionHandle()).Initialize(this);
        this.TsActionHandleMap.set(i, t);
      }
      this.OnInputActionCallback = (t, i, e) => {
        this.OnInputAction(t, i, e);
      };
      t.AddActionBinding(i, this.OnInputActionCallback);
    } else {
      let t = this.GetActionHandle(i);
      t = t || this.NewActionHandle(i);
      this.OnInputActionCallback = (t, i, e) => {
        this.OnInputAction(t, i, e);
      };
      t.AddActionBinding(i, this.OnInputActionCallback);
    }
  }
  NewActionHandle(t) {
    var i;
    if (this.ActionHandleClass && this.ActionHandleClass.IsValid()) {
      (i = UE.NewObject(this.ActionHandleClass, this)).Initialize(this);
      this.ActionHandleMap.Add(t, i);
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 10, "当前Controller中的ActionHandleClass不存在", ["ControllerName", this.GetName()]);
    }
  }
  RemoveActionHandle(t) {
    var i = this.GetActionHandle(t);
    if (i) {
      i.Reset();
      this.ActionHandleMap.Remove(t);
    }
  }
  GetActionHandle(t) {
    return this.ActionHandleMap.Get(t);
  }
  ClearActionHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsActionHandleMap) {
        for (const e of this.TsActionHandleMap) {
          var t = e[1];
          if (!t) {
            return;
          }
          t.Reset();
        }
        this.TsActionHandleMap.clear();
      }
    } else {
      for (let t = 0; t < this.ActionHandleMap.Num(); t++) {
        var i = this.ActionHandleMap.GetKey(t);
        var i = this.ActionHandleMap.Get(i);
        if (!i) {
          return;
        }
        i.Reset();
      }
      this.ActionHandleMap.Empty();
    }
  }
  AddAxisHandle(i) {
    if (Info_1.Info.UseFastInputCallback) {
      this.TsAxisHandleMap ||= new Map();
      let t = this.TsAxisHandleMap.get(i);
      if (!t) {
        (t = new TsPureAxisHandle_1.TsPureAxisHandle()).Initialize(this);
        this.TsAxisHandleMap.set(i, t);
      }
      this.OnInputAxisCallbackNew = (t, i, e) => {
        this.OnInputAxis(t, i, e);
      };
      t.AddAxisBinding(i, this.OnInputAxisCallbackNew);
    } else {
      let t = this.GetAxisHandle(i);
      t = t || this.NewAxisHandle(i);
      this.OnInputAxisCallback = (t, i) => {
        this.OnInputAxis(t, i);
      };
      t.AddAxisBinding(i, this.OnInputAxisCallback);
    }
  }
  NewAxisHandle(t) {
    var i;
    if (this.AxisHandleClass && this.AxisHandleClass.IsValid()) {
      (i = UE.NewObject(this.AxisHandleClass, this)).Initialize(this);
      this.AxisHandleMap.Add(t, i);
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 10, "当前Controller中的AxisHandleClass不存在", ["ControllerName", this.GetName()]);
    }
  }
  RemoveAxisHandle(t) {
    var i = this.GetActionHandle(t);
    if (i) {
      i.Reset();
      this.ActionHandleMap.Remove(t);
    }
  }
  GetAxisHandle(t) {
    return this.AxisHandleMap.Get(t);
  }
  ClearAxisHandle() {
    if (Info_1.Info.UseFastInputCallback) {
      if (this.TsAxisHandleMap) {
        for (const e of this.TsAxisHandleMap) {
          var t = e[1];
          if (!t) {
            return;
          }
          t.Reset();
        }
        this.TsAxisHandleMap.clear();
      }
    } else {
      for (let t = 0; t < this.AxisHandleMap.Num(); t++) {
        var i = this.AxisHandleMap.GetKey(t);
        var i = this.AxisHandleMap.Get(i);
        if (!i) {
          return;
        }
        i.Reset();
      }
      this.AxisHandleMap.Empty();
    }
  }
  GetInputPosition(t = 0) {
    if (Info_1.Info.IsInKeyBoard()) {
      return this.GetCursorPosition();
    } else if (Info_1.Info.IsInTouch()) {
      return this.GetTouchPosition(t);
    } else {
      return undefined;
    }
  }
  GetCursorPosition() {
    var t = (0, puerts_1.$ref)(0);
    var i = (0, puerts_1.$ref)(0);
    if (this.GetMousePosition(t, i)) {
      this.CurrentInputPosition.X = (0, puerts_1.$unref)(t);
      this.CurrentInputPosition.Y = (0, puerts_1.$unref)(i);
      return this.CurrentInputPosition;
    }
  }
  GetTouchPosition(t) {
    var i = (0, puerts_1.$ref)(0);
    var e = (0, puerts_1.$ref)(0);
    this.GetInputTouchState(t, i, e, undefined);
    this.CurrentInputPosition.X = (0, puerts_1.$unref)(i);
    this.CurrentInputPosition.Y = (0, puerts_1.$unref)(e);
    return this.CurrentInputPosition;
  }
  IsInTouch(t) {
    var i = (0, puerts_1.$ref)(false);
    this.GetInputTouchState(t, undefined, undefined, i);
    return (0, puerts_1.$unref)(i);
  }
  SetIsPrintKeyName(t) {
    this.PlayerInputHandle.IsPrintKeyName = t;
  }
  SimulateTouch(t, i, e) {
    if (e) {
      this.PlayerInputHandle.TouchBegin(t, i);
    } else {
      this.PlayerInputHandle.TouchEnd(t, i);
    }
  }
  SetCustomAction(t, i) {
    this.PlayerInputHandle?.SetCustomAction(t, i);
  }
  ResetAllCustomAction(t) {
    this.PlayerInputHandle?.ResetAllCustomAction(t);
  }
  ResetCustomAction(t, i) {
    this.PlayerInputHandle?.ResetCustomAction(t, i);
  }
  SetActionEnable(t, i) {
    this.PlayerInputHandle?.SetActionEnable(t, i);
  }
  GetCurrentPlatformCustomActionKeyNameList(t) {
    return this.PlayerInputHandle?.GetCurrentPlatformCustomActionKeyNameList(t);
  }
}
exports.TsBasePlayerController = TsBasePlayerController;
exports.default = TsBasePlayerController; //# sourceMappingURL=TsBasePlayerController.js.map