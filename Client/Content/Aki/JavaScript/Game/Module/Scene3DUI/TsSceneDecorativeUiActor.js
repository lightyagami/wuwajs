"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const TsSceneUiTag_1 = require("./TsSceneUiTag");
class TsSceneDecorativeUiActor extends TsSceneUiTag_1.default {
  constructor() {
    super(...arguments);
    this.ShowDistance = 0;
    this.IsFaceToCharacter = false;
    this.IsControlledInternal = false;
    this.InShowInternal = false;
    this.EditorUiActor = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsControlledInternal = false;
    this.InShowInternal = false;
    this.EditorUiActor = undefined;
  }
  set IsControlled(t) {
    this.IsControlledInternal = t;
  }
  get IsControlled() {
    return this.IsControlledInternal;
  }
  set InShow(t) {
    this.InShowInternal = t;
  }
  get InShow() {
    return this.InShowInternal;
  }
  Create3dUi() {}
  Destroy3dUi() {
    if (this.EditorUiActor) {
      ActorSystem_1.ActorSystem.Put("TsSceneDecorativeUiActor.Destroy3dUi", this.EditorUiActor);
      this.EditorUiActor = undefined;
    }
  }
  DrawDistance() {
    UE.KismetSystemLibrary.D_DrawDebugSphere(this, this.D_K2_GetActorLocation(), this.ShowDistance, 12, ColorUtils_1.ColorUtils.LinearRed, 5);
  }
  OnCanTick() {
    return !this.IsControlled && this.CalculateSquaredDistance() <= this.ShowDistance * this.ShowDistance;
  }
}
exports.default = TsSceneDecorativeUiActor;
//# sourceMappingURL=TsSceneDecorativeUiActor.js.map