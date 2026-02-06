"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapExtraUiPanelComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stack_1 = require("../../../../Core/Container/Stack");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapComponent_1 = require("../../Map/Base/MapComponent");
const PhantomArenaMapEntrancePanel_1 = require("../../PhantomArena/Prepare/Entrance/PhantomArenaMapEntrancePanel");
class WorldMapExtraUiPanelComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.Nsf = new Stack_1.Stack();
    this.OnExtraUiViewOpened = undefined;
    this.OnExtraUiViewClosed = undefined;
    this.Vsf = undefined;
    this.Hsf = (e, t) => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Map", 87, "更新地图外部二级界面的标记类型", ["markType", e], ["visible", t]);
      }
      if (ModelManager_1.ModelManager.MapModel?.IsExtraUiMarkTypeVisible(2, e) !== t) {
        ModelManager_1.ModelManager.MapModel?.UpdateExtraUiMarkTypeVisible(2, e, t);
        this.WorldMapUiComponent?.UpdateMarkItems(true);
      }
    };
    this.OnPointerDrag = e => {
      ControllerHolder_1.ControllerHolder.WorldMapController.ClearFocalMarkItem();
      this.Nsf.Peek()?.OnPointerDrag(e);
    };
  }
  get ComponentType() {
    return 19;
  }
  get WorldMapUiComponent() {
    var e = this.Parent;
    if (e !== undefined) {
      return e;
    }
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  OnAdd() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapExtraMarkTypeVisibleChange, this.Hsf);
  }
  OnRemove() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapExtraMarkTypeVisibleChange, this.Hsf);
  }
  OpenUi(e, t, i) {
    var r = this.Nsf.Peek();
    if (r) {
      if (r.PanelName === e) {
        this.LogInfo(87, "外部二级界面无需打开，直接处理逻辑", ["panelName", e]);
        r.OnHandleShowParam?.(i);
        return;
      }
      r.Hide();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 87, "打开地图外部二级界面", ["panelName", e]);
    }
    r = WorldMapExtraUiPanelComponent.P$g[e];
    const a = new r[0](e, this);
    a.OpenParam = i;
    this.Nsf.Push(a);
    a.CreateThenShowByResourceIdAsync(r[1], t).then(() => {
      this.jsf(a);
    });
  }
  CloseUi(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 87, "关闭地图外部二级界面", ["panelName", e.PanelName], ["ComponentId", e.ComponentId]);
    }
    var t = this.Nsf.Peek();
    if (t) {
      if (t === e) {
        this.Nsf.Pop();
        e.Destroy();
      } else if (this.Nsf.Delete(e)) {
        e.Destroy();
      }
      this.$sf();
      this.Nsf.Peek()?.Show();
    } else {
      this.LogError(87, "关闭地图外部二级界面失败，栈中没有元素", ["panelName", e.PanelName], ["ComponentId", e.ComponentId]);
    }
  }
  jsf(e) {
    this.OnExtraUiViewOpened?.(e);
    this.tOt(true);
    this.RefreshDragAndScaleParam();
    this.n_g();
    ModelManager_1.ModelManager.WorldMapModel.WorldExtraUiCount++;
  }
  $sf() {
    this.OnExtraUiViewClosed?.();
    this.tOt(false);
    this.RefreshDragAndScaleParam();
    this.n_g();
    ModelManager_1.ModelManager.WorldMapModel.WorldExtraUiCount--;
  }
  get IsExtraUiViewOpened() {
    return this.Nsf.Size > 0;
  }
  tOt(e) {
    if (this.WorldMapUiComponent && (e && this.Nsf.Size === 1 && (this.Vsf = this.WorldMapUiComponent.ScaleComponent.ScaleSlider), e = this.Wsf(e))) {
      this.WorldMapUiComponent.ScaleComponent.ScaleSlider = e;
    }
  }
  Wsf(e) {
    if (e || this.Nsf.Size !== 0) {
      return this.Nsf.Peek()?.GetScaleSlider?.();
    } else {
      return this.Vsf;
    }
  }
  ClickEmpty(e) {
    ControllerHolder_1.ControllerHolder.WorldMapController.ClearFocalMarkItem();
    this.Nsf.Peek()?.OnClickEmpty?.(e);
  }
  ClickSingleMark(e) {
    this.ClearClickItem();
    this.SetClickItem(e);
    this.Nsf.Peek()?.OnClickMarkItem?.(e);
  }
  ClickMarks(e, t) {
    ControllerHolder_1.ControllerHolder.WorldMapController.ClearFocalMarkItem();
    this.Nsf.Peek()?.OnClickMarks?.(e, t);
  }
  SetClickItem(e) {
    var t;
    var i;
    if (e.IsOutOfBound) {
      this.WorldMapUiComponent?.MoveComponent.SetMapPosition(e, true, 1, undefined, undefined, true, true);
    }
    this.WorldMapUiComponent.ClickedItem = e;
    this.WorldMapUiComponent?.ClickedItem?.SetSelected(true);
    this.WorldMapUiComponent?.UpdateSingleMarkItem(e, true);
    if (this.WorldMapUiComponent?.ClickedItem.IsMultiMap()) {
      e = this.WorldMapUiComponent?.ClickedItem.GetMultiMapId();
      if (e = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(e)) {
        t = e.Area.length > 0 ? e.Area[0] : this.WorldMapUiComponent?.Map.GetWorldMapCenterAreaId();
        i = e.GroupId;
        e = e.Floor;
        this.WorldMapUiComponent?.MultiFloorComponent.SelectMultiMapFloor(t, i, e, true);
      }
    } else {
      this.WorldMapUiComponent?.MultiFloorComponent.DeSelectMultiMapFloor();
    }
  }
  ClearClickItem() {
    if (this.WorldMapUiComponent?.ClickedItem) {
      this.WorldMapUiComponent.ClickedItem.IsIgnoreScaleShow = false;
      this.WorldMapUiComponent.ClickedItem.SetSelected(false);
      this.WorldMapUiComponent.UpdateSingleMarkItem(this.WorldMapUiComponent.ClickedItem, true);
      this.WorldMapUiComponent.ClickedItem = undefined;
    }
  }
  get IsEnableMapScale() {
    var e = this.Nsf.Peek();
    return !e || (e.GetIsEnableMapScale() ?? true);
  }
  get IsEnableMapCursorButton() {
    var e = this.Nsf.Peek();
    return !e || (e.GetIsEnableMapCursorButton() ?? true);
  }
  get MapDefaultScale() {
    return this.Nsf.Peek()?.GetDefaultMapScale() ?? 0;
  }
  get MapMaxScale() {
    return this.Nsf.Peek()?.GetMaxMapScale() ?? 0;
  }
  get MapMinScale() {
    return this.Nsf.Peek()?.GetMinMapScale() ?? 0;
  }
  get TileNum() {
    return this.Nsf.Peek()?.GetTileNum();
  }
  get IsShowPlayerMark() {
    return this.Nsf.Peek()?.GetIsShowPlayerMark() ?? true;
  }
  cSf() {
    var e;
    if (this.MapDefaultScale === 0 || this.MapMaxScale === 0 || this.MapMinScale === 0) {
      ModelManager_1.ModelManager.WorldMapModel.ResetMapScale();
    } else {
      ModelManager_1.ModelManager.WorldMapModel.MapScaleMax = this.MapMaxScale / this.MapDefaultScale;
      ModelManager_1.ModelManager.WorldMapModel.MapScaleMin = this.MapMinScale / this.MapDefaultScale;
      e = this.MapDefaultScale / 100;
      ModelManager_1.ModelManager.WorldMapModel.MapScale = e;
    }
    this.WorldMapUiComponent?.ScaleComponent.Initialize();
  }
  dSf() {
    if (this.TileNum) {
      this.WorldMapUiComponent?.Map?.UpdateDraggableParams(this.TileNum);
    } else {
      this.WorldMapUiComponent?.Map?.ResetDraggableParams();
    }
    this.WorldMapUiComponent?.RecalculateMapSize();
  }
  n_g() {
    this.WorldMapUiComponent?.InitSelfPlayerMark();
  }
  RefreshDragAndScaleParam() {
    this.dSf();
    this.cSf();
  }
}
(exports.WorldMapExtraUiPanelComponent = WorldMapExtraUiPanelComponent).P$g = {
  PhantomArenaMapEntrance: [PhantomArenaMapEntrancePanel_1.PhantomArenaMapEntrancePanel, "UiView_SoundRemnantArenaMap"]
};
//# sourceMappingURL=WorldMapExtraUiPanelComponent.js.map