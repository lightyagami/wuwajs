"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseMap = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MarkGravityReverseIconComponent_1 = require("../../Marks/MarkItemView/Components/MarkGravityReverseIconComponent"),
  MapLogger_1 = require("../../Misc/MapLogger"),
  MapRangePanel_1 = require("../SubView/MapRangePanel"),
  MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
  MapTileMgr_1 = require("./Assistant/MapTileMgr");
class BaseMap extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.SelfPlayerNode = void 0, this.PlayerArrow = void 0, this.PlayerOutOfBoundIndicator = void 0, this.MapType = 2, this.dAi = 1, this.lUi = 1, this.CAi = void 0, this.gAi = void 0, this.fAi = void 0, this.pAi = 100, this.vAi = void 0, this.C1a = !1, this.Z3_ = 0, this.e4_ = 0, this.bfc = void 0, this.kGc = void 0, this.uBc = void 0, this.MAi = () => {
      this.gAi.OnMapSetUp(), this.gAi.LoadMapBorder(), this.CAi.OnMapSetup(), this.RootItem.SetUIActive(!0)
    }, this.e4_ = e.InstanceId, this.Z3_ = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(e.InstanceId), this.MapType = e.MapType, this.dAi = e.MapDefaultScale, this.lUi = e.MarkScale ?? 1, this.pAi = e.ClickRange ?? 100, this.fAi = e.PreloadTiles, this.kGc = e.Gravity ?? 1
  }
  get MapId() {
    return this.Z3_
  }
  get InstanceDungeonId() {
    return this.e4_
  }
  get MapRangePanel() {
    return this.bfc
  }
  get MapRootItem() {
    return this.RootItem
  }
  get MapGravity() {
    return this.kGc
  }
  Tick() {
    this.CAi?.Tick()
  }
  async ChangeMapAsync(e, t) {
    var i;
    this.MapId !== e || this.kGc !== t ? (i = ModelManager_1.ModelManager.MapModel.GetInstanceIdByWorldMapId(e), this.e4_ = i, this.Z3_ = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(i), this.kGc = t, i = new UiAsyncTask_1.UiAsyncTask("Map.ChangeMapAsync", async () => {
      this.WaitToDestroy || (this.bfc?.Destroy(), this.bfc = new MapRangePanel_1.MapRangePanel(this), await this.gAi.OnChangeTilesAsync(this.Z3_, this.e4_, this.kGc), this.MapRangePanel.CheckExploreMarkRangeInfo(), this.CAi.OnChangeWorldMap(this.Z3_, this.e4_, this.kGc))
    }), await this.RunAsyncTask(i)) : MapLogger_1.MapLogger.Debug(63, "地图系统->切换地图失败， 地图参数没有发生变化", ["InstanceDungeonIdInner", this.e4_], ["instanceId", e], ["MapIdInner", this.Z3_], ["MapGravity", this.kGc], ["gravity", t])
  }
  OnBeforeDestroy() {
    this.UnBindEvents(), this.uBc?.RecycleToPool(), this.uBc = void 0, this.CAi.Dispose(), this.CAi = void 0, this.gAi.Dispose(), this.gAi = void 0, this.bfc?.Destroy(), this.bfc = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UITexture],
      [10, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.SelfPlayerNode = this.GetItem(0), 2 === this.MapType && (this.uBc = new MarkGravityReverseIconComponent_1.MarkGravityReverseIconComponent, await this.uBc.CreateByPoolResourceIdAsync("UiItem_MarkReverse", this.SelfPlayerNode)), this.SetMapScale(this.dAi), this.F$t(this.lUi), this.yWe(), this.RootItem.SetUIActive(!1), 2 === this.MapType && await this.pqc()
  }
  OnStart() {
    this.PlayerOutOfBoundIndicator = this.GetItem(2), this.PlayerArrow = this.GetItem(1), this.RootItem.SetHierarchyIndex(0);
    var e = this.GetItem(6);
    e.SetWidth(2 * this.pAi), e.SetHeight(2 * this.pAi), e.SetUIActive(!1), this.vAi = new LevelSequencePlayer_1.LevelSequencePlayer(e), this.bfc = new MapRangePanel_1.MapRangePanel(this), this.bfc.CheckExploreMarkRangeInfo()
  }
  F$t(e) {
    var t = this.GetItem(3),
      i = this.GetItem(4);
    let s = this.GetTexture(5);
    2 === BaseMap.MapMaterialVersion && (s = this.GetTexture(9));
    var a = this.GetItem(7),
      r = this.GetTexture(8),
      t = {
        MapType: this.MapType,
        MapId: this.MapId,
        InstanceDungeonId: this.InstanceDungeonId,
        MarkContainer: t,
        MarkScale: e,
        Gravity: this.kGc
      },
      e = (this.CAi = new MapMarkMgr_1.MapMarkMgr(t), this.CAi.Initialize(), this.GetItem(10)),
      t = {
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
        FogUnlockItem: e,
        Gravity: this.kGc
      };
    this.gAi = new MapTileMgr_1.MapTileMgr(t), this.gAi.Initialize()
  }
  get MarkContainer() {
    return this.GetItem(3)
  }
  get FogUnlockAnchorItem() {
    return this.GetItem(10)
  }
  yWe() {
    2 !== this.MapType && (ModelManager_1.ModelManager.GameModeModel.WorldDone ? this.MAi() : EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.MAi))
  }
  UnBindEvents() {
    2 !== this.MapType && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.MAi) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.MAi)
  }
  async pqc() {
    this.gAi.OnMapSetUp(), await this.gAi.LoadMapBorder(), this.CAi.OnMapSetup(), this.RootItem.SetUIActive(!0)
  }
  GetAllMarkItems() {
    return this.CAi.GetAllMarkItems()
  }
  GetMarkItemsByType(e, t = !0) {
    return this.CAi.GetMarkItemsByType(e, t)
  }
  GetMarkItemsByClickPosition(e) {
    return this.CAi.GetMarkItemsByClickPosition(e)
  }
  GetMarkItem(e, t) {
    return this.CAi.GetMarkItem(e, t)
  }
  CreateCustomMark(e) {
    return this.CAi.CreateDynamicMark(e)
  }
  FindNearbyMarkItems(e, t, i) {
    return this.CAi.FindNearbyMarkItems(e, t, i)
  }
  GetTrackMenuMarkList() {
    return this.CAi.GetTrackMenuMarkList()
  }
  GetNavigateMarkList() {
    return this.CAi.GetNavigateMarkList()
  }
  get MapOffset() {
    return this.gAi.MapOffset
  }
  get FakeOffset() {
    return this.gAi.FakeOffset
  }
  ShowSubMapTile(e, t, i) {
    this.gAi.ShowSubMapByPosition(e, t, i)
  }
  HideSubMapTile() {
    this.gAi.HideSubMap()
  }
  GetAllMapTileItems() {
    return this.gAi.GetMapTileItems()
  }
  GetWorldMapCenterAreaId() {
    return this.gAi.GetWorldMapCenterAreaId()
  }
  GetSubMapGroupIdByPosition() {
    return this.gAi.GetSubMapGroupByRootItemPosition()
  }
  SetMapScale(e) {
    this.RootItem.SetUIRelativeScale3D(new UE.Vector(e, e, e))
  }
  HandleFogAreaOpen(e) {
    this.gAi.HandleFogAreaOpen(e)
  }
  HandleMapTileDelegate() {
    this.gAi.HandleDelegate()
  }
  UnBindMapTileDelegate() {
    this.gAi.UnBindDelegate()
  }
  HandleSceneGamePlayMarkItemOpen(e, t, i) {
    e = this.GetMarkItemsByType(e);
    e && e.forEach(e => {
      e && e.MarkConfig && e.MarkConfig.RelativeSubType === i && (e.IsCanShowView = !0, e.ViewUpdateAsync(GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()).then(() => {
        e.View?.PlayUnlockSequence()
      }, void 0))
    })
  }
  SetClickRangeVisible(e, t = Vector2D_1.Vector2D.Create(0, 0)) {
    this._1a(e, t)
  }
  async _1a(e, t) {
    var i;
    return this.C1a !== e && (i = this.GetItem(6), this.C1a = e, this.C1a ? (i.SetUIActive(this.C1a), i.D_SetWorldScale3D(new UE.VectorDouble(1, 1, 1)), i?.SetAnchorOffset(t.ToUeVector2D(!0)), await this.vAi?.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise)) : (await this.vAi?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise), i?.SetUIActive(this.C1a))), !0
  }
  InValidMapTile(e) {
    return this.gAi.InValidTile(e)
  }
  SetPlayerGravityActive(e, t) {
    t && (this.uBc.Gravity = t), this.uBc.SetActive(e)
  }
}(exports.BaseMap = BaseMap).MapMaterialVersion = 2;
//# sourceMappingURL=Map.js.map