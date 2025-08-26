"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightExploreSkillLogic = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RouletteController_1 = require("../../../../../Module/Roulette/RouletteController");
const DEFAULT_HIGHLIGHT_TAG = "角色.Common.技能通用标识.探索技能高亮";
class HighlightExploreSkillLogic {
  constructor() {
    this.fzo = -2028614394;
    this.wmo = 1001;
    this.ETt = -1;
    this.pzo = false;
    this.vzo = false;
    this.Seh = 0;
    this.$su = false;
    this.TDe = undefined;
    this.Lie = undefined;
    this.tWr = () => {
      if (!(this.Seh < 0)) {
        if (this.Seh > TimerSystem_1.MAX_TIME) {
          this.Seh -= TimerSystem_1.MAX_TIME;
          this.TDe = TimerSystem_1.TimerSystem.Delay(this.tWr, TimerSystem_1.MAX_TIME);
        } else if (this.Seh < TimerSystem_1.MIN_TIME) {
          this.Mzo();
        } else {
          this.TDe = TimerSystem_1.TimerSystem.Delay(this.Mzo, this.Seh);
        }
      }
    };
    this.Mzo = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "高亮时间结束，玩家探索技能取消高亮", ["Id", this.wmo]);
      }
      this.Ezo(this.pzo);
    };
    this.Szo = () => {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === this.wmo) {
        if (this.wmo === 3001) {
          if (ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId === this.ETt) {
            this.NDc();
          } else {
            this.VDc();
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 79, "切换探索技能，玩家探索技能高亮", ["Id", this.wmo]);
          }
          this.NDc();
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "切换探索技能，玩家探索技能取消高亮", ["Id", this.wmo]);
        }
        this.VDc();
      }
    };
    this.yzo = (t, e, i) => {
      if (e === this.wmo - 1001 + 210001) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "使用高亮技能，玩家探索技能取消高亮", ["Id", this.wmo]);
        }
        this.Ezo(this.pzo);
      }
    };
  }
  Init(t) {
    if (this.Lie && this.vzo) {
      this.VDc();
      this.Lie = t;
      if (this.fzo) {
        this.NDc();
      }
    } else {
      this.Lie = t;
    }
  }
  Clear() {
    if (this.vzo) {
      this.Ezo();
    }
    this.Lie = undefined;
  }
  ShowHighlightExploreSkill(t, e, i, s, h, o) {
    var l;
    if (this.vzo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 37, "上一次高亮探索技能未结束", ["生效中SkillId", this.wmo], ["NewSkillId", t]);
      }
    } else if ((t !== 1013 || !ModelManager_1.ModelManager.GameModeModel.IsMulti) && (t !== 3001 || !!h) && (t === 3001 || !h)) {
      if (l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s ?? DEFAULT_HIGHLIGHT_TAG)) {
        this.fzo = l;
        this.wmo = t;
        this.ETt = h ?? -1;
        this.pzo = i ?? false;
        this.Seh = e * TimeUtil_1.TimeUtil.InverseMillisecond;
        this.$su = this.Seh < 0;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能高亮", ["Id", this.wmo]);
        }
        this.Izo(o ?? false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 37, "高亮探索技能对应Tag未注册,请检查", ["tagName", s]);
      }
    }
  }
  HideHighlightExploreSkill() {
    if (this.vzo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能取消高亮", ["Id", this.wmo]);
      }
      this.Ezo(this.pzo);
    }
  }
  NDc() {
    if (this.TDe !== undefined || this.$su) {
      if (this.Lie && !this.Lie.HasTag(this.fzo)) {
        this.Lie.AddTag(this.fzo);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "高亮持续时间已经结束，不再触发高亮", ["Id", this.wmo]);
    }
  }
  VDc() {
    if (this.Lie && this.Lie.HasTag(this.fzo)) {
      this.Lie.RemoveTag(this.fzo);
    }
  }
  Izo(t) {
    this.vzo = true;
    var e = this.pzo ? 1 : 0;
    if (!ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.wmo, e)) {
      if (this.wmo === 3001) {
        ControllerHolder_1.ControllerHolder.SpecialItemController.EquipSpecialItem(this.ETt, true, t, e);
      } else {
        RouletteController_1.RouletteController.ExploreSkillSetRequest(this.wmo);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "开始监听高亮事件", ["Id", this.wmo]);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.yzo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    this.tWr();
    if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === this.wmo) {
      this.NDc();
    }
  }
  Ezo(e = false) {
    this.vzo = false;
    this.VDc();
    if (e) {
      let t = true;
      if (this.wmo === 1013 && (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(225)) && e.IsFollowerEnable()) {
        t = false;
      }
      ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(1);
      if (t) {
        e = ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId();
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e);
      } else {
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.wmo, 0);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "停止监听高亮事件", ["Id", this.wmo]);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.yzo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    if (this.TDe && TimerSystem_1.TimerSystem.Has(this.TDe)) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this.Seh = 0;
  }
}
exports.HighlightExploreSkillLogic = HighlightExploreSkillLogic;
//# sourceMappingURL=HighlightExploreSkillLogic.js.map