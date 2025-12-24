"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerResultBossList = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const WheelTowerBossItem_1 = require("../RoundSelect/WheelTowerBossItem");
class WheelTowerResultBossList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Tei = undefined;
    this.ujr = undefined;
    this.stf = () => new BossSmallItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.Tei = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.stf, undefined);
    this.ujr = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.ujr?.Clear();
  }
  Refresh(e) {
    this.SetUiActive(true);
    this.Tei?.RefreshByData(e);
    this.ujr?.PlaySequencePurely("Start");
  }
}
exports.WheelTowerResultBossList = WheelTowerResultBossList;
class BossSmallItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.atf = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.atf = new WheelTowerBossItem_1.WheelTowerBossItem();
    await this.atf.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(e, s, t) {
    this.atf?.Refresh(e, s, t);
    this.atf?.SetTagVisible(false);
  }
}
//# sourceMappingURL=WheelTowerResultBossList.js.map