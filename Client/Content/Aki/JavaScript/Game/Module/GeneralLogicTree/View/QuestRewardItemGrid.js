"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestRewardItemGrid = undefined;
const UE = require("ue");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class QuestRewardItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemGrid = new MediumItemGrid_1.MediumItemGrid();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  OnStart() {
    this.ItemGrid.Initialize(this.GetItem(0).GetOwner());
  }
  Refresh(e, t, r) {
    var i = e.GetConfig();
    var e = {
      Data: e,
      Type: 4,
      ItemConfigId: e.ConfigId,
      BottomText: "x" + e.Count,
      QualityType: "MediumItemGridQualitySpritePath"
    };
    this.ItemGrid.Apply(e);
    this.GetText(1)?.ShowTextNew(i.Name);
  }
}
exports.QuestRewardItemGrid = QuestRewardItemGrid;
//# sourceMappingURL=QuestRewardItemGrid.js.map