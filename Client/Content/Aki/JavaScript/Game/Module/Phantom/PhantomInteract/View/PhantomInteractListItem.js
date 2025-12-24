"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractListItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const PhantomInteractListItemSkillTagPanel_1 = require("./PhantomInteractListItemSkillTagPanel");
const PhantomInteractListItemSlotIndexPanel_1 = require("./PhantomInteractListItemSlotIndexPanel");
class PhantomInteractListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Mgf = undefined;
    this.fGt = undefined;
    this.bwf = undefined;
    this.V1i = undefined;
    this.Hea = undefined;
    this.OnClickCb = undefined;
    this.OnHoverCb = undefined;
    this.OnPointerDownCb = undefined;
    this.OnPointerUpCb = undefined;
    this.OnToggleStateChangeCb = undefined;
    this.Yai = t => {
      t = t === 1;
      if (this.OnToggleStateChangeCb && this.fGt) {
        this.OnToggleStateChangeCb(this, this.fGt, t);
      }
      if (t && this.OnClickCb) {
        this.OnClickCb(this.fGt);
      }
    };
  }
  get ItemIndex() {
    return this.fGt?.ItemIndex ?? -1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Yai]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    var e = this.GetItem(2);
    this.Mgf = new PhantomInteractListItemSlotIndexPanel_1.PhantomInteractListItemSlotIndexPanel();
    var e = this.Mgf.CreateByResourceIdAsync("UiItem_ItemBSortNumA", e);
    t.push(e);
    var e = this.GetItem(3);
    this.bwf = new PhantomInteractListItemSkillTagPanel_1.PhantomInteractListItemSkillTagPanel();
    var e = this.bwf.CreateByResourceIdAsync("UiItem_VisionTag", e);
    var i = this.GetExtendToggle(0);
    i?.OnHover.Add(() => {
      if (this.OnHoverCb && this.fGt) {
        this.OnHoverCb(this.fGt, true);
      }
    });
    i?.OnUnHover.Add(() => {
      if (this.OnHoverCb && this.fGt) {
        this.OnHoverCb(this.fGt, false);
      }
    });
    i?.OnPointDownCallBack.Bind(() => {
      if (this.OnPointerDownCb && this.fGt) {
        this.OnPointerDownCb(this.fGt);
      }
    });
    i?.OnPointUpCallBack.Bind(() => {
      if (this.OnPointerUpCb && this.fGt) {
        this.OnPointerUpCb(this.fGt);
      }
    });
    t.push(e);
    await Promise.all(t);
    this.bwf?.SetUiActive(true);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    super.OnStart();
  }
  DisableToggle() {
    this.GetExtendToggle(0)?.SetToggleStateForce(2, false);
  }
  async Refresh(e, i, s = true) {
    if (e) {
      if (s && this.V1i !== e.MonsterId && e.MonsterId !== 0) {
        this.Hea?.PlayLevelSequenceByName("Cease");
      }
      this.V1i = e.MonsterId;
      this.fGt = e;
      var h;
      var s = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel.GridViewModelMap.get(e.MonsterId);
      let t = 0;
      if (s && s.IsSpecial) {
        t = s.IsInArea ? 1 : 2;
      }
      this.bwf?.Refresh(t);
      (e.MonsterId === 0 ? (this.GetTexture(1).SetUIActive(false), this.GetItem(4)) : (this.GetItem(4).SetUIActive(false), h = this.GetTexture(1), s && s.IconPath !== undefined || Log_1.Log.CheckDebug() && Log_1.Log.Debug("PhantomInteraction", 95, "声骸列表刷新找不到图标数据", ["MonsterId", e.MonsterId]), await this.SetTextureAsync(s.IconPath, h), this.GetTexture(1))).SetUIActive(true);
      this.Mgf?.SetUiActive(i);
      if (i) {
        this.Mgf?.SetIndex(e.ItemIndex + 1);
      }
    }
  }
  SetSelected(t) {
    this.GetExtendToggle(0)?.SetToggleStateForce(t ? 1 : 0, false);
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
  }
}
exports.PhantomInteractListItem = PhantomInteractListItem;
//# sourceMappingURL=PhantomInteractListItem.js.map