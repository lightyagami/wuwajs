"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryEquipTabView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const HonamiStoryBackpackPanel_1 = require("./Backpack/HonamiStoryBackpackPanel");
const HonamiStoryEquipBackpackPanel_1 = require("./Backpack/HonamiStoryEquipBackpackPanel");
const HonamiStoryInteractController_1 = require("./Backpack/HonamiStoryInteractController");
class HonamiStoryEquipTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.Rgd = undefined;
    this.BackpackPanel = undefined;
    this.DragController = new HonamiStoryInteractController_1.HonamiStoryInteractController();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.DragController.Init(this.GetItem(3)), this.$Xl(), this.wgd()]);
  }
  OnBeforeShow() {
    this.DragController.OnBeforeShow();
  }
  async wgd() {
    var a = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData();
    this.Rgd = new HonamiStoryEquipBackpackPanel_1.HonamiStoryEquipBackpackPanel();
    this.DragController.RegisterPanel(this.Rgd);
    this.Rgd.RegisterDragController(this.DragController);
    await this.Rgd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.Rgd.Init(a);
  }
  async $Xl() {
    var a = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1);
    this.BackpackPanel = new HonamiStoryBackpackPanel_1.HonamiStoryBackpackPanel();
    this.DragController.RegisterPanel(this.BackpackPanel);
    this.BackpackPanel.RegisterDragController(this.DragController);
    await this.BackpackPanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    await this.BackpackPanel.Init(a);
  }
  GetGuideUiItemAndUiItemForShowEx(a) {
    var e;
    if (a.length !== 0) {
      if ((e = a[0]) === "RolePanel" || e === "Equips" || e === "AddBtn" || e === "UpdateBtn") {
        return this.Rgd?.GetGuideUiItemAndUiItemForShowEx(a);
      } else if (e === "BtnSell" || e === "ToggleSelect" || e === "BtnReset") {
        return this.BackpackPanel?.GetGuideUiItemAndUiItemForShowEx(a);
      } else {
        return undefined;
      }
    }
  }
}
exports.HonamiStoryEquipTabView = HonamiStoryEquipTabView;
//# sourceMappingURL=HonamiStoryEquipTabView.js.map