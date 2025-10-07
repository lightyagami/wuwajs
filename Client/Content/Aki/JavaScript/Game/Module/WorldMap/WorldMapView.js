"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const LordGymEntranceSetAll_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceSetAll");
const MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const WorldNavigation_1 = require("../Common/WorldNavigation");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const MapController_1 = require("../Map/Controller/MapController");
const MapDefine_1 = require("../Map/MapDefine");
const MapHelper_1 = require("../Map/MapHelper");
const MapUtil_1 = require("../Map/MapUtil");
const MapDebugger_1 = require("../Map/Mark/Debug/MapDebugger");
const MapLogger_1 = require("../Map/Misc/MapLogger");
const MapLifeEventDispatcher_1 = require("../Map/View/BaseMap/Assistant/MapLifeEvent/MapLifeEventDispatcher");
const Map_1 = require("../Map/View/BaseMap/Map");
const MingSuDefine_1 = require("../MingSu/MingSuDefine");
const PowerController_1 = require("../Power/PowerController");
const PowerCurrencyItem_1 = require("../Power/SubViews/PowerCurrencyItem");
const QuestController_1 = require("../QuestNew/Controller/QuestController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const LongPressButton_1 = require("../Util/LongPressButton");
const WorldMapChangeGravityButtonItem_1 = require("./SubViews/Common/WorldMapChangeGravityButtonItem");
const UnderseaOverviewItem_1 = require("./SubViews/UnderseaExperimentField/UnderseaOverviewItem");
const WorldMapUiEntity_1 = require("./ViewComponent/WorldMapUiEntity");
const WorldMapController_1 = require("./WorldMapController");
const WorldMapDefine_1 = require("./WorldMapDefine");
const WorldMapNoteItem_1 = require("./WorldMapNoteItem");
const WorldMapPeriodicActivityItem_1 = require("./WorldMapPeriodicActivityItem");
const WorldMapPlayPointItem_1 = require("./WorldMapPlayPointItem");
const WorldMapSubMapItem_1 = require("./WorldMapSubMapItem");
const WorldMapUtil_1 = require("./WorldMapUtil");
const SCALE_STEP = 0.1;
const MARKICON_HALFSIZE = 70;
const MAX_INT32_NUMBER = 2147483647;
const VIEW_PORT_BUFFER_REGION = 400;
class WorldMapView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.WorldMapUiEntity = undefined;
    this.v3o = undefined;
    this.BFo = undefined;
    this.M3o = undefined;
    this.R3o = undefined;
    this.NXs = undefined;
    this.fea = undefined;
    this.P3o = false;
    this.x3o = undefined;
    this.e2l = undefined;
    this.w3o = undefined;
    this.B3o = new Vector2D_1.Vector2D();
    this.b3o = undefined;
    this.q3o = undefined;
    this.G3o = [0, undefined];
    this.N3o = undefined;
    this.k3o = undefined;
    this.Fvd = undefined;
    this.uwu = undefined;
    this.H3o = undefined;
    this.j3o = new Map();
    this.W3o = undefined;
    this.X3o = undefined;
    this.K3o = undefined;
    this.Q3o = undefined;
    this.Twl = 0;
    this.$Ya = 0;
    this.z3o = false;
    this.qfc = undefined;
    this.tKl = false;
    this.Gfc = undefined;
    this.e4o = () => {
      var t;
      if (!(this.Twl <= 0)) {
        this.Twl = 0;
        if (t = this.v3o.SelfPlayerNode?.GetLGUISpaceAbsolutePosition()) {
          this.H3o?.SetLGUISpaceAbsolutePosition(t);
        }
        this.H3o?.SetUIActive(true);
        this.Q3o?.PlayLevelSequenceByName("Start", true);
        this.v3o.HandleMapTileDelegate();
      }
    };
    this.Shl = new Set(["PowerView", "ExploreProgressView", "MapExploreDetailView"]);
    this.yhl = t => {
      if (this.Shl.has(t)) {
        this.u4o(undefined, false);
        this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen = true;
        this.d4o();
      }
    };
    this.$Ge = t => {
      if (this.Shl.has(t)) {
        this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen = false;
        if (!this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening) {
          this._4o();
        }
      }
    };
    this.Ili = () => {
      this.u4o(() => {
        PowerController_1.PowerController.OpenPowerView();
      });
    };
    this._4o = () => {
      this.v3o.SetClickRangeVisible(false);
      if (this.WorldMapUiEntity.ClickedItem) {
        this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = false;
        this.WorldMapUiEntity.ClickedItem.SetSelected(false);
        this.WorldMapUiEntity.UpdateSingleMarkItem(this.WorldMapUiEntity.ClickedItem, true);
        this.WorldMapUiEntity.ClickedItem = undefined;
      }
      this.WorldMapUiEntity.UpdateMarkItems();
      this.c4o(true);
      if (!this.z3o) {
        this.K3o.StopCurrentSequence();
        this.GetItem(17).SetUIActive(true);
        this.K3o.PlayLevelSequenceByName("Show");
      }
      this.m4o(Info_1.Info.IsInGamepad());
      this.N3o.SetCursorActive(true);
      this.iKl();
    };
    this.iKl = () => {
      if (this.tKl && !this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening) {
        this.tKl = false;
        this.M2l();
        this.bQl(500);
      }
    };
    this.d4o = () => {
      this.c4o(false);
      if (this.z3o) {
        this.z3o = false;
      } else {
        this.K3o.StopCurrentSequence();
        this.K3o.PlayLevelSequenceByName("Hide");
      }
      this.N3o.SetCursorActive(false);
    };
    this.Ceh = t => {
      if (t === "Hide") {
        this.GetItem(17).SetUIActive(false);
      }
    };
    this.vKe = t => {
      if (!this.WorldMapUiEntity.MoveComponent.IsDragMoveDisabled) {
        this.u4o();
      }
    };
    this.GFo = t => {
      if (t.mouseButtonType !== 2 && !this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen) {
        t = t.GetLocalPointInPlane();
        const _ = Vector2D_1.Vector2D.Create(t.X, t.Y);
        if (!Info_1.Info.IsBuildShipping && (n = MapUtil_1.MapUtil.UiPosition2WorldPosition(Vector_1.Vector.Create(t.X, t.Y, 0)), e = MapController_1.MapController.GetMarkPosition(t.X, -t.Y))) {
          n.Set(e.X * MapDefine_1.UNIT, e.Y * MapDefine_1.UNIT, e.Z * MapDefine_1.UNIT);
          WorldNavigation_1.WorldNavigation.TestFindPath(n, t => {
            if (t) {
              if (UiManager_1.UiManager.IsViewOpen("WorldMapView")) {
                UiManager_1.UiManager.CloseViewAsync("WorldMapView");
              }
            } else if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Map", 61, "大世界寻路失败");
            }
          });
        }
        if (this.WorldMapUiEntity.IsInPlayerMap && this.WorldMapUiEntity.PlayerComponent.PlayerOutOfBound && this.C4o(_, this.v3o.SelfPlayerNode, true)[0]) {
          this.WorldMapUiEntity.MoveComponent.FocusPlayer(this.WorldMapUiEntity.PlayerComponent.PlayerUiPosition, true, 1);
        } else {
          const M = [];
          var e = Vector_1.Vector.Create(t.X, t.Y, t.Z);
          var s = [];
          var a = [];
          var r = async t => {
            var e = await t.GetRootItemAsync();
            return [t, e];
          };
          for (const l of this.v3o.GetMarkItemsByClickPosition(e)) {
            if (l.View && l.GetInteractiveFlag() && !l.IsOutOfBound) {
              s.push(r(l));
            }
          }
          let i = s.length <= 1;
          var h;
          var n = Promise.all(s).then(t => {
            for (const e of t) {
              if (this.C4o(_, e[1], i)[0]) {
                M.push(e[0]);
              }
            }
          });
          for ([, h] of this.v3o.GetAllMarkItems()) {
            for (var [, o] of h) {
              if (o.IsOutOfBound) {
                a.push(r(o));
              }
            }
          }
          i = a.length <= 1;
          t = Promise.all(a).then(t => {
            for (const e of t) {
              if (this.C4o(_, e[1], i)[0]) {
                M.push(e[0]);
              }
            }
          });
          Promise.all([t, n]).then(() => {
            if (M.length === 0) {
              this.g4o(_);
            } else if (M.length === 1) {
              this.f4o(M[0]);
            } else if (M.length > 1) {
              this.p4o(M, _);
            }
          });
        }
      }
    };
    this.f4o = (t, e) => {
      this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(t.MarkId, t.MarkType, true);
    };
    this.viu = (s, a) => {
      if (!this.WorldMapUiEntity.ClickedItem || this.WorldMapUiEntity.ClickedItem.MarkId !== s.MarkId) {
        var e = ModelManager_1.ModelManager.WorldMapModel;
        e.CurrentFocalMarkType = s.MarkType;
        e.CurrentFocalMarkId = s.MarkId;
        if (e.EnableDebug) {
          MapDebugger_1.MapDebugger.PrintMarkItemDumpInfo(this.WorldMapUiEntity.Map, s);
        }
        let t = true;
        if (this.WorldMapUiEntity.SecondaryUiComponent.IsInternalSecondaryUiOpen()) {
          if (!s.IsOutOfBound || a) {
            this.z3o = true;
          } else {
            this.z3o = false;
          }
          t = false;
        }
        this.u4o(() => {
          var t;
          var e;
          var i;
          if (!s.IsOutOfBound || !(this.WorldMapUiEntity.MoveComponent.SetMapPosition(s, true, 1, undefined, undefined, true, true), !a)) {
            if (this.R3o && !this.R3o.IsDestroy) {
              this.R3o.GetRootItemAsync().then(t => {
                if (t) {
                  this.v4o(t).StopSequenceByKey("Dianji");
                }
              });
            }
            this.R3o = s;
            this.WorldMapUiEntity.ClickedItem = s;
            this.WorldMapUiEntity.ClickedItem?.SetSelected(true);
            this.WorldMapUiEntity.UpdateSingleMarkItem(s, true);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Map", 63, "点击图标", ["追踪状态:", s.IsTracked], ["MarkId:", s.MarkId], ["IsMultiMap:", s.IsMultiMap()]);
            }
            if (this.WorldMapUiEntity.ClickedItem.IsMultiMap()) {
              i = this.WorldMapUiEntity.ClickedItem.GetMultiMapId();
              if (i = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(i)) {
                t = i.Area.length > 0 ? i.Area[0] : this.WorldMapUiEntity.Map.GetWorldMapCenterAreaId();
                e = i.GroupId;
                i = i.Floor;
                this.WorldMapUiEntity.MultiFloorComponent.SelectMultiMapFloor(t, e, i, true);
              }
            } else {
              this.WorldMapUiEntity.MultiFloorComponent.DeSelectMultiMapFloor();
            }
            this.M4o(s);
          }
        }, t);
      }
    };
    this.E4o = async (i, s) => {
      var a = i.filter(t => t.IsOutOfBound);
      if (a.length === 0) {
        this.WorldMapUiEntity.SecondaryUiComponent.ShowMarkMenu(this.RootItem, i);
        this.v3o.SetClickRangeVisible(true, s);
      } else {
        let t = a[0];
        i = await t.GetRootItemAsync();
        let e = Vector2D_1.Vector2D.Distance(s, Vector2D_1.Vector2D.Create(i.GetAnchorOffset()));
        var r = [];
        for (const o of a) {
          if (o.View) {
            r.push((async t => {
              var e = await t.GetRootItemAsync();
              return [t, e];
            })(o));
          }
        }
        for (const _ of await Promise.all(r)) {
          var h = _[0];
          var n = _[1];
          var n = Vector2D_1.Vector2D.Distance(s, Vector2D_1.Vector2D.Create(n.GetAnchorOffset()));
          if (e > n) {
            t = h;
            e = n;
          }
        }
        i = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y);
        i.UnaryNegation(i);
        i.MultiplyEqual(this.MapScale);
        this.WorldMapUiEntity.MoveComponent.SetMapPosition(i, false, 1);
      }
    };
    this.I4o = t => {
      t = this.v3o.GetMarkItem(t.MarkType, t.MarkId);
      if (t && t.MarkType === 9) {
        t.IsIgnoreScaleShow = true;
      }
    };
    this.mdl = t => {
      if (!t.IsInConsistentDistrict()) {
        this.WorldMapUiEntity.UpdateSingleMarkItem(t);
      }
    };
    this.T4o = (t, e) => {
      var i = this.v3o.GetMarkItem(t, e);
      if (i) {
        this.WorldMapUiEntity.UpdateSingleMarkItem(i, true);
      }
      if (this.WorldMapUiEntity.ClickedItem?.MarkType === t && this.WorldMapUiEntity.ClickedItem?.MarkId === e) {
        this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = false;
        this.WorldMapUiEntity.ClickedItem = undefined;
      }
    };
    this.R4o = (t, e) => {
      this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(e, t, true);
    };
    this.XYa = (t, e, i, s, a) => {
      if (a && !this.v3o.GetMarkItem(e, t)) {
        ModelManager_1.ModelManager.MapModel.CreateTempMapMark(t);
      }
      a = this.v3o.GetMarkItem(e, t);
      if (a) {
        this.WorldMapUiEntity.MoveComponent.PushMap(a, s);
        if (i && a.MarkType !== 1) {
          this.U4o(a.MarkType, t);
        }
      } else {
        MapLogger_1.MapLogger.Warn(63, "聚焦了不存在的标记", ["地图标记类型:", e], ["地图标记Id", t]);
      }
    };
    this.eZa = t => {
      this.i2l(t);
    };
    this.r2l = t => {
      this.WorldMapUiEntity.UpdateMarkItems();
    };
    this.o2l = t => {
      this.WorldMapUiEntity.UpdateMarkItems();
    };
    this.s2l = t => {
      var e = this.WorldMapUiEntity?.QuickNavigateComponent.GetNavigateMarkIsNeedChangeMap(t.MarkId, t.MarkType);
      if (e?.MapId || e?.Gravity) {
        this.a2l(e.MapId, t, e.Gravity ?? 1);
      } else {
        this.XYa(t.MarkId, t.MarkType, false, t.FocusTween ?? true);
        this.l2l(t);
      }
    };
    this.A8l = (t, e) => {
      if (!UiManager_1.UiManager.IsViewShow("MapExploreDetailView")) {
        if (UiManager_1.UiManager.IsViewOpen("MapExploreDetailView")) {
          UiManager_1.UiManager.CloseViewAsync("MapExploreDetailView").then(() => {
            this.OpenMapExploreAreaDetailView(t, e);
          });
        } else {
          this.OpenMapExploreAreaDetailView(t, e);
        }
      }
    };
    this.Nvd = () => {
      this.Fvd?.RefreshView(this.krh());
    };
    this.P4o = () => {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_com_slider_tick");
      this.x4o(SCALE_STEP, 1);
    };
    this.w4o = () => {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_com_slider_tick");
      this.x4o(-SCALE_STEP, 1);
    };
    this.AMo = () => {
      UiManager_1.UiManager.ResetToBattleView();
    };
    this.x4o = (t, e) => {
      if (e === 2 && this.WorldMapUiEntity.InteractComponent.IsJoystickZoom) {
        this.WorldMapUiEntity.MoveComponent.KillTweening();
      }
      if (!this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening) {
        this.WorldMapUiEntity.ScaleComponent.AddMapScale(t, e);
      }
    };
    this.B4o = (t, e) => e.MapNoteConfig.Rank - t.MapNoteConfig.Rank;
    this.b4o = t => {
      this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(t, 0, true);
    };
    this.bsa = () => {
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
    this.NB1 = () => {
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
    this.H3u = () => {
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
    this.yKa = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(10);
      if (t && this.YYa(t)) {
        var e;
        var i = ModelManager_1.ModelManager.MingSuModel;
        var s = i.GetDragonPoolInstanceById(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID);
        if (s) {
          e = s.GetDragonPoolLevel();
          e = s.GetNeedCoreCount(e) - s.GetHadCoreCount();
          s = i.GetTargetDragonPoolCoreById(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID);
          if (e <= i.GetItemCount(s) && t) {
            return {
              MapNoteId: 10,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.q4o = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(2);
      if (t && this.YYa(t)) {
        var e;
        var i = ModelManager_1.ModelManager.MingSuModel;
        var s = i.GetDragonPoolInstanceById(MingSuDefine_1.MING_SU_POOL_CONFIG_ID);
        if (s) {
          e = s.GetDragonPoolLevel();
          e = s.GetNeedCoreCount(e) - s.GetHadCoreCount();
          s = i.GetTargetDragonPoolCoreById(MingSuDefine_1.MING_SU_POOL_CONFIG_ID);
          if (e <= i.GetItemCount(s) && t) {
            return {
              MapNoteId: 2,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(MingSuDefine_1.MING_SU_POOL_CONFIG_ID)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.PQl = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(12);
      if (t && this.YYa(t)) {
        var e;
        var i = ModelManager_1.ModelManager.MingSuModel;
        var s = i.GetDragonPoolInstanceById(MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID);
        if (s) {
          e = s.GetDragonPoolLevel();
          e = s.GetNeedCoreCount(e) - s.GetHadCoreCount();
          s = i.GetTargetDragonPoolCoreById(MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID);
          if (e <= i.GetItemCount(s) && t) {
            return {
              MapNoteId: 12,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.B$d = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(15);
      if (t && this.YYa(t)) {
        var e;
        var i = ModelManager_1.ModelManager.MingSuModel;
        var s = i.GetDragonPoolInstanceById(MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID);
        if (s) {
          e = s.GetDragonPoolLevel();
          e = s.GetNeedCoreCount(e) - s.GetHadCoreCount();
          s = i.GetTargetDragonPoolCoreById(MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID);
          if (e <= i.GetItemCount(s) && t) {
            return {
              MapNoteId: 15,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID)
            };
          } else {
            return undefined;
          }
        }
      }
    };
    this.G4o = () => {
      var t = MapNoteById_1.configMapNoteById.GetConfig(3);
      if (t && this.krh() && ModelManager_1.ModelManager.TowerModel.CanGetRewardAllDifficulties() && t) {
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
        var s = ModelManager_1.ModelManager.LordGymModel;
        let t = 0;
        for (const r of LordGymEntranceSetAll_1.configLordGymEntranceSetAll.GetConfigList()) {
          var a = r.MapNoteUnlockCondition;
          if (a) {
            if (!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(a.toString(), undefined, false)) {
              continue;
            }
          }
          for (const h of r.LordEntranceList) {
            if (!s.IsNewLordGymEntranceRecord(h) && !s.GetGymEntranceAllFinish(h)) {
              t = h;
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
    this.k4o = () => {
      var e = MapNoteById_1.configMapNoteById.GetConfig(4);
      if (this.YYa(e)) {
        var s = e.QuestIdList;
        let i = 0;
        let t = false;
        for (const r of s) {
          var a = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r);
          if (a === 2 || a === 1) {
            i = r;
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
    this.XBo = () => {
      this.N3o.SetCursorActive(!this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening);
    };
    this.F4o = () => {
      if (Info_1.Info.IsInGamepad()) {
        if (this.w3o.length === 0) {
          this.g4o(this.B3o);
        } else if (this.w3o.length === 1) {
          this.f4o(this.w3o[0]);
        } else if (this.w3o.length > 1) {
          this.p4o(this.w3o, this.B3o);
        }
      }
    };
    this._2l = () => {
      if (this.WorldMapUiEntity?.IsInPlayerMap && this.WorldMapUiEntity?.IsInPlayerGravity) {
        this.u2l();
      } else {
        this.c2l();
      }
    };
    this.u2l = () => {
      this.$lh();
      this.WorldMapUiEntity?.MoveComponent.FocusPlayer(this.WorldMapUiEntity.PlayerComponent.PlayerUiPosition, true, 1);
    };
    this.m2l = () => {
      const t = this.d2l();
      if (t.length <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Tracking_List_Empty_Text");
      } else {
        if (this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening) {
          this.z3o = true;
        }
        this.u4o(() => {
          this.WorldMapUiEntity?.SecondaryUiComponent.ShowTrackMenu(this.RootItem, t);
        });
      }
    };
    this.C2l = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 69, "OnTrackMenuClickItem", ["MarkItemId", t.MarkItem?.MarkId], ["MarkItemName", t.MarkItem?.GetTitleText()], ["IsPlayerSelf", t.IsPlayerSelf], ["Title", t.Title]);
      }
      this.u4o(() => {
        this.$lh();
        if (t.IsPlayerSelf) {
          this.WorldMapUiEntity?.MoveComponent.FocusPlayer(this.WorldMapUiEntity.PlayerComponent.PlayerUiPosition, true, 1);
        } else if (t.MarkItem) {
          this.WorldMapUiEntity.MoveComponent.SetMapPosition(t.MarkItem, true, 1, undefined, undefined, true, true);
        }
      });
    };
    this.H4o = () => {
      var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
      if (t) {
        this.k3o.SetActive(true);
        this.k3o.Update(t);
      } else {
        this.k3o.SetActive(false);
      }
    };
    this.zYa = () => {
      this.$lh();
      this.u4o(() => {
        this.WorldMapUiEntity.MultiFloorComponent.DeSelectMultiMapFloor();
        this.WorldMapUiEntity.SecondaryUiComponent.ShowQuickNavigate(this.RootItem, this.v3o.GetNavigateMarkList());
      });
    };
    this.g2l = () => {
      this.u4o(() => {
        var t = this.p2l();
        t.forEach(t => {
          ModelManager_1.ModelManager.ExploreProgressModel.SetLocalShowNoteIdMap(t.MapNoteId);
        });
        this.WorldMapUiEntity?.SecondaryUiComponent.ShowWorldMapNotePanel(this.RootItem, t);
        this.U2l();
      });
    };
    this.f2l = () => {
      this.u4o(() => {
        this.WorldMapUiEntity?.SecondaryUiComponent.ShowMapMarkTogglePanel(this.RootItem);
      });
    };
    this.Ffc = () => {
      if (this.WorldMapUiEntity.WorldMapAlterMapComponent.CanChangeMapGravity) {
        this.$lh();
        this.u4o(() => {
          this.WorldMapUiEntity.MultiFloorComponent.DeSelectMultiMapFloor();
          this.WorldMapUiEntity.WorldMapAlterMapComponent.ChangeMapGravity();
          this.Nfc();
        });
      }
    };
    this.Vhl = t => {
      this.dwu();
    };
    this.V61 = (t, e) => {
      if (t === InputMappingsDefine_1.keyMappings.C) {
        this.j61();
      }
    };
    this.F61 = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "服务端通知绘制寻路点->世界地图");
      }
      var e = ModelManager_1.ModelManager.WorldMapModel.GetDebugMapPath();
      e.Empty();
      var i = new Vector2D_1.Vector2D();
      for (const a of t.rS_) {
        var s = Vector_1.Vector.Create(a);
        MapUtil_1.MapUtil.WorldPosition2UiPosition2D(Vector2D_1.Vector2D.Create(s.X, s.Y), i);
        e.Add(i.ToUeVector2D());
      }
      this.WorldMapUiEntity.Map.SetDebugPath(e);
    };
  }
  krh() {
    return this.$Ya === MapDefine_1.BIG_WORLD_MAP_ID;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISliderComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UINiagara], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIVerticalLayout], [19, UE.UIItem], [20, UE.UIButtonComponent], [21, UE.UIText], [22, UE.UIButtonComponent], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIButtonComponent], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIText], [29, UE.UIItem]];
    this.BtnBindInfo = [[5, this.AMo], [20, this.zYa], [22, this.g2l], [6, this.f2l]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(14)?.SetUIActive(false);
    this.GetItem(23)?.SetUIActive(false);
    this.GetText(21)?.ShowTextNew("ChangeMapBtn_Text");
    this.Vfc(false, false);
    this.M3o = this.OpenParam;
    this.iZa();
    this.BFo = this.GetItem(13).GetOwner().GetComponentByClass(UE.KuroWorldMapUIParams.StaticClass());
    ControllerHolder_1.ControllerHolder.LevelPlayReportController.RequestSimpleTrackReportAsync();
    this.Gfc = new WorldMapChangeGravityButtonItem_1.WorldMapChangeGravityButtonItem();
    await this.Gfc.CreateThenShowByActorAsync(this.GetButton(25).GetOwner());
    this.Gfc.SetFunction(this.Ffc);
    await this.j4o();
    await this.W3o.OnWorldMapBeforeStartAsync();
    this.X3o = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(18), () => new WorldMapSubMapItem_1.WorldMapSubMapItem());
    ModelManager_1.ModelManager.ExploreProgressModel.LoadLocalShowNoteIdMap();
    this.GetText(28).SetUIActive(ModelManager_1.ModelManager.WorldMapModel.EnableDebug);
  }
  iZa() {
    var t;
    var e;
    if (this.M3o) {
      if (this.M3o.MarkId && this.M3o.MapId === undefined) {
        e = this.M3o.MarkId;
        t = this.M3o.MarkType;
        e = ModelManager_1.ModelManager.MapModel.GetMarkMapConfigId(e, t);
        this.M3o.MapId = e;
      }
      if (this.M3o.MapId === undefined) {
        this.M3o.MapId = ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId;
      }
      this.$Ya = this.M3o.MapId;
    } else {
      this.$Ya = ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId;
    }
    if (this.$Ya === undefined || !ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this.$Ya)) {
      this.Sdl();
    }
    ModelManager_1.ModelManager.WorldMapModel.WorldMapId = this.$Ya;
  }
  Sdl() {
    var t = ModelManager_1.ModelManager.MapModel;
    var e = ConfigManager_1.ConfigManager.AreaConfig;
    let i = t.GetDungeonWorldMapConfigId(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    var s = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo;
    if (!ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(i) && t.LastHighLevelArea) {
      t = e.GetLevelOneAreaId(t.LastHighLevelArea);
      i = e.GetAreaInfo(t)?.MapConfigId ?? i;
    }
    this.$Ya = i;
    if (!ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(i)) {
      this.$Ya = MapDefine_1.BIG_WORLD_MAP_ID;
      MapLogger_1.MapLogger.Error(63, "[地图系统]->获取上一次大世界区域配置失败", ["MapId:", this.$Ya], ["lastBigSceneMiniMapInfo", s]);
    }
  }
  async j4o() {
    await Promise.all([ControllerHolder_1.ControllerHolder.ExploreProgressController.AllExploreProgressAsyncRequest(), ControllerHolder_1.ControllerHolder.LordGymController.LordGymInfoRequest(), ControllerHolder_1.ControllerHolder.TowerController.RefreshTower(), ControllerHolder_1.ControllerHolder.MingSuController.SendDarkCoastDeliveryRequestAsync()]);
    await Promise.all([this.Gkn(), this.Q4o(), this.X4o(), this.$4o(), this.rYs(), this.Y4o(), this.J4o(), this.cwu(), this.q7l()]);
    this.z4o();
  }
  async Gkn() {
    var t = ModelManager_1.ModelManager.MapModel.GetInstanceIdByWorldMapId(this.$Ya);
    let e = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(t);
    let i = ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity;
    if (this.M3o && this.M3o.MarkId) {
      e = ModelManager_1.ModelManager.MapModel.GetMarkMapConfigId(this.M3o.MarkId, this.M3o.MarkType);
      i = ModelManager_1.ModelManager.MapModel.GetMarkMapGravity(this.M3o.MarkId, this.M3o.MarkType);
    }
    var s = ModelManager_1.ModelManager.WorldMapModel.SetWorldMapSelectedGravity(e, i);
    this.v3o = new Map_1.BaseMap({
      InstanceId: t,
      MapType: 2,
      MapDefaultScale: this.MapScale,
      Gravity: s,
      ClickRange: this.BFo.MarkMenuRectSize
    });
    this.W3o = new MapLifeEventDispatcher_1.MapLifeEventDispatcher(this.v3o);
    await this.v3o.CreateThenShowByResourceIdAsync("UiItem_Map_Prefab", this.GetItem(9), true);
  }
  async Y4o() {
    this.NXs = new PowerCurrencyItem_1.PowerCurrencyItem();
    await this.NXs.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", this.GetItem(10).GetParentAsUIItem());
    this.NXs.ShowWithoutText(ItemDefines_1.EItemId.Power);
    this.NXs.SetButtonFunction(this.Ili);
    this.NXs.SetActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10017));
  }
  async rYs() {
    this.GetItem(10)?.SetUIActive(false);
    this.fea = new PowerCurrencyItem_1.PowerCurrencyItem();
    await this.fea.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", this.GetItem(10).GetParentAsUIItem());
    this.fea.ShowWithoutText(ItemDefines_1.EItemId.OverPower);
    this.fea.RefreshAddButtonActive();
    this.fea.SetActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10066));
  }
  async Q4o() {
    var t = this.GetItem(12);
    this.N3o = new HandleCursorBotton();
    await this.N3o.Initialize(t, this.F4o);
    this.N3o.SetCursorActive(true);
  }
  async X4o() {
    this.k3o = new ExploreItem();
    await this.k3o.Init(this.GetItem(15), this);
  }
  async $4o() {
    ModelManager_1.ModelManager.WorldMapModel.UpdateActivityListItemData();
    var t = this.GetItem(16);
    this.Fvd = new WorldMapPeriodicActivityItem_1.WorldMapPeriodicActivityItem();
    await this.Fvd.CreateThenShowByActorAsync(t.GetOwner());
    this.Fvd.Refresh(this.krh(), () => {
      this.u4o(() => {
        this.WorldMapUiEntity?.SecondaryUiComponent.ShowMapPeriodicActivityPanel(this.RootItem);
      });
    });
  }
  async J4o() {
    var t = this.OpenParam;
    this.Twl = t?.OpenFogId ?? 0;
    if (this.Twl > 0) {
      t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_MapUnlock", this.RootItem);
      this.H3o = t.GetComponentByClass(UE.UIItem.StaticClass());
      this.H3o.SetUIActive(false);
      this.Q3o = new LevelSequencePlayer_1.LevelSequencePlayer(this.H3o);
    }
  }
  async cwu() {
    var t = this.GetItem(29);
    this.uwu = new UnderseaOverviewItem_1.UnderseaOverviewItem();
    await this.uwu.Initialize(t, t => {
      t = this.v3o.GetMarkItem(0, t);
      if (t) {
        this.$lh();
        this.XYa(t.MarkId, t.MarkType, false, true);
      }
    });
  }
  z4o() {
    this.b3o = new LongPressButton_1.LongPressButton(this.GetButton(2), this.P4o);
    this.q3o = new LongPressButton_1.LongPressButton(this.GetButton(3), this.w4o);
  }
  e5o() {
    this.WorldMapUiEntity.PlayerComponent.PlayerRotation = 0;
    var t = this.GetItem(8).GetWidth() / this.RootItem.GetWidth();
    var e = this.GetItem(8).GetHeight() / this.RootItem.GetHeight();
    var i = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool();
    this.WorldMapUiEntity.MarkEdgeSize = new UE.Vector2D(i.X / 2 * t - MARKICON_HALFSIZE, i.Y / 2 * e - MARKICON_HALFSIZE);
    this.WorldMapUiEntity.OutOfViewPortSize = Vector2D_1.Vector2D.Create((i.X / 2 + VIEW_PORT_BUFFER_REGION) * t, (i.Y / 2 + VIEW_PORT_BUFFER_REGION) * e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MarkMenuClickItem, this.f4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenViewBegined, this.yhl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapPointerDrag, this.vKe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapFingerExpandClose, this.x4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapWheelAxisInput, this.x4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput, this.x4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapPointerUp, this.GFo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSecondaryUiClosed, this._4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSecondaryUiOpened, this.d4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapFocusPlayer, this._2l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapShowTrackList, this.m2l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMenuClickItem, this.C2l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GetAreaProgress, this.H4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnWorldMapTrackMarkItem, this.R4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateMapMark, this.I4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddMapMark, this.mdl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveMapMark, this.T4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap, this.e4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapFocalMarkItem, this.XYa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeWorldMap, this.eZa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ToggleShowCustomMark, this.r2l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ToggleShowCompletedPlayMark, this.o2l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigateMarkAndShowRange, this.s2l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap, this.A8l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapOpenFogChange, this.Vhl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapActivityListDataUpdate, this.Nvd);
    if (!Info_1.Info.IsBuildShipping) {
      InputDistributeController_1.InputDistributeController.BindKey(InputMappingsDefine_1.keyMappings.C, this.V61);
      Net_1.Net.Register(23224, this.F61);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MarkMenuClickItem, this.f4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenViewBegined, this.yhl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapPointerDrag, this.vKe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapFingerExpandClose, this.x4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapWheelAxisInput, this.x4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput, this.x4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapPointerUp, this.GFo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSecondaryUiClosed, this._4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSecondaryUiOpened, this.d4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapFocusPlayer, this._2l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapShowTrackList, this.m2l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMenuClickItem, this.C2l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GetAreaProgress, this.H4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnWorldMapTrackMarkItem, this.R4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateMapMark, this.I4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddMapMark, this.mdl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveMapMark, this.T4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap, this.e4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapFocalMarkItem, this.XYa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeWorldMap, this.eZa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ToggleShowCustomMark, this.r2l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ToggleShowCompletedPlayMark, this.o2l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigateMarkAndShowRange, this.s2l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap, this.A8l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapOpenFogChange, this.Vhl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapActivityListDataUpdate, this.Nvd);
    if (!Info_1.Info.IsBuildShipping) {
      InputDistributeController_1.InputDistributeController.UnBindKey(InputMappingsDefine_1.keyMappings.C, this.V61);
      Net_1.Net.UnRegister(23224);
    }
  }
  OnStart() {
    this.x3o = [];
    this.e2l = [];
    this.i5o();
    this.K3o = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(17));
    this.K3o.BindSequenceCloseEvent(this.Ceh);
    PowerController_1.PowerController.SendUpdatePowerRequest([ItemDefines_1.EItemId.Power, ItemDefines_1.EItemId.OverPower]);
  }
  OnBeforeShow() {
    this.e5o();
    this.WorldMapUiEntity.Init();
    this.WorldMapUiEntity.MultiFloorComponent.MultiMapFloorContainer = this.GetItem(19);
    this.c4o(true);
    this.H4o();
    this.Tka();
    this.Nfc();
    this.dwu();
    if (this.Twl > 0) {
      this.v3o.HandleFogAreaOpen(this.Twl);
    }
    this.W3o.OnWorldMapBeforeShow();
    this.WorldMapUiEntity.UpdateMarkItems();
    var t;
    var e = this.M3o;
    if (e) {
      if (t = this.v3o.GetMarkItem(e.MarkType, e.MarkId)) {
        MapHelper_1.MapHelper.CheckAndShowCrossMapTips(e.MarkId, e.MarkType, t.TrackAreaId, t.WorldPosition);
        this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(e.MarkId, e.MarkType, true, !e.IsNotFocusTween);
      }
      if (e.FocusExplorePlayPoint) {
        t = e.FocusExplorePlayPoint[0];
        e = e.FocusExplorePlayPoint[1];
        ModelManager_1.ModelManager.ExploreProgressModel.SetTrackExploreAreaItemData(t, e);
        ModelManager_1.ModelManager.ExploreProgressModel.CheckTrackExploreAreaItemData();
      }
      if (this.M3o?.SkipToExploreAreaDetailView) {
        t = this.M3o.SkipToExploreAreaDetailView[0];
        e = this.M3o.SkipToExploreAreaDetailView[1];
        this.OpenMapExploreAreaDetailView(t, e);
      }
    } else {
      this.WorldMapUiEntity.MultiFloorComponent.InitMultiMap();
    }
    this.rKl();
    this.tKl = this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening;
    if (!this.tKl) {
      this.M2l();
    }
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapViewOpened);
    this.M3o = undefined;
    this.W3o.OnWorldMapAfterShow();
    ModelManager_1.ModelManager.ExploreProgressModel.CheckTrackExploreAreaItemData();
  }
  OnAfterPlayStartSequence() {
    if (!this.tKl) {
      this.bQl();
    }
  }
  async bQl(t) {
    if (t) {
      await TimerSystem_1.GameplayTimerSystem.Wait(t);
    }
    if (!this.IsDestroyOrDestroying) {
      this.k7l();
      this.G7l();
    }
  }
  OnBeforeHide() {
    this.v3o.UnBindMapTileDelegate();
  }
  OnTick(t) {
    if (this.WorldMapUiEntity !== undefined && this.WorldMapUiEntity?.Map !== undefined) {
      this.WorldMapUiEntity.Tick(t);
      this.IJo();
      this.w3o ||= new Array();
      this.WorldMapUiEntity.InteractComponent.CheckTouch();
      this.WorldMapUiEntity.MoveComponent.TickMoveDirty();
      this.m4o();
    }
  }
  IJo() {
    if (!Info_1.Info.IsBuildShipping) {
      this.GetText(28).SetUIActive(ModelManager_1.ModelManager.WorldMapModel.EnableDebug);
    }
    if (ModelManager_1.ModelManager.WorldMapModel.EnableDebug) {
      var e = this.WorldMapUiEntity.Map.GetRootItem().GetAnchorOffset();
      var i = Vector2D_1.Vector2D.Create(0, 0);
      LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(UE.KuroStaticLibrary.GetViewPortMousePosition(), i);
      var s = ModelManager_1.ModelManager.WorldMapModel.MapScale;
      var e = Vector_1.Vector.Create((i.X - e.X) / s * MapDefine_1.UNIT, -(i.Y - e.Y) / s * MapDefine_1.UNIT, 0);
      ModelManager_1.ModelManager.WorldMapModel.LastWorldMapPointerWorldPosition = e;
      var s = this.WorldMapUiEntity.ClickedItem;
      let t = `地图调试信息(编辑器下默认打开)                    
输入GM EnableMapDebugMode#0 可关闭                    
地图Id:${ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId},重力:${ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity},副本Id:${ModelManager_1.ModelManager.CreatureModel.GetInstanceId()},一级区域Id:${MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId()}                    
指针Ui坐标(米): X:${i.X.toFixed(2)},Y:${i.Y.toFixed(2)}                    
指针世界坐标(厘米): X:${Math.floor(e.X)},Y:${Math.floor(e.Y)},Z:${Math.floor(e.Z)}                    `;
      if (s !== undefined) {
        i = MapDebugger_1.MapDebugger.DumpMarkItemForUi(this.v3o, s);
        t = `${t}
${i}`;
      }
      this.GetText(28).SetText(t);
    }
  }
  r5o() {
    if (Info_1.Info.IsInGamepad()) {
      var t;
      var e = this.N3o.GetRootItem().D_K2_GetComponentLocation();
      var i = this.v3o.MapRootItem.D_K2_GetComponentToWorld();
      var i = UE.KismetMathLibrary.D_InverseTransformLocation(i, e);
      this.B3o.Set(i.X, i.Y);
      this.G3o[0] = MAX_INT32_NUMBER;
      this.w3o.splice(0);
      var e = this.v3o.GetAllMarkItems();
      var s = e.size <= 1;
      for ([, t] of e) {
        for (var [, a] of t) {
          var [r, h] = this.y2l(this.B3o, Vector2D_1.Vector2D.Create(a.UiPosition.X, a.UiPosition.Y), s, true);
          var n = a.GetInteractiveFlag();
          if (r && n) {
            if (this.G3o[0] > h) {
              this.G3o[0] = h;
              this.G3o[1] = a;
            }
            this.w3o.push(a);
          }
        }
      }
      this.N3o.SetSelected(false);
    }
  }
  n5o(t = false) {
    if (Info_1.Info.IsInGamepad() && this.WorldMapUiEntity.InteractComponent.IsJoystickMoving && !this.WorldMapUiEntity.MoveComponent.IsDragMoveDisabled || t) {
      this.WorldMapUiEntity.MoveComponent.KillTweening();
      this.r5o();
    }
  }
  s5o() {
    if (Info_1.Info.IsInGamepad() && !this.WorldMapUiEntity.InteractComponent.IsJoystickMoving && !this.WorldMapUiEntity.InteractComponent.IsJoystickZoom) {
      if (this.WorldMapUiEntity.InteractComponent.IsJoystickFocus) {
        if (this.WorldMapUiEntity.MoveComponent.IsTweeningMove) {
          return;
        }
        this.WorldMapUiEntity.InteractComponent.SetJoystickFocus(false);
        this.r5o();
      }
      if (this.w3o.length > 0 && this.WorldMapUiEntity.ClickedItem === undefined) {
        this.N3o.SetSelected(true);
        this.WorldMapUiEntity.MoveComponent.SetMapPosition(this.G3o[1], true, 0, this.BFo.TweenTypeEase, this.BFo.GamePadTweenTime);
      }
    }
  }
  m4o(t = false) {
    this.n5o(t);
    this.s5o();
  }
  OnBeforeDestroy() {
    this.u4o();
    this.h5o();
    this.a5o();
    this.E2l();
    WorldMapController_1.WorldMapController.ClearFocalMarkItem();
    this.b3o.OnDestroy();
    this.q3o.OnDestroy();
    this.Q3o?.Clear();
    this.K3o?.Clear();
    this.w3o = undefined;
    this.NXs.Destroy();
    this.fea.Destroy();
    this.v3o.Destroy();
    this.N3o.Destroy();
    ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation.Reset();
    ModelManager_1.ModelManager.WorldMapModel.WorldMapId = undefined;
    ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId = undefined;
    ModelManager_1.ModelManager.MapModel.ClearPendingAddTempMapMarkList();
    ModelManager_1.ModelManager.LevelPlayReportModel.ResetDetailRequestFlag();
    ModelManager_1.ModelManager.ExploreProgressModel.WorldMapViewClose();
    ModelManager_1.ModelManager.ExploreProgressModel.SaveToLocalShowNoteIdMap();
  }
  async i2l(t) {
    await this.I2l(t);
    this.XYa(this.M3o.MarkId, this.M3o.MarkType, t.Focal ?? false, t.FocusTween ?? true, t.NeedTempShow);
  }
  async I2l(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapBeforeChangeMap);
    this.a5o();
    await this.WorldMapUiEntity.WorldMapAlterMapComponent.ChangeMapAsync(t.MapId, t.Gravity);
    this.M3o = {
      MarkId: t.MarkId,
      MarkType: t.MarkType,
      MapId: t.MapId
    };
    this.iZa();
    var t = this.GetItem(16);
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10055) && this.krh();
    t.SetUIActive(e);
    this.WorldMapUiEntity.UiParams = this.BFo;
    this.WorldMapUiEntity.OpenParams = this.M3o;
    this.WorldMapUiEntity.MapId = this.$Ya;
    this.c4o(true);
    this.H4o();
    this.M2l();
    this.Nfc();
    this.dwu();
    this.W3o.OnWorldMapBeforeShow();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapAfterChangeMap);
  }
  async c2l() {
    var t;
    var e = ModelManager_1.ModelManager.MapModel;
    var i = ConfigManager_1.ConfigManager.AreaConfig;
    let s = e.GetDungeonWorldMapConfigId(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    if (!ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(s) && e.LastHighLevelArea) {
      t = i.GetLevelOneAreaId(e.LastHighLevelArea);
      s = i.GetAreaInfo(t)?.MapConfigId ?? s;
    }
    i = e.CurrentPlayerGravity;
    await this.I2l({
      MapId: s,
      Gravity: i,
      MarkId: 0,
      MarkType: 0
    });
    this.u2l();
  }
  i5o() {
    this.WorldMapUiEntity = new WorldMapUiEntity_1.WorldMapUiEntity();
    this.WorldMapUiEntity.Map = this.v3o;
    this.WorldMapUiEntity.UiParams = this.BFo;
    this.WorldMapUiEntity.OpenParams = this.M3o;
    this.WorldMapUiEntity.MapId = this.$Ya;
    this.WorldMapUiEntity.RegisterComponents();
    this.WorldMapUiEntity.ScaleComponent.ScaleSlider = this.GetSlider(1);
    this.WorldMapUiEntity.MultiFloorComponent.MultiMapFloorLayout = this.X3o;
    var t = async (t, e) => {
      await this.PlaySequenceAsync(t, e);
    };
    this.WorldMapUiEntity.MultiFloorComponent.WorldMapViewPlaySequenceFunction = t;
    this.WorldMapUiEntity.WorldMapAlterMapComponent.WorldMapViewPlaySequenceFunction = t;
    this.WorldMapUiEntity.WorldMapAlterMapComponent.InverTowerCtrlRoot = this.GetItem(27);
    this.WorldMapUiEntity.WorldMapAlterMapComponent.InverTowerCtrlRoot.SetUIActive(false);
  }
  h5o() {
    this.WorldMapUiEntity.Dispose();
    this.WorldMapUiEntity = undefined;
  }
  get MapScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale;
  }
  M4o(t, e = 1) {
    if (Info_1.Info.IsInGamepad()) {
      this.WorldMapUiEntity.MoveComponent.PushMap(t, true, 0);
    } else {
      this.WorldMapUiEntity.MoveComponent.PushMap(t, true, 1);
    }
    this.WorldMapUiEntity.SecondaryUiComponent.ShowPanel(t, this.RootItem, e);
  }
  rKl() {
    let t = false;
    for (const e of this.Shl) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        t = true;
        break;
      }
    }
    this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen = t;
  }
  u4o(t, e = true) {
    if (this.WorldMapUiEntity.ClickedItem && this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow) {
      this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = false;
      this.WorldMapUiEntity.ClickedItem.SetSelected(false);
      this.WorldMapUiEntity.UpdateSingleMarkItem(this.WorldMapUiEntity.ClickedItem, true);
    }
    if (this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen) {
      this.Shl.forEach(t => {
        if (UiManager_1.UiManager.IsViewOpen(t)) {
          UiManager_1.UiManager.CloseView(t);
        }
      });
    }
    if (this.WorldMapUiEntity.SecondaryUiComponent.IsInternalSecondaryUiOpen()) {
      this.WorldMapUiEntity.MultiFloorComponent.UpdateMultiMap();
      this.WorldMapUiEntity.SecondaryUiComponent.CloseUi(t, e);
    } else if (t) {
      t();
    }
  }
  C4o(t, e, i) {
    return this.y2l(t, Vector2D_1.Vector2D.Create(e?.GetAnchorOffset()), i);
  }
  y2l(t, e, i, s) {
    t = Vector2D_1.Vector2D.Distance(t, e);
    let a = i ? WorldMapDefine_1.MARK_CLICK_RANGE : this.BFo.MarkMenuRectSize;
    if (s) {
      a *= ModelManager_1.ModelManager.WorldMapModel.JoystickClickMultiplier;
    }
    return [t * this.MapScale <= a, t];
  }
  g4o(t) {
    if (this.WorldMapUiEntity.MoveComponent.IsTweeningMove) {
      this.WorldMapUiEntity.MoveComponent.KillTweening();
    }
    WorldMapController_1.WorldMapController.ClearFocalMarkItem();
    if (this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening) {
      this.z3o = false;
      this.WorldMapUiEntity.UpdateMarkItems();
      this.u4o();
    } else if (ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) === ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WorldMapTagFull");
    } else if (ModelManager_1.ModelManager.WorldMapModel.CustomMarksIsShow && !ModelManager_1.ModelManager.WorldMapModel.EnableInstanceDungeonFilterMark) {
      this.WorldMapUiEntity.ClickedItem = this._5o(t);
      if (this.WorldMapUiEntity.ClickedItem) {
        this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = true;
        this.WorldMapUiEntity.ClickedItem.IsCanShowView = true;
        this.M4o(this.WorldMapUiEntity.ClickedItem, 0);
      }
      AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_spl_map_click_com");
    }
  }
  _5o(t) {
    var e = undefined;
    var i = t.X;
    var s = t.Y;
    var i = MapController_1.MapController.GetNewCustomMarkPosition(i, -s);
    var s = new MapDefine_1.DynamicMarkCreateInfo({
      MarkId: 1,
      TrackTarget: i,
      MarkConfigId: 1,
      MarkType: 9,
      MapAndDungeonInfo: {
        MapConfigId: this.$Ya
      }
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 63, "[CustomMarkItem Debug]WorldMapView.CreateNewCustomMarkItem->", ["position", t], ["info", s]);
    }
    (e = this.v3o.CreateCustomMark(s))?.SetIsNew(true);
    return e;
  }
  v4o(t) {
    let e = this.j3o.get(t);
    if (!e) {
      e = new LevelSequencePlayer_1.LevelSequencePlayer(t);
      this.j3o.set(t, e);
    }
    return e;
  }
  p4o(t, e) {
    if (this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening) {
      this.z3o = true;
    }
    this.u4o(() => {
      this.E4o(t, e);
      AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_spl_map_click_com");
    });
    WorldMapController_1.WorldMapController.ClearFocalMarkItem();
  }
  OpenMapExploreAreaDetailView(t, e) {
    UiManager_1.UiManager.OpenView("MapExploreDetailView", {
      AreaId: t,
      ExploreType: e
    }, (t, e) => {
      if (t) {
        UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(e);
      }
    });
  }
  async a2l(t, e, i) {
    await this.I2l({
      MarkId: e.MarkId,
      MarkType: e.MarkType,
      MapId: t,
      Focal: false,
      FocusTween: e.FocusTween ?? true,
      Gravity: i
    });
    await this.l2l(e);
  }
  async l2l(t) {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(t.MarkId);
    let i = undefined;
    if (e) {
      if (!ModelManager_1.ModelManager.MapModel.IsMarkFogUnlock(t.MarkId)) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MapAreaIsLock");
        return;
      }
      var s = ModelManager_1.ModelManager.MapModel.GetConfigMarkTrackTarget(t.MarkId);
      i = MapUtil_1.MapUtil.GetTrackUiPositionByTrackTargetConfig(s, e.RelativeDungeonId);
    } else {
      s = ModelManager_1.ModelManager.MapModel.GetMark(t.MarkType, t.MarkId);
      if (s === undefined) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MapAreaIsLock");
        return;
      }
      i = MapUtil_1.MapUtil.GetTrackUiPositionByTrackTargetConfig(s.TrackTarget, s.InstanceDungeonId ?? s.MapId);
    }
    var e = this.v3o.GetMarkItem(t.MarkType, t.MarkId);
    var s = t.FocusTween ?? true;
    var a = Vector2D_1.Vector2D.Create(i);
    if (e) {
      this.WorldMapUiEntity.MoveComponent.PushMap(e, s);
    } else {
      this.WorldMapUiEntity.MoveComponent.PushMapByUiPosition(i, s);
    }
    await this.WorldMapUiEntity?.Map?.MapRangePanel.SetRangeComponentShow(a, t.Width, t.Height);
    if (t.Tips) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t.Tips);
    }
  }
  U4o(t, e) {
    var i = this.v3o.GetMarkItem(t, e);
    if (i) {
      if (i.GetIsStrictConfigMark()) {
        var s;
        var a = i;
        if (!a.IsFogUnlock) {
          s = a.MarkConfig.FogHide;
          s = ConfigManager_1.ConfigManager.WorldMapConfig.GetMapFogConfig(s);
          this.u7c(s?.UnlockCondition ?? 0);
          return;
        }
        if (!a.IsConditionShouldShow && !i.MarkItemEntity.IsTempMapMark) {
          if (a.MarkType !== 29 && a.MarkType !== 28) {
            this.u7c(a.MarkConfig.ShowCondition);
            return;
          }
          if (!a.IsConditionShouldShowWithoutServerState && !i.MarkItemEntity.IsTempMapMark) {
            this.u7c(a.MarkConfig.ShowCondition);
            return;
          }
        }
      }
      i.IsCanShowView = true;
      i.IsIgnoreScaleShow = true;
      if (i.GetInteractiveFlag()) {
        this.viu(i, true);
      }
    } else {
      MapLogger_1.MapLogger.Error(63, "申请了不存在的地图标记", ["地图标记类型:", t], ["地图标记Id", e]);
    }
  }
  u7c(t) {
    if (!(t <= 0) && (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetConditionGroup(t)?.HintText) && !StringUtils_1.StringUtils.IsEmpty(t)) {
      t = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(t);
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("UnlockCondition", t);
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MapAreaIsLock");
    }
  }
  M2l() {
    this.T2l();
    this.L2l();
    if (ModelManager_1.ModelManager.AreaModel.IsExistRecommendPlayPoint()) {
      this.n2l();
      this.U2l();
      this.SKl(true);
    } else {
      this.o5o();
      this.LQl(false);
    }
  }
  LQl(t) {
    this.GetButton(22)?.RootUIComp.SetUIActive(t);
  }
  SKl(t) {
    this.GetButton(22)?.RootUIComp.GetParentAsUIItem()?.SetUIActive(t);
  }
  U2l() {
    var t = this.A2l();
    var e = ModelManager_1.ModelManager.ExploreProgressModel.GetLocalShowNoteIdMap();
    let i = false;
    let s = false;
    let a = false;
    for (const h of t) {
      var r = h();
      if (r && this.D2l(r.MapNoteConfig) && (i = true, e.has(r.MapNoteConfig.Id) || (a = true), r.MapNoteConfig.Style === 1)) {
        s = true;
        break;
      }
    }
    this.Vfc(s, a);
    this.LQl(i);
  }
  Vfc(t, e) {
    this.GetItem(26)?.SetUIActive(t);
    this.jfc(!t && e);
  }
  A2l() {
    return [this.q4o, this.G4o, this.k4o, this.N4o, this.O4o, this.uql, this.bsa, this.NB1, this.H3u, this.yKa, this.PQl, this.B$d];
  }
  D2l(t) {
    t = t.ConditionId;
    return t === 0 || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(t.toString(), undefined);
  }
  jfc(t) {
    if (this.qfc !== t) {
      this.qfc = t;
      this.GetItem(24)?.SetUIActive(t);
    }
  }
  n2l() {
    var t = this.k3o?.ExploreData;
    this.O7l(t?.GetShowRecommendExploreItemDataList());
  }
  O7l(t) {
    t?.forEach((t, e) => {
      t.LogInfo();
      let i = this.e2l[e];
      if (i) {
        i.UpdateAreaItemData(t);
      } else {
        e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(23), this.GetItem(11));
        (i = new WorldMapPlayPointItem_1.WorldMapPlayPointItem()).Init(e, t);
        this.e2l.push(i);
      }
    });
  }
  async G7l() {
    if (this.e2l?.length) {
      this.k3o?.ExploreData?.SaveLocalAreaExplorePlayState();
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
  async q7l() {
    var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
    if (t) {
      await ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t)?.CheckUpdatePlayPointData();
    }
    var e = this.M3o?.FocusExplorePlayPoint?.[0];
    if (e && e !== t) {
      await ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e)?.CheckUpdatePlayPointData();
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
    this.x3o?.forEach(t => {
      t.PlayStartToPause();
    });
  }
  F7l() {
    var t = this.k3o?.ExploreData?.GetLocalFinishRecommendExploreItems();
    if (t?.length) {
      this.O7l(t);
      this.N7l();
    }
  }
  async k7l() {
    if (this.x3o?.length && this.e2l?.length) {
      this.k3o?.ExploreData?.ClearLocalAreaExplorePlayState();
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
      e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(14), this.GetItem(11));
      e = new WorldMapNoteItem_1.WorldMapNoteItem(e);
      this.x3o.push(e);
      e.UpdateNoteItem(t.MapNoteId, t.ClickCallBack, t.MapMarkId);
    }
  }
  a5o() {
    for (const t of this.x3o) {
      t.Destroy();
    }
    this.x3o.length = 0;
  }
  E2l() {
    for (const t of this.e2l) {
      t.Destroy();
    }
    this.e2l.length = 0;
  }
  c4o(t) {
    if (t !== this.P3o) {
      this.P3o = t;
      this.GetItem(11).SetUIActive(t);
    }
  }
  d2l() {
    var t = this.v3o.GetTrackMenuMarkList();
    const e = [];
    if (this.WorldMapUiEntity?.IsInPlayerMap) {
      e.push({
        IsPlayerSelf: true,
        Icon: ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_WorldMapPlayer1"),
        Title: ModelManager_1.ModelManager.FunctionModel.GetPlayerName()
      });
    }
    t.forEach(t => {
      e.push({
        Icon: t.IconPath,
        StateIcon: t.GetStateIconPath(),
        MarkItem: t
      });
    });
    return e;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    let e = undefined;
    if (t[0] === "PanelIndex") {
      var i = Number(t[1]);
      e = this.WorldMapUiEntity.SecondaryUiComponent.GetSecondaryPanelGuideFocusUiItem(i);
    } else {
      i = Number(t[0]);
      t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(i)?.ObjectType;
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "聚焦引导的额外参数配置有误, 找不到地图标记", ["markId", i]);
        }
        return;
      }
      const s = this.v3o.GetMarkItem(t, i);
      this.WorldMapUiEntity.MoveComponent.SetMapPosition(s, true, 1, undefined, undefined, true, true);
      if ((e = s?.View?.GetIconItem()) === undefined) {
        return;
      }
      e.GetOwner().AddComponentByClass(UE.UIButtonComponent.StaticClass(), false, new UE.Transform(), false).OnClickCallBack.Bind(() => {
        this.f4o(s);
      });
    }
    if (e !== undefined) {
      return [e, e];
    }
  }
  Tka() {
    if (!LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HasCleanInvalidCustomMark, false)) {
      var t = this.v3o.GetMarkItemsByType(9, false);
      if (t) {
        var e = [];
        for (const i of t.values()) {
          if (!this.v3o.InValidMapTile(i.WorldPosition)) {
            e.push(i.MarkId);
          }
        }
        if (e.length > 0) {
          MapController_1.MapController.RequestRemoveMapMarks(9, e);
        }
      }
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HasCleanInvalidCustomMark, true);
    }
  }
  $lh() {
    this.WorldMapUiEntity.InteractComponent.SetJoystickFocus(false);
    this.w3o.splice(0);
  }
  Nfc() {
    var t;
    var e = this.WorldMapUiEntity.WorldMapAlterMapComponent.CanChangeMapGravity;
    this.Gfc.SetUiActive(e);
    if (e) {
      t = ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity === 1;
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t ? "SP_BtnOverviewBDown" : "SP_BtnOverviewB");
      this.Gfc.SetSprite(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateGravityBtn, e);
  }
  dwu() {
    var t = ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas()?.get(CommonParamById_1.configCommonParamById.GetIntConfig("UnderseaOverviewUnlockAreaId")) ?? false;
    this.GetItem(29).SetUIActive(ModelManager_1.ModelManager.WorldMapModel.IsNeedCustomizedThumbnail(this.v3o.MapId) && t);
  }
  j61() {
    var t;
    if (ModelManager_1.ModelManager.WorldMapModel.EnableDebug && (t = ModelManager_1.ModelManager.WorldMapModel.LastWorldMapPointerWorldPosition)) {
      UE.LGUIBPLibrary.ClipBoardCopy(`${Math.floor(t.X)},${Math.floor(t.Y)},${Math.floor(t.Z)},${ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId}`);
    }
  }
}
exports.WorldMapView = WorldMapView;
class ExploreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.ExploreData = undefined;
    this.AreaId = 0;
    this.ParentView = undefined;
    this.eTt = () => {
      if (this.ExploreData) {
        this.ParentView?.OpenMapExploreAreaDetailView(this.AreaId);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "ExploreItem Click, ExploreData is null");
      }
    };
  }
  async Init(t, e) {
    await this.CreateThenShowByActorAsync(t.GetOwner());
    this.GetText(2)?.SetRichText(true);
    this.ParentView = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  Update(t) {
    this.AreaId = t;
    var e = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t);
    var t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title);
    var t = e?.GetProgress() ?? 0;
    let i = t + "%";
    if (e?.IsReachMaxProgress) {
      i = StringUtils_1.StringUtils.Format("<color=#ffd12f>{0}%</color>", t.toString());
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Text_ExploreRate", i);
    this.ExploreData = e;
    this.GetItem(3).SetUIActive(!e?.IsReachMaxProgress);
    if (!e?.IsReachMaxProgress) {
      t = e?.GetNextStageNeedProgress() ?? 0;
      e = e?.GetStageProgress() ?? 0;
      this.GetText(4).SetText(t + "%");
      this.GetSprite(5).SetFillAmount(e);
    }
  }
  OnBeforeShow() {
    this.K8e();
  }
  OnBeforeHide() {
    this.Ovt();
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot("MapAreaExplore", this.GetItem(6));
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindRedDot("MapAreaExplore");
  }
}
class HandleCursorBotton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.d5o = false;
    this.e0t = undefined;
    this.C5o = undefined;
  }
  async Initialize(t, e) {
    this.C5o = e;
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    this.RootItem?.SetRaycastTarget(false);
    this.e0t = this.GetRootActor().GetComponentByClass(UE.UIButtonComponent.StaticClass());
    this.e0t.OnClickCallBack.Bind(this.C5o);
  }
  OnBeforeDestroy() {
    this.e0t.OnClickCallBack.Unbind();
  }
  SetSelected(t) {
    if (Info_1.Info.IsInGamepad() && this.d5o !== t) {
      if (this.d5o = t) {
        this.e0t.SetSelectionState(1);
      } else {
        this.e0t.SetSelectionState(0);
      }
    }
  }
  SetCursorActive(t) {
    if (Info_1.Info.IsInGamepad() && t) {
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
//# sourceMappingURL=WorldMapView.js.map