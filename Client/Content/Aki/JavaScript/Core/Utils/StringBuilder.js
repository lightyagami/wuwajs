"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringBuilder = undefined;
const DEFAULT_SIZE = 16;
class StringBuilder {
  constructor(...t) {
    this.kz = new Array(DEFAULT_SIZE);
    if (t.length > 0) {
      this.Append(...t);
    }
  }
  get Store() {
    return this.kz;
  }
  Append(...t) {
    for (const r of t) {
      if (typeof r == "string") {
        this.kz.push(r);
      } else if (r instanceof Array) {
        this.kz.push(...r);
      } else if (r instanceof StringBuilder) {
        this.kz.push(...r.Store);
      } else {
        this.kz.push(r);
      }
    }
  }
  RemoveLast(r) {
    for (let t = 0; t < r; ++t) {
      this.kz.pop();
    }
  }
  ToString() {
    return this.kz.join("");
  }
  Clear() {
    this.kz.length = 0;
  }
}
exports.StringBuilder = StringBuilder;
//# sourceMappingURL=StringBuilder.js.map