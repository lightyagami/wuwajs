"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationSelectableCreator = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
class NavigationSelectableCreator {
  static mBo(e) {
    let t = undefined;
    t = e instanceof UE.UIExtendToggle ? "Toggle" : e instanceof UE.UIButtonComponent ? "Button" : e instanceof UE.UIScrollViewWithScrollbarComponent ? "Scrollbar" : e instanceof UE.UISliderComponent ? "Slider" : e instanceof UE.UIDraggableComponent ? "DragComponent" : "Selectable";
    return [NavigationSelectableCreator.dBo.get(t), t];
  }
  static CBo(e) {
    let t = e.GetComponentByClass(UE.UISelectableComponent.StaticClass());
    if (!(t = (t = t || e.GetComponentByClass(UE.UIScrollViewComponent.StaticClass())) || e.GetComponentByClass(UE.UIDraggableComponent.StaticClass()))) {
      e = e.GetComponentByClass(UE.UIItem.StaticClass());
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "监听组件挂载节点获取不到交互组件", ["节点名", e.displayName]);
      }
    }
    return t;
  }
  static RegisterNavigationBehavior(e, t) {
    NavigationSelectableCreator.dBo.set(e, t);
  }
  static CreateNavigationBehavior(e, t, a) {
    e = this.CBo(e);
    let i = undefined;
    let o = t;
    if (!StringUtils_1.StringUtils.IsBlank(t)) {
      i = NavigationSelectableCreator.dBo.get(t);
      o = t;
    }
    if (!i) {
      t = this.mBo(e);
      i = t[0];
      o = t[1];
    }
    return new i(e, o, a);
  }
}
(exports.NavigationSelectableCreator = NavigationSelectableCreator).dBo = new Map();
//# sourceMappingURL=NavigationSelectableCreator.js.map