"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDialog = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CommonFlowTextLogic_1 = require("../../../Common/CommonFlowTextLogic");
const typeMap = {
  DungeonBegin: 1,
  PlayerBattleWin: 2,
  PlayerWin: 3,
  PlayerLose: 4,
  NewTurnBegin: 5
};
class PhantomArenaBattleDialog {
  constructor() {
    this.OpponentDialogItem = undefined;
    this.OwnDialogItem = undefined;
    this.Logic = new CommonFlowTextLogic_1.CommonFlowTextLogic();
    this.TalkData = [];
    this.TalkIndex = 0;
    this.OwnSpeakId = 0;
    this.OpponentSpeakId = 0;
    this.JJ1 = t => t.WhoId === this.OwnSpeakId ? this.OwnDialogItem?.GetDialog() : t.WhoId === this.OpponentSpeakId ? this.OpponentDialogItem?.GetDialog() : void (Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "说话人配置错误", ["编辑器配置ID", t.WhoId], ["己方说话人ID", this.OwnSpeakId], ["对方说话人ID", this.OpponentSpeakId]));
    this.ZJ1 = t => {
      if (t.WhoId === this.OwnSpeakId) {
        this.OwnDialogItem?.SetDialogActive(true);
      } else if (t.WhoId === this.OpponentSpeakId) {
        this.OpponentDialogItem?.SetDialogActive(true);
      }
    };
    this.eZ1 = t => {
      if (t.WhoId === this.OwnSpeakId) {
        this.OwnDialogItem?.SetDialogActive(false);
      } else if (t.WhoId === this.OpponentSpeakId) {
        this.OpponentDialogItem?.SetDialogActive(false);
      }
      this.TalkIndex++;
      if (!(this.TalkIndex >= this.TalkData.length)) {
        this.Logic.PlayFlowText(this.TalkData[this.TalkIndex], this.TalkIndex);
      }
    };
    this.DBi = () => {
      this.OwnDialogItem?.SetActive(false);
      this.OpponentDialogItem?.SetActive(false);
    };
    this.InitSpeakerId();
    this.InitLogic();
  }
  InitLogic() {
    var t = {
      GetTextComp: this.JJ1,
      TextAnimStartDelegate: this.ZJ1,
      TextAnimFinishDelegate: this.eZ1,
      ClearDelegate: this.DBi
    };
    this.Logic.InitData(t);
  }
  InitSpeakerId() {
    this.OwnSpeakId = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaOwnSpeakerId();
    this.OpponentSpeakId = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaOpponentSpeakerId();
  }
  SetOpponentDialogItem(t) {
    this.OpponentDialogItem = t;
  }
  SetOwnDialogItem(t) {
    this.OwnDialogItem = t;
  }
  NotifyDialogType(t) {
    this.TalkData = [];
    this.TalkIndex = 0;
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(i).DialogMap.get(typeMap[t]);
    if (e) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleDialog(e);
      var o = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e.PlotName, e.FlowId, e.StateId);
      if (o) {
        for (const s of o) {
          if (s.Name === "ShowTalk") {
            for (const a of s.Params.TalkItems) {
              this.TalkData.push(a);
            }
          }
        }
        this.Logic.PlayFlowText(this.TalkData[this.TalkIndex]);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "找不到对应的剧本配置", ["PlotName", e.PlotName], ["FlowId", e.FlowId], ["StateId", e.StateId]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "找不到对应的对话配置", ["ChallengeId", i], ["DialogType", t]);
    }
  }
  Clear() {
    this.Logic.Clear();
  }
}
exports.PhantomArenaBattleDialog = PhantomArenaBattleDialog;
//# sourceMappingURL=PhantomArenaBattleDialog.js.map