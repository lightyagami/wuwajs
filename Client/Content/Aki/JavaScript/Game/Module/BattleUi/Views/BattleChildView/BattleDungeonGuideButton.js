"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleDungeonGuideButton = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleEntranceButton_1 = require("./BattleEntranceButton");
class BattleDungeonGuideButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.rFa = () => {
      this.SPe.PlayLevelSequenceByName("Shouqi");
    };
  }
  Initialize(e) {
    super.Initialize(e);
    if (e) {
      this.AddEvents();
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    }
  }
  Reset() {
    this.SPe?.Clear();
    this.SPe = undefined;
    this.RemoveEvents();
    super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleIntroductionViewHide, this.rFa);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleIntroductionViewHide, this.rFa);
  }
}
exports.BattleDungeonGuideButton = BattleDungeonGuideButton;
//# sourceMappingURL=BattleDungeonGuideButton.js.map