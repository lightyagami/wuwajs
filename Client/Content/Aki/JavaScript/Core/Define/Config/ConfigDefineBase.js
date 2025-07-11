"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypeInfo = exports.ConfigBase = undefined;
class ConfigBase {
  constructor() {
    this.RowId = 0;
  }
}
function createTypeInfo(e, r, o, t, s) {
  const a = new Array();
  const n = new Array();
  t.forEach(e => {
    e = {
      Name: e[0],
      Type: e[1]
    };
    a.push(e);
  });
  s.forEach(e => {
    e = {
      Name: e[0],
      Type: e[1]
    };
    n.push(e);
  });
  return {
    Name: e,
    ExcelFileName: r,
    Ctor: o,
    ConfigKey: a,
    DeserializeKey: n
  };
}
exports.ConfigBase = ConfigBase;
exports.createTypeInfo = createTypeInfo; //# sourceMappingURL=ConfigDefineBase.js.map