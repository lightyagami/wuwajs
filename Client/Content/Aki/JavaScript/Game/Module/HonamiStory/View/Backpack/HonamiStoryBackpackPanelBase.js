"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackPanelBase = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class HonamiStoryBackpackPanelBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnEnterGridCb = undefined;
    this.OnExitGridCb = undefined;
    this.OnDownGridCb = undefined;
    this.OnCheckAttrGridCb = undefined;
    this.OnClickedGridCb = undefined;
    this.OnEnterItem = e => {
      if (this.OnEnterGridCb) {
        this.OnEnterGridCb(e, this.GetBackpackType());
      }
    };
    this.OnExitItem = () => {
      if (this.OnExitGridCb) {
        this.OnExitGridCb();
      }
    };
    this.OnDownItem = () => {
      if (this.OnDownGridCb) {
        this.OnDownGridCb();
      }
    };
    this.OnClickItem = (e, t, a) => {
      if (this.OnClickedGridCb) {
        this.OnClickedGridCb(e, t, a, this.GetBackpackType());
      }
    };
    this.OnCheckAttrItem = (e, t) => {
      if (this.OnCheckAttrGridCb) {
        this.OnCheckAttrGridCb(e, t);
      }
    };
    this.InteractController = undefined;
  }
  RegisterDragController(e) {
    this.InteractController = e;
  }
  OnDragBegin(e, t) {
    this.InteractController.DragBegin(this, t);
    return true;
  }
  OnDrag(e, t) {
    this.InteractController.OnDrag(e);
    return true;
  }
  OnDragEnd(e, t) {
    this.InteractController.DragEnd(e, t);
  }
  RefreshSingleItem(e) {}
  GetCurrentGridListGamepad() {
    return [];
  }
  CheckPositionValidGamepad(e) {
    return false;
  }
  OnScrollValueChangedGamepad(e) {}
  OnScrollToTopOrBottomGamepad(e) {}
  OnHoverGamepad(e, t, a) {}
  GetUpdateInfoInSameBackpackGamepad(e, t) {}
  GetUpdateInfoInSendBackpackGamepad(e, t, a) {}
  GetUpdateInfoInReceiveBackpackGamepad(e, t, a) {}
  GetExchangeItemSetGamepad(e, t) {}
}
exports.HonamiStoryBackpackPanelBase = HonamiStoryBackpackPanelBase;
//# sourceMappingURL=HonamiStoryBackpackPanelBase.js.map