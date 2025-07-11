"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingMapTileModule = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const BuildingItem_1 = require("./BuildingItem");
const BuildingMapShowRoleModule_1 = require("./BuildingMapShowRoleModule");
const BuildingMapTileMgr_1 = require("./BuildingMapTileMgr");
const BuildingRoleItem_1 = require("./BuildingRoleItem");
class TileItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super();
    this.TileMgr = i;
    this.n8 = "";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(i, e, t) {
    this.n8 = i;
  }
  async RefreshAsync() {
    await this.SetTextureAsync(this.n8, this.GetTexture(0));
  }
}
class BuildingMapTileModule extends UiPanelBase_1.UiPanelBase {
  constructor(i, e) {
    super();
    this.NeedLoadingFixRole = i;
    this.NeedLoadingShowRoleItem = e;
    this.lRn = new BuildingMapTileMgr_1.BuildingMapTileMgr();
    this.MapLayout = undefined;
    this._Rn = new Map();
    this.qKs = [];
    this.WIa = undefined;
    this.uRn = () => new TileItem(this.lRn);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length < 2)) {
      let i = 0;
      i = e[1] === "CanLevelUp" ? ModelManager_1.ModelManager.MoonChasingBuildingModel.GetFirstCanLevelUpBuildingId() ?? 0 : parseInt(e[1]);
      var t = this._Rn.get(i);
      if (t !== undefined) {
        return t.GetGuideUiItemAndUiItemForShowEx(e);
      }
    }
  }
  async cRn() {
    this.MapLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.uRn, this.GetItem(1).GetOwner());
    var i = this.lRn.CreateTilesPathList();
    await this.MapLayout.RefreshByDataAsync(i);
    await this.WCa();
  }
  async WCa() {
    var i = [];
    for (const e of this.MapLayout.GetLayoutItemList()) {
      i.push(e.RefreshAsync());
    }
    await Promise.all(i);
  }
  Sga() {
    var i = [];
    i.push(this.GetItem(3));
    i.push(this.GetItem(4));
    i.push(this.GetItem(5));
    i.push(this.GetItem(6));
    i.push(this.GetItem(7));
    i.push(this.GetItem(8));
    i.push(this.GetItem(9));
    i.push(this.GetItem(10));
    i.push(this.GetItem(11));
    i.push(this.GetItem(12));
    return i;
  }
  async mRn() {
    var t = this.Sga();
    var s = [];
    var a = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingConfigListBySort();
    for (let i = 0, e = a.length; i < e; i++) {
      var r = t[i];
      var o = a[i].Id;
      var n = new BuildingItem_1.BuildingItem(o);
      this._Rn.set(o, n);
      s.push(n.CreateThenShowByResourceIdAsync("UiItem_BuildItem", r));
    }
    await Promise.all(s);
  }
  async uyi(i, e) {
    var t = new BuildingRoleItem_1.BuildingRoleItem();
    this.qKs.push(t);
    await t.CreateThenShowByResourceIdAsync("UiItem_RoleTalk", i);
    await t.RefreshSpine(e);
  }
  GKs(e, t) {
    var s = new Set();
    var a = [];
    for (let i = 1; i <= e; i++) {
      let i = Math.floor(Math.random() * t);
      while (s.has(i)) {
        i = Math.floor(Math.random() * t);
      }
      s.add(i);
      a.push(i);
    }
    return a;
  }
  async OKs() {
    if (this.NeedLoadingFixRole) {
      var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetLastPopularityConfig();
      if (i && i.NpcCount !== 0) {
        var e = this.GetItem(2);
        e.SetUIActive(false);
        for (const _ of this.qKs) {
          _.Destroy();
        }
        this.qKs.length = 0;
        var t = e.AttachChildren;
        var s = t.Num();
        var a = [];
        var r = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetUnlockHelpEditTeamDataList(true);
        var i = Math.min(i.NpcCount, r.length);
        if (s <= i) {
          var o = this.GKs(s, r.length);
          for (let i = 0; i < s; i++) {
            var n = t.Get(i);
            var h = r[o[i]].Id;
            a.push(this.uyi(n, h));
          }
        } else {
          var l = this.GKs(i, s);
          var u = this.GKs(i, r.length);
          for (let i = 0; i < l.length; ++i) {
            var d = t.Get(l[i]);
            var M = r[u[i]].Id;
            a.push(this.uyi(d, M));
          }
        }
        await Promise.all(a);
        e.SetUIActive(true);
      }
    }
  }
  async QIa() {
    var i = this.GetItem(13);
    i.SetUIActive(false);
    if (this.NeedLoadingShowRoleItem) {
      this.WIa = new BuildingMapShowRoleModule_1.BuildingMapShowRoleModule();
      await this.WIa.CreateByActorAsync(i.GetOwner());
      this.WIa.SetActive(true);
    }
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.cRn(), this.mRn(), this.QIa()]);
  }
  RefreshRole() {
    this.OKs();
  }
  SetAllBuildingExhibitionMode(i) {
    for (const e of this._Rn.values()) {
      e.SetExhibitionMode(i);
      e.SetInteractive(!i);
    }
  }
  SetBuildingItemActive(i) {
    for (const e of this._Rn.values()) {
      e.SetBuildingItemActive(i);
    }
  }
  RefreshBuildingItem(i) {
    this._Rn.get(i).Refresh();
  }
}
exports.BuildingMapTileModule = BuildingMapTileModule;
//# sourceMappingURL=BuildingMapTileModule.js.map