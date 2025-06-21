"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardSpineComponent = void 0;
const UE = require("ue"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  CardComponentBase_1 = require("../CardComponentBase");
class CardSpineComponent extends CardComponentBase_1.CardComponentBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent]
    ]
  }
  OnStart() {
    this.SetActive(!0)
  }
  Refresh(e) {
    new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshAsync(e)
    }).Run()
  }
  async RefreshAsync(e) {
    var s = this.GetSpine(0),
      n = s.GetOwner().GetComponentByClass(UE.UIItem.StaticClass()),
      t = e.CardSpineData;
    e.ShowSpine ? (n.SetUIActive(!1), await this.SetSpineAssetByPath(t.CardSpineAtlasPath, t.CardSpineSkeletonPath, s), n.SetUIActive(!0), s.IsValid() && s.SetAnimation(0, t.AnimationName, t.IsLoop)) : n.SetUIActive(!1)
  }
}
exports.CardSpineComponent = CardSpineComponent;
//# sourceMappingURL=CardSpineComponent.js.map