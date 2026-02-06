"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerHpItem = undefined;
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class GuessJokerHpItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.SOg = true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem]];
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.SOg = true;
  }
  Refresh(e, t, s) {
    if (this.SOg && !e) {
      this.ShowBrokenAnim();
    }
    this.GetSprite(0).SetUIActive(e);
    this.GetItem(1).SetUIActive(!e);
    this.SOg = e;
  }
  ShowBrokenAnim() {
    this.SPe ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SPe.PlayLevelSequenceByName("Damage");
  }
}
exports.GuessJokerHpItem = GuessJokerHpItem;
//# sourceMappingURL=GuessJokerHpItem.js.map