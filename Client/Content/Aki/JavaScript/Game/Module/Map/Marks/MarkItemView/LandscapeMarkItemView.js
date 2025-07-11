"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LandscapeMarkItemView = undefined;
const UE = require("ue");
const MarkEffectByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MarkEffectByMarkId");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class LandscapeMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.gRi = undefined;
  }
  OnInitialize() {
    super.OnInitialize();
    this.fRi();
  }
  OnReset() {
    super.OnReset();
    this.d8_();
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
      e = e.GetComponentByClass(UE.UINiagara.StaticClass());
      if (this.Holder?.MapType === 2) {
        e.bAdaptPosAndSizeChanged = false;
      } else {
        e.bAdaptPosAndSizeChanged = true;
      }
    }
  }
  d8_() {
    if (this.gRi) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.gRi.GetOwner(), true);
      this.gRi = undefined;
    }
  }
  OnBeforeDestroy() {
    this.d8_();
    super.OnBeforeDestroy();
  }
  SetScale(e) {}
}
exports.LandscapeMarkItemView = LandscapeMarkItemView;
//# sourceMappingURL=LandscapeMarkItemView.js.map