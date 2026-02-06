"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightGridTemplateData = exports.MotorFightGridItem = undefined;
const UE = require("ue");
const SyncGridProxyAbstract_1 = require("../../../../../Util/Grid/SyncGridProxyAbstract");
const MotorFightGridMediumItemGrid_1 = require("./MotorFightGridMediumItemGrid");
class MotorFightGridItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.IsSelected = t => false;
    this.Q$l = undefined;
    this.OnClickCb = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.Q$l = new MotorFightGridMediumItemGrid_1.MotorFightGridMediumItemGrid();
    this.Q$l.CreateThenShowByActor(this.GetItem(0).GetOwner());
    this.Q$l.OnClickCallBack = this.OnClickCb;
  }
  Refresh(t) {
    this.Data = t;
    this.Q$l?.Refresh(t);
    t = this.IsSelected(t.Id);
    this.Q$l?.SetToggleState(t);
  }
  SetToggleState(t) {
    this.Q$l?.SetToggleState(t);
  }
}
exports.MotorFightGridItem = MotorFightGridItem;
class MotorFightGridTemplateData {
  constructor() {
    this.Data = undefined;
    this.IsSelected = t => false;
    this.OnClickCb = undefined;
  }
  GetTemplateIndex() {
    return 1;
  }
  CreateProxy() {
    const i = new MotorFightGridItem();
    i.OnClickCb = t => {
      this.OnClickCb(t, i.GridIndex);
    };
    i.IsSelected = this.IsSelected;
    return i;
  }
}
exports.MotorFightGridTemplateData = MotorFightGridTemplateData;
//# sourceMappingURL=MotorFightGridItem.js.map