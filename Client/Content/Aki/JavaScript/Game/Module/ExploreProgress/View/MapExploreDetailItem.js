"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExploreDetailItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MapExploreDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.XOl = undefined;
    this.lml = e => {
      if (e === 1 && (this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Map", 69, "Click ExploreItem", ["ExploreType", this.XOl.ExploreType]);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UISprite], [4, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.lml]];
  }
  Refresh(e, t, s) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, this.constructor.name, ["AreaId", e.AreaId], ["ExploreType", e.ExploreType], ["ExploreProgressId", e.ExploreProgressId], ["ConfigId", e.ConfigId], ["IsSelected", t], ["GridIndex", s]);
    }
    var s = e.IsUnlocked();
    var i = this.GetText(4);
    var r = this.GetText(3);
    this.XOl = e;
    this.GetItem(1)?.SetUIActive(!s);
    this.GetSprite(2)?.SetUIActive(s);
    r.SetUIActive(s);
    if (s) {
      this.SetSpriteByPath(e.Icon, this.GetSprite(2), false);
      i.ShowTextNew(e.GetNameId());
      if (e.IsPercent()) {
        r.SetText(Math.floor(e.GetProgress()).toString() + "%");
      } else {
        r.SetText(e.GetCurrentCount() + "/" + e.GetTotalCount());
      }
      s = e.IsCompleted();
      i.SetChangeColor(s, i.changeColor);
      r.SetChangeColor(s, r.changeColor);
    } else {
      i.ShowTextNew(e.LockDescId);
      i.SetChangeColor(false, i.changeColor);
    }
    var s = t ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(s);
  }
  OnSelected() {
    this.GetExtendToggle(0)?.SetToggleState(1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapExploreDetailItemClick, this.XOl);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  GetBtnRootItem() {
    return this.GetExtendToggle(0).RootUIComp;
  }
}
exports.MapExploreDetailItem = MapExploreDetailItem;
//# sourceMappingURL=MapExploreDetailItem.js.map