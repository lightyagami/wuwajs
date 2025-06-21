"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAreaMonsterItem = void 0;
const UE = require("ue"),
  PhantomArenaCardComponentLogic_1 = require("../../Card/PhantomArenaCardComponentLogic"),
  PhantomArenaCardShowComponent_1 = require("../../Card/PhantomArenaCardShowComponent"),
  PhantomArenaAreaItemBase_1 = require("./PhantomArenaAreaItemBase");
class PhantomArenaAreaMonsterItem extends PhantomArenaAreaItemBase_1.PhantomArenaAreaItemBase {
  constructor() {
    super(...arguments), this._51 = void 0, this.u51 = void 0, this.c51 = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem]
    ]
  }
  OnStartImplement() {}
  Refresh(t) {}
  SetHoverStateActive(t) {
    this.GetItem(2).SetUIActive(t)
  }
  SetCanUseStateActive(t) {
    this.GetItem(0).SetUIActive(t)
  }
  GetCardRootItem() {
    return this.GetItem(1)
  }
  async SetBuffUpActive(t) {
    var e;
    this._51 || (this._51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic, await (e = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent).CreateByResourceIdAsync("PnlStateBuffUp", this.GetItem(3)), this._51.SetCardShowComponent(e)), this._51.SetActive(t)
  }
  async SetBuffDownActive(t) {
    var e;
    this.u51 || (this.u51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic, await (e = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent).CreateByResourceIdAsync("PnlStateBuffDown", this.GetItem(3)), this.u51.SetCardShowComponent(e)), this.u51.SetActive(t)
  }
  async SetEvolveActive(t) {
    var e;
    this.c51 || (this.c51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic, await (e = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent).CreateByResourceIdAsync("PnlStateEat", this.GetItem(3)), this.c51.SetCardShowComponent(e)), this.c51.SetActive(t)
  }
}
exports.PhantomArenaAreaMonsterItem = PhantomArenaAreaMonsterItem;
//# sourceMappingURL=PhantomArenaAreaMonsterItem.js.map