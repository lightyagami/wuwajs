"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardSpineComponent = undefined;
const UE = require("ue");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const CardComponentBase_1 = require("../CardComponentBase");
class CardSpineComponent extends CardComponentBase_1.CardComponentBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent]];
  }
  OnStart() {
    this.SetActive(true);
  }
  Refresh(e) {
    new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshAsync(e);
    }).Run();
  }
  async RefreshAsync(e) {
    var s = this.GetSpine(0);
    var n = s.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
    var t = e.CardSpineData;
    if (e.ShowSpine) {
      n.SetUIActive(false);
      await this.SetSpineAssetByPath(t.CardSpineAtlasPath, t.CardSpineSkeletonPath, s);
      n.SetUIActive(true);
      if (s.IsValid()) {
        s.SetAnimation(0, t.AnimationName, t.IsLoop);
      }
    } else {
      n.SetUIActive(false);
    }
  }
}
exports.CardSpineComponent = CardSpineComponent;
//# sourceMappingURL=CardSpineComponent.js.map