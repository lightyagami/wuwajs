"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsCharacterController = undefined;
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Vector2D_1 = require("../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../Ui/UiLayer");
const TsBasePlayerController_1 = require("./TsBasePlayerController");
const TsPureUiKeyHandle_1 = require("./TsPureUiKeyHandle");
const LEFT_BARACKET_NAME = new UE.FName("LeftBracket");
const RIGHT_BARACKET_NAME = new UE.FName("RightBracket");
class TsCharacterController extends TsBasePlayerController_1.TsBasePlayerController {
  constructor() {
    super(...arguments);
    this.CursorInputVector = undefined;
    this.MoveInputVector = undefined;
    this.TsUiKeyHandle = undefined;
  }
  Constructor() {
    super.Constructor();
    this.CursorInputVector = undefined;
    this.MoveInputVector = undefined;
    this.TsUiKeyHandle = undefined;
  }
  OnCSharpReceiveBeginPlay() {
    super.ReceiveBeginPlay();
    this.ChangeRotationOnPossess = false;
    this.bShowMouseCursor = Info_1.Info.IsInKeyBoard();
    UE.KuroInputFunctionLibrary.ApplyInputMode(this);
  }
  OnCSharpReceiveDestroyed() {
    super.ReceiveDestroyed();
    if (this.TsUiKeyHandle) {
      this.TsUiKeyHandle.Reset();
      this.TsUiKeyHandle = undefined;
    }
  }
  OnCSharpReceivePossess(e) {
    super.ReceivePossess(e);
    ControllerHolder_1.ControllerHolder.CameraController.OnPossess(e);
  }
  OnCSharpReceiveUnPossess(e) {
    super.ReceiveUnPossess(e);
    ControllerHolder_1.ControllerHolder.CameraController.OnPossess(undefined);
  }
  OnCSharpReceivePreProcessInput(e, r) {
    ControllerHolder_1.ControllerHolder.InputController.PreProcessInput(e, r);
  }
  OnCSharpReceivePostProcessInput(e, r) {
    ControllerHolder_1.ControllerHolder.InputController.PostProcessInput(e, r);
  }
  OnCSharpSetUiRootActive() {
    if (ModelManager_1.ModelManager.SundryModel.CanOpenGmView) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "按下 】 键显示所有界面");
      }
      UiLayer_1.UiLayer.ForceShowUi();
    }
  }
  OnCSharpSetUiRootDeactivate() {
    if (ModelManager_1.ModelManager.SundryModel.CanOpenGmView) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "按下 【 键隐藏所有界面");
      }
      UiLayer_1.UiLayer.ForceHideUi();
    }
  }
  OnCSharpOnSetupInputComponent() {
    this.OnSetupInputComponent();
  }
  ReceiveBeginPlay() {
    super.ReceiveBeginPlay();
    this.ChangeRotationOnPossess = false;
    this.bShowMouseCursor = Info_1.Info.IsInKeyBoard();
    UE.KuroInputFunctionLibrary.ApplyInputMode(this);
  }
  ReceiveDestroyed() {
    super.ReceiveDestroyed();
    if (this.TsUiKeyHandle) {
      this.TsUiKeyHandle.Reset();
      this.TsUiKeyHandle = undefined;
    }
  }
  ReceivePossess(e) {
    super.ReceivePossess(e);
    ControllerHolder_1.ControllerHolder.CameraController.OnPossess(e);
  }
  ReceiveUnPossess(e) {
    super.ReceiveUnPossess(e);
    ControllerHolder_1.ControllerHolder.CameraController.OnPossess(undefined);
  }
  OnSetupInputComponent() {
    super.OnSetupInputComponent();
    this.CursorInputVector = Vector2D_1.Vector2D.Create(0, 0);
    this.MoveInputVector = Vector2D_1.Vector2D.Create(0, 0);
  }
  BindActionHandle() {
    super.BindActionHandle();
    for (const e of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
      this.AddActionHandle(e.ActionName);
    }
  }
  BindAxisHandle() {
    super.BindAxisHandle();
    for (const e of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
      this.AddAxisHandle(e.AxisName);
    }
  }
  BindKeyHandle() {
    super.BindKeyHandle();
    if (Info_1.Info.UseFastInputCallback) {
      if (!this.TsUiKeyHandle) {
        this.TsUiKeyHandle = new TsPureUiKeyHandle_1.TsPureUiKeyHandle();
        this.TsUiKeyHandle.Initialize(this);
      }
      this.TsUiKeyHandle.BindKey();
    } else {
      this.AddKeyBinding(new UE.InputChord(new UE.Key(LEFT_BARACKET_NAME), false, false, false, false), 1, this, new UE.FName(this.OnSetUiRootDeactivate.name));
      this.AddKeyBinding(new UE.InputChord(new UE.Key(RIGHT_BARACKET_NAME), false, false, false, false), 1, this, new UE.FName(this.OnSetUiRootActive.name));
    }
  }
  OnInputAxis(e, r, t = false) {
    super.OnInputAxis(e, r, t);
    if (e === InputMappingsDefine_1.axisMappings.LookUp) {
      this.CursorInputVector.Y = r;
    }
    if (e === InputMappingsDefine_1.axisMappings.Turn) {
      this.CursorInputVector.X = r;
    }
    if (e === InputMappingsDefine_1.axisMappings.MoveForward) {
      this.MoveInputVector.Y = r;
    }
    if (e === InputMappingsDefine_1.axisMappings.MoveRight) {
      this.MoveInputVector.X = r;
    }
  }
  ReceivePreProcessInput(e, r) {
    ControllerHolder_1.ControllerHolder.InputController.PreProcessInput(e, r);
  }
  ReceivePostProcessInput(e, r) {
    ControllerHolder_1.ControllerHolder.InputController.PostProcessInput(e, r);
  }
  OnSetUiRootActive() {
    if (ModelManager_1.ModelManager.SundryModel.CanOpenGmView) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "按下 】 键显示所有界面");
      }
      UiLayer_1.UiLayer.ForceShowUi();
    }
  }
  OnSetUiRootDeactivate() {
    if (ModelManager_1.ModelManager.SundryModel.CanOpenGmView) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "按下 【 键隐藏所有界面");
      }
      UiLayer_1.UiLayer.ForceHideUi();
    }
  }
  GetCursorInputVector() {
    return this.CursorInputVector;
  }
  GetMoveInputVector() {
    return this.MoveInputVector;
  }
}
exports.TsCharacterController = TsCharacterController;
exports.default = TsCharacterController; //# sourceMappingURL=TsCharacterController.js.map