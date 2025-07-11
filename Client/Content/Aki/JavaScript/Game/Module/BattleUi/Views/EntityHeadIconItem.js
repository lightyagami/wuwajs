"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityHeadIconItem = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class EntityHeadIconItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.EntityId = 0;
    this.EntityHandle = undefined;
    this.PawnHeadInfoComponent = undefined;
    this.HeadDialogVisible = false;
  }
  InitEntityId(e) {
    this.EntityId = e;
    this.EntityHandle = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    this.PawnHeadInfoComponent = this.EntityHandle?.Entity?.GetComponent(82);
  }
  Update() {
    this.RefreshAlpha();
  }
  RefreshAlpha() {
    var e;
    if (this.RootItem && (e = this.GetHeadDialogVisible()) !== this.HeadDialogVisible) {
      this.HeadDialogVisible = e;
      this.RootItem.SetAlpha(e ? 0.2 : 1);
    }
  }
  GetHeadDialogVisible() {
    return !!this.EntityHandle?.Valid && (this.PawnHeadInfoComponent?.IsDialogTextActive() ?? false);
  }
}
exports.EntityHeadIconItem = EntityHeadIconItem;
//# sourceMappingURL=EntityHeadIconItem.js.map