"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniMap = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const AutoPilotLine_1 = require("../../../AutoPilot/AutoPilotLine");
const BattleUiDefine_1 = require("../../../BattleUi/BattleUiDefine");
const TaskMarkItem_1 = require("../../Marks/MarkItem/TaskMarkItem");
const TaskMarkItemView_1 = require("../../Marks/MarkItemView/TaskMarkItemView");
const MapRangePanel_1 = require("../SubView/MapRangePanel");
const MapMarkMgr_1 = require("./Assistant/MapMarkMgr");
const MapRoadWaysMgr_1 = require("./Assistant/MapRoadWaysMgr");
const MapSoundBoxSfxMgr_1 = require("./Assistant/MapSoundBoxSfxMgr");
const MapTileMgr_1 = require("./Assistant/MapTileMgr");
class MiniMap extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, e, s = 1, a) {
    super();
    this.MapType = 1;
    this.Z3_ = 0;
    this.e4_ = 0;
    this.CAi = undefined;
    this.MapTileMgr = undefined;
    this.ODl = undefined;
    this.fAi = undefined;
    this.dAi = 1;
    this.lUi = 1;
    this.Lfc = undefined;
    this.Y6m = undefined;
    this.d5f = undefined;
    this.MAi = () => {
      this.MapTileMgr.OnMapSetUp();
      this.MapTileMgr.LoadMapBorder();
      this.CAi.OnMapSetup();
      this.d5f?.OnMapSetup();
      this.RootItem.SetUIActive(true);
    };
    this.MapType = t;
    this.e4_ = i;
    this.Z3_ = ModelManager_1.ModelManager.MapModel.GetDungeonMapConfigId(i);
    this.dAi = e;
    this.lUi = s;
    this.fAi = a;
  }
  get MapId() {
    return this.Z3_;
  }
  set MapId(t) {
    this.Z3_ = t;
  }
  get InstanceDungeonId() {
    return this.e4_;
  }
  set InstanceDungeonId(t) {
    this.e4_ = t;
  }
  get MapGravity() {
    return ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity;
  }
  OnBeforeDestroy() {
    this.UnBindEvents();
    this.CAi?.Dispose();
    this.CAi = undefined;
    this.MapTileMgr?.Dispose();
    this.MapTileMgr = undefined;
    this.ODl = undefined;
    this.Lfc?.Destroy();
    this.Lfc = undefined;
    this.Y6m?.Destroy();
    this.Y6m = undefined;
    this.d5f?.Dispose();
    this.d5f = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UITexture], [1, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIItem]];
  }
  OnStart() {
    this.SetMapScale(this.dAi);
    this.F$t(this.lUi);
    this.yWe();
    this.RootItem.SetUIActive(false);
    this.RootItem.SetHierarchyIndex(0);
    this.Lfc = new MapRangePanel_1.MapRangePanel(this);
    this.Lfc.CheckExploreMarkRangeInfo();
    this.Y6m = new AutoPilotLine_1.AutoPilotLine(this);
    this.Y6m?.CheckAutoPilotLineInfo();
    this.d5f = new MapRoadWaysMgr_1.MapRoadWaysMgr({
      MapId: this.MapId,
      Container: this.GetItem(7)
    });
  }
  F$t(t) {
    var i = this.GetItem(0);
    var e = this.GetItem(1);
    let s = this.GetTexture(2);
    var a = this.GetItem(3);
    var n = this.GetTexture(4);
    s.SetUIActive(false);
    if (MiniMap.MapMaterialVersion === 2) {
      (s = this.GetTexture(6)).SetUIActive(false);
    }
    var h = this.GetItem(5);
    var i = {
      MapType: this.MapType,
      MapId: this.MapId,
      InstanceDungeonId: this.InstanceDungeonId,
      MarkContainer: i,
      MarkScale: t
    };
    this.CAi = new MapMarkMgr_1.MapMarkMgr(i);
    this.CAi.Initialize();
    var t = {
      MapRootItem: this.RootItem,
      TileContainer: e,
      TileTexture: s,
      SubMapContainer: a,
      SubMapTexture: n,
      MapType: this.MapType,
      MapId: this.MapId,
      InstanceDungeonId: this.InstanceDungeonId,
      MapVersion: MiniMap.MapMaterialVersion,
      PreloadTiles: this.fAi,
      SubMapMask: h
    };
    this.MapTileMgr = new MapTileMgr_1.MapTileMgr(t);
    this.MapTileMgr.Initialize();
    this.ODl = new MapSoundBoxSfxMgr_1.MapSoundBoxSfxMgr();
  }
  yWe() {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      this.MAi();
    } else {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.MAi);
    }
  }
  UnBindEvents() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.MAi)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.MAi);
    }
  }
  MiniMapUpdateMarkItems(a, n, h) {
    this.CAi.UpdateNearbyMarkItem(h, i => {
      i.LogicUpdate(h);
      i.IsInAoiRange = true;
      i.ViewUpdateAsync(h);
      this.ODl.OnMarkItemBecomeVisible(i, h);
      var t = i.UiPosition;
      if (t) {
        const e = Vector2D_1.Vector2D.Create(t.X, t.Y);
        if (i.CanOutOfBound) {
          const s = Vector2D_1.Vector2D.Create();
          e.Multiply(n, s).Addition(a, s);
          let t = false;
          if (i instanceof TaskMarkItem_1.TaskMarkItem && i.View instanceof TaskMarkItemView_1.TaskMarkItemView) {
            t = i.View.IsRangeImageActive() ?? false;
          }
          if (s.Size() > BattleUiDefine_1.CLAMP_RANGE && !t) {
            s.DivisionEqual(s.Size()).MultiplyEqual(BattleUiDefine_1.CLAMP_RANGE).SubtractionEqual(a).DivisionEqual(n);
            i.GetRootItemAsync().then(t => {
              if (t?.IsValid() && i.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(0)) {
                t.SetAnchorOffset(s.ToUeVector2D(true));
              }
            });
          } else {
            i.GetRootItemAsync().then(t => {
              if (t?.IsValid() && i.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(0)) {
                t.SetAnchorOffset(e.ToUeVector2D(true));
              }
            });
          }
        } else {
          i.GetRootItemAsync().then(t => {
            if (t?.IsValid() && i.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(0)) {
              t.SetAnchorOffset(e.ToUeVector2D(true));
            }
          });
        }
      }
    }, t => {
      t.IsInAoiRange = false;
      t.LogicUpdate(h);
      t.ViewUpdateAsync(h);
      this.ODl.OnMarkItemBecomeInvisible(t);
    });
    this.Lfc.MiniMapUpdate();
  }
  Tick() {
    this.CAi?.Tick();
    this.Y6m?.OnMiniMapTick();
  }
  UpdateMinimapTiles(t) {
    this.MapTileMgr.UpdateMinimapTiles(t);
  }
  SetMapScale(t) {
    this.RootItem.D_SetWorldScale3D(new UE.VectorDouble(t, t, t));
  }
  GetMarkItem(t, i) {
    return this.CAi.GetMarkItem(t, i);
  }
  async ChangeMapAsync(t) {
    if (this.MapId !== t) {
      t = ModelManager_1.ModelManager.MapModel.GetInstanceIdByWorldMapId(t);
      this.InstanceDungeonId = t;
      this.Z3_ = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(t);
      t = new UiAsyncTask_1.UiAsyncTask("Map.ChangeMapAsync", async () => {
        if (!this.WaitToDestroy) {
          this.Lfc?.Destroy();
          this.Lfc = new MapRangePanel_1.MapRangePanel(this);
          this.Y6m?.Destroy();
          this.Y6m = new AutoPilotLine_1.AutoPilotLine(this);
          await this.MapTileMgr.OnChangeTilesAsync(this.Z3_, this.e4_, this.MapGravity);
          this.Lfc.CheckExploreMarkRangeInfo();
          this.Y6m?.CheckAutoPilotLineInfo();
          this.CAi.OnChangeWorldMap(this.Z3_, this.e4_, this.MapGravity);
          this.d5f?.OnChangeWorldMap(this.Z3_);
        }
      });
      await this.RunAsyncTask(t);
    }
  }
}
(exports.MiniMap = MiniMap).MapMaterialVersion = 2;
//# sourceMappingURL=MiniMap.js.map