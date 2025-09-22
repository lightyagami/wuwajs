"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueWavePointItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const RESET_SEQUENCE_NAME = "MoveBack";
class SurvivorsRogueWavePointItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.NormalWaveRoot = undefined;
    this.NormalWaveFightingIcon = undefined;
    this.NormalWaveCompletedIcon = undefined;
    this.SpecialWaveRoot = undefined;
    this.SpecialWaveFightingIcon = undefined;
    this.SpecialWaveCompletedIcon = undefined;
    this.EndlessCompletedIcon = undefined;
    this.SequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite]];
  }
  OnStart() {
    this.NormalWaveRoot = this.GetItem(0);
    this.NormalWaveFightingIcon = this.GetSprite(1);
    this.NormalWaveCompletedIcon = this.GetSprite(2);
    this.SpecialWaveRoot = this.GetItem(3);
    this.SpecialWaveFightingIcon = this.GetSprite(4);
    this.SpecialWaveCompletedIcon = this.GetSprite(5);
    this.EndlessCompletedIcon = this.GetSprite(6);
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  SetState(e) {
    this.NormalWaveRoot.SetUIActive(e === 0);
    this.SpecialWaveRoot.SetUIActive(e === 1);
    this.EndlessCompletedIcon.SetUIActive(e === 2);
    this.Show();
  }
  PlayBubbleSequence() {
    this.SequencePlayer.PlayOrReplaySequenceByName("Move");
  }
  PlayResetSequence() {
    this.SequencePlayer.PlayOrReplaySequenceByName(RESET_SEQUENCE_NAME);
  }
}
exports.SurvivorsRogueWavePointItem = SurvivorsRogueWavePointItem;
//# sourceMappingURL=SurvivorsRogueWavePointItem.js.map