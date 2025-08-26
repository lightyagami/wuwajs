"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapQuickNavigateComponent = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapQuickNavigateComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.YNl = e => this.NavigateTo(e.MarkId, e.MarkType, e.Focal, e.FocusTween, e.NeedTempShow);
    this.NavigateTo = (e, t, n = false, a = true, o = false) => {
      var r = this.GetNavigateMarkIsNeedChangeMap(e, t);
      if (r.MapId !== undefined) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeWorldMap, {
          MarkId: e,
          MarkType: t,
          MapId: r.MapId,
          Focal: n,
          FocusTween: a,
          Gravity: r.Gravity,
          NeedTempShow: o
        });
        return true;
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapFocalMarkItem, e, t, n, a, o);
        return false;
      }
    };
  }
  get ComponentType() {
    return 7;
  }
  OnEnable() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapNavigate, this.YNl);
  }
  OnDisable() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapNavigate, this.YNl);
  }
  GetNavigateMarkIsNeedChangeMap(e, t) {
    var n = this.Parent.Map;
    var a = n.GetMarkItem(t, e);
    var o = a ? a.MapId : ModelManager_1.ModelManager.MapModel.GetMarkMapConfigId(e, t);
    var a = a ? a.MarkItemEntity.GamePlay.Gravity : ModelManager_1.ModelManager.MapModel.GetMarkMapGravity(e, t);
    var e = o !== n.MapId ? o : undefined;
    var t = (a = ModelManager_1.ModelManager.WorldMapModel.GetFinalWorldMapGravity(e ?? n.MapId, a)) !== n.MapGravity ? a : undefined;
    if (t !== undefined) {
      return {
        MapId: e ?? n.MapId,
        Gravity: t
      };
    } else {
      return {
        MapId: e
      };
    }
  }
}
exports.WorldMapQuickNavigateComponent = WorldMapQuickNavigateComponent;
//# sourceMappingURL=WorldMapQuickNavigateComponent.js.map