"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonInfoItem = undefined;
const ue_1 = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ActivityMowingController_1 = require("../../Activity/ActivityContent/Mowing/ActivityMowingController");
const RoguelikeBlackFlowerItem_1 = require("../../Roguelike/View/RoguelikeBlackFlowerItem");
const TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InstanceDungeonEntranceRewardItem_1 = require("../InstanceDungeonEntranceRewardItem");
const InstanceDungeonEntranceTowerDefenceItem_1 = require("../InstanceDungeonEntranceTowerDefenceItem");
const InstanceDungeonBottomTipItem_1 = require("./InstanceDungeonBottomTipItem");
const InstanceDungeonBuffItem_1 = require("./InstanceDungeonBuffItem");
const InstanceDungeonCostItem_1 = require("./InstanceDungeonCostItem");
const InstanceDungeonDescWidelyItem_1 = require("./InstanceDungeonDescWidelyItem");
const InstanceDungeonLockItem_1 = require("./InstanceDungeonLockItem");
const InstanceDungeonMatchingItem_1 = require("./InstanceDungeonMatchingItem");
const InstanceDungeonMowingDropDownItem_1 = require("./InstanceDungeonMowingDropDownItem");
const InstanceDungeonPicItem_1 = require("./InstanceDungeonPicItem");
const InstanceDungeonRankTimeItem_1 = require("./InstanceDungeonRankTimeItem");
const InstanceDungeonRecommendLevelItem_1 = require("./InstanceDungeonRecommendLevelItem");
const InstanceDungeonRightTitleItem_1 = require("./InstanceDungeonRightTitleItem");
const InstanceDungeonScoreListItem_1 = require("./InstanceDungeonScoreListItem");
const InstanceDungeonStartButtonItem_1 = require("./InstanceDungeonStartButtonItem");
const InstanceDungeonTitleWidelyItem_1 = require("./InstanceDungeonTitleWidelyItem");
class InstanceDungeonInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.NUe = 0;
    this.Qth = undefined;
    this.Kth = undefined;
    this.jzs = undefined;
    this.$th = undefined;
    this.Xth = undefined;
    this.gli = undefined;
    this.Yth = undefined;
    this.zth = undefined;
    this.Jth = undefined;
    this.Zth = undefined;
    this.ygl = undefined;
    this.eD_ = undefined;
    this.tD_ = undefined;
    this.iD_ = undefined;
    this.j3_ = undefined;
    this.H3_ = undefined;
    this.$3_ = undefined;
    this.W3_ = undefined;
    this.knc = undefined;
    this.ct_ = [];
    this.R$l = undefined;
    this.rD_ = () => new InstanceDungeonBottomTipItem_1.InstanceDungeonBottomTipItem();
    this.vMl = () => {
      var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
      if (t) {
        this.iih(t.InstSubType);
      }
    };
  }
  OnRegisterComponent() {
    this.R$l = this.OpenParam;
    this.ComponentRegisterInfos = [[0, ue_1.UIItem], [1, ue_1.UIItem], [2, ue_1.UIItem], [3, ue_1.UIItem], [4, ue_1.UIVerticalLayout]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.Qth = new InstanceDungeonRightTitleItem_1.InstanceDungeonRightTitleItem();
    t.push(this.Qth.CreateByResourceIdAsync("UiItem_InstanceDungeon_RightTitle", this.GetItem(0)));
    this.zth = new InstanceDungeonStartButtonItem_1.InstanceDungeonStartButtonItem();
    t.push(this.zth.CreateByResourceIdAsync("UiItem_InstanceDungeon_StartButton", this.GetItem(2)));
    this.Jth = new InstanceDungeonMatchingItem_1.InstanceDungeonMatchingItem();
    t.push(this.Jth.CreateByResourceIdAsync("UiItem_InstanceDungeon_MatchingItem", this.GetItem(2)));
    this.Zth = new InstanceDungeonLockItem_1.InstanceDungeonLockItem();
    t.push(this.Zth.CreateByResourceIdAsync("UiItem_InstanceDungeon_Lock", this.GetItem(2)));
    await Promise.all(t);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel, this.vMl);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel, this.vMl);
  }
  InitButton(t, e, n) {
    this.zth.OnClickBtnSoloCallBack = t;
    this.zth.OnClickBtnMultipleCallBack = e;
    this.zth.OnClickBtnTeamCallBack = n;
  }
  async RefreshItem(t) {
    this.NUe = t;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
    if (e) {
      if (ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.CheckRightTitleAvailableByInstanceId(t)) {
        this.Qth.RefreshItem(e.MapName, e.DungeonDesc, e.RecommendElement);
      }
      this.zth.RefreshItem(e.OnlineType);
      this.Egl(e);
      this.eih(e.MonsterTips, e.MonsterPreview.length > 0);
      this.tih(e.InstSubType);
      this.oD_(e.InstSubType);
      this.qnc(t);
      this.iih(e.InstSubType);
      this.rih();
      this.nD_(e.InstSubType);
      this.UpdateInstanceDungeonLockItemAndCostItem();
      this.oih(e.InstSubType);
      this.Q3_(t);
      this.K3_(t);
      this.X3_(t);
      this.Y3_(t);
      for (const n of this.ct_) {
        await n();
      }
      this.ct_ = [];
    }
  }
  eih(t, e) {
    if (t !== "" || e) {
      if (this.Kth) {
        this.Kth?.SetActive(true);
        this.Kth?.RefreshItem(t, e);
      } else {
        this.Kth = new InstanceDungeonBuffItem_1.InstanceDungeonBuffItem();
        this.ct_.push(async () => this.Kth.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_Buff", this.GetItem(0)).then(() => {
          this.Kth?.RefreshItem(t, e);
        }));
      }
    } else {
      this.Kth?.SetActive(false);
    }
  }
  tih(t) {
    if (t === 21) {
      const e = TowerDefenceController_1.TowerDefenseController.BuildPhantomForInstanceDungeonEntranceData(this.NUe);
      if (this.jzs) {
        this.jzs.SetActive(true);
        this.jzs.RefreshItem(e);
      } else {
        this.jzs = new InstanceDungeonEntranceTowerDefenceItem_1.InstanceDungeonEntranceTowerDefenceItem();
        this.ct_.push(async () => this.jzs.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_Reward", this.GetItem(0)).then(() => {
          this.jzs.RefreshItem(e);
        }));
      }
    } else {
      this.jzs?.SetActive(false);
    }
  }
  oD_(t) {
    if (t === 22 || !this.eD_) {
      if (this.eD_) {
        this.eD_.SetUIActive(true);
      } else {
        this.ct_.push(async () => {
          var t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_InstanceDungeon_Rline", this.GetItem(1));
          this.eD_ = t.GetComponentByClass(ue_1.UIItem.StaticClass());
          this.eD_.SetUIActive(true);
        });
      }
    } else {
      this.eD_.SetUIActive(false);
    }
  }
  iih(e) {
    if (e === 21 || e === 19 || e === 22) {
      let t = {
        TextId: "RecommendLevel",
        Level: 0
      };
      if (e === 21) {
        t = TowerDefenceController_1.TowerDefenseController.BuildRecommendLevelForInstanceDungeonEntranceData(this.NUe);
      } else if (e === 22) {
        e = ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceRecommendDataByInstanceId(this.NUe);
        t.TextId = e.TextId;
        t.Level = e.RecommendLevel;
      } else {
        e = ActivityMowingController_1.ActivityMowingController.GetMowingActivityData()?.GetLevelDiffRecommendLevel(this.NUe);
        t.Level = e ?? 0;
      }
      if (this.$th) {
        this.$th.SetActive(true);
        this.$th.RefreshItem(t);
      } else {
        this.$th = new InstanceDungeonRecommendLevelItem_1.InstanceDungeonRecommendLevelItem();
        this.ct_.push(async () => this.$th.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_RecommenLevel", this.GetItem(1)).then(() => {
          this.$th.RefreshItem(t);
        }));
      }
    } else {
      this.$th?.SetActive(false);
    }
  }
  nih() {
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(this.NUe);
    if (!t || t <= 0) {
      this.Xth?.SetUiActive(false);
    } else {
      const e = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(this.NUe);
      if (this.Xth) {
        this.Xth.SetActive(true);
        this.Xth.RefreshItem(e[0]);
      } else {
        this.Xth = new InstanceDungeonCostItem_1.InstanceDungeonCostItem();
        this.ct_.push(async () => this.Xth.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_Cost", this.GetItem(1)).then(() => {
          this.Xth.RefreshItem(e[0]);
        }));
      }
    }
  }
  rih() {
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceDungeonReward(this.NUe)[0].length <= 0) {
      this.gli?.SetActive(false);
    } else if (this.gli) {
      this.gli.SetActive(true);
      this.gli.RefreshItem(this.NUe);
    } else {
      this.gli = new InstanceDungeonEntranceRewardItem_1.InstanceDungeonEntranceRewardItem();
      this.ct_.push(async () => this.gli.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_Reward", this.GetItem(1)).then(() => {
        this.gli.RefreshItem(this.NUe);
      }));
    }
  }
  nD_(t) {
    let e = undefined;
    var n;
    var i;
    if (t === 22) {
      e = [];
      n = (t = ModelManager_1.ModelManager.MowingRiskModel).GetRiskHarvestInstConfigByInstanceId(this.NUe);
      i = {
        TextId: "riskofrain_total_num",
        TextArgs: [t.GetMaxScoreByInstanceId(this.NUe).toString()]
      };
      e.push(i);
      if (!n.Accumulate) {
        i = {
          TextId: "riskofrain_ratio_num",
          TextArgs: [t.GetMonsterRatioByInstanceId(this.NUe).toString()]
        };
        e.push(i);
      }
    }
    if (e && e.length !== 0) {
      this.GetVerticalLayout(4).RootUIComp.SetUIActive(true);
      this.ct_.push(async () => this.sD_().then(async () => {
        this.aD_();
        await this.iD_?.RefreshByDataAsync(e ?? []);
      }));
    } else {
      this.GetVerticalLayout(4).RootUIComp.SetUIActive(false);
    }
  }
  async sD_() {
    if (!this.tD_) {
      this.tD_ = new InstanceDungeonBottomTipItem_1.InstanceDungeonBottomTipItem();
      await this.tD_.CreateByResourceIdAsync("UiItem_InstanceDungeon_Rtips", this.GetVerticalLayout(4).RootUIComp);
    }
  }
  aD_() {
    var t;
    if (!this.iD_) {
      t = this.GetVerticalLayout(4);
      this.iD_ = new GenericLayout_1.GenericLayout(t, this.rD_);
    }
  }
  oih(t) {
    var t = t === 19;
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(this.NUe);
    if (t && e) {
      if (this.Yth) {
        this.Yth.SetActive(true);
        this.Yth.RefreshItem(this.NUe);
      } else {
        this.Yth = new InstanceDungeonMowingDropDownItem_1.InstanceDungeonMowingDropDownItem();
        this.ct_.push(async () => {
          this.Yth.SkipDestroyActor = true;
          return this.Yth.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_DropItem", this.GetItem(1)).then(() => {
            this.Yth.RefreshItem(this.NUe);
            this.AddChild(this.Yth);
          });
        });
      }
    } else {
      this.Yth?.SetActive(false);
    }
  }
  SetMatchingItemActive(t) {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(this.NUe);
    this.zth?.SetActive(!t && e);
    this.Jth?.SetActive(t);
  }
  UpdateInstanceDungeonLockItemAndCostItem() {
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() === 1;
    this.Xth?.SetActive(false);
    var e = this.R$l.CheckInstanceUnlock(this.NUe);
    if (e) {
      this.nih();
      this.zth.SetActive(!t);
      this.Zth.SetActive(false);
      this.Jth?.SetActive(t);
    } else {
      if (e = this.R$l.GetUnlockConditionTextId(this.NUe)) {
        this.Zth.RefreshItem(e);
      }
      this.zth.SetActive(false);
      this.Zth.SetActive(true);
      this.Jth?.SetActive(false);
    }
  }
  Egl(t) {
    var t = t.InstSubType === 15;
    var e = ModelManager_1.ModelManager.RoguelikeModel.HasBlackFlowerExchanged(this.NUe);
    if (t && e) {
      if (this.ygl) {
        this.ygl.SetActive(true);
      } else {
        this.ygl = new RoguelikeBlackFlowerItem_1.RoguelikeBlackFlowerInstanceItem();
        this.ct_.push(async () => this.ygl.CreateThenShowByResourceIdAsync("UiItem_CheckpointsRReward", this.GetItem(3)).then(() => {
          this.ygl?.GetRootItem().SetHierarchyIndex(0);
        }));
      }
    } else {
      this.ygl?.SetActive(false);
    }
  }
  K3_(t) {
    const e = ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetPictureItemDataGetter(t);
    if (e) {
      if (this.j3_) {
        this.j3_.SetUiActive(true);
        this.j3_.RefreshItem(e());
      } else {
        this.j3_ = new InstanceDungeonPicItem_1.InstanceDungeonPicItem();
        this.ct_.push(async () => this.j3_?.CreateThenShowByResourceIdAsync("UiItem_CheckpointsRPic", this.GetItem(0)).then(() => {
          this.j3_?.SetUiActive(true);
          this.j3_?.RefreshItem(e());
        }));
      }
    } else {
      this.j3_?.SetUiActive(false);
    }
  }
  X3_(t) {
    const e = ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetDescWidelyItemDataGetter(t);
    if (e) {
      if (this.H3_) {
        this.H3_.SetUiActive(true);
        this.H3_.RefreshItem(e());
      } else {
        this.H3_ = new InstanceDungeonDescWidelyItem_1.InstanceDungeonDescWidelyItem();
        this.ct_.push(async () => this.H3_?.CreateThenShowByResourceIdAsync("UiItem_CheckpointsRText", this.GetItem(0)).then(() => {
          this.H3_?.SetUiActive(true);
          this.H3_?.RefreshItem(e());
        }));
      }
    } else {
      this.H3_?.SetUiActive(false);
    }
  }
  Q3_(t) {
    const e = ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetTitleWidelyItemDataGetter(t);
    if (e) {
      if (this.$3_) {
        this.$3_.SetUiActive(true);
        this.$3_.RefreshItem(e());
      } else {
        this.$3_ = new InstanceDungeonTitleWidelyItem_1.InstanceDungeonTitleWidelyItem();
        this.ct_.push(async () => this.$3_?.CreateThenShowByResourceIdAsync("UiItem_CheckpointsRTitleA", this.GetItem(0)).then(() => {
          this.$3_?.SetUiActive(true);
          this.$3_?.RefreshItem(e());
        }));
      }
    } else {
      this.$3_?.SetUiActive(false);
    }
  }
  Y3_(t) {
    const e = ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetScoreListItemDataGetter(t);
    if (e) {
      if (this.W3_) {
        this.W3_.SetUiActive(true);
        this.W3_.RefreshItem(e());
      } else {
        this.W3_ = new InstanceDungeonScoreListItem_1.InstanceDungeonScoreListItem();
        this.ct_.push(async () => {
          await this.W3_?.CreateThenShowByResourceIdAsync("UiItem_CheckpointsRRaceScore", this.GetItem(1)).then(() => {
            this.W3_?.SetUiActive(true);
            this.W3_?.RefreshItem(e());
          });
        });
      }
    } else {
      this.W3_?.SetUiActive(false);
    }
  }
  qnc(t) {
    if (this.R$l.RankItemModel) {
      this.R$l.RankItemModel.RefreshInstance(t);
      if (this.knc) {
        this.knc.SetUiActive(true);
        this.knc.Refresh();
      } else {
        this.knc = new InstanceDungeonRankTimeItem_1.InstanceDungeonRankTimeItem();
        this.knc.OpenParam = this.R$l.RankItemModel;
        this.ct_.push(async () => {
          await this.knc?.CreateThenShowByResourceIdAsync("UiItem_CheckpointsRInfoTitle", this.GetItem(1)).then(() => {
            this.knc?.SetUiActive(true);
            this.knc?.Refresh();
          });
        });
      }
    } else {
      this.knc?.SetUiActive(false);
    }
  }
  SetLockText(t) {
    this.Zth.SetActive(true);
    this.Zth.SetLockText(t);
  }
}
exports.InstanceDungeonInfoItem = InstanceDungeonInfoItem;
//# sourceMappingURL=InstanceDungeonInfoItem.js.map