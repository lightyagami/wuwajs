"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsDiceCommand = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Time_1 = require("../../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  RacingBetsDefine_1 = require("../RacingBetsDefine"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDiceCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), this.vv1 = 0, this.CommandType = 10, this.$Fc = void 0, this.WFc = void 0, this.yv1 = void 0, this.Sv1 = void 0, this.KFc = void 0, this.Location = Vector_1.Vector.Create(), this.Rotator = Rotator_1.Rotator.Create(), this.BR1 = /R=([\d.]+),G=([\d.]+),B=([\d.]+),A=([\d.]+)/
  }
  Init(e, i) {
    this.vv1 = e, this.$Fc = i, this.yv1 = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("DiceBp"), 1), this.Sv1 = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("DiceCamera"), 1)
  }
  async OnExecute() {
    this.WFc = await ModelManager_1.ModelManager.RacingBetsModel.LoadDiceMaterialParameterCollection(), this.YFc(this.$Fc), await this.sG1(), await this.aG1(), await this.wT1()
  }
  YFc(i) {
    this.KFc = FNameUtil_1.FNameUtil.GetDynamicFName("Ani_Process"), UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, this.KFc, 0), UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("DiceNub"), i.length);
    var e = Math.floor(Math.random() * RacingBetsDefine_1.racingBetsDiceIndexList.length);
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("Ani_Num"), RacingBetsDefine_1.racingBetsDiceIndexList[e]);
    for (let e = 0; e < i.length; e++) {
      UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("DicePoints_" + (e + 1)), i[e].D8n);
      var t = ConfigManager_1.ConfigManager.DangoConfig.GetDiceById(i[e].pJ_),
        a = this.kR1(t.DiceColor),
        a = (UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("DiceColor_" + (e + 1)), a), this.kR1(t.DiceNumColor)),
        a = (UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("NumColor_" + (e + 1)), a), this.kR1(t.DiceHighLightColor));
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("HeighLightColor_" + (e + 1)), a)
    }
  }
  async sG1() {
    var e;
    this.IsAborted || (e = new CustomPromise_1.CustomPromise, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh, this.vv1, this.$Fc, e), await e.Promise)
  }
  async aG1() {
    var e, i;
    this.IsAborted || (AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in"), e = 0 === Time_1.Time.TimeDilation ? 1 : Time_1.Time.TimeDilation, e = RacingBetsDefine_1.RACING_BETS_FREE_CAMERA_TO_DICE_CAMERA_TIME / e, this.Location.FromUeVector(this.Sv1.D_K2_GetActorLocation()), this.Rotator.FromUeRotator(this.Sv1.K2_GetActorRotation()), i = this.VD1(this.Sv1.GetCineCameraComponent()), ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.LogicComponent.ApplyCameraBlend(this.Location, this.Rotator, 0, e, ModelManager_1.ModelManager.DangoGlobalModel.Config.BeforeMoveCameraCurve, i, void 0), await TimerSystem_1.FlowTimeTimerSystem.Wait(e * TimeUtil_1.TimeUtil.InverseMillisecond))
  }
  async wT1() {
    var e;
    this.IsAborted || (e = new CustomPromise_1.CustomPromise, UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 0"), this.yv1?.SetActorHiddenInGame(!1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDiceAnim, this.$Fc.length, e), await e.Promise, this.yv1?.SetActorHiddenInGame(!0), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 1"))
  }
  LogInfo() {
    return "RacingBetsDiceCommand"
  }
  kR1(e) {
    var i, t, a, e = this.BR1.exec(e);
    if (e) return [, e, i, t, a] = e.map(Number), new UE.LinearColor(e, i, t, a)
  }
  VD1(e) {
    var i = e.Filmback.SensorAspectRatio,
      e = e.FieldOfView,
      t = UiLayer_1.UiLayer.GetViewportSize();
    return i < t.X / t.Y ? e : this.jD1(e, i)
  }
  jD1(e, i) {
    var t = UiLayer_1.UiLayer.GetViewportSize(),
      e = MathCommon_1.MathCommon.DegreeToRadian(e),
      t = t.X / t.Y,
      i = 2 * Math.atan(i / t * Math.tan(e / 2));
    return MathCommon_1.MathCommon.RadianToDegree(i)
  }
}
exports.RacingBetsDiceCommand = RacingBetsDiceCommand;
//# sourceMappingURL=RacingBetsDiceCommand.js.map