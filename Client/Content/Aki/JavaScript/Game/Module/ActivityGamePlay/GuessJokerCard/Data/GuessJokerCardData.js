"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCardData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class GuessJokerCardData {
  constructor(t) {
    this.FFe = 0;
    this.Gmh = 0;
    this.Bjh = "";
    this.f8o = 0;
    this.u3f = false;
    this.YFg = false;
    this.Kdn = undefined;
    this.nLf = undefined;
    this.FFe = t;
    t = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerDeck(t);
    this.f8o = t.CardType;
    this.Gmh = t.CardNumber;
    this.Bjh = t.TexturePath;
  }
  ChangeBlankValue(t) {
    if (this.Type === 2 && t !== this.Id && t !== 0) {
      t = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerDeck(t);
      this.Gmh = t.CardNumber;
      this.Bjh = t.TexturePath;
      this.u3f = true;
      this.YFg = true;
      this.Kdn = t;
    }
  }
  IsChangedToJoker() {
    return this.Type === 2 && this.Kdn?.CardType === 1;
  }
  SetBelongPlayerType(t) {
    this.nLf = t;
  }
  GetBelongPlayerType() {
    return this.nLf;
  }
  IsBlank() {
    return this.Type === 2;
  }
  IsJoker() {
    return this.Type === 1;
  }
  HasChanged() {
    return this.u3f;
  }
  GetChange() {
    var t = this.YFg;
    this.YFg = false;
    return t;
  }
  get Id() {
    return this.FFe;
  }
  get Type() {
    return this.f8o;
  }
  get Value() {
    return this.Gmh;
  }
  get TexturePath() {
    return this.Bjh;
  }
}
exports.GuessJokerCardData = GuessJokerCardData;
//# sourceMappingURL=GuessJokerCardData.js.map