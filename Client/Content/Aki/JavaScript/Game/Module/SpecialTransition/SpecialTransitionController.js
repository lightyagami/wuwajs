"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialTransitionController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class SpecialTransitionController extends ControllerBase_1.ControllerBase {
  static async OpenSpecialTransitionLoadingByFadeScreen(i, a, n) {
    if (ModelManager_1.ModelManager.SpecialTransitionModel.GetSpecialTransitionParams()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Loading", 87, "OpenSpecialTransitionLoadingByFadeScreen打开失败，params已存在");
      }
    } else {
      let e = undefined;
      var r = i.FadeInEffect?.FadeInEffect;
      if (r) {
        e = {
          FadeColor: r.FadeColor,
          FadeInTime: r.FadeInTime,
          FadeOutTime: r.FadeOutTime
        };
      }
      let o = undefined;
      r = i.FadeOutEffect?.FadeOutEffect;
      if (r) {
        o = {
          FadeColor: r.FadeColor,
          FadeInTime: r.FadeInTime,
          FadeOutTime: r.FadeOutTime
        };
      }
      r = {
        ViewParams: {
          SpineId: i.Type === IAction_1.EFadeBackgroundType.Spine ? i.SpineId : undefined,
          BgPath: i.Type === IAction_1.EFadeBackgroundType.BackgroundImage ? i.BackgroundImage : undefined
        },
        FlowParams: {
          FadeInEffect: e,
          FadeOutEffect: o,
          KeepTime: a
        }
      };
      await this.OpenSpecialTransitionLoading(r, true);
      if (n) {
        n();
      }
    }
  }
  static async OpenSpecialTransitionLoadingByTeleportPb(a, n) {
    if (ModelManager_1.ModelManager.SpecialTransitionModel.GetSpecialTransitionParams()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Loading", 87, "OpenSpecialTransitionLoadingByTeleportPb打开失败，params已存在");
      }
    } else {
      let e = undefined;
      var r = a.OAd?.XAd;
      if (r) {
        e = {
          FadeColor: r.YAd === 0 ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black,
          FadeInTime: r.zAd,
          FadeOutTime: r.JAd
        };
      }
      let o = undefined;
      r = a.qAd?.ZAd;
      if (r) {
        o = {
          FadeColor: r.YAd === 0 ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black,
          FadeInTime: r.zAd,
          FadeOutTime: r.JAd
        };
      }
      let i = undefined;
      var r = a.GAd;
      if (r) {
        i = {};
        if (t = r.HAd) {
          i.TextSetting = {
            IsShowTextInfo: t.WAd,
            TidTextContent: t.QAd,
            EdTidTextContent: t.KAd
          };
        }
        i.IsHideCircle = r.$Ad;
      }
      var t = {
        ViewParams: {
          SpineId: a.kAd?.FAd?.VAd,
          BgPath: a.kAd?.NAd?.jAd,
          CustomShowUi: i
        },
        FlowParams: {
          FadeInEffect: e,
          FadeOutEffect: o,
          KeepTime: a.Zps
        }
      };
      await this.OpenSpecialTransitionLoading(t, false);
      if (n) {
        n();
      }
    }
  }
  static async OpenSpecialTransitionLoading(e, o) {
    if (ModelManager_1.ModelManager.SpecialTransitionModel.SetSpecialTransitionParams(e)) {
      const r = e.FlowParams;
      var i = r.FadeInEffect;
      var a = i?.FadeInTime;
      var n = i?.FadeColor;
      if (a !== undefined && n !== undefined) {
        ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 87, "SpecialTransition:进入效果：黑幕淡入(完成)");
          }
        }, a, n);
      }
      var a = e.ViewParams;
      const t = i?.FadeOutTime;
      ModelManager_1.ModelManager.SpecialTransitionModel.KeepShowPromise = new CustomPromise_1.CustomPromise();
      ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(20, 6, () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Loading", 87, "SpecialTransition:打开SpecialTransitionView(完成)");
        }
        if (t === undefined) {
          this.iBd(r.KeepTime);
        }
      }, a);
      if (t !== undefined) {
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, () => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 87, "SpecialTransition:进入效果：黑幕淡出(完成)");
          }
          this.iBd(r.KeepTime);
        }, t);
      }
      if (o) {
        await this.CloseSpecialTransitionLoading();
      }
    }
  }
  static async iBd(e) {
    if (e === undefined) {
      ModelManager_1.ModelManager.SpecialTransitionModel.KeepShowPromise?.SetResult();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 87, "SpecialTransitionView 没有配置持续时间，直接返回");
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 87, "SpecialTransitionView 开始等待显示");
      }
      await TimerSystem_1.GameplayTimerSystem.Wait(e * TimeUtil_1.TimeUtil.InverseMillisecond);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 87, "SpecialTransitionView 等待显示完成");
      }
      ModelManager_1.ModelManager.SpecialTransitionModel.KeepShowPromise?.SetResult();
    }
  }
  static async CloseSpecialTransitionLoading() {
    var e;
    var o;
    var i = ModelManager_1.ModelManager.SpecialTransitionModel.GetSpecialTransitionParams();
    if (i) {
      await ModelManager_1.ModelManager.SpecialTransitionModel.KeepShowPromise?.Promise;
      ModelManager_1.ModelManager.SpecialTransitionModel.KeepShowPromise = undefined;
      o = (i = i.FlowParams.FadeOutEffect)?.FadeInTime;
      e = i?.FadeColor;
      if (o !== undefined && e !== undefined) {
        ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 87, "SpecialTransition:退出效果：黑幕淡入(完成)");
          }
        }, o, e);
      }
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(20, () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Loading", 87, "SpecialTransition:关闭SpecialTransitionView(完成)");
        }
      });
      if ((o = i?.FadeOutTime) !== undefined && (await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(0, o), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Loading", 87, "SpecialTransition:退出效果：黑幕淡出(完成)");
      }
      ModelManager_1.ModelManager.SpecialTransitionModel.ClearSpecialTransitionParams();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Loading", 87, "SpecialTransition:关闭失败，params为空");
    }
  }
}
exports.SpecialTransitionController = SpecialTransitionController;
//# sourceMappingURL=SpecialTransitionController.js.map