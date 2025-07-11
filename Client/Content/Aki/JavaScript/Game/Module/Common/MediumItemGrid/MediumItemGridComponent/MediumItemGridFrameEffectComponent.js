"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridFrameEffectComponent = undefined;
const LevelSequencePlayer_1 = require("../../LevelSequencePlayer");
const MediumItemGridVisibleComponent_1 = require("./MediumItemGridVisibleComponent");
class MediumItemGridFrameEffectComponent extends MediumItemGridVisibleComponent_1.MediumItemGridVisibleComponent {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  GetResourceId() {
    return "UiItem_ItemAFetterVfx";
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SPe.PlayLevelSequenceByName("Loop");
  }
}
exports.MediumItemGridFrameEffectComponent = MediumItemGridFrameEffectComponent;
//# sourceMappingURL=MediumItemGridFrameEffectComponent.js.map