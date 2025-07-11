"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueIllustratedEventItem = undefined;
const UE = require("ue");
const RogueResCollectionByIdKey_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey");
const RogueResGridEventById_1 = require("../../../../Core/Define/ConfigQuery/RogueResGridEventById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueIllustratedEventItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Ns1 = 0;
    this.ac = Protocol_1.Aki.Protocol.zps.Z6n;
    this.ndi = undefined;
    this.PPt = e => {
      if (this.ndi) {
        this.ndi(this.Ns1, this.ac);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStartImplement() {
    this.GetExtendToggle(0)?.OnStateChange.Add(this.PPt);
  }
  OnBeforeDestroyImplement() {
    this.GetExtendToggle(0)?.OnStateChange.Remove(this.PPt);
  }
  Refresh(e, t, i) {
    this.Ns1 = e;
    var o;
    var e = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e);
    this.ac = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(this.Ns1);
    this.GetItem(2).SetUIActive(this.ac === Protocol_1.Aki.Protocol.zps.CMs);
    if (this.ac === Protocol_1.Aki.Protocol.zps.Z6n) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueRes_CollectionEventLock");
    } else if (e.Type === 1) {
      o = RogueResGridEventById_1.configRogueResGridEventById.GetConfig(e.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), o.Title);
    } else if (e.Type === 2) {
      o = RogueResGridEventById_1.configRogueResGridEventById.GetConfig(e.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), o.Title);
    }
    this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  SetSelected(e, t = false) {
    var i = this.GetExtendToggle(0);
    if (e) {
      if (t) {
        i.SetToggleStateForce(1, false);
      } else {
        i.SetToggleState(1, false);
      }
    } else if (t) {
      i.SetToggleStateForce(0, false);
    } else {
      i.SetToggleState(0, false);
    }
  }
  BindOnItemButtonClickedCallback(e) {
    this.ndi = e;
  }
}
exports.RogueIllustratedEventItem = RogueIllustratedEventItem;
//# sourceMappingURL=RogueIllustratedEventGrid.js.map