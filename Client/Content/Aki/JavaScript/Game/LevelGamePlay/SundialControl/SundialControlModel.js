"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SundialControlModel = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const finalSocket = [5, 2];
const SUNDIAL_MODEL_CONFIG_ID = "518056";
const RING_ONE = "Ring_1";
const RING_TWO = "Ring_2";
const AK_ROTATING_1 = "play_amb_interact_sundial_outer_circle_loop";
const AK_STOP_ROTATING_1 = "play_amb_interact_sundial_outer_circle_stuck";
const AK_ROTATING_2 = "play_amb_interact_sundial_inner_circle_loop";
const AK_STOP_ROTATING_2 = "play_amb_interact_sundial_inner_circle_stuck";
const AK_SHOW_SHINE = "play_amb_interact_sundial_activate";
const AK_HIDE_SHINE = "play_amb_interact_sundial_deactivate";
const AK_FINISH = "play_amb_interact_sundial_finish";
class RotatingRing {
  constructor(t, e, i) {
    this.RingActor = t;
    this.SimpleRotateAngle = e;
    this.TotalSocket = 360 / e;
    this.CurSocket = 0;
    this.IsShine = false;
    this.RotateSpeed = i;
    t = this.RingActor.RootComponent.RelativeRotation;
    this.InitYaw = t.Yaw;
  }
}
class SundialControlModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Pxe = undefined;
    this.xxe = false;
    this.wxe = undefined;
    this.Bxe = undefined;
    this.bxe = [];
    this.qxe = 0;
    this.Gxe = 0;
  }
  get ModelConfig() {
    this.Pxe ||= DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, SUNDIAL_MODEL_CONFIG_ID);
    return this.Pxe;
  }
  get TargetLocation() {
    if (!this.xxe) {
      this.Nxe();
    }
    return this.wxe;
  }
  get TargetRotation() {
    if (!this.xxe) {
      this.Nxe();
    }
    return this.Bxe;
  }
  Nxe() {
    var t;
    if (!this.xxe) {
      this.xxe = true;
      t = ControllerHolder_1.ControllerHolder.CameraController.WidgetCamera.DisplayComponent.CineCamera;
      this.wxe = t.D_K2_GetActorLocation();
      this.Bxe = t.K2_GetActorRotation();
      (t = this.Bxe.VectorDouble()).Normalize(MathCommon_1.MathCommon.SmallNumber);
      this.wxe = this.wxe.op_Addition(t.op_Multiply(200));
    }
  }
  InitRingActors(t) {
    this.bxe = [];
    let e = 0;
    let i = 0;
    var r = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("SundialGamePlay.AngularSpeed1");
    if (r) {
      e = parseFloat(r.Value);
    }
    if (r = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("SundialGamePlay.AngularSpeed2")) {
      i = parseFloat(r.Value);
    }
    var r = new RotatingRing(t.GetActorByKey(RING_ONE), 30, e);
    if (r) {
      this.bxe.push(r);
    }
    var r = new RotatingRing(t.GetActorByKey(RING_TWO), 90, i);
    if (r) {
      this.bxe.push(r);
    }
    this.qxe = 0;
  }
  ChangeCurrentRingIndex(t = 1) {
    this.qxe = (this.qxe + t) % this.bxe.length;
    this.UpdateTips();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSundialRingSwitch, this.qxe);
  }
  SimpleAddCurRingSocket(t = 1) {
    var e = this.bxe[this.qxe];
    e.CurSocket = (e.CurSocket + t) % e.TotalSocket;
    var t = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(this.qxe === 0 ? AK_ROTATING_1 : AK_ROTATING_2)?.Path;
    if (t) {
      AudioController_1.AudioController.PostEvent(t, ControllerHolder_1.ControllerHolder.SundialControlController.GetMainActor());
    }
  }
  RotateCurrentRing(i) {
    var r = this.bxe[this.qxe];
    var o = r.RingActor.RootComponent;
    if (o) {
      var n = r.RotateSpeed;
      let t = i * TimeUtil_1.TimeUtil.Millisecond * n;
      this.Gxe += t;
      let e = false;
      if (this.Gxe > r.SimpleRotateAngle) {
        t -= this.Gxe - r.SimpleRotateAngle;
        e = true;
      }
      o.K2_AddRelativeRotation(new UE.Rotator(0, t, 0), false, undefined, false);
      if (e) {
        if (i = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(this.qxe === 0 ? AK_STOP_ROTATING_1 : AK_STOP_ROTATING_2)?.Path) {
          AudioController_1.AudioController.PostEvent(i, ControllerHolder_1.ControllerHolder.SundialControlController.GetMainActor());
        }
        this.Gxe = 0;
        this.Oxe();
        this.kxe();
        return true;
      }
    }
    return false;
  }
  ClearCacheActor() {
    if (this.xxe) {
      this.xxe = false;
      this.wxe = undefined;
      this.Bxe = undefined;
    }
    if (this.bxe && this.bxe.length > 0) {
      this.bxe = [];
    }
  }
  ResetAll() {
    for (let t = this.qxe = 0; t < this.bxe.length; t++) {
      var e = this.bxe[t];
      var i = e.RingActor.RootComponent;
      var r = i.RelativeRotation;
      r.Yaw = e.InitYaw;
      i.K2_SetRelativeRotation(r, false, undefined, false);
      e.IsShine = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSundialRingChangeShine, t, false);
      e.CurSocket = 0;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSundialRingSwitch, 0);
  }
  Oxe() {
    for (let t = 0; t < this.bxe.length; t++) {
      var e;
      if (this.bxe[t].IsShine) {
        if (this.bxe[t].CurSocket !== finalSocket[t] && (this.bxe[t].IsShine = false, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSundialRingChangeShine, t, false), e = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(AK_HIDE_SHINE)?.Path)) {
          AudioController_1.AudioController.PostEvent(e, ControllerHolder_1.ControllerHolder.SundialControlController.GetMainActor());
        }
      } else if (this.bxe[t].CurSocket === finalSocket[t] && (this.bxe[t].IsShine = true, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSundialRingChangeShine, t, true), e = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(AK_SHOW_SHINE)?.Path)) {
        AudioController_1.AudioController.PostEvent(e, ControllerHolder_1.ControllerHolder.SundialControlController.GetMainActor());
      }
    }
  }
  kxe() {
    for (let t = 0; t < this.bxe.length; t++) {
      if (this.bxe[t].CurSocket !== finalSocket[t]) {
        return;
      }
    }
    var t = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(AK_FINISH)?.Path;
    if (t) {
      AudioController_1.AudioController.PostEvent(t, ControllerHolder_1.ControllerHolder.SundialControlController.GetMainActor());
    }
    ControllerHolder_1.ControllerHolder.SundialControlController.PlayFinishAnimation();
  }
  UpdateTips() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNeedUpdateSundialTips, this.qxe, this.bxe[this.qxe].CurSocket);
  }
}
exports.SundialControlModel = SundialControlModel;
//# sourceMappingURL=SundialControlModel.js.map