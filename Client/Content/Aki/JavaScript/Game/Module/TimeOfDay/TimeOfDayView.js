"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDayView = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const TimeOfDayController_1 = require("./TimeOfDayController");
const TimeOfDayDefine_1 = require("./TimeOfDayDefine");
const TimeOfDayModel_1 = require("./TimeOfDayModel");
const TodTimeAdjustingAnimation_1 = require("./TodTimeAdjustingAnimation");
class UiItemSwitcher {
  constructor(i, t) {
    this.bTo = t;
    this.qTo = i;
  }
  SwitchTo(i) {
    this.bTo.SetUIActive(i);
    this.qTo.SetUIActive(!i);
  }
}
class TodTimeAdjustingClock {
  constructor() {
    this.StartSecond = -1;
    this.ToSecond = -1;
  }
  get DeltaSecond() {
    return this.ToSecond - this.StartSecond;
  }
  get DeltaMinute() {
    return Math.floor(this.ToSecond / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR) - Math.floor(this.StartSecond / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
  }
  get DeltaSecondOneDay() {
    return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.DeltaSecond);
  }
  get DeltaDayOneDay() {
    return TimeOfDayModel_1.TodDayTime.ConvertToDay(this.DeltaSecondOneDay);
  }
  get ToSecondOneDay() {
    return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.ToSecond);
  }
  get StartSecondOneDay() {
    return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.StartSecond);
  }
  get IsAdjusting() {
    return this.StartSecond >= 0;
  }
  get IsTomorrow() {
    return this.ToSecond >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  get DayTextId() {
    switch (Math.floor(this.ToSecond / TimeOfDayDefine_1.TOD_SECOND_PER_DAY)) {
      case 2:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TimeOfDayPlusTwoDay");
      case 1:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TimeOfDayTomorrow");
      default:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TimeOfDayToday");
    }
  }
  get IsAdjustingMoreThanOneDay() {
    return this.DeltaSecond >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  get IsAdjustingMoreThanMinLimit() {
    return this.DeltaMinute >= TimeOfDayDefine_1.TOD_MIN_ADJUST_MINUTE;
  }
  get IsAdjustingToMaxLimit() {
    return this.DeltaSecond >= TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY * TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  Start() {
    this.StartSecond = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
    this.ToSecond = this.StartSecond;
  }
  Reset() {
    this.StartSecond = -1;
    this.ToSecond = -1;
  }
  AdjustToSecond(i, t) {
    if (!i || isNaN(i)) {
      return [false, 0];
    }
    if (!this.IsAdjusting) {
      return [false, 0];
    }
    let e = 0;
    if (t) {
      if ((e = this.ToSecond + i) > this.StartSecond + TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY * TimeOfDayDefine_1.TOD_SECOND_PER_DAY) {
        return [false, this.StartSecond + TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY * TimeOfDayDefine_1.TOD_SECOND_PER_DAY - this.ToSecond];
      }
    } else if ((e = this.ToSecond - i) < this.StartSecond) {
      return [false, this.ToSecond - this.StartSecond];
    }
    this.ToSecond = e;
    return [true, 0];
  }
  AdjustStartSecond(i) {
    if (i && !isNaN(i) && this.IsAdjusting && (this.StartSecond = i, this.StartSecond > this.ToSecond)) {
      this.StartSecond = this.ToSecond;
    }
  }
  DebugPrint() {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TimeOfDay", 16, "TodTimeAdjustingClock", ["this.StartSecond", this.StartSecond], ["this.ToSecond", this.ToSecond]);
    }
  }
}
class TimeOfDayView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.GTo = Vector_1.Vector.Create();
    this.NTo = Vector_1.Vector.Create();
    this.gme = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.OTo = Vector_1.Vector.Create();
    this.kTo = Rotator_1.Rotator.Create();
    this.FTo = Rotator_1.Rotator.Create(0, 0, 180);
    this.VTo = new Map();
    this.HTo = undefined;
    this.jTo = undefined;
    this.WTo = undefined;
    this.KTo = undefined;
    this.O3t = undefined;
    this.QTo = () => {
      if (!this.jTo.IsAdjusting) {
        var i = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString;
        this.GetText(0).SetText(i);
        this.GetText(4).SetText(i);
        const e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState;
        this.VTo.forEach((i, t) => {
          i.SwitchTo(t === e);
        });
        this.kTo.Yaw = this.XTo(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second);
        this.GetTexture(16).SetUIRelativeRotation(this.kTo.ToUeRotator());
        this.GetItem(17).SetUIRelativeRotation(this.kTo.ToUeRotator());
        this.GetItem(25).SetUIRelativeRotation(this.kTo.ToUeRotator());
        this.GetItem(18).SetUIRelativeRotation(this.FTo.ToUeRotator());
        this.GetItem(19).SetUIRelativeRotation(this.FTo.ToUeRotator());
      }
    };
    this.$To = i => {
      if (!this.jTo.IsAdjusting) {
        this.jTo.Start();
        this.GTo.DeepCopy(i.pointerPosition);
        this.NTo.DeepCopy(i.pointerPosition);
        this.FTo.Yaw = this.XTo(this.jTo.StartSecond);
        this.GetItem(19).SetUIRelativeRotation(this.FTo.ToUeRotator());
        this.GetItem(18).SetUIRelativeRotation(this.FTo.ToUeRotator());
        this.GetTexture(2).SetFillDirectionFlip(false);
        this.GetTexture(3).SetFillDirectionFlip(false);
      }
    };
    this.YTo = i => {
      var t;
      var e;
      if (this.NTo.IsZero() || this.GTo.IsZero()) {
        this.NTo.DeepCopy(i.pointerPosition);
        this.GTo.DeepCopy(i.pointerPosition);
      } else {
        i = Vector_1.Vector.Create(i.pointerPosition);
        t = this.JTo(this.NTo, i);
        e = this.zTo(this.NTo, i);
        e = this.ZTo(e);
        if ((e = this.jTo.AdjustToSecond(e, t))[0]) {
          this.NTo.DeepCopy(i);
        } else if (e[1]) {
          this.jTo.AdjustToSecond(e[1], t);
          this.NTo.DeepCopy(this.GTo);
        }
        this.eLo();
      }
    };
    this.tLo = i => {
      this.NTo.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
      this.GTo.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
    };
    this.iLo = (i, t) => {
      if (t) {
        this.GTo.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
        this.NTo.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
        t = ue_1.LGUIBPLibrary.GetUIItemPositionInViewPort(GlobalData_1.GlobalData.World, this.GetItem(17));
        this.HTo = Vector_1.Vector.Create(t.X, t.Y, 0);
      }
    };
    this.L1i = () => {
      TimeOfDayController_1.TimeOfDayController.AdjustTime(this.jTo.ToSecond, Protocol_1.Aki.Protocol.C4s.Proto_PlayerOperate);
      TimeOfDayController_1.TimeOfDayController.PauseTime();
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 27, "OnClickBtnConfirm:" + ModelManager_1.ModelManager.CameraModel.CurrentCameraActor.GetName());
      }
      var i = CommonParamById_1.configCommonParamById.GetIntConfig("TimeCameraSettingName");
      var t = CommonParamById_1.configCommonParamById.GetIntConfig("TimeCameraBlendDataName");
      this.O3t = UiCameraAnimationManager_1.UiCameraAnimationManager.PlayCameraAnimationFromCurrent(i.toString(), t.toString());
      var t = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationConfig(i.toString());
      this.oLo();
      this.KTo = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.rLo();
        this.WTo.Play(this.jTo.StartSecond, this.jTo.ToSecond);
      }, CommonDefine_1.MILLIONSECOND_PER_SECOND * t.BlendInTime);
    };
    this.xli = () => {
      this.CloseMe();
    };
    this.rLo = () => {
      this.FTo.Yaw = this.XTo(this.jTo.ToSecond);
      this.GetTexture(2).SetFillDirectionFlip(true);
      this.GetTexture(3).SetFillDirectionFlip(true);
      this.GetItem(18).SetUIRelativeRotation(this.FTo.ToUeRotator());
      this.GetItem(19).SetUIRelativeRotation(this.FTo.ToUeRotator());
      this.GetItem(23).SetUIActive(false);
      this.GetItem(24).SetUIActive(false);
    };
    this.nLo = i => {
      this.jTo.AdjustStartSecond(i);
      var t;
      var e = this.jTo.StartSecondOneDay;
      if (this.jTo.IsAdjustingMoreThanOneDay) {
        this.GetTexture(2).SetFillAmount(1);
        t = this.jTo.IsAdjustingToMaxLimit ? 1 : this.jTo.DeltaDayOneDay;
        this.GetTexture(3).SetFillAmount(t);
      } else {
        this.GetTexture(2).SetFillAmount(this.jTo.DeltaDayOneDay);
        this.GetTexture(3).SetFillAmount(0);
      }
      const s = TimeOfDayModel_1.TodDayTime.ConvertToDayState(e);
      this.VTo.forEach((i, t) => {
        i.SwitchTo(t === s);
      });
      this.kTo.Yaw = this.XTo(e);
      this.GetTexture(16).SetUIRelativeRotation(this.kTo.ToUeRotator());
      this.GetText(0).SetText(TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(e));
      TimeOfDayController_1.TimeOfDayController.SyncGlobalGameTime(TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(i));
    };
    this.sLo = () => {
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
      var i = CommonParamById_1.configCommonParamById.GetIntConfig("TimeCameraBlendDataName");
      UiCameraAnimationManager_1.UiCameraAnimationManager.PlayCameraAnimationFromCurrent(this.O3t.GetHandleName(), i.toString());
      TimeOfDayController_1.TimeOfDayController.ResumeTimeScale();
      this.jTo.Reset();
      this.Z9e();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIButtonComponent], [15, ue_1.UIButtonComponent], [2, ue_1.UITexture], [3, ue_1.UITexture], [4, ue_1.UIText], [5, ue_1.UIText], [6, ue_1.UIItem], [7, ue_1.UIItem], [8, ue_1.UIItem], [9, ue_1.UIItem], [10, ue_1.UIItem], [11, ue_1.UIItem], [12, ue_1.UIItem], [13, ue_1.UIItem], [14, ue_1.UIDraggableComponent], [16, ue_1.UITexture], [17, ue_1.UIItem], [18, ue_1.UIItem], [19, ue_1.UIItem], [20, ue_1.UIItem], [21, ue_1.UIText], [22, ue_1.UIInteractionGroup], [23, ue_1.UIItem], [24, ue_1.UIItem], [25, ue_1.UIItem]];
    this.BtnBindInfo = [[1, this.L1i], [15, this.xli]];
  }
  OnStart() {
    this.VTo.set(0, new UiItemSwitcher(this.GetItem(6), this.GetItem(7)));
    this.VTo.set(1, new UiItemSwitcher(this.GetItem(8), this.GetItem(9)));
    this.VTo.set(2, new UiItemSwitcher(this.GetItem(10), this.GetItem(11)));
    this.VTo.set(3, new UiItemSwitcher(this.GetItem(12), this.GetItem(13)));
    var i = ue_1.LGUIBPLibrary.GetUIItemPositionInViewPort(GlobalData_1.GlobalData.World, this.GetItem(17));
    this.HTo = Vector_1.Vector.Create(i.X, i.Y, 0);
    this.jTo = new TodTimeAdjustingClock();
    this.WTo = new TodTimeAdjustingAnimation_1.TodTimeAdjustingAnimation(ConfigManager_1.ConfigManager.TimeOfDayConfig.GetMaxV(), ConfigManager_1.ConfigManager.TimeOfDayConfig.GetA(), this.nLo, this.sLo);
    this.Z9e();
    this.QTo();
  }
  OnBeforeDestroy() {
    this.jTo.Reset();
    this.WTo.Stop();
    this.oLo();
  }
  OnTick(i) {
    this.WTo?.Tick(i);
  }
  OnAddEventListener() {
    var i = this.GetDraggable(14);
    i.OnPointerBeginDragCallBack.Bind(i => {
      this.$To(i);
    });
    i.OnPointerDragCallBack.Bind(i => {
      this.YTo(i);
    });
    i.OnPointerEndDragCallBack.Bind(i => {
      this.tLo(i);
    });
    i.OnUIDimensionsChangedCallBack.Bind((i, t) => {
      this.iLo(i, t);
    });
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TodTimeChange, this.QTo);
  }
  OnRemoveEventListener() {
    var i = this.GetDraggable(14);
    i.OnPointerBeginDragCallBack.Unbind();
    i.OnPointerDragCallBack.Unbind();
    i.OnPointerEndDragCallBack.Unbind();
    i.OnUIDimensionsChangedCallBack.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TodTimeChange, this.QTo);
  }
  oLo() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.KTo)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.KTo);
    }
    this.KTo = undefined;
  }
  Z9e() {
    this.GetTexture(2).SetFillAmount(0);
    this.GetTexture(3).SetFillAmount(0);
    this.GetItem(18).SetUIActive(true);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(23).SetUIActive(true);
    this.GetItem(24).SetUIActive(true);
    this.aLo(false);
    this.GetText(5).ShowTextNew(this.jTo.DayTextId);
  }
  eLo() {
    var i;
    if (this.jTo.IsAdjustingMoreThanOneDay) {
      this.GetTexture(2).SetFillAmount(1);
      i = this.jTo.IsAdjustingToMaxLimit ? 1 : this.jTo.DeltaDayOneDay;
      this.GetTexture(3).SetFillAmount(i);
    } else {
      this.GetTexture(2).SetFillAmount(this.jTo.DeltaDayOneDay);
      this.GetTexture(3).SetFillAmount(0);
    }
    this.GetText(5).ShowTextNew(this.jTo.DayTextId);
    this.aLo(this.jTo.IsAdjustingMoreThanMinLimit);
    this.kTo.Yaw = this.XTo(this.jTo.ToSecondOneDay);
    this.GetItem(17).SetUIRelativeRotation(this.kTo.ToUeRotator());
    this.GetItem(25).SetUIRelativeRotation(this.kTo.ToUeRotator());
    this.GetText(4).SetText(TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(this.jTo.ToSecondOneDay));
  }
  aLo(i) {
    this.GetInteractionGroup(22).SetInteractable(i);
    i = i ? "TimeOfDayConfirmTextOn" : "TimeOfDayConfirmTextOff";
    this.GetText(21).ShowTextNew(ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i));
  }
  XTo(i) {
    return -(TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(i) / TimeOfDayDefine_1.TOD_SECOND_PER_DAY) * TimeOfDayDefine_1.TOD_CIRCLE_ANGLE;
  }
  ZTo(i) {
    return i / TimeOfDayDefine_1.TOD_CIRCLE_ANGLE * TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  zTo(i, t) {
    i.Subtraction(this.HTo, this.gme);
    t.Subtraction(this.HTo, this.fz);
    t = this.gme.CosineAngle2D(this.fz);
    let e = Math.acos(t) * MathUtils_1.MathUtils.RadToDeg;
    return e = i.X < 0 ? TimeOfDayDefine_1.TOD_CIRCLE_ANGLE - e : e;
  }
  JTo(i, t) {
    i.Subtraction(this.HTo, this.gme);
    t.Subtraction(this.HTo, this.fz);
    Vector_1.Vector.CrossProduct(this.gme, this.fz, this.OTo);
    return this.OTo.Z > 0;
  }
}
exports.TimeOfDayView = TimeOfDayView;
//# sourceMappingURL=TimeOfDayView.js.map