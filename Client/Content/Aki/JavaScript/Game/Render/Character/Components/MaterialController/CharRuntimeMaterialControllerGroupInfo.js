"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharMaterialControlRuntimeDataGroup = undefined;
const MapUtils_1 = require("../../../../../Core/Utils/MapUtils");
const RenderModuleController_1 = require("../../../Manager/RenderModuleController");
class CharMaterialControlRuntimeDataGroup {
  constructor() {
    this.CharRenderingComponent = undefined;
    this.DataGroup = undefined;
    this.AnimObject = undefined;
    this.IsDead = false;
    this.DataMap = undefined;
    this.xhr = undefined;
    this.Plr = undefined;
    this.xlr = undefined;
    this.wlr = -0;
    this.Blr = false;
    this.blr = false;
  }
  Init(s, t, i) {
    this.CharRenderingComponent = s;
    this.DataGroup = t;
    this.DataMap = new Map();
    this.xhr = [];
    this.Plr = [];
    this.xlr = [];
    this.IsDead = false;
    this.AnimObject = i;
    this.wlr = 0;
    this.Blr = false;
    MapUtils_1.MapUtils.ForEach(this.DataGroup.DataMap, (t, i) => {
      if (this.wlr < i) {
        this.wlr = i;
      }
      this.Blr = this.Blr || t.DataType === 1;
      if (i > 0) {
        this.DataMap.set(t, i);
      } else {
        this.Plr.push(s.AddMaterialControllerDataWithAnimObject(t, this.AnimObject));
      }
    });
  }
  BeforeUpdateState(t, i) {
    this.blr ||= this.DataGroup.IgnoreTimeDilation;
    let s = t;
    if (this.blr || !RenderModuleController_1.RenderModuleController.IsGamePaused) {
      if (!this.blr) {
        s = t * i;
      }
      this.wlr -= s;
      this.DataMap.forEach((t, i) => {
        t -= s;
        if (t <= 0) {
          this.Plr.push(this.CharRenderingComponent.AddMaterialControllerData(i));
          this.xhr.push(i);
        } else {
          this.DataMap.set(i, t);
        }
      });
      if (this.xhr.length > 0) {
        for (const h of this.xhr) {
          this.DataMap.delete(h);
        }
      }
      this.xhr = [];
    }
  }
  AfterUpdateState(t) {
    if (!this.Blr && this.wlr <= 0) {
      this.xlr = [];
      for (let t = 0; t < this.Plr.length; t++) {
        if (this.CharRenderingComponent.IsMaterialControllerDataValid(this.Plr[t])) {
          this.xlr.push(this.Plr[t]);
        }
      }
      this.Plr = this.xlr;
      this.IsDead = this.Plr.length === 0 && this.DataMap.size === 0;
    }
  }
  EndState() {
    this.xhr = [];
    this.DataMap.clear();
    this.Plr.forEach(t => {
      this.CharRenderingComponent.RemoveMaterialControllerData(t);
    });
    this.IsDead = true;
  }
  EndStateWithEnding() {
    this.xhr = [];
    this.DataMap.clear();
    this.Plr.forEach(t => {
      this.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(t);
    });
    this.IsDead = true;
  }
  SetEffectProgress(i) {
    this.Plr.forEach(t => {
      this.CharRenderingComponent.SetEffectProgress(i, t);
    });
  }
}
exports.CharMaterialControlRuntimeDataGroup = CharMaterialControlRuntimeDataGroup;
//# sourceMappingURL=CharRuntimeMaterialControllerGroupInfo.js.map