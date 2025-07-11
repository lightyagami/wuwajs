"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayDynamicSettlement = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GameplayCueController_1 = require("../../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const UiManager_1 = require("../../Ui/UiManager");
const PreloadConstants_1 = require("../../World/Controller/PreloadConstants");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const SCREEN_EFFECT_CUE_ID = 10010092;
class LevelEventPlayDynamicSettlement extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.j3 = undefined;
    this.$De = new Map();
    this.YDe = true;
    this.wQl = 0;
    this.Wsu = GameplayCueController_1.INVALID_CUE_HANDLE;
    this.BZ1 = undefined;
    this.I5l = "Battle";
    this.uK1 = undefined;
    this.JDe = () => {
      if (this.YDe) {
        this.YDe = false;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 17, "主界面打开，战斗结算效果继续执行");
        }
        if (this.j3) {
          TimerSystem_1.TimerSystem.Resume(this.j3);
          ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement = true;
          ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleSettlementStateChanged, true);
        } else {
          this.zDe();
        }
      }
    };
    this.ZDe = () => {
      if (!this.YDe) {
        this.YDe = true;
        if (this.j3) {
          TimerSystem_1.TimerSystem.Pause(this.j3);
          ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement = false;
          ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("LevelEvent", 17, "主界面关闭，战斗结算效果暂停");
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleSettlementStateChanged, false);
        }
      }
    };
    this.FQe = e => {
      if (e === "FlySettlementView") {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
        this.eRe();
      }
    };
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(t, e) {
    if (t) {
      t = t.DynamicSettlementConfig;
      this.I5l = t.Type;
      let e = 0;
      var i;
      if (t && (i = t.GamePlayCue)) {
        e = i;
      }
      this.wQl = e > 0 ? e : SCREEN_EFFECT_CUE_ID;
      this.uK1 = t.BgmType;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 17, "战斗结算效果开始");
      }
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
      if (UiManager_1.UiManager.IsViewShow("BattleView")) {
        this.zDe();
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 17, "当前不在主界面，延后执行战斗结算效果");
        }
        this.YDe = true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 17, "战斗结算镜头效果参数不合法");
      }
      this.FinishExecute(false);
    }
  }
  zDe() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(1, [16]);
    ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement = true;
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.PlaySettlementCamera(this.I5l);
    var e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH, UE.CurveFloat);
    this.tRe(e);
    ControllerHolder_1.ControllerHolder.DamageUiController.SetDamageTimeScaleEnable(true);
    var e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    if (e && (this.wQl !== 0 && (this.BZ1 = e.GetComponent(21), this.BZ1) && (this.Wsu = this.BZ1.AddCue(this.wQl)), e = e.GetComponent(62))) {
      e.ClearInputCache(0, 0);
    }
    if (this.uK1 === "BattleSoundWave") {
      AudioSystem_1.AudioSystem.SetState("plot_phantom_arena_battle_state", "ending");
    } else if (e = CommonParamById_1.configCommonParamById.GetStringConfig("BattleSettlementAudioEvent")) {
      AudioSystem_1.AudioSystem.PostEvent(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleSettlementStateChanged, true);
    switch (this.I5l) {
      case "Battle":
        this.z8l();
        if (this.IsAsync) {
          this.FinishExecute(true);
        }
        break;
      case "SoaringChallenge":
        if (this.IsAsync) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
          this.FinishExecute(true);
        } else {
          this.z8l();
        }
    }
  }
  tRe(e) {
    if (Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) {
      var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
      if (t) {
        var i = CommonParamById_1.configCommonParamById.GetIntConfig("BattleSettlementTimeScaleRadius");
        var o = CommonParamById_1.configCommonParamById.GetIntConfig("BattleSettlementTimeScalePriority");
        var r = CommonParamById_1.configCommonParamById.GetFloatConfig("BattleSettlementTimeDilation");
        var n = CommonParamById_1.configCommonParamById.GetFloatConfig("BattleSettlementTimeScaleDuration");
        var a = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
        if (a) {
          for (const l of a) {
            this.iRe(l, t, i, o, r, e, n);
          }
        }
        for (const s of ModelManager_1.ModelManager.CreatureModel.DelayRemoveContainer.GetAllEntities()) {
          this.iRe(s, t, i, o, r, e, n);
        }
        ModelManager_1.ModelManager.BulletModel.SetAllBulletTimeScale(t, i, o, r, e, n, true);
      }
    }
  }
  iRe(e, t, i, o, r, n, a) {
    var l;
    var s;
    if (e?.Valid && (s = e.Entity)?.IsInit && (l = s.GetComponent(122)) && (s = s.GetComponent(1)?.ActorLocationProxy) && Math.abs(s.X - t.X) <= i && Math.abs(s.Y - t.Y) <= i && Math.abs(s.Z - t.Z) <= i) {
      s = l.SetTimeScale(o, r, n, a, 5);
      this.$De.set(e, s);
    }
  }
  z8l() {
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig("BattleSettlementTime") * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.j3 = undefined;
      this.eRe();
      this.FinishExecute(true);
    }, e);
  }
  eRe() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
    ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement = false;
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
    this.$De.clear();
    ControllerHolder_1.ControllerHolder.DamageUiController.SetDamageTimeScaleEnable(false);
    if (this.Wsu !== GameplayCueController_1.INVALID_CUE_HANDLE) {
      this.BZ1?.RemoveCueByHandle(this.Wsu);
      this.Wsu = GameplayCueController_1.INVALID_CUE_HANDLE;
      this.BZ1 = undefined;
    }
    this.wQl = 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 17, "战斗结算效果结束");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleSettlementStateChanged, false);
  }
  Release() {
    super.Release();
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
      this.eRe();
    }
    if (this.uK1 === "BattleSoundWave") {
      AudioSystem_1.AudioSystem.SetState("plot_phantom_arena_battle_state", "none");
    }
  }
}
exports.LevelEventPlayDynamicSettlement = LevelEventPlayDynamicSettlement;
//# sourceMappingURL=LevelEventPlayDynamicSettlement.js.map