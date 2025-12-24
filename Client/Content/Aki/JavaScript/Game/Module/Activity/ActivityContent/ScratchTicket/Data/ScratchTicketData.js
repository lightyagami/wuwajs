"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchTicketData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityData_1 = require("../../../ActivityData");
const ScratchTicketConditionData_1 = require("./ScratchTicketConditionData");
const ScratchTicketRoundData_1 = require("./ScratchTicketRoundData");
const SCRATCH_TICKET_RED_DOT_CACHE_KEY = 100;
class ScratchTicketData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.xol = [];
    this.Pol = [];
    this.Lo = undefined;
  }
  PhraseEx(t) {
    t = t.HS_;
    if (t !== undefined) {
      this.InitData(t);
    }
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  InitData(t) {
    this.Lo = ConfigManager_1.ConfigManager.ActivityScratchTicketConfig.GetScratchTicketConfig(this.Id);
    if (this.Lo !== undefined) {
      this.wol(t.EM_);
      this.Bol(t.IM_);
    }
  }
  wol(t) {
    if (!(this.xol.length > 0)) {
      this.xol = [];
      for (const e of t) {
        var i = new ScratchTicketRoundData_1.ScratchTicketRoundData();
        i.Init(e);
        this.xol.push(i);
      }
      this.xol.sort((t, i) => t.Config.PreRoundId - i.Config.PreRoundId);
      this.UpdateAllRoundState();
    }
  }
  UpdateAllRoundState() {
    for (let t = 0; t < this.xol.length; t++) {
      var i;
      var e = this.xol[t];
      if (t === 0) {
        e.UpdateRoundState(2);
      } else {
        i = this.xol[t - 1];
        e.UpdateRoundState(i.GetRoundState());
      }
    }
  }
  UpdateCellReward(t, i) {
    t = this.GetRoundDataById(t);
    if (t !== undefined) {
      t.UpdateCellDataReward(i.TM_);
      t.UpdateRemainReward(i.MM_);
      this.UpdateAllRoundState();
    }
  }
  Bol(t) {
    if (!(this.Pol.length > 0)) {
      this.Pol = [];
      for (const e of t) {
        var i = new ScratchTicketConditionData_1.ScratchTicketConditionData();
        i.Init(e);
        this.Pol.push(i);
      }
    }
  }
  RefreshConditionData(t) {
    for (const e of t) {
      var i = this.qol(e.s5n);
      if (i !== undefined) {
        i.RefreshCondition(e);
      }
    }
  }
  GetExDataRedPointShowState() {
    var t;
    return !this.ActivityHasClick() || (t = this.GetRemainCount(), this.HasRoundInProgress() && t > 0);
  }
  ActivityHasClick() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, SCRATCH_TICKET_RED_DOT_CACHE_KEY, 0, 0) === 1;
  }
  ClickRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, SCRATCH_TICKET_RED_DOT_CACHE_KEY, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetExDataFinishShowState() {
    return !!this.GetPreGuideQuestFinishState() && this.IsAllRoundFinish();
  }
  IsInit() {
    return this.xol.length > 0;
  }
  qol(t) {
    for (const i of this.Pol) {
      if (i.Id === t) {
        return i;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScratchTicket", 58, "ScratchTicketData无法获取条件id", ["id", t]);
    }
  }
  GetScratchCardActivityConfig() {
    return this.Lo;
  }
  GetRoundDataById(t) {
    for (const i of this.xol) {
      if (i.Id === t) {
        return i;
      }
    }
  }
  GetFirstProgressRoundDataIndex() {
    var i = this.xol.length;
    if (i <= 0) {
      return -1;
    }
    for (let t = 0; t < i; t++) {
      if (this.xol[t].GetRoundState() !== 2) {
        return t;
      }
    }
    return i - 1;
  }
  GetRoundDataIndex(i) {
    for (let t = 0; t < this.xol.length; t++) {
      if (this.xol[t] === i) {
        return t;
      }
    }
    return -1;
  }
  GetFirstProgressRoundData() {
    var t = this.GetFirstProgressRoundDataIndex();
    if (!(t < 0)) {
      return this.xol[t];
    }
  }
  GetRoundDataList() {
    return this.xol;
  }
  GetConditionDataList() {
    return this.Pol;
  }
  IsAllRoundFinish() {
    for (const t of this.xol) {
      if (t.GetRoundState() !== 2) {
        return false;
      }
    }
    return true;
  }
  HasRoundInProgress() {
    for (const t of this.xol) {
      if (t.GetRoundState() === 1) {
        return true;
      }
    }
    return false;
  }
  GetRemainCount() {
    var t = this.Lo.ItemId;
    return ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
  }
  GetCostItemId() {
    return this.Lo.ItemId;
  }
}
exports.ScratchTicketData = ScratchTicketData;
//# sourceMappingURL=ScratchTicketData.js.map