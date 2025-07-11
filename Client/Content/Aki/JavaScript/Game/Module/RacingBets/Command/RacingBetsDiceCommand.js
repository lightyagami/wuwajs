"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDiceCommand = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Time_1 = require("../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const RacingBetsDefine_1 = require("../RacingBetsDefine");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDiceCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.jv1 = 0;
    this.CommandType = 10;
    this.$Fc = undefined;
    this.WFc = undefined;
    this.Hv1 = undefined;
    this.$v1 = undefined;
    this.KFc = undefined;
    this.Location = Vector_1.Vector.Create();
    this.Rotator = Rotator_1.Rotator.Create();
    this.aL1 = /R=([\d.]+),G=([\d.]+),B=([\d.]+),A=([\d.]+)/;
  }
  Init(e, i) {
    this.jv1 = e;
    this.$Fc = i;
    this.Hv1 = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("DiceBp"), 1);
    this.$v1 = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("DiceCamera"), 1);
  }
  async OnExecute() {
    this.WFc = await ModelManager_1.ModelManager.RacingBetsModel.LoadDiceMaterialParameterCollection();
    this.YFc(this.$Fc);
    await this.OG1();
    await this.qG1();
    await this.eb1();
  }
  YFc(i) {
    this.KFc = FNameUtil_1.FNameUtil.GetDynamicFName("Ani_Process");
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, this.KFc, 0);
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("DiceNub"), i.length);
    var e = Math.floor(Math.random() * RacingBetsDefine_1.racingBetsDiceIndexList.length);
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("Ani_Num"), RacingBetsDefine_1.racingBetsDiceIndexList[e]);
    for (let e = 0; e < i.length; e++) {
      UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("DicePoints_" + (e + 1)), i[e].D8n);
      var t = ConfigManager_1.ConfigManager.DangoConfig.GetDiceById(i[e].pJ_);
      var a = this.hL1(t.DiceColor);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("DiceColor_" + (e + 1)), a);
      var a = this.hL1(t.DiceNumColor);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("NumColor_" + (e + 1)), a);
      var a = this.hL1(t.DiceHighLightColor);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("HeighLightColor_" + (e + 1)), a);
    }
  }
  async OG1() {
    var e;
    if (!this.IsAborted) {
      e = new CustomPromise_1.CustomPromise();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh, this.jv1, this.$Fc, e);
      await e.Promise;
    }
  }
  async qG1() {
    var e;
    var i;
    if (!this.IsAborted) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rsnt_weapon_cam_in");
      e = Time_1.Time.TimeDilation === 0 ? 1 : Time_1.Time.TimeDilation;
      e = RacingBetsDefine_1.RACING_BETS_FREE_CAMERA_TO_DICE_CAMERA_TIME / e;
      this.Location.FromUeVector(this.$v1.D_K2_GetActorLocation());
      this.Rotator.FromUeRotator(this.$v1.K2_GetActorRotation());
      i = this.CU1(this.$v1.GetCineCameraComponent());
      ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.LogicComponent.ApplyCameraBlend(this.Location, this.Rotator, 0, e, ModelManager_1.ModelManager.DangoGlobalModel.Config.BeforeMoveCameraCurve, i, undefined);
      await TimerSystem_1.FlowTimeTimerSystem.Wait(e * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  async eb1() {
    var e;
    if (!this.IsAborted) {
      e = new CustomPromise_1.CustomPromise();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 0");
      this.Hv1?.SetActorHiddenInGame(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDiceAnim, this.$Fc.length, e);
      await e.Promise;
      this.Hv1?.SetActorHiddenInGame(true);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 1");
    }
  }
  LogInfo() {
    return "RacingBetsDiceCommand";
  }
  hL1(e) {
    var i;
    var t;
    var a;
    var e = this.aL1.exec(e);
    if (e) {
      [, e, i, t, a] = e.map(Number);
      return new UE.LinearColor(e, i, t, a);
    }
  }
  CU1(e) {
    var i = e.Filmback.SensorAspectRatio;
    var e = e.FieldOfView;
    var t = UiLayer_1.UiLayer.GetViewportSize();
    if (i < t.X / t.Y) {
      return e;
    } else {
      return this.pU1(e, i);
    }
  }
  pU1(e, i) {
    var t = UiLayer_1.UiLayer.GetViewportSize();
    var e = MathCommon_1.MathCommon.DegreeToRadian(e);
    var t = t.X / t.Y;
    var i = Math.atan(i / t * Math.tan(e / 2)) * 2;
    return MathCommon_1.MathCommon.RadianToDegree(i);
  }
}
exports.RacingBetsDiceCommand = RacingBetsDiceCommand;
//# sourceMappingURL=RacingBetsDiceCommand.js.map