"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterCursorUnit = undefined;
const UE = require("ue");
const HudUnitBase_1 = require("../HudUnitBase");
const RAD_2_DEG = 180 / Math.PI;
const CURSOR_NUM = 3;
class MonsterCursorUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.lii = undefined;
    this.zti = new UE.Rotator();
    this.Xot = new UE.Vector2D();
    this._ii = 0;
    this.uii = 1;
    this.cii = (t, s) => {
      this._Oe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UINiagara], [4, UE.UINiagara], [5, UE.UINiagara]];
  }
  Activate(t) {
    this.lii = t;
    this.Xot.X = 0;
    this.Xot.Y = 0;
    this.AddEntityEvents();
    this._Oe();
    if (this.GetActive()) {
      this.SetActive(false);
    }
  }
  Deactivate() {
    if (this.lii) {
      this.lii.ClearAllTagCountChangedCallback();
      this.lii = undefined;
    }
  }
  AddEntityEvents() {
    this.lii.ListenForTagCountChanged(1996624497, this.cii);
    this.lii.ListenForTagCountChanged(704115290, this.cii);
    this.lii.ListenForTagCountChanged(1922078392, this.cii);
  }
  GetEntityId() {
    return this.lii?.GetId();
  }
  IsValid() {
    return this.lii !== undefined;
  }
  GetHudEntityData() {
    return this.lii;
  }
  Refresh(t, s) {
    if (t !== this.uii) {
      this.uii = t;
      this.GetUiNiagara(3 + this._ii).SetNiagaraVarFloat("Scale", t);
    }
    this.zti.Yaw = Math.atan2(s.Y, s.X) * RAD_2_DEG - 90;
    this.zti.Roll = 0;
    this.zti.Pitch = 0;
    this.RootItem.SetUIRelativeRotation(this.zti);
    this.RootItem.SetAnchorOffsetX(s.X);
    this.RootItem.SetAnchorOffsetY(s.Y);
  }
  _Oe() {
    let s = 0;
    s = this.lii.ContainsTagById(1922078392) ? 2 : this.lii.ContainsTagById(-1371021686) ? 1 : 0;
    if (this._ii !== s) {
      this._ii = s;
      for (let t = 0; t < CURSOR_NUM; t++) {
        this.GetItem(0 + t).SetUIActive(t === s);
      }
      this.GetUiNiagara(3 + s).SetNiagaraVarFloat("Scale", this.uii);
    }
  }
}
exports.MonsterCursorUnit = MonsterCursorUnit;
//# sourceMappingURL=MonsterCursorUnit.js.map