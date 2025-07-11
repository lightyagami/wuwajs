"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleBuyRoleStarItem = undefined;
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const SEQ_LIGHT = "Light";
class RogueBattleBuyRoleStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  Refresh(e, t, r) {
    this.GetSprite(0).SetUIActive(true);
    this.GetSprite(1).SetUIActive(e);
    this.SetPreviewAnimOn(false);
  }
  SetPreviewAnimOn(e) {
    this.GetSprite(2).SetUIActive(e);
    this.GetItem(3).SetUIActive(e);
    this.GetItem(4).SetUIActive(e);
    if (e) {
      if (this.SPe.GetCurrentSequence() === SEQ_LIGHT) {
        this.SPe.ReplaySequenceByKey(SEQ_LIGHT);
      } else {
        this.SPe.StopPlayingSequence(false, true);
        this.SPe.PlayLevelSequenceByName(SEQ_LIGHT);
      }
    } else {
      this.SPe?.StopSequenceByKey("Light");
    }
  }
}
exports.RogueBattleBuyRoleStarItem = RogueBattleBuyRoleStarItem;
//# sourceMappingURL=RogueBattleBuyRoleStarItem.js.map