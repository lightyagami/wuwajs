"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationGroupInsideComponent = exports.NavigationGroupRightPrevLinkComponent = exports.NavigationGroupRightPrevComponent = exports.NavigationGroupPrevComponent = exports.NavigationGroupLeftNextComponent = exports.NavigationGroupDownNextComponent = exports.NavigationGroupUpNextComponent = exports.NavigationGroupNextComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput");
const UiNavigationLogic_1 = require("../New/UiNavigationLogic");
const HotKeyComponent_1 = require("./HotKeyComponent");
class NavigationGroupNextComponentBase extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.Lqo = t => {
      if (t === this.GetDirection()) {
        this.JumpToNextGroupListener();
      }
    };
  }
  JumpToNextGroupListener() {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.JumpNavigationGroupByTag(this.GetHotKeyConfig().BindButtonTag);
  }
  OnRelease(t) {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.JumpNavigationGroupByTag(t.BindButtonTag);
  }
  OnStartInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(this.Lqo);
  }
  OnFinishInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(this.Lqo);
  }
  OnClear() {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(this.Lqo);
  }
  OnRefreshSelfHotKeyState(o) {
    var e = o.GetFocusListener();
    if (e) {
      var e = e.GetNavigationGroup();
      var i = this.GetBindButtonTag();
      let t = undefined;
      t = i ? e.GroupNameMap.Get(i) : e.NextGroupName;
      if (!StringUtils_1.StringUtils.IsEmpty(t) && (i = o.GetActiveNavigationGroupByNameCheckAll(t))) {
        e = UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(i);
        this.SetVisibleMode(2, e);
      } else {
        this.SetVisibleMode(2, false);
      }
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
class NavigationGroupNextComponent extends NavigationGroupNextComponentBase {
  GetDirection() {
    return 3;
  }
}
exports.NavigationGroupNextComponent = NavigationGroupNextComponent;
class NavigationGroupUpNextComponent extends NavigationGroupNextComponentBase {
  GetDirection() {
    return 1;
  }
}
exports.NavigationGroupUpNextComponent = NavigationGroupUpNextComponent;
class NavigationGroupDownNextComponent extends NavigationGroupNextComponentBase {
  GetDirection() {
    return 0;
  }
}
exports.NavigationGroupDownNextComponent = NavigationGroupDownNextComponent;
class NavigationGroupLeftNextComponent extends NavigationGroupNextComponentBase {
  GetDirection() {
    return 2;
  }
}
exports.NavigationGroupLeftNextComponent = NavigationGroupLeftNextComponent;
class NavigationGroupPrevComponentBase extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.Dqo = t => {
      if (t === this.GetDirection()) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.JumpNavigationGroup(6);
      }
    };
  }
  OnPress() {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.JumpNavigationGroup(6);
  }
  OnStartInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(this.Dqo);
  }
  OnFinishInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(this.Dqo);
  }
  OnClear() {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(this.Dqo);
  }
  OnRefreshSelfHotKeyState(t) {
    var o = t.GetFocusListener();
    if (o && (o = o.GetNavigationGroup(), !StringUtils_1.StringUtils.IsEmpty(o.PrevGroupName)) && (t = t.GetActiveNavigationGroupByNameCheckAll(o.PrevGroupName))) {
      o = UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(t);
      this.SetVisibleMode(2, o);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
class NavigationGroupPrevComponent extends NavigationGroupPrevComponentBase {
  GetDirection() {
    return 2;
  }
}
exports.NavigationGroupPrevComponent = NavigationGroupPrevComponent;
class NavigationGroupRightPrevComponent extends NavigationGroupPrevComponentBase {
  GetDirection() {
    return 3;
  }
}
class NavigationGroupRightPrevLinkComponent extends (exports.NavigationGroupRightPrevComponent = NavigationGroupRightPrevComponent) {
  OnRefreshSelfHotKeyState(t) {
    var o = t.GetFocusListener();
    if (o && this.IsLinkListener(o.GetOwner()) && (o = o.GetNavigationGroup(), !StringUtils_1.StringUtils.IsEmpty(o.PrevGroupName)) && (t = t.GetActiveNavigationGroupByNameCheckAll(o.PrevGroupName))) {
      o = UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(t);
      this.SetVisibleMode(2, o);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.NavigationGroupRightPrevLinkComponent = NavigationGroupRightPrevLinkComponent;
class NavigationGroupInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRelease() {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.JumpInsideNavigationGroup();
  }
  OnRefreshSelfHotKeyState(t) {
    t = t.GetFocusListener();
    if (t && this.IsLinkListener(t.GetOwner()) && ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCanFocusInsideListener(t)) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.NavigationGroupInsideComponent = NavigationGroupInsideComponent;
//# sourceMappingURL=NavigationGroupComponent.js.map