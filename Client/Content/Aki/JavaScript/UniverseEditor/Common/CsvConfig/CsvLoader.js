"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CsvMapFieldResolver = exports.CsvLoader = exports.GlobalCsv = exports.createCsvField = exports.parseCsvValue = exports.csvCellTypeConfig = void 0;
const BranchDefine_1 = require("../BranchDefine"),
  CsvParser_1 = require("../Misc/CsvParser"),
  File_1 = require("../Misc/File"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Misc/Util");

function parseCsvValue(r, e) {
  return exports.csvCellTypeConfig[e].Parse(r)
}
exports.csvCellTypeConfig = {
  Int: {
    Default: 0,
    Parse: r => parseInt(r, 10),
    Desc: "整形"
  },
  String: {
    Default: "",
    Parse: r => r,
    Desc: "字符串"
  },
  Boolean: {
    Default: !1,
    Parse: r => Boolean(r),
    Desc: "布尔型"
  },
  Float: {
    Default: 0,
    Parse: r => parseFloat(r),
    Desc: "浮点型"
  },
  UiResource: {
    Default: "",
    Parse: r => r,
    Desc: "UI资源"
  }
}, exports.parseCsvValue = parseCsvValue;
const customExportType = ["C", "S", "CS", "", "@Tag", "@Version"],
  customValueType = ["Int", "String", "Long", "Long54", "Bool", "Float", "Array<Int>", "Array<String>", "Array<GameplayTag>", "Array<String> && ReplaceIfMatch(EntityCommonTagInfo.TagName,EntityCommonTagInfo.UglyTagName)", "Array<Float>", "Array<Long>", "Array<Long54>", "Array<IntArray>", "Map<Int,Int>", ""],
  customBoolType = ["1", "0", ""],
  valueTypeByRenderType = {
    [0]: "String",
    1: "Bool",
    2: "Long",
    3: "String",
    4: "String",
    5: "String",
    9: "String",
    13: "String",
    7: "String",
    10: "String",
    11: "Float",
    12: "String",
    14: "String",
    15: "String",
    16: "String",
    17: "String",
    18: "Int",
    19: "String",
    20: "Int",
    21: "Long",
    22: "String",
    23: "String",
    6: "String",
    24: "String",
    25: "String",
    26: "String",
    27: "String",
    28: "String",
    29: "String",
    30: "String",
    31: "String",
    33: "String",
    34: "Int",
    35: "String",
    36: "String",
    37: "Array<Int>",
    38: "Array<String>",
    39: "String",
    40: "String",
    41: "Int",
    42: "String",
    43: "Int",
    44: "Int",
    45: "Int",
    46: "String",
    47: "Int",
    48: "String",
    49: "Int",
    50: "Int",
    32: "String",
    51: "Int",
    52: "Int",
    53: "String",
    54: "String",
    8: "String",
    55: "Int",
    56: "Array<String>",
    57: "Array<String>",
    58: "String",
    59: "String",
    60: "String",
    61: "String",
    62: "Array<Int>",
    63: "String",
    64: "Int",
    65: "Array<Int>",
    66: "Map<Int,Int>",
    67: "Array<IntArray>",
    68: "Array<Int>",
    69: "Int",
    70: "Int",
    71: "String",
    72: "String",
    73: "Int",
    74: "Int",
    75: "Int",
    76: "Int",
    77: "String",
    78: "Int",
    79: "Array<IntArray>",
    80: "Array<Float>",
    81: "Array<Float>",
    82: "String",
    83: "Array<String>",
    84: "Int",
    85: "String",
    86: "String",
    87: "String",
    88: "String",
    89: "String",
    90: "String",
    91: "String",
    92: "String",
    93: "String",
    94: "String",
    95: "Int",
    96: "String"
  },
  csvFieldValidValues = {
    ExportType: {
      CnName: "客户端/服务端 使用",
      Range: customExportType
    },
    Name: {
      CnName: "字段名"
    },
    Type: {
      CnName: "字段数据类型",
      Range: customValueType
    },
    Filter: {
      CnName: "该字段是否用于条件筛选",
      Range: customBoolType
    },
    Localization: {
      CnName: "是否导出多语言",
      Range: customBoolType
    },
    Condition: {
      CnName: "条件检查"
    },
    Default: {
      CnName: "默认值"
    },
    CnName: {
      CnName: "#"
    },
    RenderType: {
      CnName: "",
      IgnoreSerialize: !0
    }
  },
  MAX_HEADER_COUNT = 10,
  depotCsvCache = new Map;

function createDefaultCsvFiledEx() {
  return {
    ExportType: "C",
    Name: "default",
    Type: "String",
    Filter: "0",
    Localization: "0",
    Condition: "",
    Default: "",
    CnName: "未知",
    RenderType: 23,
    Tip: "",
    CreateType: "prevRow"
  }
}

function createCsvField(r) {
  var e = createDefaultCsvFiledEx();
  return Object.assign(e, r), e
}
exports.createCsvField = createCsvField;
class GlobalCsv {
  constructor() {
    this.Name = "", this.FieldTypes = [], this.Rows = [], this.Tables = [], this.Branch = "development", this.Segment = [0, 0], this.OtherBranchCsv = [], this.krl = void 0
  }
  get FilterFields() {
    return this.krl || (this.krl = this.FieldTypes.filter(r => "1" === r.Filter)), this.krl
  }
  Bind(r) {
    Object.assign(this, r)
  }
  Nrl(r, e) {
    for (const t of this.FieldTypes)
      if (r[t.Name] !== e[t.Name]) return !1;
    return !0
  }
  Frl(e, t, i) {
    let n = 0;
    var a = Array.from(t.keys());
    let s = !1;
    for (let r = 0; r < a.length - 1; r++) {
      var o = a[r],
        l = a[r + 1],
        h = t.get(o),
        c = t.get(l);
      1 !== h.length || 1 !== c.length || this.Nrl(h[0], c[0]) || (n++, i.push(`【${o}】和【${l}】存在重复索引的行内容不一致【${e}】`), s = !0)
    }
    if (!s)
      for (const r of a) 1 < t.get(r).length && (n++, i.push(`【${r}】存在重复的索引【${e}】`));
    return n
  }
  Vrl(r) {
    const i = new Map;
    var e = [];
    for (const a of this.GetAllRowsData()) e.push(...a.Rows);
    e.forEach(e => {
      var r = this.FilterFields.map(r => r.CnName + ": " + e[r.Name]).join(", ");
      let t = i.get(r);
      t || (t = [], i.set(r, t)), t.push(e)
    });
    let t = 0;
    for (const s of i.keys()) {
      var n = i.get(s);
      if (!(n.length <= 1)) {
        const o = new Map;
        n.forEach(r => {
          var e = r.Branch;
          let t = o.get(e);
          t || (t = [], o.set(r.Branch, t)), t.push(r)
        }), 1 < o.size ? t += this.Frl(s, o, r) : (t++, r.push(`【${Array.from(new Set(n.map(r=>r.Branch))).join(", ")}】存在重复的索引【${s}】`))
      }
    }
    return t
  }
  BaseCheck(r) {
    var e = 0;
    return e += this.Vrl(r)
  }
  CreateDefault(r) {
    return r
  }
  GetAllRowsData() {
    var r = [];
    r.push({
      Branch: this.Branch,
      Rows: this.Rows
    });
    for (const e of [...this.OtherBranchCsv, ...this.HigherBranchCsv ?? []])(0, BranchDefine_1.isReachBranch)(e.Branch) && r.push({
      Branch: e.Branch,
      Rows: e.Rows
    });
    return r
  }
}
exports.GlobalCsv = GlobalCsv;
class CsvLoader {
  constructor(r, e) {
    this.bkn = [], this.T = new Map, this.FieldTypes = e.slice(), this.Name = r, e.forEach(r => {
      this.T.set(r.Name, r)
    }), this.v(), this.g()
  }
  v() {
    let e = 0;
    if (this.FieldTypes.forEach(r => {
        "1" === r.Filter && e++
      }), e <= 0) throw new Error(`[${this.Name}]: No index key (field [filter] = 1)`)
  }
  g() {
    this.FieldTypes.forEach(r => {
      var e = valueTypeByRenderType[r.RenderType];
      if (e !== r.Type) throw new Error(`[${this.Name}]: [${r.Name}] Type [${r.Type}] not match renderType [${r.RenderType}][${e}]`)
    })
  }
  I(e, r) {
    var t = csvFieldValidValues[r];
    for (let r = 1; r < e.length; r++)
      if (t.Range) {
        var i = e[r];
        if (!t.Range.includes(i)) throw new Error(`CSV file [${this.Name}] head field invalid, [${t.CnName}], expect of [${t.Range.join(",")}], actual[${i}]`)
      }
  }
  L(r, e) {
    const t = [];
    var i = csvFieldValidValues[e];
    t.push(i.CnName), this.FieldTypes.forEach(r => {
      t.push(r[e])
    }), r.Write(t)
  }
  M(e) {
    for (let r = 0; r < MAX_HEADER_COUNT; r++) {
      var t, i = e.ReadNext();
      if (!i) throw new Error(`CSV [${this.Name}] header row count [${e.TotalLine}] not enough`);
      if ("#" === i[0]) return;
      if (1 === r && (this.bkn = i), 2 === r)
        for (let r = 0; r < i.length; r++) {
          var n = [...i[r].matchAll(/】(?:[^\n]*)/g)];
          0 < n.length && (n = n[n.length - 1][0].replace(/】/, ""), i[r] = n)
        }
      for (const a in csvFieldValidValues) csvFieldValidValues[a].IgnoreSerialize || (t = csvFieldValidValues[a], i[0] === t.CnName && this.I(i, a))
    }
  }
  GetCsvFieldConfig(r) {
    return this.T.get(r)
  }
  F(r) {
    var e = r.ReadNext();
    if (!e) throw new Error(`CSV [${this.Name}] row count [${r.TotalLine}] not enough`);
    if (!e[0]?.startsWith("#")) {
      if ("" !== e.toString() && e.length < this.bkn.length) throw new Error(`CSV [${this.Name}] 行解析失败，行内容 【${e.toString()}】`);
      var t = {};
      for (let r = 1; r < e.length; r++) {
        var i = this.bkn[r],
          n = this.T.get(i);
        if (n) {
          var a = e[r];
          switch (n.Type) {
            case "Int":
              "" === e[r] ? t[n.Name] = void 0 : t[n.Name] = parseInt(a, 10);
              break;
            case "Long":
            case "Long54":
              t[n.Name] = BigInt(a);
              break;
            case "String":
              t[n.Name] = a;
              break;
            case "Bool":
              t[n.Name] = (0, Util_1.parseBool)(a);
              break;
            case "Float":
              t[n.Name] = parseFloat(a);
              break;
            case "Array<Int>":
              t[n.Name] = (0, Util_1.parseCsvIntArray)(a);
              break;
            case "Array<String>":
            case "Array<GameplayTag>":
            case "Array<String> && ReplaceIfMatch(EntityCommonTagInfo.TagName,EntityCommonTagInfo.UglyTagName)":
              t[n.Name] = (0, Util_1.parseCsvStringArray)(a);
              break;
            case "Array<Float>":
              t[n.Name] = (0, Util_1.parseCsvFloatArray)(a);
              break;
            case "Array<Long>":
            case "Array<Long54>":
              t[n.Name] = (0, Util_1.parseCsvIntArray)(a);
              break;
            case "Array<IntArray>":
              t[n.Name] = (0, Util_1.parseCsvInt2Array)(a);
              break;
            case "Map<Int,Int>":
              t[n.Name] = a
          }
        }
      }
      return t
    }
  }
  P(r) {
    for (var e = []; !r.IsEnd;) {
      var t = this.F(r);
      t && e.push(t)
    }
    return e
  }
  O(r) {
    for (const e in csvFieldValidValues) csvFieldValidValues[e].IgnoreSerialize || this.L(r, e)
  }
  k(r, i) {
    const n = [];
    n.push(""), this.FieldTypes.forEach(r => {
      var e = i[r.Name];
      if (void 0 === e) n.push("");
      else if ("Array<String>" === r.Type || "Array<Int>" === r.Type || "Array<Float>" === r.Type || "Array<Long>" === r.Type) n.push(`[${e}]`);
      else if ("Array<IntArray>" === r.Type && (0, Util_1.isNumber2dArray)(e)) {
        const t = [];
        e.forEach(r => {
          t.push([r])
        });
        r = JSON.stringify(t);
        n.push(r)
      } else "string" == typeof e ? n.push(e) : n.push(e.toString())
    }), r.Write(n)
  }
  q(e, r) {
    r.forEach(r => {
      this.k(e, r)
    })
  }
  Parse(r) {
    r = new CsvParser_1.LineReader(r);
    return r.IsValid ? (this.M(r), this.P(r)) : []
  }
  ParseOne(r) {
    r = new CsvParser_1.LineReader(r);
    if (r.IsValid) return this.M(r), this.F(r)
  }
  Stringify(r) {
    var e = new CsvParser_1.LineWriter;
    return this.O(e), this.q(e, r), e.Gen()
  }
  StringifyOne(r) {
    var e = new CsvParser_1.LineWriter;
    return this.O(e), this.k(e, r), e.Gen()
  }
  Load(e) {
    var r = (0, File_1.readFile)(e);
    if (r) try {
      return (0, Log_1.log)(`Load csv: [${e}]`), this.Parse(r)
    } catch (r) {
      if (r instanceof Error) throw new Error(`CSV [${e}] 解析失败，错误如下:
` + r.message)
    }
    return []
  }
  TryLoad(e) {
    try {
      var r = (0, File_1.readFile)(e);
      return r ? this.Parse(r) : []
    } catch (r) {
      if (r instanceof Error) throw new Error(`CSV [${e}] 解析失败，错误如下:
` + r.message)
    }
    return []
  }
  LoadOne(r) {
    r = (0, File_1.readFile)(r);
    if (r) return this.ParseOne(r)
  }
  Save(r, e) {
    (0, File_1.writeFile)(e, this.Stringify(r))
  }
  SaveOne(r, e) {
    (0, File_1.writeFile)(e, this.StringifyOne(r))
  }
  GetHigherBranchCsvPath(r, e) {
    return (0, File_1.getSavePath)(`Editor/c.Csv/${r}/${e}.csv`).replace("\\", "/")
  }
  ibl(e, r) {
    var t, i = new Map,
      r = "p4 files " + r.map(r => `//aki/development/Source/Config/Raw/Tables/k.可视化编辑/c.Csv/${e}/${r}.csv`).join(" "),
      [r, n] = (0, Util_1.exec)(r);
    if (r)
      for (const a of n.split("\n")) a.endsWith("no such file(s).") || /(?<m>delete|move\/delete) change \d+/.test(a) || ([t] = a.split(" - "), [t] = t.split("#"), t = t.split("/").pop().replace(".csv", ""), i.set(t, !0));
    return i
  }
  RequestDepotCsv(r, e) {
    if (!(0, Util_1.isUePlatform)()) return "";
    e = (0, File_1.getDirName)((0, File_1.getDir)(e));
    let t = r;
    var i = `//aki/${t=(0,BranchDefine_1.isPlannedBranch)(r)?"development":t}/Source/Config/Raw/Tables/k.可视化编辑/c.Csv/${e}/${r}.csv`;
    return depotCsvCache.has(i) ? depotCsvCache.get(i) : (r = `p4 print -q -o ${e=this.GetHigherBranchCsvPath(e,r)} ` + i, (0, Util_1.exec)(r), depotCsvCache.set(i, e), e)
  }
  V(r) {
    return r.replace(/\\/g, "/").split("/").pop().replace(".csv", "")
  }
  qkn(r, e) {
    r.forEach(r => {
      r.Branch = e
    })
  }
  GetRowIdSegment(r) {
    var e = ((0, BranchDefine_1.isPlannedBranch)(r) ? (0, BranchDefine_1.getPlannedBranchSegment) : (0, BranchDefine_1.getBranchSegment))(r);
    if (e) return e;
    throw new Error(`[${r}] id segment not found`)
  }
  j(r) {
    var e = this.V(r),
      t = (0, File_1.getDir)(r),
      r = (0, BranchDefine_1.getAllBranches)();
    if (!r) return [];
    var i, n = [];
    for (const a of r) a !== e && (0, BranchDefine_1.isReachBranch)(a) && (i = `${t}/${a}.csv`, i = this.Load(i), this.qkn(i, a), n.push({
      Name: a,
      FieldTypes: this.FieldTypes,
      Rows: i,
      Tables: [],
      Branch: a,
      Segment: this.GetRowIdSegment(a),
      OtherBranchCsv: []
    }));
    return n
  }
  LoadCsv(r) {
    var e = this.V(r),
      t = this.Load(r);
    return this.qkn(t, e), {
      Name: this.Name,
      FieldTypes: this.FieldTypes,
      Rows: t,
      Tables: [],
      Branch: e,
      Segment: this.GetRowIdSegment(e),
      OtherBranchCsv: this.j(r)
    }
  }
  LoadHigherBranchCsv(r, e) {
    if (!e.HigherBranchCsv) {
      var t = (0, BranchDefine_1.getAllBranches)();
      if (t && !(e.Tables.length <= 0)) {
        var i, n = r + "/" + e.Tables[0].TablePath,
          r = (e.HigherBranchCsv = [], t.filter(r => (0, BranchDefine_1.isHigherBranch)(r, e.Branch))),
          a = this.ibl(e.Tables[0].TablePath, r);
        for (const s of r) {
          let r = [];
          a.get(s) && (i = n + `/${s}.csv`, i = this.RequestDepotCsv(s, i), r = this.TryLoad(i)), this.qkn(r, s), e.HigherBranchCsv.push({
            Name: s,
            FieldTypes: this.FieldTypes,
            Rows: r,
            Tables: [],
            Branch: s,
            Segment: this.GetRowIdSegment(s),
            OtherBranchCsv: []
          })
        }
      }
    }
  }
  SaveCsv(r, e) {
    this.Save(r.Rows, e)
  }
  OnModifyRow(r, e) {}
}
exports.CsvLoader = CsvLoader;
class CsvMapFieldResolver {
  static ResolveNumberMapField(r) {
    return r ? r.slice(1, -1).split(",").map(r => {
      var [r, e] = r.split(":").map(Number);
      return {
        Key: r,
        Value: e
      }
    }) : []
  }
}
exports.CsvMapFieldResolver = CsvMapFieldResolver;
//# sourceMappingURL=CsvLoader.js.map