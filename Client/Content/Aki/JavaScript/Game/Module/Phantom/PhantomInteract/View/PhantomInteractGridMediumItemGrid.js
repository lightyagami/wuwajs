"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractGridMediumItemGrid = undefined;
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const PhantomInteractModel_1 = require("../PhantomInteractModel");
class PhantomInteractGridMediumItemGrid extends MediumItemGrid_1.MediumItemGrid {
  constructor() {
    super(...arguments);
    this.Nji = undefined;
    this.NOe = -1;
    this.$8i = undefined;
    this.Twf = false;
    this.RFe = t => {
      if (t.State !== 1) {
        this.GetItemGridExtendToggle().SetToggleState(1, false);
      } else {
        this.Nji?.(this.$8i, this.NOe);
      }
    };
  }
  Refresh(t, e, i) {
    this.NOe = i;
    let s = 0;
    if ((this.$8i = t).IsSpecial) {
      s = t.IsInArea ? 1 : 2;
    }
    this.Twf = PhantomInteractModel_1.PhantomInteractModel.CheckPhantomInteractUnlockRedDot(t.MonsterId) && t.InSlotIndex < 0;
    i = {
      Type: 3,
      Data: t,
      MonsterId: t.MonsterInfoId,
      BottomTextId: t.Name,
      Level: t.Cost,
      IsLevelTextUseChangeColor: true,
      SpecialSkill: s,
      IsDisable: !t.IsUnlocked,
      SortNum: t.InSlotIndex + 1,
      IsRedDotVisible: this.Twf,
      QualityId: 1
    };
    this.SetUseFixedAsync(true);
    this.Apply(i);
  }
  OnStart() {
    this.BindOnExtendToggleStateChanged(this.RFe);
  }
  SetOnClickCallBack(t) {
    this.Nji = t;
  }
}
exports.PhantomInteractGridMediumItemGrid = PhantomInteractGridMediumItemGrid;
//# sourceMappingURL=PhantomInteractGridMediumItemGrid.js.map