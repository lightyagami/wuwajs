"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionConveyorBeltFieldTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbDirectionalField_1 = require("./FbDirectionalField");
const FbPointField_1 = require("./FbPointField");
class UnionConveyorBeltFieldTypeHelper {
  static GetUnionConveyorBeltFieldTypeObject(e) {
    switch (e) {
      case fb_component_1.UnionConveyorBeltFieldType.DirectionalField:
        return new fb_component_1.DirectionalField();
      case fb_component_1.UnionConveyorBeltFieldType.PointField:
        return new fb_component_1.PointField();
      default:
        return;
    }
  }
  static ReadUnionConveyorBeltFieldType(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionConveyorBeltFieldType.DirectionalField:
          return FbDirectionalField_1.FbDirectionalField.Create(n);
        case fb_component_1.UnionConveyorBeltFieldType.PointField:
          return FbPointField_1.FbPointField.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionConveyorBeltFieldTypeHelper = UnionConveyorBeltFieldTypeHelper;
//# sourceMappingURL=UnionConveyorBeltFieldTypeHelper.js.map