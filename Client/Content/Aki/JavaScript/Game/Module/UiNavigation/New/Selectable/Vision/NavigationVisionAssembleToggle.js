"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationVisionAssembleToggle = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationVisionAssembleToggle extends NavigationToggle_1.NavigationToggle {
  OnFindLoopScrollViewNavigationComponent(o, e) {
    var t = this.Listener.LoopScrollViewGridIndex;
    var i = ModelManager_1.ModelManager.VisionEquipGroupModel.FilterDataLength;
    var r = o.X > 0;
    if (t === -1) {
      if (i === 0) {
        return undefined;
      } else if (r) {
        return this.r4_();
      } else {
        return this.o4_();
      }
    } else if (r || t !== 0) {
      if (r && t === i - 1) {
        if (this.PanelHandle.IsInCompare) {
          return this.r4_();
        } else {
          return this.n4_();
        }
      } else {
        return super.OnFindLoopScrollViewNavigationComponent(o, e);
      }
    } else if (this.PanelHandle.IsInCompare) {
      return this.o4_();
    } else {
      return this.n4_();
    }
  }
  n4_() {
    return this.Listener.GetNavigationGroup()?.ActiveListenerList[0].GetSelectableComponent();
  }
  r4_() {
    for (const o of this.Listener.GetNavigationGroup().ActiveListenerList) {
      if (o.HasLoopScrollView()) {
        (o.ScrollProxy?.ScrollView).ScrollToGridIndex(0);
        break;
      }
    }
    for (const e of this.Listener.GetNavigationGroup().ActiveListenerList) {
      if (e.LoopScrollViewGridIndex === 0) {
        return e.GetSelectableComponent();
      }
    }
  }
  o4_() {
    var o = ModelManager_1.ModelManager.VisionEquipGroupModel.FilterDataLength;
    for (const e of this.Listener.GetNavigationGroup().ActiveListenerList) {
      if (e.HasLoopScrollView()) {
        (e.ScrollProxy?.ScrollView).ScrollToGridIndex(o - 1);
        break;
      }
    }
    for (const t of this.Listener.GetNavigationGroup().ActiveListenerList) {
      if (t.LoopScrollViewGridIndex === o - 1) {
        return t.GetSelectableComponent();
      }
    }
  }
}
exports.NavigationVisionAssembleToggle = NavigationVisionAssembleToggle;
//# sourceMappingURL=NavigationVisionAssembleToggle.js.map