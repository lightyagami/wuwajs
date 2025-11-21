"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationAttrListScrollData = undefined;
const FormationPropertyById_1 = require("../../../../../Core/Define/ConfigQuery/FormationPropertyById");
const AttrListScrollData_1 = require("./AttrListScrollData");
class FormationAttrListScrollData extends AttrListScrollData_1.AttrListScrollData {
  WMm() {
    return FormationPropertyById_1.configFormationPropertyById.GetConfig(this.Id);
  }
  GetName() {
    return this.WMm().Name;
  }
  GetIcon() {
    return this.WMm().Icon;
  }
  GetDesc() {
    return this.WMm().Dec;
  }
}
exports.FormationAttrListScrollData = FormationAttrListScrollData;
//# sourceMappingURL=FormationAttrListScrollData.js.map