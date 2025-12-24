"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayMontage = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const DEFAULT_WAIT_ENTITY_TIMEOUT = 10000;
class LevelEventPlayMontage extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.sDe = undefined;
    this.gLe = undefined;
    this.zpe = (e, t) => {
      if (this.sDe === t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 26, "实体被移除,PlayMontage保底结束", ["PbDataId", t.PbDataId]);
        }
        if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
        }
        this.FinishExecute(true);
      }
    };
    this.ej_ = () => {
      if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
      this.FinishExecute(true);
    };
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t) {
    if (e) {
      if (e.ActionMontage.MontageType !== "Normal" || StringUtils_1.StringUtils.IsEmpty(e.ActionMontage.Path)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 50, "[LevelEventPlayMontage]蒙太奇类型错误或路径为空", ["MontageType", e.ActionMontage.MontageType], ["Path", e.ActionMontage.Path]);
        }
        this.FinishExecute(false);
      } else {
        this.E0 = e.EntityId;
        this.gLe = e;
        if (!this.E0 && t.Type === 1) {
          e = EntitySystem_1.EntitySystem.Get(t.EntityId ?? 0)?.GetComponent(1)?.CreatureData.GetPbDataId();
          if (!e) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 50, "[LevelEventPlayMontage] 无法从行为上下文中获取PbDataId", ["EntityId", t.EntityId]);
            }
            this.FinishExecute(false);
            return;
          }
          this.E0 = e;
        }
        if (this.E0) {
          this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.E0);
          if (this.sDe?.Entity?.IsInit) {
            this.zCa();
          } else {
            WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelEventPlayMontage.ExecuteNew", this.E0, e => {
              if (e) {
                this.zCa();
              } else {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Event", 50, "[LevelEventPlayMontage] 等待实体加载超时", ["PbDataId", this.E0], ["Timeout", DEFAULT_WAIT_ENTITY_TIMEOUT]);
                }
                this.FinishExecute(false);
              }
            }, DEFAULT_WAIT_ENTITY_TIMEOUT, false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 50, "[LevelEventPlayMontage] 无法获取执行Montage的实体", ["PbDataId", this.E0]);
          }
          this.FinishExecute(false);
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 50, "[LevelEventPlayMontage]关卡事件参数为空");
      }
      this.FinishExecute(false);
    }
  }
  zCa() {
    var e;
    var t;
    var i;
    this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.E0);
    if (this.sDe?.Valid) {
      if (this.sDe.Entity.GetComponent(48)?.IsAiDriver) {
        e = this.sDe.Entity.GetComponent(1);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "当前实体正在由行为树AI驱动，请检查需求设计是否合理（播放蒙太奇动画）", ["PbDataId", this.E0], ["Name", e.Owner.GetName()]);
        }
        this.FinishExecute(true);
      } else {
        e = this.sDe.Entity?.GetComponent(47);
        t = this.sDe.Entity?.GetComponent(45);
        if (e || t) {
          i = this.gLe.Duration === undefined || this.gLe.Duration >= 0 && this.gLe.Duration < TimerSystem_1.MIN_TIME;
          if (this.IsAsync) {
            if (e) {
              e.PlayPerformMontage(2, {
                MontagePath: this.gLe.ActionMontage.Path,
                IsLoop: !i,
                Duration: this.gLe.Duration
              });
            } else {
              t.MontageManager.PlayMontage({
                MontagePath: this.gLe.ActionMontage.Path,
                IsLoop: !i,
                Duration: this.gLe.Duration
              });
            }
            this.FinishExecute(true);
          } else {
            EventSystem_1.EventSystem.AddWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
            if (e) {
              e.PlayPerformMontage(2, {
                MontagePath: this.gLe.ActionMontage.Path,
                IsLoop: !i,
                Duration: this.gLe.Duration,
                OnEndCallback: this.ej_
              });
            } else {
              t.MontageManager.PlayMontage({
                MontagePath: this.gLe.ActionMontage.Path,
                IsLoop: !i,
                Duration: this.gLe.Duration,
                OnEndCallback: this.ej_
              });
            }
          }
        } else {
          this.FinishExecute(true);
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 50, "播放蒙太奇时找不到Entity", ["PbDataId", this.E0]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventPlayMontage = LevelEventPlayMontage;
//# sourceMappingURL=LevelEventPlayMontage.js.map