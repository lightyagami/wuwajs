"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionAssemblePanelHandle = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiNavigationNewController_1 = require("../UiNavigationNewController");
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class VisionAssemblePanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.u6_ = undefined;
    this.IsInCompare = false;
    this.wbo = e => {
      UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
      if (e) {
        ModelManager_1.ModelManager.UiNavigationModel.MarkMoveInstantly();
      }
    };
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionAssembleNavigationRefresh, this.wbo);
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionAssembleNavigationRefresh, this.wbo);
  }
  OnGetSuitableNavigationListenerList(e) {
    if (e) {
      return super.OnGetSuitableNavigationListenerList(e);
    }
    if (!this.u6_) {
      this.u6_ = [];
      for (const n of this.DefaultNavigationListener) {
        if (n.IsScrollOrLayoutActor()) {
          this.u6_.push(n);
        }
      }
    }
    return this.u6_;
  }
}
exports.VisionAssemblePanelHandle = VisionAssemblePanelHandle;
//# sourceMappingURL=VisionAssemblePanelHandle.js.map