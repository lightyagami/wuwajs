"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigTypeInfo = exports.ConfigMap = undefined;
const ConfigDefineBase_1 = require("./ConfigDefineBase");
class ConfigMap extends ConfigDefineBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.TableName = "";
    this.ConfigDb = "";
    this.TextDb = "";
  }
}
function getConfigTypeInfo() {
  return ["tableMap", (0, ConfigDefineBase_1.createTypeInfo)("ConfigMap", "ConfigMap", ConfigMap, [["RowId", "Int"], ["TableName", "String"], ["ConfigDb", "String"], ["TextDb", "String"]], [])];
}
exports.ConfigMap = ConfigMap;
exports.getConfigTypeInfo = getConfigTypeInfo; //# sourceMappingURL=ConfigMap.js.map