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
const EquipBuffItemDetailViewData_1 = require("./Data/EquipBuffItemDetailViewData");
const RoleSkinData_1 = require("./Data/RoleSkinData");
const ShopSkinData_1 = require("./Data/ShopSkinData");
const SkinBuyDetailViewData_1 = require("./Data/SkinBuyDetailViewData");
const FlySkinObtainView_1 = require("./FlySkinObtainView");
const SkinObtainView_1 = require("./SkinObtainView");
class SkinController extends UiControllerBase_1.UiControllerBase {
  static OpenObtainSkinView(e, i) {
    var a = new SkinObtainView_1.SkinObtainViewData();
    a.ObtainSkinData = e;
    a.OtherRewardData = i;
    UiManager_1.UiManager.OpenView("SkinObtainView", a);
  }
  static OpenObtainFlySkinView(e, i) {
    var a = new FlySkinObtainView_1.FlySkinObtainViewData();
    a.ObtainFlySkinData = e;
    a.OtherRewardData = i;
    UiManager_1.UiManager.OpenView("FlySkinObtainView", a);
  }
  static OpenBuyRoleSkinDetailView(e) {
    var i = new Array();
    for (const n of e) {
      const a = ShopSkinData_1.ShopSkinData.Create(n);
      i.push(a);
    }
    const a = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create(i);
    a.SetPreviewTitle("RoleSkinShopTitle_Text");
    UiManager_1.UiManager.OpenView("SkinBuyDetailView", a);
  }
  static OpenBuyRoleSkinPreviewDetailViewByRoleSkinData(e) {
    e = SkinBuyDetailViewData_1.SkinBuyDetailViewData.CreateByRoleSkinData(e);
    e.SetPreviewTitle("RoleSkinPreviewTitle_Text");
    UiManager_1.UiManager.OpenView("SkinBuyDetailView", e);
  }
  static OpenBuyRoleSkinPreviewDetailViewByActivityRoleSkinData(e, i) {
    e = SkinBuyDetailViewData_1.SkinBuyDetailViewData.CreateByRoleSkinData(e);
    e.SetPreviewTitle("RoleSkinPreviewTitle_Text");
    e.SetIsActivityReward(true);
    if (i) {
      e.SetIndex(1);
    }
    UiManager_1.UiManager.OpenView("SkinBuyDetailView", e);
  }
  static OpenSkinShowView(e) {
    UiManager_1.UiManager.OpenView("SkinShowView", e);
  }
  static OpenEquipBuffItemShowView(e, i) {
    var a;
    var n;
    var t = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (t && (a = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t))) {
      a = a.GetRoleSkinId();
      a = new RoleSkinData_1.RoleSkinData(a);
      (n = new EquipBuffItemDetailViewData_1.EquipBuffItemDetailViewData()).RoleSkinData = a;
      n.LoadFromItemId(e);
      ModelManager_1.ModelManager.BuffItemModel.SetCurrentPreviewItemData(e, t);
      UiManager_1.UiManager.OpenView("EquipBuffItemDetailView", n);
    }
  }
  static SkipToSkinView(e, i, a, n = -1, t, o, r) {
    var l = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e);
    if (l instanceof WeaponInstance_1.WeaponInstance) {
      e = {
        RoleId: e,
        TabViewName: i,
        WeaponId: l.GetIncId(),
        NeedLoadRole: a,
        FlySkinId: o,
        FlySkinTab: r,
        SelectRoleSkinId: n
      };
      UiManager_1.UiManager.OpenView("SkinRootView", e, t);
    }
  }
  static SkipToCalabashSkinView(e) {
    var i;
    var a;
    var n = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (n && (i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(n)) instanceof WeaponInstance_1.WeaponInstance) {
      a = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataByRoleId(n)?.GetItemId() ?? -1;
      n = {
        RoleId: n,
        TabViewName: "CalabashSkinTabView",
        WeaponId: i.GetIncId(),
        NeedLoadRole: true,
        CalabashSkinId: e,
        SelectRoleSkinId: a
      };
      UiManager_1.UiManager.OpenView("SkinRootView", n);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26889, e => {
      ModelManager_1.ModelManager.RoleSkinModel.UpdateUnlockRoleSkin(e.bBs);
      ModelManager_1.ModelManager.RoleSkinModel.UpdateWeaponSkinFirstWearRecord(e.bBs);
      ModelManager_1.ModelManager.RoleSkinModel.AddRoleSkinNewFlag(e.bBs);
    });
    Net_1.Net.Register(24668, e => {
      ModelManager_1.ModelManager.RoleSkinModel.UpdateUnlockRoleSkinDataFull(e.bBs);
      ModelManager_1.ModelManager.RoleSkinModel.UpdateWeaponSkinFirstWearRecord(e.bBs);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26889);
    Net_1.Net.UnRegister(24668);
  }
  static nTl() {
    var e = new Protocol_1.Aki.Protocol.ep_();
    Net_1.Net.Call(23890, Protocol_1.Aki.Protocol.ep_.create(e), e => {
      if (e) {
        ModelManager_1.ModelManager.RoleSkinModel.UpdateUnlockRoleSkin(e.bBs);
      }
    });
  }
  static CheckCanWearSkinAndShowTip() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(217);
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