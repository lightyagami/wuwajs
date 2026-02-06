"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationAttrListScrollData = undefined;
const FormationPropertyById_1 = require("../../../../../Core/Define/ConfigQuery/FormationPropertyById");
const AttrListScrollData_1 = require("./AttrListScrollData");
class FormationAttrListScrollData extends AttrListScrollData_1.AttrListScrollData {
  V2m() {
    return FormationPropertyById_1.configFormationPropertyById.GetConfig(this.Id);
  }
  GetName() {
    return this.V2m().Name;
  }
  GetIcon() {
    return this.V2m().Icon;
  }
  GetDesc() {
    return this.V2m().Dec;
  }
}
exports.FormationAttrListScrollData = FormationAttrListScrollData;
//# sourceMappingURL=FormationAttrListScrollData.js.map