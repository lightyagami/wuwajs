"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatLightForestMarkItemView = undefined;
const UE = require("ue");
const MarkEffectByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MarkEffectByMarkId");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class FloatLightForestMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.gRi = undefined;
  }
  async OnBeforeStartAsync() {
    await this.fRi();
  }
  OnBeforeDestroy() {
    this.d8_();
    super.OnBeforeDestroy();
  }
  async fRi() {
    var e = MarkEffectByMarkId_1.configMarkEffectByMarkId.GetConfig(this.Holder.MarkId);
    if (e) {
      e = await this.LoadPrefabAsync(e.EffectResourcePath, this.RootItem);
      this.gRi = e.GetComponentByClass(UE.UIItem.StaticClass());
    }
  }
  d8_() {
    if (this.gRi) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.gRi.GetOwner(), true);
      this.gRi = undefined;
    }
  }
  SetScale(e) {}
  GetInteractiveFlag() {
    return false;
  }
}
exports.FloatLightForestMarkItemView = FloatLightForestMarkItemView;
//# sourceMappingURL=FloatLightForestMarkItemView.js.map