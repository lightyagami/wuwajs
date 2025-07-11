"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rouletteInputManager = exports.RouletteInputGamepad = exports.RouletteInputTouch = exports.RouletteInputKeyboard = exports.RouletteInputBase = exports.AngleCalculator = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../Ui/UiLayer");
const KEYBOARD_DEAD_LIMIT = 100;
class AngleCalculator {
  static GetVectorAngle(t, i) {
    var s = Vector_1.Vector.Create();
    Vector_1.Vector.CrossProduct(t, i, s);
    var e = MathUtils_1.MathUtils.DotProduct(t, i);
    var e = UE.KismetMathLibrary.DegAcos(e / (t.Size() * i.Size()));
    if (s.Z > 0) {
      return e * -1;
    } else {
      return e;
    }
  }
  static AngleToAreaIndex(i) {
    var s;
    var e = this.AngleList.length - 2;
    for (let t = 0; t < this.AngleList.length - 1; t++) {
      if (this.AngleList[t] <= i && i < this.AngleList[t + 1]) {
        if ((s = e - t) == 0) {
          return e;
        } else {
          return s;
        }
      }
    }
    return e;
  }
  static ConvertLguiPosToScreenPos(t, i) {
    var s = UiLayer_1.UiLayer.UiRootItem;
    var t = Vector2D_1.Vector2D.Create(t, i);
    var i = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromLGUICanvasToViewport(t.ToUeVector2D());
    i.X = MathCommon_1.MathCommon.Clamp(i.X, 0, s.GetWidth());
    i.Y = MathCommon_1.MathCommon.Clamp(i.Y, 0, s.GetHeight());
    return new Vector2D_1.Vector2D(i.X, i.Y);
  }
}
(exports.AngleCalculator = AngleCalculator).AngleList = [-180, -157.5, -112.5, -67.5, -22.5, 22.5, 67.5, 112.5, 157.5, 180];
class RouletteInputBase {
  constructor(t, i, s, e) {
    this.ActivateOn = false;
    this.AreaIndex = 0;
    this.Angle = -1;
    this.NeedEmptyChoose = true;
    this.RouletteViewType = 1;
    this.BeginPos = undefined;
    this.ForwardVector = Vector_1.Vector.Create(0, -1, 0);
    this.B0o = () => {};
    this.BeginPos = t;
    this.RouletteViewType = i ?? 1;
  }
  ActivateInput(t) {
    this.ActivateOn = t;
  }
  Destroy() {
    this.ActivateInput(false);
    this.UnBindEvent();
    this.OnDestroy();
  }
  Reset() {
    this.AreaIndex = 0;
    this.Angle = -1;
  }
  EndInput() {
    this.ActivateOn = false;
    this.B0o();
  }
  SetEndInputEvent(t) {
    this.B0o = t;
  }
  SetIsNeedEmpty(t) {
    this.NeedEmptyChoose = t;
  }
  OnInit() {}
  OnDestroy() {}
  BindEvent() {}
  UnBindEvent() {}
  InputTick(t) {}
  Tick(t) {
    var i;
    var s;
    if (this.ActivateOn) {
      i = this.AreaIndex;
      s = this.Angle;
      this.InputTick(t);
      return [i !== this.AreaIndex ? this.AreaIndex : undefined, s !== this.Angle ? this.Angle : undefined];
    } else {
      return [undefined, undefined];
    }
  }
}
class RouletteInputKeyboard extends (exports.RouletteInputBase = RouletteInputBase) {
  constructor(t, i) {
    super(t, i);
    this.b0o = Vector_1.Vector.Create();
    this.q0o = Vector_1.Vector.Create();
    this.G0o = Vector_1.Vector.Create();
    this.N0o = Vector_1.Vector.Create();
  }
  OnInit() {
    if (!this.BeginPos) {
      var t = Global_1.Global.CharacterController;
      if (!t) {
        return;
      }
      this.BeginPos = t.GetCursorPosition() ?? Vector2D_1.Vector2D.Create();
    }
    this.q0o.Set(this.BeginPos.X, this.BeginPos.Y, 0);
    this.G0o.Set(this.BeginPos.X, this.BeginPos.Y, 0);
    this.b0o.Set(0, 0, 0);
  }
  InputTick(t) {
    var i = Global_1.Global.CharacterController;
    if (i &&= i.GetCursorPosition()) {
      this.N0o.Set(i.X, i.Y, 0);
      if (!this.N0o.Equals(this.G0o, 1)) {
        this.N0o.Subtraction(this.q0o, this.b0o);
        if (this.NeedEmptyChoose && this.b0o.Size() <= KEYBOARD_DEAD_LIMIT) {
          this.AreaIndex = 0;
        } else {
          this.G0o.Set(this.N0o.X, this.N0o.Y, 0);
          this.Angle = AngleCalculator.GetVectorAngle(this.ForwardVector, this.b0o);
          this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle);
        }
      }
    }
  }
}
exports.RouletteInputKeyboard = RouletteInputKeyboard;
class RouletteInputTouch extends RouletteInputBase {
  constructor(t, i, s) {
    super(t, i, s);
    this.b0o = Vector_1.Vector.Create();
    this.q0o = Vector_1.Vector.Create();
    this.G0o = Vector_1.Vector.Create();
    this.N0o = Vector_1.Vector.Create();
    this.O0o = -1;
    this.eut = false;
    this.O0o = s ?? -1;
  }
  OnInit() {
    if (!this.BeginPos) {
      var t = Global_1.Global.CharacterController;
      if (!t) {
        return;
      }
      if (this.O0o < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 37, "当前轮盘输入方式为触屏,未检测到对应触屏Id或初始位置");
        }
        return;
      }
      this.BeginPos = t.GetTouchPosition(this.O0o) ?? Vector2D_1.Vector2D.Create();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "[轮盘界面]触屏开启信息", ["TouchId", this.O0o], ["Pos", this.BeginPos]);
      }
    }
    this.q0o.Set(this.BeginPos.X, this.BeginPos.Y, 0);
    this.G0o.Set(this.BeginPos.X, this.BeginPos.Y, 0);
    this.b0o.Set(0, 0, 0);
  }
  OnDestroy() {
    this.eut = false;
  }
  InputTick(t) {
    var i;
    if (this.RouletteViewType !== 0 && (i = Global_1.Global.CharacterController)) {
      if (!(this.O0o < 0) && (this.eut = i.IsInTouch(this.O0o), this.eut)) {
        if (i = i.GetTouchPosition(this.O0o)) {
          this.N0o.Set(i.X, i.Y, 0);
          if (!this.N0o.Equals(this.G0o)) {
            this.G0o.Set(this.N0o.X, this.N0o.Y, 0);
            this.N0o.Subtraction(this.q0o, this.b0o);
            this.Angle = AngleCalculator.GetVectorAngle(this.ForwardVector, this.b0o);
            this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle);
          }
        }
      } else {
        this.EndInput();
      }
    }
  }
}
exports.RouletteInputTouch = RouletteInputTouch;
class RouletteInputGamepad extends RouletteInputBase {
  constructor(t, i, s, e) {
    super(t, i);
    this.k0o = Vector_1.Vector.Create();
    this.lIa = 0.4;
    this.F0o = undefined;
    this.V0o = (t, i) => {
      switch (t) {
        case InputMappingsDefine_1.axisMappings.UiMoveForward:
          this.k0o.Y = -i;
          break;
        case InputMappingsDefine_1.axisMappings.UiScroll1:
          this.k0o.Y = i;
          break;
        case InputMappingsDefine_1.axisMappings.UiMoveRight:
        case InputMappingsDefine_1.axisMappings.UiScroll2:
          this.k0o.X = i;
      }
    };
    this.lIa = e ?? this.lIa;
  }
  OnInit() {
    this.k0o.Set(0, 0, 0);
  }
  BindEvent() {
    if (this.RouletteViewType === 0) {
      this.F0o = [InputMappingsDefine_1.axisMappings.UiMoveForward, InputMappingsDefine_1.axisMappings.UiMoveRight];
    } else {
      this.F0o = [InputMappingsDefine_1.axisMappings.UiScroll1, InputMappingsDefine_1.axisMappings.UiScroll2];
    }
    InputDistributeController_1.InputDistributeController.BindAxes(this.F0o, this.V0o);
  }
  UnBindEvent() {
    InputDistributeController_1.InputDistributeController.UnBindAxes(this.F0o, this.V0o);
  }
  InputTick(t) {
    if (!!this.NeedEmptyChoose || this.k0o.X !== 0 || this.k0o.Y !== 0) {
      if (this.NeedEmptyChoose && Math.abs(this.k0o.X) <= this.lIa && Math.abs(this.k0o.Y) <= this.lIa) {
        this.AreaIndex = 0;
      } else {
        this.Angle = AngleCalculator.GetVectorAngle(this.ForwardVector, this.k0o);
        this.AreaIndex = AngleCalculator.AngleToAreaIndex(this.Angle);
      }
    }
  }
}
exports.RouletteInputGamepad = RouletteInputGamepad;
exports.rouletteInputManager = {
  [0]: RouletteInputKeyboard,
  1: RouletteInputKeyboard,
  2: RouletteInputGamepad,
  3: RouletteInputTouch
}; //# sourceMappingURL=RouletteInputManager.js.map