"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortConfig = undefined;
const FilterSortConfigById_1 = require("../../../../../../Core/Define/ConfigQuery/FilterSortConfigById");
const FilterSortGroupById_1 = require("../../../../../../Core/Define/ConfigQuery/FilterSortGroupById");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const SortById_1 = require("../../../../../../Core/Define/ConfigQuery/SortById");
const SortRuleByIdAndDataId_1 = require("../../../../../../Core/Define/ConfigQuery/SortRuleByIdAndDataId");
const ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
class SortConfig extends ConfigBase_1.ConfigBase {
  GetSortConfig(e) {
    return SortById_1.configSortById.GetConfig(e);
  }
  GetSortRuleName(e, r) {
    e = SortRuleByIdAndDataId_1.configSortRuleByIdAndDataId.GetConfig(e, r);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "";
  }
  GetSortRuleIcon(e, r) {
    return SortRuleByIdAndDataId_1.configSortRuleByIdAndDataId.GetConfig(e, r).Icon;
  }
  GetSortRuleAddType(e, r) {
    return SortRuleByIdAndDataId_1.configSortRuleByIdAndDataId.GetConfig(e, r).AddType;
  }
  GetSortRuleAttributeId(e, r) {
    return SortRuleByIdAndDataId_1.configSortRuleByIdAndDataId.GetConfig(e, r).AttributeId;
  }
  GetSortId(e) {
    return FilterSortGroupById_1.configFilterSortGroupById.GetConfig(e).SortId;
  }
  IsConfigSortSave(e, r) {
    e = FilterSortConfigById_1.configFilterSortConfigById.GetConfig(e);
    return !!e && e.SaveGroupId.includes(r);
  }
  GetConfigSortFormatId(e, r, t = "") {
    let o = e.toString() + "_" + r.toString();
    if (!StringUtils_1.StringUtils.IsBlank(t)) {
      o += "_" + t;
    }
    return o;
  }
}
exports.SortConfig = SortConfig;
//# sourceMappingURL=SortConfig.js.map