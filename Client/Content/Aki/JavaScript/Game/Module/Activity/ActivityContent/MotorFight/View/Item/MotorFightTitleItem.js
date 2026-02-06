"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightItemTypeTemplateData = exports.MotorFightItemTypeItem = undefined;
const UE = require("ue");
const SyncGridProxyAbstract_1 = require("../../../../../Util/Grid/SyncGridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MotorFightItemTypeItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.GetUnlockNum = t => [0, 0];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIText]];
  }
  Refresh(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    this.SetSpriteByPath(t.Icon, this.GetSprite(1), false);
    var [t, e] = this.GetUnlockNum(t.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "PrefabTextItem_3218283778_Text", t, e);
  }
}
exports.MotorFightItemTypeItem = MotorFightItemTypeItem;
class MotorFightItemTypeTemplateData {
  constructor() {
    this.GetUnlockNum = t => [0, 0];
    this.Data = undefined;
  }
  GetTemplateIndex() {
    return 0;
  }
  CreateProxy() {
    var t = new MotorFightItemTypeItem();
    t.GetUnlockNum = this.GetUnlockNum;
    return t;
  }
}
exports.MotorFightItemTypeTemplateData = MotorFightItemTypeTemplateData;
//# sourceMappingURL=MotorFightTitleItem.js.map