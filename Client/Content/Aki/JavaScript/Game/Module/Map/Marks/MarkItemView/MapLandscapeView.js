"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LandscapeMarkView = undefined;
const UE = require("ue");
const MarkEffectByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MarkEffectByMarkId");
const MarkItemView_1 = require("./MarkItemView");
class LandscapeMarkView extends MarkItemView_1.MarkItemView {
  constructor(e) {
    super(e);
    this.gRi = undefined;
  }
  OnInitialize() {
    super.OnInitialize();
    this.fRi();
  }
  GetInteractiveFlag() {
    return false;
  }
  async fRi() {
    var e = MarkEffectByMarkId_1.configMarkEffectByMarkId.GetConfig(this.Holder.MarkId);
    if (e) {
      e = await this.LoadPrefabAsync(e.EffectResourcePath, this.RootItem);
      this.gRi = e.GetComponentByClass(UE.UIItem.StaticClass());
    }
  }
  OnBeforeDestroy() {
    if (this.gRi) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.gRi.GetOwner(), true);
    }
    super.OnBeforeDestroy();
  }
}
exports.LandscapeMarkView = LandscapeMarkView;
//# sourceMappingURL=MapLandscapeView.js.map