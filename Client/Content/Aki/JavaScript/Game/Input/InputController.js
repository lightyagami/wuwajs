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
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const AceAntiCheatInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/AceAntiCheatInputLayer");
const CharacterInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/CharacterInputLayer");
const FollowShooterInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/FollowShooterInputLayer");
const ManipulateInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/ManipulateInputLayer");
const VisionInputLayer_1 = require("../NewWorld/Character/Common/Component/Input/InputLayer/VisionInputLayer");
const InputManager_1 = require("../Ui/Input/InputManager");
const InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
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
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes([InputMappingsDefine_1.axisMappings.LookUp, InputMappingsDefine_1.axisMappings.Turn, InputMappingsDefine_1.axisMappings.Zoom], this.wMe);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxes([InputMappingsDefine_1.axisMappings.MoveForward, InputMappingsDefine_1.axisMappings.MoveRight], this.BMe);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.大招, InputMappingsDefine_1.actionMappings.幻象1, InputMappingsDefine_1.actionMappings.幻象2, InputMappingsDefine_1.actionMappings.技能1, InputMappingsDefine_1.actionMappings.攀爬, InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.瞄准, InputMappingsDefine_1.actionMappings.走跑切换, InputMappingsDefine_1.actionMappings.跳跃, InputMappingsDefine_1.actionMappings.通用交互, InputMappingsDefine_1.actionMappings.锁定目标, InputMappingsDefine_1.actionMappings.闪避], this.bMe);
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseLoadingView, this.jJa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputDistributeTagChanged, this.xMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ForceReleaseInput, this.PMe);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes([InputMappingsDefine_1.axisMappings.LookUp, InputMappingsDefine_1.axisMappings.Turn, InputMappingsDefine_1.axisMappings.Zoom], this.wMe);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxes([InputMappingsDefine_1.axisMappings.MoveForward, InputMappingsDefine_1.axisMappings.MoveRight], this.BMe);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.大招, InputMappingsDefine_1.actionMappings.幻象1, InputMappingsDefine_1.actionMappings.幻象2, InputMappingsDefine_1.actionMappings.技能1, InputMappingsDefine_1.actionMappings.攀爬, InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.瞄准, InputMappingsDefine_1.actionMappings.走跑切换, InputMappingsDefine_1.actionMappings.跳跃, InputMappingsDefine_1.actionMappings.通用交互, InputMappingsDefine_1.actionMappings.锁定目标, InputMappingsDefine_1.actionMappings.闪避], this.bMe);
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
          for (const p of this.Model.GetHandlers()) {
            var o = p.GetInputFilter();
            if (o.BlockAction(t)) {
              break;
            }
            if (o.ListenToAction(t)) {
              p.HandlePressEvent(t, r);
            }
          }
          break;
        case 2:
          if (n.get(t) === KEY_RELEASED_TIME) {
            return;
          }
          var i = this.EPu(t);
          this.Model.SetHoldTime(t, KEY_RELEASED_TIME);
          n.set(t, KEY_RELEASED_TIME);
          for (const s of this.Model.GetHandlers()) {
            var a = s.GetInputFilter();
            if (a.BlockAction(t)) {
              break;
            }
            if (a.ListenToAction(t)) {
              s.HandleReleaseEvent(t, i);
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
      var i = this.Model.GetHandlers();
      if (!t || !e) {
        o.set(InputEnums_1.EInputAxis.MoveForward, 0);
        for (const a of i) {
          a.ClearSingleAxisInput(InputEnums_1.EInputAxis.MoveForward, false);
        }
      }
      if (!r || !n) {
        o.set(InputEnums_1.EInputAxis.MoveRight, 0);
        for (const p of i) {
          p.ClearSingleAxisInput(InputEnums_1.EInputAxis.MoveRight, false);
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
      var i;
      var a = this.Model.GetHandlers();
      InputController.FMe.Start();
      for ([n, r] of this.Model.GetAxisValues()) {
        for (const _ of a) {
          var p = _.GetInputFilter();
          if (p.BlockAxis(n)) {
            _.ClearSingleAxisInput(n, false);
            break;
          }
          if (p.ListenToAxis(n)) {
            if (ModelManager_1.ModelManager.InputModel.IsOpenInputAxisLog && n === 3 && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Input", 10, "[InputLog][InputController]开始处理轴输入", ["axis", n], ["value", r]);
            }
            _.HandleInputAxis(n, r);
          }
        }
      }
      InputController.FMe.Stop();
      InputController.VMe.Start();
      for ([o, i] of this.Model.GetHoldTimes()) {
        if (i !== undefined && i !== KEY_RELEASED_TIME) {
          var s = this.IPu(t);
          var u = i + s;
          this.Model.SetHoldTime(o, u);
          for (const I of a) {
            var l = I.GetInputFilter();
            if (l.BlockAction(o)) {
              break;
            }
            if (l.ListenToAction(o)) {
              I.HandleHoldEvent(o, u);
            }
          }
        }
      }
      InputController.VMe.Stop();
      InputController.HMe.Start();
      try {
        for (const f of a) {
          f.PostProcessInput(t, e);
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
          for (const C of a) {
            C.ClearSingleAxisInput(E, true);
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
  static EPu(t) {
    t = this.Model.GetHoldTime(t);
    if (t === undefined || t === KEY_RELEASED_TIME) {
      return KEY_RELEASED_TIME;
    } else {
      return t;
    }
  }
  static IPu(t) {
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
  var n = n.GetInputAxis();
  InputController.InputAxis(n, e, false);
  var r = Global_1.Global.CharacterController;
  if (r && e > 0 && n !== InputEnums_1.EInputAxis.Zoom && Info_1.Info.IsInKeyBoard() && !r.bShowMouseCursor) {
    InputManager_1.InputManager.MoveCursorToCenter();
  }
};
InputController.BMe = (t, e, n) => {
  n = n.GetInputAxis();
  InputController.InputAxis(n, e, false);
};
InputController.bMe = (t, e, n) => {
  e = e === 0 ? 1 : 2;
  n = n.GetInputAction();
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