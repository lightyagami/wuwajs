"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationHeadIconEnergyBar = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HeadIconEnergyBarCommon_1 = require("./HeadIconEnergyBarCommon");
const HeadIconEnergyBarFuLuoLuo_1 = require("./HeadIconEnergyBarFuLuoLuo");
const HeadIconEnergyBarJiaBeiLiNa_1 = require("./HeadIconEnergyBarJiaBeiLiNa");
const energyBarClassMap = new Map([[0, HeadIconEnergyBarCommon_1.HeadIconEnergyBarCommon], [1, HeadIconEnergyBarFuLuoLuo_1.HeadIconEnergyBarFuLuoLuo], [2, HeadIconEnergyBarJiaBeiLiNa_1.HeadIconEnergyBarJiaBeiLiNa]]);
class FormationHeadIconEnergyBar {
  constructor() {
    this.Wn1 = [];
    this.hdt = new Map();
    this.Qn1 = new Set();
  }
  InitParentItem(e, a) {
    this.Wn1[e] = a;
  }
  RemoveEntity(e) {
    var a = this.hdt.get(e);
    if (a) {
      this.hdt.delete(e);
      a.Destroy();
    } else {
      this.Qn1.delete(e);
    }
  }
  InitData(e, a, r, o) {
    var n;
    var i = r?.EntityHandle?.Id;
    if (i && !this.Qn1.has(i)) {
      if (this.hdt.has(i)) {
        this.RefreshVisible(i, r.IsCurEntity, o);
      } else if ((n = r.HeadIconEnergyBarConfig) && (a = a.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId(), n.FormationVisible || a)) {
        a = o >= 0 ? this.Wn1[o] : this.Wn1[0];
        this.cdt(a, r, i, n);
        this.RefreshVisible(i, r.IsCurEntity);
      } else {
        this.Qn1.add(i);
      }
    }
  }
  RefreshVisible(e, a, r = -1) {
    if (e &&= this.hdt.get(e)) {
      if (a) {
        e.SetVisible(false, 1);
      } else {
        e.SetVisible(true, 1);
        if (r >= 0 && (a = this.Wn1[r])) {
          e.ChangeParent(a);
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
    for (const a of this.hdt.values()) {
      a.Tick(e);
    }
  }
  cdt(e, a, r, o) {
    var n = new (energyBarClassMap.get(o.Type) ?? HeadIconEnergyBarCommon_1.HeadIconEnergyBarCommon)();
    n.InitData(a, o);
    this.hdt.set(r, n);
    n.InitByPath(e, o.PrefabPath);
    n.SetVisible(true, 0);
  }
}
exports.FormationHeadIconEnergyBar = FormationHeadIconEnergyBar;
//# sourceMappingURL=FormationHeadIconEnergyBar.js.map