"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleQuestButton = undefined;
const ue_1 = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleEntranceButton_1 = require("./BattleEntranceButton");
const MISSION_UPGRADE_IN = "MissionUpgradeIn";
const MISSION_UPGRADE_OUT = "MissionUpgradeOut";
class BattleQuestButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments);
    this.SequencePlayer = undefined;
    this.owt = e => {
      switch (e) {
        case MISSION_UPGRADE_IN:
          this.GetItem(2)?.SetUIActive(ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible);
          break;
        case MISSION_UPGRADE_OUT:
      }
    };
    this.yct = e => {
      switch (e) {
        case MISSION_UPGRADE_IN:
          this.SequencePlayer.PlayLevelSequenceByName(MISSION_UPGRADE_OUT);
          if (ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled") {
            this.SequencePlayer.StopCurrentSequence(true, true);
          }
          break;
        case MISSION_UPGRADE_OUT:
      }
    };
    this.rxn = e => {
      var t = this.GetText(3);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalText(t, "QuestUpdateNewQuestTips");
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(t, "QuestUpdateNewGoalTips");
      }
      this.SequencePlayer.StopCurrentSequence(true, true);
      this.SequencePlayer.PlayLevelSequenceByName(MISSION_UPGRADE_IN);
      var e = ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
      if (e) {
        this.SequencePlayer.StopCurrentSequence(true, true);
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, ue_1.UIItem]);
    this.ComponentRegisterInfos.push([3, ue_1.UIText]);
  }
  Initialize(e) {
    super.Initialize(e);
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SequencePlayer.BindSequenceStartEvent(this.owt);
    this.SequencePlayer.BindSequenceCloseEvent(this.yct);
    this.AddEvents();
  }
  Reset() {
    this.RemoveEvents();
    super.Reset();
  }
  OnShowBattleChildView() {
    super.OnShowBattleChildView();
    if (this.SequencePlayer.GetCurrentSequence()) {
      this.SequencePlayer.ResumeSequence();
    }
  }
  OnHideBattleChildView() {
    super.OnHideBattleChildView();
    if (this.SequencePlayer.GetCurrentSequence()) {
      this.SequencePlayer.PauseSequence();
    }
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MissionUpdate, this.rxn);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MissionUpdate, this.rxn);
  }
}
exports.BattleQuestButton = BattleQuestButton;
//# sourceMappingURL=BattleQuestButton.js.map