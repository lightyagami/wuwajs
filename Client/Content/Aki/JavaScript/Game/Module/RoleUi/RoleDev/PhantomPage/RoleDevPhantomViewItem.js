"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomViewItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const PhantomUtil_1 = require("../../../Phantom/PhantomUtil");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const RoleDevPhantomHeadItem_1 = require("./RoleDevPhantomHeadItem");
const RoleDevPhantomSuitItem_1 = require("./RoleDevPhantomSuitItem");
class RoleDevPhantomViewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.OnDevelopCallBack = undefined;
    this.OnPerfectDevelopCallBack = undefined;
    this.OnChangeFetterGroupSuccessCallBack = undefined;
    this.Zsd = [];
    this.lpt = undefined;
    this.wvd = undefined;
    this.UiViewSequence = undefined;
    this.Pe = undefined;
    this.ead = () => new RoleDevPhantomSuitItem_1.RoleDevPhantomSuitItem();
    this.tad = () => {
      ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 3, 16);
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex = 0;
      var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(this.Pe.RoleId, 0);
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId = e;
      PhantomUtil_1.PhantomUtil.OpenVisionEquipmentView(this.Pe.RoleId, 0);
    };
    this.oad = () => {
      ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 3, 17);
      var e = {
        RoleId: this.Pe.RoleId,
        IsFromRoleDev: true,
        SuccessCallBack: this.$bm,
        GetSelectedFetterGroupIdCallBack: this.Wbm
      };
      UiManager_1.UiManager.OpenView("VisionRecommendView", e);
    };
    this.$bm = (e, t) => {
      this.Pe?.RoleDevViewModel?.SetRoleRecommendFetterGroupId(e, t);
      this.OnChangeFetterGroupSuccessCallBack?.(e, t);
    };
    this.Wbm = e => this.Pe?.RoleDevViewModel?.GetRoleRecommendFetterGroupId(e) ?? 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIVerticalLayout], [10, UE.UIItem]];
    this.BtnBindInfo = [[8, this.oad]];
  }
  async OnBeforeStartAsync() {
    this.nad();
    await Promise.all([this.sad(), this.Pvd()]);
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  async sad() {
    var t = [];
    this.Zsd.length = 0;
    for (let e = 3; e <= 7; e++) {
      var i = new RoleDevPhantomHeadItem_1.RoleDevPhantomHeadItem(e - 3);
      t.push(i.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
      this.Zsd.push(i);
    }
    await Promise.all(t);
  }
  nad() {
    this.lpt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.ead);
  }
  Refresh(e) {
    this.Pe = e;
    if (ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e.RoleId) !== undefined) {
      this.GetItem(0).SetUIActive(true);
      this.Avd(e.SuitDataList);
      this.had(e.RoleId);
      this.lad();
      this.dGd();
    } else {
      this.GetItem(0).SetUIActive(false);
      this.Avd(e.SuitDataList);
    }
  }
  dGd() {
    var t = this.Zsd.length;
    for (let e = 0; e < t; e++) {
      this.Zsd[e].SetRoleId(this.Pe.RoleId);
    }
  }
  had(e) {
    e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    if (e) {
      var t = ModelManager_1.ModelManager.PhantomBattleModel?.GetCurrentViewShowPhantomList(e);
      var i = this.Zsd.length;
      for (let e = 0; e < i; e++) {
        var s = t && t.length > e ? t[e] : undefined;
        this.Zsd[e].UpdateItem(s);
      }
    }
  }
  lad() {
    this.GetItem(2).SetUIActive(false);
    this.wvd.SetFunction(this.tad);
    this.wvd.SetLocalTextNew("RoleProject_Button01");
  }
  Avd(e) {
    if (this.lpt) {
      this.lpt.RefreshByData(e);
    }
  }
  async Pvd() {
    this.wvd = new ButtonItem_1.ButtonItem();
    await Promise.all([this.wvd.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
  }
}
exports.RoleDevPhantomViewItem = RoleDevPhantomViewItem;
//# sourceMappingURL=RoleDevPhantomViewItem.js.map