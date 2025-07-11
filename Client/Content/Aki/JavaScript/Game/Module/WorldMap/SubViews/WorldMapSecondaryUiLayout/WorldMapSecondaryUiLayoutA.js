"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUiLayoutA = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const MapController_1 = require("../../../Map/Controller/MapController");
const MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils");
const MapLogger_1 = require("../../../Map/Misc/MapLogger");
const TeleportController_1 = require("../../../Teleport/TeleportController");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapController_1 = require("../../WorldMapController");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel");
const MediumItemListPanel_1 = require("../Common/MediumItemListPanel");
const WorldMapSecondaryUiContext_1 = require("./WorldMapSecondaryUiContext");
class WorldMapSecondaryUiLayoutA extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments);
    this.ConfirmButton = undefined;
    this.TrackBtn = undefined;
    this.GotoBtn = undefined;
    this.MapTipsActivateTipPanel = undefined;
    this.LayoutContext = undefined;
    this.DeliveryPropView = undefined;
    this.yHc = this.UpdateTopRightIconActive.bind(this);
    this.OnConfirmBtnClick = () => {
      this.HandleTeleportAndTrack();
    };
    this.OnTrackBtnClick = () => {
      this.HandleTrack();
    };
    this.OnGotoBtnClick = () => {
      this.HandleQuickGoto();
    };
    this.OnDetailBtnClick = () => {};
    this.OnStripBtnClick = () => {};
    this.OnDelBtnClick = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
    this.BtnBindInfo = [[15, this.OnDetailBtnClick], [18, this.OnStripBtnClick], [39, this.OnDelBtnClick]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.ConfirmButton = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp);
    this.ConfirmButton.SetActive(true);
    this.ConfirmButton.SetFunction(this.OnConfirmBtnClick);
    this.TrackBtn = new ButtonItem_1.ButtonItem(this.GetButton(28).RootUIComp);
    this.TrackBtn.SetFunction(this.OnTrackBtnClick);
    this.GotoBtn = new ButtonItem_1.ButtonItem(this.GetButton(29).RootUIComp);
    this.GotoBtn.SetFunction(this.OnGotoBtnClick);
    this.oaa();
    this.MapTipsActivateTipPanel = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel();
    await this.MapTipsActivateTipPanel.CreateByActorAsync(this.GetItem(31).GetOwner());
    this.DeliveryPropView = new MediumItemListPanel_1.MediumItemListPanel();
    await this.DeliveryPropView.CreateThenShowByActorAsync(this.GetVerticalLayout(40).GetOwner());
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMarkTopRightIconUpdate, this.yHc);
  }
  oaa() {
    this.LayoutContext = new WorldMapSecondaryUiContext_1.WorldMapSecondaryUiContext();
    this.LayoutContext.SetSpriteByPathAction = (t, i, e, s = undefined, r = undefined) => {
      this.SetSpriteByPath(t, i, e, s, r);
    };
    this.LayoutContext.Icon = this.GetSprite(0);
    this.LayoutContext.Title = this.GetText(1);
    this.LayoutContext.AreaText = this.GetText(3);
    this.LayoutContext.AreaIconItem = this.GetItem(22);
    this.LayoutContext.DescriptionText = this.GetText(4);
    this.LayoutContext.ConfirmButtonItem = this.ConfirmButton;
    this.LayoutContext.TrackButtonItem = this.TrackBtn;
    this.LayoutContext.DownStateIcon = this.GetSprite(23);
    this.LayoutContext.PanelProgressItem = this.GetItem(14);
    this.LayoutContext.PanelListLayout = this.GetVerticalLayout(5);
    this.LayoutContext.DelButton = this.GetButton(39);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMarkTopRightIconUpdate, this.yHc);
    this.ConfirmButton.Destroy();
    this.TrackBtn.Destroy();
    this.GotoBtn.Destroy();
    this.MapTipsActivateTipPanel.Destroy();
    super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    this.GetItem(14).SetUIActive(true);
    this.GetItem(26).SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(true);
    this.GetItem(25).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetVerticalLayout(16).RootUIComp.SetUIActive(false);
    this.GetSprite(24).SetUIActive(false);
    this.MapTipsActivateTipPanel.SetUiActive(false);
    this.GetButton(39).RootUIComp.SetUIActive(false);
    this.GetVerticalLayout(40).RootUIComp.SetUIActive(false);
  }
  UpdateQuickGoto() {
    var t = this.LayoutContext.MarkItem;
    var t = MarkUiUtils_1.MarkUiUtils.IsShowGoto(t);
    this.UpdateQuickGotoActive(t);
    return t;
  }
  UpdateQuickGotoActive(t) {
    var i;
    var e;
    var s = this.LayoutContext.MarkItem;
    this.GetItem(32).SetUIActive(t);
    if (!t || (t = this.GetButton(29), i = TeleportController_1.TeleportController.CheckCanTeleport(), e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, s), t.SetSelfInteractive(i && e !== undefined), t = s.MarkItemEntity.GamePlay.IsHide, this.MapTipsActivateTipPanel.SetUiActive(!i || e === undefined || t), t)) {
      this.UpdateHidePlayMapTipPanel();
    } else {
      this.MapTipsActivateTipPanel.SetDistanceTips();
    }
  }
  UpdateHidePlayMapTipPanel() {
    var i = this.LayoutContext.MarkItem;
    var e = i.MarkItemEntity.GamePlay.IsHide;
    this.MapTipsActivateTipPanel.SetUiActive(e);
    if (e) {
      let t = undefined;
      var e = i.MarkItemEntity.GetComponent(14);
      var s = e?.GetRelativeDungeonId();
      var r = e?.GetRelativeId();
      if (e !== undefined && s !== undefined && r !== undefined) {
        t = ModelManager_1.ModelManager.LevelPlayReportModel.GetLevelPlayHideReason(s, r);
        this.MapTipsActivateTipPanel.SetHideTip(t);
      } else {
        e = i.MarkItemEntity.GetComponent(18).EntityId ?? 0;
        t = ModelManager_1.ModelManager.MapModel.GetMarkHideReason(i.MapId, e);
        this.MapTipsActivateTipPanel.SetHideTip(t);
      }
    }
  }
  UpdateEnableFastMoveLayout() {
    var t = this.LayoutContext.MarkItem;
    var i = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(t.MarkId).ShowFlag !== Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable;
    var e = !t.IsLocked;
    var t = t.MarkConfig.EnableQuickTransfer === 1;
    this.ConfirmButton.SetActive(t && e);
    this.ConfirmButton.SetEnableClick(e);
    this.UpdateQuickGotoActive(!t || !e);
    if (i) {
      this.UpdateTopRightIconActive();
    } else {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.BLOCK_MARK_ICON_PATH);
      this.UpdateTopRightIcon(true, t);
    }
  }
  UpdateMarkItemRelativeLayout() {
    this.UpdateMultiMap();
    this.UpdateTopRightIconActive();
  }
  UpdateMultiMap() {
    var t = this.LayoutContext.MarkItem.ShowSecondaryUiMultiMapIcon();
    this.GetSprite(23).SetUIActive(t);
    if (t) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH);
      this.SetSpriteByPath(t, this.GetSprite(23), false);
    }
  }
  UpdateTopRightIconActive() {
    var t = this.LayoutContext.MarkItem;
    var i = t.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(1);
    var t = t.MarkItemEntity.Resource.TopRightIconPath;
    this.UpdateTopRightIcon(i, t);
  }
  UpdateTopRightIconByTeleportState() {
    var t;
    if (!this.LayoutContext.MarkItem.MarkItemEntity.GamePlay.IsDisable) {
      this.UpdateTopRightIcon(false);
    } else {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.BLOCK_MARK_ICON_PATH);
      this.UpdateTopRightIcon(true, t);
    }
  }
  UpdateTopRightIcon(t, i) {
    this.GetSprite(24).SetUIActive(t);
    if (t && !StringUtils_1.StringUtils.IsEmpty(i)) {
      this.SetSpriteByPath(i, this.GetSprite(24), false);
    }
  }
  UpdateRightDownIconActive() {
    this.UpdateMultiMapIconActive();
  }
  UpdateMultiMapIconActive() {
    var t;
    var i = this.LayoutContext.MarkItem.ShowSecondaryUiMultiMapIcon();
    if (i) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH);
      this.UpdateDownStateIcon(i, t);
    } else {
      this.UpdateDownStateIcon(i);
    }
  }
  UpdateDownStateIcon(t, i) {
    this.GetSprite(23).SetUIActive(t);
    if (t && !StringUtils_1.StringUtils.IsEmpty(i)) {
      this.SetSpriteByPath(i, this.GetSprite(23), false);
    }
  }
  UpdateDeliveryPropLayout() {
    var t = this.LayoutContext.MarkItem.MarkConfig;
    let i = undefined;
    if (t?.DeliveryProp) {
      i = [];
      for (var [e, s] of t.DeliveryProp) {
        e = [{
          IncId: 0,
          ItemId: e
        }, s];
        i.push(e);
      }
    }
    if ((i?.length ?? 0) > 0) {
      this.UpdateRewardLayoutByList(i, "Mark_Submit_Material_Text");
      return true;
    } else {
      this.GetVerticalLayout(40).RootUIComp.SetUIActive(false);
      return false;
    }
  }
  UpdateRewardLayout(t, i) {
    this.UpdateRewardLayoutByList(this.GetItemListByDropId(t), i);
  }
  GetItemListByDropId(t) {
    const e = [];
    ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t)?.DropPreview.forEach((t, i) => {
      e.push([{
        ItemId: i,
        IncId: 0
      }, t]);
    });
    return e;
  }
  UpdateRewardLayoutByList(t, i) {
    if (t.length) {
      this.GetVerticalLayout(40).RootUIComp.SetUIActive(true);
      this.DeliveryPropView.SetTitleNewTxt(i);
      this.DeliveryPropView.Refresh(t);
    }
  }
  HandleTeleportAndTrack() {
    if (!this.HandleTeleport()) {
      this.HandleTrack();
    }
  }
  HandleFastMoveAndTrack() {
    var t = this.LayoutContext.MarkItem;
    var i = !t.IsLocked;
    var t = t.MarkConfig.EnableQuickTransfer === 1;
    if (i && t) {
      this.HandleTeleportAndTrack();
    } else {
      this.HandleTrack();
    }
  }
  HandleTeleport() {
    var t = this.LayoutContext.MarkItem;
    return !!t && !t.IsLocked && (MapLogger_1.MapLogger.Debug(63, "[地图系统]->传送", ["markId", t.MarkId], ["IsTracked", t.IsTracked]), WorldMapController_1.WorldMapController.TryTeleport(t.MarkConfigId), true);
  }
  HandleTrack() {
    var t = this.LayoutContext.MarkItem;
    if (t) {
      this.CheckAndShowCrossMapTips(t);
      MapLogger_1.MapLogger.Debug(63, "[地图系统]->追踪", ["markId", t.MarkId], ["IsTracked", t.IsTracked]);
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: t.MarkType,
        MarkId: t.MarkId,
        Track: !t.IsTracked
      });
      this.Close();
    }
  }
  HandleQuickGoto() {
    var t = this.LayoutContext.MarkItem;
    var i = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, t);
    if (i) {
      MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(t, i, () => {
        this.Close();
      });
    }
  }
}
exports.WorldMapSecondaryUiLayoutA = WorldMapSecondaryUiLayoutA;
//# sourceMappingURL=WorldMapSecondaryUiLayoutA.js.map