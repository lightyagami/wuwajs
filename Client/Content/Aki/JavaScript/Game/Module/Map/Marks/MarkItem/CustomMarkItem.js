"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomMarkItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CustomMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/CustomMarkByMarkId");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const MapUtil_1 = require("../../MapUtil");
const CustomMarkItemView_1 = require("../MarkItemView/CustomMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class CustomMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, r, t, a) {
    super(e, r, t, a);
    this.NDi = false;
  }
  get MarkType() {
    return 9;
  }
  get IsNewCustomMarkItem() {
    return this.NDi;
  }
  get PermanentUpdate() {
    return super.PermanentUpdate || this.IsNewCustomMarkItem;
  }
  IsMultiMap() {
    return false;
  }
  OnInitialize() {
    super.OnInitialize();
    var e = this.ServerMarkInfo;
    if (e.TrackTarget instanceof Vector_1.Vector) {
      r = Vector_1.Vector.Create(e.TrackTarget.X, -e.TrackTarget.Y, e.TrackTarget.Z);
      r = MapUtil_1.MapUtil.UiPosition2WorldPosition(r, r);
      this.SetTrackData(r);
    } else if (e.TrackTarget instanceof Vector2D_1.Vector2D) {
      r = Vector_1.Vector.Create(e.TrackTarget.X, e.TrackTarget.Y, 0);
      e = MapUtil_1.MapUtil.UiPosition2WorldPosition(r, r);
      this.SetTrackData(new Vector2D_1.Vector2D(e.X, e.Y));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 49, "未定义的类型");
    }
    this.MarkItemEntity.ViewLifeCircle.EnableVerticalPointer = false;
    this.SetConfigId(this.ConfigId);
    var r = CustomMarkByMarkId_1.configCustomMarkByMarkId.GetConfig(this.ConfigId);
    this.ShowPriority = r ? r.ShowPriority : 0;
    this.UpdateVisibleRelativeState();
  }
  CreateView() {
    return new CustomMarkItemView_1.CustomMarkItemView(this);
  }
  GetMarkItemViewType() {
    return 4;
  }
  SetConfigId(e) {
    this.ServerMarkInfo.MarkConfigId = e;
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetCustomMarkConfig(e);
    this.OnAfterSetConfigId(e);
  }
  SetIsNew(e) {
    this.NDi = e;
  }
  GetTitleText() {
    return ConfigManager_1.ConfigManager.TextConfig.GetTextById("CustomMarkName");
  }
  CheckCanShowView() {
    if (this.MapType === 1) {
      return ModelManager_1.ModelManager.WorldMapModel.CustomMarksIsShow;
    } else {
      return ModelManager_1.ModelManager.WorldMapModel.CustomMarksIsShow && super.CheckCanShowView();
    }
  }
  GetInteractiveFlag() {
    return !this.IsNewCustomMarkItem && super.GetInteractiveFlag();
  }
  GetSecondaryUiType() {
    return WorldMapDefine_1.ESecondaryPanel.CustomMarkPanel;
  }
}
exports.CustomMarkItem = CustomMarkItem;
//# sourceMappingURL=CustomMarkItem.js.map