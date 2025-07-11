"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationGroup = undefined;
class NavigationGroup {
  constructor(t) {
    this.Lo = undefined;
    this.Oeh = undefined;
    this.Geh = undefined;
    this.keh = false;
    this.Neh = [];
    this.Jo1 = (t, e) => {
      let r = 0;
      let i = 0;
      if (t.IsValid()) {
        r = t.RootUIComp.flattenHierarchyIndex;
      }
      if (e.IsValid()) {
        i = e.RootUIComp.flattenHierarchyIndex;
      }
      if (r === i || r < i) {
        return -1;
      } else {
        return 1;
      }
    };
    this.Lo = t;
  }
  AddListener(t) {
    this.Neh.push(t);
    this.keh = true;
  }
  RemoveListenerByIndex(t) {
    this.Neh.splice(t, 1);
  }
  get ListenerList() {
    if (this.keh) {
      this.keh = false;
      this.Neh.sort(this.Jo1);
    }
    return this.Neh;
  }
  get LoopScrollSortListenerList() {
    return this.ListenerList.slice().sort((t, e) => {
      let r = 0;
      let i = 0;
      if (t.HasLoopScrollView() && e.HasLoopScrollView() && (t.IsValid() && (r = t.LoopScrollViewGridIndex), e.IsValid() && (i = e.LoopScrollViewGridIndex), r !== i)) {
        return r - i;
      } else {
        return this.Jo1(t, e);
      }
    });
  }
  get ActiveListenerList() {
    var r = [];
    for (let t = 0, e = this.ListenerList.length; t < e; ++t) {
      var i = this.ListenerList[t];
      if (i.IsListenerActive()) {
        r.push(i);
      }
    }
    return r;
  }
  GetOppositeListenerListByListener(r) {
    if (this.AllowNavigationInSelfDynamic) {
      return this.ListenerList;
    }
    var i = [];
    for (let t = 0, e = this.ListenerList.length; t < e; ++t) {
      var s = this.ListenerList[t];
      if (r.ScrollViewActor !== undefined || s.ScrollViewActor !== undefined || r.LayoutActor !== undefined || s.LayoutActor !== undefined) {
        if (r.ScrollViewActor === s.ScrollViewActor && r.LayoutActor === s.LayoutActor) {
          i.push(s);
        }
      }
    }
    return i;
  }
  get AllowNavigationInSelfDynamic() {
    return this.Lo.AllowNavigationInSelfDynamic;
  }
  set DefaultListener(t) {
    this.Oeh = t;
  }
  get DefaultListener() {
    return this.Oeh;
  }
  get GroupName() {
    return this.Lo.GroupName;
  }
  get GroupNameMap() {
    return this.Lo.GroupNameMap;
  }
  get GroupType() {
    return this.Lo.GroupType;
  }
  get HorizontalPriorityMode() {
    return this.Lo.HorizontalPriorityMode;
  }
  get HorizontalWrapMode() {
    return this.Lo.HorizontalWrapMode;
  }
  get InsideGroupName() {
    return this.Lo.InsideGroupName;
  }
  set LastSelectListener(t) {
    this.Geh = t;
  }
  get LastSelectListener() {
    return this.Geh;
  }
  get NextGroupName() {
    return this.Lo.NextGroupName;
  }
  set PrevGroupName(t) {
    this.Lo.PrevGroupName = t;
  }
  get PrevGroupName() {
    return this.Lo.PrevGroupName;
  }
  get RefreshNavigation() {
    return this.Lo.RefreshNavigation;
  }
  get SelectableMemory() {
    return this.Lo.SelectableMemory;
  }
  get SuitableListenerByNoDynamic() {
    return this.Lo.SuitableListenerByNoDynamic;
  }
  get VerticalPriorityMode() {
    return this.Lo.VerticalPriorityMode;
  }
  get VerticalWrapMode() {
    return this.Lo.VerticalWrapMode;
  }
  get SlideToLeftOrTop() {
    return this.Lo.SlideToLeftOrTop;
  }
  get SlideToRightOrDown() {
    return this.Lo.SlideToRightOrDown;
  }
}
exports.NavigationGroup = NavigationGroup;
//# sourceMappingURL=NavigationGroup.js.map