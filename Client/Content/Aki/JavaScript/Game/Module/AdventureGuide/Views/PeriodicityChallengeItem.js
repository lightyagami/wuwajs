"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeriodicityChallengeItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConditionGroupData_1 = require("../../Activity/ConditionGroupData");
const ShipTowerDefine_1 = require("../../ShipTower/ShipTowerDefine");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const AdventureDefine_1 = require("../AdventureDefine");
const NewSoundDetectRewardItem_1 = require("./NewSoundDetectRewardItem");
const PeriodicityChallengeItemTopTips_1 = require("./PeriodicityChallengeItemTopTips");
class PeriodicityChallengeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Aam = undefined;
    this.Dam = undefined;
    this.RAf = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Aam = new PeriodicityChallengeTitleItem();
    e.push(this.Aam.CreateByActorAsync(this.GetItem(0).GetOwner()));
    this.Dam = new PeriodicityChallengeDetectionItem();
    e.push(this.Dam.CreateByActorAsync(this.GetItem(2).GetOwner()));
    this.RAf = new PeriodicityChallengeItemTopTips_1.PeriodicityChallengeItemTopTips();
    e.push(this.RAf.CreateByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(e);
  }
  Refresh(e, i, t) {
    if (e.Title) {
      this.Aam.SetUiActive(true);
      this.Aam.RefreshItem(e.Data);
    } else {
      this.Aam.SetUiActive(false);
    }
    if (e.TopTips) {
      this.RAf.SetUiActive(true);
      this.RAf.Refresh(e.TopTips);
    } else {
      this.RAf.SetUiActive(false);
    }
    this.Dam?.SetUiActive(true);
    this.Dam?.RefreshItem(e.Data);
  }
}
exports.PeriodicityChallengeItem = PeriodicityChallengeItem;
class PeriodicityChallengeTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.E9 = 0;
    this.T8e = undefined;
    this.YVe = () => {
      return new NewSoundDetectRewardItem_1.NewSoundDetectRewardItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.YVe);
  }
  RefreshItem(e) {
    this.Pe = e;
    this.E9 = this.Pe.Conf.PeriodicityChallengeType;
    this.kxt();
    this.h4i();
    this.jqe();
  }
  kxt() {
    var e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDetectionTitlePanelConfig(this.Pe.Conf.DetectionTitlePanel);
    if (e) {
      this.SetUiActive(true);
      this.SetTextureByPath(e.BgTexture, this.GetTexture(0));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TitleText);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(5), e.SubTitleText);
    } else {
      this.SetUiActive(false);
    }
  }
  h4i() {
    var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(this.Pe.Conf.Secondary);
    if (t.TimeOutDay && this.Bam()) {
      let e = undefined;
      let i = 0;
      if (this.E9 === 3) {
        e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData();
        i = MathUtils_1.MathUtils.LongToNumber(ModelManager_1.ModelManager.TowerModel.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
      }
      if (this.E9 === 6) {
        e = ModelManager_1.ModelManager.ShipTowerModel.GetSeasonCountDownData();
        i = ModelManager_1.ModelManager.ShipTowerModel.GetRemainTime();
      }
      if (this.E9 === 7) {
        e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew.GetCycleCountDownData();
        i = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew.EndShowTime - TimeUtil_1.TimeUtil.GetServerTime();
      }
      if (e) {
        t = i <= t.TimeOutDay * TimeUtil_1.TimeUtil.OneDaySeconds;
        this.GetItem(2).SetUIActive(true);
        this.GetItem(3).SetUIActive(t);
        this.GetText(4).SetText(e.CountDownText);
      } else {
        this.GetItem(2).SetUIActive(false);
      }
    } else {
      this.GetItem(2).SetUIActive(false);
    }
  }
  jqe() {
    var e = new Array();
    var i = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(this.Pe.Conf.ShowRewardMap);
    if (i) {
      for (const r of i.keys()) {
        var t = [{
          IncId: 0,
          ItemId: r
        }, i.get(r)];
        e.push({
          ItemData: t,
          HaveFinish: false
        });
      }
      this.T8e.RefreshByData(e, () => {
        if (this.T8e?.ContentItem) {
          this.T8e?.ScrollToLeft(0);
        }
      });
    }
  }
  Bam() {
    return this.E9 === 3 || this.E9 === 6 || this.E9 === 7;
  }
}
class PeriodicityChallengeDetectionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.E9 = 0;
    this.Oam = undefined;
    this.Gam = undefined;
    this.Fam = undefined;
    this.Nam = () => {
      return new TowerItem();
    };
    this.Vam = () => {
      return new ShipTowerItem();
    };
    this.kQa = () => {
      var e;
      if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        if (this.E9 === 7) {
          if (e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData) {
            e = {
              MarkId: e.GetCycleConfig().MapMark,
              MarkType: 6
            };
            UiManager_1.UiManager.OpenView("WorldMapView", e);
            return;
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("WeeklyRogue", 5, "点击周常肉鸽追踪 活动数据为空");
            }
            return;
          }
        } else {
          if (this.Pe.Type === 0) {
            this.iql();
          } else {
            this.rql();
          }
          return;
        }
      }
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
    };
    this.ru_ = () => {
      var i = [];
      for (const o of ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(this.Pe.Conf.LockCon)) {
        var t;
        var r = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(o);
        let e = -1;
        if (!StringUtils_1.StringUtils.IsEmpty(r.Description)) {
          if (r.AccessId) {
            t = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(r.AccessId);
            e = t.SkipName;
          }
          const s = {
            ConditionId: o,
            ConditionTextId: r.Description,
            IsFinished: false,
            AccessId: r.AccessId,
            AccessType: e
          };
          i.push(s);
        }
      }
      const s = new ConditionGroupData_1.ConditionGroupData(this.Pe.Conf.LockCon, i);
      UiManager_1.UiManager.OpenView("CommonConditionView", s);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIVerticalLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIScrollViewWithScrollbarComponent], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.kQa], [17, this.ru_]];
  }
  async OnBeforeStartAsync() {
    this.Fam = new ShipTowerItem();
    await this.Fam.CreateByActorAsync(this.GetItem(16).GetOwner());
  }
  OnStart() {
    this.GetItem(4).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetSprite(2).SetUIActive(false);
    this.Oam = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.Nam);
    this.Gam = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(13), this.Vam);
  }
  RefreshItem(e) {
    this.Pe = e;
    this.E9 = this.Pe.Conf.PeriodicityChallengeType;
    this.mGe();
    this.jam();
    this.Ham();
  }
  mGe() {
    var e;
    var i = this.Pe.Conf;
    this.SetSpriteByPath(i.LeftBgSprite, this.GetSprite(0), false);
    this.SetSpriteByPath(i.RightBgSprite, this.GetSprite(1), false);
    if (ModelManager_1.ModelManager.AdventureGuideModel.IsWeeklyRogueType(this.E9)) {
      e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData?.GetCycleConfig()?.CycleName ?? "";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Name);
    }
  }
  jam() {
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByData(this.Pe) || !this.Pe.IsLock;
    this.GetButton(5).RootUIComp.SetUIActive(e);
    this.GetItem(6).SetUIActive(!e);
  }
  Ham() {
    var e;
    var i = ModelManager_1.ModelManager.AdventureGuideModel.IsTowerType(this.E9);
    var t = ModelManager_1.ModelManager.AdventureGuideModel.IsShipTowerType(this.E9);
    var r = ModelManager_1.ModelManager.AdventureGuideModel.IsWeeklyRogueType(this.E9);
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(i);
    this.GetScrollViewWithScrollbar(13).RootUIComp.SetUIActive(t);
    this.Fam.SetUiActive(t);
    this.GetItem(9).SetUIActive(r);
    if (i) {
      i = AdventureDefine_1.periodicityChallengeTypeToTarget[this.E9];
      e = ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(i);
      this.Oam.RefreshByData(e);
      e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
      this.GetItem(4).SetUIActive(e === i);
    } else if (t) {
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetShipTowerStateListByType(this.E9);
      if (this.E9 === 5) {
        this.Fam.SetUiActive(false);
      } else {
        i = e.pop();
        this.Fam.SetUiActive(true);
        this.Fam.Refresh(i ?? 1);
      }
      this.Gam?.RefreshByData(e, () => {
        var i = this.Gam.GetScrollItemList();
        for (let e = i.length - 1; e >= 0; e--) {
          i[e].GetRootItem().SetHierarchyIndex(0);
        }
        if (this.E9 === 5) {
          i[i.length - 1].SetNextItemClose();
        }
      });
      if (ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStage()?.BelongToSeason === ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON) {
        this.GetItem(4).SetUIActive(this.E9 === 5);
      } else {
        this.GetItem(4).SetUIActive(this.E9 === 6);
      }
    } else if (r) {
      t = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleConfig();
      i = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.Score;
      this.GetText(12)?.SetText(i + "/" + t.MaxScore);
      this.GetItem(10).SetUIActive(i < t.MaxScore);
      this.GetItem(11).SetUIActive(i >= t.MaxScore);
      this.GetItem(4).SetUIActive(false);
    }
  }
  iql() {
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(this.Pe.Conf.Id);
    var i = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e.Conf.DungeonId);
    if (ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(i.MarkId)) {
      ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
      ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.sxu, [e.Conf.DungeonId], this.Pe.Conf.Id);
    }
  }
  rql() {
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(this.Pe.Conf.Id);
    if (ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(e.Conf.MarkId)) {
      ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
      ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_SilentArea, e.Conf.LevelPlayList, this.Pe.Conf.Id);
    }
  }
}
class TowerItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText]];
  }
  Refresh(e, i, t) {
    var r;
    var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.AreaName);
      r = ModelManager_1.ModelManager.TowerModel.GetAreaAllStars(e.Difficulty, e.AreaNum);
      e = ModelManager_1.ModelManager.TowerModel.GetAreaStars(e.Difficulty, e.AreaNum);
      this.GetText(3).SetText(e + "/" + r);
      this.GetItem(0).SetUIActive(e < r);
      this.GetItem(1).SetUIActive(r <= e);
    }
  }
}
class ShipTowerItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem]];
  }
  Refresh(e) {
    var i;
    var t;
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(e);
    if (e && (e.IsEndLess ? this.GetText(0).SetText("∞") : (t = (t = e.OrderIndex) < 10 ? "0" + t : t.toString(), this.GetText(0).SetText(t)), t = e.IsUnLocked(), this.GetItem(1).SetUIActive(!t), i = e.IsPassed(), this.GetItem(2).SetUIActive(!i && t && !e.IsEndLess), t = (i = e.GetStageGradeResIdByScore(e.CurrentScore)) !== undefined, (e = this.GetTexture(3))?.SetUIActive(t), t)) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      this.SetTextureByPath(t, e);
    }
  }
  SetNextItemClose() {
    this.GetItem(4).SetUIActive(false);
  }
}
//# sourceMappingURL=PeriodicityChallengeItem.js.map