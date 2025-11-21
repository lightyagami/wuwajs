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
    this.VAd = undefined;
    this.B4o = (e, t) => t.MapNoteConfig.Rank - e.MapNoteConfig.Rank;
    this.b4o = e => {
      this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(e, 0, true);
    };
    this.jAd = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(9);
      if (e && this.YYa(e) && ModelManager_1.ModelManager.RoguelikeModel?.GetMapNoteShowState() && e) {
        return {
          MapNoteId: 9,
          ClickCallBack: this.b4o,
          MapNoteConfig: e,
          MapMarkId: e.MarkIdMap.get(1)
        };
      } else {
        return undefined;
      }
    };
    this.HAd = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(13);
      if (e) {
        var t = this.YYa(e);
        if (t) {
          if (ModelManager_1.ModelManager.ActivityPermanentRogueModel?.GetMapNoteShowState()) {
            return {
              MapNoteId: 13,
              ClickCallBack: this.b4o,
              MapNoteConfig: e,
              MapMarkId: e.MarkIdMap.get(1)
            };
          }
        }
      }
    };
    this.$Ad = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(14);
      if (e) {
        var t = this.YYa(e);
        if (t) {
          if (ModelManager_1.ModelManager.WeeklyRogueModel.GetMapNoteShowState()) {
            return {
              MapNoteId: 14,
              ClickCallBack: this.b4o,
              MapNoteConfig: e,
              MapMarkId: ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew?.GetCycleConfig()?.MapMark
            };
          }
        }
      }
    };
    this.yKa = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(10);
      if (e && this.YYa(e)) {
        var t;
        var i = ModelManager_1.ModelManager.MingSuModel;
        var a = i.GetDragonPoolInstanceById(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID);
        if (a) {
          t = a.GetDragonPoolLevel();
          t = a.GetNeedCoreCount(t) - a.GetHadCoreCount();
          a = i.GetTargetDragonPoolCoreById(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID);
          if (t <= i.GetItemCount(a) && e) {
            return {
              MapNoteId: 10,
              ClickCallBack: this.b4o,
              MapNoteConfig: e,
              MapMarkId: e.MarkIdMap.get(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.WAd = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(2);
      if (e && this.YYa(e)) {
        var t;
        var i = ModelManager_1.ModelManager.MingSuModel;
        var a = i.GetDragonPoolInstanceById(MingSuDefine_1.MING_SU_POOL_CONFIG_ID);
        if (a) {
          t = a.GetDragonPoolLevel();
          t = a.GetNeedCoreCount(t) - a.GetHadCoreCount();
          a = i.GetTargetDragonPoolCoreById(MingSuDefine_1.MING_SU_POOL_CONFIG_ID);
          if (t <= i.GetItemCount(a) && e) {
            return {
              MapNoteId: 2,
              ClickCallBack: this.b4o,
              MapNoteConfig: e,
              MapMarkId: e.MarkIdMap.get(MingSuDefine_1.MING_SU_POOL_CONFIG_ID)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.QAd = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(12);
      if (e && this.YYa(e)) {
        var t;
        var i = ModelManager_1.ModelManager.MingSuModel;
        var a = i.GetDragonPoolInstanceById(MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID);
        if (a) {
          t = a.GetDragonPoolLevel();
          t = a.GetNeedCoreCount(t) - a.GetHadCoreCount();
          a = i.GetTargetDragonPoolCoreById(MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID);
          if (t <= i.GetItemCount(a) && e) {
            return {
              MapNoteId: 12,
              ClickCallBack: this.b4o,
              MapNoteConfig: e,
              MapMarkId: e.MarkIdMap.get(MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.Zrm = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(15);
      if (e && this.YYa(e)) {
        var t;
        var i = ModelManager_1.ModelManager.MingSuModel;
        var a = i.GetDragonPoolInstanceById(MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID);
        if (a) {
          t = a.GetDragonPoolLevel();
          t = a.GetNeedCoreCount(t) - a.GetHadCoreCount();
          a = i.GetTargetDragonPoolCoreById(MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID);
          if (t <= i.GetItemCount(a) && e) {
            return {
              MapNoteId: 15,
              ClickCallBack: this.b4o,
              MapNoteConfig: e,
              MapMarkId: e.MarkIdMap.get(MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.KAd = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(3);
      if (e && ModelManager_1.ModelManager.WorldMapModel.WorldMapId === MapDefine_1.BIG_WORLD_MAP_ID && ModelManager_1.ModelManager.TowerModel.CanGetRewardAllDifficulties() && e) {
        return {
          MapNoteId: 3,
          ClickCallBack: this.b4o,
          MapNoteConfig: e,
          MapMarkId: e.MarkIdMap.get(1)
        };
      } else {
        return undefined;
      }
    };
    this.N4o = () => {
      var e = ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(WorldMapDefine_1.HUANG_LONG_COUNTRY_ID);
      if (e && e.CanLevelUp()) {
        e = MapNoteById_1.configMapNoteById.GetConfig(5);
        if (e) {
          if (this.YYa(e)) {
            return {
              MapNoteId: 5,
              ClickCallBack: this.b4o,
              MapNoteConfig: e,
              MapMarkId: e.MarkIdMap.get(1)
            };
          }
        }
      }
    };
    this.O4o = () => {
      var e = ModelManager_1.ModelManager.LordGymModel.GetCanFightLordGym();
      if (e !== 0) {
        var t = MapNoteById_1.configMapNoteById.GetConfig(8);
        if (t) {
          if (this.YYa(t)) {
            e = ModelManager_1.ModelManager.LordGymModel.GetMarkIdByLordGymId(e);
            return {
              MapNoteId: 8,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: e
            };
          }
        }
      }
    };
    this.uql = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(11);
      if (t && this.YYa(t)) {
        var i;
        var a = ModelManager_1.ModelManager.LordGymModel;
        let e = 0;
        for (const o of LordGymEntranceSetAll_1.configLordGymEntranceSetAll.GetConfigList()) {
          var r = o.MapNoteUnlockCondition;
          if (r) {
            if (!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(r.toString(), undefined, false)) {
              continue;
            }
          }
          for (const s of o.LordEntranceList) {
            if (!a.IsNewLordGymEntranceRecord(s) && !a.GetGymEntranceAllFinish(s)) {
              e = s;
              break;
            }
          }
          if (e > 0) {
            break;
          }
        }
        if (!(e <= 0)) {
          i = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceConfig(e).MarkId;
          return {
            MapNoteId: 11,
            ClickCallBack: this.b4o,
            MapNoteConfig: t,
            MapMarkId: i
          };
        }
      }
    };
    this.XAd = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(4);
      if (this.YYa(t)) {
        var a = t.QuestIdList;
        let i = 0;
        let e = false;
        for (const o of a) {
          var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o);
          if (r === 2 || r === 1) {
            i = o;
            e = true;
            break;
          }
        }
        if (e && t) {
          return {
            MapNoteId: 4,
            ClickCallBack: e => {
              var t = () => {
                var e;
                var t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest().Id;
                if (t === i && (e = ModelManager_1.ModelManager.QuestNewModel.TryGetMapMarkIdByQuestId(t)) !== undefined && (this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(e, 12, true), Log_1.Log.CheckInfo())) {
                  Log_1.Log.Info("Quest", 37, "选中鸣域等阶升级任务", ["QuestId", t], ["MarkID", e]);
                }
              };
              if (ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(i)) {
                t();
              } else {
                QuestController_1.QuestNewController.RequestTrackQuest(i, true, 2, 0, t);
              }
            },
            MapNoteConfig: t
          };
        } else {
          return undefined;
        }
      }
    };
    this.g2l = () => {
      this.VAd?.(() => {
        var e = this.p2l();
        e.forEach(e => {
          ModelManager_1.ModelManager.ExploreProgressModel.SetLocalShowNoteIdMap(e.MapNoteId);
        });
        this.WorldMapUiEntity?.SecondaryUiComponent.ShowWorldMapNotePanel(this.Parent.GetRootItem(), e);
        this.YAd();
      });
    };
    this.SetWorldMapSelfShow = e => {
      this.ShowMode = e;
    };
    this.RefreshWorldMapSelfShow = e => {
      this.fgm();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[3, UE.UIButtonComponent], [6, UE.UIItem], [5, UE.UIItem], [4, UE.UIItem], [0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[3, this.g2l]];
  }
  async Init(e, t) {
    await Promise.all([this.CreateThenShowByActorAsync(e.GetOwner()), this.q7l(t)]);
  }
  SetInfo(e, t) {
    this.WorldMapUiEntity = e;
    this.VAd = t;
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
  LQl(e) {
    this.GetButton(3)?.RootUIComp.SetUIActive(e);
  }
  SKl(e) {
    this.GetButton(3)?.RootUIComp.GetParentAsUIItem()?.SetUIActive(e);
  }
  YAd() {
    var e = this.A2l();
    var t = ModelManager_1.ModelManager.ExploreProgressModel.GetLocalShowNoteIdMap();
    let i = false;
    let a = false;
    let r = false;
    for (const s of e) {
      var o = s();
      if (o && this.D2l(o.MapNoteConfig) && (i = true, t.has(o.MapNoteConfig.Id) || (r = true), o.MapNoteConfig.Style === 1)) {
        a = true;
        break;
      }
    }
    this.UpdateBtnRedOrNew(a, r);
    this.LQl(i);
  }
  UpdateBtnRedOrNew(e, t) {
    this.GetItem(6).SetUIActive(e);
    e = !e && t;
    if (this.qfc !== e) {
      this.qfc = e;
      this.GetItem(5).SetUIActive(e);
    }
  }
  A2l() {
    return [this.WAd, this.KAd, this.XAd, this.N4o, this.O4o, this.uql, this.jAd, this.HAd, this.$Ad, this.yKa, this.QAd, this.Zrm];
  }
  D2l(e) {
    e = e.ConditionId;
    return e === 0 || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.toString(), undefined);
  }
  n2l() {
    var e = this.ExploreItem?.ExploreData;
    this.O7l(e?.GetShowRecommendExploreItemDataList());
  }
  O7l(e) {
    e?.forEach((e, t) => {
      e.LogInfo();
      let i = this.e2l[t];
      if (i) {
        i.UpdateAreaItemData(e);
      } else {
        t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(4), this.GetItem(0));
        (i = new WorldMapPlayPointItem_1.WorldMapPlayPointItem()).Init(t, e);
        this.e2l.push(i);
      }
    });
  }
  async ResumeRecommendSequence() {
    if (this.e2l.length) {
      this.ExploreItem?.ExploreData?.SaveLocalAreaExplorePlayState();
      await Promise.all(this.e2l.map(async e => e.CheckFinish()));
      let t = 0;
      await Promise.all(this.e2l.map(async e => {
        e.CheckPlayPointStateSequence();
        if (e.ExploreData?.IsNewRecommendPlay) {
          await e.ResumeSequence(++t);
        }
      }));
    }
  }
  async q7l(e) {
    var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
    if (t) {
      await ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t)?.CheckUpdatePlayPointData();
    }
    if (e && e !== t) {
      await ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e)?.CheckUpdatePlayPointData();
    }
  }
  T2l() {
    for (const e of this.x3o) {
      e.GetRootItem().SetUIActive(false);
    }
  }
  L2l() {
    for (const e of this.e2l) {
      e.HideMe();
    }
  }
  o5o() {
    var t = this.p2l();
    for (let e = 0; e < t.length; e++) {
      var i = t[e];
      this.m5o(i, e);
      ModelManager_1.ModelManager.ExploreProgressModel.SetLocalShowNoteIdMap(i.MapNoteConfig.Id);
    }
    var e = t.length > 0;
    if (e) {
      this.F7l();
    }
    this.SKl(e);
  }
  N7l() {
    this.x3o.forEach(e => {
      e.PlayStartToPause();
    });
  }
  F7l() {
    var e = this.ExploreItem?.ExploreData?.GetLocalFinishRecommendExploreItems();
    if (e?.length) {
      this.O7l(e);
      this.N7l();
    }
  }
  async ResumeMapNoteSequence() {
    if (this.x3o.length && this.e2l.length) {
      this.ExploreItem?.ExploreData?.ClearLocalAreaExplorePlayState();
      await Promise.all(this.e2l.map(async e => e.CheckFinish()));
      await Promise.all(this.x3o.map(async (e, t) => e.ResumeSequence(t)));
    }
  }
  p2l() {
    var e = [];
    for (const i of this.A2l()) {
      var t = i();
      if (t && this.D2l(t.MapNoteConfig)) {
        e.push(t);
      }
    }
    e.sort(this.B4o);
    return e;
  }
  YYa(e) {
    e = e.MapId;
    return e === 0 || e === this.WorldMapUiEntity.MapId;
  }
  m5o(e, t) {
    if (this.x3o.length > t) {
      this.x3o[t].UpdateNoteItem(e.MapNoteId, e.ClickCallBack, e.MapMarkId);
      this.x3o[t].GetRootItem().SetUIActive(true);
    } else {
      t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetItem(0));
      t = new WorldMapNoteItem_1.WorldMapNoteItem(t);
      this.x3o.push(t);
      t.UpdateNoteItem(e.MapNoteId, e.ClickCallBack, e.MapMarkId);
    }
  }
  DestroyMapNotes() {
    for (const e of this.x3o) {
      e.Destroy();
    }
    this.x3o.length = 0;
  }
  DestroyMapPlayPoints() {
    for (const e of this.e2l) {
      e.Destroy();
    }
    this.e2l.length = 0;
  }
  SetMapNotesState(e) {
    if (e !== this.P3o) {
      this.P3o = e;
      this.GetItem(0).SetUIActive(e);
    }
  }
  UpdateAreaProgress() {
    var e = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
    if (e) {
      this.fgm();
      this.ExploreItem.SetActive(true);
      this.ExploreItem.Update(e);
    } else {
      this.ExploreItem.SetActive(false);
    }
  }
  fgm() {
    this.SetUiActive(this.ShowMode === 1);
  }
}
exports.ExploreInfoItem = ExploreInfoItem;
//# sourceMappingURL=ExploreInfoItem.js.map