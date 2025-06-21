"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AbyssDangoRolePanel = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  PlayerTitleItem_1 = require("../../../../Common/PlayerTitleItem"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  SolarSpeedRolePanelBase_1 = require("./SolarSpeedRolePanelBase");
class AbyssDangoRolePanel extends SolarSpeedRolePanelBase_1.SolarSpeedRolePanelBase {
  constructor() {
    super(...arguments), this.yc1 = void 0, this.VRc = void 0, this.Sc1 = void 0, this.rhc = void 0, this.Mc1 = e => {
      var t, s;
      this.Sc1 === e && (t = ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerLikeCount(e), s = ModelManager_1.ModelManager.PlayerInfoModel.GetId(), s = ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerIfLikePlayer(s, e), this.VRc.Refresh(t, e, s))
    }
  }
  async Anc() {
    this.yc1 = new AbyssDangoDescContent, await this.yc1.CreateThenShowByResourceIdAsync("UiItem_RaceResulInfo", this.GetItem(11)), this.VRc = new AbyssDangoLikeItem, await this.VRc.CreateByActorAsync(this.GetItem(18).GetOwner()), this.VRc.GetRootItem().SetHierarchyIndex(0), this.rhc = new PlayerTitleItem_1.PlayerTitleItem, await this.rhc.CreateThenShowByResourceIdAsync("UiItem_TitlesCom", this.GetItem(16)), this.GetItem(16).SetUIActive(!0)
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssLikeChange, this.Mc1)
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssLikeChange, this.Mc1)
  }
  async OnBeforeStartAsync() {
    await Promise.all([super.OnBeforeStartAsync(), this.Anc()]), this.GetItem(12).SetUIActive(!1)
  }
  OnStart() {
    this.dde()
  }
  OnBeforeDestroy() {
    this.Cde()
  }
  cwc(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(e.AvatarTexturePath).Path;
    this.SetTextureByPath(e, this.GetTexture(14))
  }
  $01(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(e.LineTexturePath).Path;
    this.SetTextureByPath(e, this.GetTexture(15))
  }
  Gac(e) {
    void 0 !== e.PlayerTitle && 0 < e.PlayerTitle && this.GetItem(16).SetUIActive(!0), this.rhc.Refresh(e.PlayerTitle, e.PlayerTitleStarLevel, e.Sex)
  }
  aR1(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(e.BgTexturePath).Path;
    this.SetTextureByPath(e, this.GetTexture(1))
  }
  OnRefresh(e) {
    this.Sc1 = e.PlayerId, this.yc1.Refresh(e);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerIfLikePlayer(t, e.PlayerId);
    this.VRc.Refresh(e.LikeCount, e.PlayerId, t), this.VRc.RefreshLineState(!e.IsSelf), this.VRc.SetActive(!0), this.Gac(e), this.cwc(e), this.$01(e), this.aR1(e), this.SetFriendItemState(!e.IsSelf)
  }
}
exports.AbyssDangoRolePanel = AbyssDangoRolePanel;
class AbyssDangoDescContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Scroll = void 0, this.fke = () => new AbyssDangoDescItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem]
    ]
  }
  OnStart() {
    this.Scroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.fke, this.GetItem(2).GetOwner())
  }
  Pnc(e) {
    var t = new UiAsyncTask_1.UiAsyncTask("AbyssDangoDescContent.Refresh", async () => {
      await this.Scroll.RefreshByDataAsync(e)
    });
    this.RunAsyncTask(t)
  }
  Refresh(e) {
    var t, s, i = e.MainDescData;
    0 < i.length && (t = ModelManager_1.ModelManager.DangoAbyssModel.GetMainHonorRank(i, !0), i = i[0], s = (s = (i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssSettleById(i.Id)).Title.size) - 1 <= t ? s - 1 : t, t = Array.from(i.Title.keys())[s], s = i.Title.get(t) ?? "", LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s)), this.Pnc(e.SubDescData)
  }
}
class AbyssDangoDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText]
    ]
  }
  Refresh(e) {
    this.GetItem(0)?.SetUIActive(this.GridIndex % 2 == 0);
    var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssSettleById(e.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.BaseTitle), t.IsTotalRatio ? this.GetText(2)?.SetText(e.Count.toString() + "%") : this.GetText(2)?.SetText(e.Count.toString())
  }
}
class AbyssDangoLikeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Ec1 = void 0, this.Sc1 = void 0, this.MHe = () => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.AbyssLikePlayer(this.Sc1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.MHe]
    ]
  }
  async OnBeforeStartAsync() {
    this.Ec1 = new AbyssDangoLikeCountItem, await this.Ec1.CreateByActorAsync(this.GetItem(1).GetOwner()), this.Ec1.SetActive(!1)
  }
  Refresh(e, t, s = !1) {
    this.Sc1 = t, this.Ec1.Refresh(e), this.Ec1.SetActive(s), this.GetButton(0)?.RootUIComp.SetUIActive(!s)
  }
  RefreshLineState(e) {
    this.GetItem(2)?.SetUIActive(e)
  }
}
class AbyssDangoLikeCountItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  Refresh(e) {
    this.GetText(0)?.SetText(e.toString())
  }
}
//# sourceMappingURL=AbyssDangoRolePanel.js.map