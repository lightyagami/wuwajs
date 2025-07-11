"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTokenElementWithCount = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleTokenElementWithCount extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ElementItem = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.ElementItem = new RogueBattleTokenElement_1.RogueBattleTokenElement();
    return this.ElementItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(e, t, r) {
    this.ElementItem?.Refresh(e.ElementId, t, r);
    this.GetText(1).SetText(e.Count.toString());
    this.GetText(1).SetChangeColor(e.IsPreview);
  }
}
exports.RogueBattleTokenElementWithCount = RogueBattleTokenElementWithCount;
//# sourceMappingURL=RogueBattleTokenElementWithCount.js.map