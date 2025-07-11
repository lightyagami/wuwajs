"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAreaMonsterItem = undefined;
const UE = require("ue");
const PhantomArenaCardComponentLogic_1 = require("../../Card/PhantomArenaCardComponentLogic");
const PhantomArenaCardShowComponent_1 = require("../../Card/PhantomArenaCardShowComponent");
const PhantomArenaAreaItemBase_1 = require("./PhantomArenaAreaItemBase");
class PhantomArenaAreaMonsterItem extends PhantomArenaAreaItemBase_1.PhantomArenaAreaItemBase {
  constructor() {
    super(...arguments);
    this.$51 = undefined;
    this.W51 = undefined;
    this.Q51 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStartImplement() {}
  Refresh(t) {}
  SetHoverStateActive(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetCanUseStateActive(t) {
    this.GetItem(0).SetUIActive(t);
  }
  GetCardRootItem() {
    return this.GetItem(1);
  }
  async SetBuffUpActive(t) {
    var e;
    if (!this.$51) {
      this.$51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic();
      await (e = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent()).CreateByResourceIdAsync("PnlStateBuffUp", this.GetItem(3));
      this.$51.SetCardShowComponent(e);
    }
    this.$51.SetActive(t);
  }
  async SetBuffDownActive(t) {
    var e;
    if (!this.W51) {
      this.W51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic();
      await (e = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent()).CreateByResourceIdAsync("PnlStateBuffDown", this.GetItem(3));
      this.W51.SetCardShowComponent(e);
    }
    this.W51.SetActive(t);
  }
  async SetEvolveActive(t) {
    var e;
    if (!this.Q51) {
      this.Q51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic();
      await (e = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent()).CreateByResourceIdAsync("PnlStateEat", this.GetItem(3));
      this.Q51.SetCardShowComponent(e);
    }
    this.Q51.SetActive(t);
  }
}
exports.PhantomArenaAreaMonsterItem = PhantomArenaAreaMonsterItem;
//# sourceMappingURL=PhantomArenaAreaMonsterItem.js.map