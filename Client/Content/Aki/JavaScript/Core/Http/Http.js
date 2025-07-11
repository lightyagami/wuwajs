"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Http = exports.HttpResponseData = undefined;
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const CustomPromise_1 = require("../Common/CustomPromise");
class HttpResponseData {
  constructor(e, t, s) {
    this.Success = e;
    this.Code = t;
    this.Data = s;
  }
}
exports.HttpResponseData = HttpResponseData;
class Http {
  static Get(e, t, o, s) {
    let i = undefined;
    if (t) {
      i = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
      for (var [u, r] of t) {
        i.Add(u, r);
      }
    } else {
      i = ue_1.KuroHttp.GetDefaultHeader();
    }
    if (o) {
      const n = (e, t, s) => {
        o(e, t, s);
        (0, puerts_1.releaseManualReleaseDelegate)(n);
      };
      ue_1.KuroHttp.Get(e, i, (0, puerts_1.toManualReleaseDelegate)(n), s);
    } else {
      ue_1.KuroHttp.Get(e, i, undefined, s);
    }
  }
  static async GetAsync(e, t, s) {
    const o = new CustomPromise_1.CustomPromise();
    this.Get(e, t, (e, t, s) => {
      e = new HttpResponseData(e, t, s);
      o.SetResult(e);
    }, s);
    return await o.Promise;
  }
  static Post(e, t, s, o) {
    let i = undefined;
    if (s) {
      i = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
      for (var [u, r] of s) {
        i.Add(u, r);
      }
    } else {
      i = ue_1.KuroHttp.GetDefaultHeader();
    }
    if (o) {
      const n = (e, t, s) => {
        o(e, t, s);
        (0, puerts_1.releaseManualReleaseDelegate)(n);
      };
      ue_1.KuroHttp.Post(e, i, t, (0, puerts_1.toManualReleaseDelegate)(n));
    } else {
      ue_1.KuroHttp.Post(e, i, t, undefined);
    }
  }
  static SetHttpThreadActiveMinimumSleepTimeInSeconds(e) {
    ue_1.KuroStaticLibrary.SetHttpThreadActiveMinimumSleepTimeInSeconds(e);
  }
  static SetHttpThreadIdleMinimumSleepTimeInSeconds(e) {
    ue_1.KuroStaticLibrary.SetHttpThreadIdleMinimumSleepTimeInSeconds(e);
  }
  static IsConnectionInvalid(e) {
    var t = !e.Success && e.Code === 0;
    var e = e.Success && e.Code >= 400;
    return t || e;
  }
}
exports.Http = Http;
//# sourceMappingURL=Http.js.map