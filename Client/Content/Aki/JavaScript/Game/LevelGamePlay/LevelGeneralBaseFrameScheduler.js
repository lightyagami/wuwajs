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
  static get jpm() {
    if (this.Hpm === 0) {
      this.OnSettingFrameRateChanged(UE.GameUserSettings.GetGameUserSettings().GetFrameRateLimit());
    }
    return this.Hpm;
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
      Log_1.Log.Info("LevelEvent", 79, "LevelEvent行为是否分帧", ["EventName", n], ["是否分帧", n && this.$pm.has(n)], ["普通分帧任务队列长度", this.Wpm.length], ["低优先级分帧队列长度", this.Qpm.length]);
    }
    if (!n || !this.$pm.has(n)) {
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
      if (this.Qpm.length > this.xvm) {
        if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelEvent", 79, "LevelEvent分帧任务超过最大容量, 需要关注", ["EventName", n]);
        }
        return false;
      } else {
        this.Qpm.push({
          FrameEnqueued: Time_1.Time.Frame,
          Action: () => {
            e.ExecuteNew(t, r, _);
          }
        });
        if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "LevelEvent行为进入低优先级分帧队列", ["EventName", n], ["低优先级分帧队列长度", this.Qpm.length]);
        }
        return true;
      }
    }
    if (this.Wpm.length > MAX_ACTION_QUEUE_LENGTH) {
      if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelEvent", 79, "LevelEvent分帧任务超过最大容量, 需要关注", ["EventName", n]);
      }
      return false;
    } else {
      this.Wpm.push(() => {
        e.ExecuteNew(t, r, _);
      });
      if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "LevelEvent行为进入普通分帧队列", ["EventName", n], ["分帧队列长度", this.Wpm.length]);
      }
      return true;
    }
  }
  static UpdateActionFrameScheduler() {
    while (this.Wpm.length > 0 && this.Kpm < this.jpm) {
      this.Wpm.shift()?.();
      this.Kpm++;
      if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "执行普通分帧队列任务LevelEvent行为", ["当前帧已执行任务数", this.Kpm], ["每帧最大任务数", this.jpm]);
      }
    }
    while (this.Qpm.length > 0 && this.Kpm < this.jpm) {
      var e = this.Qpm.shift();
      if (!e) {
        return;
      }
      if (Time_1.Time.Frame - e.FrameEnqueued > LOW_PRIORITY_ACTION_ALIVE_FRAME) {
        if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "低优先级分帧队列任务超出生命周期, 直接丢弃", ["行为入队帧", e.FrameEnqueued], ["当前帧", Time_1.Time.Frame]);
        }
      } else {
        e.Action?.();
        this.Kpm++;
        if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "执行低优先级分帧队列任务LevelEvent行为", ["当前帧已执行任务数", this.Kpm], ["每帧最大任务数", this.jpm]);
        }
      }
    }
    this.Kpm = 0;
  }
  static ClearActionFrameScheduler() {
    if (this.FrameSchedulerLogEnabled && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "离开场景前清理积压的LevelEvent分帧任务", ["分帧任务队列长度", this.Wpm.length]);
    }
    this.Kpm = 0;
    this.Wpm.length = 0;
  }
  static OnSettingFrameRateChanged(e) {
    if (e <= FRAME_LIMIT_LEVEL_1) {
      this.Hpm = MAX_ACTION_PER_FRAME_LEVEL_1;
    } else if (e <= FRAME_LIMIT_LEVEL_2) {
      this.Hpm = MAX_ACTION_PER_FRAME_LEVEL_2;
    } else {
      this.Hpm = MAX_ACTION_PER_FRAME_LEVEL_3;
    }
  }
  static UpdateMaxActionPerFrame(e) {
    this.Hpm = e;
  }
  static UpdateMaxActionQueueLength(e) {
    this.xvm = e;
  }
}
(exports.LevelGeneralBaseFrameScheduler = LevelGeneralBaseFrameScheduler).$pm = new Set([EventDefine_1.EEventName.CheckMusicBeatsEvent]);
LevelGeneralBaseFrameScheduler.Wpm = [];
LevelGeneralBaseFrameScheduler.Qpm = [];
LevelGeneralBaseFrameScheduler.Hpm = 0;
LevelGeneralBaseFrameScheduler.xvm = MAX_ACTION_QUEUE_LENGTH;
LevelGeneralBaseFrameScheduler.Kpm = 0;
LevelGeneralBaseFrameScheduler.FrameSchedulerLogEnabled = false;
LevelGeneralBaseFrameScheduler.FrameSchedulerEnabled = true; //# sourceMappingURL=LevelGeneralBaseFrameScheduler.js.map