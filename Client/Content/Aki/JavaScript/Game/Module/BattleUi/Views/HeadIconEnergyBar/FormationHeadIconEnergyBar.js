"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationHeadIconEnergyBar = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HeadIconEnergyBarCommon_1 = require("./HeadIconEnergyBarCommon");
const energyBarClassMap = new Map([[0, HeadIconEnergyBarCommon_1.HeadIconEnergyBarCommon]]);
class FormationHeadIconEnergyBar {
  constructor() {
    this.Wn1 = [];
    this.hdt = new Map();
    this.Qn1 = new Set();
  }
  InitParentItem(e, t) {
    this.Wn1[e] = t;
  }
  RemoveEntity(e) {
    var t = this.hdt.get(e);
    if (t) {
      this.hdt.delete(e);
      t.Destroy();
    } else {
      this.Qn1.delete(e);
    }
  }
  InitData(e, t, r, s) {
    var a;
    var o = r?.EntityHandle?.Id;
    if (o && !this.Qn1.has(o)) {
      if (this.hdt.has(o)) {
        this.RefreshVisible(o, r.IsCurEntity, s);
      } else if ((a = r.HeadIconEnergyBarConfig) && (t = t.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId(), a.FormationVisible || t)) {
        t = s >= 0 ? this.Wn1[s] : this.Wn1[0];
        this.cdt(t, r, o, a);
        this.RefreshVisible(o, r.IsCurEntity);
      } else {
        this.Qn1.add(o);
      }
    }
  }
  RefreshVisible(e, t, r = -1) {
    if (e &&= this.hdt.get(e)) {
      if (t) {
        e.SetVisible(false, 1);
      } else {
        e.SetVisible(true, 1);
        if (r >= 0 && (t = this.Wn1[r])) {
          e.ChangeParent(t);
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
    for (const t of this.hdt.values()) {
      t.Tick(e);
    }
  }
  cdt(e, t, r, s) {
    var a = new (energyBarClassMap.get(s.Type) ?? HeadIconEnergyBarCommon_1.HeadIconEnergyBarCommon)();
    a.InitData(t, s);
    this.hdt.set(r, a);
    a.InitByPath(e, s.PrefabPath);
    a.SetVisible(true, 0);
  }
}
exports.FormationHeadIconEnergyBar = FormationHeadIconEnergyBar;
//# sourceMappingURL=FormationHeadIconEnergyBar.js.map