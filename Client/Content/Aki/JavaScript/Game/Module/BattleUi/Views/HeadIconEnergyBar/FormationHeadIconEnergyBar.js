"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationHeadIconEnergyBar = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HeadIconEnergyBarCommon_1 = require("./HeadIconEnergyBarCommon");
const HeadIconEnergyBarFuLuoLuo_1 = require("./HeadIconEnergyBarFuLuoLuo");
const energyBarClassMap = new Map([[0, HeadIconEnergyBarCommon_1.HeadIconEnergyBarCommon], [1, HeadIconEnergyBarFuLuoLuo_1.HeadIconEnergyBarFuLuoLuo]]);
class FormationHeadIconEnergyBar {
  constructor() {
    this.Wn1 = [];
    this.hdt = new Map();
    this.Qn1 = new Set();
  }
  InitParentItem(e, r) {
    this.Wn1[e] = r;
  }
  RemoveEntity(e) {
    var r = this.hdt.get(e);
    if (r) {
      this.hdt.delete(e);
      r.Destroy();
    } else {
      this.Qn1.delete(e);
    }
  }
  InitData(e, r, o, a) {
    var t;
    var n = o?.EntityHandle?.Id;
    if (n && !this.Qn1.has(n)) {
      if (this.hdt.has(n)) {
        this.RefreshVisible(n, o.IsCurEntity, a);
      } else if ((t = o.HeadIconEnergyBarConfig) && (r = r.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId(), t.FormationVisible || r)) {
        r = a >= 0 ? this.Wn1[a] : this.Wn1[0];
        this.cdt(r, o, n, t);
        this.RefreshVisible(n, o.IsCurEntity);
      } else {
        this.Qn1.add(n);
      }
    }
  }
  RefreshVisible(e, r, o = -1) {
    if (e &&= this.hdt.get(e)) {
      if (r) {
        e.SetVisible(false, 1);
      } else {
        e.SetVisible(true, 1);
        if (o >= 0 && (r = this.Wn1[o])) {
          e.ChangeParent(r);
        }
      }
    }
  }
  Destroy() {
    for (const e of this.hdt.values()) {
      e.Destroy();
    }
    this.hdt.clear();
    this.Qn1.clear();
  }
  Tick(e) {
    for (const r of this.hdt.values()) {
      r.Tick(e);
    }
  }
  cdt(e, r, o, a) {
    var t = new (energyBarClassMap.get(a.Type) ?? HeadIconEnergyBarCommon_1.HeadIconEnergyBarCommon)();
    t.InitData(r, a);
    this.hdt.set(o, t);
    t.InitByPath(e, a.PrefabPath);
    t.SetVisible(true, 0);
  }
}
exports.FormationHeadIconEnergyBar = FormationHeadIconEnergyBar;
//# sourceMappingURL=FormationHeadIconEnergyBar.js.map