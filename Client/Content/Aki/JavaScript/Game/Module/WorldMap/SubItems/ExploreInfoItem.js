"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreInfoItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const LordGymEntranceSetAll_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceSetAll");
const MapNoteById_1 = require("../../../../Core/Define/ConfigQuery/MapNoteById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const MapDefine_1 = require("../../Map/MapDefine");
const MapUtil_1 = require("../../Map/MapUtil");
const MingSuDefine_1 = require("../../MingSu/MingSuDefine");
const QuestController_1 = require("../../QuestNew/Controller/QuestController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WorldMapDefine_1 = require("../WorldMapDefine");
const WorldMapNoteItem_1 = require("../WorldMapNoteItem");
const WorldMapPlayPointItem_1 = require("../WorldMapPlayPointItem");
const ExploreItem_1 = require("./ExploreItem");
class ExploreInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ExploreItem = new ExploreItem_1.ExploreItem();
    this.x3o = [];
    this.e2l = [];
    this.WorldMapUiEntity = undefined;
    this.ShowMode = 1;
    this.qfc = false;
    this.P3o = false;
    this.yzi = undefined;
    this.VAd = undefined;
    this.B4o = (t, e) => e.MapNoteConfig.Rank - t.MapNoteConfig.Rank;
    this.b4o = t => {
      this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(t, 0, true);
    };
    this.jAd = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(9);
      if (t && this.YYa(t) && ModelManager_1.ModelManager.RoguelikeModel?.GetMapNoteShowState() && t) {
        return {
          MapNoteId: 9,
          ClickCallBack: this.b4o,
          MapNoteConfig: t,
          MapMarkId: t.MarkIdMap.get(1)
        };
      } else {
        return undefined;
      }
    };
    this.HAd = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(13);
      if (t) {
        var e = this.YYa(t);
        if (e) {
          if (ModelManager_1.ModelManager.ActivityPermanentRogueModel?.GetMapNoteShowState()) {
            return {
              MapNoteId: 13,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(1)
            };
          }
        }
      }
    };
    this.$Ad = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(14);
      if (t) {
        var e = this.YYa(t);
        if (e) {
          if (ModelManager_1.ModelManager.WeeklyRogueModel.GetMapNoteShowState()) {
            return {
              MapNoteId: 14,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew?.GetCycleConfig()?.MapMark
            };
          }
        }
      }
    };
    this.yKa = () => this.bFf(10, MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID);
    this.WAd = () => this.bFf(2, MingSuDefine_1.MING_SU_POOL_CONFIG_ID);
    this.QAd = () => this.bFf(12, MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID);
    this.yhm = () => this.bFf(15, MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID);
    this.RFf = () => this.bFf(16, MingSuDefine_1.LAHAILUOSHENGXIA_POOL_CONFIG_ID);
    this.LFf = () => this.bFf(17, MingSuDefine_1.RILINGCOLLECT_POOL_CONFIG_ID);
    this.bFf = (t, e) => {
      var i = MapNoteById_1.configMapNoteById.GetConfig(t);
      if (i && this.YYa(i)) {
        var a;
        var r = ModelManager_1.ModelManager.MingSuModel;
        var s = r.GetDragonPoolInstanceById(e);
        if (s) {
          a = s.GetDragonPoolLevel();
          a = s.GetNeedCoreCount(a) - s.GetHadCoreCount();
          s = r.GetTargetDragonPoolCoreById(e);
          if (a <= r.GetItemCount(s) && i) {
            return {
              MapNoteId: t,
              ClickCallBack: this.b4o,
              MapNoteConfig: i,
              MapMarkId: i.MarkIdMap.get(e)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.KAd = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(3);
      if (t && ModelManager_1.ModelManager.WorldMapModel.WorldMapId === MapDefine_1.BIG_WORLD_MAP_ID && ModelManager_1.ModelManager.TowerModel.CanGetRewardAllDifficulties() && t) {
        return {
          MapNoteId: 3,
          ClickCallBack: this.b4o,
          MapNoteConfig: t,
          MapMarkId: t.MarkIdMap.get(1)
        };
      } else {
        return undefined;
      }
    };
    this.N4o = () => {
      var t = ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(WorldMapDefine_1.HUANG_LONG_COUNTRY_ID);
      if (t && t.CanLevelUp()) {
        t = MapNoteById_1.configMapNoteById.GetConfig(5);
        if (t) {
          if (this.YYa(t)) {
            return {
              MapNoteId: 5,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(1)
            };
          }
        }
      }
    };
    this.O4o = () => {
      var t = ModelManager_1.ModelManager.LordGymModel.GetCanFightLordGym();
      if (t !== 0) {
        var e = MapNoteById_1.configMapNoteById.GetConfig(8);
        if (e) {
          if (this.YYa(e)) {
            t = ModelManager_1.ModelManager.LordGymModel.GetMarkIdByLordGymId(t);
            return {
              MapNoteId: 8,
              ClickCallBack: this.b4o,
              MapNoteConfig: e,
              MapMarkId: t
            };
          }
        }
      }
    };
    this.uql = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(11);
      if (e && this.YYa(e)) {
        var i;
        var a = ModelManager_1.ModelManager.LordGymModel;
        let t = 0;
        for (const s of LordGymEntranceSetAll_1.configLordGymEntranceSetAll.GetConfigList()) {
          var r = s.MapNoteUnlockCondition;
          if (r) {
            if (!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(r.toString(), undefined, false)) {
              continue;
            }
          }
          for (const o of s.LordEntranceList) {
            if (!a.IsNewLordGymEntranceRecord(o) && !a.GetGymEntranceAllFinish(o)) {
              t = o;
              break;
            }
          }
          if (t > 0) {
            break;
          }
        }
        if (!(t <= 0)) {
          i = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceConfig(t).MarkId;
          return {
            MapNoteId: 11,
            ClickCallBack: this.b4o,
            MapNoteConfig: e,
            MapMarkId: i
          };
        }
      }
    };
    this.XAd = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(4);
      if (this.YYa(e)) {
        var a = e.QuestIdList;
        let i = 0;
        let t = false;
        for (const s of a) {
          var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s);
          if (r === 2 || r === 1) {
            i = s;
            t = true;
            break;
          }
        }
        if (t && e) {
          return {
            MapNoteId: 4,
            ClickCallBack: t => {
              var e = () => {
                var t;
                var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest().Id;
                if (e === i && (t = ModelManager_1.ModelManager.QuestNewModel.TryGetMapMarkIdByQuestId(e)) !== undefined && (this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(t, 12, true), Log_1.Log.CheckInfo())) {
                  Log_1.Log.Info("Quest", 37, "选中鸣域等阶升级任务", ["QuestId", e], ["MarkID", t]);
                }
              };
              if (ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(i)) {
                e();
              } else {
                QuestController_1.QuestNewController.RequestTrackQuest(i, true, 2, 0, e);
              }
            },
            MapNoteConfig: e
          };
        } else {
          return undefined;
        }
      }
    };
    this.g2l = () => {
      this.VAd?.(() => {
        var t = this.p2l();
        t.forEach(t => {
          ModelManager_1.ModelManager.ExploreProgressModel.SetLocalShowNoteIdMap(t.MapNoteId);
        });
        this.WorldMapUiEntity?.SecondaryUiComponent.ShowWorldMapNotePanel(this.yzi, t);
        this.YAd();
      });
    };
    this.SetWorldMapSelfShow = t => {
      this.ShowMode = t;
    };
    this.RefreshWorldMapSelfShow = t => {
      this.XSm();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[3, UE.UIButtonComponent], [6, UE.UIItem], [5, UE.UIItem], [4, UE.UIItem], [0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[3, this.g2l]];
  }
  async Init(t, e, i) {
    await Promise.all([this.CreateThenShowByActorAsync(t.GetOwner()), this.q7l(e)]);
    this.yzi = i;
  }
  SetInfo(t, e) {
    this.WorldMapUiEntity = t;
    this.VAd = e;
  }
  async OnBeforeStartAsync() {
    await this.ExploreItem.Init(this.GetItem(2));
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
  }
  UpdateNoteOrPlayProgress() {
    this.T2l();
    this.L2l();
    if (ModelManager_1.ModelManager.AreaModel.IsExistRecommendPlayPoint()) {
      this.n2l();
      this.YAd();
      this.SKl(true);
    } else {
      this.o5o();
      this.LQl(false);
    }
  }
  LQl(t) {
    this.GetButton(3)?.RootUIComp.SetUIActive(t);
  }
  SKl(t) {
    this.GetButton(3)?.RootUIComp.GetParentAsUIItem()?.SetUIActive(t);
  }
  YAd() {
    var t = this.A2l();
    var e = ModelManager_1.ModelManager.ExploreProgressModel.GetLocalShowNoteIdMap();
    let i = false;
    let a = false;
    let r = false;
    for (const o of t) {
      var s = o();
      if (s && this.D2l(s.MapNoteConfig) && (i = true, e.has(s.MapNoteConfig.Id) || (r = true), s.MapNoteConfig.Style === 1)) {
        a = true;
        break;
      }
    }
    this.UpdateBtnRedOrNew(a, r);
    this.LQl(i);
  }
  UpdateBtnRedOrNew(t, e) {
    this.GetItem(6).SetUIActive(t);
    t = !t && e;
    if (this.qfc !== t) {
      this.qfc = t;
      this.GetItem(5).SetUIActive(t);
    }
  }
  A2l() {
    return [this.WAd, this.KAd, this.XAd, this.N4o, this.O4o, this.uql, this.jAd, this.HAd, this.$Ad, this.yKa, this.QAd, this.yhm, this.RFf, this.LFf];
  }
  D2l(t) {
    return !t.Disable && ((t = t.ConditionId) === 0 || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(t.toString(), undefined));
  }
  n2l() {
    var t = this.ExploreItem?.ExploreData;
    this.O7l(t?.GetShowRecommendExploreItemDataList());
  }
  O7l(t) {
    t?.forEach((t, e) => {
      t.LogInfo();
      let i = this.e2l[e];
      if (i) {
        i.UpdateAreaItemData(t);
      } else {
        e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(4), this.GetItem(0));
        (i = new WorldMapPlayPointItem_1.WorldMapPlayPointItem()).Init(e, t);
        this.e2l.push(i);
      }
    });
  }
  async ResumeRecommendSequence() {
    if (this.e2l.length) {
      this.ExploreItem?.ExploreData?.SaveLocalAreaExplorePlayState();
      await Promise.all(this.e2l.map(async t => t.CheckFinish()));
      let e = 0;
      await Promise.all(this.e2l.map(async t => {
        t.CheckPlayPointStateSequence();
        if (t.ExploreData?.IsNewRecommendPlay) {
          await t.ResumeSequence(++e);
        }
      }));
    }
  }
  async q7l(t) {
    var e = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
    if (e) {
      await ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e)?.CheckUpdatePlayPointData();
    }
    if (t && t !== e) {
      await ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t)?.CheckUpdatePlayPointData();
    }
  }
  T2l() {
    for (const t of this.x3o) {
      t.GetRootItem().SetUIActive(false);
    }
  }
  L2l() {
    for (const t of this.e2l) {
      t.HideMe();
    }
  }
  o5o() {
    var e = this.p2l();
    for (let t = 0; t < e.length; t++) {
      var i = e[t];
      this.m5o(i, t);
      ModelManager_1.ModelManager.ExploreProgressModel.SetLocalShowNoteIdMap(i.MapNoteConfig.Id);
    }
    var t = e.length > 0;
    if (t) {
      this.F7l();
    }
    this.SKl(t);
  }
  N7l() {
    this.x3o.forEach(t => {
      t.PlayStartToPause();
    });
  }
  F7l() {
    var t = this.ExploreItem?.ExploreData?.GetLocalFinishRecommendExploreItems();
    if (t?.length) {
      this.O7l(t);
      this.N7l();
    }
  }
  async ResumeMapNoteSequence() {
    if (this.x3o.length && this.e2l.length) {
      this.ExploreItem?.ExploreData?.ClearLocalAreaExplorePlayState();
      await Promise.all(this.e2l.map(async t => t.CheckFinish()));
      await Promise.all(this.x3o.map(async (t, e) => t.ResumeSequence(e)));
    }
  }
  p2l() {
    var t = [];
    for (const i of this.A2l()) {
      var e = i();
      if (e && this.D2l(e.MapNoteConfig)) {
        t.push(e);
      }
    }
    t.sort(this.B4o);
    return t;
  }
  YYa(t) {
    t = t.MapId;
    return t === 0 || t === this.WorldMapUiEntity.MapId;
  }
  m5o(t, e) {
    if (this.x3o.length > e) {
      this.x3o[e].UpdateNoteItem(t.MapNoteId, t.ClickCallBack, t.MapMarkId);
      this.x3o[e].GetRootItem().SetUIActive(true);
    } else {
      e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetItem(0));
      e = new WorldMapNoteItem_1.WorldMapNoteItem(e);
      this.x3o.push(e);
      e.UpdateNoteItem(t.MapNoteId, t.ClickCallBack, t.MapMarkId);
    }
  }
  DestroyMapNotes() {
    for (const t of this.x3o) {
      t.Destroy();
    }
    this.x3o.length = 0;
  }
  DestroyMapPlayPoints() {
    for (const t of this.e2l) {
      t.Destroy();
    }
    this.e2l.length = 0;
  }
  SetMapNotesState(t) {
    if (t !== this.P3o) {
      this.P3o = t;
      this.GetItem(0).SetUIActive(t);
    }
  }
  UpdateAreaProgress() {
    var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
    if (t) {
      this.XSm();
      this.ExploreItem.SetActive(true);
      this.ExploreItem.Update(t);
    } else {
      this.ExploreItem.SetActive(false);
    }
  }
  XSm() {
    this.SetUiActive(this.ShowMode === 1);
  }
}
exports.ExploreInfoItem = ExploreInfoItem;
//# sourceMappingURL=ExploreInfoItem.js.map