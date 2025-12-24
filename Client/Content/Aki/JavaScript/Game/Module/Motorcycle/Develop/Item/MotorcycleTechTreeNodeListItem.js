"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeNodeListItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const MotorcycleTechTreeNodeItem_1 = require("./MotorcycleTechTreeNodeItem");
class MotorcycleTechTreeNodeListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Mjf = [];
    this._cf = undefined;
    this.Ejf = [];
    this.OnAfterRefreshOneNode = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(0).SetUIActive(false);
    this._cf = new MotorcycleTechTreeNodeItem_1.MotorcycleTechTreeNodeItem();
    this.OnAfterRefreshOneNode?.(this._cf);
    await this._cf.CreateThenShowByResourceIdAsync("UiItem_MotorcycleTechTreeNode", this.GetRootItem());
  }
  Refresh(e, t, r) {
    new UiAsyncTask_1.UiAsyncTask("RefreshTopOrBottom", async () => {
      await this.ucf(e);
    }).Run();
  }
  async ucf(e) {
    this.GetItem(1).SetUIActive(e.TopIds.length > 0);
    this.GetItem(2).SetUIActive(e.BottomIds.length > 0);
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(e.MiddleId);
    this._cf.RefreshNodeData(t);
    var r = [];
    var o = e.TopIds;
    var t = this.Mjf.length;
    for (const d of this.Mjf) {
      d.SetUiActive(false);
    }
    if (o.length > t) {
      for (let e = t; e < o.length; e++) {
        var s = new MotorcycleTechTreeNodeItem_1.MotorcycleTechTreeNodeItem();
        this.Mjf.push(s);
        r.push(s.CreateThenShowByResourceIdAsync("UiItem_MotorcycleTechTreeNode", this.GetItem(3)));
      }
    }
    var i = e.BottomIds;
    var t = this.Ejf.length;
    for (const l of this.Ejf) {
      l.SetUiActive(false);
    }
    if (i.length > t) {
      for (let e = t; e < i.length; e++) {
        var c = new MotorcycleTechTreeNodeItem_1.MotorcycleTechTreeNodeItem();
        this.Ejf.push(c);
        r.push(c.CreateThenShowByResourceIdAsync("UiItem_MotorcycleTechTreeNode", this.GetItem(4)));
      }
    }
    await Promise.all(r);
    for (let e = 0; e < o.length; e++) {
      var h = this.Mjf[e];
      var a = o[e];
      var a = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(a);
      if (a) {
        h.RefreshNodeData(a);
        h.SetUiActive(true);
        this.OnAfterRefreshOneNode?.(h);
      }
    }
    for (let e = 0; e < i.length; e++) {
      var n = this.Ejf[e];
      var T = i[e];
      var T = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(T);
      if (T) {
        n.RefreshNodeData(T);
        n.SetUiActive(true);
        this.OnAfterRefreshOneNode?.(n);
      }
    }
  }
}
exports.MotorcycleTechTreeNodeListItem = MotorcycleTechTreeNodeListItem;
//# sourceMappingURL=MotorcycleTechTreeNodeListItem.js.map