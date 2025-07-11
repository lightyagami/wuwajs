"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimelineControlGroup = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbControlPointEventConfig_1 = require("./FbControlPointEventConfig");
const UnionTimelineTrackControlConfigHelper_1 = require("./UnionTimelineTrackControlConfigHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTimelineControlGroup {
  constructor(i) {
    this.FbDataInternal = i;
    this.f_h = false;
    this.X6o = undefined;
    this.C_h = false;
    this.g_h = undefined;
    this.eHh = false;
    this.tHh = 0;
    this.iHh = false;
    this.rHh = undefined;
    this.oHh = false;
    this.nHh = undefined;
    this.sHh = false;
    this.aHh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbTimelineControlGroup(i);
    }
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get TidContent() {
    if (!this.C_h) {
      this.C_h = true;
      this.g_h = this.FbDataInternal.tidContent();
    }
    return this.g_h;
  }
  get SegmentTime() {
    if (!this.eHh) {
      this.eHh = true;
      this.tHh = this.FbDataInternal.segmentTime();
    }
    return this.tHh;
  }
  get ControlConfigs() {
    if (!this.iHh) {
      this.iHh = true;
      this.rHh = new Array();
      var t = this.FbDataInternal.controlConfigsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var o = this.FbDataInternal.controlConfigsType(i);
          var n = UnionTimelineTrackControlConfigHelper_1.UnionTimelineTrackControlConfigHelper.GetUnionTimelineTrackControlConfigObject(o);
          if (n && (o = UnionTimelineTrackControlConfigHelper_1.UnionTimelineTrackControlConfigHelper.ReadUnionTimelineTrackControlConfig(o, this.FbDataInternal.controlConfigs(i, n))) !== undefined) {
            this.rHh.push(o);
          }
        }
      }
    }
    return this.rHh;
  }
  get ControlPointEvents() {
    if (!this.oHh) {
      this.oHh = true;
      this.nHh = new Array();
      var t = this.FbDataInternal.controlPointEventsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var o = this.FbDataInternal.controlPointEvents(i, new fb_component_1.ControlPointEventConfig());
          this.nHh.push(FbControlPointEventConfig_1.FbControlPointEventConfig.Create(o));
        }
      }
    }
    return this.nHh;
  }
  get Description() {
    if (!this.sHh) {
      this.sHh = true;
      this.aHh = this.FbDataInternal.description();
    }
    return this.aHh;
  }
}
exports.FbTimelineControlGroup = FbTimelineControlGroup;
//# sourceMappingURL=FbTimelineControlGroup.js.map