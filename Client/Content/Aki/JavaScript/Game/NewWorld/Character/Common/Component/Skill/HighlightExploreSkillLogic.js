"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.HighlightExploreSkillLogic = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RouletteController_1 = require("../../../../../Module/Roulette/RouletteController"),
  DEFAULT_HIGHLIGHT_TAG = "角色.Common.技能通用标识.探索技能高亮";
class HighlightExploreSkillLogic {
  constructor() {
    this.fzo = -2028614394, this.wmo = 1001, this.ETt = -1, this.pzo = !1, this.vzo = !1, this.Seh = 0, this.iru = !1, this.TDe = void 0, this.Lie = void 0, this.tWr = () => {
      this.Seh < 0 || (this.Seh > TimerSystem_1.MAX_TIME ? (this.Seh -= TimerSystem_1.MAX_TIME, this.TDe = TimerSystem_1.TimerSystem.Delay(this.tWr, TimerSystem_1.MAX_TIME)) : this.Seh < TimerSystem_1.MIN_TIME ? this.Mzo() : this.TDe = TimerSystem_1.TimerSystem.Delay(this.Mzo, this.Seh))
    }, this.Mzo = () => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "高亮时间结束，玩家探索技能取消高亮", ["Id", this.wmo]), this.Ezo(this.pzo)
    }, this.Szo = () => {
      ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === this.wmo ? 3001 === this.wmo ? ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId === this.ETt ? this.NDc() : this.VDc() : (Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "切换探索技能，玩家探索技能高亮", ["Id", this.wmo]), this.NDc()) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "切换探索技能，玩家探索技能取消高亮", ["Id", this.wmo]), this.VDc())
    }, this.yzo = (t, e, i) => {
      e === this.wmo - 1001 + 210001 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "使用高亮技能，玩家探索技能取消高亮", ["Id", this.wmo]), this.Ezo(this.pzo))
    }
  }
  Init(t) {
    this.Lie && this.vzo ? (this.VDc(), this.Lie = t, this.fzo && this.NDc()) : this.Lie = t
  }
  Clear() {
    this.vzo && this.Ezo(), this.Lie = void 0
  }
  ShowHighlightExploreSkill(t, e, i, s, h, o) {
    var l;
    this.vzo ? Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 37, "上一次高亮探索技能未结束", ["生效中SkillId", this.wmo], ["NewSkillId", t]) : 1013 === t && ModelManager_1.ModelManager.GameModeModel.IsMulti || 3001 === t && !h || 3001 !== t && h || ((l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s ?? DEFAULT_HIGHLIGHT_TAG)) ? (this.fzo = l, this.wmo = t, this.ETt = h ?? -1, this.pzo = i ?? !1, this.Seh = e * TimeUtil_1.TimeUtil.InverseMillisecond, this.iru = this.Seh < 0, Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能高亮", ["Id", this.wmo]), this.Izo(o ?? !1)) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 37, "高亮探索技能对应Tag未注册,请检查", ["tagName", s]))
  }
  HideHighlightExploreSkill() {
    this.vzo && (Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "主动触发玩家探索技能取消高亮", ["Id", this.wmo]), this.Ezo(this.pzo))
  }
  NDc() {
    void 0 !== this.TDe || this.iru ? this.Lie && !this.Lie.HasTag(this.fzo) && this.Lie.AddTag(this.fzo) : Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "高亮持续时间已经结束，不再触发高亮", ["Id", this.wmo])
  }
  VDc() {
    this.Lie && this.Lie.HasTag(this.fzo) && this.Lie.RemoveTag(this.fzo)
  }
  Izo(t) {
    this.vzo = !0;
    var e = this.pzo ? 1 : 0;
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.wmo, e) || (3001 === this.wmo ? ControllerHolder_1.ControllerHolder.SpecialItemController.EquipSpecialItem(this.ETt, !0, t, e) : RouletteController_1.RouletteController.ExploreSkillSetRequest(this.wmo)), Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "开始监听高亮事件", ["Id", this.wmo]), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.yzo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo), this.tWr(), ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === this.wmo && this.NDc()
  }
  Ezo(e = !1) {
    if (this.vzo = !1, this.VDc(), e) {
      let t = !0;
      1013 === this.wmo && (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(224)) && e.IsFollowerEnable() && (t = !1), ModelManager_1.ModelManager.ExploreModel.ResetExplodeSkillId(1), t ? (e = ModelManager_1.ModelManager.ExploreModel.GetTopLayerExplodeSkillId(), RouletteController_1.RouletteController.ExploreSkillSetRequest(e)) : ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(this.wmo, 0)
    }
    Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 79, "停止监听高亮事件", ["Id", this.wmo]), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.yzo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo), this.TDe && TimerSystem_1.TimerSystem.Has(this.TDe) && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0), this.Seh = 0
  }
}
exports.HighlightExploreSkillLogic = HighlightExploreSkillLogic;
//# sourceMappingURL=HighlightExploreSkillLogic.js.map