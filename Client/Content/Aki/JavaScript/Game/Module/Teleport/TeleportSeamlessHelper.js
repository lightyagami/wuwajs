"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportSeamlessHelper = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CustomMovementDefine_1 = require("../../NewWorld/Character/Common/Component/Move/CustomMovementDefine");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const SeamlessTravelKeepKite_1 = require("../SeamlessTravel/SeamlessTravelKeepKite");
const SeamlessTravelKeepMovementMode_1 = require("../SeamlessTravel/SeamlessTravelKeepMovementMode");
const SeamlessTravelPostProcess_1 = require("../SeamlessTravel/SeamlessTravelPostProcess");
const SeamlessTravelSceneEffect_1 = require("../SeamlessTravel/SeamlessTravelSceneEffect");
const SeamlessTravelScreenEffect_1 = require("../SeamlessTravel/SeamlessTravelScreenEffect");
const SeamlessTravelTreadmill_1 = require("../SeamlessTravel/SeamlessTravelTreadmill");
class TeleportSeamlessHelper {
  static SeamlessTeleportPreStart() {
    const r = ModelManager_1.ModelManager.TeleportModel;
    r.IsInSeamlessTeleport = true;
    const e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    r.UseTreadmill = false;
    r.UseKeepMovementMode = false;
    if (r.SeamlessConfig?.LeastTime) {
      r.UseTreadmill = true;
    }
    let o = undefined;
    let t = undefined;
    if (r.SeamlessConfig?.KeepMovementStateFeatures?.KeepKite && (l = e.GetComponent(102))?.GetIsHooking() && l.GetCurrentTarget()?.GetHookInteractType() === "KiteHook") {
      r.UseTreadmill = false;
      r.UseKeepKite = true;
      r.UseKeepMovementMode = true;
      o = 6;
      t = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE;
    }
    if (!r.UseKeepMovementMode) {
      if (l = SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode.GetCurrentKeepableMovementMode(r.SeamlessConfig)) {
        r.UseTreadmill = false;
        r.UseKeepMovementMode = true;
        o = l[0];
        t = l[1];
      }
    }
    if (r.UseTreadmill) {
      r.Treadmill = new SeamlessTravelTreadmill_1.SeamlessTravelTreadmill();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:地板资产加载(开始)");
      }
      r.Treadmill.Init(r.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:地板资产加载(完成)");
        }
        r.TreadmillLoaded?.SetResult(e);
        e = Vector_1.Vector.Create();
        if (r.SeamlessConfig?.IsTeleportInPlace) {
          e.DeepCopy(r.StartPosition);
        } else {
          e.DeepCopy(r.TargetPosition);
          e.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT;
        }
        r.Treadmill.ResetLockOnLocation(e, r.StartGravityDirect);
      });
    }
    if (r.UseKeepKite) {
      const a = e.GetComponent(102);
      var l = a.GetCurrentTargetEntity().Entity;
      r.KeepKite = new SeamlessTravelKeepKite_1.SeamlessTravelKeepKite();
      r.KeepKite.SetInitData(l, e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 39, "传送:风筝资产加载(开始)");
      }
      r.KeepKite.Init(r.SeamlessConfig, o => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "传送:风筝资产加载(完成)");
        }
        if (a?.GetIsHooking() && a.GetCurrentTarget()?.GetHookInteractType() === "KiteHook") {
          a.GetCurrentTargetEntity().Entity?.Disable("传送隐藏风筝声骸");
          a.SetIsHookEndByInterrupt(true);
          e?.GetComponent(40)?.EndSkill(210130, "传送停止勾风筝技能");
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 50, "传送:伪风筝显形(开始)");
        }
        r.KeepKite?.AppearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 50, "传送:伪风筝显形(完成)");
          }
          r.KiteAppeared?.SetResult(o);
        });
      });
    }
    if (r.UseKeepMovementMode) {
      r.KeepMovementMode = new SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode();
      r.KeepMovementMode.SetInitDataWithTargetMode(o, t);
      r.KeepMovementMode.Init(r.SeamlessConfig, () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:保持运动模式开始");
        }
        r.KeepMovementMode?.AppearEffect();
      });
    }
    if (r.SeamlessConfig?.TransitionWeatherDaPath) {
      r.PostProcess = new SeamlessTravelPostProcess_1.SeamlessTravelPostProcess();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:后处理资产加载(开始)");
      }
      r.PostProcess.Init(r.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:后处理资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:后处理混入(开始)");
          }
          r.PostProcess?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 50, "传送:后处理混入(完成)");
            }
            r.PostProcessBlendedIn?.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:后处理资产加载(失败)");
          }
          r.PostProcessBlendedIn?.SetResult(false);
        }
      });
    }
    if (r.SeamlessConfig?.EffectPath) {
      r.ScreenEffect = new SeamlessTravelScreenEffect_1.SeamlessTravelScreenEffect();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:屏幕特效资产加载(开始)");
      }
      r.ScreenEffect.Init(r.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效Start(开始)");
          }
          r.ScreenEffect?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 39, "传送:屏幕特效Start(完成)");
            }
            r.ScreenEffectStarted.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:屏幕特效资产加载(失败)");
          }
          r.ScreenEffectStarted.SetResult(false);
        }
      });
    }
    if (r.SeamlessConfig?.SceneEffectDaPath) {
      r.SceneEffect = new SeamlessTravelSceneEffect_1.SeamlessTravelSceneEffect();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:场景特效资产加载(开始)");
      }
      r.SceneEffect.Init(r.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:场景特效资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:场景特效Start(开始)");
          }
          r.SceneEffect?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 39, "传送:场景特效Start(完成)");
            }
            r.SceneEffectStarted.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:场景特效资产加载(失败)");
          }
          r.SceneEffectStarted.SetResult(false);
        }
      });
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(4, [12, 23]);
  }
  static async SeamlessTeleportStart() {
    const r = ModelManager_1.ModelManager.TeleportModel;
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    if (r.SeamlessConfig?.EffectPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待屏幕特效Start(开始)"), await r.ScreenEffectStarted.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待屏幕特效Start(完成)");
    }
    if (r.SeamlessConfig?.SceneEffectDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待场景特效Start(开始)"), await r.SceneEffectStarted.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待场景特效Start(完成)");
    }
    if (r.SeamlessConfig?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待后处理混入(开始)"), await r.PostProcessBlendedIn.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 39, "传送:等待后处理混入(完成)");
    }
    if (r.UseKeepKite && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待风筝出现(开始)"), await r.KiteAppeared.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 39, "传送:等待风筝出现(完成)");
    }
    const t = () => {
      var e = r.SeamlessConfig.LeastTime * MathUtils_1.MathUtils.SecondToMillisecond;
      if (e < TimerSystem_1.MIN_TIME) {
        r.LeastTimeFinished?.SetResult(true);
      } else {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          r.LeastTimeFinished?.SetResult(true);
        }, e);
      }
    };
    if (r.UseTreadmill) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:等待地板资产加载完成(开始)");
      }
      await r.TreadmillLoaded.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:等待地板资产加载完成(完成)");
      }
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:地板显形(开始)");
        }
        r.Treadmill.AppearEffect(() => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:地板显形(完成)");
          }
          r.TreadmillAppeared?.SetResult(true);
          t();
        });
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(3);
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(181)?.StopModelBuffer();
        var o = Vector_1.Vector.Create();
        r.Treadmill.GetLockOnLocation(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "无缝传送:计算中间场景信息", ["角色中间位置", o], ["角色当前旋转", e.ActorRotationProxy], ["相机当前旋转", CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation]);
        }
        e.TeleportAndFindStandLocation(o);
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(false, true);
      });
    } else {
      t();
    }
  }
  static async SeamlessTeleportPreEnd() {
    const e = ModelManager_1.ModelManager.TeleportModel;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 50, "传送:等待过渡最小停留时长(开始)");
    }
    await e.LeastTimeFinished.Promise;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 50, "传送:等待过渡最小停留时长(完成)");
    }
    if (e.UseTreadmill && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:地板隐形(开始)"), e.Treadmill.DisappearEffect(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:地板隐形(完成)");
      }
      e.TreadmillDisappeared.SetResult(true);
    }), Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待地板隐形(开始)"), await e.TreadmillDisappeared.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待地板隐形(完成)");
    }
  }
  static async SeamlessTeleportEnd() {
    const o = ModelManager_1.ModelManager.TeleportModel;
    if (o.IsInSeamlessTeleport) {
      if (o.SeamlessConfig?.EffectPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(开始)");
        }
        o.ScreenEffect?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(完成)");
          }
          o.ScreenEffectEnded?.SetResult(e);
        });
      }
      if (o.SeamlessConfig?.SceneEffectDaPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(开始)");
        }
        o.SceneEffect?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(完成)");
          }
          o.SceneEffectEnded?.SetResult(e);
        });
      }
      if (o.SeamlessConfig?.TransitionWeatherDaPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:后处理混出(开始)");
        }
        o.PostProcess?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:后处理混出(完成)");
          }
          o.PostProcessBlendedOut?.SetResult(e);
        });
      }
      if (o.SeamlessConfig?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待后处理混出(开始)"), await o.PostProcessBlendedOut.Promise, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 39, "传送:等待后处理混出(完成)");
      }
      if (o.SeamlessConfig?.EffectPath) {
        await o.ScreenEffectEnded?.Promise;
      }
      if (o.SeamlessConfig?.SceneEffectDaPath) {
        await o.SceneEffectEnded?.Promise;
      }
      if (o.UseKeepKite) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:保持风筝关闭");
        }
        o.KeepKite?.DisappearEffect();
      }
      if (o.UseKeepMovementMode) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Teleport", 39, "传送:保持运动模式关闭");
        }
        o.KeepMovementMode?.DisappearEffect();
      }
      this.FinishSeamlessTeleport();
    }
  }
  static FinishSeamlessTeleport() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(4);
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    var e = ModelManager_1.ModelManager.TeleportModel;
    if (e.IsInSeamlessTeleport) {
      e.Treadmill?.Destroy();
      e.Treadmill = undefined;
      e.PostProcess?.Destroy();
      e.PostProcess = undefined;
      e.ScreenEffect?.Destroy();
      e.ScreenEffect = undefined;
      e.SceneEffect?.Destroy();
      e.SceneEffect = undefined;
      e.KeepKite?.Destroy();
      e.KeepKite = undefined;
      e.KeepMovementMode?.Destroy();
      e.KeepMovementMode = undefined;
      e.UseTreadmill = false;
      e.UseKeepKite = false;
      e.UseKeepMovementMode = false;
      e.SeamlessEndHandle = undefined;
      e.IsInSeamlessTeleport = false;
      e.SeamlessConfig = undefined;
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
  }
}
exports.TeleportSeamlessHelper = TeleportSeamlessHelper;
//# sourceMappingURL=TeleportSeamlessHelper.js.map