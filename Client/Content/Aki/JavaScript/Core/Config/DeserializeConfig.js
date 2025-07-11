"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeserializeConfig = undefined;
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const RATE_10000 = 0.0001;
const MAX_CODES = 65535;
const tempCodes = new Array();
class DeserializeConfig {
  static ParseInt(e, i = 0, ...o) {
    DeserializeConfig.X9.Start();
    var s = {
      Success: true,
      Value: 0,
      Position: i
    };
    if (e.byteLength >= i + 4) {
      e = e.getInt32(i, true);
      s.Position = i + 4;
      s.Value = e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "配置表序列化 int32 类型出错，请检查配置表定义与配置表数据是否一致！", ...o);
      }
      s.Success = false;
    }
    DeserializeConfig.X9.Stop();
    return s;
  }
  static ParseBigInt(e, i = 0, ...o) {
    DeserializeConfig.Y9.Start();
    var s = {
      Success: true,
      Value: 0n,
      Position: i
    };
    if (e.byteLength >= i + 8) {
      e = e.getBigInt64(i, true);
      s.Position = i + 8;
      s.Value = e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "配置表序列化 int64 类型出错，请检查配置表定义与配置表数据是否一致！", ...o);
      }
      s.Success = false;
    }
    DeserializeConfig.Y9.Stop();
    return s;
  }
  static ParseFloat(e, i = 0, ...o) {
    DeserializeConfig.J9.Start();
    var s = {
      Success: true,
      Value: 0,
      Position: i
    };
    if (e.byteLength >= i + 4) {
      e = e.getInt32(i, true);
      s.Position = i + 4;
      s.Value = e * RATE_10000;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "配置表序列化 float 类型出错，请检查配置表定义与配置表数据是否一致！", ...o);
      }
      s.Success = false;
    }
    DeserializeConfig.J9.Stop();
    return s;
  }
  static ParseFloat64(e, i = 0, ...o) {
    DeserializeConfig.dtl.Start();
    var s = {
      Success: true,
      Value: 0,
      Position: i
    };
    if (e.byteLength >= i + 8) {
      e = e.getFloat64(i, true);
      s.Position = i + 8;
      s.Value = e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 62, "配置表序列化 float64 类型出错，请检查配置表定义与配置表数据是否一致！", ...o);
      }
      s.Success = false;
    }
    DeserializeConfig.dtl.Stop();
    return s;
  }
  static ParseBoolean(e, i = 0, ...o) {
    DeserializeConfig.z9.Start();
    var s = {
      Success: true,
      Value: false,
      Position: i
    };
    if (e.byteLength >= i + 1) {
      s.Value = e.getInt8(i) === 1;
      s.Position = i + 1;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "配置表序列化 bool 类型出错，请检查配置表定义与配置表数据是否一致！", ...o);
      }
      s.Success = false;
    }
    DeserializeConfig.z9.Stop();
    return s;
  }
  static ParseStringRange(s, t, r, ...a) {
    DeserializeConfig.Z9.Start();
    var n = {
      Success: false,
      Value: "",
      Position: t
    };
    if (s.byteLength < t + r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 2, "配置表序列化 string 类型出错，请检查配置表定义与配置表数据是否一致！", ...a);
      }
    } else {
      if (r !== 0) {
        let i = 0;
        var g;
        let o = undefined;
        for (let e = t; e < t + r;) {
          if ((g = s.getUint8(e)) >>> 7 == 0) {
            tempCodes.push(s.getUint8(e));
            e += 1;
          } else if ((g & 252) == 252) {
            i = (s.getUint8(e) & 3) << 30;
            i = (i = (i = (i = (i |= (s.getUint8(e + 1) & 63) << 24) | (s.getUint8(e + 2) & 63) << 18) | (s.getUint8(e + 3) & 63) << 12) | (s.getUint8(e + 4) & 63) << 6) | s.getUint8(e + 5) & 63;
            tempCodes.push(i);
            e += 6;
          } else if ((g & 248) == 248) {
            i = (s.getUint8(e) & 7) << 24;
            i = (i = (i = (i |= (s.getUint8(e + 1) & 63) << 18) | (s.getUint8(e + 2) & 63) << 12) | (s.getUint8(e + 3) & 63) << 6) | s.getUint8(e + 4) & 63;
            tempCodes.push(i);
            e += 5;
          } else if ((g & 240) == 240) {
            i = (s.getUint8(e) & 15) << 18;
            i = (i = (i |= (s.getUint8(e + 1) & 63) << 12) | (s.getUint8(e + 2) & 63) << 6) | s.getUint8(e + 3) & 63;
            tempCodes.push(i);
            e += 4;
          } else if ((g & 224) == 224) {
            i = (s.getUint8(e) & 31) << 12;
            i = (i |= (s.getUint8(e + 1) & 63) << 6) | s.getUint8(e + 2) & 63;
            tempCodes.push(i);
            e += 3;
          } else if ((g & 192) == 192) {
            i = (s.getUint8(e) & 63) << 6;
            i |= s.getUint8(e + 1) & 63;
            tempCodes.push(i);
            e += 2;
          } else {
            tempCodes.push(s.getUint8(e));
            e += 1;
          }
          if (tempCodes.length === MAX_CODES) {
            g = String.fromCharCode.apply(undefined, tempCodes);
            tempCodes.length = 0;
            if (o) {
              o.push(g);
            } else {
              o = [g];
            }
          }
        }
        let e = o ? o.join("") : undefined;
        if (tempCodes.length > 0) {
          a = String.fromCharCode.apply(undefined, tempCodes);
          tempCodes.length = 0;
          if (e) {
            e += a;
          } else {
            e = a;
          }
        }
        n.Value = e;
        n.Position = t + r;
      }
      n.Success = true;
    }
    DeserializeConfig.Z9.Stop();
    return n;
  }
  static ParseString(e, i = 0, ...o) {
    DeserializeConfig.e7.Start();
    let s = {
      Success: false,
      Value: "",
      Position: i
    };
    i = DeserializeConfig.ParseInt(e, i);
    if (i.Success && i.Value !== undefined && i.Position !== undefined) {
      var t = i.Value;
      var i = i.Position;
      s.Position = i;
      if (t < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Config", 2, "配置表序列化 string 类型出错，请检查配置表定义与配置表数据是否一致！", ...o);
        }
        DeserializeConfig.e7.Stop();
        return s;
      }
      if (t === 0) {
        s.Success = true;
        DeserializeConfig.e7.Stop();
        return s;
      }
      s = DeserializeConfig.ParseStringRange(e, i, t, ...o);
    }
    DeserializeConfig.e7.Stop();
    return s;
  }
}
(exports.DeserializeConfig = DeserializeConfig).X9 = Stats_1.Stat.Create("DeserializeConfig.ParseInt");
DeserializeConfig.Y9 = Stats_1.Stat.Create("DeserializeConfig.ParseBigInt");
DeserializeConfig.J9 = Stats_1.Stat.Create("DeserializeConfig.ParseFloat");
DeserializeConfig.dtl = Stats_1.Stat.Create("DeserializeConfig.ParseFloat64");
DeserializeConfig.z9 = Stats_1.Stat.Create("DeserializeConfig.ParseBoolean");
DeserializeConfig.Z9 = Stats_1.Stat.Create("DeserializeConfig.ParseStringRange");
DeserializeConfig.e7 = Stats_1.Stat.Create("DeserializeConfig.ParseString"); //# sourceMappingURL=DeserializeConfig.js.map