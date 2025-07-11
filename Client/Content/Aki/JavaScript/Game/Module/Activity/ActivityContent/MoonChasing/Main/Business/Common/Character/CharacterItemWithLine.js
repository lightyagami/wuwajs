"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterItemWithLine = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../../../Util/Grid/GridProxyAbstract");
const CharacterItem_1 = require("./CharacterItem");
class CharacterItemWithLine extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.CharacterItem = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.CharacterItem = new CharacterItem_1.CharacterItem();
    await this.CharacterItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(t, e, r) {
    this.CharacterItem.Refresh(t);
    this.GetItem(1)?.SetUIActive(r !== 0);
  }
}
exports.CharacterItemWithLine = CharacterItemWithLine;
//# sourceMappingURL=CharacterItemWithLine.js.map