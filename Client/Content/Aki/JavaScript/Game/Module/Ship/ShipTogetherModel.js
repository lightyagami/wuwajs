"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTogetherModel = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
class ShipTogetherModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.RiderSharingState = false;
    this.CurrentSelectTogetherRoleId = 0;
    this.RiderSharingRoleId = 0;
    this.XBl = e => {
      this.RiderSharingRoleId = e;
      this.$bl();
    };
    this.YBl = () => {
      this.RiderSharingRoleId = 0;
      this.zbl();
    };
    this.zBl = e => {
      this.RiderSharingState = true;
      this.MY1(e);
    };
    this.JBl = e => {
      this.EY1(e);
      this.RiderSharingState = false;
      this.RiderSharingRoleId = 0;
    };
    this.esf = e => {
      var t = e.SDs;
      if (e.Uof === Protocol_1.Aki.Protocol.Bof.Proto_ShareRideMode_MovieMotor) {
        this.OnMovieRideSharingModeChangeForMotorcycle(t);
      }
    };
    this.IY1 = e => {
      var t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(217);
      this.Dnu(e);
      if (e) {
        t?.AddTag(-844934933);
      } else {
        t?.RemoveTag(-844934933);
      }
    };
    this.Bnu = () => {
      var e = Protocol_1.Aki.Protocol.xZ1.create();
      Net_1.Net.Call(26088, e, () => {});
    };
    this.IsInMovieRideSharingMode = false;
    this.c0f = false;
    this.vMf = undefined;
    this.cZf = 0;
    this.dZf = 0;
    this.jYf = undefined;
    this.osf = 0.5;
    this.MotorSharingRideBlackScreenLoad = 0.5;
    this.MotorSharingRideBlackScreenQuit = 0.5;
    this.MotorSharingMovieCameraConfig = "";
    this.CheckCanOpenMotorcycleTogetherView = (e, t) => !!this.IsInMovieRideSharingMode;
    this.RequestMovieRideSharingModeChangeForMotorcycle = async (e, t) => {
      const i = this.jYf;
      this.jYf = (async () => {
        await i;
        this.PreMovieRideSharingModeChangeForMotorcycle(e, t);
        await this.vMf?.Promise;
      })();
      await this.jYf;
    };
  }
  OnInit() {
    this.SHo();
    this.teg();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, this.XBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, this.YBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicleRideSharing, this.zBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, this.JBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSpecialVehicleShareNotify, this.esf);
    return true;
  }
  OnClear() {
    this.ieg();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, this.XBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, this.YBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicleRideSharing, this.zBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, this.JBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSpecialVehicleShareNotify, this.esf);
    return true;
  }
  SHo() {
    this.osf = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorSharingRideRequestDelay") ?? 0.5;
    this.MotorSharingRideBlackScreenLoad = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorSharingRideBlackScreenLoad") ?? 0.5;
    this.MotorSharingRideBlackScreenQuit = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorSharingRideBlackScreenQuit") ?? 0.5;
    this.MotorSharingMovieCameraConfig = CommonParamById_1.configCommonParamById.GetStringConfig("MotorSharingRideCamera") ?? "SharingRideCamera";
  }
  teg() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("MotorcycleTogetherView", this.CheckCanOpenMotorcycleTogetherView, "ShipTogetherModel.CheckCanOpenMotorcycleTogetherView");
  }
  ieg() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("MotorcycleTogetherView", this.CheckCanOpenMotorcycleTogetherView);
  }
  MY1(e) {
    switch (e?.VehicleType) {
      case "Gongduola":
        this.TY1(e);
        break;
      case "CoBathingEmptyVehicle":
        this.bY1(e);
        break;
      case "Motorcycle":
        this.asf(e);
    }
  }
  EY1(e) {
    switch (e?.VehicleType) {
      case "Gongduola":
        this.RY1(e);
        break;
      case "CoBathingEmptyVehicle":
        this.LY1(e);
        break;
      case "Motorcycle":
        this.hsf(e);
    }
  }
  TY1(e) {
    var t = e?.PassengerEntity;
    t?.GetComponent(217)?.AddTag(-1296410005);
    e?.VehicleEntity?.GetComponent(254)?.AddTagForPassenger(t, 1, 1937468570);
  }
  RY1(e) {
    var t = e?.PassengerEntity;
    t?.GetComponent(217)?.RemoveTag(-1296410005);
    e?.VehicleEntity?.GetComponent(254)?.RemoveTagForPassenger(t, 1, 1937468570);
  }
  bY1(e) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.IY1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnScreenShotDone, this.Bnu);
  }
  LY1(e) {
    Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(217)?.RemoveTag(-844934933);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.IY1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnScreenShotDone, this.Bnu);
    ModelManager_1.ModelManager.ShowerModel.ExitAndClear();
  }
  Dnu(e) {
    var t = Protocol_1.Aki.Protocol.AZ1.create();
    t.BZ1 = e ? Protocol_1.Aki.Protocol.kZ1.j4n : Protocol_1.Aki.Protocol.kZ1.Proto_Third;
    Net_1.Net.Call(15007, t, () => {});
  }
  CanEnterMotorcycleMovieRideSharingMode(e) {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti || (e && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorSharingRide_Tips03"), false);
  }
  asf(e) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, this.RequestMovieRideSharingModeChangeForMotorcycle);
  }
  hsf(e) {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, this.RequestMovieRideSharingModeChangeForMotorcycle);
  }
  async PreMovieRideSharingModeChangeForMotorcycle(e, t) {
    if (this.IsInMovieRideSharingMode === e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, e, false);
    } else {
      this.vMf = new CustomPromise_1.CustomPromise();
      this.c0f = t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "摩托共乘：流程开始", ["Active", e], ["blackScreen", t]);
      }
      if (this.c0f && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待开启黑幕(开始)"), await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(22, 3, this.MotorSharingRideBlackScreenLoad, ModelManager_1.ModelManager.GameModeModel.BlackScreenColor, false, false, undefined, true), await TimerSystem_1.TimerSystem.Wait(this.osf * MathUtils_1.MathUtils.SecondToMillisecond), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待开启黑幕(完成)");
      }
      this.SendMovieModeRideSharingRequest(e);
    }
  }
  SendMovieModeRideSharingRequest(t) {
    var e = Protocol_1.Aki.Protocol.Pof.create();
    e.SDs = t;
    e.Uof = Protocol_1.Aki.Protocol.Bof.Proto_ShareRideMode_MovieMotor;
    Net_1.Net.Call(25712, e, e => {
      if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29971);
        this.PostMovieRideSharingModeChangeForMotorcycle(t, false);
      }
    });
  }
  async OnMovieRideSharingModeChangeForMotorcycle(e) {
    this.IsInMovieRideSharingMode = e;
    if (this.cZf) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待编队加载(中断)", ["Handle", this.cZf]);
      }
    } else if (this.dZf) {
      this.c0f = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待关闭黑幕(中断)", ["Handle", this.dZf]);
      }
      this.dZf++;
    }
    if (await this.WaitMotorTeamUpdateComplete()) {
      await this.PostMovieRideSharingModeChangeForMotorcycle(e, true);
    }
  }
  async PostMovieRideSharingModeChangeForMotorcycle(e, t) {
    return (!this.c0f || !!(await this.WaitExitBlackScreen())) && !(Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 50, "摩托共乘：流程结束", ["Active", e], ["BlackScreen", this.c0f], ["success", t]), this.vMf?.SetResult(), this.vMf = undefined, this.c0f = false, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, e, t), 0);
  }
  async WaitMotorTeamUpdateComplete() {
    var e = ++this.cZf;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待编队加载(开始)", ["Handle", e]);
    }
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
    var t = this.cZf === e;
    if (t && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待编队加载(完成)", ["Handle", e]);
    }
    this.cZf = 0;
    return t;
  }
  async WaitExitBlackScreen() {
    var e = ++this.dZf;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待关闭黑幕(开始)", ["Handle", e]);
    }
    await TimerSystem_1.TimerSystem.Wait(this.MotorSharingRideBlackScreenQuit * MathUtils_1.MathUtils.SecondToMillisecond);
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(22);
    var t = this.dZf === e;
    if (t && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待关闭黑幕(完成)", ["Handle", e]);
    }
    this.dZf = 0;
    return t;
  }
  $bl() {
    var e = ModelManager_1.ModelManager.VehicleModel?.RideSharingInfoMap.values().next().value;
    var t = e?.RoleId ?? 0;
    var i = e?.RoleCreatureId ?? 0;
    if (i && t) {
      switch (Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(242)?.VehicleType) {
        case "Gongduola":
          ModelManager_1.ModelManager.GameAudioModel.RegisterDriveAudioEvent(t, i);
          break;
        case "Motorcycle":
          ModelManager_1.ModelManager.GameAudioModel.RegisterMotorDriveAudioEvent(t, i);
      }
    }
  }
  zbl() {
    switch (Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(242)?.VehicleType) {
      case "Gongduola":
        ModelManager_1.ModelManager.GameAudioModel.RemoveDriveAudioEvent();
        break;
      case "Motorcycle":
        ModelManager_1.ModelManager.GameAudioModel.RemoveMotorDriveAudioEvent();
    }
  }
}
exports.ShipTogetherModel = ShipTogetherModel;
//# sourceMappingURL=ShipTogetherModel.js.map