"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorCompareVar = undefined;
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorCompareVar extends LevelAiDecorator_1.LevelAiDecorator {
  CheckCondition(e) {
    var r = this.Params;
    return !!r && (r.Compare !== "Eq" || r.Var1.Type !== r.Var2.Type || r.Var1.Source !== "Self" || r.Var2.Source !== "Constant" ? (this.PrintDescription("配置错误"), false) : (e = this.GetWorldStateProxy(e), this.CIe(e, r.Var1.Name, r.Var2)));
  }
  CIe(e, r, t) {
    switch (t.Type) {
      case "Int":
        return t.Value === e.GetIntWorldState(r);
      case "Boolean":
        return t.Value === e.GetBooleanWorldState(r);
      default:
        return false;
    }
  }
}
exports.LevelAiDecoratorCompareVar = LevelAiDecoratorCompareVar;
//# sourceMappingURL=LevelAiDecoratorCompareVar.js.map