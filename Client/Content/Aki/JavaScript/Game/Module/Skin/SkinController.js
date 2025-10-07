"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const WeaponInstance_1 = require("../Weapon/WeaponInstance");
const ShopSkinData_1 = require("./Data/ShopSkinData");
const SkinBuyDetailViewData_1 = require("./Data/SkinBuyDetailViewData");
const FlySkinObtainView_1 = require("./FlySkinObtainView");
const SkinObtainView_1 = require("./SkinObtainView");
const SkinRootViewModel_1 = require("./SkinRootViewModel");
class SkinController extends UiControllerBase_1.UiControllerBase {
  static OpenObtainSkinView(e, i) {
    var n = new SkinObtainView_1.SkinObtainViewData();
    n.ObtainSkinData = e;
    n.OtherRewardData = i;
    UiManager_1.UiManager.OpenView("SkinObtainView", n);
  }
  static OpenObtainFlySkinView(e, i) {
    var n = new FlySkinObtainView_1.FlySkinObtainViewData();
    n.ObtainFlySkinData = e;
    n.OtherRewardData = i;
    UiManager_1.UiManager.OpenView("FlySkinObtainView", n);
  }
  static OpenBuyRoleSkinDetailView(e) {
    var i = new Array();
    for (const a of e) {
      const n = ShopSkinData_1.ShopSkinData.Create(a);
      i.push(n);
    }
    const n = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create(i);
    n.SetPreviewTitle("RoleSkinShopTitle_Text");
    UiManager_1.UiManager.OpenView("SkinBuyDetailView", n);
  }
  static OpenBuyRoleSkinPreviewDetailViewByRoleSkinData(e) {
    e = SkinBuyDetailViewData_1.SkinBuyDetailViewData.CreateByRoleSkinData(e);
    e.SetPreviewTitle("RoleSkinPreviewTitle_Text");
    UiManager_1.UiManager.OpenView("SkinBuyDetailView", e);
  }
  static OpenSkinShowView(e) {
    UiManager_1.UiManager.OpenView("SkinShowView", e);
  }
  static SkipToSkinView(e, i, n, a = -1, t, o, r) {
    var l = new SkinRootViewModel_1.SkinRootViewModel();
    var _ = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e);
    if (_ instanceof WeaponInstance_1.WeaponInstance) {
      l.SetViewData({
        RoleId: e,
        WeaponId: _.GetIncId(),
        TabViewName: i,
        NeedLoadRole: n,
        FlySkinId: o,
        FlySkinTab: r
      });
      l.SelectRoleSkinId = a;
      UiManager_1.UiManager.OpenView("SkinRootView", l, t);
    }
  }
  static SkipToCalabashSkinView(e) {
    var i;
    var n;
    var a = new SkinRootViewModel_1.SkinRootViewModel();
    var t = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (t && (i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(t)) instanceof WeaponInstance_1.WeaponInstance) {
      n = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataByRoleId(t)?.GetItemId() ?? -1;
      a.SelectRoleSkinId = n;
      a.SetViewData({
        RoleId: t,
        WeaponId: i.GetIncId(),
        TabViewName: "CalabashSkinTabView",
        NeedLoadRole: true,
        CalabashSkinId: e
      });
      UiManager_1.UiManager.OpenView("SkinRootView", a);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29694, e => {
      ModelManager_1.ModelManager.RoleSkinModel.UpdateUnlockRoleSkin(e.bBs);
      ModelManager_1.ModelManager.RoleSkinModel.UpdateWeaponSkinFirstWearRecord(e.bBs);
      ModelManager_1.ModelManager.RoleSkinModel.AddRoleSkinNewFlag(e.bBs);
    });
    Net_1.Net.Register(26759, e => {
      ModelManager_1.ModelManager.RoleSkinModel.UpdateUnlockRoleSkinDataFull(e.bBs);
      ModelManager_1.ModelManager.RoleSkinModel.UpdateWeaponSkinFirstWearRecord(e.bBs);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29694);
    Net_1.Net.UnRegister(26759);
  }
  static nTl() {
    var e = new Protocol_1.Aki.Protocol.ep_();
    Net_1.Net.Call(28867, Protocol_1.Aki.Protocol.ep_.create(e), e => {
      if (e) {
        ModelManager_1.ModelManager.RoleSkinModel.UpdateUnlockRoleSkin(e.bBs);
      }
    });
  }
  static CheckCanWearSkinAndShowTip() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(206);
    if (e.HasTag(-1371021686) || e.HasTag(1996802261)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_ForbiddenActionInFight_Text");
      return false;
    } else if (e.HasTag(-1504358738)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_ForbiddenActionInSwimming_Text");
      return false;
    } else if (e.HasTag(504239013)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_ForbiddenActionInClimbing_Text");
      return false;
    } else {
      return !e.HasTag(40422668) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_ForbiddenActionMidair_Text"), false);
    }
  }
}
(exports.SkinController = SkinController).xkt = () => {
  SkinController.nTl();
};
//# sourceMappingURL=SkinController.js.map