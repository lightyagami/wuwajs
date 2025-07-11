"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionViewPanelHandle = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiNavigationNewController_1 = require("../UiNavigationNewController");
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class FunctionViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.Jwo = new Set();
    this.zwo = new Map();
    this.Zwo = new Set();
    this.eBo = 1;
  }
  OnDefaultNavigationListenerList(e) {}
  OnGetLoopOrLayoutListener(e) {
    return e;
  }
  AddNavigationListener(e) {
    var i;
    this.Zwo.add(e);
    if (!this.Jwo.has(e.LayoutActor)) {
      i = (i = e.LayoutActor.GetUIItem().GetParentAsUIItem()).GetParentAsUIItem().UIChildren.FindIndex(i);
      this.Jwo.add(e.LayoutActor);
      this.zwo.set(i, e);
      if (i === 1) {
        this.tBo(i, e);
      }
    }
  }
  tBo(e, i) {
    this.eBo = e;
    this.SetNavigationGroupDefaultListener(i);
    this.DefaultNavigationListener = [];
    this.DefaultNavigationListener.push(i);
  }
  iBo(e) {
    var i;
    var t = this.zwo.get(e);
    if (t) {
      if ((i = UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()) && this.Zwo.has(i)) {
        this.tBo(e, t);
        UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
        ModelManager_1.ModelManager.UiNavigationModel.SetCursorActiveDelayTime(350);
      } else {
        this.tBo(e, t);
      }
    }
  }
  FindNextFocusListener() {
    this.iBo(this.eBo + 1);
  }
  FindPrevFocusListener() {
    this.iBo(this.eBo - 1);
  }
}
exports.FunctionViewPanelHandle = FunctionViewPanelHandle;
//# sourceMappingURL=FunctionViewPanelHandle.js.map