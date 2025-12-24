"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureRoadPanel = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InfrastructureDefine_1 = require("../../../Infrastructure/InfrastructureDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MapVerticalLayoutItem_1 = require("../MapVerticalLayoutItem");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const InfrastructureRoadRewardPanel_1 = require("./InfrastructureRoadRewardPanel");
class InfrastructureRoadPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.q_o = undefined;
    this.RewardsView = new InfrastructureRoadRewardPanel_1.InfrastructureRoadRewardPanel();
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    await Promise.all([super.OnBeforeStartAsync(), this.Akf()]);
    this.q_o = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), () => new MapVerticalLayoutItem_1.MapVerticalLayoutItem());
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(14).SetUIActive(true);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(true);
  }
  async Akf() {
    await this.RewardsView.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    this.cxm();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    this.GetText(4).ShowTextNew(e.GetLocaleDesc());
    this.UpdateMultiMap();
    this.UpdateTopRightIconActive();
    e = this.UpdateQuickGoto();
    this.LayoutContext.SetConfirmBtnActive(!e);
    this.Cjm();
    this.q_o.RefreshByData(this.pjm());
    this.Dkf();
    this.Nqe();
  }
  cxm() {
    var e = this.LayoutContext.MarkItem;
    this.LayoutContext.SetConfirmBtnEnableClick(!e.IsLocked);
  }
  Cjm() {
    var e = this.LayoutContext.MarkItem;
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigByMarkId(e.MarkId);
    var t = ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(e.Id)?.Status ?? Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock;
    var e = Array.from(e.Requirement.entries());
    const r = ModelManager_1.ModelManager.InventoryModel;
    e = e.every(([e, t]) => r.GetItemCountByConfigId(e) >= t);
    if (t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress && e) {
      this.GetItem(25).SetUIActive(true);
      this.GetText(30).ShowTextNew("Map_BuildRoad_BuildAllowedTips");
    }
  }
  pjm() {
    var e = this.LayoutContext.MarkItem;
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigByMarkId(e.MarkId);
    var t = ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(e.Id);
    var r = t?.Status ?? Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock;
    var a = {
      LeftTextId: "Map_BuildRoad_State",
      RightTextId: r === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete ? "Map_BuildRoad_State_BuildingComplete" : "Map_BuildRoad_State_Building",
      ShowBtnHelp: false,
      ShowIcon: false,
      ShowSprite: false,
      ShowScaleIcon: false
    };
    if (r === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete) {
      r = new Date((t?.CompleteTime ?? 0) * TimeUtil_1.TimeUtil.InverseMillisecond);
      return [a, {
        LeftTextId: "PrefabTextItem_1724067072_Text",
        RightText: TimeUtil_1.TimeUtil.DateFormat3(r),
        ShowBtnHelp: false,
        ShowIcon: false,
        ShowSprite: false
      }];
    } else {
      return [a, {
        LeftTextId: "JijianTask_ConstructionDifficulty",
        ShowBtnHelp: false,
        ShowIcon: false,
        ShowSprite: false,
        ShowScaleIcon: true,
        ScaleIconPath: ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(InfrastructureDefine_1.difficultySpriteResourceId[e.Difficulty]).Path
      }];
    }
  }
  Dkf() {
    var e = this.LayoutContext.MarkItem;
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigByMarkId(e.MarkId);
    if (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(e.Id)?.Status !== Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete) {
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(true);
      this.GetItem(8).SetUIActive(true);
      e = Array.from(e.Requirement.entries()).sort((e, t) => e[0] - t[0]).map(([e, t]) => [{
        ItemId: e,
        IncId: 0
      }, t]);
      this.RewardsView.RebuildRewardsByData(e);
      this.RewardsView.SetTitleNewTxt("PrefabTextItem_3987853903_Text");
    }
  }
  Nqe() {
    var e = this.LayoutContext.MarkItem;
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigByMarkId(e.MarkId);
    if (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(e.Id)?.Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete) {
      this.GetItem(48).SetUIActive(false);
    } else {
      this.GetItem(48).SetUIActive(true);
      this.GetText(49).ShowTextNew("PrefabTextItem_3953589534_Text");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(50), e.EffectDes[0], e.FireExpReward.toString());
    }
  }
}
exports.InfrastructureRoadPanel = InfrastructureRoadPanel;
//# sourceMappingURL=InfrastructureRoadPanel.js.map