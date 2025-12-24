"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMap = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const AutoPilotLine_1 = require("../../../AutoPilot/AutoPilotLine");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const MarkGravityReverseIconComponent_1 = require("../../Marks/MarkItemView/Components/MarkGravityReverseIconComponent");
const MapLogger_1 = require("../../Misc/MapLogger");
const MapRangePanel_1 = require("../SubView/MapRangePanel");
const MapMarkMgr_1 = require("./Assistant/MapMarkMgr");
const MapRoadWaysMgr_1 = require("./Assistant/MapRoadWaysMgr");
const MapTileMgr_1 = require("./Assistant/MapTileMgr");
class BaseMap extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.SelfPlayerNode = undefined;
    this.PlayerArrow = undefined;
    this.PlayerOutOfBoundIndicator = undefined;
    this.MapType = 2;
    this.dAi = 1;
    this.lUi = 1;
    this.CAi = undefined;
    this.MapTileMgr = undefined;
    this.fAi = undefined;
    this.pAi = 100;
    this.vAi = undefined;
    this.C1a = false;
    this.Z3_ = 0;
    this.e4_ = 0;
    this.bfc = undefined;
    this.X6m = undefined;
    this.kGc = undefined;
    this.uBc = undefined;
    this.d5f = undefined;
    this.MAi = () => {
      this.MapTileMgr.OnMapSetUp();
      this.MapTileMgr.LoadMapBorder();
      this.CAi.OnMapSetup();
      this.d5f?.OnMapSetup();
      this.RootItem.SetUIActive(true);
    };
    this.e4_ = t.InstanceId;
    this.Z3_ = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(t.InstanceId);
    this.MapType = t.MapType;
    this.dAi = t.MapDefaultScale;
    this.lUi = t.MarkScale ?? 1;
    this.pAi = t.ClickRange ?? 100;
    this.fAi = t.PreloadTiles;
    this.kGc = t.Gravity ?? 1;
  }
  get MapId() {
    return this.Z3_;
  }
  get InstanceDungeonId() {
    return this.e4_;
  }
  get MapRangePanel() {
    return this.bfc;
  }
  get AutoPilotLine() {
    return this.X6m;
  }
  get MapRootItem() {
    return this.RootItem;
  }
  get MapGravity() {
    return this.kGc;
  }
  Tick() {
    this.CAi?.Tick();
  }
  async ChangeMapAsync(t, e) {
    var i;
    if (this.MapId !== t || this.kGc !== e) {
      i = ModelManager_1.ModelManager.MapModel.GetInstanceIdByWorldMapId(t);
      this.e4_ = i;
      this.Z3_ = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(i);
      this.kGc = e;
      i = new UiAsyncTask_1.UiAsyncTask("Map.ChangeMapAsync", async () => {
        if (!this.WaitToDestroy) {
          this.bfc?.Destroy();
          this.bfc = new MapRangePanel_1.MapRangePanel(this);
          this.X6m?.Destroy();
          this.X6m = new AutoPilotLine_1.AutoPilotLine(this);
          await this.MapTileMgr.OnChangeTilesAsync(this.Z3_, this.e4_, this.kGc);
          this.MapRangePanel.CheckExploreMarkRangeInfo();
          this.AutoPilotLine?.CheckAutoPilotLineInfo();
          this.CAi.OnChangeWorldMap(this.Z3_, this.e4_, this.kGc);
          this.d5f?.OnChangeWorldMap(this.Z3_);
        }
      });
      await this.RunAsyncTask(i);
    } else {
      MapLogger_1.MapLogger.Debug(63, "地图系统->切换地图失败， 地图参数没有发生变化", ["InstanceDungeonIdInner", this.e4_], ["instanceId", t], ["MapIdInner", this.Z3_], ["MapGravity", this.kGc], ["gravity", e]);
    }
  }
  OnBeforeDestroy() {
    this.UnBindEvents();
    this.uBc?.RecycleToPool();
    this.uBc = undefined;
    this.CAi.Dispose();
    this.CAi = undefined;
    this.MapTileMgr.Dispose();
    this.MapTileMgr = undefined;
    this.bfc?.Destroy();
    this.bfc = undefined;
    this.X6m?.Destroy();
    this.X6m = undefined;
    this.d5f?.Dispose();
    this.d5f = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.SelfPlayerNode = this.GetItem(0);
    if (this.MapType === 2) {
      this.uBc = new MarkGravityReverseIconComponent_1.MarkGravityReverseIconComponent();
      await this.uBc.CreateByPoolResourceIdAsync("UiItem_MarkReverse", this.SelfPlayerNode);
    }
    this.SetMapScale(this.dAi);
    this.F$t(this.lUi);
    this.yWe();
    this.RootItem.SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    if (this.MapType === 2) {
      await this.pqc();
    }
  }
  OnStart() {
    this.PlayerOutOfBoundIndicator = this.GetItem(2);
    this.PlayerArrow = this.GetItem(1);
    this.RootItem.SetHierarchyIndex(0);
    var t = this.GetItem(6);
    t.SetWidth(this.pAi * 2);
    t.SetHeight(this.pAi * 2);
    t.SetUIActive(false);
    this.vAi = new LevelSequencePlayer_1.LevelSequencePlayer(t);
    this.bfc = new MapRangePanel_1.MapRangePanel(this);
    this.bfc.CheckExploreMarkRangeInfo();
    this.X6m = new AutoPilotLine_1.AutoPilotLine(this);
    this.X6m.CheckAutoPilotLineInfo();
  }
  F$t(t) {
    var e = this.GetItem(3);
    var i = this.GetItem(4);
    let s = this.GetTexture(5);
    if (BaseMap.MapMaterialVersion === 2) {
      s = this.GetTexture(9);
    }
    var a = this.GetItem(7);
    var r = this.GetTexture(8);
    var e = {
      MapType: this.MapType,
      MapId: this.MapId,
      InstanceDungeonId: this.InstanceDungeonId,
      MarkContainer: e,
      MarkScale: t,
      Gravity: this.kGc
    };
    this.CAi = new MapMarkMgr_1.MapMarkMgr(e);
    this.CAi.Initialize();
    var t = this.GetItem(10);
    var e = {
      MapRootItem: this.RootItem,
      TileContainer: i,
      TileTexture: s,
      SubMapContainer: a,
      SubMapTexture: r,
      MapType: this.MapType,
      MapId: this.MapId,
      InstanceDungeonId: this.InstanceDungeonId,
      MapVersion: BaseMap.MapMaterialVersion,
      PreloadTiles: this.fAi,
      FogUnlockItem: t,
      Gravity: this.kGc
    };
    this.MapTileMgr = new MapTileMgr_1.MapTileMgr(e);
    this.MapTileMgr.Initialize();
    this.d5f = new MapRoadWaysMgr_1.MapRoadWaysMgr({
      MapId: this.MapId,
      Container: this.GetItem(13)
    });
  }
  get MarkContainer() {
    return this.GetItem(3);
  }
  get FogUnlockAnchorItem() {
    return this.GetItem(10);
  }
  yWe() {
    if (this.MapType !== 2) {
      if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
        this.MAi();
      } else {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.MAi);
      }
    }
  }
  UnBindEvents() {
    if (this.MapType !== 2 && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.MAi)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.MAi);
    }
  }
  async pqc() {
    this.MapTileMgr.OnMapSetUp();
    await this.MapTileMgr.LoadMapBorder();
    this.CAi.OnMapSetup();
    this.d5f?.OnMapSetup();
    this.RootItem.SetUIActive(true);
  }
  GetAllMarkItems() {
    return this.CAi.GetAllMarkItems();
  }
  GetMarkItemsByType(t, e = true) {
    return this.CAi.GetMarkItemsByType(t, e);
  }
  GetMarkItemsByClickPosition(t) {
    return this.CAi.GetMarkItemsByClickPosition(t);
  }
  GetMarkItem(t, e) {
    return this.CAi.GetMarkItem(t, e);
  }
  CreateCustomMark(t) {
    return this.CAi.CreateDynamicMark(t);
  }
  FindNearbyMarkItems(t, e, i) {
    return this.CAi.FindNearbyMarkItems(t, e, i);
  }
  GetTrackMenuMarkList() {
    return this.CAi.GetTrackMenuMarkList();
  }
  GetNavigateMarkList() {
    return this.CAi.GetNavigateMarkList();
  }
  get MapOffset() {
    return this.MapTileMgr.MapOffset;
  }
  get FakeOffset() {
    return this.MapTileMgr.FakeOffset;
  }
  ShowSubMapTile(t, e, i) {
    this.MapTileMgr.ShowSubMapByPosition(t, e, i);
  }
  HideSubMapTile() {
    this.MapTileMgr.HideSubMap();
  }
  GetAllMapTileItems() {
    return this.MapTileMgr.GetMapTileItems();
  }
  GetWorldMapCenterAreaId() {
    return this.MapTileMgr.GetWorldMapCenterAreaId();
  }
  GetSubMapGroupIdByPosition() {
    return this.MapTileMgr.GetSubMapGroupByRootItemPosition();
  }
  SetMapScale(t) {
    this.RootItem.SetUIRelativeScale3D(new UE.Vector(t, t, t));
  }
  HandleFogAreaOpen(t) {
    this.MapTileMgr.HandleFogAreaOpen(t);
  }
  HandleMapTileDelegate() {
    this.MapTileMgr.HandleDelegate();
  }
  UnBindMapTileDelegate() {
    this.MapTileMgr.UnBindDelegate();
  }
  HandleSceneGamePlayMarkItemOpen(t, e, i) {
    t = this.GetMarkItemsByType(t);
    if (t) {
      t.forEach(t => {
        if (t && t.MarkConfig && t.MarkConfig.RelativeSubType === i) {
          t.IsCanShowView = true;
          t.ViewUpdateAsync(GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()).then(() => {
            t.View?.PlayUnlockSequence();
          }, undefined);
        }
      });
    }
  }
  SetClickRangeVisible(t, e = Vector2D_1.Vector2D.Create(0, 0)) {
    this._1a(t, e);
  }
  async _1a(t, e) {
    var i;
    if (this.C1a !== t) {
      i = this.GetItem(6);
      this.C1a = t;
      if (this.C1a) {
        i.SetUIActive(this.C1a);
        i.D_SetWorldScale3D(new UE.VectorDouble(1, 1, 1));
        i?.SetAnchorOffset(e.ToUeVector2D(true));
        await this.vAi?.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise());
      } else {
        await this.vAi?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
        i?.SetUIActive(this.C1a);
      }
    }
    return true;
  }
  InValidMapTile(t) {
    return this.MapTileMgr.InValidTile(t);
  }
  UpdateDraggableParams(t) {
    this.MapTileMgr.UpdateDraggableParams(t);
  }
  ResetDraggableParams() {
    this.MapTileMgr.ResetDraggableParams();
  }
  SetPlayerGravityActive(t, e) {
    if (e) {
      this.uBc.Gravity = e;
    }
    this.uBc.SetActive(t);
  }
  SetDebugMarkPosition(t) {
    var e = this.GetItem(11);
    e.SetAsLastHierarchy();
    e.SetUIActive(true);
    e.SetAnchorOffset(t.ToUeVector2D(true));
  }
  SetDebugPath(t) {
    var e = this.GetItem(12);
    e.SetUIActive(true);
    e.GetOwner().GetComponentByClass(UE.UI2DLineRaw.StaticClass()).SetPoints(t);
  }
  SetMarkUnFocal(t, e) {
    this.CAi.RefreshMarkHierarchyIndexBySelect(t, e, false);
  }
  SetMarkFocal(t, e) {
    this.CAi.RefreshMarkHierarchyIndexBySelect(t, e, true);
  }
}
(exports.BaseMap = BaseMap).MapMaterialVersion = 2;
//# sourceMappingURL=Map.js.map