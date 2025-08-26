"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleBuyRolePreviewPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleDefine_1 = require("../RogueBattleDefine");
const RogueBattleBuyRoleStarItem_1 = require("./RogueBattleBuyRoleStarItem");
const RogueBattleFetterLvUpItem_1 = require("./RogueBattleFetterLvUpItem");
const RogueBattleShopButton_1 = require("./RogueBattleShopButton");
const RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleBuyRolePreviewPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this._Xe = e;
    this.BackBtnFunc = undefined;
    this.$be = undefined;
    this.l01 = undefined;
    this.Pe = undefined;
    this.ZAt = undefined;
    this.aho = undefined;
    this.ilo = () => {
      var e;
      var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
      if (t) {
        if ((e = this.Pe.mIc).qN_ > ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.L8n)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RogueBattle_BuyItemNotEnough");
        } else {
          t.Select(e.c5n);
        }
      }
    };
    this.tlo = () => {
      this.BackBtnFunc?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIVerticalLayout], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.tlo]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.aho = new RogueBattleTokenElement_1.RogueBattleTokenElement();
    e.push(this.aho.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.ZAt = new RogueBattleShopButton_1.RogueBattleShopButton();
    e.push(this.ZAt.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), () => new RogueBattleBuyRoleStarItem_1.RogueBattleBuyRoleStarItem());
    this.l01 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), () => new RogueBattleFetterLvUpItem_1.RogueBattleFetterLvUpItem());
    await Promise.all(e);
    this.ZAt.SetFunction(this.ilo);
  }
  Refresh(e) {
    this.Pe = e;
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.mIc.if1);
    if (t) {
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(e.mIc.if1);
      const s = t.GetRoleConfig();
      const n = ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar;
      const l = e.mIc.F6n;
      const u = i?.F6n ?? 0 + l;
      this.aho.Refresh(s.ElementId, false, 0);
      this.GetText(1).SetText(t.GetName());
      i = e.mIc.qN_;
      t = e.mIc.L8n;
      e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.mIc.L8n);
      this.ZAt.SetCostItem(t);
      this.ZAt.SetCostText(i.toString(), e < i);
      t = new UiAsyncTask_1.UiAsyncTask("RogueBattleBuyRolePreviewPanel.Refresh", async () => {
        var e = [];
        var t = [];
        for (let e = 0; e < n; e++) {
          t.push(e < u);
        }
        e.push(this.$be.RefreshByDataAsync(t));
        var i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(s.Id);
        if (i) {
          var a = [];
          for (const r of i.BondIds) {
            var o = {
              OldRoleBondInfo: ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(r),
              NewRoleBondInfo: ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondPreviewDataById(r, l),
              AddStar: l
            };
            a.push(o);
          }
          a.sort(RogueBattleDefine_1.sortRogueBattleRoleBondUpdateInfo);
          e.push(this.l01.RefreshByDataAsync(a));
        }
        await Promise.all(e);
        this.Cvu(true);
        this.SetActive(true);
      });
      this.RunAsyncTask(t);
    }
  }
  Cvu(t) {
    if (this.Pe) {
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(this.Pe.mIc.if1);
      var e = ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar;
      var a = this.Pe.mIc.F6n;
      var i = i?.F6n ?? 0;
      var o = Math.min(i + a, e);
      for (let e = i; e < o; e++) {
        this.$be.GetLayoutItemByIndex(e)?.SetPreviewAnimOn(t);
      }
    }
  }
}
exports.RogueBattleBuyRolePreviewPanel = RogueBattleBuyRolePreviewPanel;
//# sourceMappingURL=RogueBattleBuyRolePreviewPanel.js.map