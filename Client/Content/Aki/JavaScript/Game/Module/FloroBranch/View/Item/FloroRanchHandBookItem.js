"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchHandBookItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FloroRanchHandBookSmallSlotItem_1 = require("./FloroRanchHandBookSmallSlotItem");
class FloroRanchHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.qAu = undefined;
    this.OnClickCallback = t => {};
    this.IsSelectedItem = undefined;
    this.GAu = () => {
      var t = new FloroRanchHandBookSmallSlotItem_1.FloroRanchHandBookSmallSlotItem();
      t.BindClickCallback(this.OnClickCallback);
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIGridLayout], [4, UE.UIItem]];
  }
  OnStart() {
    this.qAu = new GenericLayout_1.GenericLayout(this.GetGridLayout(3), this.GAu, undefined, true, false);
  }
  async RefreshAsync(t, e, i) {
    this.GetItem(1).SetUIActive(t !== 0);
    var r;
    var o = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (t === 0) {
      r = o.GetFloroRanchToyDataList();
      await this.qAu.RefreshByDataAsync(r, true);
    } else {
      t = o.GetFloroRanchRaceData(r = t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.GetRaceName());
      this.SetTextureByPath(t.SmallIcon, this.GetTexture(0));
      t = o.GetFloroRanchCardDataListByRace(r);
      await this.qAu.RefreshByDataAsync(t, true);
    }
    if (i === 0) {
      this.FAu();
    }
  }
  FAu() {
    var t = this.qAu.GetLayoutItemList()[0];
    if (!this.IsSelectedItem?.() && t) {
      this.OnClickCallback(t);
      this.qAu.SelectGridProxy(0);
    }
  }
}
exports.FloroRanchHandBookItem = FloroRanchHandBookItem;
//# sourceMappingURL=FloroRanchHandBookItem.js.map