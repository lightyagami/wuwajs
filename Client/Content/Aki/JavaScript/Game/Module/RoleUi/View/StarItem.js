"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarItem = undefined;
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class StarItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UINiagara], [4, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SetImgStarLoopItemActive(false);
  }
  SetActive(t) {
    this.RootItem.SetUIActive(t);
  }
  Refresh(t, e, i) {
    this.SetImgStarOnActive(t.StarOnActive);
    this.SetImgStarOffActive(t.StarOffActive);
    this.SetImgStarNextActive(t.StarNextActive);
    this.SetImgStarLoopItemActive(t.StarLoopActive);
    if (t.PlayActivateSequence) {
      this.PlayActiveSequence();
    }
    if (t.PlayLoopSequence) {
      this.PlayAutoLoopSequence();
    }
  }
  SetImgStarOnActive(t) {
    this.GetItem(0).SetUIActive(t);
  }
  SetImgStarOffActive(t) {
    this.GetItem(1).SetUIActive(t);
  }
  SetImgStarNextActive(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetImgStarLoopItemActive(t) {
    this.GetItem(4).SetUIActive(t);
  }
  PlayAutoLoopSequence() {
    this.SPe?.PlayLevelSequenceByName("AutoLoop");
  }
  PlayActiveSequence() {
    this.SetImgStarOnActive(true);
    this.SetImgStarOffActive(false);
    this.SPe?.PlayLevelSequenceByName("Active");
  }
}
exports.StarItem = StarItem;
//# sourceMappingURL=StarItem.js.map