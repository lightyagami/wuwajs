"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTogetherRoleItem = undefined;
const UE = require("ue");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MotorcycleTogetherRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.sft = undefined;
    this.OnClickToggleCallBack = undefined;
    this.IsToggleSelectOn = undefined;
    this.kqe = t => {
      this.OnClickToggleCallBack?.(t === 1, this.dFe, this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [4, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  async OnBeforeStartAsync() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    await this.sft.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.sft.BindOnCanExecuteChange(() => false);
  }
  Refresh(t, e, i) {
    this.dFe = t.GetRoleId();
    var s = {
      Data: t,
      SkinId: t.GetRoleSkinId(),
      Type: 2,
      ItemConfigId: this.dFe
    };
    this.sft.Apply(s);
    this.GetText(1).SetText(t.GetRoleRealName());
    var s = t.GetFavorData().GetFavorLevel();
    this.GetText(4).SetText(s.toString());
    var t = this.IsToggleSelectOn?.(this.dFe) ?? false;
    this.EUt(t);
  }
  EUt(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(t);
  }
  OnSelected(t) {
    this.EUt(true);
  }
  OnDeselected(t) {
    this.EUt(false);
  }
  GetKey(t, e) {
    return this.dFe;
  }
}
exports.MotorcycleTogetherRoleItem = MotorcycleTogetherRoleItem;
//# sourceMappingURL=MotorcycleTogetherRoleItem.js.map