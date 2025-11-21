"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCollectionItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class SurvivorsRogueCollectionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CollectionNumText = undefined;
    this.CollectionEfficiencyTipsSprite = undefined;
    this.SequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
  }
  OnStart() {
    this.CollectionNumText = this.GetText(0);
    this.CollectionEfficiencyTipsSprite = this.GetSprite(1);
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  OnBeforeShow() {
    this.SequencePlayer.StopPlayingSequence();
    this.SequencePlayer.PlayLevelSequenceByName("Start");
  }
  Refresh(e, s, t) {
    if (t) {
      this.SequencePlayer.PlayOrReplaySequenceByName(s ? "BuffAdd" : "Add");
    }
    this.CollectionNumText.SetText(e.toString());
  }
}
exports.SurvivorsRogueCollectionItem = SurvivorsRogueCollectionItem;
//# sourceMappingURL=SurvivorsRogueCollectionItem.js.map