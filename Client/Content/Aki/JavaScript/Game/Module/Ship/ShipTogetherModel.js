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
    this.Brf = e => {
      var t = e.SDs;
      if (e.ief === Protocol_1.Aki.Protocol.nef.Proto_ShareRideMode_MovieMotor) {
        this.OnMovieRideSharingModeChangeForMotorcycle(t);
      }
    };
    this.IY1 = e => {
      var t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(215);
      this.Dnu(e);
      if (e) {
        t?.AddTag(-844934933);
      } else {
        t?.RemoveTag(-844934933);
      }
    };
    this.Bnu = () => {
      var e = Protocol_1.Aki.Protocol.xZ1.create();
      Net_1.Net.Call(24881, e, () => {});
    };
    this.IsInMovieRideSharingMode = false;
    this.Qmf = false;
    this._vf = undefined;
    this.c9f = 0;
    this.d9f = 0;
    this.x8f = undefined;
    this.Grf = 0.5;
    this.MotorSharingRideBlackScreenLoad = 0.5;
    this.MotorSharingRideBlackScreenQuit = 0.5;
    this.MotorSharingMovieCameraConfig = "";
    this.CheckCanOpenMotorcycleTogetherView = (e, t) => !!this.IsInMovieRideSharingMode;
    this.RequestMovieRideSharingModeChangeForMotorcycle = async (e, t) => {
      const i = this.x8f;
      this.x8f = (async () => {
        await i;
        this.PreMovieRideSharingModeChangeForMotorcycle(e, t);
        await this._vf?.Promise;
      })();
      await this.x8f;
    };
  }
  OnInit() {
    this.SHo();
    this.k9f();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, this.XBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, this.YBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicleRideSharing, this.zBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, this.JBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSpecialVehicleShareNotify, this.Brf);
    return true;
  }
  OnClear() {
    this.q9f();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse, this.XBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse, this.YBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicleRideSharing, this.zBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicleRideSharing, this.JBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSpecialVehicleShareNotify, this.Brf);
    return true;
  }
  SHo() {
    this.Grf = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorSharingRideRequestDelay") ?? 0.5;
    this.MotorSharingRideBlackScreenLoad = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorSharingRideBlackScreenLoad") ?? 0.5;
    this.MotorSharingRideBlackScreenQuit = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorSharingRideBlackScreenQuit") ?? 0.5;
    this.MotorSharingMovieCameraConfig = CommonParamById_1.configCommonParamById.GetStringConfig("MotorSharingRideCamera") ?? "SharingRideCamera";
  }
  k9f() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("MotorcycleTogetherView", this.CheckCanOpenMotorcycleTogetherView, "ShipTogetherModel.CheckCanOpenMotorcycleTogetherView");
  }
  q9f() {
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
        this.Vrf(e);
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
        this.Hrf(e);
    }
  }
  TY1(e) {
    var t = e?.PassengerEntity;
    t?.GetComponent(215)?.AddTag(-1296410005);
    e?.VehicleEntity?.GetComponent(254)?.AddTagForPassenger(t, 1, 1937468570);
  }
  RY1(e) {
    var t = e?.PassengerEntity;
    t?.GetComponent(215)?.RemoveTag(-1296410005);
    e?.VehicleEntity?.GetComponent(254)?.RemoveTagForPassenger(t, 1, 1937468570);
  }
  bY1(e) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.IY1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnScreenShotDone, this.Bnu);
  }
  LY1(e) {
    Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(215)?.RemoveTag(-844934933);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCoBathSwitchFirstPlayerView, this.IY1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnScreenShotDone, this.Bnu);
    ModelManager_1.ModelManager.ShowerModel.ExitAndClear();
  }
  Dnu(e) {
    var t = Protocol_1.Aki.Protocol.AZ1.create();
    t.BZ1 = e ? Protocol_1.Aki.Protocol.kZ1.j4n : Protocol_1.Aki.Protocol.kZ1.Proto_Third;
    Net_1.Net.Call(19543, t, () => {});
  }
  CanEnterMotorcycleMovieRideSharingMode(e) {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti || (e && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorSharingRide_Tips03"), false);
  }
  Vrf(e) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, this.RequestMovieRideSharingModeChangeForMotorcycle);
  }
  Hrf(e) {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, this.RequestMovieRideSharingModeChangeForMotorcycle);
  }
  async PreMovieRideSharingModeChangeForMotorcycle(e, t) {
    if (this.IsInMovieRideSharingMode === e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, e, false);
    } else {
      this._vf = new CustomPromise_1.CustomPromise();
      this.Qmf = t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "摩托共乘：流程开始", ["Active", e], ["blackScreen", t]);
      }
      if (this.Qmf && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待开启黑幕(开始)"), await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(22, 3, this.MotorSharingRideBlackScreenLoad, ModelManager_1.ModelManager.GameModeModel.BlackScreenColor, false, false, undefined, true), await TimerSystem_1.TimerSystem.Wait(this.Grf * MathUtils_1.MathUtils.SecondToMillisecond), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待开启黑幕(完成)");
      }
      this.SendMovieModeRideSharingRequest(e);
    }
  }
  SendMovieModeRideSharingRequest(t) {
    var e = Protocol_1.Aki.Protocol.ZZm.create();
    e.SDs = t;
    e.ief = Protocol_1.Aki.Protocol.nef.Proto_ShareRideMode_MovieMotor;
    Net_1.Net.Call(16047, e, e => {
      if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17899);
        this.PostMovieRideSharingModeChangeForMotorcycle(t, false);
      }
    });
  }
  async OnMovieRideSharingModeChangeForMotorcycle(e) {
    this.IsInMovieRideSharingMode = e;
    if (this.c9f) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待编队加载(中断)", ["Handle", this.c9f]);
      }
    } else if (this.d9f) {
      this.Qmf = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待关闭黑幕(中断)", ["Handle", this.d9f]);
      }
      this.d9f++;
    }
    if (await this.WaitMotorTeamUpdateComplete()) {
      await this.PostMovieRideSharingModeChangeForMotorcycle(e, true);
    }
  }
  async PostMovieRideSharingModeChangeForMotorcycle(e, t) {
    return (!this.Qmf || !!(await this.WaitExitBlackScreen())) && !(Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 50, "摩托共乘：流程结束", ["Active", e], ["BlackScreen", this.Qmf], ["success", t]), this._vf?.SetResult(), this._vf = undefined, this.Qmf = false, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, e, t), 0);
  }
  async WaitMotorTeamUpdateComplete() {
    var e = ++this.c9f;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待编队加载(开始)", ["Handle", e]);
    }
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
    var t = this.c9f === e;
    if (t && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待编队加载(完成)", ["Handle", e]);
    }
    this.c9f = 0;
    return t;
  }
  async WaitExitBlackScreen() {
    var e = ++this.d9f;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待关闭黑幕(开始)", ["Handle", e]);
    }
    await TimerSystem_1.TimerSystem.Wait(this.MotorSharingRideBlackScreenQuit * MathUtils_1.MathUtils.SecondToMillisecond);
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(22);
    var t = this.d9f === e;
    if (t && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "摩托共乘: 等待关闭黑幕(完成)", ["Handle", e]);
    }
    this.d9f = 0;
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