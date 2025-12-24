"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaLogicFactory = undefined;
const PhantomArenaFieldLogic_1 = require("./PhantomArenaFieldLogic");
const PhantomArenaNormalLogic_1 = require("./PhantomArenaNormalLogic");
const PhantomArenaToolLogic_1 = require("./PhantomArenaToolLogic");
class PhantomArenaLogicFactory {
  static CreateLogic(o, a, e) {
    return new (a === 1 ? PhantomArenaNormalLogic_1.PhantomArenaNormalLogic : a === 3 ? PhantomArenaFieldLogic_1.PhantomArenaFieldLogic : a === 2 ? PhantomArenaToolLogic_1.PhantomArenaToolLogic : PhantomArenaNormalLogic_1.PhantomArenaNormalLogic)(o, e);
  }
}
exports.PhantomArenaLogicFactory = PhantomArenaLogicFactory;
//# sourceMappingURL=PhantomArenaLogicFactory.js.map