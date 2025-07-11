"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectPool = undefined;
class ObjectPool {
  constructor() {
    this.oY = [];
  }
  Spawn(t) {
    return this.oY.pop();
  }
  DeSpawn(t) {
    this.oY.push(t);
  }
  IsEmpty() {
    return this.oY.length === 0;
  }
}
exports.ObjectPool = ObjectPool;
//# sourceMappingURL=ObjectPool.js.map