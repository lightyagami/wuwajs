"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoleSkillItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class PhantomArenaRoleSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.GridIndex = -1;
    this.IsSelected = false;
    this.Data = undefined;
    this.OnToggleSelect = undefined;
    this.DV1 = t => {
      if (t === 1) {
        this.OnToggleSelect?.(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture]];
    this.BtnBindInfo = [[0, this.DV1]];
  }
  Refresh(t, s, e) {
    this.GridIndex = e;
    this.Data = t;
    this.SetTextureByPath(t.IconPath, this.GetTexture(1));
    this.SetSelected(s);
  }
  OnSelected(t) {
    this.GetExtendToggle(0)?.SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  SetSelected(t) {
    if (this.IsSelected !== t) {
      this.IsSelected = t;
      if (this.IsSelected) {
        this.OnSelected(false);
      } else {
        this.OnDeselected(false);
      }
    }
  }
}
exports.PhantomArenaRoleSkillItem = PhantomArenaRoleSkillItem;
//# sourceMappingURL=PhantomArenaRoleSkillItem.js.map