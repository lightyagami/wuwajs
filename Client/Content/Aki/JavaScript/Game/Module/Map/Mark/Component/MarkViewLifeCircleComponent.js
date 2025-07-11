"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkViewLifeCircleComponent = undefined;
const MapComponent_1 = require("../../Base/MapComponent");
const PropertyMap_1 = require("../../Container/PropertyMap");
class MarkViewLifeCircleComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.ChildViewVisibleStateMap = new PropertyMap_1.PropertyMap();
  }
  get ComponentType() {
    return 12;
  }
  SetChildViewVisibility(e, t) {
    this.ChildViewVisibleStateMap.set(e, t);
  }
  IsChildViewVisible(e, t = false) {
    return this.ChildViewVisibleStateMap.tryGet(e, t, false);
  }
  SetChildViewVisibleClean(e) {
    this.ChildViewVisibleStateMap.cleanDirty(e);
  }
  IsChildViewStateDirty(e) {
    return this.ChildViewVisibleStateMap.isDirty(e);
  }
  SetAllChildViewStateDirty() {
    this.ChildViewVisibleStateMap.forEach((e, t) => {
      if (t !== 0) {
        this.ChildViewVisibleStateMap.setDirty(t);
      }
    });
  }
  OnRemove() {
    this.ChildViewVisibleStateMap.clear();
  }
  set EnableVerticalPointer(e) {
    this.PropertyMap.set(0, e);
  }
  get EnableVerticalPointer() {
    return this.PropertyMap.tryGet(0, true);
  }
  set VerticalPointerType(e) {
    this.PropertyMap.set(1, e);
  }
  get VerticalPointerType() {
    return this.PropertyMap.tryGet(1, 0, false);
  }
  get IsVerticalPointerTypeDirty() {
    return this.PropertyMap.isDirty(1);
  }
  SetVerticalPointerTypeClean() {
    this.PropertyMap.cleanDirty(1);
  }
  set IsInAoiRange(e) {
    this.PropertyMap.set(2, e);
  }
  get IsInAoiRange() {
    return this.PropertyMap.tryGet(2, false);
  }
  set IsSelected(e) {
    this.PropertyMap.set(3, e);
  }
  get IsSelected() {
    return this.PropertyMap.tryGet(3, false);
  }
  get IsSelectedDirty() {
    return this.PropertyMap.isDirty(3);
  }
  set IsTracked(e) {
    this.PropertyMap.set(4, e);
  }
  get IsTracked() {
    return this.PropertyMap.tryGet(4, false);
  }
  get IsTrackedDirty() {
    return this.PropertyMap.isDirty(4);
  }
}
exports.MarkViewLifeCircleComponent = MarkViewLifeCircleComponent;
//# sourceMappingURL=MarkViewLifeCircleComponent.js.map