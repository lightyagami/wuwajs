"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GamepadPsFeedbackData_1 = require("./GamepadPsFeedbackData");
const GamepadPsFeedbackListenTagModule_1 = require("./GamepadPsFeedbackListenTagModule");
const GamepadPsFeedbackModule_1 = require("./GamepadPsFeedbackModule");
const QTE_GAMEPAD_SHAKE = "Qte_GamepadShake";
const MANIPULATABLE_GAMEPAD_SHAKE = "Manipulatable_GamepadShake";
const LEVELEVENT_GAMEPAD_SHAKE = "LevelEventTriggerGamepadShake";
class GamepadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("FKHitForceFeedbackPath"));
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("LightHitForceFeedbackPath"));
    this.XKt.push(CommonParamById_1.configCommonParamById.GetStringConfig("HeavyHitForceFeedbackPath"));
    this.cWm.Init();
    return true;
  }
  static OnClear() {
    this.Q_d();
    this.K_d.Clear();
    this.cWm.Clear();
    return true;
  }
  static PlayForceFeedbackByHit(e) {
    var a;
    if (Info_1.Info.IsInGamepad()) {
      if (a = this.$Kt[e]) {
        GamepadController.PlayKuroForceFeedback(a, undefined, false, false, false, "Hit");
      } else {
        a = this.XKt[e];
        ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.KuroForceFeedbackEffect, e => {
          if (e) {
            GamepadController.PlayKuroForceFeedback(e, undefined, false, false, false, "Hit");
          }
        }, 100, "Ui.GamepadUi");
      }
    }
  }
  static X_d() {
    var e = this.Y_d.GetLastFeedbackInfo();
    if (e) {
      this.K_d.PlayFeedback(e.Mode, e.Path);
    } else {
      this.K_d.StopFeedback();
    }
  }
  static z_d(e) {
    var r = InputSettings_1.InputSettings.GetActionMappings(e);
    if (!(r.Num() <= 0)) {
      let a = false;
      let t = false;
      for (let e = r.Num() - 1; e >= 0; e--) {
        var o = r.Get(e).Key.KeyName.toString();
        if (InputSettings_1.InputSettings.GetKey(o)?.IsGamepadKey) {
          if (o === "Gamepad_LeftTrigger") {
            a = true;
          } else if (o === "Gamepad_RightTrigger") {
            t = true;
          }
        }
      }
      if (a && t) {
        return 2;
      } else if (a) {
        return 0;
      } else if (t) {
        return 1;
      } else {
        return undefined;
      }
    }
  }
  static tMg(e) {
    var r = InputSettings_1.InputSettings.GetAxisMappings(e);
    if (!(r.Num() <= 0)) {
      let a = false;
      let t = false;
      for (let e = r.Num() - 1; e >= 0; e--) {
        var o = r.Get(e).Key.KeyName.toString();
        var i = InputSettings_1.InputSettings.GetKey(o);
        if (i?.IsGamepadKey) {
          if (o === "Gamepad_LeftTriggerAxis") {
            if (i.IsInputKeyDown()) {
              a = true;
            }
          } else if (o === "Gamepad_RightTriggerAxis" && i.IsInputKeyDown()) {
            t = true;
          }
        }
      }
      if (a && t) {
        return 2;
      } else if (a) {
        return 0;
      } else if (t) {
        return 1;
      } else {
        return undefined;
      }
    }
  }
  static iMg(e, a) {
    if (Info_1.Info.IsInGamepad()) {
      if (a) {
        return this.tMg(e);
      } else {
        return this.z_d(e);
      }
    }
  }
  static TryAddFeedbackReason(e, a) {
    var t;
    var a = ConfigManager_1.ConfigManager.GamepadConfig?.GetPsFeedbackReason(a);
    if (a) {
      if ((t = this.iMg(a.ActionName, a.IsAxis)) === undefined) {
        this.RemoveFeedbackReason(e);
      } else {
        this.J_d(e, t, a.FeedbackPath);
      }
    }
  }
  static J_d(e, a, t) {
    this.Y_d.AddFeedbackReason(e, a, t);
    this.X_d();
  }
  static RemoveFeedbackReason(e) {
    if (this.Y_d.RemoveFeedbackReason(e)) {
      this.X_d();
    }
  }
  static Q_d() {
    this.Y_d.ClearFeedbackReason();
    this.X_d();
  }
  static PlayKuroForceFeedback(e, a, t, r, o, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 17, "PlayKuroForceFeedback", ["", e?.GetName()], ["bLooping", t], ["reason", i]);
    }
    Global_1.Global.CharacterController.PlayKuroForceFeedback(e, a, t, r, o);
  }
  static StopKuroForceFeedback(e, a) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 17, "StopKuroForceFeedback", ["", e?.GetName()]);
    }
    Global_1.Global.CharacterController.StopKuroForceFeedback(e, a);
  }
  static async TriggerGamepadShakeEvent(e, a) {
    if (Info_1.Info.IsInGamepad() && Global_1.Global.CharacterController) {
      const s = a ?? {};
      s.GamepadShakeAsset = await this.LoadGamepadShakeAsset(e.KuroForceFeedbackEffect);
      if (s.GamepadShakeAsset && s.GamepadShakeAsset.IsValid()) {
        switch (e.GamepadShakeConfig.Type) {
          case "Onetime":
            s.Tag = FNameUtil_1.FNameUtil.GetDynamicFName(e.GamepadShakeConfig.GamepadShakeTag ?? LEVELEVENT_GAMEPAD_SHAKE);
            Global_1.Global.CharacterController.PlayKuroForceFeedback(s.GamepadShakeAsset, s.Tag, false, e.GamepadShakeConfig.IsIgnoreTimeDilation ?? true, false);
            break;
          case "Continual":
            s.Tag = FNameUtil_1.FNameUtil.GetDynamicFName(e.GamepadShakeConfig.GamepadShakeTag ?? LEVELEVENT_GAMEPAD_SHAKE);
            var t = e.GamepadShakeConfig.IsIgnoreTimeDilation ?? false;
            Global_1.Global.CharacterController.PlayKuroForceFeedback(s.GamepadShakeAsset, s.Tag, e.GamepadShakeConfig.IsLoop, t, false);
            (t ? TimerSystem_1.GameplayTimerSystem : TimerSystem_1.TimerSystem).Delay(() => {
              Global_1.Global.CharacterController?.StopKuroForceFeedback(s.GamepadShakeAsset, s.Tag);
            }, e.GamepadShakeConfig.Duration * 1000);
            break;
          case "Attenuated":
            s.Tag = FNameUtil_1.FNameUtil.GetDynamicFName(LEVELEVENT_GAMEPAD_SHAKE);
            var t = e.GamepadShakeConfig.CenterEntity;
            var r = await this.QCg(e.GamepadShakeConfig.ForceFeedbackAttenuation);
            if (r) {
              if (e.GamepadShakeConfig.IsFollowEntityMovement) {
                var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
                if (!o || !o.Valid || !o.Entity?.Valid) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake失败，找不到想要跟随的实体", ["pbDataId", t]);
                  }
                  break;
                }
                o = o.Entity.GetComponent(1);
                if (!o || !o.Owner) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake失败，找不到Attach的Actor", ["pbDataId", t]);
                  }
                  break;
                }
                s.FeedbackComponent = UE.GameplayStatics.D_SpawnForceFeedbackAttached(s.GamepadShakeAsset, o.Owner.RootComponent, FNameUtil_1.FNameUtil.NONE, o.ActorLocation, o.ActorRotation, 1, true, e.GamepadShakeConfig.IsLoop, 1, 0, r, true);
                TimerSystem_1.TimerSystem.Delay(() => {
                  s.FeedbackComponent?.Stop();
                }, e.GamepadShakeConfig.Duration * 1000);
              } else {
                o = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(t);
                if (!o || !o.Transform) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake失败，找不到实体配置", ["pbDataId", t]);
                  }
                  break;
                }
                s.FeedbackComponent = UE.GameplayStatics.D_SpawnForceFeedbackAtLocation(GlobalData_1.GlobalData.World, s.GamepadShakeAsset, Vector_1.Vector.ZeroVectorDouble, Rotator_1.Rotator.ZeroRotator, e.GamepadShakeConfig.IsLoop, 1, 0, r, true);
                if (!s.FeedbackComponent?.IsValid()) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake，创建FeedbackComponent失败", ["pbDataId", t]);
                  }
                  return;
                }
                var i;
                var r = new UE.TransformDouble(new UE.VectorDouble(o.Transform.Pos.X ?? 0, o.Transform.Pos.Y ?? 0, o.Transform.Pos.Z ?? 0));
                if (o.Transform.Rot) {
                  (i = Rotator_1.Rotator.Create()).Set(o.Transform.Rot?.Y ?? 0, o.Transform.Rot?.Z ?? 0, o.Transform.Rot?.X ?? 0);
                  r.SetRotation(new UE.Quat(i.ToUeRotator()));
                }
                const _ = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), r);
                if (!_) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake，创建Actor失败", ["pbDataId", t]);
                  }
                  return;
                }
                if (!_.GetComponentByClass(UE.SceneComponent.StaticClass())) {
                  _.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
                }
                _.D_K2_SetActorTransform(r, false, undefined, true);
                s.FeedbackComponent.K2_AttachToComponent(_.RootComponent, FNameUtil_1.FNameUtil.NONE, 2, 2, 2, true);
                if (GlobalData_1.GlobalData.IsPlayInEditor) {
                  _.SetActorLabel("GamepadShakeAttenuatedActor_" + ++GamepadController.Fkg);
                }
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake，触发了不跟随实体移动的距离衰减震动", ["pbDataId", t], ["ActorName", _.GetActorLabel()], ["ComponentRelativeLocation", s.FeedbackComponent.RelativeLocation]);
                }
                TimerSystem_1.TimerSystem.Delay(() => {
                  s.FeedbackComponent?.Stop();
                  ActorSystem_1.ActorSystem.Put("GamepadController.TriggerGamepadShakeEvent", _);
                }, e.GamepadShakeConfig.Duration * 1000);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake失败，找不到FeedbackAttenuationAsset", ["path", e.GamepadShakeConfig.ForceFeedbackAttenuation]);
            }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake失败，加载手柄震动资产失败");
      }
    }
  }
  static TriggerGamepadShakeByQte(e, a) {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(QTE_GAMEPAD_SHAKE);
    switch (e) {
      case 0:
      case 1:
        Global_1.Global.CharacterController?.PlayKuroForceFeedback(a, t, false, true, false);
        break;
      case 2:
      case 3:
        Global_1.Global.CharacterController?.PlayKuroForceFeedback(a, t, false, false, false);
    }
  }
  static StopQteGamepadShake(e, a) {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(QTE_GAMEPAD_SHAKE);
    Global_1.Global.CharacterController?.StopKuroForceFeedback(a, t);
  }
  static TriggerGamepadShakeByManipulatable(e) {
    var a = FNameUtil_1.FNameUtil.GetDynamicFName(MANIPULATABLE_GAMEPAD_SHAKE);
    Global_1.Global.CharacterController?.PlayKuroForceFeedback(e, a, false, false, false);
  }
  static StopManipulatableGamepadShake(e) {
    var a = FNameUtil_1.FNameUtil.GetDynamicFName(MANIPULATABLE_GAMEPAD_SHAKE);
    Global_1.Global.CharacterController?.StopKuroForceFeedback(e, a);
  }
  static async LoadGamepadShakeAsset(e) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.KuroForceFeedbackEffect, (e, a) => {
      t.SetResult(e);
    });
    return t.Promise;
  }
  static async QCg(e) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.ForceFeedbackAttenuation, (e, a) => {
      t.SetResult(e);
    });
    return t.Promise;
  }
}
(exports.GamepadController = GamepadController).XKt = [];
GamepadController.$Kt = [];
GamepadController.Y_d = new GamepadPsFeedbackData_1.GamepadPsFeedbackData();
GamepadController.K_d = new GamepadPsFeedbackModule_1.GamepadPsFeedbackModule();
GamepadController.cWm = new GamepadPsFeedbackListenTagModule_1.GamepadPsFeedbackListenTagModule();
GamepadController.Fkg = 0; //# sourceMappingURL=GamepadController.js.map