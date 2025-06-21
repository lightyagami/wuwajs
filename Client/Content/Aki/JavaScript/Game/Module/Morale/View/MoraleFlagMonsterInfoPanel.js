"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleFlagMonsterInfoPanel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
class MoraleFlagMonsterInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.FlagData = void 0, this.DescriptionComponent = void 0, this.RewardListComponent = void 0, this.BtnTrackOrTeleportComponent = void 0, this.Sequence = void 0, this.OnBtnTrack = () => {
      var e = this.FlagData.Config.MarkId;
      e <= 0 ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "跳转标记id小于等于0") : (ConfigManager_1.ConfigManager.MoraleConfig?.GetMoraleMarkIsAutoTrack() && !ModelManager_1.ModelManager.MapModel?.IsMarkTracking(e) && ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
        MarkType: 29,
        MarkId: e,
        Track: !0
      }), SkipTaskManager_1.SkipTaskManager.Run(19, e))
    }, this.OnBtnTeleport = () => {
      ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(this.FlagData.Config.MarkId, () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView)
      })
    }, this.uau = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid;
      return e.ShowReceivedCallBack = this.cau, e
    }, this.cau = e => this.FlagData.IsGetBox
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner()), this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIArtText],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UITexture]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.GetItem(6).SetUIActive(!0);
    var e = this.GetItem(4),
      t = (this.DescriptionComponent = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA, this.GetItem(5)),
      i = (this.RewardListComponent = new ActivityRewardList_1.ActivityRewardList, this.GetItem(9));
    this.BtnTrackOrTeleportComponent = new ButtonItem_1.ButtonItem(i), await Promise.all([this.DescriptionComponent.CreateThenShowByActorAsync(e.GetOwner()), this.RewardListComponent.CreateThenShowByActorAsync(t.GetOwner())])
  }
  UpdateData(e) {
    this.FlagData = e;
    var e = this.GetTexture(12),
      t = this.FlagData.Config.MonsterIconPath;
    this.SetTextureByPath(t, e);
    this.GetArtText(1).SetText(this.FlagData.Config.MaxMonsterLv.toString()), this.UpdateLvDiffBg();
    t = this.GetSprite(2), e = this.FlagData.IsActive, t.SetUIActive(e), this.DescriptionComponent.SetContentByTextId(this.FlagData.Config.MonsterDesc), this.UpdateRewardList(), t = this.FlagData.HasBoxCanGet(), this.GetItem(8).SetUIActive(t), t && this.GetText(11).ShowTextNew("Morale_title_9"), e = this.FlagData.IsLowMoraleLv(), this.GetItem(7).SetUIActive(e), e && this.GetText(10).ShowTextNew("Morale_title_7"), t = this.FlagData.IsHighDifficultyChallenge();
    this.GetItem(3).SetUIActive(t), this.UpdateTrackOrTeleport()
  }
  UpdateLvDiffBg() {
    var e = this.FlagData.Config.MaxMonsterLv;
    switch (ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelDiffType(e)) {
      case 0:
        this.SetLvDiffBg("T_EnemyMoraleLevelGrayBg");
        break;
      case 1:
        this.SetLvDiffBg("T_EnemyMoraleLevelYellowBg");
        break;
      case 2:
        this.SetLvDiffBg("T_EnemyMoraleLevelRedBg")
    }
  }
  SetLvDiffBg(e) {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e),
      t = this.GetTexture(0);
    this.SetTextureByPath(e, t)
  }
  UpdateRewardList() {
    var e = this.GetRewardItemList();
    e.length <= 0 ? this.RewardListComponent.SetActive(!1) : (this.RewardListComponent.SetActive(!0), this.RewardListComponent.SetTitleByTextId("Morale_title_18"), this.RewardListComponent.InitGridLayout(this.uau), this.RewardListComponent.RefreshItemLayout(e))
  }
  GetRewardItemList() {
    var e = this.FlagData.Config.BoxRewardId;
    if (e <= 0) return [];
    const i = [];
    return ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview.forEach((e, t) => {
      i.push([{
        ItemId: t,
        IncId: 0
      }, e])
    }), i
  }
  PlayEnter() {
    this.Sequence?.PlaySequencePurely("Start")
  }
  UpdateTrackOrTeleport() {
    var e = ModelManager_1.ModelManager.MoraleModel?.IsMoraleGameOver();
    this.BtnTrackOrTeleportComponent.SetActive(!e), e || (e = this.FlagMarkIsCanTeleport(), this.BtnTrackOrTeleportComponent.SetFunction(e ? this.OnBtnTeleport : this.OnBtnTrack), this.BtnTrackOrTeleportComponent.SetShowText(e ? "Text_TeleportFastMove_Text" : "Morale_title_6"))
  }
  FlagMarkIsCanTeleport() {
    var e = this.FlagData.Config.MarkId;
    return ModelManager_1.ModelManager.MapModel.MapMarkIsCanTeleport(e)
  }
}
exports.MoraleFlagMonsterInfoPanel = MoraleFlagMonsterInfoPanel;
//# sourceMappingURL=MoraleFlagMonsterInfoPanel.js.map