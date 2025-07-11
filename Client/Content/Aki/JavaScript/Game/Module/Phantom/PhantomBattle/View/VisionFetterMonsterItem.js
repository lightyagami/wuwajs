"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionFetterMonsterItem = exports.VisionFetterMonsterData = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const PhantomBattleFettersViewItem_1 = require("./PhantomBattleFettersViewItem");
class VisionFetterMonsterData {
  constructor() {
    this.Cost = 0;
    this.MonsterList = new Array();
  }
}
exports.VisionFetterMonsterData = VisionFetterMonsterData;
class VisionFetterMonsterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.H1i = undefined;
    this.n8i = () => {
      return new PhantomBattleFettersViewItem_1.VisionDetailMonsterItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.H1i = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.n8i);
  }
  Refresh(t, e, r) {
    this.RGt(t);
    this.l8i(t);
  }
  RGt(t) {
    t = t.Cost;
    this.GetText(0).SetText("" + t);
  }
  l8i(t) {
    this.H1i.RefreshByData(t.MonsterList);
  }
}
exports.VisionFetterMonsterItem = VisionFetterMonsterItem;
//# sourceMappingURL=VisionFetterMonsterItem.js.map