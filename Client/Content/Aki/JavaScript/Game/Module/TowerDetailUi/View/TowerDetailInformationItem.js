"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDetailInformationItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const TowerDetailInformationBuffItem_1 = require("./TowerDetailInformationBuffItem");
const TowerDetailInformationMonsterItem_1 = require("./TowerDetailInformationMonsterItem");
class TowerDetailInformationItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.fDo = undefined;
    this.ppt = undefined;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.fDo = new TowerDetailInformationBuffItem_1.TowerDetailInformationBuffItem(this.GetItem(1));
    this.ppt = new TowerDetailInformationMonsterItem_1.TowerDetailInformationMonsterItem(this.GetItem(2));
  }
  pDo() {
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
  }
  Update(e) {
    this.pDo();
    if (e.Type === 0) {
      this.GetItem(1).SetUIActive(true);
      this.fDo.Update(e.TowerDetailBuffData);
    } else {
      this.GetItem(2).SetUIActive(true);
      this.ppt.Update(e.MonsterData, e.Type);
    }
    this.vDo(e);
    this.MDo(e.Type);
  }
  OnBeforeDestroy() {
    this.ppt.Destroy();
    this.fDo.Destroy();
  }
  vDo(e) {
    this.GetText(0).SetText(e.Title);
  }
  MDo(e) {
    let t = e !== 0 && e !== 1 ? false : true;
    this.GetItem(3).SetUIActive(t);
  }
}
exports.TowerDetailInformationItem = TowerDetailInformationItem;
//# sourceMappingURL=TowerDetailInformationItem.js.map