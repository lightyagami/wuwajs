"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationGroup = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class NavigationGroup {
  constructor(t) {
    this.Lo = undefined;
    this.JHd = new Set();
    this.Oeh = undefined;
    this.Geh = undefined;
    this.keh = false;
    this.Neh = [];
    this.Jo1 = (t, e) => {
      let i = 0;
      let r = 0;
      if (t.IsValid()) {
        i = t.RootUIComp.flattenHierarchyIndex;
      }
      if (e.IsValid()) {
        r = e.RootUIComp.flattenHierarchyIndex;
      }
      if (i === r || i < r) {
        return -1;
      } else {
        return 1;
      }
    };
    this.Lo = t;
    if (!StringUtils_1.StringUtils.IsBlank(this.Lo.InsideGroupName)) {
      this.JHd.add(this.Lo.InsideGroupName);
    }
    for (let t = 0, e = this.Lo.ExtraInsideGroupNameList.Num(); t < e; ++t) {
      var i = this.Lo.ExtraInsideGroupNameList.Get(t);
      if (!StringUtils_1.StringUtils.IsBlank(i)) {
        this.JHd.add(i);
      }
    }
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
      let i = 0;
      let r = 0;
      if (t.HasLoopScrollView() && e.HasLoopScrollView() && (t.IsValid() && (i = t.LoopScrollViewGridIndex), e.IsValid() && (r = e.LoopScrollViewGridIndex), i !== r)) {
        return i - r;
      } else {
        return this.Jo1(t, e);
      }
    });
  }
  get ActiveListenerList() {
    var i = [];
    for (let t = 0, e = this.ListenerList.length; t < e; ++t) {
      var r = this.ListenerList[t];
      if (r.IsListenerActive()) {
        i.push(r);
      }
    }
    return i;
  }
  GetOppositeListenerListByListener(i, r) {
    if (this.AllowNavigationInSelfDynamic) {
      return this.ListenerList;
    }
    var s = [];
    for (let t = 0, e = this.ListenerList.length; t < e; ++t) {
      var n = this.ListenerList[t];
      if (i !== undefined || n.ScrollViewActor !== undefined || r !== undefined || n.LayoutActor !== undefined) {
        if (i === n.ScrollViewActor && r === n.LayoutActor) {
          s.push(n);
        }
      }
    }
    return s;
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
  get InsideGroupNameSet() {
    return this.JHd;
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