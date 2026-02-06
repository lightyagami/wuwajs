"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeNodeListItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const MotorcycleTechTreeNodeItem_1 = require("./MotorcycleTechTreeNodeItem");
class MotorcycleTechTreeNodeListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Fig = [];
    this.amf = undefined;
    this.Nig = [];
    this.OnAfterRefreshOneNode = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(0).SetUIActive(false);
    this.amf = new MotorcycleTechTreeNodeItem_1.MotorcycleTechTreeNodeItem();
    await this.amf.CreateThenShowByResourceIdAsync("UiItem_MotorcycleTechTreeNode", this.GetRootItem());
  }
  Refresh(e, t, r) {
    this.hmf(e);
  }
  async hmf(e) {
    this.GetItem(1).SetUIActive(e.TopIds.length > 0);
    this.GetItem(2).SetUIActive(e.BottomIds.length > 0);
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(e.MiddleId);
    if (this.amf) {
      this.amf.RefreshNodeData(t);
      this.amf.PlayNodeSequence();
      this.OnAfterRefreshOneNode?.(this.amf);
    }
    var r = [];
    var o = e.TopIds;
    var t = this.Fig.length;
    for (const n of this.Fig) {
      n.SetUiActive(false);
    }
    if (o.length > t) {
      for (let e = t; e < o.length; e++) {
        var s = new MotorcycleTechTreeNodeItem_1.MotorcycleTechTreeNodeItem();
        this.Fig.push(s);
        r.push(s.CreateThenShowByResourceIdAsync("UiItem_MotorcycleTechTreeNode", this.GetItem(3)));
      }
    }
    var i = e.BottomIds;
    var t = this.Nig.length;
    for (const M of this.Nig) {
      M.SetUiActive(false);
    }
    if (i.length > t) {
      for (let e = t; e < i.length; e++) {
        var c = new MotorcycleTechTreeNodeItem_1.MotorcycleTechTreeNodeItem();
        this.Nig.push(c);
        r.push(c.CreateThenShowByResourceIdAsync("UiItem_MotorcycleTechTreeNode", this.GetItem(4)));
      }
    }
    await Promise.all(r);
    for (let e = 0; e < o.length; e++) {
      var h = this.Fig[e];
      var a = o[e];
      var a = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(a);
      if (a) {
        h.RefreshNodeData(a);
        h.SetUiActive(true);
        h.PlayNodeSequence();
        this.OnAfterRefreshOneNode?.(h);
      }
    }
    for (let e = 0; e < i.length; e++) {
      var d = this.Nig[e];
      var l = i[e];
      var l = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(l);
      if (l) {
        d.RefreshNodeData(l);
        d.SetUiActive(true);
        d.PlayNodeSequence();
        this.OnAfterRefreshOneNode?.(d);
      }
    }
  }
}
exports.MotorcycleTechTreeNodeListItem = MotorcycleTechTreeNodeListItem;
//# sourceMappingURL=MotorcycleTechTreeNodeListItem.js.map