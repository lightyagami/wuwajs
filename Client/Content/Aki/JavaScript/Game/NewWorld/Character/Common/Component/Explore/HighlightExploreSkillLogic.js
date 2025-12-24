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
    this.kKf = -2028614394;
    this.jWf = 1001;
    this.ETt = -1;
    this.NKf = false;
    this.$Wf = false;
    this.r1t = 0;
    this.TDe = undefined;
    this.Xte = undefined;
    this.P7f = undefined;
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
        Log_1.Log.Info("LevelEvent", 79, "高亮时间结束，玩家探索技能取消高亮", ["Id", this.jWf]);
      }
      this.Ezo(this.NKf);
    };
    this.Szo = () => {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === this.jWf) {
        if (this.jWf === 3001) {
          if (ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId === this.ETt) {
            this.NDc();
          } else {
            this.VDc();
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 79, "切换探索技能，玩家探索技能高亮", ["Id", this.jWf]);
          }
          this.NDc();
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "切换探索技能，玩家探索技能取消高亮", ["Id", this.jWf]);
        }
        this.VDc();
      }
    };
    this.yzo = (t, e, i) => {
      let s = this.jWf - 1001 + 210001;
      if (e === (s = e !== s && (e = PhantomUtil_1.PhantomUtil.GetVisionData(this.jWf)) ? e.技能ID : s)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 79, "使用高亮技能，玩家探索技能取消高亮", ["Id", this.jWf]);
        }
        this.Ezo(this.NKf);
      }
    };
  }
  Init(t) {
    this.P7f = t;
    if (this.Xte?.HasTag(this.kKf)) {
      this.Xte.RemoveTag(this.kKf);
      t.TagComponent?.AddTag(this.kKf);
    }
    this.Xte = t.TagComponent;
  }
  Dispose() {
    if (this.$Wf) {
      this.Ezo(true);
    }
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this.P7f = undefined;
    this.Xte = undefined;
  }
  GetHighlightSkillId() {
    var t;
    if (this.$Wf && (t = PhantomUtil_1.PhantomUtil.GetVisionData(this.jWf)) && t.类型 === 2) {
      return t.技能ID;
    } else {
      return 0;
    }
  }
  ShowHighlightExploreSkill(t, e, i, s, h, o) {
    var l;
    if (this.$Wf) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "上一次高亮探索技能未结束", ["当前ExploreToolId", this.jWf], ["高亮ExploreToolId", t]);
      }
    } else if ((t !== 1013 || !ModelManager_1.ModelManager.GameModeModel.IsMulti) && (t !== 3001 || !!h) && (t === 3001 || !h)) {
      if (l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s ?? DEFAULT_HIGHLIGHT_TAG)) {
        if (ModelManager_1.ModelManager.RouletteModel.GetCurrentExploreRouletteListData().IsExploreSkillIdAllowEquip(t)) {
          if (this.P7f.CheckAllowLevelEventHighlightSkill()) {
            this.kKf = l;
            this.jWf = t;
            this.ETt = h ?? -1;
            this.NKf = i ?? false;
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
    if (this.$Wf) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能取消高亮", ["Id", this.jWf]);
      }
      this.Ezo(this.NKf);
    }
  }
  NDc() {
    if (this.Xte && !this.Xte.HasTag(this.kKf)) {
      this.Xte.AddTag(this.kKf);
    }
  }
  VDc() {
    if (this.Xte && this.Xte.HasTag(this.kKf)) {
      this.Xte.RemoveTag(this.kKf);
    }
  }
  Izo(t) {
    this.$Wf = true;
    this.P7f.OnLevelEventHighlightSkillUpdate(true);
    var e = this.NKf ? 1 : 0;
    if (ModelManager_1.ModelManager.ExploreModel.CheckNeedChangeSkill(this.jWf, e)) {
      if (this.jWf === 3001) {
        ControllerHolder_1.ControllerHolder.SpecialItemController.EquipSpecialItem(this.ETt, true, t, e);
      } else {
        RouletteController_1.RouletteController.ExploreSkillSetRequest(this.jWf);
      }
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.jWf, e, "触发技能高亮");
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "开始监听高亮事件", ["Id", this.jWf]);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.yzo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    this.NDc();
    this.tGo();
  }
  Ezo(e) {
    this.$Wf = false;
    this.P7f.OnLevelEventHighlightSkillUpdate(false);
    this.VDc();
    if (e) {
      let t = true;
      if (this.jWf === 1013 && (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(237)) && e.IsFollowerEnable()) {
        t = false;
      }
      ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(1, "OnHideHighlightExploreSkill");
      if (t) {
        e = ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId();
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e);
      } else {
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.jWf, 0, "取消技能高亮");
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 79, "停止监听高亮事件", ["Id", this.jWf]);
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