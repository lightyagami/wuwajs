"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelSequenceFrameEventComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbLevelSequenceSectionInfo_1 = require("./FbLevelSequenceSectionInfo");
class FbLevelSequenceFrameEventComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.BYh = false;
    this.qYh = undefined;
    this.kYh = false;
    this.GYh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbLevelSequenceFrameEventComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ForwardSections() {
    if (!this.BYh) {
      this.BYh = true;
      this.qYh = new Array();
      var t = this.FbDataInternal.forwardSectionsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.forwardSections(e, new fb_component_1.LevelSequenceSectionInfo());
          this.qYh.push(FbLevelSequenceSectionInfo_1.FbLevelSequenceSectionInfo.Create(i));
        }
      }
    }
    return this.qYh;
  }
  get BackWardSections() {
    if (!this.kYh) {
      this.kYh = true;
      this.GYh = new Array();
      var t = this.FbDataInternal.backWardSectionsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.backWardSections(e, new fb_component_1.LevelSequenceSectionInfo());
          this.GYh.push(FbLevelSequenceSectionInfo_1.FbLevelSequenceSectionInfo.Create(i));
        }
      }
    }
    return this.GYh;
  }
}
exports.FbLevelSequenceFrameEventComponent = FbLevelSequenceFrameEventComponent;
//# sourceMappingURL=FbLevelSequenceFrameEventComponent.js.map