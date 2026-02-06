"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerMarkItem = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const PlayerMarkItemView_1 = require("../MarkItemView/PlayerMarkItemView");
const MarkItem_1 = require("./MarkItem");
class PlayerMarkItem extends MarkItem_1.MarkItem {
  constructor(e, t, i, r, s = 1) {
    super(e, i, r, s);
    this.PlayerId = 0;
    this.PlayerIndex = 0;
    this.PlayerStartPosition = undefined;
    this.IsHide = true;
    this.J3_ = undefined;
    this.WRi = (e, t) => {
      if (this.PlayerId === e) {
        this.IsHide = true;
      }
    };
    this.ZDi = (e, t) => {
      if (this.PlayerId === e && (this.SetTrackData(t), this.PDc(), this.IsHide)) {
        this.IsHide = false;
      }
    };
    this.PlayerId = t.PlayerId;
    this.PlayerIndex = t.PlayerIndex;
    this.PlayerStartPosition = Vector_1.Vector.Create(t.Position);
    this.J3_ = t;
  }
  get MarkId() {
    return this.PlayerId;
  }
  get MarkType() {
    return 11;
  }
  get MapId() {
    return this.J3_.MapId;
  }
  OnInitialize() {
    if (this.MapType === 1) {
      this.SetConfigScale(0.8);
    }
    var e = WorldMapDefine_1.onlinePlayerIconPathList[this.PlayerIndex - 1];
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.IconPath = e;
    this.eRi();
    this.SetTrackData(this.PlayerStartPosition);
    this.PDc();
    this.UpdateVisibleRelativeState();
    this.IsHide = false;
  }
  Destroy() {
    this.tRi();
    super.Destroy();
  }
  GetMarkItemViewType() {
    return 18;
  }
  CreateView() {
    return new PlayerMarkItemView_1.PlayerMarkItemView(this);
  }
  SetMarkData(e) {
    this.PlayerId = e.PlayerId;
    this.PlayerIndex = e.PlayerIndex;
  }
  UpdateVisibleRelativeState() {
    var e = !this.IsInConsistentDistrict();
    var t = this.CheckCanShowInGravityLayer();
    this.IsCanShowView = e && t && this.CheckCanShowView() && !this.IsHide;
    this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(9, this.MarkItemEntity.GamePlay.CanShowGravityChildIcon);
    this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(0, this.IsCanShowView);
  }
  eRi() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScenePlayerLocationChanged, this.ZDi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScenePlayerMarkItemStateChange, this.WRi);
  }
  tRi() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ScenePlayerLocationChanged, this.ZDi)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScenePlayerLocationChanged, this.ZDi);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ScenePlayerMarkItemStateChange, this.WRi)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScenePlayerMarkItemStateChange, this.WRi);
    }
  }
  PDc() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(this.PlayerId)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
    if (e) {
      e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity?.GetComponent(48)?.IsStandardGravity;
      this.MarkItemEntity.GamePlay.Gravity = e ? 1 : 2;
    } else {
      e = ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(this.MapId);
      this.MarkItemEntity.GamePlay.Gravity = e ? 1 : 0;
    }
  }
  CheckCanShowView() {
    return true;
  }
  GetInteractiveFlag() {
    return false;
  }
  SetTitleText(e) {
    var t = ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(this.PlayerId)?.Name ?? this.PlayerId.toString();
    e.SetText(t);
  }
}
exports.PlayerMarkItem = PlayerMarkItem;
//# sourceMappingURL=PlayerMarkItem.js.map