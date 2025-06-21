"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoleSkillItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class PhantomArenaRoleSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.GridIndex = -1, this.IsSelected = !1, this.Data = void 0, this.OnToggleSelect = void 0, this.iV1 = t => {
      1 === t && this.OnToggleSelect?.(this.GridIndex)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture]
    ], this.BtnBindInfo = [
      [0, this.iV1]
    ]
  }
  Refresh(t, s, e) {
    this.GridIndex = e, this.Data = t, this.SetTextureByPath(t.IconPath, this.GetTexture(1)), this.SetSelected(s)
  }
  OnSelected(t) {
    this.GetExtendToggle(0)?.SetToggleState(1)
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0)
  }
  SetSelected(t) {
    this.IsSelected !== t && (this.IsSelected = t, this.IsSelected ? this.OnSelected(!1) : this.OnDeselected(!1))
  }
}
exports.PhantomArenaRoleSkillItem = PhantomArenaRoleSkillItem;
//# sourceMappingURL=PhantomArenaRoleSkillItem.js.map