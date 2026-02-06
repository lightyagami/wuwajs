"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerResultScoreList = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const WheelTowerScoreItem_1 = require("../WheelTowerScoreItem");
class WheelTowerResultScoreList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Crf = undefined;
    this.prf = () => new ScoreInfoItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.Crf = new GenericLayout_1.GenericLayout(this.RootItem.GetOwner().GetComponentByClass(UE.UIVerticalLayout.StaticClass()), this.prf, undefined);
  }
  Refresh(e, r) {
    this.SetUiActive(true);
    var t = ModelManager_1.ModelManager.WheelTowerModel;
    this.Crf?.RefreshByData([{
      Desc: "WheelBattleResult_CurTotalScore",
      Score: e.toString(),
      ScoreLevel: t.GetTotalScoreLevel(e)
    }, {
      Desc: "WheelBattleResult_CurScore",
      Score: r.toString(),
      ScoreLevel: t.GetRoundScoreLevel(r)
    }]);
  }
}
exports.WheelTowerResultScoreList = WheelTowerResultScoreList;
class ScoreInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eel = undefined;
    this.ujr = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.eel = new WheelTowerScoreItem_1.WheelTowerScoreItem(this, this.GetItem(1));
    this.ujr = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.ujr?.Clear();
  }
  Refresh(e, r, t) {
    this.GetText(0)?.ShowTextNew(e.Desc);
    this.GetText(2)?.SetText(e.Score);
    this.eel?.Refresh(e.ScoreLevel);
    this.ujr?.PlaySequencePurely("Start");
  }
}
//# sourceMappingURL=WheelTowerResultScoreList.js.map