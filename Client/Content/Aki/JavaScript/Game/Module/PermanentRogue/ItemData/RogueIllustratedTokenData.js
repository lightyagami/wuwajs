"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueEventViewData = exports.RogueTokenViewData = undefined;
class RogueTokenViewData {
  constructor(e) {
    this.K6c = e;
  }
  SetTokenViewInfo(e) {
    this.K6c = e;
  }
  GetTokenViewInfo() {
    return this.K6c;
  }
  GetConfigId() {
    return this.K6c.ConfigId;
  }
  GetCollectionIndex() {
    return this.K6c.CollectionIndex;
  }
  SetSelectOn(e) {
    this.K6c.IsSelectOn = e;
  }
}
exports.RogueTokenViewData = RogueTokenViewData;
class RogueEventViewData {
  constructor(e) {
    this.K6c = e;
  }
  SetTokenViewInfo(e) {
    this.K6c = e;
  }
  GetTokenViewInfo() {
    return this.K6c;
  }
  SetIsLock(e) {
    this.K6c.IsLock = e;
  }
  GetConfigId() {
    return this.K6c.ConfigId;
  }
  SetSelectOn(e) {
    this.K6c.IsSelectOn = e;
  }
  GetSelectOn() {
    return this.K6c.IsSelectOn;
  }
}
exports.RogueEventViewData = RogueEventViewData;
//# sourceMappingURL=RogueIllustratedTokenData.js.map