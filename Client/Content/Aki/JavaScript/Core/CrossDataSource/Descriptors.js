"use strict";

var TestData_1;
var __decorate = this && this.__decorate || function (t, e, a, r) {
  var o;
  var i = arguments.length;
  var n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, a) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, a, r);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (o = t[s]) {
        n = (i < 3 ? o(n) : i > 3 ? o(e, a, n) : o(e, a)) || n;
      }
    }
  }
  if (i > 3 && n) {
    Object.defineProperty(e, a, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestData = exports.TestDataSingle = exports.CSharpProperty = exports.CSharpStaticField = exports.CSharpField = exports.CSharpDataUid = exports.CSharpDataSingletonProxy = exports.CSharpDataProxy = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../Common/Log");
function InternalLog(t, ...e) {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Core", 24, t, ...e);
  }
}
const csharpDataRegistry = new FinalizationRegistry(t => {
  InternalLog("[CSharpDataStore]C#数据对应的Js对象被回收，释放GCHandle: " + t);
  cpp_1.CSharpDataProxyInternal.FreeGCHandle(t);
});
function BindCSharpData(t, e, a, r, o, i) {
  cpp_1.CSharpDataProxyInternal.SetCSharpDataAssociate(t, e, a, r, o, i, true);
  var n = t.__BackingField_CSharpDataGCHandle;
  if (n !== undefined) {
    InternalLog("[CSharpDataStore]C#数据对象绑定成功，申请GCHandle: " + n);
    csharpDataRegistry.register(t, n);
  }
  var e = Object.getPrototypeOf(t);
  if (e.__BackingField_CSharpFieldNamesArray !== undefined) {
    for (const c of e.__BackingField_CSharpFieldNamesArray) {
      t.__BackingField_CSharpDataGCHandle = 0;
      var s = t[c];
      t.__BackingField_CSharpDataGCHandle = n;
      t[c] = s;
    }
  }
}
function CSharpDataProxy(o, i, n = true) {
  return function (t) {
    function e(...t) {
      var e;
      var t = new a(...t);
      if (cpp_1.CSharpDataProxyInternal.HasCSharpEnvironmentInitialized()) {
        t.__BackingField_HasConstructor = true;
        if (t.__BackingField_CSharpDataGCHandle !== undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Core", 24, "[CSharpDataStore]构造函数走完前不应该触发BindCSharp");
          }
        } else if ((e = t.__BackingField_BindCSharpDataUid) !== undefined) {
          BindCSharpData(t, e, o, i, n, false);
        }
      }
      return t;
    }
    const a = t;
    e.prototype = a.prototype;
    e.prototype.__BackingField_Namespace = o;
    e.prototype.__BackingField_ClassName = i;
    e.prototype.__BackingField_bGameImage = n;
    const r = {};
    Object.getOwnPropertyNames(a).forEach(t => {
      var e;
      if (!["prototype"].includes(t)) {
        if ((e = Object.getOwnPropertyDescriptor(a, t)) && (e.get || e.set)) {
          r[t] = e;
        } else {
          r[t] = {};
        }
      }
    });
    Object.keys(r).forEach(t => {
      Object.defineProperty(e, t, r[t]);
    });
    return e;
  };
}
function CSharpDataSingletonProxy(o, i, n = true) {
  return function (t) {
    function e(...t) {
      t = new a(...t);
      if (cpp_1.CSharpDataProxyInternal.HasCSharpEnvironmentInitialized()) {
        t.__BackingField_HasConstructor = true;
        if (t.__BackingField_CSharpDataGCHandle !== undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Core", 24, "[CSharpDataStore::Singleton]构造函数走完前不应该触发BindCSharp");
          }
        } else {
          BindCSharpData(t, 0, o, i, n, true);
        }
      }
      return t;
    }
    const a = t;
    e.prototype = a.prototype;
    e.prototype.__BackingField_Namespace = o;
    e.prototype.__BackingField_ClassName = i;
    e.prototype.__BackingField_bGameImage = n;
    const r = {};
    Object.getOwnPropertyNames(a).forEach(t => {
      var e;
      if (!["prototype"].includes(t)) {
        if ((e = Object.getOwnPropertyDescriptor(a, t)) && (e.get || e.set)) {
          r[t] = e;
        } else {
          r[t] = {};
        }
      }
    });
    Object.keys(r).forEach(t => {
      Object.defineProperty(e, t, r[t]);
    });
    return e;
  };
}
function CSharpDataUid(r = undefined) {
  return function (e, a) {
    Object.defineProperty(e, a, {
      get: function () {
        if (this.__BackingField_LocalValues === undefined) {
          return r;
        } else {
          return this.__BackingField_LocalValues[a];
        }
      },
      set: function (t) {
        if (this.__BackingField_LocalValues === undefined) {
          this.__BackingField_LocalValues = {};
        }
        this.__BackingField_LocalValues[a] = t;
        if (this.__BackingField_HasConstructor !== true) {
          if (t !== r) {
            this.__BackingField_BindCSharpDataUid = t;
          }
        } else if (this.__BackingField_CSharpDataGCHandle) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Core", 24, "[CSharpDataStore]CSharpDataUid只能被赋值一次", ["OldUid", this.__BackingField_LocalValues[a]], ["NewUid", t]);
          }
        } else {
          BindCSharpData(this, t, e.__BackingField_Namespace, e.__BackingField_ClassName, e.__BackingField_bGameImage, false);
        }
      },
      enumerable: true,
      configurable: true
    });
  };
}
function CSharpField(a = "", r = undefined) {
  return function (t, e) {
    if (a === "") {
      a = e;
    }
    t.__BackingField_CSharpFieldNamesArray ||= [];
    t.__BackingField_CSharpFieldNamesArray.push(e);
    Object.defineProperty(t, e, {
      get: function () {
        if (this.__BackingField_CSharpDataGCHandle) {
          return cpp_1.CSharpDataProxyInternal.GetField(this, a);
        } else if (this.__BackingField_LocalValues === undefined) {
          return r;
        } else {
          return this.__BackingField_LocalValues[e];
        }
      },
      set: function (t) {
        if (this.__BackingField_CSharpDataGCHandle) {
          cpp_1.CSharpDataProxyInternal.SetField(this, a, t);
        } else {
          if (this.__BackingField_LocalValues === undefined) {
            this.__BackingField_LocalValues = {};
          }
          this.__BackingField_LocalValues[e] = t;
        }
      },
      enumerable: true,
      configurable: true
    });
  };
}
function CSharpStaticField(i = "") {
  return function (o, t) {
    if (i === "") {
      i = t;
    }
    Object.defineProperty(o, t, {
      get: function () {
        var t = o.prototype.__BackingField_Namespace ?? "";
        var e = o.prototype.__BackingField_ClassName ?? "";
        var a = o.prototype.__BackingField_bGameImage ?? true;
        return cpp_1.CSharpDataProxyInternal.GetStaticField(a, t, e, i);
      },
      set: function (t) {
        var e = o.prototype.__BackingField_Namespace ?? "";
        var a = o.prototype.__BackingField_ClassName ?? "";
        var r = o.prototype.__BackingField_bGameImage ?? true;
        cpp_1.CSharpDataProxyInternal.SetStaticField(r, e, a, i, t);
      },
      enumerable: true,
      configurable: true
    });
  };
}
function CSharpProperty(i) {
  return function (t, e, a) {
    const r = a.get;
    const o = a.set;
    if (r) {
      a.get = function () {
        InternalLog(i + ": 获取属性 " + e);
        return r.apply(this);
      };
    }
    if (o) {
      a.set = function (t) {
        InternalLog(`${i}: 设置属性 ${e} 为 ${t}`);
        o.apply(this, [t]);
      };
    }
  };
}
exports.CSharpDataProxy = CSharpDataProxy;
exports.CSharpDataSingletonProxy = CSharpDataSingletonProxy;
exports.CSharpDataUid = CSharpDataUid;
exports.CSharpField = CSharpField;
exports.CSharpStaticField = CSharpStaticField;
exports.CSharpProperty = CSharpProperty;
let TestDataSingle = class TestDataSingle {
  constructor() {
    this.testDouble = 111111111.22222;
    this.testDouble1 = 222222222.22222;
  }
};
__decorate([CSharpField("TestDoubleField")], TestDataSingle.prototype, "testDouble", undefined);
__decorate([CSharpField("TestDoubleField1")], TestDataSingle.prototype, "testDouble1", undefined);
TestDataSingle = __decorate([CSharpDataSingletonProxy("UnrealEngine.PuertsProxy.CrossDataCenter", "TestDataSingle", false)], TestDataSingle);
exports.TestDataSingle = TestDataSingle;
let TestData = TestData_1 = class TestData {
  constructor(t, e) {
    this.inTestString = t;
    this.inTestInt = e;
    this.uid = 0;
    this.testBool = false;
    this.testInt = 0;
    this.jNf = "";
    this.testString = t;
    this.testInt = e;
    this.testBool = true;
    this.uid = 11000;
  }
  get testString() {
    return "123456";
  }
  set testString(t) {
    this.jNf = t;
  }
  LogInfo() {
    return `${this.jNf} - ${this.testInt} - ${this.testBool}`;
  }
  static Test() {
    InternalLog(new TestData_1("WLJ", 2077).LogInfo());
  }
};
TestData.testStatic = 0;
__decorate([CSharpDataUid()], TestData.prototype, "uid", undefined);
__decorate([CSharpField("TestBoolField")], TestData.prototype, "testBool", undefined);
__decorate([CSharpField("TestIntField")], TestData.prototype, "testInt", undefined);
__decorate([CSharpProperty("TestStringProperty")], TestData.prototype, "testString", null);
__decorate([CSharpStaticField("TestStaticField")], TestData, "testStatic", undefined);
TestData = TestData_1 = __decorate([CSharpDataProxy("UnrealEngine.PuertsProxy.CrossDataCenter", "TestData", false)], TestData);
exports.TestData = TestData; //# sourceMappingURL=Descriptors.js.map