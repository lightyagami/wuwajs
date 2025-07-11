"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueGetListItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ListSliderControl_1 = require("../../../ItemHint/Views/ListSliderControl");
class RogueGetListItem extends ListSliderControl_1.SliderItem {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.Data = undefined;
    this.K3t = e => {
      if (e === "Start") {
        this.FinishPlayStart();
      } else if (e === "Close") {
        this.FinishPlayEnd();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.K3t);
  }
  OnBeforeDestroy() {
    if (this.LevelSequencePlayer) {
      this.LevelSequencePlayer.Clear();
      this.LevelSequencePlayer = undefined;
    }
  }
  PlayStart() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  PlayEnd() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
  }
  OnActiveStatusChange(e) {}
  async AsyncLoadUiResource() {
    this.Data = ModelManager_1.ModelManager.MapRogueModel.ShiftGetItemData();
    if (this.Data) {
      await this.Refresh(this.Data);
    }
  }
  async Refresh(e) {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.ItemId);
    if (t) {
      this.SetTextureShowUntilLoaded(t.IconSmall, this.GetTexture(0));
      t = e.ChangeCount > 0 ? "+" + e.ChangeCount : e.ChangeCount.toString();
      this.GetText(1).SetText(t);
    }
  }
}
exports.RogueGetListItem = RogueGetListItem;
//# sourceMappingURL=RogueGetListItem.js.map