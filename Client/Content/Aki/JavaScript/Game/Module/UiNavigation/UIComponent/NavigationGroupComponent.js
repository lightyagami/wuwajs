"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationGroupInsideComponent = exports.NavigationGroupPrevComponent = exports.NavigationGroupDownNextComponent = exports.NavigationGroupUpNextComponent = exports.NavigationGroupNextComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput");
const UiNavigationLogic_1 = require("../New/UiNavigationLogic");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
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
    UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroupByTag(this.GetHotKeyConfig().BindButtonTag);
  }
  OnRelease(t) {
    UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroupByTag(t.BindButtonTag);
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
  OnRefreshSelfHotKeyState(i) {
    var o = i.GetFocusListener();
    if (o) {
      var o = o.GetNavigationGroup();
      var e = this.GetBindButtonTag();
      let t = undefined;
      t = e ? o.GroupNameMap.Get(e) : o.NextGroupName;
      if (!StringUtils_1.StringUtils.IsEmpty(t) && (e = i.GetActiveNavigationGroupByNameCheckAll(t))) {
        o = UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(e);
        this.SetVisibleMode(2, o);
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
class NavigationGroupPrevComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.Dqo = t => {
      if (t === 2) {
        UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(6);
      }
    };
  }
  OnPress() {
    UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(6);
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
    var i = t.GetFocusListener();
    if (i && (i = i.GetNavigationGroup(), !StringUtils_1.StringUtils.IsEmpty(i.PrevGroupName)) && (t = t.GetActiveNavigationGroupByNameCheckAll(i.PrevGroupName))) {
      i = UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(t);
      this.SetVisibleMode(2, i);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.NavigationGroupPrevComponent = NavigationGroupPrevComponent;
class NavigationGroupInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRelease() {
    UiNavigationNewController_1.UiNavigationNewController.JumpInsideNavigationGroup();
  }
  OnRefreshSelfHotKeyState(t) {
    t = t.GetFocusListener();
    if (t && this.IsLinkListener(t.GetOwner()) && UiNavigationNewController_1.UiNavigationNewController.GetCanFocusInsideListener(t)) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.NavigationGroupInsideComponent = NavigationGroupInsideComponent;
//# sourceMappingURL=NavigationGroupComponent.js.map