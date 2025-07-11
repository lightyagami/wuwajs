"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionEntityBatchRefreshHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbRandomBatchPoolRefresh_1 = require("./FbRandomBatchPoolRefresh");
const FbRandomBatchRefresh_1 = require("./FbRandomBatchRefresh");
const FbSequenceBatchRefresh_1 = require("./FbSequenceBatchRefresh");
class UnionEntityBatchRefreshHelper {
  static GetUnionEntityBatchRefreshObject(e) {
    switch (e) {
      case fb_component_1.UnionEntityBatchRefresh.RandomBatchPoolRefresh:
        return new fb_component_1.RandomBatchPoolRefresh();
      case fb_component_1.UnionEntityBatchRefresh.RandomBatchRefresh:
        return new fb_component_1.RandomBatchRefresh();
      case fb_component_1.UnionEntityBatchRefresh.SequenceBatchRefresh:
        return new fb_component_1.SequenceBatchRefresh();
      default:
        return;
    }
  }
  static ReadUnionEntityBatchRefresh(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionEntityBatchRefresh.RandomBatchPoolRefresh:
          return FbRandomBatchPoolRefresh_1.FbRandomBatchPoolRefresh.Create(t);
        case fb_component_1.UnionEntityBatchRefresh.RandomBatchRefresh:
          return FbRandomBatchRefresh_1.FbRandomBatchRefresh.Create(t);
        case fb_component_1.UnionEntityBatchRefresh.SequenceBatchRefresh:
          return FbSequenceBatchRefresh_1.FbSequenceBatchRefresh.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionEntityBatchRefreshHelper = UnionEntityBatchRefreshHelper;
//# sourceMappingURL=UnionEntityBatchRefreshHelper.js.map