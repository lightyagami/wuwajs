"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGridFog = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class MapRogueGridFog extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.x3c = false;
  }
  OnRegisterComponent() {}
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetVision(e, s) {
    var i;
    var t;
    if (this.x3c !== e) {
      if (this.x3c = e) {
        e = ["Disappear", "Disappear1", "Disappear2"];
        i = Math.floor(Math.random() * e.length);
        t = new CustomPromise_1.CustomPromise();
        this.LevelSequencePlayer.PlaySequenceAsync(e[i], t).finally(() => {
          this.SetActive(false);
        });
      } else {
        this.SetActive(true);
      }
    }
  }
}
exports.MapRogueGridFog = MapRogueGridFog;
//# sourceMappingURL=MapRogueGridFog.js.map