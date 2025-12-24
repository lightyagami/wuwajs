"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryEquipItemGridItem = undefined;
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const HonamiStoryUtil_1 = require("../../../HonamiStoryUtil");
const HonamiStoryItemGridItem_1 = require("./HonamiStoryItemGridItem");
class HonamiStoryEquipItemGridItem extends HonamiStoryItemGridItem_1.HonamiStoryItemGridItem {
  constructor() {
    super(...arguments);
    this.g1m = undefined;
  }
  RefreshLogicData() {
    this.SetLockItemEnable(this.ItemData.IsLock(), false);
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    this.SetReplaceEnable(e === 3);
  }
  ExecuteDoubleClickLogic() {
    var e = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() ? 2 : 1;
    if (!ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(this.ItemData, 4, e)) {
      if (UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView") === undefined) {
        ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(this.ItemData, 4, 3);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoEnoughSpace");
      }
    }
  }
  DoLogicStateFunc(e) {
    var r;
    var i;
    if (e === 3) {
      r = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic();
      i = this.ItemData.GetPosition();
      r.DoTipsWithPluginsInstead(i, this.ItemData);
      this.CancelToggleSelect();
    } else if (e === 1 || e === 2) {
      e = (i = (r = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()).TipsItem).GetItemDataOut();
      r?.CloseTips();
      if (this.ItemData === e) {
        i.SetItemDataOut(e);
      }
      this.OnClickedToggle();
    }
  }
  SetReplaceEnable(e) {
    this.g1m?.SetUiActive(e);
    if (e && !this.g1m) {
      this.g1m = new UiPanelBase_1.UiPanelBase();
      this.g1m.CreateThenShowByResourceIdAsync("SprChange", this.RootItem).then(() => {
        var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
        this.g1m?.SetUiActive(e === 3);
      });
    }
  }
}
exports.HonamiStoryEquipItemGridItem = HonamiStoryEquipItemGridItem;
//# sourceMappingURL=HonamiStoryEquipItemGridItem.js.map