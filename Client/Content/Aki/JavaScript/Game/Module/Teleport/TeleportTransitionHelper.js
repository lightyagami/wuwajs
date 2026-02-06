"use strict";

var __decorate = this && this.__decorate || function (o, e, r, t) {
  var a;
  var l = arguments.length;
  var i = l < 3 ? e : t === null ? t = Object.getOwnPropertyDescriptor(e, r) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(o, e, r, t);
  } else {
    for (var n = o.length - 1; n >= 0; n--) {
      if (a = o[n]) {
        i = (l < 3 ? a(i) : l > 3 ? a(e, r, i) : a(e, r)) || i;
      }
    }
  }
  if (l > 3 && i) {
    Object.defineProperty(e, r, i);
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
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const CameraUtility_1 = require("../../Camera/CameraUtility");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const PlotData_1 = require("../Plot/PlotData");
const TeleportContextHolder_1 = require("./TeleportContextHolder");
class TeleportTransitionHelper extends TeleportContextHolder_1.TeleportContextHolder {
  async PlayTeleportTransition() {
    var o = this.TeleportContext.Option;
    switch (this.TeleportContext.ServerReason) {
      case Protocol_1.Aki.Protocol.v4s.Proto_Rouge:
      case Protocol_1.Aki.Protocol.v4s.Proto_AbyssTeleport:
        break;
      case Protocol_1.Aki.Protocol.v4s.SL_:
      case Protocol_1.Aki.Protocol.v4s.Xvs:
      case Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle:
        await this.$lm();
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
        if (o && o.p5n !== 0) {
          await this.$lm();
        } else {
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 1);
        }
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_GravityFlip:
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 31, "传送:重力翻转传送开始");
        }
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Drown:
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 2);
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 3);
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_FlowStart:
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 2);
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed:
        if (o?.p5n === Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen) {
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 3);
        } else {
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, this.KIo());
        }
        break;
      default:
        if (o && o.p5n !== 0) {
          await this.$lm();
        } else {
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 1);
        }
    }
    return true;
  }
  async WaitTeleportTransition() {
    switch (this.TeleportContext.ServerReason) {
      case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
        await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
        break;
      case Protocol_1.Aki.Protocol.v4s.SL_:
      case Protocol_1.Aki.Protocol.v4s.Xvs:
      case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
      case Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle:
        await this.Wlm(this.TeleportContext.Option);
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
  async $lm() {
    var o = this.TeleportContext.Option;
    if (o) {
      switch (o.p5n) {
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
          await this.PlayTransitionMp4(o.q$_);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
          await TeleportTransitionHelper.PlayTransitionCenterText(o.E5n, false);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
          TeleportTransitionHelper.PlayTransitionEffect(o.q$_);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "TransitionType.Seamless开始");
          }
          await this.TeleportContext.TeleportSeamlessHelper?.SeamlessTeleportPreStart();
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
          await TeleportTransitionHelper.PlayTransitionFadeInScreen(o.EIl);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
          await TeleportTransitionHelper.PlayTransitionCharacterDisplay(o.Th1?.bh1);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithCustomLoading:
          await TeleportTransitionHelper.PlayTransitionCustomLoading(o.zed?.v9n);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithSpine:
          await TeleportTransitionHelper.PlayTransitionSpecial(o.Lxd);
          break;
        case Protocol_1.Aki.Protocol.p5n.Proto_WithSpecialCustomLoading:
          await TeleportTransitionHelper.PlayTransitionSpecialCustomLoading(o.Qum);
          break;
        default:
          await this.PlayTransitionFallback();
      }
    } else {
      await this.PlayTransitionFallback();
    }
  }
  async Wlm(o) {
    if (o) {
      switch (o.p5n) {
        case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "等待传送过渡: 播放MP4");
          }
          await this.TeleportContext.CgTeleportCompleted?.Promise;
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
          await this.TeleportContext.CgTeleportCompleted?.Promise;
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
          await this.TeleportContext.TeleportSeamlessHelper?.SeamlessTeleportEnd();
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
  async PlayTransitionFallback() {
    var o = this.KIo();
    if (!this.TeleportContext.DisableAutoFade || o !== 3) {
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, o);
    }
  }
  async PlayTransitionMp4(e) {
    ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
    if (e.WNc) {
      ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor = e.QNc?.$Nc === Protocol_1.Aki.Protocol.QNc.Proto_Mp4BackgroundColorWhite ? IAction_1.EMovieBackgroundType.White : IAction_1.EMovieBackgroundType.Black;
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 3, 1, e.QNc?.HNc === Protocol_1.Aki.Protocol.QNc.Proto_Mp4BackgroundColorWhite ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black, false, false, undefined, true);
      ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon = true;
    } else {
      ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon = false;
    }
    ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = true;
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(18, 5, e.y5n, () => {
      var o = Protocol_1.Aki.Protocol.D$_.create();
      o.x$_ = e.y5n;
      Net_1.Net.Call(25201, o, o => {
        if (!o || o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 45, "播放CG完成请求失败", ["ErrorCode", o.Cvs]);
          }
        }
        this.TeleportContext.CgTeleportCompleted?.SetResult(true);
      });
    }, this.TeleportContext.ServerReason === Protocol_1.Aki.Protocol.v4s.Xvs);
  }
  static async PlayTransitionCenterText(o, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 45, "TransitionType.CenterText开始");
    }
    if (e) {
      ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = e;
    }
    ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = true;
    if (o) {
      ModelManager_1.ModelManager.PlotModel.PlayFlow = new PlotData_1.PlotFlow(o.v5n, o.M5n, o.S5n);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 45, "TransitionFlow为空");
    }
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(7, 0);
    ModelManager_1.ModelManager.PlotModel.ShowCenterTextForTeleport();
  }
  static PlayTransitionEffect(o) {
    if (o.y5n !== "") {
      ModelManager_1.ModelManager.ScreenEffectModel?.PlayScreenEffect(o.y5n, "Teleport");
    }
  }
  static async PlayTransitionFadeInScreen(o) {
    ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = true;
    ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
    ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = o === 0 ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black;
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(7, 3, 1, ModelManager_1.ModelManager.GameModeModel.BlackScreenColor, false, false, undefined, true);
  }
  static async PlayTransitionCharacterDisplay(o) {
    ModelManager_1.ModelManager.LoadingModel?.SetRoleLoadingConfig(o);
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 1);
  }
  static async PlayTransitionCustomLoading(o) {
    ModelManager_1.ModelManager.LoadingModel?.SetSpecifiedLoadingConfigId(o);
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 1);
  }
  static async PlayTransitionSpecialCustomLoading(o) {
    ModelManager_1.ModelManager.LoadingModel?.SetSpecialCustomLoadingInfo(o);
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, 1);
  }
  static async PlayTransitionSpecial(o, e) {
    if (o) {
      ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
      try {
        await ControllerHolder_1.ControllerHolder.SpecialTransitionController.OpenSpecialTransitionLoadingByTeleportPb(o);
      } catch (o) {
        if (o instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Teleport", 87, "TeleportWithSpecialTransition执行异常", o, ["error", o.message], ["tag", e]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Teleport", 87, "TeleportWithSpecialTransition执行异常", ["error", o], ["tag", e]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 87, "TransitionWithSpineLoadingPb为空", ["tag", e]);
    }
  }
  static ParseTeleportTransitionOptionToPb(o) {
    var e;
    var r = Protocol_1.Aki.Protocol.t4s.create();
    switch (o?.Type) {
      case IAction_1.ETeleportTransitionType.PlayMp4:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4;
        r.q$_.y5n = o.Mp4Path;
        break;
      case IAction_1.ETeleportTransitionType.PlayEffect:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect;
        r.q$_.y5n = o.EffectDaPath;
        break;
      case IAction_1.ETeleportTransitionType.CenterText:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_CenterText;
        r.E5n = Protocol_1.Aki.Protocol.M4s.create();
        r.E5n.M5n = o.CenterTextFlow.FlowId;
        r.E5n.v5n = o.CenterTextFlow.FlowListName;
        r.E5n.S5n = o.CenterTextFlow.StateId;
        break;
      case IAction_1.ETeleportTransitionType.Seamless:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_Seamless;
        r.R$s = Protocol_1.Aki.Protocol.w$s.create();
        r.R$s.ra1 = !!o.IsTeleportInPlace;
        r.R$s.oa1 = o.TransitionWeatherDaPath;
        r.R$s.D$s = o.EffectDaPath;
        r.R$s.A$s = o.LeastTime;
        r.R$s.U$s = o.EffectExpandTime;
        r.R$s.P$s = o.EffectCollapseTime;
        r.R$s.ra1 = !!o.IsTeleportInPlace;
        r.R$s.cta = !!o.FloorSettings;
        if (o.FloorSettings) {
          (e = Protocol_1.Aki.Protocol.Eta.create()).Cta = o.FloorSettings.MaterialPath;
          e.mta = o.FloorSettings.MeshPath;
          e.gta = o.FloorSettings.Scale.X ?? 1;
          e.fta = o.FloorSettings.Scale.Y ?? 1;
          e.vta = o.FloorSettings.ShowTime;
          e.pta = o.FloorSettings.DisappearTime;
          r.R$s.dta = e;
        }
        if (o.KeepMovementStates?.length) {
          var t = [];
          for (const a of o.KeepMovementStates) {
            if (a === "Kite") {
              t.push(Protocol_1.Aki.Protocol.xG1.Proto_Kite);
            }
          }
          r.R$s.PG1 = t;
        }
        break;
      case IAction_1.ETeleportTransitionType.FadeInScreen:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen;
        r.EIl = o.ScreenType === IAction_1.EFadeInScreenShowType.Black ? 1 : 0;
        break;
      case IAction_1.ETeleportTransitionType.CustomScreen:
        this.sOd(r, o);
        break;
      case IAction_1.ETeleportTransitionType.SpecialCustomLoading:
        this.fpm(r, o);
        break;
      default:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_Empty;
    }
    return r;
  }
  static sOd(o, e) {
    o.p5n = Protocol_1.Aki.Protocol.p5n.Proto_WithSpine;
    o.Lxd = Protocol_1.Aki.Protocol.Lxd.create();
    o.Lxd.Pxd = Protocol_1.Aki.Protocol.Pxd.create();
    if (e.ScreenType.Type === IAction_1.ECustomScreenType.Spine) {
      (o.Lxd.Pxd.xxd = Protocol_1.Aki.Protocol.xxd.create()).kxd = e.ScreenType.SpineId;
    } else if (e.ScreenType.Type === IAction_1.ECustomScreenType.BackgroundImage) {
      (o.Lxd.Pxd.Bxd = Protocol_1.Aki.Protocol.Bxd.create()).Oxd = e.ScreenType.BackgroundImagePath;
    }
    if (e.FadeInEffect) {
      o.Lxd.Axd = Protocol_1.Aki.Protocol.Axd.create();
    }
    if (e.FadeOutEffect) {
      o.Lxd.Dxd = Protocol_1.Aki.Protocol.Dxd.create();
    }
    if (e.KeepTime) {
      o.Lxd.Zps = e.KeepTime;
    }
    if (e.CustomShowUi) {
      o.Lxd.Uxd = Protocol_1.Aki.Protocol.Uxd.create();
    }
    if (e.StartAkEvent) {
      o.Lxd.AWf = e.StartAkEvent;
    }
  }
  static fpm(o, e) {
    o.p5n = Protocol_1.Aki.Protocol.p5n.Proto_WithSpecialCustomLoading;
    o.Qum = Protocol_1.Aki.Protocol.Qum.create();
    if (e.LoadingType) {
      o.Qum.Kum = Protocol_1.Aki.Protocol.Kum.create();
      o.Qum.Kum.Xum = e.LoadingType.LoadingId;
    }
  }
  KIo() {
    var o;
    var e;
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || Global_1.Global.BaseCharacter?.IsValid() && (o = Global_1.Global.BaseCharacter.CharacterActorComponent, o = UE.VectorDouble.Dist(o.ActorLocation, this.TeleportContext.TargetPosition), e = CommonParamById_1.configCommonParamById.GetIntConfig("TeleportRatingRange"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 79, "QueryDefaultTeleportMode", ["threshold", e]), o < e)) {
      return 3;
    } else {
      return 2;
    }
  }
}
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送过渡: 默认")], TeleportTransitionHelper.prototype, "PlayTransitionFallback", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送过渡: 播放MP4")], TeleportTransitionHelper.prototype, "PlayTransitionMp4", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 45, "传送过渡: 黑幕白字")], TeleportTransitionHelper, "PlayTransitionCenterText", null);
__decorate([(0, Log_1.logDecorator)("Teleport", 79, "传送过渡: PlayEffect")], TeleportTransitionHelper, "PlayTransitionEffect", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送过渡: FadeInScreen")], TeleportTransitionHelper, "PlayTransitionFadeInScreen", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 79, "传送过渡: 角色展示")], TeleportTransitionHelper, "PlayTransitionCharacterDisplay", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 71, "传送过渡: 自定义")], TeleportTransitionHelper, "PlayTransitionCustomLoading", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 43, "传送过渡: 特殊自定义")], TeleportTransitionHelper, "PlayTransitionSpecialCustomLoading", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("Teleport", 87, "传送过渡: Spine")], TeleportTransitionHelper, "PlayTransitionSpecial", null);
exports.TeleportTransitionHelper = TeleportTransitionHelper; //# sourceMappingURL=TeleportTransitionHelper.js.map