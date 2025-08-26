"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const Time_1 = require("../../Core/Common/Time");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Platform_1 = require("../../Launcher/Platform/Platform");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const GlobalData_1 = require("../GlobalData");
const TDInputLayer_1 = require("../KuroSimpleCombat/TDInput/TDInputLayer");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const AceAntiCheatInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/AceAntiCheatInputLayer");
const CharacterInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/CharacterInputLayer");
const FollowShooterInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/FollowShooterInputLayer");
const HoldingHandsInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/HoldingHandsInputLayer");
const ManipulateInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/ManipulateInputLayer");
const VisionInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/VisionInputLayer");
const InputManager_1 = require("../Ui/Input/InputManager");
const InputEnums_1 = require("./InputEnums");
const KEY_RELEASED_TIME = -1;
class InputController extends ControllerBase_1.ControllerBase {
  static IsAllMoveEnable() {
    return this.GMe && this.NMe && this.OMe && this.kMe;
  }
  static InitializeEnvironment() {
    if (Info_1.Info.UseFastInputCallback) {
      cpp_1.FKuroInputInterface.InitializeEnvironment();
    }
    if (Info_1.Info.AxisInputOptimize) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Input.AxisOptimize 1");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Input.AxisOptimize 0");
    }
  }
  static get Model() {
    return ModelManager_1.ModelManager.InputModel;
  }
  static OnInit() {
    this.Ore();
    return true;
  }
  static OnClear() {
    this.kre();
    return true;
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseLoadingView, this.jJa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ForceReleaseInput, this.PMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.xMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseLoadingView, this.jJa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.xMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ForceReleaseInput, this.PMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
  }
  static BindInputActions(t) {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions(t, this.bMe);
  }
  static UnBindInputActions(t) {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions(t, this.bMe);
  }
  static BindInputMoveAxes(t) {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes(t, this.BMe);
  }
  static UnBindInputMoveAxes(t) {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes(t, this.BMe);
  }
  static AddInputHandler(t) {
    this.Model.AddInputHandler(t);
  }
  static RemoveInputHandler(t) {
    this.Model.RemoveInputHandler(t);
  }
  static InputAction(t, e) {
    if (InputEnums_1.EInputAction.锁定目标 !== t || ModelManager_1.ModelManager.FunctionModel.IsOpen(10031)) {
      var n = this.Model.GetPressTimes();
      switch (e) {
        case 1:
          this.Model.SetHoldTime(t);
          var r = Time_1.Time.WorldTimeSeconds;
          n.set(t, r);
          for (const l of this.Model.GetHandlers()) {
            var o = l.GetInputFilter();
            if (o.BlockAction(t)) {
              break;
            }
            if (o.ListenToAction(t)) {
              l.HandlePressEvent(t, r);
            }
          }
          break;
        case 2:
          if (n.get(t) === KEY_RELEASED_TIME) {
            return;
          }
          var a = this.zPu(t);
          this.Model.SetHoldTime(t, KEY_RELEASED_TIME);
          n.set(t, KEY_RELEASED_TIME);
          for (const u of this.Model.GetHandlers()) {
            var i = u.GetInputFilter();
            if (i.BlockAction(t)) {
              break;
            }
            if (i.ListenToAction(t)) {
              u.HandleReleaseEvent(t, a);
            }
          }
      }
    }
  }
  static SetMoveControlEnabled(t, e, n, r) {
    this.GMe = t;
    this.NMe = e;
    this.OMe = n;
    this.kMe = r;
    if (Info_1.Info.AxisInputOptimize && (this.Model.NextFrameRefreshAxisValues(), !t || !e || !n || !r)) {
      var o = this.Model.GetAxisValues();
      var a = this.Model.GetHandlers();
      if (!t || !e) {
        o.set(InputEnums_1.EInputAxis.MoveForward, 0);
        for (const i of a) {
          i.ClearSingleAxisInput(InputEnums_1.EInputAxis.MoveForward, false);
        }
      }
      if (!r || !n) {
        o.set(InputEnums_1.EInputAxis.MoveRight, 0);
        for (const l of a) {
          l.ClearSingleAxisInput(InputEnums_1.EInputAxis.MoveRight, false);
        }
      }
    }
  }
  static InputAxis(t, e, n = true) {
    var r = this.Model.GetAxisValues();
    if (Info_1.Info.AxisInputOptimize) {
      if (n) {
        this.j$a.add(t);
      }
      if (r.get(t) === e) {
        return;
      }
    } else if (e === 0 && r.has(t)) {
      return;
    }
    if (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog && t === 3 && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "[InputLog][InputController]开始接收输入", ["axis", t], ["value", e]);
    }
    if (t === InputEnums_1.EInputAxis.MoveForward) {
      if (!this.GMe && e > 0) {
        return;
      }
      if (!this.NMe && e < 0) {
        return;
      }
    }
    if (t === InputEnums_1.EInputAxis.MoveRight) {
      if (!this.kMe && e > 0) {
        return;
      }
      if (!this.OMe && e < 0) {
        return;
      }
    }
    r.set(t, e);
    if (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "[InputLog][InputController]完成接收输入", ["axisSet", r]);
    }
  }
  static PreProcessInput(t, e) {
    if (this.Model) {
      for (const n of this.Model.GetHandlers()) {
        n.PreProcessInput(t, e);
      }
    }
  }
  static PostProcessInput(t, e) {
    if (this.Model) {
      var n;
      var r;
      var o;
      var a;
      var i = this.Model.GetHandlers();
      InputController.FMe.Start();
      for ([n, r] of this.Model.GetAxisValues()) {
        for (const p of i) {
          var l = p.GetInputFilter();
          if (l.BlockAxis(n)) {
            p.ClearSingleAxisInput(n, false);
            break;
          }
          if (l.ListenToAxis(n)) {
            if (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog && n === 3 && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Input", 10, "[InputLog][InputController]开始处理轴输入", ["axis", n], ["value", r]);
            }
            p.HandleInputAxis(n, r);
          }
        }
      }
      InputController.FMe.Stop();
      InputController.VMe.Start();
      for ([o, a] of this.Model.GetHoldTimes()) {
        if (a !== undefined && a !== KEY_RELEASED_TIME) {
          var u = this.JPu(t);
          var s = a + u;
          this.Model.SetHoldTime(o, s);
          for (const I of i) {
            var _ = I.GetInputFilter();
            if (_.BlockAction(o)) {
              break;
            }
            if (_.ListenToAction(o)) {
              I.HandleHoldEvent(o, s);
            }
          }
        }
      }
      InputController.VMe.Stop();
      InputController.HMe.Start();
      try {
        for (const C of i) {
          C.PostProcessInput(t, e);
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Json", 10, "PostProcessInput", t, ["msg", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Json", 10, "PostProcessInput", ["error", t]);
        }
      } finally {
        InputController.HMe.Stop();
      }
      if (Info_1.Info.AxisInputOptimize) {
        for (const E of this.j$a) {
          if (this.Model.GetAxisValues().has(E)) {
            this.Model.GetAxisValues().delete(E);
          }
          for (const c of i) {
            c.ClearSingleAxisInput(E, true);
          }
        }
        this.j$a.clear();
      } else {
        this.Model.GetAxisValues().clear();
      }
      if (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "[InputLog][InputController]开始输入处理完成");
      }
    }
  }
  static QueryCommandPriority(t) {
    return this.Model.QueryCommandPriority(t);
  }
  static IsKeyDown(t) {
    t = this.Model.GetPressTimes().get(t);
    return t !== undefined && t !== KEY_RELEASED_TIME;
  }
  static GetKeyDownTime(t) {
    t = this.Model.GetPressTimes().get(t);
    if (t && t !== KEY_RELEASED_TIME) {
      return Math.max(0, Time_1.Time.WorldTimeSeconds - t);
    } else {
      return 0;
    }
  }
  static zPu(t) {
    t = this.Model.GetHoldTime(t);
    if (t === undefined || t === KEY_RELEASED_TIME) {
      return KEY_RELEASED_TIME;
    } else {
      return t;
    }
  }
  static JPu(t) {
    return t * (ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1);
  }
  static SetForceFeedbackConfig(t, e) {
    UE.BasePlayerController.SetKuroForceFeedbackConfig(t, e);
  }
  static AddInputLayer(t, e) {
    e.UnitId = t;
    this.Model.AddInputLayer(t, e);
  }
  static RemoveInputLayer(t) {
    this.Model.RemoveInputLayer(t);
  }
  static CreateInputLayer(t) {
    switch (t) {
      case 0:
        return;
      case 1:
        return new CharacterInputLayer_1.CharacterInputLayer();
      case 2:
        return new VisionInputLayer_1.VisionInputLayer();
      case 3:
        return new FollowShooterInputLayer_1.FollowShooterInputLayer();
      case 99:
        return new AceAntiCheatInputLayer_1.AceAntiCheatInputLayer();
      case 4:
        return new ManipulateInputLayer_1.ManipulateInputLayer();
      case 5:
        return new TDInputLayer_1.TowerDefenseInputLayer();
      case 6:
        return new HoldingHandsInputLayer_1.HoldingHandsInputLayer();
      default:
        return;
    }
  }
  static GetInputLayer(t, e) {
    return this.Model.GetInputLayer(t, e);
  }
  static GetInputLayers(t) {
    return this.Model.GetInputLayers(t);
  }
}
exports.InputController = InputController;
(_a = InputController).HMe = Stats_1.Stat.Create("InputController.PostProcessInput");
InputController.FMe = Stats_1.Stat.Create("InputController.HandleInputAxis");
InputController.VMe = Stats_1.Stat.Create("InputController.HandleHold");
InputController.GMe = true;
InputController.NMe = true;
InputController.OMe = true;
InputController.kMe = true;
InputController.wMe = (t, e, n) => {
  var r = InputController.Model.GetCurrentInputData();
  var n = n.GetInputAxis(r);
  InputController.InputAxis(n, e, false);
  var r = Global_1.Global.CharacterController;
  if (r && e > 0 && n !== InputEnums_1.EInputAxis.Zoom && Info_1.Info.IsInKeyBoard() && !r.bShowMouseCursor) {
    InputManager_1.InputManager.MoveCursorToCenter();
  }
};
InputController.BMe = (t, e, n) => {
  var r = InputController.Model.GetCurrentInputData();
  var n = n.GetInputAxis(r);
  InputController.InputAxis(n, e, false);
};
InputController.bMe = (t, e, n) => {
  var e = e === 0 ? 1 : 2;
  var r = InputController.Model.GetCurrentInputData();
  var n = n.GetInputAction(r);
  InputController.InputAction(n, e);
};
InputController.AMe = () => {
  for (var [t] of InputController.Model.GetPressTimes()) {
    InputController.InputAction(t, 2);
  }
};
InputController.jJa = () => {
  if (Info_1.Info.PlatformType === 1 || Platform_1.Platform.CloudGamePlatform === "IOS" || Platform_1.Platform.CloudGamePlatform === "Mac") {
    UE.KuroStaticLibrary.SetInputKeyDeadZone(Global_1.Global.CharacterController, 0, new UE.Key(new UE.FName("Gamepad_LeftY")), 0);
    UE.KuroStaticLibrary.SetInputKeyDeadZone(Global_1.Global.CharacterController, 0, new UE.Key(new UE.FName("Gamepad_RightX")), 0);
    UE.KuroStaticLibrary.SetInputKeyDeadZone(Global_1.Global.CharacterController, 0, new UE.Key(new UE.FName("Gamepad_RightY")), 0);
    UE.KuroStaticLibrary.SetInputKeyDeadZone(Global_1.Global.CharacterController, 0, new UE.Key(new UE.FName("Gamepad_LeftX")), 0);
  }
};
InputController.PMe = t => {
  if (t && Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Input", 7, "强制释放所有按键", ["Reason", t]);
  }
  for (var [e] of InputController.Model.GetPressTimes()) {
    InputController.InputAction(e, 2);
  }
};
InputController.jUc = (t, e) => {
  var n;
  var r = InputController.Model.GetCurrentInputData();
  if (r) {
    o = r.GetActionNameList();
    a = r.GetMoveAxisList();
    n = r.GetCameraAxisList();
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions(o, _a.bMe);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes(a, _a.BMe);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes(n, _a.wMe);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Input", 10, "InstanceChange解除绑定", ["actionNameList", o], ["moveAxisNameList", a], ["cameraAxisNameList", n]);
    }
    InputManager_1.InputManager.RemoveViewHotKeyActionByType(r.Type);
  }
  var o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  if (o && o.InstSubType === 37) {
    InputController.Model.SetCurrentInputDataType(1);
  } else {
    InputController.Model.SetCurrentInputDataType(0);
  }
  var a = InputController.Model.GetCurrentInputData();
  if (a && (n = a.GetActionNameList(), r = a.GetMoveAxisList(), e = a.GetCameraAxisList(), ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions(n, _a.bMe), ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes(r, _a.BMe), ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes(e, _a.wMe), InputManager_1.InputManager.AddViewHotKeyActionByType(a.Type), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("Input", 10, "InstanceChange绑定输入", ["actionNameList", n], ["moveAxisNameList", r], ["cameraAxisNameList", e]);
  }
};
InputController.xMe = t => {
  var e;
  var n = ModelManager_1.ModelManager.InputDistributeModel;
  for ([e] of InputController.Model.GetPressTimes()) {
    var r = n.GetActionInputDistributeTagName(InputEnums_1.EInputAction[e]);
    if (!!r && !n.IsTagMatchAnyCurrentInputTag(r)) {
      InputController.InputAction(e, 2);
    }
  }
  _a.Model.NextFrameRefreshAxisValues();
};
InputController.j$a = new Set(); //# sourceMappingURL=InputController.js.map