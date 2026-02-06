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
const TeleportContextHolder_1 = require("./TeleportContextHolder");
class TeleportSeamlessHelper extends TeleportContextHolder_1.TeleportContextHolder {
  async SeamlessTeleportPreStart() {
    const t = ModelManager_1.ModelManager.TeleportModel;
    if (this.TeleportContext.SeamlessEndHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TeleportContext.SeamlessEndHandle);
      this.TeleportContext.SeamlessEndHandle = undefined;
    }
    this.TeleportContext.InitSeamlessContext();
    this.TeleportContext.IsInSeamlessTeleport = true;
    if (ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 39, "[传送:等待当前正在加载的编队(开始)]"), await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("SeamlessTravel", 39, "[传送:等待当前正在加载的编队(完成)]");
    }
    var e;
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    this.TeleportContext.UseTreadmill = false;
    this.TeleportContext.UseKeepKite = false;
    this.TeleportContext.UseKeepMovementMode = false;
    let s = undefined;
    let r = undefined;
    if (o?.Valid && (this.TeleportContext.SeamlessConfig?.KeepMovementStateFeatures?.KeepKite && (e = o.GetComponent(107))?.GetIsHooking() && e.GetCurrentTarget()?.GetHookInteractType() === "KiteHook" && (this.TeleportContext.UseKeepKite = true), this.TeleportContext.UseKeepKite ? (this.TeleportContext.UseKeepMovementMode = true, s = 6, r = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE) : this.TeleportContext.SeamlessConfig?.KeepMovementStateFeatures && (e = SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode.GetCurrentKeepableMovementMode(this.TeleportContext.SeamlessConfig)) && (this.TeleportContext.UseKeepMovementMode = true, s = e[0], r = e[1]), this.TeleportContext.SeamlessConfig?.LeastTime)) {
      if (this.TeleportContext.UseKeepMovementMode) {
        this.TeleportContext.UseTreadmill = false;
      } else {
        this.TeleportContext.UseTreadmill = true;
      }
    }
    if (this.TeleportContext.UseTreadmill) {
      this.TeleportContext.Treadmill = new SeamlessTravelTreadmill_1.SeamlessTravelTreadmill();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:地板资产加载(开始)");
      }
      this.TeleportContext.Treadmill.Init(this.TeleportContext.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:地板资产加载(完成)");
        }
        this.TeleportContext.TreadmillLoaded?.SetResult(e);
        e = Vector_1.Vector.Create();
        if (this.TeleportContext.SeamlessConfig?.IsTeleportInPlace) {
          e.DeepCopy(t.StartPosition);
        } else {
          e.DeepCopy(t.TargetPosition);
          e.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT;
        }
        this.TeleportContext.Treadmill.ResetLockOnLocation(e, t.StartGravityDirect);
      });
    }
    if (this.TeleportContext.UseKeepMovementMode) {
      this.TeleportContext.KeepMovementMode = new SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode();
      this.TeleportContext.KeepMovementMode.SetInitDataWithTargetMode(s, r);
      this.TeleportContext.KeepMovementMode.Init(this.TeleportContext.SeamlessConfig, () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:保持运动模式开始");
        }
        this.TeleportContext.KeepMovementMode?.AppearEffect();
      });
    }
    if (this.TeleportContext.UseKeepKite) {
      e = o?.GetComponent(107)?.GetCurrentTargetEntity()?.Entity;
      this.TeleportContext.KeepKite = new SeamlessTravelKeepKite_1.SeamlessTravelKeepKite();
      if (e && o) {
        this.TeleportContext.KeepKite.SetInitData(e, o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "传送:风筝资产加载(开始)");
        }
        this.TeleportContext.KeepKite.Init(this.TeleportContext.SeamlessConfig, t => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 39, "传送:风筝资产加载(完成)");
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 50, "传送:伪风筝显形(开始)");
          }
          this.TeleportContext.KeepKite?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SeamlessTravel", 50, "传送:伪风筝显形(完成)");
            }
            this.TeleportContext.KeepMovementMode?.CheckAndKeepMoveState();
            this.TeleportContext.KiteAppeared?.SetResult(t);
          });
        });
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "传送:风筝表现失败，关联实体出错", ["HookTargetEntityValid", !!e?.Valid], ["TargetEntityValid", !!o?.Valid]);
        }
        this.TeleportContext.UseKeepKite = false;
      }
    }
    if (this.TeleportContext.SeamlessConfig?.TransitionWeatherDaPath) {
      this.TeleportContext.PostProcess = new SeamlessTravelPostProcess_1.SeamlessTravelPostProcess();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:后处理资产加载(开始)");
      }
      this.TeleportContext.PostProcess.Init(this.TeleportContext.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:后处理资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:后处理混入(开始)");
          }
          this.TeleportContext.PostProcess?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 50, "传送:后处理混入(完成)");
            }
            this.TeleportContext.PostProcessBlendedIn?.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:后处理资产加载(失败)");
          }
          this.TeleportContext.PostProcessBlendedIn?.SetResult(false);
        }
      });
    }
    if (this.TeleportContext.SeamlessConfig?.EffectPath) {
      this.TeleportContext.ScreenEffect = new SeamlessTravelScreenEffect_1.SeamlessTravelScreenEffect();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:屏幕特效资产加载(开始)");
      }
      this.TeleportContext.ScreenEffect.Init(this.TeleportContext.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效Start(开始)");
          }
          this.TeleportContext.ScreenEffect?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 39, "传送:屏幕特效Start(完成)");
            }
            this.TeleportContext.ScreenEffectStarted.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:屏幕特效资产加载(失败)");
          }
          this.TeleportContext.ScreenEffectStarted.SetResult(false);
        }
      });
    }
    if (this.TeleportContext.SeamlessConfig?.SceneEffectDaPath) {
      this.TeleportContext.SceneEffect = new SeamlessTravelSceneEffect_1.SeamlessTravelSceneEffect();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:场景特效资产加载(开始)");
      }
      this.TeleportContext.SceneEffect.Init(this.TeleportContext.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:场景特效资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:场景特效Start(开始)");
          }
          this.TeleportContext.SceneEffect?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 39, "传送:场景特效Start(完成)");
            }
            this.TeleportContext.SceneEffectStarted.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:场景特效资产加载(失败)");
          }
          this.TeleportContext.SceneEffectStarted.SetResult(false);
        }
      });
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(4, [12, 23]);
  }
  async SeamlessTeleportStart() {
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    if (this.TeleportContext.SeamlessConfig?.EffectPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待屏幕特效Start(开始)"), await this.TeleportContext.ScreenEffectStarted.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待屏幕特效Start(完成)");
    }
    if (this.TeleportContext.SeamlessConfig?.SceneEffectDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待场景特效Start(开始)"), await this.TeleportContext.SceneEffectStarted.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待场景特效Start(完成)");
    }
    if (this.TeleportContext.SeamlessConfig?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待后处理混入(开始)"), await this.TeleportContext.PostProcessBlendedIn.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 39, "传送:等待后处理混入(完成)");
    }
    if (this.TeleportContext.UseKeepKite && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待风筝出现(开始)"), await this.TeleportContext.KiteAppeared.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 39, "传送:等待风筝出现(完成)");
    }
    const o = () => {
      var e = this.TeleportContext.SeamlessConfig.LeastTime * MathUtils_1.MathUtils.SecondToMillisecond;
      if (e < TimerSystem_1.MIN_TIME) {
        this.TeleportContext.LeastTimeFinished?.SetResult(true);
      } else {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.TeleportContext.LeastTimeFinished?.SetResult(true);
        }, e);
      }
    };
    if (this.TeleportContext.UseTreadmill) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:等待地板资产加载完成(开始)");
      }
      await this.TeleportContext.TreadmillLoaded.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:等待地板资产加载完成(完成)");
      }
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:地板显形(开始)");
        }
        this.TeleportContext.Treadmill.AppearEffect(() => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:地板显形(完成)");
          }
          this.TeleportContext.TreadmillAppeared?.SetResult(true);
          o();
        });
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(3);
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(188)?.StopModelBuffer();
        var t = Vector_1.Vector.Create();
        this.TeleportContext.Treadmill.GetLockOnLocation(t);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "无缝传送:计算中间场景信息", ["角色中间位置", t], ["角色当前旋转", e.ActorRotationProxy], ["相机当前旋转", CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation]);
        }
        e.TeleportAndFindStandLocation(t);
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(false, true);
      });
    } else {
      o();
    }
  }
  async SeamlessTeleportPreEnd() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 50, "传送:等待过渡最小停留时长(开始)");
    }
    await this.TeleportContext.LeastTimeFinished.Promise;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 50, "传送:等待过渡最小停留时长(完成)");
    }
    if (this.TeleportContext.UseTreadmill && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:地板隐形(开始)"), this.TeleportContext.Treadmill.DisappearEffect(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:地板隐形(完成)");
      }
      this.TeleportContext.TreadmillDisappeared.SetResult(true);
    }), Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待地板隐形(开始)"), await this.TeleportContext.TreadmillDisappeared.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待地板隐形(完成)");
    }
  }
  async SeamlessTeleportEnd() {
    if (this.TeleportContext.IsInSeamlessTeleport) {
      if (this.TeleportContext.SeamlessConfig?.EffectPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(开始)");
        }
        this.TeleportContext.ScreenEffect?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(完成)");
          }
          this.TeleportContext.ScreenEffectEnded?.SetResult(e);
        });
      }
      if (this.TeleportContext.SeamlessConfig?.SceneEffectDaPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(开始)");
        }
        this.TeleportContext.SceneEffect?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(完成)");
          }
          this.TeleportContext.SceneEffectEnded?.SetResult(e);
        });
      }
      if (this.TeleportContext.SeamlessConfig?.TransitionWeatherDaPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:后处理混出(开始)");
        }
        this.TeleportContext.PostProcess?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:后处理混出(完成)");
          }
          this.TeleportContext.PostProcessBlendedOut?.SetResult(e);
        });
      }
      if (this.TeleportContext.SeamlessConfig?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待后处理混出(开始)"), await this.TeleportContext.PostProcessBlendedOut.Promise, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 39, "传送:等待后处理混出(完成)");
      }
      if (this.TeleportContext.SeamlessConfig?.EffectPath) {
        await this.TeleportContext.ScreenEffectEnded?.Promise;
      }
      if (this.TeleportContext.SeamlessConfig?.SceneEffectDaPath) {
        await this.TeleportContext.SceneEffectEnded?.Promise;
      }
      if (this.TeleportContext.UseKeepKite) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:保持风筝关闭");
        }
        this.TeleportContext.KeepKite?.DisappearEffect();
      }
      if (this.TeleportContext.UseKeepMovementMode) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Teleport", 39, "传送:保持运动模式关闭");
        }
        this.TeleportContext.KeepMovementMode?.DisappearEffect();
      }
      this.FinishSeamlessTeleport();
    }
  }
  FinishSeamlessTeleport() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(4);
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    if (this.TeleportContext.IsInSeamlessTeleport) {
      this.TeleportContext.Treadmill?.Destroy();
      this.TeleportContext.Treadmill = undefined;
      this.TeleportContext.PostProcess?.Destroy();
      this.TeleportContext.PostProcess = undefined;
      this.TeleportContext.ScreenEffect?.Destroy();
      this.TeleportContext.ScreenEffect = undefined;
      this.TeleportContext.SceneEffect?.Destroy();
      this.TeleportContext.SceneEffect = undefined;
      this.TeleportContext.KeepKite?.Destroy();
      this.TeleportContext.KeepKite = undefined;
      this.TeleportContext.KeepMovementMode?.Destroy();
      this.TeleportContext.KeepMovementMode = undefined;
      this.TeleportContext.UseTreadmill = false;
      this.TeleportContext.UseKeepKite = false;
      this.TeleportContext.UseKeepMovementMode = false;
      this.TeleportContext.SeamlessEndHandle = undefined;
      this.TeleportContext.IsInSeamlessTeleport = false;
      this.TeleportContext.SeamlessConfig = undefined;
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
  }
}
exports.TeleportSeamlessHelper = TeleportSeamlessHelper;
//# sourceMappingURL=TeleportSeamlessHelper.js.map