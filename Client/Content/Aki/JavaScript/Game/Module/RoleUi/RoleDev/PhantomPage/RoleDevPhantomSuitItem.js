"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomSuitItem = undefined;
const UE = require("ue");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevPhantomDungeonData_1 = require("./Data/RoleDevPhantomDungeonData");
const RoleDevPhantomFetterGroupData_1 = require("./Data/RoleDevPhantomFetterGroupData");
const RoleDevPhantomVisionSuitDungeonItem_1 = require("./RoleDevPhantomVisionSuitDungeonItem");
const RoleDevPhantomVisionSuitPhantomItem_1 = require("./RoleDevPhantomVisionSuitPhantomItem");
class RoleDevPhantomSuitItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Dad = undefined;
    this.xad = undefined;
    this.Uad = undefined;
    this.ko_ = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.Bad();
  }
  async Bad() {
    this.Uad = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(0));
    this.Dad = new RoleDevPhantomVisionSuitPhantomItem_1.RoleDevPhantomVisionSuitPhantomItem();
    this.xad = new RoleDevPhantomVisionSuitDungeonItem_1.RoleDevPhantomVisionSuitDungeonItem();
    await Promise.all([this.Uad.Init(), this.Dad.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.xad.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
  }
  Refresh(t) {
    var e;
    this.ko_ = t.RoleId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.SuitName);
    if (t.UseRate > 0) {
      e = t.UseRate + "%";
      this.GetText(2).SetText(e);
    } else {
      this.GetText(2).SetUIActive(false);
    }
    this.kad(t);
    this.Oad(t);
  }
  kad(t) {
    var e = this.GetItem(0);
    if (e && this.Uad && (e.SetUIActive(t.HasElementIcon), t.HasElementIcon) && t.FetterGroupConfig) {
      this.Uad.Update(t.FetterGroupConfig);
      this.Uad.SetUiActive(true);
    }
  }
  Oad(t) {
    var e = new RoleDevPhantomFetterGroupData_1.RoleDevPhantomFetterGroupData();
    e.InitByFetterGroup(t.SuitId, this.ko_);
    if (e && this.Dad) {
      this.Dad.Refresh(e);
      this.GetItem(3).SetUIActive(true);
    } else {
      this.GetItem(3).SetUIActive(false);
    }
    var e = new RoleDevPhantomDungeonData_1.RoleDevPhantomDungeonData();
    e.InitByDungeon(t.DungeonId);
    if (e && this.xad) {
      this.xad.Refresh(e);
      this.GetItem(4).SetUIActive(true);
    } else {
      this.GetItem(4).SetUIActive(false);
    }
  }
  Clear() {
    this.Dad?.Clear();
    this.xad?.Clear();
  }
  GetKey(t, e) {
    return t.SuitId;
  }
}
exports.RoleDevPhantomSuitItem = RoleDevPhantomSuitItem;
//# sourceMappingURL=RoleDevPhantomSuitItem.js.map