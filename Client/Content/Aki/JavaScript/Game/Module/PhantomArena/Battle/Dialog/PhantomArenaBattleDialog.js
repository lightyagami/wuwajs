"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleDialog = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CommonFlowTextLogic_1 = require("../../../Common/CommonFlowTextLogic"),
  typeMap = {
    DungeonBegin: 1,
    PlayerBattleWin: 2,
    PlayerWin: 3,
    PlayerLose: 4,
    NewTurnBegin: 5
  };
class PhantomArenaBattleDialog {
  constructor() {
    this.OpponentDialogItem = void 0, this.OwnDialogItem = void 0, this.Logic = new CommonFlowTextLogic_1.CommonFlowTextLogic, this.TalkData = [], this.TalkIndex = 0, this.OwnSpeakId = 0, this.OpponentSpeakId = 0, this.sJ1 = t => t.WhoId === this.OwnSpeakId ? this.OwnDialogItem?.GetDialog() : t.WhoId === this.OpponentSpeakId ? this.OpponentDialogItem?.GetDialog() : void(Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "说话人配置错误", ["编辑器配置ID", t.WhoId], ["己方说话人ID", this.OwnSpeakId], ["对方说话人ID", this.OpponentSpeakId])), this.aJ1 = t => {
      t.WhoId === this.OwnSpeakId ? this.OwnDialogItem?.SetDialogActive(!0) : t.WhoId === this.OpponentSpeakId && this.OpponentDialogItem?.SetDialogActive(!0)
    }, this.hJ1 = t => {
      t.WhoId === this.OwnSpeakId ? this.OwnDialogItem?.SetDialogActive(!1) : t.WhoId === this.OpponentSpeakId && this.OpponentDialogItem?.SetDialogActive(!1), this.TalkIndex++, this.TalkIndex >= this.TalkData.length || this.Logic.PlayFlowText(this.TalkData[this.TalkIndex], this.TalkIndex)
    }, this.DBi = () => {
      this.OwnDialogItem?.SetActive(!1), this.OpponentDialogItem?.SetActive(!1)
    }, this.InitSpeakerId(), this.InitLogic()
  }
  InitLogic() {
    var t = {
      GetTextComp: this.sJ1,
      TextAnimStartDelegate: this.aJ1,
      TextAnimFinishDelegate: this.hJ1,
      ClearDelegate: this.DBi
    };
    this.Logic.InitData(t)
  }
  InitSpeakerId() {
    this.OwnSpeakId = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaOwnSpeakerId(), this.OpponentSpeakId = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaOpponentSpeakerId()
  }
  SetOpponentDialogItem(t) {
    this.OpponentDialogItem = t
  }
  SetOwnDialogItem(t) {
    this.OwnDialogItem = t
  }
  NotifyDialogType(t) {
    this.TalkData = [], this.TalkIndex = 0;
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(i).DialogMap.get(typeMap[t]);
    if (e) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleDialog(e),
        o = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e.PlotName, e.FlowId, e.StateId);
      if (o) {
        for (const s of o)
          if ("ShowTalk" === s.Name)
            for (const a of s.Params.TalkItems) this.TalkData.push(a);
        this.Logic.PlayFlowText(this.TalkData[this.TalkIndex])
      } else Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "找不到对应的剧本配置", ["PlotName", e.PlotName], ["FlowId", e.FlowId], ["StateId", e.StateId])
    } else Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "找不到对应的对话配置", ["ChallengeId", i], ["DialogType", t])
  }
  Clear() {
    this.Logic.Clear()
  }
}
exports.PhantomArenaBattleDialog = PhantomArenaBattleDialog;
//# sourceMappingURL=PhantomArenaBattleDialog.js.map