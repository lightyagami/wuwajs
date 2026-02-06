"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleJoystick = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const InputController_1 = require("../../../../Input/InputController");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const CHECK_IN_TOUCH_INTERVAL = 500;
const MASK_AREA_MAX_X = 400;
const MASK_AREA_MAX_Y = 400;
const YAW_MAX = 30;
class MotorcycleJoystick extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Eah = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.H_t = undefined;
    this.ITa = undefined;
    this.TTa = undefined;
    this.Q_t = Vector2D_1.Vector2D.Create(0, 0);
    this.X_t = 0;
    this.Y_t = Vector_1.Vector.Create();
    this.J_t = Vector_1.Vector.Create(0, 0, 0);
    this.TargetVector = Vector_1.Vector.Create(0, 0, 0);
    this.Z_t = Rotator_1.Rotator.Create();
    this.IsDynamicJoystick = false;
    this.LTa = 0;
    this.Atf = 0.5;
    this.Dtf = 200;
    this.JoystickTouchId = -1;
    this.eut = false;
    this.R$e = undefined;
    this.tut = false;
    this.aut = 0;
    this.DTa = false;
    this.JoystickVisible = false;
    this.fSg = 0;
    this.hut = t => {
      if (this.lut(t) && this.IsDynamicJoystick && this.tut && InputDistributeController_1.InputDistributeController.IsAllowFightMoveInput()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "[摩托车]动态摇杆开始拖动立即响应输入", ["Position", this.Y_t]);
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
      this.Utf();
      ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsPressJoyStick = true;
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
        this.ITa.SetAnchorOffset(t);
      }
      this.Eah.PlayTweenAnim(9);
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 17, "JoystickPress", ["", this.JoystickTouchId], ["", this.Y_t]);
      }
      if (!this.Y_t.IsZero()) {
        this._ut(this.Y_t);
      }
    };
    this.mut = () => {
      this.dut();
      this.Eah.PlayTweenAnim(10);
    };
    this.OnDynamicChanged = t => {
      this.IsDynamicJoystick = t;
      if (!this.IsDynamicJoystick) {
        this.J_t.Set(0, 0, 0);
        this.Q_t.Set(this.J_t.X, this.J_t.Y);
      }
      this.Utf();
    };
    this.UTa = () => {
      this.UpdateJoystickVisible();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.ParentUiItem = this.OpenParam;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Eah.InitTweenAnim(5, this.GetItem(5));
    this.Eah.InitTweenAnim(7, this.GetItem(7));
    this.Eah.InitTweenAnim(6, this.GetItem(6));
    this.Eah.InitTweenAnim(8, this.GetItem(8));
    this.Eah.InitTweenAnim(9, this.GetItem(9));
    this.Eah.InitTweenAnim(10, this.GetItem(10));
    this.H_t = this.GetRootActor().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    this.Ore();
    this.ITa = this.GetItem(2);
    this.TTa = this.GetItem(4);
    this.R$e = Global_1.Global.CharacterController;
    this.IsDynamicJoystick = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.GetIsDynamicJoystick();
    this.LTa = CommonParamById_1.configCommonParamById.GetFloatConfig("MaskAreaEnableRootX");
    this.Atf = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorcycleJoystickMidRate");
    this.Dtf = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorcycleJoystickRadius");
    this.UpdateJoystickVisible();
    this.Utf();
  }
  OnAfterShow() {
    var t;
    var i;
    this.SPe?.PlayLevelSequenceByName("Start");
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
  }
  OnBeforeHide() {
    this.SPe?.PlayLevelSequenceByName("Close");
  }
  OnBeforeDestroy() {
    this.R$e = undefined;
    this.tut = false;
    ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsPressJoyStick = false;
    this.kre();
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetMotorcycleJoystickMode, this.OnDynamicChanged);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(39, this.UTa);
  }
  kre() {
    var t = this.H_t;
    t.OnPointerDownCallBack.Unbind();
    t.OnPointerBeginDragCallBack.Unbind();
    t.OnPointerDragCallBack.Unbind();
    t.OnPointerEndDragCallBack.Unbind();
    t.OnPointerUpCallBack.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetMotorcycleJoystickMode, this.OnDynamicChanged);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(39, this.UTa);
  }
  Tick(t) {
    if (!(this.JoystickTouchId < 0)) {
      this.gut();
      if (this.eut) {
        if (!ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "[摩托车]不在驾驶中，停止摇杆");
          }
          this.dut();
        }
        if (this.tut) {
          if (InputDistributeController_1.InputDistributeController.IsAllowFightMoveInput()) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "[摩托车]手指滑动摇杆", ["Position", this.Y_t]);
            }
            this._ut(this.Y_t);
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "[摩托车]手指滑动摇杆时不允许战斗输入,摇杆置回原点");
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
    return !!this.eut && (t.pointerID !== this.JoystickTouchId ? (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 17, "JoystickDrag No CurTouchId", ["", this.JoystickTouchId]), false) : (t = t.GetLocalPointInPlane(), this.Y_t.X = t.X, this.Y_t.Y = t.Y, this.RTa(), ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 17, "JoystickDrag", ["", this.JoystickTouchId], ["", this.Y_t]), true));
  }
  _ut(t, i = true) {
    t.Subtraction(this.J_t, this.TargetVector);
    if (this.TargetVector.IsNearlyZero(0.001)) {
      this.TargetVector.Reset();
    }
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
  dut() {
    this._ut(this.J_t, false);
    this.JoystickTouchId = -1;
    this.eut = false;
    this.tut = false;
    this.Utf();
    ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsPressJoyStick = false;
    this.TTa?.SetUIActive(false);
  }
  SetInputAxis(i, t) {
    if (this.JoystickVisible && t && !i.Equality(Vector_1.Vector.ZeroVectorProxy)) {
      let t = i.X / this.Dtf;
      if (t > 1) {
        t = 1;
      } else if (t < -1) {
        t = -1;
      }
      if (t >= this.Atf) {
        this.xtf(2);
        this.Z_t.Yaw = (t - this.Atf) * -YAW_MAX;
      } else if (t <= -this.Atf) {
        this.xtf(1);
        this.Z_t.Yaw = (-this.Atf - t) * YAW_MAX;
      } else {
        this.xtf(0);
        this.Z_t.Yaw = 0;
      }
      this.GetItem(0).SetUIRelativeRotation(this.Z_t.ToUeRotator());
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[摩托车]开始进行调用InputController输入逻辑", ["resultX", t]);
      }
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, t);
    } else {
      this.xtf(0);
      this.Z_t.Yaw = 0;
      this.GetItem(0).SetUIRelativeRotation(this.Z_t.ToUeRotator());
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[摩托车]摇杆移回原位，开始进行调用InputController输入逻辑");
      }
      InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 0);
    }
  }
  xtf(t) {
    var i;
    if (this.X_t !== t) {
      i = this.X_t;
      this.X_t = t;
      if (this.X_t === 1) {
        this.gSg(7);
      } else if (this.X_t === 2) {
        this.gSg(5);
      } else if (i === 1) {
        this.gSg(8);
      } else if (i === 2) {
        this.gSg(6);
      }
    }
  }
  gSg(t) {
    if (this.fSg > 0) {
      this.Eah.StopTweenAnim(this.fSg);
    }
    this.fSg = t;
    this.Eah.PlayTweenAnim(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[摩托车]摇杆播放Tween动画", ["", t]);
    }
  }
  Utf() {
    if (this.tut) {
      this.RootItem.SetAlpha(1);
    } else if (this.IsDynamicJoystick) {
      this.RootItem.SetAlpha(0);
    } else {
      this.RootItem.SetAlpha(0.5);
    }
  }
  UpdateJoystickVisible() {
    this.JoystickVisible = ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.GetChildVisible(39) ?? false;
    this.ITa?.SetUIActive(this.JoystickVisible);
  }
  SetEnable(t) {
    this.SetActive(t);
  }
}
exports.MotorcycleJoystick = MotorcycleJoystick;
//# sourceMappingURL=MotorcycleJoystick.js.map