"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrRoadMarkItem = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InfrRoadMarkItemView_1 = require("../MarkItemView/InfrRoadMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class InfrRoadMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, a, t, o, i = 1) {
    super(e, r, a, t, o, i);
    this.InnerView = undefined;
  }
  OnInitialize() {
    super.OnInitialize();
    this.UpdateGamePlayState();
  }
  CreateView() {
    return new InfrRoadMarkItemView_1.InfrRoadMarkItemView(this);
  }
  GamePlayIsFinish() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigByMarkId(this.MarkId);
    return ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(e.Id)?.Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete;
  }
  UpdateGamePlayState() {
    this.MarkItemEntity.GamePlay.GamePlayState = this.GamePlayIsFinish() ? 2 : 1;
  }
}
exports.InfrRoadMarkItem = InfrRoadMarkItem;
//# sourceMappingURL=InfrRoadMarkItem.js.map