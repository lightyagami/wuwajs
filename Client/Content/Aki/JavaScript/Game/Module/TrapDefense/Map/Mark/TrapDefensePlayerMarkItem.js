"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefensePlayerMarkItem = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const TrapDefenseMarkItem_1 = require("./TrapDefenseMarkItem");
class TrapDefensePlayerMarkItem extends TrapDefenseMarkItem_1.TrapDefenseMarkItem {
  OnInitialize() {}
  get MarkType() {
    return 1;
  }
  get WorldPosition() {
    return GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ?? Vector_1.Vector.ZeroVectorProxy;
  }
}
exports.TrapDefensePlayerMarkItem = TrapDefensePlayerMarkItem;
//# sourceMappingURL=TrapDefensePlayerMarkItem.js.map