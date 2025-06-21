"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NavigationSelectableCreator = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
class NavigationSelectableCreator {
  static mBo(e) {
    let t = void 0;
    return t = e instanceof UE.UIExtendToggle ? "Toggle" : e instanceof UE.UIButtonComponent ? "Button" : e instanceof UE.UIScrollViewWithScrollbarComponent ? "Scrollbar" : e instanceof UE.UISliderComponent ? "Slider" : e instanceof UE.UIDraggableComponent ? "DragComponent" : "Selectable", [NavigationSelectableCreator.dBo.get(t), t]
  }
  static CBo(e) {
    let t = e.GetComponentByClass(UE.UISelectableComponent.StaticClass());
    return (t = (t = t || e.GetComponentByClass(UE.UIScrollViewComponent.StaticClass())) || e.GetComponentByClass(UE.UIDraggableComponent.StaticClass())) || (e = e.GetComponentByClass(UE.UIItem.StaticClass()), Log_1.Log.CheckError() && Log_1.Log.Error("UiNavigation", 10, "监听组件挂载节点获取不到交互组件", ["节点名", e.displayName])), t
  }
  static RegisterNavigationBehavior(e, t) {
    NavigationSelectableCreator.dBo.set(e, t)
  }
  static CreateNavigationBehavior(e, t, a) {
    e = this.CBo(e);
    let i = void 0,
      o = t;
    return StringUtils_1.StringUtils.IsBlank(t) || (i = NavigationSelectableCreator.dBo.get(t), o = t), i || (t = this.mBo(e), i = t[0], o = t[1]), new i(e, o, a)
  }
}(exports.NavigationSelectableCreator = NavigationSelectableCreator).dBo = new Map;
//# sourceMappingURL=NavigationSelectableCreator.js.map