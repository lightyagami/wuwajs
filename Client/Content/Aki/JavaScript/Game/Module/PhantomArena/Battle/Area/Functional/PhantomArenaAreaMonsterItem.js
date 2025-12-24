"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAreaMonsterItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PhantomArenaCardComponentLogic_1 = require("../../Card/PhantomArenaCardComponentLogic");
const PhantomArenaCardShowComponent_1 = require("../../Card/PhantomArenaCardShowComponent");
const PhantomArenaAreaItemBase_1 = require("./PhantomArenaAreaItemBase");
class PhantomArenaAreaMonsterItem extends PhantomArenaAreaItemBase_1.PhantomArenaAreaItemBase {
  constructor() {
    super(...arguments);
    this.HRr = undefined;
    this.$51 = undefined;
    this.W51 = undefined;
    this.Q51 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  Refresh(e) {}
  SetHoverStateActive(e) {
    this.GetItem(2).SetUIActive(e);
  }
  SetCanUseStateActive(e) {
    this.GetItem(0).SetUIActive(e);
  }
  GetCardRootItem() {
    return this.GetItem(1);
  }
  async SetBuffUpActive(e) {
    var t;
    var a;
    if (!this.$51) {
      this.$51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic();
      t = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent();
      a = ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb ? "PnlStateBuffUp" : "PnlStateBuffUp_New";
      await t.CreateByResourceIdAsync(a, this.GetItem(3));
      this.$51.SetCardShowComponent(t);
    }
    this.$51.SetActive(e);
  }
  async SetBuffDownActive(e) {
    var t;
    var a;
    if (!this.W51) {
      this.W51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic();
      t = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent();
      a = ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb ? "PnlStateBuffDown" : "PnlStateBuffDown_New";
      await t.CreateByResourceIdAsync(a, this.GetItem(3));
      this.W51.SetCardShowComponent(t);
    }
    this.W51.SetActive(e);
  }
  async SetEvolveActive(e) {
    var t;
    if (!this.Q51) {
      this.Q51 = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic();
      await (t = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent()).CreateByResourceIdAsync("PnlStateEat", this.GetItem(3));
      this.Q51.SetCardShowComponent(t);
    }
    this.Q51.SetActive(e);
  }
  async SetIncreaseActive(e) {
    var t;
    if (!this.HRr) {
      this.HRr = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic();
      this.HRr.IsNeedAutoHide = false;
      await (t = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent()).CreateByResourceIdAsync("PnlStateIncrease", this.GetItem(3));
      this.HRr.SetCardShowComponent(t);
    }
    this.HRr.SetActive(e);
  }
}
exports.PhantomArenaAreaMonsterItem = PhantomArenaAreaMonsterItem;
//# sourceMappingURL=PhantomArenaAreaMonsterItem.js.map