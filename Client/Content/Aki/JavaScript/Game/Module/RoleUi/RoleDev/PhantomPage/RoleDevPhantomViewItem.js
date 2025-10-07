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
    this.jad = [];
    this.lpt = undefined;
    this.aCd = undefined;
    this.UiViewSequence = undefined;
    this.Pe = undefined;
    this.Had = () => new RoleDevPhantomSuitItem_1.RoleDevPhantomSuitItem();
    this.$ad = () => {
      ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 3, 16);
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex = 0;
      var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(this.Pe.RoleId, 0);
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId = e;
      PhantomUtil_1.PhantomUtil.OpenVisionEquipmentView(this.Pe.RoleId, 0);
    };
    this.Qad = () => {
      ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 3, 17);
      var e = {
        RoleId: this.Pe.RoleId,
        IsFromRoleDev: true,
        SuccessCallBack: this.PYd,
        GetSelectedFetterGroupIdCallBack: this.AYd
      };
      UiManager_1.UiManager.OpenView("VisionRecommendView", e);
    };
    this.PYd = (e, t) => {
      this.Pe?.RoleDevViewModel?.SetRoleRecommendFetterGroupId(e, t);
      this.OnChangeFetterGroupSuccessCallBack?.(e, t);
    };
    this.AYd = e => this.Pe?.RoleDevViewModel?.GetRoleRecommendFetterGroupId(e) ?? 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIVerticalLayout], [10, UE.UIItem]];
    this.BtnBindInfo = [[8, this.Qad]];
  }
  async OnBeforeStartAsync() {
    this.Kad();
    await Promise.all([this.Xad(), this.lCd()]);
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  async Xad() {
    var t = [];
    this.jad.length = 0;
    for (let e = 3; e <= 7; e++) {
      var i = new RoleDevPhantomHeadItem_1.RoleDevPhantomHeadItem(e - 3);
      t.push(i.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
      this.jad.push(i);
    }
    await Promise.all(t);
  }
  Kad() {
    this.lpt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.Had);
  }
  Refresh(e) {
    this.Pe = e;
    if (ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e.RoleId) !== undefined) {
      this.GetItem(0).SetUIActive(true);
      this._Cd(e.SuitDataList);
      this.zad(e.RoleId);
      this.Jad();
      this.Xkd();
    } else {
      this.GetItem(0).SetUIActive(false);
      this._Cd(e.SuitDataList);
    }
  }
  Xkd() {
    var t = this.jad.length;
    for (let e = 0; e < t; e++) {
      this.jad[e].SetRoleId(this.Pe.RoleId);
    }
  }
  zad(e) {
    e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    if (e) {
      var t = ModelManager_1.ModelManager.PhantomBattleModel?.GetCurrentViewShowPhantomList(e);
      var i = this.jad.length;
      for (let e = 0; e < i; e++) {
        var s = t && t.length > e ? t[e] : undefined;
        this.jad[e].UpdateItem(s);
      }
    }
  }
  Jad() {
    this.GetItem(2).SetUIActive(false);
    this.aCd.SetFunction(this.$ad);
    this.aCd.SetLocalTextNew("RoleProject_Button01");
  }
  _Cd(e) {
    if (this.lpt) {
      this.lpt.RefreshByData(e);
    }
  }
  async lCd() {
    this.aCd = new ButtonItem_1.ButtonItem();
    await Promise.all([this.aCd.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
  }
}
exports.RoleDevPhantomViewItem = RoleDevPhantomViewItem;
//# sourceMappingURL=RoleDevPhantomViewItem.js.map