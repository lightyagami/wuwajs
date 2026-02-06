"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Joystick = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const Global_1 = require("../../../Global");
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const WALK_TO_RUN_RATE = 0.3;
const JOYSTICK_RADIU = 200;
const JOYSTICK_RADIU_SQUARED = 40000;
const CHECK_IN_TOUCH_INTERVAL = 500;
const MASK_AREA_MAX_X = 400;
const MASK_AREA_MAX_Y = 400;
class Joystick extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.H_t = undefined;
    this.WalkBgItem = undefined;
    this.RunBgItem = undefined;
    this.K_t = undefined;
    this.ITa = undefined;
    this.TTa = undefined;
    this.Q_t = Vector2D_1.Vector2D.Create(0, 0);
    this.CurrentJoystickType = 0;
    this.$_t = Vector_1.Vector.Create();
    this.Y_t = Vector_1.Vector.Create();
    this.J_t = Vector_1.Vector.Create(0, 0, 0);
    this.TargetVector = Vector_1.Vector.Create(0, 0, 0);
    this.Z_t = Rotator_1.Rotator.Create();
    this.IsDynamicJoystick = false;
    this.LTa = 0;
    this.JoystickTouchId = -1;
    this.eut = false;
    this.R$e = undefined;
    this.tut = false;
    this.iut = 500;
    this.out = 1000;
    this.rut = 0;
    this.nut = Vector_1.Vector.Create();
    this.sut = undefined;
    this.aut = 0;
    this.DTa = false;
    this.JoystickVisible = false;
    this.Luc = WALK_TO_RUN_RATE;
    this.p8g = 90;
    this.v8g = 145;
    this.hut = t => {
      if (this.lut(t) && this.IsDynamicJoystick && this.tut && InputDistributeController_1.InputDistributeController.IsAllowFightMoveInput()) {
        if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 10, "动态摇杆开始拖动立即响应输入", ["Position", this.Y_t]);
        }
        this._ut(this.Y_t);
      }
    };
    this.uut = t => {
      this.lut(t);
    };
    this.cut = t => {
      this.JoystickTouchId = t.pointerID;
      var t = t.GetLocalPointInPlane();
      this.Y_t.X = t.X;
      this.Y_t.Y = t.Y;
      this.tut = true;
      ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = true;
      this.eut = true;
      if (this.DTa) {
        this.RTa();
        this.TTa?.SetUIActive(true);
      }
      if (this.IsDynamicJoystick) {
        this.J_t.X = this.Y_t.X;
        this.J_t.Y = this.Y_t.Y;
        this.Q_t.Set(this.J_t.X, this.J_t.Y);
        t = this.Q_t.ToUeVector2D();
        this.WalkBgItem.SetAnchorOffset(t);
        this.RunBgItem.SetAnchorOffset(t);
        this.K_t.SetAnchorOffset(t);
      }
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "JoystickPress", ["", this.JoystickTouchId], ["", this.Y_t]);
      }
      if (!this.Y_t.IsZero()) {
        this._ut(this.Y_t);
        this.SaveDodgeStartInfo(this.Y_t);
      }
    };
    this.mut = () => {
      this.dut();
    };
    this.OnDynamicChanged = t => {
      this.y8g(true);
    };
    this.UTa = () => {
      this.UpdateJoystickVisible();
    };
  }
  Initialize(t) {
    super.Initialize(t);
    this.ParentUiItem = t;
    this.H_t = this.GetRootActor().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    this.Ore();
    this.WalkBgItem = this.GetSprite(0);
    this.RunBgItem = this.GetSprite(1);
    this.K_t = this.GetSprite(2);
    this.ITa = this.GetItem(3);
    this.TTa = this.GetItem(5);
    this.R$e = Global_1.Global.CharacterController;
    this.iut = CommonParamById_1.configCommonParamById.GetIntConfig("DodgeMinLength");
    this.out = CommonParamById_1.configCommonParamById.GetIntConfig("DodgeJoystickSlideMinTime");
    this.y8g();
    this.LTa = CommonParamById_1.configCommonParamById.GetFloatConfig("MaskAreaEnableRootX");
    this.p8g = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorJoyStickAngle1");
    this.v8g = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorJoyStickAngle2");
  }
  ShowBattleVisibleChildView() {
    var t;
    var i;
    this.SetVisible(0, true);
    this.SetActive(true);
    if (this.RootItem && this.ParentUiItem && this.LTa > 0) {
      t = this.ParentUiItem.GetWidth();
      i = this.RootItem.GetAnchorOffsetX();
      this.DTa = t > 0 && i / t < this.LTa;
    } else {
      this.DTa = false;
    }
    if (!this.DTa) {
      this.TTa?.SetUIActive(false);
    }
    this.Luc = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.WalkOrRunRate) ?? WALK_TO_RUN_RATE;
  }
  HideBattleVisibleChildView() {
    this.SetVisible(0, false);
    this.SetActive(false);
  }
  Reset() {
    this.R$e = undefined;
    this.K_t = undefined;
    this.tut = false;
    ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = false;
    if (this.sut && TimerSystem_1.TimerSystem.Has(this.sut)) {
      TimerSystem_1.TimerSystem.Remove(this.sut);
      this.sut = undefined;
    }
    this.kre();
    super.Reset();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  Ore() {
    var t = this.H_t;
    t.OnPointerDownCallBack.Bind(t => {
      this.cut(t);
    });
    t.OnPointerBeginDragCallBack.Bind(t => {
      this.hut(t);
    });
    t.OnPointerDragCallBack.Bind(t => {
      this.uut(t);
    });
    t.OnPointerEndDragCallBack.Bind(t => {
      this.mut();
    });
    t.OnPointerUpCallBack.Bind(t => {
      this.mut();
    });
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetJoystickMode, this.OnDynamicChanged);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetMotorcycleJoystickMode, this.OnDynamicChanged);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(12, this.UTa);
  }
  kre() {
    var t = this.H_t;
    t.OnPointerDownCallBack.Unbind();
    t.OnPointerBeginDragCallBack.Unbind();
    t.OnPointerDragCallBack.Unbind();
    t.OnPointerEndDragCallBack.Unbind();
    t.OnPointerUpCallBack.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetJoystickMode, this.OnDynamicChanged);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetMotorcycleJoystickMode, this.OnDynamicChanged);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(12, this.UTa);
  }
  Tick(t) {
    if (!(this.JoystickTouchId < 0)) {
      this.gut();
      if (this.eut) {
        if (this.tut) {
          if (InputDistributeController_1.InputDistributeController.IsAllowFightMoveInput()) {
            if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Battle", 10, "手指滑动摇杆", ["Position", this.Y_t]);
            }
            this._ut(this.Y_t);
          } else {
            if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Battle", 10, "手指滑动摇杆时不允许战斗输入,摇杆置回原点");
            }
            this._ut(this.J_t);
          }
        }
      } else {
        this.dut();
      }
    }
  }
  gut() {
    if (!(Time_1.Time.Now < this.aut)) {
      this.aut = Time_1.Time.Now + CHECK_IN_TOUCH_INTERVAL;
      this.eut = this.R$e.IsInTouch(this.JoystickTouchId);
    }
  }
  lut(t) {
    return !!this.eut && (t.pointerID !== this.JoystickTouchId ? (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 10, "JoystickDrag No CurTouchId", ["", this.JoystickTouchId]), false) : (t = t.GetLocalPointInPlane(), this.Y_t.X = t.X, this.Y_t.Y = t.Y, this.RTa(), ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 10, "JoystickDrag", ["", this.JoystickTouchId], ["", this.Y_t]), true));
  }
  _ut(t, i = true) {
    t.Subtraction(this.J_t, this.TargetVector);
    if (this.TargetVector.IsNearlyZero(0.001)) {
      this.TargetVector.Reset();
    }
    this.SetHandleOffset(this.TargetVector);
    this.SetInputAxis(this.TargetVector, i);
  }
  RTa() {
    var t;
    if (this.DTa) {
      this.Q_t.Set(Math.min(this.Y_t.X, MASK_AREA_MAX_X), Math.min(this.Y_t.Y, MASK_AREA_MAX_Y));
      t = this.Q_t.ToUeVector2D();
      this.TTa.SetAnchorOffset(t);
    }
  }
  SaveDodgeStartInfo(t) {
    this.rut = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.nut = t;
  }
  TryDodge(t) {
    var i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if (i - this.rut > this.out) {
      this.rut = i;
    } else {
      this.rut = i;
      this.nut.Subtraction(t, this.TargetVector);
      this.nut = t;
      if (!(this.TargetVector.Size() < this.iut)) {
        this.SetInputAxis(this.TargetVector, true);
        InputController_1.InputController.InputAction(InputEnums_1.EInputAction.闪避, 1);
        InputController_1.InputController.InputAction(InputEnums_1.EInputAction.闪避, 2);
      }
    }
  }
  dut() {
    this._ut(this.J_t, false);
    this.JoystickTouchId = -1;
    this.eut = false;
    this.tut = false;
    ModelManager_1.ModelManager.BattleUiModel.IsPressJoyStick = false;
    this.TTa?.SetUIActive(false);
  }
  GetRotatorMoveArrow(s) {
    var e = s.SizeSquared();
    if (!(e <= 0)) {
      this.$_t.DeepCopy(s);
      this.$_t.Normalize();
      let t = this.$_t.X * JOYSTICK_RADIU;
      let i = this.$_t.Y * JOYSTICK_RADIU;
      if (e < JOYSTICK_RADIU_SQUARED) {
        t = s.X;
        i = s.Y;
      }
      t += this.J_t.X;
      i += this.J_t.Y;
      this.Q_t.Set(t, i);
      if (this.IsDynamicJoystick) {
        this.K_t.SetAnchorOffset(this.Q_t.ToUeVector2D());
      }
      if (this.$_t.Y > 0) {
        this.Z_t.Yaw = Math.atan(-this.$_t.X / this.$_t.Y) * MathCommon_1.MathCommon.RadToDeg;
      } else if (this.$_t.Y < 0) {
        this.Z_t.Yaw = Math.atan(-this.$_t.X / this.$_t.Y) * MathCommon_1.MathCommon.RadToDeg + 180;
      } else if (this.$_t.X > 0) {
        this.Z_t.Yaw = -90;
      } else {
        this.Z_t.Yaw = 90;
      }
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "设置摇杆偏移", ["targetVector", s], ["normalTargetVector", this.$_t], ["resultOffsetX", t], ["resultOffsetY", i]);
      }
      return this.Z_t.ToUeRotator();
    }
    if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 10, "设置摇杆偏移时，方向向量为0，不会设置角色移动", ["targetVector", s], ["distanceSquared2D", e]);
    }
  }
  SetHandleOffset(t) {
    t = this.GetRotatorMoveArrow(t);
    if (t) {
      this.WalkBgItem.SetUIRelativeRotation(t);
      this.RunBgItem.SetUIRelativeRotation(t);
    }
  }
  SetInputAxis(t, i) {
    if (this.JoystickVisible && i && !t.Equality(Vector_1.Vector.ZeroVectorProxy)) {
      if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
        this.SetMotorcycleInputAxis(t);
      } else {
        this.SetNormalInputAxis(t);
      }
    } else {
      if (i) {
        this.OnStandInTouch();
      } else {
        this.OnStand();
      }
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "[CharacterInput]摇杆移回原位，开始进行调用InputController输入逻辑");
      }
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 0);
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 0);
    }
  }
  SetNormalInputAxis(t) {
    this.Q_t.X = t.X / JOYSTICK_RADIU;
    this.Q_t.Y = t.Y / JOYSTICK_RADIU;
    if (this.Q_t.SizeSquared() > 1) {
      this.Q_t.Normalize();
    }
    var t = this.Q_t.X;
    var i = this.Q_t.Y;
    if (Math.max(Math.abs(t), Math.abs(i)) > this.Luc) {
      this.OnRun();
    } else {
      this.OnWalk();
    }
    if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 10, "[CharacterInput]开始进行调用InputController输入逻辑", ["resultX", t], ["resultY", i]);
    }
    InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, t);
    InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, i);
  }
  SetMotorcycleInputAxis(t) {
    this.Q_t.X = t.X / JOYSTICK_RADIU;
    this.Q_t.Y = t.Y / JOYSTICK_RADIU;
    let i = 0;
    let s = 0;
    var t = this.Q_t.Size();
    var e = Math.acos(MathCommon_1.MathCommon.Clamp(this.Q_t.Y / t, -1, 1)) * MathUtils_1.MathUtils.RadToDeg;
    s = t > 1 ? 1 : t;
    if (e < this.v8g) {
      i = e < this.p8g ? e / this.p8g : 1;
    } else {
      i = (180 - e) / (180 - this.v8g);
      s = -t;
    }
    if (this.Q_t.X < 0) {
      i = -i;
    }
    if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 17, "[摩托车]Joystick输入", ["resultX", i.toFixed(2)], ["resultY", s.toFixed(2)]);
    }
    this.OnRun();
    InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, i);
    InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, s);
  }
  OnWalk() {
    if (this.CurrentJoystickType !== 2) {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "控制角色行走");
      }
      this.WalkBgItem.SetUIActive(true);
      this.RunBgItem.SetUIActive(false);
      this.CurrentJoystickType = 2;
    }
  }
  OnRun() {
    if (this.CurrentJoystickType !== 3) {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "控制角色奔跑");
      }
      this.WalkBgItem.SetUIActive(false);
      this.RunBgItem.SetUIActive(true);
      this.CurrentJoystickType = 3;
    }
  }
  OnStand() {
    if (this.CurrentJoystickType !== 0) {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "松开摇杆时控制角色站立");
      }
      this.K_t.SetUIActive(!this.IsDynamicJoystick);
      if (this.CurrentJoystickType !== 1) {
        this.WalkBgItem.SetUIActive(false);
        this.RunBgItem.SetUIActive(false);
      }
      this.CurrentJoystickType = 0;
    }
  }
  OnStandInTouch() {
    if (this.CurrentJoystickType !== 1) {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "按下摇杆时控制角色站立");
      }
      this.K_t.SetUIActive(true);
      if (this.CurrentJoystickType !== 0) {
        this.WalkBgItem.SetUIActive(false);
        this.RunBgItem.SetUIActive(false);
      }
      this.CurrentJoystickType = 1;
    }
  }
  y8g(t = false) {
    var i = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData;
    let s = false;
    s = (i.IsDriving && i.GetIsRoundJoystick() ? i : ModelManager_1.ModelManager.BattleUiModel).GetIsDynamicJoystick();
    if (this.IsDynamicJoystick !== s && (this.IsDynamicJoystick = s, this.JoystickTouchId >= 0 && this.dut(), t) && !this.IsDynamicJoystick) {
      this.J_t.Set(0, 0, 0);
      this.Q_t.Set(this.J_t.X, this.J_t.Y);
      i = this.Q_t.ToUeVector2D();
      this.WalkBgItem.SetAnchorOffset(i);
      this.RunBgItem.SetAnchorOffset(i);
      this.K_t.SetAnchorOffset(i);
    }
  }
  UpdateJoystickVisible() {
    this.JoystickVisible = ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.GetChildVisible(12) ?? false;
    this.ITa?.SetUIActive(this.JoystickVisible);
  }
  SetVisible(t, i) {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(t, 12, i);
  }
  SetEnable(t) {
    this.SetActive(t);
    if (t) {
      this.y8g(true);
    }
  }
  SetForbidMove(t) {}
}
exports.Joystick = Joystick;
//# sourceMappingURL=Joystick.js.map