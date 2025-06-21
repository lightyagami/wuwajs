"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getBulletMapConfigFromCsv = exports.getTagsConfigFromCsv = exports.getBuffConfigFromCsv = void 0;
const BuffCsv_1 = require("../CsvConfig/BuffCsv"),
  BulletCsv_1 = require("../CsvConfig/BulletCsv"),
  CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  TagCsv_1 = require("../CsvConfig/TagCsv");

function getBuffConfigFromCsv() {
  var s = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(BuffCsv_1.BuffCsv);
  const r = {};
  return s.forEach(s => {
    var e = s.BuffId,
      s = s.Description;
    r[e] = s
  }), r
}

function getTagsConfigFromCsv() {
  var s = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(TagCsv_1.TagCsv);
  const r = {};
  return s.forEach(s => {
    var e = s.Tag,
      s = s.Description;
    r[e] = s
  }), r
}

function getBulletMapConfigFromCsv() {
  var s = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(BulletCsv_1.BulletCsv);
  const r = {};
  return s.forEach(s => {
    var e = s.BulletId,
      s = s.Description;
    r[e] = s
  }), r
}
exports.getBuffConfigFromCsv = getBuffConfigFromCsv, exports.getTagsConfigFromCsv = getTagsConfigFromCsv, exports.getBulletMapConfigFromCsv = getBulletMapConfigFromCsv;
//# sourceMappingURL=Combat.js.map