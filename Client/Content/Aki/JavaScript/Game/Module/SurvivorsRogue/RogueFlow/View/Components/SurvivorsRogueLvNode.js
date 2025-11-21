"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueLvNode = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const SEQ_LIGHT = "Start";
const SEQ_CLOSE = "Close";
const SEQ_EVOLVE = "LevelUp";
class SurvivorsRogueLvNode extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.LevelSequencePlayer = undefined;
    this.U0n = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  Refresh(e, t, s) {
    this.Data = e;
    this.iw1(e.IsImportant);
    this.RefreshState(e.State);
  }
  iw1(e) {
    this.GetItem(0).SetUIActive(e);
    this.GetItem(4).SetUIActive(!e);
  }
  RefreshState(e) {
    var t = e === 1;
    var e = e === 2;
    this.GetItem(2).SetUIActive(e);
    this.GetItem(3).SetUIActive(t);
    this.GetItem(6).SetUIActive(e);
    this.GetItem(7).SetUIActive(t);
    this.SetAnimOn(e);
  }
  SetAnimOn(e) {
    if (e !== this.U0n) {
      this.U0n = e;
      if (this.LevelSequencePlayer?.IsPlayingSequence(SEQ_LIGHT)) {
        this.LevelSequencePlayer.StopSequenceByKey(SEQ_LIGHT, false, true);
      }
      if (this.LevelSequencePlayer?.IsPlayingSequence(SEQ_CLOSE)) {
        this.LevelSequencePlayer.StopSequenceByKey(SEQ_CLOSE, false, true);
      }
      this.LevelSequencePlayer.PlayLevelSequenceByName(e ? SEQ_LIGHT : SEQ_CLOSE);
    }
  }
  async PlayImportantNodeAnim() {
    this.SetAnimOn(true);
    await this.LevelSequencePlayer.PlaySequenceAsync(SEQ_EVOLVE, new CustomPromise_1.CustomPromise(), true);
  }
  GetKey(e, t) {
    return e.Lv;
  }
}
exports.SurvivorsRogueLvNode = SurvivorsRogueLvNode;
//# sourceMappingURL=SurvivorsRogueLvNode.js.map