"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROULETTE_FUNCTION_IN_USE = exports.ROULETTE_EXPLORE_IN_USE = exports.ROULETTE_NUM = exports.DEFAULT_ITEM_ROULETTE_GRID_INDEX = exports.ROULETTE_TEXT_EMPTY = exports.AssemblyTipsData = exports.AssemblyEquipItemGridData = exports.AssemblyFunctionGridData = exports.AssemblyExploreGridData = exports.AssemblyGridData = exports.rouletteTypeDefine = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
exports.rouletteTypeDefine = {
  [0]: Protocol_1.Aki.Protocol.o6s.Proto_Explore,
  1: Protocol_1.Aki.Protocol.o6s.n6s,
  3: Protocol_1.Aki.Protocol.o6s.Proto_Motorcycle
};
class AssemblyGridData {
  constructor() {
    this.Id = 0;
    this.Index = -1;
    this.GridType = 0;
    this.Name = "";
    this.State = 0;
    this.SortId = 0;
    this.RelativeIndex = 0;
  }
}
class AssemblyExploreGridData extends (exports.AssemblyGridData = AssemblyGridData) {
  constructor() {
    super(...arguments);
    this.IconPath = "";
  }
  get HasNew() {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot, this.Id);
  }
}
exports.AssemblyExploreGridData = AssemblyExploreGridData;
class AssemblyFunctionGridData extends AssemblyGridData {
  constructor() {
    super(...arguments);
    this.IconPath = "";
  }
}
exports.AssemblyFunctionGridData = AssemblyFunctionGridData;
class AssemblyEquipItemGridData extends AssemblyGridData {
  constructor() {
    super(...arguments);
    this.ItemType = 1;
    this.QualityId = 0;
    this.ItemNum = 0;
  }
}
exports.AssemblyEquipItemGridData = AssemblyEquipItemGridData;
class AssemblyTipsData {
  constructor() {
    this.GridType = 0;
    this.GridId = 0;
    this.Title = "";
    this.BgQuality = 1;
    this.IsIconTexture = false;
    this.IconPath = "";
    this.HelpId = 0;
    this.TextMain = "";
    this.TextSub = "";
    this.GetWayData = [];
    this.CanSetItemNum = [0, 0];
    this.NeedItemMap = new Map();
    this.Authorization = [];
    this.ShowPhantomInteractEquipment = false;
  }
}
exports.AssemblyTipsData = AssemblyTipsData;
exports.ROULETTE_TEXT_EMPTY = "Text_ProbeToolFunctionNotice2_Text";
exports.DEFAULT_ITEM_ROULETTE_GRID_INDEX = 7;
exports.ROULETTE_NUM = 8;
exports.ROULETTE_EXPLORE_IN_USE = 7;
exports.ROULETTE_FUNCTION_IN_USE = 8; //# sourceMappingURL=RouletteDefine.js.map