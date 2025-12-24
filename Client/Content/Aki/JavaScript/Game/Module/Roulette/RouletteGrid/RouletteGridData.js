"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rouletteGridGenerator = exports.RouletteData = undefined;
const RouletteGridEquipItem_1 = require("./RouletteGridEquipItem");
const RouletteGridExplore_1 = require("./RouletteGridExplore");
const RouletteGridFunction_1 = require("./RouletteGridFunction");
class RouletteData {
  constructor() {
    this.Id = 0;
    this.ShowIndex = false;
    this.GridIndex = 0;
    this.GridType = 0;
    this.ShowNum = false;
    this.DataNum = 0;
    this.DataIndex = 0;
    this.Name = undefined;
    this.State = 1;
    this.ShowRedDot = true;
    this.UseType = 0;
  }
  DeepCopy() {
    var t = new RouletteData();
    t.DataIndex = this.DataIndex;
    t.GridIndex = this.GridIndex;
    t.GridType = this.GridType;
    t.Id = this.Id;
    t.Name = this.Name;
    t.State = this.State;
    t.ShowIndex = this.ShowIndex;
    t.ShowRedDot = this.ShowRedDot;
    t.UseType = this.UseType;
    return t;
  }
}
exports.RouletteData = RouletteData;
exports.rouletteGridGenerator = {
  [0]: RouletteGridExplore_1.RouletteGridExplore,
  1: RouletteGridFunction_1.RouletteGridFunction,
  2: RouletteGridEquipItem_1.RouletteGridEquipItem
}; //# sourceMappingURL=RouletteGridData.js.map