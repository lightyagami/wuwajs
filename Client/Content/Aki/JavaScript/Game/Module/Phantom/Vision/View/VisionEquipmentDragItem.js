"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionEquipmentDragItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisionFetterSuitItem_1 = require("./VisionFetterSuitItem");
class VisionEquipmentDragItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.wqe = undefined;
    this.bxt = undefined;
    this.wqe = e;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIDraggableComponent], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(3));
    await this.bxt.Init();
    this.bxt.SetActive(false);
  }
  OnStart() {}
  GetDragComponent() {
    return this.GetDraggable(2);
  }
  UpdateItem(e) {
    var t = e.GetQuality();
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(t);
    var i = e.GetFetterGroupConfig();
    this.bxt.Update(i);
    this.SetSpriteByPath(t, this.GetSprite(0), false);
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.GetConfigId(true));
    this.SetTextureByPath(i.IconMiddle, this.GetTexture(1));
  }
}
exports.VisionEquipmentDragItem = VisionEquipmentDragItem;
//# sourceMappingURL=VisionEquipmentDragItem.js.map