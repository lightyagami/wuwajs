"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefensePhantomPointMarkItem = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TrapDefenseMarkItem_1 = require("./TrapDefenseMarkItem");
class TrapDefensePhantomPointMarkItem extends TrapDefenseMarkItem_1.TrapDefenseMarkItem {
  constructor(e, t) {
    super(e, t);
    this.$9c = [];
    this.W9c = 0;
    [this.W9c, this.$9c] = t ?? [];
  }
  get PhantomPoint() {
    return this.$9c[0] ?? Vector_1.Vector.ZeroVectorProxy;
  }
  get PhantomRoutePoints() {
    return this.$9c;
  }
  get SplineId() {
    return this.W9c;
  }
  get MarkType() {
    return 2;
  }
  OnInitialize() {
    this.EnableCachePosition = true;
  }
  get WorldPosition() {
    return this.PhantomPoint;
  }
  IsActivated() {
    return ModelManager_1.ModelManager.TrapDefenseModel.GetCurrentBatchData().SplineList.includes(this.SplineId);
  }
}
exports.TrapDefensePhantomPointMarkItem = TrapDefensePhantomPointMarkItem;
//# sourceMappingURL=TrapDefensePhantomPointMarkItem.js.map