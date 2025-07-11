"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionSlotItem = exports.VisionSlotData = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionSlotData {
  constructor() {
    this.SlotState = 0;
  }
}
exports.VisionSlotData = VisionSlotData;
class VisionSlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(s) {
    super();
    this.CreateThenShowByActor(s.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  Update(s) {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    if (s.SlotState === 0) {
      this.GetItem(0).SetUIActive(true);
    } else if (s.SlotState === 2) {
      this.GetItem(1).SetUIActive(true);
    } else if (s.SlotState === 1) {
      this.GetItem(2).SetUIActive(true);
    } else if (s.SlotState === 3) {
      this.GetItem(3).SetUIActive(true);
    }
  }
}
exports.VisionSlotItem = VisionSlotItem;
//# sourceMappingURL=VisionSlotItem.js.map