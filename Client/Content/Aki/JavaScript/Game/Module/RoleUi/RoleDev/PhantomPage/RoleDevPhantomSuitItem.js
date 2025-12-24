"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomSuitItem = undefined;
const UE = require("ue");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevPhantomDungeonData_1 = require("./Data/RoleDevPhantomDungeonData");
const RoleDevPhantomFetterGroupData_1 = require("./Data/RoleDevPhantomFetterGroupData");
const RoleDevPhantomVisionSuitItem_1 = require("./RoleDevPhantomVisionSuitItem");
class RoleDevPhantomSuitItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.PMm = undefined;
    this.Hsd = undefined;
    this.ko_ = 0;
    this.AMm = () => new RoleDevPhantomVisionSuitItem_1.RoleDevPhantomVisionSuitItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UILayoutBase]];
  }
  async OnBeforeStartAsync() {
    await this.$sd();
  }
  async $sd() {
    this.Hsd = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(0));
    this.PMm = new GenericLayout_1.GenericLayout(this.GetLayoutBase(3), this.AMm);
    await Promise.all([this.Hsd.Init()]);
  }
  Refresh(t) {
    this.ko_ = t.RoleId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.SuitName);
    if (t.UseRate > 0) {
      this.GetText(2).SetUIActive(true);
      this.GetText(2).SetText(t.UseRateText);
    } else {
      this.GetText(2).SetUIActive(false);
    }
    this.Wsd(t);
    this.Qsd(t);
  }
  Wsd(t) {
    var e = this.GetItem(0);
    if (e && this.Hsd && (e.SetUIActive(t.HasElementIcon), t.HasElementIcon) && t.FetterGroupConfig) {
      this.Hsd.Update(t.FetterGroupConfig);
      this.Hsd.SetUiActive(true);
    }
  }
  Qsd(t) {
    var e = [];
    var i = new RoleDevPhantomFetterGroupData_1.RoleDevPhantomFetterGroupData();
    i.InitByFetterGroup(t.SuitId, this.ko_);
    e.push(i);
    for (const r of t.DungeonIdList) {
      var o = new RoleDevPhantomDungeonData_1.RoleDevPhantomDungeonData();
      o.InitByDungeon(r);
      e.push(o);
    }
    this.PMm?.RefreshByData(e);
  }
  GetKey(t, e) {
    return t.SuitId;
  }
}
exports.RoleDevPhantomSuitItem = RoleDevPhantomSuitItem;
//# sourceMappingURL=RoleDevPhantomSuitItem.js.map