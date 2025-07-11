"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingTitleItem = undefined;
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingTitleItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  OnStart() {
    if (this.$pt === undefined) {
      this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    }
  }
  OnBeforeDestroy() {
    this.$pt &&= undefined;
    this.Data &&= undefined;
  }
  Update(e) {
    this.Data = e;
    this.mGe();
  }
  mGe() {
    this.SetSpriteByPath(this.Data.SubImage, this.GetSprite(0), false);
    this.GetText(1).ShowTextNew(this.Data.SubName ?? "");
  }
  PlaySequenceFromName(e) {
    this.$pt?.PlayLevelSequenceByName(e);
  }
  SetInteractionActive(e) {}
}
exports.MenuScrollSettingTitleItem = MenuScrollSettingTitleItem;
//# sourceMappingURL=MenuScrollSettingTitleItem.js.map