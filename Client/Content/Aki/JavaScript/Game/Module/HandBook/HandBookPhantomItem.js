"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookPhantomItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const HandBookCommonItem_1 = require("../HandBook/HandBookCommonItem");
const HandBookDefine_1 = require("../HandBook/HandBookDefine");
class HandBookPhantomItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.jei = undefined;
    this.kZt = undefined;
    this.GZt = undefined;
    this.OZt = e => {
      if (this.GZt) {
        this.GZt(this.kZt, 0);
      }
    };
  }
  Initialize(e, o) {
    this.kZt = e;
    if (o) {
      this.CreateThenShowByActor(o.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    this.jei = new HandBookCommonItem_1.HandBookCommonItem();
    this.jei.Initialize(this.GetItem(0).GetOwner());
    var e = this.kZt.Config;
    var o = new HandBookDefine_1.HandBookCommonItemData();
    var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, e.MonsterId);
    var t = i === undefined;
    var i = i !== undefined && !i.IsRead;
    o.Icon = e.Icon;
    o.IsLock = t;
    o.IsNew = i;
    this.jei.Refresh(o, false, 0);
    this.jei.BindOnExtendToggleClicked(this.OZt);
    this.jei.SetNewFlagVisible(false);
    var i = this.GetText(1);
    this.GetText(3).SetUIActive(false);
    if (t) {
      o = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("Unknown");
      i.ShowTextNew(o);
    } else {
      i.ShowTextNew(e.MonsterName);
    }
  }
  BindToggleCallback(e) {
    this.GZt = e;
  }
  SetToggleStateForce(e, o = 0) {
    this.jei.SetSelected(e === 1);
  }
  OnSelected(e) {
    this.jei.OnSelected(e);
  }
  OnBeforeDestroy() {
    this.jei = undefined;
    this.kZt = undefined;
    this.GZt = undefined;
  }
}
exports.HandBookPhantomItem = HandBookPhantomItem;
//# sourceMappingURL=HandBookPhantomItem.js.map