module.exports = Long;
var wasm = null;
function Long(t, o, r) {
  this.low = t | 0;
  this.high = o | 0;
  this.unsigned = !!r;
}
function isLong(t) {
  return (t && t.__isLong__) === true;
}
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", {
  value: true
});
Long.isLong = isLong;
var INT_CACHE = {};
var UINT_CACHE = {};
function fromInt(t, o) {
  var r;
  var n;
  var i;
  if (o) {
    if ((i = (t >>>= 0) >= 0 && t < 256) && (n = UINT_CACHE[t])) {
      return n;
    } else {
      r = fromBits(t, (t | 0) < 0 ? -1 : 0, true);
      if (i) {
        UINT_CACHE[t] = r;
      }
      return r;
    }
  } else if ((i = (t |= 0) >= -128 && t < 128) && (n = INT_CACHE[t])) {
    return n;
  } else {
    r = fromBits(t, t < 0 ? -1 : 0, false);
    if (i) {
      INT_CACHE[t] = r;
    }
    return r;
  }
}
function fromNumber(t, o) {
  if (isNaN(t)) {
    if (o) {
      return UZERO;
    } else {
      return ZERO;
    }
  }
  if (o) {
    if (t < 0) {
      return UZERO;
    }
    if (TWO_PWR_64_DBL <= t) {
      return MAX_UNSIGNED_VALUE;
    }
  } else {
    if (t <= -TWO_PWR_63_DBL) {
      return MIN_VALUE;
    }
    if (TWO_PWR_63_DBL <= t + 1) {
      return MAX_VALUE;
    }
  }
  if (t < 0) {
    return fromNumber(-t, o).neg();
  } else {
    return fromBits(t % TWO_PWR_32_DBL | 0, t / TWO_PWR_32_DBL | 0, o);
  }
}
function fromBigInt(t, o) {
  if (t < 0) {
    return fromBigInt(-t, o).neg();
  } else {
    return fromBits(Number(t % BigInt_TWO_PWR_32_DBL), Number(t / BigInt_TWO_PWR_32_DBL), o);
  }
}
function fromBits(t, o, r) {
  return new Long(t, o, r);
}
Long.fromInt = fromInt;
Long.fromBigInt = fromBigInt;
Long.fromNumber = fromNumber;
Long.fromBits = fromBits;
var pow_dbl = Math.pow;
function fromString(t, o, r) {
  if (t.length === 0) {
    throw Error("empty string");
  }
  if (t === "NaN" || t === "Infinity" || t === "+Infinity" || t === "-Infinity") {
    return ZERO;
  }
  o = typeof o == "number" ? (r = o, false) : !!o;
  if ((r = r || 10) < 2 || r > 36) {
    throw RangeError("radix");
  }
  var n;
  if ((n = t.indexOf("-")) > 0) {
    throw Error("interior hyphen");
  }
  if (n === 0) {
    return fromString(t.substring(1), o, r).neg();
  }
  var i = fromNumber(pow_dbl(r, 8));
  var s = ZERO;
  for (var e = 0; e < t.length; e += 8) {
    var h = Math.min(8, t.length - e);
    var L = parseInt(t.substring(e, e + h), r);
    s = (h < 8 ? (h = fromNumber(pow_dbl(r, h)), s.mul(h)) : s = s.mul(i)).add(fromNumber(L));
  }
  s.unsigned = o;
  return s;
}
function fromValue(t, o) {
  if (typeof t == "number") {
    return fromNumber(t, o);
  } else if (typeof t == "string") {
    return fromString(t, o);
  } else if (typeof t == "bigint") {
    return fromBigInt(t, o);
  } else {
    return fromBits(t.low, t.high, typeof o == "boolean" ? o : t.unsigned);
  }
}
Long.fromString = fromString;
Long.fromValue = fromValue;
var BigInt_TWO_PWR_32_DBL = 1n << 32n;
var TWO_PWR_16_DBL = 65536;
var TWO_PWR_24_DBL = 16777216;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
Long.ZERO = ZERO;
var UZERO = fromInt(0, true);
Long.UZERO = UZERO;
var ONE = fromInt(1);
Long.ONE = ONE;
var UONE = fromInt(1, true);
Long.UONE = UONE;
var NEG_ONE = fromInt(-1);
Long.NEG_ONE = NEG_ONE;
var MAX_VALUE = fromBits(-1, 2147483647, false);
Long.MAX_VALUE = MAX_VALUE;
var MAX_UNSIGNED_VALUE = fromBits(-1, -1, true);
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
var MIN_VALUE = fromBits(0, -2147483648, false);
Long.MIN_VALUE = MIN_VALUE;
var LongPrototype = Long.prototype;
LongPrototype.toInt = function t() {
  if (this.unsigned) {
    return this.low >>> 0;
  } else {
    return this.low;
  }
};
LongPrototype.toNumber = function t() {
  if (this.unsigned) {
    return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
  } else {
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
  }
};
LongPrototype.toString = function t(o) {
  if ((o = o || 10) < 2 || o > 36) {
    throw RangeError("radix");
  }
  if (this.isZero()) {
    return "0";
  }
  var r;
  var n;
  if (this.isNegative()) {
    if (this.eq(MIN_VALUE)) {
      n = fromNumber(o);
      n = (r = this.div(n)).mul(n).sub(this);
      return r.toString(o) + n.toInt().toString(o);
    } else {
      return "-" + this.neg().toString(o);
    }
  }
  var i = fromNumber(pow_dbl(o, 6), this.unsigned);
  var s = this;
  var e = "";
  while (true) {
    var h = s.div(i);
    var L = (s.sub(h.mul(i)).toInt() >>> 0).toString(o);
    if ((s = h).isZero()) {
      return L + e;
    }
    while (L.length < 6) {
      L = "0" + L;
    }
    e = "" + L + e;
  }
};
LongPrototype.getHighBits = function t() {
  return this.high;
};
LongPrototype.getHighBitsUnsigned = function t() {
  return this.high >>> 0;
};
LongPrototype.getLowBits = function t() {
  return this.low;
};
LongPrototype.getLowBitsUnsigned = function t() {
  return this.low >>> 0;
};
LongPrototype.getNumBitsAbs = function t() {
  if (this.isNegative()) {
    if (this.eq(MIN_VALUE)) {
      return 64;
    } else {
      return this.neg().getNumBitsAbs();
    }
  }
  for (var o = this.high != 0 ? this.high : this.low, r = 31; r > 0 && (o & 1 << r) == 0; r--);
  if (this.high != 0) {
    return r + 33;
  } else {
    return r + 1;
  }
};
LongPrototype.isZero = function t() {
  return this.high === 0 && this.low === 0;
};
LongPrototype.eqz = LongPrototype.isZero;
LongPrototype.isNegative = function t() {
  return !this.unsigned && this.high < 0;
};
LongPrototype.isPositive = function t() {
  return this.unsigned || this.high >= 0;
};
LongPrototype.isOdd = function t() {
  return (this.low & 1) == 1;
};
LongPrototype.isEven = function t() {
  return (this.low & 1) == 0;
};
LongPrototype.equals = function t(o) {
  if (!isLong(o)) {
    o = fromValue(o);
  }
  return (this.unsigned === o.unsigned || this.high >>> 31 != 1 || o.high >>> 31 != 1) && this.high === o.high && this.low === o.low;
};
LongPrototype.eq = LongPrototype.equals;
LongPrototype.notEquals = function t(o) {
  return !this.eq(o);
};
LongPrototype.neq = LongPrototype.notEquals;
LongPrototype.ne = LongPrototype.notEquals;
LongPrototype.lessThan = function t(o) {
  return this.comp(o) < 0;
};
LongPrototype.lt = LongPrototype.lessThan;
LongPrototype.lessThanOrEqual = function t(o) {
  return this.comp(o) <= 0;
};
LongPrototype.lte = LongPrototype.lessThanOrEqual;
LongPrototype.le = LongPrototype.lessThanOrEqual;
LongPrototype.greaterThan = function t(o) {
  return this.comp(o) > 0;
};
LongPrototype.gt = LongPrototype.greaterThan;
LongPrototype.greaterThanOrEqual = function t(o) {
  return this.comp(o) >= 0;
};
LongPrototype.gte = LongPrototype.greaterThanOrEqual;
LongPrototype.ge = LongPrototype.greaterThanOrEqual;
LongPrototype.compare = function t(o) {
  var r;
  var n;
  if (!isLong(o)) {
    o = fromValue(o);
  }
  if (this.eq(o)) {
    return 0;
  } else {
    r = this.isNegative();
    n = o.isNegative();
    if (r && !n) {
      return -1;
    } else if (!r && n) {
      return 1;
    } else if (this.unsigned) {
      if (o.high >>> 0 > this.high >>> 0 || o.high === this.high && o.low >>> 0 > this.low >>> 0) {
        return -1;
      } else {
        return 1;
      }
    } else if (this.sub(o).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  }
};
LongPrototype.comp = LongPrototype.compare;
LongPrototype.negate = function t() {
  if (!this.unsigned && this.eq(MIN_VALUE)) {
    return MIN_VALUE;
  } else {
    return this.not().add(ONE);
  }
};
LongPrototype.neg = LongPrototype.negate;
LongPrototype.add = function t(o) {
  if (!isLong(o)) {
    o = fromValue(o);
  }
  var r = this.high >>> 16;
  var n = this.high & 65535;
  var i = this.low >>> 16;
  var s = this.low & 65535;
  var e = o.high >>> 16;
  var h = o.high & 65535;
  var L = o.low >>> 16;
  var f = 0;
  var u = 0;
  var g = 0;
  var _ = 0;
  u += (g = g + ((_ += s + (o.low & 65535)) >>> 16) + (i + L)) >>> 16;
  return fromBits((g &= 65535) << 16 | (_ &= 65535), ((f += (u += n + h) >>> 16) + (r + e) & 65535) << 16 | (u &= 65535), this.unsigned);
};
LongPrototype.subtract = function t(o) {
  if (!isLong(o)) {
    o = fromValue(o);
  }
  return this.add(o.neg());
};
LongPrototype.sub = LongPrototype.subtract;
LongPrototype.multiply = function t(o) {
  var r;
  var n;
  var i;
  var s;
  var e;
  var h;
  var L;
  var f;
  var u;
  var g;
  var _;
  if (this.isZero()) {
    return ZERO;
  } else {
    if (!isLong(o)) {
      o = fromValue(o);
    }
    if (wasm) {
      return fromBits(wasm.mul(this.low, this.high, o.low, o.high), wasm.get_high(), this.unsigned);
    } else if (o.isZero()) {
      return ZERO;
    } else if (this.eq(MIN_VALUE)) {
      if (o.isOdd()) {
        return MIN_VALUE;
      } else {
        return ZERO;
      }
    } else if (o.eq(MIN_VALUE)) {
      if (this.isOdd()) {
        return MIN_VALUE;
      } else {
        return ZERO;
      }
    } else if (this.isNegative()) {
      if (o.isNegative()) {
        return this.neg().mul(o.neg());
      } else {
        return this.neg().mul(o).neg();
      }
    } else if (o.isNegative()) {
      return this.mul(o.neg()).neg();
    } else if (this.lt(TWO_PWR_24) && o.lt(TWO_PWR_24)) {
      return fromNumber(this.toNumber() * o.toNumber(), this.unsigned);
    } else {
      r = this.high >>> 16;
      n = this.high & 65535;
      i = this.low >>> 16;
      s = this.low & 65535;
      e = o.high >>> 16;
      h = o.high & 65535;
      L = o.low >>> 16;
      _ = (_ = g = u = f = 0) + ((u = u + ((g += s * (o = o.low & 65535)) >>> 16) + i * o) >>> 16) + ((u = (u & 65535) + s * L) >>> 16);
      return fromBits((u &= 65535) << 16 | (g &= 65535), (f = (f = (f += (_ += n * o) >>> 16) + ((_ = (_ & 65535) + i * L) >>> 16) + ((_ = (_ & 65535) + s * h) >>> 16)) + (r * o + n * L + i * h + s * e) & 65535) << 16 | (_ &= 65535), this.unsigned);
    }
  }
};
LongPrototype.mul = LongPrototype.multiply;
LongPrototype.divide = function t(o) {
  if ((o = isLong(o) ? o : fromValue(o)).isZero()) {
    throw Error("division by zero");
  }
  var r;
  var n;
  var i;
  if (wasm) {
    if (this.unsigned || this.high !== -2147483648 || o.low !== -1 || o.high !== -1) {
      return fromBits((this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, o.low, o.high), wasm.get_high(), this.unsigned);
    } else {
      return this;
    }
  }
  if (this.isZero()) {
    if (this.unsigned) {
      return UZERO;
    } else {
      return ZERO;
    }
  }
  if (this.unsigned) {
    if ((o = o.unsigned ? o : o.toUnsigned()).gt(this)) {
      return UZERO;
    }
    if (o.gt(this.shru(1))) {
      return UONE;
    }
    n = UZERO;
  } else {
    if (this.eq(MIN_VALUE)) {
      if (o.eq(ONE) || o.eq(NEG_ONE)) {
        return MIN_VALUE;
      } else if (o.eq(MIN_VALUE)) {
        return ONE;
      } else if ((i = this.shr(1).div(o).shl(1)).eq(ZERO)) {
        if (o.isNegative()) {
          return ONE;
        } else {
          return NEG_ONE;
        }
      } else {
        r = this.sub(o.mul(i));
        return i.add(r.div(o));
      }
    }
    if (o.eq(MIN_VALUE)) {
      if (this.unsigned) {
        return UZERO;
      } else {
        return ZERO;
      }
    }
    if (this.isNegative()) {
      if (o.isNegative()) {
        return this.neg().div(o.neg());
      } else {
        return this.neg().div(o).neg();
      }
    }
    if (o.isNegative()) {
      return this.div(o.neg()).neg();
    }
    n = ZERO;
  }
  for (r = this; r.gte(o);) {
    i = Math.max(1, Math.floor(r.toNumber() / o.toNumber()));
    var s = Math.ceil(Math.log(i) / Math.LN2);
    var e = s <= 48 ? 1 : pow_dbl(2, s - 48);
    var h = fromNumber(i);
    for (var L = h.mul(o); L.isNegative() || L.gt(r);) {
      L = (h = fromNumber(i -= e, this.unsigned)).mul(o);
    }
    if (h.isZero()) {
      h = ONE;
    }
    n = n.add(h);
    r = r.sub(L);
  }
  return n;
};
LongPrototype.div = LongPrototype.divide;
LongPrototype.modulo = function t(o) {
  if (!isLong(o)) {
    o = fromValue(o);
  }
  if (wasm) {
    return fromBits((this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, o.low, o.high), wasm.get_high(), this.unsigned);
  } else {
    return this.sub(this.div(o).mul(o));
  }
};
LongPrototype.mod = LongPrototype.modulo;
LongPrototype.rem = LongPrototype.modulo;
LongPrototype.not = function t() {
  return fromBits(~this.low, ~this.high, this.unsigned);
};
LongPrototype.and = function t(o) {
  if (!isLong(o)) {
    o = fromValue(o);
  }
  return fromBits(this.low & o.low, this.high & o.high, this.unsigned);
};
LongPrototype.or = function t(o) {
  if (!isLong(o)) {
    o = fromValue(o);
  }
  return fromBits(this.low | o.low, this.high | o.high, this.unsigned);
};
LongPrototype.xor = function t(o) {
  if (!isLong(o)) {
    o = fromValue(o);
  }
  return fromBits(this.low ^ o.low, this.high ^ o.high, this.unsigned);
};
LongPrototype.shiftLeft = function t(o) {
  if (isLong(o)) {
    o = o.toInt();
  }
  if ((o &= 63) == 0) {
    return this;
  } else if (o < 32) {
    return fromBits(this.low << o, this.high << o | this.low >>> 32 - o, this.unsigned);
  } else {
    return fromBits(0, this.low << o - 32, this.unsigned);
  }
};
LongPrototype.shl = LongPrototype.shiftLeft;
LongPrototype.shiftRight = function t(o) {
  if (isLong(o)) {
    o = o.toInt();
  }
  if ((o &= 63) == 0) {
    return this;
  } else if (o < 32) {
    return fromBits(this.low >>> o | this.high << 32 - o, this.high >> o, this.unsigned);
  } else {
    return fromBits(this.high >> o - 32, this.high >= 0 ? 0 : -1, this.unsigned);
  }
};
LongPrototype.shr = LongPrototype.shiftRight;
LongPrototype.shiftRightUnsigned = function t(o) {
  var r;
  if (isLong(o)) {
    o = o.toInt();
  }
  if ((o &= 63) === 0) {
    return this;
  } else {
    r = this.high;
    if (o < 32) {
      return fromBits(this.low >>> o | r << 32 - o, r >>> o, this.unsigned);
    } else {
      return fromBits(o === 32 ? r : r >>> o - 32, 0, this.unsigned);
    }
  }
};
LongPrototype.shru = LongPrototype.shiftRightUnsigned;
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
LongPrototype.toSigned = function t() {
  if (this.unsigned) {
    return fromBits(this.low, this.high, false);
  } else {
    return this;
  }
};
LongPrototype.toUnsigned = function t() {
  if (this.unsigned) {
    return this;
  } else {
    return fromBits(this.low, this.high, true);
  }
};
LongPrototype.toBytes = function t(o) {
  if (o) {
    return this.toBytesLE();
  } else {
    return this.toBytesBE();
  }
};
LongPrototype.toBytesLE = function t() {
  var o = this.high;
  var r = this.low;
  return [r & 255, r >>> 8 & 255, r >>> 16 & 255, r >>> 24, o & 255, o >>> 8 & 255, o >>> 16 & 255, o >>> 24];
};
LongPrototype.toBytesBE = function t() {
  var o = this.high;
  var r = this.low;
  return [o >>> 24, o >>> 16 & 255, o >>> 8 & 255, o & 255, r >>> 24, r >>> 16 & 255, r >>> 8 & 255, r & 255];
};
Long.fromBytes = function t(o, r, n) {
  if (n) {
    return Long.fromBytesLE(o, r);
  } else {
    return Long.fromBytesBE(o, r);
  }
};
Long.fromBytesLE = function t(o, r) {
  return new Long(o[0] | o[1] << 8 | o[2] << 16 | o[3] << 24, o[4] | o[5] << 8 | o[6] << 16 | o[7] << 24, r);
};
Long.fromBytesBE = function t(o, r) {
  return new Long(o[4] << 24 | o[5] << 16 | o[6] << 8 | o[7], o[0] << 24 | o[1] << 16 | o[2] << 8 | o[3], r);
};
Long.prototype.toString = function t() {
  return "(low: " + this.low + ", high: " + this.high + ")";
}; //# sourceMappingURL=long.js.map