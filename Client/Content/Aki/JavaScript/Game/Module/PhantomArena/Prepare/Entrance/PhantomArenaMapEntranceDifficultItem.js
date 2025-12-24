"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMapEntranceDifficultItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaMapEntranceDifficultItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eof = 0;
    this.SelectCallBack = undefined;
    this.jbe = e => {
      if (e !== 0) {
        this.SelectCallBack?.(this.eof);
        this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => this.ScrollViewDelegate?.GetSelectedGridIndex() !== this.GridIndex);
    this.GetExtendToggle(0).SetToggleState(0, false);
  }
  Refresh(e, t, i) {
    this.eof = e;
    e = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(PhantomArenaDefine_1.difficultNumTextures[e]);
    this.TrySetTextureByPath(e, this.GetTexture(1));
    e = ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentIsDifficultCompleted(this.eof);
    this.GetItem(2)?.SetUIActive(e);
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1, e);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0, e);
  }
  GetKey(e, t) {
    return this.eof;
  }
}
exports.PhantomArenaMapEntranceDifficultItem = PhantomArenaMapEntranceDifficultItem;
//# sourceMappingURL=PhantomArenaMapEntranceDifficultItem.js.map