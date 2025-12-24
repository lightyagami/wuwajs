"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleHonamiStoryLeaveButton = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const HonamiStoryController_1 = require("../../../HonamiStory/HonamiStoryController");
const BattleEntranceButton_1 = require("../BattleChildView/BattleEntranceButton");
class BattleHonamiStoryLeaveButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
    this.Tim = () => {
      if (this.ucm()) {
        this.$pt?.StopPrevSequence(false, true);
        this.$pt?.PlaySequencePurely("Sucs");
      }
    };
    this.bim = () => {
      HonamiStoryController_1.HonamiStoryController.TryHonamiStoryInstLeave();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.bim]];
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(3);
    e = this.ucm();
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.$pt.PlaySequencePurely(e ? "Sucs" : "Start");
    this.Ore();
  }
  Reset() {
    this.$pt?.Clear();
    this.$pt = undefined;
    this.kre();
    super.Reset();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryLeaveButtonUpdate, this.Tim);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryLeaveButtonUpdate, this.Tim);
  }
  ucm() {
    return ModelManager_1.ModelManager.HonamiStoryModel.CanSafeLeave;
  }
}
exports.BattleHonamiStoryLeaveButton = BattleHonamiStoryLeaveButton;
//# sourceMappingURL=BattleHonamiStoryLeaveButton.js.map