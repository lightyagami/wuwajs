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
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const RouletteController_1 = require("../../../../../Module/Roulette/RouletteController");
const DEFAULT_HIGHLIGHT_TAG = "角色.Common.技能通用标识.探索技能高亮";
class HighlightExploreSkillLogic {
  constructor() {
    this.Flg = -2028614394;
    this.Qng = 1001;
    this.ETt = -1;
    this.$lg = false;
    this.Kng = false;
    this.r1t = 0;
    this.TDe = undefined;
    this.Xte = undefined;
    this._tg = undefined;
    this.tGo = () => {
      if (!(this.r1t < 0)) {
        if (this.r1t > TimerSystem_1.MAX_TIME) {
          this.TDe = TimerSystem_1.TimerSystem.Delay(this.tGo, TimerSystem_1.MAX_TIME);
        } else if (this.r1t < TimerSystem_1.MIN_TIME) {
          this.Mzo();
        } else {
          this.TDe = TimerSystem_1.TimerSystem.Delay(this.Mzo, this.r1t);
        }
      }
    };
    this.Mzo = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "高亮时间结束，玩家探索技能取消高亮", ["Id", this.Qng]);
      }
      this.Ezo(this.$lg);
    };
    this.Szo = () => {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === this.Qng) {
        if (this.Qng === 3001) {
          if (ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId === this.ETt) {
            this.NDc();
          } else {
            this.VDc();
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 79, "切换探索技能，玩家探索技能高亮", ["Id", this.Qng]);
          }
          this.NDc();
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "切换探索技能，玩家探索技能取消高亮", ["Id", this.Qng]);
        }
        this.VDc();
      }
    };
    this.yzo = (t, e, i) => {
      let s = this.Qng - 1001 + 210001;
      if (e === (s = e !== s && (e = PhantomUtil_1.PhantomUtil.GetVisionData(this.Qng)) ? e.技能ID : s)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "使用高亮技能，玩家探索技能取消高亮", ["Id", this.Qng]);
        }
        this.Ezo(this.$lg);
      }
    };
  }
  Init(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, t.LogKey + "高亮模块初始化", ["EntityId", t.Entity.Id]);
    }
    this._tg = t;
    if (this.Xte?.HasTag(this.Flg)) {
      this.Xte.RemoveTag(this.Flg);
      t.TagComponent?.AddTag(this.Flg);
    }
    this.Xte = t.TagComponent;
  }
  Dispose() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, this._tg?.LogKey + "高亮模块清理", ["EntityId", this._tg?.Entity.Id]);
    }
    if (this.Kng) {
      this.Ezo(true);
    }
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this._tg = undefined;
    this.Xte = undefined;
  }
  GetHighlightSkillId() {
    var t;
    if (this.Kng && (t = PhantomUtil_1.PhantomUtil.GetVisionData(this.Qng)) && t.类型 === 2) {
      return t.技能ID;
    } else {
      return 0;
    }
  }
  GetHighlightExploreToolId() {
    if (this.Kng) {
      return this.Qng;
    } else {
      return 0;
    }
  }
  ShowHighlightExploreSkill(t, e, i, s, h, o) {
    var l;
    if (this.Kng) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "上一次高亮探索技能未结束", ["当前ExploreToolId", this.Qng], ["高亮ExploreToolId", t]);
      }
    } else if ((t !== 1013 || !ModelManager_1.ModelManager.GameModeModel.IsMulti) && (t !== 3001 || !!h) && (t === 3001 || !h)) {
      if (l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s ?? DEFAULT_HIGHLIGHT_TAG)) {
        if (ModelManager_1.ModelManager.RouletteModel.GetCurrentExploreRouletteListData().IsExploreSkillIdAllowEquip(t)) {
          if (this._tg.CheckAllowLevelEventHighlightSkill()) {
            this.Flg = l;
            this.Qng = t;
            this.ETt = h ?? -1;
            this.$lg = i ?? false;
            this.r1t = e > 0 ? e * TimeUtil_1.TimeUtil.InverseMillisecond : -1;
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能高亮", ["Id", t]);
            }
            this.Izo(o ?? false);
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 79, "尝试高亮技能失败, CheckAllowLevelEventHighlightSkill判定不通过", ["Id", t]);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "尝试高亮的探索技能禁止在当前轮盘类型装配", ["Id", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 79, "高亮探索技能对应Tag未注册,请检查", ["tagName", s]);
      }
    }
  }
  HideHighlightExploreSkill() {
    if (this.Kng) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能取消高亮", ["Id", this.Qng]);
      }
      this.Ezo(this.$lg);
    }
  }
  NDc() {
    if (this.Xte && !this.Xte.HasTag(this.Flg)) {
      this.Xte.AddTag(this.Flg);
    }
  }
  VDc() {
    if (this.Xte && this.Xte.HasTag(this.Flg)) {
      this.Xte.RemoveTag(this.Flg);
    }
  }
  Izo(t) {
    this.Kng = true;
    this._tg.OnLevelEventHighlightSkillUpdate(true);
    var e = this.$lg ? 2 : 0;
    if (ModelManager_1.ModelManager.ExploreModel.CheckNeedChangeSkill(this.Qng, e)) {
      if (this.Qng === 3001) {
        ControllerHolder_1.ControllerHolder.SpecialItemController.EquipSpecialItem(this.ETt, true, t, e);
      } else {
        RouletteController_1.RouletteController.ExploreSkillSetRequest(this.Qng);
      }
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.Qng, e, "触发技能高亮");
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "开始监听高亮事件", ["Id", this.Qng]);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.yzo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    this.NDc();
    this.tGo();
  }
  Ezo(e) {
    this.Kng = false;
    this._tg.OnLevelEventHighlightSkillUpdate(false);
    this.VDc();
    if (e) {
      let t = true;
      if (this.Qng === 1013 && (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(237)) && e.IsFollowerEnable()) {
        t = false;
      }
      ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(2, "OnHideHighlightExploreSkill");
      if (t) {
        e = ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId();
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e);
      } else {
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.Qng, 0, "取消技能高亮");
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "停止监听高亮事件", ["Id", this.Qng]);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.yzo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    if (this.TDe && TimerSystem_1.TimerSystem.Has(this.TDe)) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this.r1t = 0;
  }
}
exports.HighlightExploreSkillLogic = HighlightExploreSkillLogic;
//# sourceMappingURL=HighlightExploreSkillLogic.js.map