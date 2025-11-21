"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleFlagMonsterInfoPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
class MoraleFlagMonsterInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FlagData = undefined;
    this.DescriptionComponent = undefined;
    this.RewardListComponent = undefined;
    this.BtnTrackOrTeleportComponent = undefined;
    this.Sequence = undefined;
    this.OnBtnTrack = () => {
      var e = this.FlagData.Config.MarkId;
      if (e <= 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Morale", 69, "跳转标记id小于等于0");
        }
      } else {
        if (ConfigManager_1.ConfigManager.MoraleConfig?.GetMoraleMarkIsAutoTrack() && !ModelManager_1.ModelManager.MapModel?.IsMarkTracking(e)) {
          ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
            MarkType: 29,
            MarkId: e,
            Track: true
          });
        }
        SkipTaskManager_1.SkipTaskManager.Run(19, e);
      }
    };
    this.OnBtnTeleport = () => {
      ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(this.FlagData.Config.MarkId, () => {
        UiManager_1.UiManager.ResetToBattleView();
      });
    };
    this.emu = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = this.tmu;
      return e;
    };
    this.tmu = e => this.FlagData.IsGetBox;
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
    this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIArtText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetItem(6).SetUIActive(true);
    var e = this.GetItem(4);
    this.DescriptionComponent = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var t = this.GetItem(5);
    this.RewardListComponent = new ActivityRewardList_1.ActivityRewardList();
    var i = this.GetItem(9);
    this.BtnTrackOrTeleportComponent = new ButtonItem_1.ButtonItem(i);
    await Promise.all([this.DescriptionComponent.CreateThenShowByActorAsync(e.GetOwner()), this.RewardListComponent.CreateThenShowByActorAsync(t.GetOwner())]);
  }
  UpdateData(e) {
    this.FlagData = e;
    var e = this.GetTexture(12);
    var t = this.FlagData.Config.MonsterIconPath;
    this.SetTextureByPath(t, e);
    this.GetArtText(1).SetText(this.FlagData.Config.MaxMonsterLv.toString());
    this.UpdateLvDiffBg();
    t = this.GetSprite(2);
    e = this.FlagData.IsActive;
    t.SetUIActive(e);
    this.DescriptionComponent.SetContentByTextId(this.FlagData.Config.MonsterDesc);
    this.UpdateRewardList();
    t = this.FlagData.HasBoxCanGet();
    this.GetItem(8).SetUIActive(t);
    if (t) {
      this.GetText(11).ShowTextNew("Morale_title_9");
    }
    e = this.FlagData.IsLowMoraleLv();
    this.GetItem(7).SetUIActive(e);
    if (e) {
      this.GetText(10).ShowTextNew("Morale_title_7");
    }
    t = this.FlagData.IsHighDifficultyChallenge();
    this.GetItem(3).SetUIActive(t);
    this.UpdateTrackOrTeleport();
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
        this.SetLvDiffBg("T_EnemyMoraleLevelRedBg");
    }
  }
  SetLvDiffBg(e) {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    var t = this.GetTexture(0);
    this.SetTextureByPath(e, t);
  }
  UpdateRewardList() {
    var e = this.GetRewardItemList();
    if (e.length <= 0) {
      this.RewardListComponent.SetActive(false);
    } else {
      this.RewardListComponent.SetActive(true);
      this.RewardListComponent.SetTitleByTextId("Morale_title_18");
      this.RewardListComponent.InitGridLayout(this.emu);
      this.RewardListComponent.RefreshItemLayout(e);
    }
  }
  GetRewardItemList() {
    var e = this.FlagData.Config.BoxRewardId;
    if (e <= 0) {
      return [];
    }
    const i = [];
    ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview.forEach((e, t) => {
      i.push([{
        ItemId: t,
        IncId: 0
      }, e]);
    });
    return i;
  }
  PlayEnter() {
    this.Sequence?.PlaySequencePurely("Start");
  }
  UpdateTrackOrTeleport() {
    var e = ModelManager_1.ModelManager.MoraleModel?.IsMoraleGameOver();
    var t = this.FlagData.IsGetBox;
    this.BtnTrackOrTeleportComponent.SetActive(!e || !t);
    var e = this.FlagMarkIsCanTeleport();
    this.BtnTrackOrTeleportComponent.SetFunction(e ? this.OnBtnTeleport : this.OnBtnTrack);
    this.BtnTrackOrTeleportComponent.SetShowText(e ? "Text_TeleportFastMove_Text" : "Morale_title_6");
  }
  FlagMarkIsCanTeleport() {
    var e = this.FlagData.Config.MarkId;
    return ModelManager_1.ModelManager.MapModel.MapMarkIsCanTeleport(e);
  }
}
exports.MoraleFlagMonsterInfoPanel = MoraleFlagMonsterInfoPanel;
//# sourceMappingURL=MoraleFlagMonsterInfoPanel.js.map