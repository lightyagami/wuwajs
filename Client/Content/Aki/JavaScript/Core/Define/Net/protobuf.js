const Long = require("./long");
(function (undefined) {
  "use strict";

  (function t(r, u, n) {
    var i = function t(n) {
      var i = u[n];
      if (!i) {
        r[n][0].call(i = u[n] = {
          exports: {}
        }, t, i, i.exports);
      }
      return i.exports;
    }(n[0]);
    i.util.global.protobuf = i;
    if (typeof define == "function" && define.amd) {
      define(["long"], function (t) {
        if (t && t.isLong) {
          i.util.Long = t;
          i.configure();
        }
        return i;
      });
    }
    if (typeof module == "object" && module && module.exports) {
      module.exports = i;
    }
  })({
    1: [function (t, n, i) {
      n.exports = function t(n, i) {
        var r = new Array(arguments.length - 1);
        var s = 0;
        var u = 2;
        var h = true;
        while (u < arguments.length) {
          r[s++] = arguments[u++];
        }
        return new Promise(function t(u, e) {
          r[s] = function t(n) {
            if (h) {
              h = false;
              if (n) {
                e(n);
              } else {
                for (var i = new Array(arguments.length - 1), r = 0; r < i.length;) {
                  i[r++] = arguments[r];
                }
                u.apply(null, i);
              }
            }
          };
          try {
            n.apply(i || null, r);
          } catch (t) {
            if (h) {
              h = false;
              e(t);
            }
          }
        });
      };
    }, {}],
    2: [function (t, n, i) {
      i.length = function t(n) {
        var i = n.length;
        if (!i) {
          return 0;
        }
        var r = 0;
        while (--i % 4 > 1 && n.charAt(i) === "=") {
          ++r;
        }
        return Math.ceil(n.length * 3) / 4 - r;
      };
      var c = new Array(64);
      var f = new Array(123);
      for (var r = 0; r < 64;) {
        f[c[r] = r < 26 ? r + 65 : r < 52 ? r + 71 : r < 62 ? r - 4 : r - 59 | 43] = r++;
      }
      i.encode = function t(n, i, r) {
        var u;
        var e = null;
        var s = [];
        for (var h = 0, o = 0; i < r;) {
          var f = n[i++];
          switch (o) {
            case 0:
              s[h++] = c[f >> 2];
              u = (f & 3) << 4;
              o = 1;
              break;
            case 1:
              s[h++] = c[u | f >> 4];
              u = (f & 15) << 2;
              o = 2;
              break;
            case 2:
              s[h++] = c[u | f >> 6];
              s[h++] = c[f & 63];
              o = 0;
          }
          if (h > 8191) {
            (e = e || []).push(String.fromCharCode.apply(String, s));
            h = 0;
          }
        }
        if (o && (s[h++] = c[u], s[h++] = 61, o === 1)) {
          s[h++] = 61;
        }
        if (e) {
          if (h) {
            e.push(String.fromCharCode.apply(String, s.slice(0, h)));
          }
          return e.join("");
        } else {
          return String.fromCharCode.apply(String, s.slice(0, h));
        }
      };
      var a = "invalid encoding";
      i.decode = function t(n, i, r) {
        var u;
        var e = r;
        var s = 0;
        for (var h = 0; h < n.length;) {
          var o = n.charCodeAt(h++);
          if (o === 61 && s > 1) {
            break;
          }
          if ((o = f[o]) === undefined) {
            throw Error(a);
          }
          switch (s) {
            case 0:
              u = o;
              s = 1;
              break;
            case 1:
              i[r++] = u << 2 | (o & 48) >> 4;
              u = o;
              s = 2;
              break;
            case 2:
              i[r++] = (u & 15) << 4 | (o & 60) >> 2;
              u = o;
              s = 3;
              break;
            case 3:
              i[r++] = (u & 3) << 6 | o;
              s = 0;
          }
        }
        if (s === 1) {
          throw Error(a);
        }
        return r - e;
      };
      i.test = function t(n) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(n);
      };
    }, {}],
    3: [function (t, n, i) {
      function r() {
        this._listeners = {};
      }
      (n.exports = r).prototype.on = function t(n, i, r) {
        (this._listeners[n] ||= []).push({
          fn: i,
          ctx: r || this
        });
        return this;
      };
      r.prototype.off = function t(n, i) {
        if (n === undefined) {
          this._listeners = {};
        } else if (i === undefined) {
          this._listeners[n] = [];
        } else {
          for (var r = this._listeners[n], u = 0; u < r.length;) {
            if (r[u].fn === i) {
              r.splice(u, 1);
            } else {
              ++u;
            }
          }
        }
        return this;
      };
      r.prototype.emit = function t(n) {
        var i = this._listeners[n];
        if (i) {
          var r = [];
          for (var u = 1; u < arguments.length;) {
            r.push(arguments[u++]);
          }
          for (u = 0; u < i.length;) {
            i[u].fn.apply(i[u++].ctx, r);
          }
        }
        return this;
      };
    }, {}],
    4: [function (t, n, i) {
      function r(t) {
        function n(t, n, i, r) {
          var u = n < 0 ? 1 : 0;
          if ((n = u ? -n : n) === 0) {
            t(1 / n > 0 ? 0 : 2147483648, i, r);
          } else if (isNaN(n)) {
            t(2143289344, i, r);
          } else {
            t(n > 3.4028234663852886e+38 ? (u << 31 | 2139095040) >>> 0 : n < 1.1754943508222875e-38 ? (u << 31 | Math.round(n / 1.401298464324817e-45)) >>> 0 : (u << 31 | (t = Math.floor(Math.log(n) / Math.LN2)) + 127 << 23 | Math.round(n * Math.pow(2, -t) * 8388608) & 8388607) >>> 0, i, r);
          }
        }
        function i(t, n, i) {
          t = t(n, i);
          n = (t >> 31) * 2 + 1;
          i = t >>> 23 & 255;
          t &= 8388607;
          if (i == 255) {
            if (t) {
              return NaN;
            } else {
              return n * Infinity;
            }
          } else if (i == 0) {
            return n * 1.401298464324817e-45 * t;
          } else {
            return n * Math.pow(2, i - 150) * (8388608 + t);
          }
        }
        function r(t, n, i) {
          h[0] = t;
          n[i] = o[0];
          n[i + 1] = o[1];
          n[i + 2] = o[2];
          n[i + 3] = o[3];
        }
        function u(t, n, i) {
          h[0] = t;
          n[i] = o[3];
          n[i + 1] = o[2];
          n[i + 2] = o[1];
          n[i + 3] = o[0];
        }
        function e(t, n) {
          o[0] = t[n];
          o[1] = t[n + 1];
          o[2] = t[n + 2];
          o[3] = t[n + 3];
          return h[0];
        }
        function s(t, n) {
          o[3] = t[n];
          o[2] = t[n + 1];
          o[1] = t[n + 2];
          o[0] = t[n + 3];
          return h[0];
        }
        var h;
        var o;
        var f;
        var c;
        var a;
        function l(t, n, i, r, u, e) {
          var s;
          var h;
          var o = r < 0 ? 1 : 0;
          if ((r = o ? -r : r) === 0) {
            t(0, u, e + n);
            t(1 / r > 0 ? 0 : 2147483648, u, e + i);
          } else if (isNaN(r)) {
            t(0, u, e + n);
            t(2146959360, u, e + i);
          } else if (r > 1.7976931348623157e+308) {
            t(0, u, e + n);
            t((o << 31 | 2146435072) >>> 0, u, e + i);
          } else if (r < 2.2250738585072014e-308) {
            t((s = r / 5e-324) >>> 0, u, e + n);
            t((o << 31 | s / 4294967296) >>> 0, u, e + i);
          } else {
            if ((h = Math.floor(Math.log(r) / Math.LN2)) === 1024) {
              h = 1023;
            }
            t((s = r * Math.pow(2, -h)) * 4503599627370496 >>> 0, u, e + n);
            t((o << 31 | h + 1023 << 20 | s * 1048576 & 1048575) >>> 0, u, e + i);
          }
        }
        function d(t, n, i, r, u) {
          n = t(r, u + n);
          t = t(r, u + i);
          r = (t >> 31) * 2 + 1;
          u = t >>> 20 & 2047;
          i = (t & 1048575) * 4294967296 + n;
          if (u == 2047) {
            if (i) {
              return NaN;
            } else {
              return r * Infinity;
            }
          } else if (u == 0) {
            return r * 5e-324 * i;
          } else {
            return r * Math.pow(2, u - 1075) * (i + 4503599627370496);
          }
        }
        function v(t, n, i) {
          f[0] = t;
          n[i] = c[0];
          n[i + 1] = c[1];
          n[i + 2] = c[2];
          n[i + 3] = c[3];
          n[i + 4] = c[4];
          n[i + 5] = c[5];
          n[i + 6] = c[6];
          n[i + 7] = c[7];
        }
        function w(t, n, i) {
          f[0] = t;
          n[i] = c[7];
          n[i + 1] = c[6];
          n[i + 2] = c[5];
          n[i + 3] = c[4];
          n[i + 4] = c[3];
          n[i + 5] = c[2];
          n[i + 6] = c[1];
          n[i + 7] = c[0];
        }
        function y(t, n) {
          c[0] = t[n];
          c[1] = t[n + 1];
          c[2] = t[n + 2];
          c[3] = t[n + 3];
          c[4] = t[n + 4];
          c[5] = t[n + 5];
          c[6] = t[n + 6];
          c[7] = t[n + 7];
          return f[0];
        }
        function b(t, n) {
          c[7] = t[n];
          c[6] = t[n + 1];
          c[5] = t[n + 2];
          c[4] = t[n + 3];
          c[3] = t[n + 4];
          c[2] = t[n + 5];
          c[1] = t[n + 6];
          c[0] = t[n + 7];
          return f[0];
        }
        if (typeof Float32Array != "undefined") {
          h = new Float32Array([-0]);
          o = new Uint8Array(h.buffer);
          a = o[3] === 128;
          t.writeFloatLE = a ? r : u;
          t.writeFloatBE = a ? u : r;
          t.readFloatLE = a ? e : s;
          t.readFloatBE = a ? s : e;
        } else {
          t.writeFloatLE = n.bind(null, g);
          t.writeFloatBE = n.bind(null, m);
          t.readFloatLE = i.bind(null, p);
          t.readFloatBE = i.bind(null, A);
        }
        if (typeof Float64Array != "undefined") {
          f = new Float64Array([-0]);
          c = new Uint8Array(f.buffer);
          a = c[7] === 128;
          t.writeDoubleLE = a ? v : w;
          t.writeDoubleBE = a ? w : v;
          t.readDoubleLE = a ? y : b;
          t.readDoubleBE = a ? b : y;
        } else {
          t.writeDoubleLE = l.bind(null, g, 0, 4);
          t.writeDoubleBE = l.bind(null, m, 4, 0);
          t.readDoubleLE = d.bind(null, p, 0, 4);
          t.readDoubleBE = d.bind(null, A, 4, 0);
        }
        return t;
      }
      function g(t, n, i) {
        n[i] = t & 255;
        n[i + 1] = t >>> 8 & 255;
        n[i + 2] = t >>> 16 & 255;
        n[i + 3] = t >>> 24;
      }
      function m(t, n, i) {
        n[i] = t >>> 24;
        n[i + 1] = t >>> 16 & 255;
        n[i + 2] = t >>> 8 & 255;
        n[i + 3] = t & 255;
      }
      function p(t, n) {
        return (t[n] | t[n + 1] << 8 | t[n + 2] << 16 | t[n + 3] << 24) >>> 0;
      }
      function A(t, n) {
        return (t[n] << 24 | t[n + 1] << 16 | t[n + 2] << 8 | t[n + 3]) >>> 0;
      }
      n.exports = r(r);
    }, {}],
    5: [function (require, module, exports) {
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length)) {
            return mod;
          }
        } catch (e) {}
        return null;
      }
      module.exports = inquire;
    }, {}],
    6: [function (t, n, i) {
      n.exports = function t(i, r, n) {
        var u = n || 8192;
        var e = u >>> 1;
        var s = null;
        var h = u;
        return function t(n) {
          if (n < 1 || e < n) {
            return i(n);
          }
          if (u < h + n) {
            s = i(u);
            h = 0;
          }
          n = r.call(s, h, h += n);
          if (h & 7) {
            h = 1 + (h | 7);
          }
          return n;
        };
      };
    }, {}],
    7: [function (t, n, i) {
      i.length = function t(n) {
        var i;
        var r = 0;
        for (var u = 0; u < n.length; ++u) {
          if ((i = n.charCodeAt(u)) < 128) {
            r += 1;
          } else if (i < 2048) {
            r += 2;
          } else if ((i & 64512) == 55296 && (n.charCodeAt(u + 1) & 64512) == 56320) {
            ++u;
            r += 4;
          } else {
            r += 3;
          }
        }
        return r;
      };
      i.read = function t(n, i, r) {
        if (r - i < 1) {
          return "";
        }
        for (var u, e = null, s = [], h = 0; i < r;) {
          if ((u = n[i++]) < 128) {
            s[h++] = u;
          } else if (u > 191 && u < 224) {
            s[h++] = (u & 31) << 6 | n[i++] & 63;
          } else if (u > 239 && u < 365) {
            u = ((u & 7) << 18 | (n[i++] & 63) << 12 | (n[i++] & 63) << 6 | n[i++] & 63) - 65536;
            s[h++] = 55296 + (u >> 10);
            s[h++] = 56320 + (u & 1023);
          } else {
            s[h++] = (u & 15) << 12 | (n[i++] & 63) << 6 | n[i++] & 63;
          }
          if (h > 8191) {
            (e = e || []).push(String.fromCharCode.apply(String, s));
            h = 0;
          }
        }
        if (e) {
          if (h) {
            e.push(String.fromCharCode.apply(String, s.slice(0, h)));
          }
          return e.join("");
        } else {
          return String.fromCharCode.apply(String, s.slice(0, h));
        }
      };
      i.write = function t(n, i, r) {
        var u;
        var e;
        var s = r;
        for (var h = 0; h < n.length; ++h) {
          if ((u = n.charCodeAt(h)) < 128) {
            i[r++] = u;
          } else {
            if (u < 2048) {
              i[r++] = u >> 6 | 192;
            } else {
              if ((u & 64512) == 55296 && ((e = n.charCodeAt(h + 1)) & 64512) == 56320) {
                ++h;
                i[r++] = (u = 65536 + ((u & 1023) << 10) + (e & 1023)) >> 18 | 240;
                i[r++] = u >> 12 & 63 | 128;
              } else {
                i[r++] = u >> 12 | 224;
              }
              i[r++] = u >> 6 & 63 | 128;
            }
            i[r++] = u & 63 | 128;
          }
        }
        return r - s;
      };
    }, {}],
    8: [function (t, n, i) {
      var r = i;
      function u() {
        r.util._configure();
        r.Writer._configure(r.BufferWriter);
        r.Reader._configure(r.BufferReader);
      }
      r.build = "minimal";
      r.Writer = t(16);
      r.BufferWriter = t(17);
      r.Reader = t(9);
      r.BufferReader = t(10);
      r.util = t(15);
      r.rpc = t(12);
      r.roots = t(11);
      r.configure = u;
      u();
    }, {
      10: 10,
      11: 11,
      12: 12,
      15: 15,
      16: 16,
      17: 17,
      9: 9
    }],
    9: [function (t, n, i) {
      n.exports = o;
      var r;
      var u = t(15);
      var e = u.LongBits;
      var s = u.utf8;
      function h(t, n) {
        return RangeError("index out of range: " + t.pos + " + " + (n || 1) + " > " + t.len);
      }
      function o(t) {
        this.buf = t;
        this.pos = 0;
        this.len = t.length;
      }
      var f = typeof Uint8Array != "undefined" ? function t(n) {
        if (n instanceof Uint8Array || Array.isArray(n)) {
          return new o(n);
        }
        throw Error("illegal buffer");
      } : function t(n) {
        if (Array.isArray(n)) {
          return new o(n);
        }
        throw Error("illegal buffer");
      };
      var c = function t() {
        if (u.Buffer) {
          return function t(n) {
            return (o.create = function t(n) {
              if (u.Buffer.isBuffer(n)) {
                return new r(n);
              } else {
                return f(n);
              }
            })(n);
          };
        } else {
          return f;
        }
      };
      function a() {
        var t = new e(0, 0);
        var n = 0;
        if (!(this.len - this.pos > 4)) {
          for (; n < 3; ++n) {
            if (this.pos >= this.len) {
              throw h(this);
            }
            t.lo = (t.lo | (this.buf[this.pos] & 127) << n * 7) >>> 0;
            if (this.buf[this.pos++] < 128) {
              return t;
            }
          }
          t.lo = (t.lo | (this.buf[this.pos++] & 127) << n * 7) >>> 0;
          return t;
        }
        for (; n < 4; ++n) {
          t.lo = (t.lo | (this.buf[this.pos] & 127) << n * 7) >>> 0;
          if (this.buf[this.pos++] < 128) {
            return t;
          }
        }
        t.lo = (t.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        t.hi = (t.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return t;
        }
        n = 0;
        if (this.len - this.pos > 4) {
          for (; n < 5; ++n) {
            t.hi = (t.hi | (this.buf[this.pos] & 127) << n * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) {
              return t;
            }
          }
        } else {
          for (; n < 5; ++n) {
            if (this.pos >= this.len) {
              throw h(this);
            }
            t.hi = (t.hi | (this.buf[this.pos] & 127) << n * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) {
              return t;
            }
          }
        }
        throw Error("invalid varint encoding");
      }
      function l(t, n) {
        return (t[n - 4] | t[n - 3] << 8 | t[n - 2] << 16 | t[n - 1] << 24) >>> 0;
      }
      function d() {
        if (this.pos + 8 > this.len) {
          throw h(this, 8);
        }
        return new e(l(this.buf, this.pos += 4), l(this.buf, this.pos += 4));
      }
      o.create = c();
      o.prototype._slice = u.Array.prototype.subarray || u.Array.prototype.slice;
      o.prototype.uint32 = function t() {
        var n = 4294967295;
        return function t() {
          n = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128 || (n = (n | (this.buf[this.pos] & 127) << 7) >>> 0, this.buf[this.pos++] < 128) || (n = (n | (this.buf[this.pos] & 127) << 14) >>> 0, this.buf[this.pos++] < 128) || (n = (n | (this.buf[this.pos] & 127) << 21) >>> 0, this.buf[this.pos++] < 128) || (n = (n | (this.buf[this.pos] & 15) << 28) >>> 0, this.buf[this.pos++] < 128) || !((this.pos += 5) > this.len)) {
            return n;
          }
          this.pos = this.len;
          throw h(this, 10);
        };
      }();
      o.prototype.int32 = function t() {
        return this.uint32() | 0;
      };
      o.prototype.sint32 = function t() {
        var n = this.uint32();
        return n >>> 1 ^ -(n & 1) | 0;
      };
      o.prototype.bool = function t() {
        return this.uint32() !== 0;
      };
      o.prototype.fixed32 = function t() {
        if (this.pos + 4 > this.len) {
          throw h(this, 4);
        }
        return l(this.buf, this.pos += 4);
      };
      o.prototype.sfixed32 = function t() {
        if (this.pos + 4 > this.len) {
          throw h(this, 4);
        }
        return l(this.buf, this.pos += 4) | 0;
      };
      o.prototype.float = function t() {
        if (this.pos + 4 > this.len) {
          throw h(this, 4);
        }
        var n = u.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return n;
      };
      o.prototype.double = function t() {
        if (this.pos + 8 > this.len) {
          throw h(this, 4);
        }
        var n = u.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return n;
      };
      o.prototype.bytes = function t() {
        var n = this.uint32();
        var i = this.pos;
        var r = this.pos + n;
        if (r > this.len) {
          throw h(this, n);
        }
        this.pos += n;
        if (Array.isArray(this.buf)) {
          return this.buf.slice(i, r);
        } else if (i === r) {
          return new this.buf.constructor(0);
        } else {
          return this._slice.call(this.buf, i, r);
        }
      };
      o.prototype.string = function t() {
        var n = this.bytes();
        return s.read(n, 0, n.length);
      };
      o.prototype.skip = function t(n) {
        if (typeof n == "number") {
          if (this.pos + n > this.len) {
            throw h(this, n);
          }
          this.pos += n;
        } else {
          do {
            if (this.pos >= this.len) {
              throw h(this);
            }
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      o.prototype.skipType = function (t) {
        switch (t) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((t = this.uint32() & 7) != 4) {
              this.skipType(t);
            }
            break;
          case 5:
            this.skip(4);
            break;
          default:
            throw Error("invalid wire type " + t + " at offset " + this.pos);
        }
        return this;
      };
      o._configure = function (t) {
        r = t;
        o.create = c();
        r._configure();
        var n = "toLong";
        u.merge(o.prototype, {
          int64: function t() {
            return a.call(this)[n](false);
          },
          uint64: function t() {
            return a.call(this)[n](true);
          },
          sint64: function t() {
            return a.call(this).zzDecode()[n](false);
          },
          fixed64: function t() {
            return d.call(this)[n](true);
          },
          sfixed64: function t() {
            return d.call(this)[n](false);
          }
        });
      };
    }, {
      15: 15
    }],
    10: [function (t, n, i) {
      n.exports = e;
      var r = t(9);
      (e.prototype = Object.create(r.prototype)).constructor = e;
      var u = t(15);
      function e(t) {
        r.call(this, t);
      }
      e._configure = function () {
        if (u.Buffer) {
          e.prototype._slice = u.Buffer.prototype.slice;
        }
      };
      e.prototype.string = function t() {
        var n = this.uint32();
        if (this.buf.utf8Slice) {
          return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + n, this.len));
        } else {
          return this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + n, this.len));
        }
      };
      e._configure();
    }, {
      15: 15,
      9: 9
    }],
    11: [function (t, n, i) {
      n.exports = {};
    }, {}],
    12: [function (t, n, i) {
      i.Service = t(13);
    }, {
      13: 13
    }],
    13: [function (t, n, i) {
      n.exports = r;
      var h = t(15);
      function r(t, n, i) {
        if (typeof t != "function") {
          throw TypeError("rpcImpl must be a function");
        }
        h.EventEmitter.call(this);
        this.rpcImpl = t;
        this.requestDelimited = Boolean(n);
        this.responseDelimited = Boolean(i);
      }
      ((r.prototype = Object.create(h.EventEmitter.prototype)).constructor = r).prototype.rpcCall = function t(r, n, u, i, e) {
        if (!i) {
          throw TypeError("request must be specified");
        }
        var s = this;
        if (!e) {
          return h.asPromise(t, s, r, n, u, i);
        }
        if (!s.rpcImpl) {
          setTimeout(function () {
            e(Error("already ended"));
          }, 0);
          return undefined;
        }
        try {
          return s.rpcImpl(r, n[s.requestDelimited ? "encodeDelimited" : "encode"](i).finish(), function t(n, i) {
            if (n) {
              s.emit("error", n, r);
              return e(n);
            }
            if (i === null) {
              s.end(true);
              return undefined;
            }
            if (!(i instanceof u)) {
              try {
                i = u[s.responseDelimited ? "decodeDelimited" : "decode"](i);
              } catch (n) {
                s.emit("error", n, r);
                return e(n);
              }
            }
            s.emit("data", i, r);
            return e(null, i);
          });
        } catch (t) {
          s.emit("error", t, r);
          setTimeout(function () {
            e(t);
          }, 0);
          return undefined;
        }
      };
      r.prototype.end = function t(n) {
        if (this.rpcImpl) {
          if (!n) {
            this.rpcImpl(null, null, null);
          }
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    }, {
      15: 15
    }],
    14: [function (t, n, i) {
      n.exports = u;
      var r = t(15);
      function u(t, n) {
        this.lo = t >>> 0;
        this.hi = n >>> 0;
      }
      var e = u.zero = new u(0, 0);
      e.toNumber = function () {
        return 0;
      };
      e.zzEncode = e.zzDecode = function () {
        return this;
      };
      e.length = function () {
        return 1;
      };
      u.zeroHash = "\0\0\0\0\0\0\0\0";
      u.fromNumber = function t(n) {
        var i;
        var r;
        if (n === 0) {
          return e;
        } else {
          r = (n = (i = n < 0) ? -n : n) >>> 0;
          n = (n - r) / 4294967296 >>> 0;
          if (i && (n = ~n >>> 0, r = ~r >>> 0, ++r > 4294967295) && (r = 0, ++n > 4294967295)) {
            n = 0;
          }
          return new u(r, n);
        }
      };
      u.from = function t(n) {
        if (typeof n == "number") {
          return u.fromNumber(n);
        }
        if (r.isString(n)) {
          if (!r.Long) {
            return u.fromNumber(parseInt(n, 10));
          }
          n = r.Long.fromString(n);
        }
        if (n.low || n.high) {
          return new u(n.low >>> 0, n.high >>> 0);
        } else {
          return e;
        }
      };
      u.prototype.toNumber = function t(n) {
        var i;
        if (!n && this.hi >>> 31) {
          n = 1 + ~this.lo >>> 0;
          i = ~this.hi >>> 0;
          return -(n + (i = n ? i : i + 1 >>> 0) * 4294967296);
        } else {
          return this.lo + this.hi * 4294967296;
        }
      };
      u.prototype.toLong = function t(n) {
        if (r.Long) {
          return new r.Long(this.lo | 0, this.hi | 0, Boolean(n));
        } else {
          return {
            low: this.lo | 0,
            high: this.hi | 0,
            unsigned: Boolean(n)
          };
        }
      };
      var s = String.prototype.charCodeAt;
      u.fromHash = function t(n) {
        if (n === "\0\0\0\0\0\0\0\0") {
          return e;
        } else {
          return new u((s.call(n, 0) | s.call(n, 1) << 8 | s.call(n, 2) << 16 | s.call(n, 3) << 24) >>> 0, (s.call(n, 4) | s.call(n, 5) << 8 | s.call(n, 6) << 16 | s.call(n, 7) << 24) >>> 0);
        }
      };
      u.prototype.toHash = function t() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
      };
      u.prototype.zzEncode = function t() {
        var n = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ n) >>> 0;
        this.lo = (this.lo << 1 ^ n) >>> 0;
        return this;
      };
      u.prototype.zzDecode = function t() {
        var n = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ n) >>> 0;
        this.hi = (this.hi >>> 1 ^ n) >>> 0;
        return this;
      };
      u.prototype.length = function t() {
        var n = this.lo;
        var i = (this.lo >>> 28 | this.hi << 4) >>> 0;
        var r = this.hi >>> 24;
        if (r == 0) {
          if (i == 0) {
            if (n < 16384) {
              if (n < 128) {
                return 1;
              } else {
                return 2;
              }
            } else if (n < 2097152) {
              return 3;
            } else {
              return 4;
            }
          } else if (i < 16384) {
            if (i < 128) {
              return 5;
            } else {
              return 6;
            }
          } else if (i < 2097152) {
            return 7;
          } else {
            return 8;
          }
        } else if (r < 128) {
          return 9;
        } else {
          return 10;
        }
      };
    }, {
      15: 15
    }],
    15: [function (t, n, i) {
      var u = i;
      function r(t, n, i) {
        for (var r = Object.keys(n), u = 0; u < r.length; ++u) {
          if (t[r[u]] === undefined || !i) {
            t[r[u]] = n[r[u]];
          }
        }
        return t;
      }
      function e(t) {
        function i(t, n) {
          if (!(this instanceof i)) {
            return new i(t, n);
          }
          Object.defineProperty(this, "message", {
            get: function () {
              return t;
            }
          });
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, i);
          } else {
            Object.defineProperty(this, "stack", {
              value: new Error().stack || ""
            });
          }
          if (n) {
            r(this, n);
          }
        }
        (i.prototype = Object.create(Error.prototype)).constructor = i;
        Object.defineProperty(i.prototype, "name", {
          get: function () {
            return t;
          }
        });
        i.prototype.toString = function t() {
          return this.name + ": " + this.message;
        };
        return i;
      }
      u.asPromise = t(1);
      u.base64 = t(2);
      u.EventEmitter = t(3);
      u.float = t(4);
      u.inquire = t(5);
      u.utf8 = t(7);
      u.pool = t(6);
      u.LongBits = t(14);
      u.isNode = Boolean(typeof global != "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      u.global = u.isNode && global || typeof window != "undefined" && window || typeof self != "undefined" && self || this;
      u.emptyArray = Object.freeze ? Object.freeze([]) : [];
      u.emptyObject = Object.freeze ? Object.freeze({}) : {};
      u.isInteger = Number.isInteger || function t(n) {
        return typeof n == "number" && isFinite(n) && Math.floor(n) === n;
      };
      u.isString = function t(n) {
        return typeof n == "string" || n instanceof String;
      };
      u.isObject = function t(n) {
        return n && typeof n == "object";
      };
      u.isset = u.isSet = function t(n, i) {
        var r = n[i];
        return r != null && !!n.hasOwnProperty(i) && (typeof r != "object" || (Array.isArray(r) ? r : Object.keys(r)).length > 0);
      };
      u.Buffer = function () {
        try {
          var t = u.inquire("buffer").Buffer;
          if (t.prototype.utf8Write) {
            return t;
          } else {
            return null;
          }
        } catch (t) {
          return null;
        }
      }();
      u._Buffer_from = null;
      u._Buffer_allocUnsafe = null;
      u.newBuffer = function t(n) {
        if (typeof n == "number") {
          if (u.Buffer) {
            return u._Buffer_allocUnsafe(n);
          } else {
            return new u.Array(n);
          }
        } else if (u.Buffer) {
          return u._Buffer_from(n);
        } else if (typeof Uint8Array == "undefined") {
          return n;
        } else {
          return new Uint8Array(n);
        }
      };
      u.Array = typeof Uint8Array != "undefined" ? Uint8Array : Array;
      u.Long = Long;
      u.key2Re = /^true|false|0|1$/;
      u.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      u.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      u.longToHash = function t(n) {
        if (n) {
          return u.LongBits.from(n).toHash();
        } else {
          return u.LongBits.zeroHash;
        }
      };
      u.longFromHash = function t(n, i) {
        n = u.LongBits.fromHash(n);
        if (u.Long) {
          return u.Long.fromBits(n.lo, n.hi, i);
        } else {
          return n.toNumber(Boolean(i));
        }
      };
      u.merge = r;
      u.lcFirst = function t(n) {
        return n.charAt(0).toLowerCase() + n.substring(1);
      };
      u.newError = e;
      u.ProtocolError = e("ProtocolError");
      u.oneOfGetter = function t(n) {
        var i = {};
        for (var r = 0; r < n.length; ++r) {
          i[n[r]] = 1;
        }
        return function () {
          var t = Object.keys(this);
          for (var n = t.length - 1; n > -1; --n) {
            if (i[t[n]] === 1 && this[t[n]] !== undefined) {
              return t[n];
            }
          }
        };
      };
      u.oneOfSetter = function t(i) {
        return function (t) {
          for (var n = 0; n < i.length; ++n) {
            if (i[n] !== t) {
              this[i[n]] = undefined;
            }
          }
        };
      };
      u.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      u._configure = function () {
        var r = u.Buffer;
        if (r) {
          u._Buffer_from = r.from !== Uint8Array.from && r.from || function t(n, i) {
            return new r(n, i);
          };
          u._Buffer_allocUnsafe = r.allocUnsafe || function t(n) {
            return new r(n);
          };
        } else {
          u._Buffer_from = u._Buffer_allocUnsafe = null;
        }
      };
    }, {
      1: 1,
      14: 14,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7
    }],
    16: [function (t, n, i) {
      n.exports = a;
      var r;
      var u = t(15);
      var e = u.LongBits;
      var s = u.base64;
      var h = u.utf8;
      function o(t, n, i) {
        this.fn = t;
        this.len = n;
        this.next = undefined;
        this.val = i;
      }
      function f() {}
      function c(t) {
        this.head = t.head;
        this.tail = t.tail;
        this.len = t.len;
        this.next = t.states;
      }
      function a() {
        this.len = 0;
        this.head = new o(f, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var l = function t() {
        if (u.Buffer) {
          return function t() {
            return (a.create = function t() {
              return new r();
            })();
          };
        } else {
          return function t() {
            return new a();
          };
        }
      };
      function d(t, n, i) {
        n[i] = t & 255;
      }
      function v(t, n) {
        this.len = t;
        this.next = undefined;
        this.val = n;
      }
      function w(t, n, i) {
        while (t.hi) {
          n[i++] = t.lo & 127 | 128;
          t.lo = (t.lo >>> 7 | t.hi << 25) >>> 0;
          t.hi >>>= 7;
        }
        while (t.lo > 127) {
          n[i++] = t.lo & 127 | 128;
          t.lo = t.lo >>> 7;
        }
        n[i++] = t.lo;
      }
      function y(t, n, i) {
        n[i] = t & 255;
        n[i + 1] = t >>> 8 & 255;
        n[i + 2] = t >>> 16 & 255;
        n[i + 3] = t >>> 24;
      }
      a.create = l();
      a.alloc = function t(n) {
        return new u.Array(n);
      };
      if (u.Array !== Array) {
        a.alloc = u.pool(a.alloc, u.Array.prototype.subarray);
      }
      a.prototype._push = function t(n, i, r) {
        this.tail = this.tail.next = new o(n, i, r);
        this.len += i;
        return this;
      };
      (v.prototype = Object.create(o.prototype)).fn = function t(n, i, r) {
        while (n > 127) {
          i[r++] = n & 127 | 128;
          n >>>= 7;
        }
        i[r] = n;
      };
      a.prototype.uint32 = function t(n) {
        this.len += (this.tail = this.tail.next = new v((n >>>= 0) < 128 ? 1 : n < 16384 ? 2 : n < 2097152 ? 3 : n < 268435456 ? 4 : 5, n)).len;
        return this;
      };
      a.prototype.int32 = function t(n) {
        if (n < 0) {
          return this._push(w, 10, e.fromNumber(n));
        } else {
          return this.uint32(n);
        }
      };
      a.prototype.sint32 = function t(n) {
        return this.uint32((n << 1 ^ n >> 31) >>> 0);
      };
      a.prototype.int64 = a.prototype.uint64 = function t(n) {
        n = e.from(n);
        return this._push(w, n.length(), n);
      };
      a.prototype.sint64 = function t(n) {
        n = e.from(n).zzEncode();
        return this._push(w, n.length(), n);
      };
      a.prototype.bool = function t(n) {
        return this._push(d, 1, n ? 1 : 0);
      };
      a.prototype.sfixed32 = a.prototype.fixed32 = function t(n) {
        return this._push(y, 4, n >>> 0);
      };
      a.prototype.sfixed64 = a.prototype.fixed64 = function t(n) {
        n = e.from(n);
        return this._push(y, 4, n.lo)._push(y, 4, n.hi);
      };
      a.prototype.float = function t(n) {
        return this._push(u.float.writeFloatLE, 4, n);
      };
      a.prototype.double = function t(n) {
        return this._push(u.float.writeDoubleLE, 8, n);
      };
      var b = u.Array.prototype.set ? function t(n, i, r) {
        i.set(n, r);
      } : function t(n, i, r) {
        for (var u = 0; u < n.length; ++u) {
          i[r + u] = n[u];
        }
      };
      a.prototype.bytes = function t(n) {
        var i;
        var r = n.length >>> 0;
        if (r) {
          if (u.isString(n)) {
            i = a.alloc(r = s.length(n));
            s.decode(n, i, 0);
            n = i;
          }
          return this.uint32(r)._push(b, r, n);
        } else {
          return this._push(d, 1, 0);
        }
      };
      a.prototype.string = function t(n) {
        var i = h.length(n);
        if (i) {
          return this.uint32(i)._push(h.write, i, n);
        } else {
          return this._push(d, 1, 0);
        }
      };
      a.prototype.fork = function t() {
        this.states = new c(this);
        this.head = this.tail = new o(f, 0, 0);
        this.len = 0;
        return this;
      };
      a.prototype.reset = function t() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new o(f, 0, 0);
          this.len = 0;
        }
        return this;
      };
      a.prototype.ldelim = function t() {
        var n = this.head;
        var i = this.tail;
        var r = this.len;
        this.reset().uint32(r);
        if (r) {
          this.tail.next = n.next;
          this.tail = i;
          this.len += r;
        }
        return this;
      };
      a.prototype.finish = function t() {
        for (var n = this.head.next, i = this.constructor.alloc(this.len), r = 0; n;) {
          n.fn(n.val, i, r);
          r += n.len;
          n = n.next;
        }
        return i;
      };
      a._configure = function (t) {
        r = t;
        a.create = l();
        r._configure();
      };
    }, {
      15: 15
    }],
    17: [function (t, n, i) {
      n.exports = e;
      var r = t(16);
      (e.prototype = Object.create(r.prototype)).constructor = e;
      var u = t(15);
      function e() {
        r.call(this);
      }
      function s(t, n, i) {
        if (t.length < 40) {
          u.utf8.write(t, n, i);
        } else if (n.utf8Write) {
          n.utf8Write(t, i);
        } else {
          n.write(t, i);
        }
      }
      e._configure = function () {
        e.alloc = u._Buffer_allocUnsafe;
        e.writeBytesBuffer = u.Buffer && u.Buffer.prototype instanceof Uint8Array && u.Buffer.prototype.set.name === "set" ? function t(n, i, r) {
          i.set(n, r);
        } : function t(n, i, r) {
          if (n.copy) {
            n.copy(i, r, 0, n.length);
          } else {
            for (var u = 0; u < n.length;) {
              i[r++] = n[u++];
            }
          }
        };
      };
      e.prototype.bytes = function t(n) {
        var i = (n = u.isString(n) ? u._Buffer_from(n, "base64") : n).length >>> 0;
        this.uint32(i);
        if (i) {
          this._push(e.writeBytesBuffer, i, n);
        }
        return this;
      };
      e.prototype.string = function t(n) {
        var i = u.Buffer.byteLength(n);
        this.uint32(i);
        if (i) {
          this._push(s, i, n);
        }
        return this;
      };
      e._configure();
    }, {
      15: 15,
      16: 16
    }]
  }, {}, [8]);
})(); //# sourceMappingURL=protobuf.js.map