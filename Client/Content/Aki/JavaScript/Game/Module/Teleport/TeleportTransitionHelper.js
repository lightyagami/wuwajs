"use strict";

var __decorate = this && this.__decorate || function (e, o, a, r) {
  var t;
  var l = arguments.length;
  var i = l < 3 ? o : r === null ? r = Object.getOwnPropertyDescriptor(o, a) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, o, a, r);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (t = e[n]) {
        i = (l < 3 ? t(i) : l > 3 ? t(o, a, i) : t(o, a)) || i;
      }
    }
  }
  if (l > 3 && i) {
    Object.defineProperty(o, a, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportTransitionHelper = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const CameraUtility_1 = require("../../Camera/CameraUtility");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const PlotData_1 = require("../Plot/PlotData");
const SeamlessTravelDefine_1 = require("../SeamlessTravel/SeamlessTravelDefine");
const TeleportSeamlessHelper_1 = require("./TeleportSeamlessHelper");
class TeleportTransitionHelper {
  static async PlayTeleportTransition(e, o) {
    switch (e) {
      case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, ModelManager_1.ModelManager.TeleportModel.TeleportMode);
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Rouge:
      case Protocol_1.Aki.Protocol.v4s.Proto_AbyssTeleport:
        break;
      case Protocol_1.Aki.Protocol.v4s.SL_:
      case Protocol_1.Aki.Protocol.v4s.Xvs:
      case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
      case Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle:
        await this.pnm(o);
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_GravityFlip:
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 31, "传送:重力翻转传送开始");
        }
        break;
      default:
        await this.PlayTransitionFallback();
    }
    return true;
  }
  static async WaitTeleportTransition(e, o) {
    switch (e) {
      case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
        await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0);
        break;
      case Protocol_1.Aki.Protocol.v4s.SL_:
      case Protocol_1.Aki.Protocol.v4s.Xvs:
      case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
      case Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle:
        await this.vnm(o);
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_GravityFlip:
        CameraUtility_1.CameraUtility.ResetFocus();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 31, "传送:重力翻转传送完成");
        }
        break;
      default:
        await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
    }
    return true;
  }
  static async pnm(e) {
    if (e) {
      switch (e.p5n) {
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
          await this.PlayTransitionMp4(e.q$_);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
          await this.PlayTransitionCenterText(e.E5n, false);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
          this.PlayTransitionEffect(e.q$_);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "TransitionType.Seamless开始");
          }
          TeleportSeamlessHelper_1.TeleportSeamlessHelper.SeamlessTeleportPreStart();
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
          await this.PlayTransitionFadeInScreen(e.EIl);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
          await this.PlayTransitionCharacterDisplay(e.Th1?.bh1);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithCustomLoading:
          await this.PlayTransitionCustomLoading(e.zed?.v9n);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithSpine:
          await this.PlayTransitionSpecial(e.Lxd);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithSpecialCustomLoading:
          await this.PlayTransitionSpecialCustomLoading(e.shm);
          break;
        default:
          await this.PlayTransitionFallback();
      }
    } else {
      await this.PlayTransitionFallback();
    }
  }
  static async vnm(e) {
    if (e) {
      var o = ModelManager_1.ModelManager.TeleportModel;
      switch (e.p5n) {
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "等待传送过渡: 播放MP4");
          }
          await o.CgTeleportCompleted?.Promise;
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
          ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = false;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "等待传送过渡完成: 播放MP4");
          }
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "等待传送过渡: 黑幕白字");
          }
          await o.CgTeleportCompleted?.Promise;
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
          ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = false;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "等待传送过渡完成: 黑幕白字");
          }
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "等待传送过渡完成: PlayEffect");
          }
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
          await TeleportSeamlessHelper_1.TeleportSeamlessHelper.SeamlessTeleportEnd();
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "等待传送过渡: 纯黑幕");
          }
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
          ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = false;
          ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.Black;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "等待传送过渡完成: 纯黑幕");
          }
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithSpine:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 87, "等待传送过渡: 特殊过度效果");
          }
          await ControllerHolder_1.ControllerHolder.SpecialTransitionController.CloseSpecialTransitionLoading();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 87, "等待传送过渡完成: 特殊过度效果");
          }
          break;
        default:
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
      }
    } else {
      await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
    }
  }
  static async PlayTransitionFallback() {
    if (!ModelManager_1.ModelManager.TeleportModel.DisableAutoFade || ModelManager_1.ModelManager.TeleportModel.TeleportMode !== 3) {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, ModelManager_1.ModelManager.TeleportModel.TeleportMode);
    }
  }
  static async PlayTransitionMp4(o) {
    var e = ModelManager_1.ModelManager.TeleportModel;
    ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
    if (o.WNc) {
      ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor = o.QNc?.$Nc === Protocol_1.Aki.Protocol.QNc.Proto_Mp4BackgroundColorWhite ? IAction_1.EMovieBackgroundType.White : IAction_1.EMovieBackgroundType.Black;
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, 1, o.QNc?.HNc === Protocol_1.Aki.Protocol.QNc.Proto_Mp4BackgroundColorWhite ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black, false, false, undefined, true);
      ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon = true;
    } else {
      ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon = false;
    }
    ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = true;
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(18, 5, o.y5n, () => {
      var e = Protocol_1.Aki.Protocol.D$_.create();
      e.x$_ = o.y5n;
      Net_1.Net.Call(17997, e, e => {
        if (!e || e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "播放CG完成请求失败", ["ErrorCode", e.Cvs]);
          }
        }
        ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted?.SetResult(true);
      });
    }, e.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs);
  }
  static async PlayTransitionCenterText(e, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 45, "TransitionType.CenterText开始");
    }
    if (o) {
      ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = o;
    }
    ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = true;
    if (e) {
      ModelManager_1.ModelManager.PlotModel.PlayFlow = new PlotData_1.PlotFlow(e.v5n, e.M5n, e.S5n);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 45, "TransitionFlow为空");
    }
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(7, 0);
    ModelManager_1.ModelManager.PlotModel.ShowCenterTextForTeleport();
  }
  static PlayTransitionEffect(e) {
    if (e.y5n !== "") {
      ModelManager_1.ModelManager.ScreenEffectModel?.PlayScreenEffect(e.y5n, "Teleport");
    }
  }
  static async PlayTransitionFadeInScreen(e) {
    ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = true;
    ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
    ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = e === 0 ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black;
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(7, 3, 1, ModelManager_1.ModelManager.GameModeModel.BlackScreenColor, false, false, undefined, true);
  }
  static async PlayTransitionCharacterDisplay(e) {
    ModelManager_1.ModelManager.LoadingModel?.SetRoleLoadingConfig(e);
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, ModelManager_1.ModelManager.TeleportModel.TeleportMode);
  }
  static async PlayTransitionCustomLoading(e) {
    ModelManager_1.ModelManager.LoadingModel?.SetSpecifiedLoadingConfigId(e);
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, ModelManager_1.ModelManager.TeleportModel.TeleportMode);
  }
  static async PlayTransitionSpecialCustomLoading(e) {
    ModelManager_1.ModelManager.LoadingModel?.SetSpecialCustomLoadingInfo(e);
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, ModelManager_1.ModelManager.TeleportModel.TeleportMode);
  }
  static async PlayTransitionSpecial(e, o) {
    if (e) {
      ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
      try {
        await ControllerHolder_1.ControllerHolder.SpecialTransitionController.OpenSpecialTransitionLoadingByTeleportPb(e);
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Teleport", 87, "TeleportWithSpecialTransition执行异常", e, ["error", e.message], ["tag", o]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Teleport", 87, "TeleportWithSpecialTransition执行异常", ["error", e], ["tag", o]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 87, "TransitionWithSpineLoadingPb为空", ["tag", o]);
    }
  }
  static ParseTeleportTransitionOptionToPb(e) {
    var o;
    var a = Protocol_1.Aki.Protocol.t4s.create();
    switch (e?.Type) {
      case IAction_1.ETeleportTransitionType.PlayMp4:
        a.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4;
        a.q$_.y5n = e.Mp4Path;
        break;
      case IAction_1.ETeleportTransitionType.PlayEffect:
        a.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect;
        a.q$_.y5n = e.EffectDaPath;
        break;
      case IAction_1.ETeleportTransitionType.CenterText:
        a.p5n = Protocol_1.Aki.Protocol.p5n.Proto_CenterText;
        a.E5n = Protocol_1.Aki.Protocol.M4s.create();
        a.E5n.M5n = e.CenterTextFlow.FlowId;
        a.E5n.v5n = e.CenterTextFlow.FlowListName;
        a.E5n.S5n = e.CenterTextFlow.StateId;
        break;
      case IAction_1.ETeleportTransitionType.Seamless:
        a.p5n = Protocol_1.Aki.Protocol.p5n.Proto_Seamless;
        a.R$s = Protocol_1.Aki.Protocol.w$s.create();
        a.R$s.ra1 = !!e.IsTeleportInPlace;
        a.R$s.oa1 = e.TransitionWeatherDaPath;
        a.R$s.D$s = e.EffectDaPath;
        a.R$s.A$s = e.LeastTime;
        a.R$s.U$s = e.EffectExpandTime;
        a.R$s.P$s = e.EffectCollapseTime;
        a.R$s.ra1 = !!e.IsTeleportInPlace;
        a.R$s.cta = !!e.FloorSettings;
        if (e.FloorSettings) {
          (o = Protocol_1.Aki.Protocol.Eta.create()).Cta = e.FloorSettings.MaterialPath;
          o.mta = e.FloorSettings.MeshPath;
          o.gta = e.FloorSettings.Scale.X ?? 1;
          o.fta = e.FloorSettings.Scale.Y ?? 1;
          o.vta = e.FloorSettings.ShowTime;
          o.pta = e.FloorSettings.DisappearTime;
          a.R$s.dta = o;
        }
        if (e.KeepMovementStates?.length) {
          var r = [];
          for (const t of e.KeepMovementStates) {
            if (t === "Kite") {
              r.push(Protocol_1.Aki.Protocol.xG1.Proto_Kite);
            }
          }
          a.R$s.PG1 = r;
        }
        break;
      case IAction_1.ETeleportTransitionType.FadeInScreen:
        a.p5n = Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen;
        a.EIl = e.ScreenType === IAction_1.EFadeInScreenShowType.Black ? 1 : 0;
        break;
      case IAction_1.ETeleportTransitionType.CustomScreen:
        this.sOd(a, e);
        break;
      case IAction_1.ETeleportTransitionType.SpecialCustomLoading:
        this.Bdm(a, e);
        break;
      default:
        a.p5n = Protocol_1.Aki.Protocol.p5n.Proto_Empty;
    }
    return a;
  }
  static sOd(e, o) {
    e.p5n = Protocol_1.Aki.Protocol.p5n.Proto_WithSpine;
    e.Lxd = Protocol_1.Aki.Protocol.Lxd.create();
    e.Lxd.Pxd = Protocol_1.Aki.Protocol.Pxd.create();
    if (o.ScreenType.Type === IAction_1.ECustomScreenType.Spine) {
      (e.Lxd.Pxd.xxd = Protocol_1.Aki.Protocol.xxd.create()).kxd = o.ScreenType.SpineId;
    } else if (o.ScreenType.Type === IAction_1.ECustomScreenType.BackgroundImage) {
      (e.Lxd.Pxd.Bxd = Protocol_1.Aki.Protocol.Bxd.create()).Oxd = o.ScreenType.BackgroundImagePath;
    }
    if (o.FadeInEffect) {
      e.Lxd.Axd = Protocol_1.Aki.Protocol.Axd.create();
    }
    if (o.FadeOutEffect) {
      e.Lxd.Dxd = Protocol_1.Aki.Protocol.Dxd.create();
    }
    if (o.KeepTime) {
      e.Lxd.Zps = o.KeepTime;
    }
    if (o.CustomShowUi) {
      e.Lxd.Uxd = Protocol_1.Aki.Protocol.Uxd.create();
    }
  }
  static Bdm(e, o) {
    e.p5n = Protocol_1.Aki.Protocol.p5n.Proto_WithSpecialCustomLoading;
    e.shm = Protocol_1.Aki.Protocol.shm.create();
    if (o.LoadingType) {
      e.shm.ahm = Protocol_1.Aki.Protocol.ahm.create();
      e.shm.ahm.hhm = o.LoadingType.LoadingId;
    }
  }
  static InitTeleportMode() {
    var e = ModelManager_1.ModelManager.TeleportModel;
    var o = e.TargetLocation;
    if (o) {
      var a = e.Option;
      switch (e.TeleportReason) {
        case Protocol_1.Aki.Protocol.v4s.SL_:
        case Protocol_1.Aki.Protocol.v4s.Xvs:
          if (a && a.p5n !== 0) {
            this.ynm(a, o);
          } else {
            ModelManager_1.ModelManager.TeleportModel.TeleportMode = this.KIo(o);
          }
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
          if (a && a.p5n !== 0) {
            this.ynm(a, o);
          } else {
            ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
          }
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed:
          if (a?.p5n === Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen) {
            ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3;
          } else {
            ModelManager_1.ModelManager.TeleportModel.TeleportMode = this.KIo(o);
          }
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_Drown:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3;
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_FlowStart:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
          break;
        default:
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      }
    }
  }
  static ynm(e, o) {
    var a = ModelManager_1.ModelManager.TeleportModel;
    switch (e.p5n) {
      case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
        a.TeleportMode = 0;
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
        a.TeleportMode = 4;
        if (a.SeamlessEndHandle) {
          TimerSystem_1.GameplayTimerSystem.Remove(a.SeamlessEndHandle);
          a.SeamlessEndHandle = undefined;
        }
        a.SeamlessConfig = new SeamlessTravelDefine_1.SeamlessTravelContext();
        a.SeamlessConfig.ParseConfig(a.Option.R$s);
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
      case Protocol_1.Aki.Protocol.p5n.Proto_WithCustomLoading:
        a.TeleportMode = 1;
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_WithSpine:
        a.TeleportMode = 6;
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_WithSpecialCustomLoading:
        a.TeleportMode = 1;
        break;
      default:
        a.TeleportMode = this.KIo(o);
    }
  }
  static KIo(e) {
    var o;
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || Global_1.Global.BaseCharacter?.IsValid() && (o = Global_1.Global.BaseCharacter.CharacterActorComponent, o = UE.VectorDouble.Dist(o.ActorLocation, e), e = CommonParamById_1.configCommonParamById.GetIntConfig("TeleportRatingRange"), Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 45, "QueryDefaultTeleportMode", ["threshold", e]), o < e)) {
      return 3;
    } else {
      return 2;
    }
  }
}
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送过渡: 默认")], TeleportTransitionHelper, "PlayTransitionFallback", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送过渡: 播放MP4")], TeleportTransitionHelper, "PlayTransitionMp4", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 45, "传送过渡: 黑幕白字")], TeleportTransitionHelper, "PlayTransitionCenterText", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送过渡: PlayEffect")], TeleportTransitionHelper, "PlayTransitionEffect", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送过渡: FadeInScreen")], TeleportTransitionHelper, "PlayTransitionFadeInScreen", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送过渡: 角色展示")], TeleportTransitionHelper, "PlayTransitionCharacterDisplay", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 71, "传送过渡: 自定义")], TeleportTransitionHelper, "PlayTransitionCustomLoading", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 43, "传送过渡: 特殊自定义")], TeleportTransitionHelper, "PlayTransitionSpecialCustomLoading", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 87, "传送过渡: Spine")], TeleportTransitionHelper, "PlayTransitionSpecial", null);
exports.TeleportTransitionHelper = TeleportTransitionHelper; //# sourceMappingURL=TeleportTransitionHelper.js.map