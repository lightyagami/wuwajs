"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBaIconHandle = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
class SpecialEnergyBaIconHandle {
  constructor() {
    this.B1l = undefined;
    this.OOi = undefined;
    this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
    this.gdt = false;
    this.fdt = undefined;
  }
  Init(s, e = undefined) {
    this.B1l = s;
    this.OOi = e;
  }
  SetIcon(s) {
    for (const e of this.B1l) {
      e.SetUIActive(false);
    }
    if (s) {
      this.Cdt = ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.Texture2D, s => {
        this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
        if (s) {
          for (const e of this.B1l) {
            e.SetUIActive(true);
            e.SetTexture(s);
          }
        }
      }, 103);
    }
  }
  PlayEndAnim(s) {
    if (this.gdt !== s) {
      this.gdt = s;
      this.Est();
      if (s) {
        for (const e of this.fdt) {
          e.Play();
        }
      } else {
        for (const t of this.fdt) {
          t.Stop();
        }
        for (const i of this.B1l) {
          i.SetAlpha(1);
        }
      }
    }
  }
  Est() {
    if (!this.fdt && (this.fdt = [], this.OOi)) {
      var e = this.OOi.GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
      for (let s = 0; s < e.Num(); s++) {
        var t = e.Get(s);
        this.fdt.push(t);
      }
    }
  }
  OnBeforeDestroy() {
    this.PlayEndAnim(false);
    if (this.Cdt !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Cdt);
      this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
}
exports.SpecialEnergyBaIconHandle = SpecialEnergyBaIconHandle;
//# sourceMappingURL=SpecialEnergyBaIconHandle.js.map