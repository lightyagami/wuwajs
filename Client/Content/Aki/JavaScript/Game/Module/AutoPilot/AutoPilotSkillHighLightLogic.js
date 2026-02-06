"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotSkillHighLightLogic = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const PhantomUtil_1 = require("../Phantom/PhantomUtil");
class AutoPilotSkillHighLightLogic {
  constructor() {
    this.Qng = 6001;
    this.t$g = 6001;
    this.Flg = -139436970;
    this.Kng = false;
    this.TDe = undefined;
    this.tGo = () => {
      this.TDe = TimerSystem_1.TimerSystem.Delay(this.Mzo, ModelManager_1.ModelManager.AutoPilotModel.GetSkillHighLightTime() * TimeUtil_1.TimeUtil.InverseMillisecond);
    };
    this.Mzo = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "高亮时间结束，玩家探索技能取消高亮");
      }
      this.Ezo();
    };
    this.Szo = () => {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === this.Qng) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AutoPilot", 87, "切换探索技能，玩家探索技能高亮");
        }
        this.NDc();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AutoPilot", 87, "切换探索技能，玩家探索技能取消高亮");
        }
        this.VDc();
      }
    };
    this.yzo = (t, i, e) => {
      var o = PhantomUtil_1.PhantomUtil.GetVisionData(this.Qng);
      if (o && i === o.技能ID) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AutoPilot", 87, "使用高亮技能，玩家探索技能取消高亮", ["Id", this.Qng]);
        }
        this.Ezo();
      }
    };
  }
  jm() {
    if (this.TDe && TimerSystem_1.TimerSystem.Has(this.TDe)) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  Dispose() {
    if (this.Kng) {
      this.Ezo();
    }
    this.jm();
  }
  ShowHighlightExploreSkill() {
    if (this.Kng) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "上一次高亮探索技能未结束");
      }
    } else {
      this.t$g = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "主动触发玩家探索技能高亮");
      }
      this.Izo();
    }
  }
  HideHighlightExploreSkill() {
    if (this.Kng) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "主动触发玩家探索技能取消高亮");
      }
      this.Ezo();
    }
  }
  NDc() {
    var t = ModelManager_1.ModelManager.AutoPilotModel.VehicleEntity?.GetComponent(217);
    if (t && !t.HasTag(this.Flg)) {
      t.AddTag(this.Flg);
    }
  }
  VDc() {
    var t = ModelManager_1.ModelManager.AutoPilotModel.VehicleEntity?.GetComponent(217);
    if (t && t.HasTag(this.Flg)) {
      t.RemoveTag(this.Flg);
    }
  }
  Izo() {
    this.Kng = true;
    ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(this.Qng);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.yzo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    this.NDc();
    this.tGo();
  }
  Ezo() {
    this.Kng = false;
    this.VDc();
    ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(this.t$g);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.yzo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    this.jm();
  }
}
exports.AutoPilotSkillHighLightLogic = AutoPilotSkillHighLightLogic;
//# sourceMappingURL=AutoPilotSkillHighLightLogic.js.map