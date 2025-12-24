"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationAttrListScrollData = undefined;
const FormationPropertyById_1 = require("../../../../../Core/Define/ConfigQuery/FormationPropertyById");
const AttrListScrollData_1 = require("./AttrListScrollData");
class FormationAttrListScrollData extends AttrListScrollData_1.AttrListScrollData {
  GBm() {
    return FormationPropertyById_1.configFormationPropertyById.GetConfig(this.Id);
  }
  GetName() {
    return this.GBm().Name;
  }
  GetIcon() {
    return this.GBm().Icon;
  }
  GetDesc() {
    return this.GBm().Dec;
  }
}
exports.FormationAttrListScrollData = FormationAttrListScrollData;
//# sourceMappingURL=FormationAttrListScrollData.js.map