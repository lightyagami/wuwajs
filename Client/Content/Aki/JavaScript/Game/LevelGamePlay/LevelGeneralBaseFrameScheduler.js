"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGeneralBaseFrameScheduler = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../Common/Event/EventDefine");
const LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine");
const MAX_ACTION_PER_FRAME_LEVEL_1 = 10;
const MAX_ACTION_PER_FRAME_LEVEL_2 = 20;
const MAX_ACTION_PER_FRAME_LEVEL_3 = 40;
const FRAME_LIMIT_LEVEL_1 = 30;
const FRAME_LIMIT_LEVEL_2 = 60;
const MAX_ACTION_QUEUE_LENGTH = 100;
const LOW_PRIORITY_ACTION_ALIVE_FRAME = 30;
class LevelGeneralBaseFrameScheduler {
  static get kbm() {
    if (this.qbm === 0) {
      this.OnSettingFrameRateChanged(UE.GameUserSettings.GetGameUserSettings().GetFrameRateLimit());
    }
    return this.qbm;
  }
  static PushActionToFrameScheduler(e, t, i, _) {
    if (!this.FrameSchedulerEnabled) {
      return false;
    }
    if (!(i instanceof LevelGeneralContextDefine_1.CombinationContext)) {
      return false;
    }
    var n = i.GetContextByType(10)?.EventName;
    if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "LevelEvent行为是否分帧", ["EventName", n], ["是否分帧", n && this.Obm.has(n)], ["普通分帧任务队列长度", this.Gbm.length], ["低优先级分帧队列长度", this.Fbm.length]);
    }
    if (!n || !this.Obm.has(n)) {
      return false;
    }
    const r = i.GetContextByType(1);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 79, "CombinationContext不合法, 内部必须包含EntityContext", ["InParams", t], ["Context", i], ["ActionId", _]);
      }
      return false;
    }
    if (r.EntityId && EntitySystem_1.EntitySystem.GetComponent(r.EntityId, 0)?.GetPbModelConfig()?.EntityType === "MusicListener") {
      if (this.Fbm.length > this.Qwm) {
        if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelEvent", 79, "LevelEvent分帧任务超过最大容量, 需要关注", ["EventName", n]);
        }
        return false;
      } else {
        this.Fbm.push({
          FrameEnqueued: Time_1.Time.Frame,
          Action: () => {
            e.ExecuteNew(t, r, _);
          }
        });
        if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "LevelEvent行为进入低优先级分帧队列", ["EventName", n], ["低优先级分帧队列长度", this.Fbm.length]);
        }
        return true;
      }
    }
    if (this.Gbm.length > MAX_ACTION_QUEUE_LENGTH) {
      if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelEvent", 79, "LevelEvent分帧任务超过最大容量, 需要关注", ["EventName", n]);
      }
      return false;
    } else {
      this.Gbm.push(() => {
        e.ExecuteNew(t, r, _);
      });
      if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "LevelEvent行为进入普通分帧队列", ["EventName", n], ["分帧队列长度", this.Gbm.length]);
      }
      return true;
    }
  }
  static UpdateActionFrameScheduler() {
    while (this.Gbm.length > 0 && this.Nbm < this.kbm) {
      this.Gbm.shift()?.();
      this.Nbm++;
      if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "执行普通分帧队列任务LevelEvent行为", ["当前帧已执行任务数", this.Nbm], ["每帧最大任务数", this.kbm]);
      }
    }
    while (this.Fbm.length > 0 && this.Nbm < this.kbm) {
      var e = this.Fbm.shift();
      if (!e) {
        return;
      }
      if (Time_1.Time.Frame - e.FrameEnqueued > LOW_PRIORITY_ACTION_ALIVE_FRAME) {
        if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "低优先级分帧队列任务超出生命周期, 直接丢弃", ["行为入队帧", e.FrameEnqueued], ["当前帧", Time_1.Time.Frame]);
        }
      } else {
        e.Action?.();
        this.Nbm++;
        if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "执行低优先级分帧队列任务LevelEvent行为", ["当前帧已执行任务数", this.Nbm], ["每帧最大任务数", this.kbm]);
        }
      }
    }
    this.Nbm = 0;
  }
  static ClearActionFrameScheduler() {
    if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "离开场景前清理积压的LevelEvent分帧任务", ["分帧任务队列长度", this.Gbm.length]);
    }
    this.Nbm = 0;
    this.Gbm.length = 0;
  }
  static OnSettingFrameRateChanged(e) {
    if (e <= FRAME_LIMIT_LEVEL_1) {
      this.qbm = MAX_ACTION_PER_FRAME_LEVEL_1;
    } else if (e <= FRAME_LIMIT_LEVEL_2) {
      this.qbm = MAX_ACTION_PER_FRAME_LEVEL_2;
    } else {
      this.qbm = MAX_ACTION_PER_FRAME_LEVEL_3;
    }
  }
  static UpdateMaxActionPerFrame(e) {
    this.qbm = e;
  }
  static UpdateMaxActionQueueLength(e) {
    this.Qwm = e;
  }
}
(exports.LevelGeneralBaseFrameScheduler = LevelGeneralBaseFrameScheduler).Obm = new Set([EventDefine_1.EEventName.CheckMusicBeatsEvent]);
LevelGeneralBaseFrameScheduler.Gbm = [];
LevelGeneralBaseFrameScheduler.Fbm = [];
LevelGeneralBaseFrameScheduler.qbm = 0;
LevelGeneralBaseFrameScheduler.Qwm = MAX_ACTION_QUEUE_LENGTH;
LevelGeneralBaseFrameScheduler.Nbm = 0;
LevelGeneralBaseFrameScheduler.FrameSchedulerLogEnabled = false;
LevelGeneralBaseFrameScheduler.FrameSchedulerEnabled = true; //# sourceMappingURL=LevelGeneralBaseFrameScheduler.js.map