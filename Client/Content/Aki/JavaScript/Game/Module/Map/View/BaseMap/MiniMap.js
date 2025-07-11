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
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleUiDefine_1 = require("../../../BattleUi/BattleUiDefine");
const TaskMarkItem_1 = require("../../Marks/MarkItem/TaskMarkItem");
const TaskMarkItemView_1 = require("../../Marks/MarkItemView/TaskMarkItemView");
const MapRangePanel_1 = require("../SubView/MapRangePanel");
const MapMarkMgr_1 = require("./Assistant/MapMarkMgr");
const MapSoundBoxSfxMgr_1 = require("./Assistant/MapSoundBoxSfxMgr");
const MapTileMgr_1 = require("./Assistant/MapTileMgr");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
class MiniMap extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s = 1, a) {
    super();
    this.MapType = 1;
    this.Z3_ = 0;
    this.e4_ = 0;
    this.CAi = undefined;
    this.gAi = undefined;
    this.ODl = undefined;
    this.fAi = undefined;
    this.dAi = 1;
    this.lUi = 1;
    this.Lfc = undefined;
    this.MAi = () => {
      this.gAi.OnMapSetUp();
      this.gAi.LoadMapBorder();
      this.CAi.OnMapSetup();
      this.RootItem.SetUIActive(true);
    };
    this.MapType = e;
    this.e4_ = t;
    this.Z3_ = ModelManager_1.ModelManager.MapModel.GetDungeonMapConfigId(t);
    this.dAi = i;
    this.lUi = s;
    this.fAi = a;
  }
  get MapId() {
    return this.Z3_;
  }
  set MapId(e) {
    this.Z3_ = e;
  }
  get InstanceDungeonId() {
    return this.e4_;
  }
  set InstanceDungeonId(e) {
    this.e4_ = e;
  }
  get MapGravity() {
    return ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity;
  }
  OnBeforeDestroy() {
    this.UnBindEvents();
    this.CAi?.Dispose();
    this.CAi = undefined;
    this.gAi?.Dispose();
    this.gAi = undefined;
    this.ODl = undefined;
    this.Lfc?.Destroy();
    this.Lfc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UITexture], [1, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UITexture]];
  }
  OnStart() {
    this.SetMapScale(this.dAi);
    this.F$t(this.lUi);
    this.yWe();
    this.RootItem.SetUIActive(false);
    this.RootItem.SetHierarchyIndex(0);
    this.Lfc = new MapRangePanel_1.MapRangePanel(this);
    this.Lfc.CheckExploreMarkRangeInfo();
  }
  F$t(e) {
    var t = this.GetItem(0);
    var i = this.GetItem(1);
    let s = this.GetTexture(2);
    var a = this.GetItem(3);
    var n = this.GetTexture(4);
    s.SetUIActive(false);
    if (MiniMap.MapMaterialVersion === 2) {
      (s = this.GetTexture(6)).SetUIActive(false);
    }
    var r = this.GetItem(5);
    var t = {
      MapType: this.MapType,
      MapId: this.MapId,
      InstanceDungeonId: this.InstanceDungeonId,
      MarkContainer: t,
      MarkScale: e
    };
    this.CAi = new MapMarkMgr_1.MapMarkMgr(t);
    this.CAi.Initialize();
    var e = {
      MapRootItem: this.RootItem,
      TileContainer: i,
      TileTexture: s,
      SubMapContainer: a,
      SubMapTexture: n,
      MapType: this.MapType,
      MapId: this.MapId,
      InstanceDungeonId: this.InstanceDungeonId,
      MapVersion: MiniMap.MapMaterialVersion,
      PreloadTiles: this.fAi,
      SubMapMask: r
    };
    this.gAi = new MapTileMgr_1.MapTileMgr(e);
    this.gAi.Initialize();
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
  MiniMapUpdateMarkItems(a, n, r) {
    this.CAi.UpdateNearbyMarkItem(r, t => {
      t.LogicUpdate(r);
      t.IsInAoiRange = true;
      t.ViewUpdateAsync(r);
      this.ODl.OnMarkItemBecomeVisible(t, r);
      var e = t.UiPosition;
      if (e) {
        const i = Vector2D_1.Vector2D.Create(e.X, e.Y);
        if (t.CanOutOfBound) {
          const s = Vector2D_1.Vector2D.Create();
          i.Multiply(n, s).Addition(a, s);
          let e = false;
          if (t instanceof TaskMarkItem_1.TaskMarkItem && t.View instanceof TaskMarkItemView_1.TaskMarkItemView) {
            e = t.View.IsRangeImageActive() ?? false;
          }
          if (s.Size() > BattleUiDefine_1.CLAMP_RANGE && !e) {
            s.DivisionEqual(s.Size()).MultiplyEqual(BattleUiDefine_1.CLAMP_RANGE).SubtractionEqual(a).DivisionEqual(n);
            t.GetRootItemAsync().then(e => {
              if (e?.IsValid()) {
                e.SetAnchorOffset(s.ToUeVector2D(true));
              }
            });
          } else {
            t.GetRootItemAsync().then(e => {
              if (e?.IsValid()) {
                e.SetAnchorOffset(i.ToUeVector2D(true));
              }
            });
          }
        } else {
          t.GetRootItemAsync().then(e => {
            if (e?.IsValid()) {
              e.SetAnchorOffset(i.ToUeVector2D(true));
            }
          });
        }
      }
    }, e => {
      e.IsInAoiRange = false;
      e.LogicUpdate(r);
      e.ViewUpdateAsync(r);
      this.ODl.OnMarkItemBecomeInvisible(e);
    });
    this.Lfc.MiniMapUpdate();
  }
  Tick() {
    this.CAi?.Tick();
  }
  UpdateMinimapTiles(e) {
    this.gAi.UpdateMinimapTiles(e);
  }
  SetMapScale(e) {
    this.RootItem.D_SetWorldScale3D(new UE.VectorDouble(e, e, e));
  }
  GetMarkItem(e, t) {
    return this.CAi.GetMarkItem(e, t);
  }
  async ChangeMapAsync(e) {
    if (this.MapId !== e) {
      e = ModelManager_1.ModelManager.MapModel.GetInstanceIdByWorldMapId(e);
      this.InstanceDungeonId = e;
      this.Z3_ = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(e);
      e = new UiAsyncTask_1.UiAsyncTask("Map.ChangeMapAsync", async () => {
        if (!this.WaitToDestroy) {
          this.Lfc?.Destroy();
          this.Lfc = new MapRangePanel_1.MapRangePanel(this);
          await this.gAi.OnChangeTilesAsync(this.Z3_, this.e4_, this.MapGravity);
          this.Lfc.CheckExploreMarkRangeInfo();
          this.CAi.OnChangeWorldMap(this.Z3_, this.e4_, this.MapGravity);
        }
      });
      await this.RunAsyncTask(e);
    }
  }
}
(exports.MiniMap = MiniMap).MapMaterialVersion = 2;
//# sourceMappingURL=MiniMap.js.map