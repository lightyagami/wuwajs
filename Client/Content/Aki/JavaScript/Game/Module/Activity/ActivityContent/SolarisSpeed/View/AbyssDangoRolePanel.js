"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssDangoRolePanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const PlayerTitleItem_1 = require("../../../../Common/PlayerTitleItem");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const SolarSpeedRolePanelBase_1 = require("./SolarSpeedRolePanelBase");
class AbyssDangoRolePanel extends SolarSpeedRolePanelBase_1.SolarSpeedRolePanelBase {
  constructor() {
    super(...arguments);
    this.jc1 = undefined;
    this.VRc = undefined;
    this.Hc1 = undefined;
    this.rhc = undefined;
    this.$c1 = e => {
      var t;
      var s;
      if (this.Hc1 === e) {
        t = ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerLikeCount(e);
        s = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        s = ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerIfLikePlayer(s, e);
        this.VRc.Refresh(t, e, s);
      }
    };
  }
  async Anc() {
    this.jc1 = new AbyssDangoDescContent();
    await this.jc1.CreateThenShowByResourceIdAsync("UiItem_RaceResulInfo", this.GetItem(11));
    this.VRc = new AbyssDangoLikeItem();
    await this.VRc.CreateByActorAsync(this.GetItem(18).GetOwner());
    this.VRc.GetRootItem().SetHierarchyIndex(0);
    this.rhc = new PlayerTitleItem_1.PlayerTitleItem();
    await this.rhc.CreateThenShowByResourceIdAsync("UiItem_TitlesCom", this.GetItem(16));
    this.GetItem(16).SetUIActive(true);
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssLikeChange, this.$c1);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssLikeChange, this.$c1);
  }
  async OnBeforeStartAsync() {
    await Promise.all([super.OnBeforeStartAsync(), this.Anc()]);
    this.GetItem(12).SetUIActive(false);
  }
  OnStart() {
    this.dde();
  }
  OnBeforeDestroy() {
    this.Cde();
  }
  cwc(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(e.AvatarTexturePath).Path;
    this.SetTextureByPath(e, this.GetTexture(14));
  }
  fp1(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(e.LineTexturePath).Path;
    this.SetTextureByPath(e, this.GetTexture(15));
  }
  Gac(e) {
    if (e.PlayerTitle !== undefined && e.PlayerTitle > 0) {
      this.GetItem(16).SetUIActive(true);
    }
    this.rhc.Refresh(e.PlayerTitle, e.PlayerTitleStarLevel, e.Sex);
  }
  UR1(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(e.BgTexturePath).Path;
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  OnRefresh(e) {
    this.Hc1 = e.PlayerId;
    this.jc1.Refresh(e);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerIfLikePlayer(t, e.PlayerId);
    this.VRc.Refresh(e.LikeCount, e.PlayerId, t);
    this.VRc.RefreshLineState(!e.IsSelf);
    this.VRc.SetActive(true);
    this.Gac(e);
    this.cwc(e);
    this.fp1(e);
    this.UR1(e);
    this.SetFriendItemState(!e.IsSelf);
  }
}
exports.AbyssDangoRolePanel = AbyssDangoRolePanel;
class AbyssDangoDescContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Scroll = undefined;
    this.fke = () => new AbyssDangoDescItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  OnStart() {
    this.Scroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.fke, this.GetItem(2).GetOwner());
  }
  Pnc(e) {
    var t = new UiAsyncTask_1.UiAsyncTask("AbyssDangoDescContent.Refresh", async () => {
      await this.Scroll.RefreshByDataAsync(e);
    });
    this.RunAsyncTask(t);
  }
  Refresh(e) {
    var t;
    var s;
    var i = e.MainDescData;
    if (i.length > 0) {
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetMainHonorRank(i, true);
      i = i[0];
      s = (s = (i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssSettleById(i.Id)).Title.size) - 1 <= t ? s - 1 : t;
      t = Array.from(i.Title.keys())[s];
      s = i.Title.get(t) ?? "";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s);
    }
    this.Pnc(e.SubDescData);
  }
}
class AbyssDangoDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e) {
    this.GetItem(0)?.SetUIActive(this.GridIndex % 2 == 0);
    var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssSettleById(e.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.BaseTitle);
    if (t.IsTotalRatio) {
      this.GetText(2)?.SetText(e.Count.toString() + "%");
    } else {
      this.GetText(2)?.SetText(e.Count.toString());
    }
  }
}
class AbyssDangoLikeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Wc1 = undefined;
    this.Hc1 = undefined;
    this.MHe = () => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.AbyssLikePlayer(this.Hc1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.MHe]];
  }
  async OnBeforeStartAsync() {
    this.Wc1 = new AbyssDangoLikeCountItem();
    await this.Wc1.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.Wc1.SetActive(false);
  }
  Refresh(e, t, s = false) {
    this.Hc1 = t;
    this.Wc1.Refresh(e);
    this.Wc1.SetActive(s);
    this.GetButton(0)?.RootUIComp.SetUIActive(!s);
  }
  RefreshLineState(e) {
    this.GetItem(2)?.SetUIActive(e);
  }
}
class AbyssDangoLikeCountItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e) {
    this.GetText(0)?.SetText(e.toString());
  }
}
//# sourceMappingURL=AbyssDangoRolePanel.js.map