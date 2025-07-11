"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDetailInformationBuffItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const TowerDetailInformationBuffSubItem_1 = require("./TowerDetailInformationBuffSubItem");
class TowerDetailInformationBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.dDo = undefined;
    this.CDo = undefined;
    this.gDo = (e, t, i) => {
      t = new TowerDetailInformationBuffSubItem_1.TowerDetailInformationBuffSubItem(t);
      t.Update(e);
      return {
        Key: i,
        Value: t
      };
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout]];
  }
  OnStart() {
    this.CDo = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(1), this.gDo);
  }
  Update(e) {
    this.dDo = e;
    this.Og();
  }
  Og() {
    this.CDo.RebuildLayoutByDataNew(this.dDo.Buffs);
  }
  OnBeforeDestroy() {
    this.CDo.ClearChildren();
  }
}
exports.TowerDetailInformationBuffItem = TowerDetailInformationBuffItem;
//# sourceMappingURL=TowerDetailInformationBuffItem.js.map