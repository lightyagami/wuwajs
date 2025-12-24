"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneGameplayTipGridMonster = exports.SceneGameplayTipGrid = undefined;
const ue_1 = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class SceneGameplayTipGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickPreviewCall = undefined;
    this.uFo = undefined;
    this.a_i = false;
    this.h_i = [];
    this.aFo = () => {
      this.OnClickPreviewCall?.();
    };
  }
  Initialize(e) {
    this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, ue_1.UIItem], [2, ue_1.UIItem], [0, ue_1.UIText], [3, ue_1.UIButtonComponent], [4, ue_1.UIItem]];
    this.BtnBindInfo = [[3, this.aFo]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.h_i.length = 0;
    this.OnClickPreviewCall = undefined;
  }
  Refresh(e, i, t = false, s = false, r = false) {
    this.uFo = e;
    if (t) {
      this.cFo(i);
    } else {
      this.qEi(i);
    }
    this.GetItem(4)?.SetUIActive(r);
    this.Yli(s);
  }
  SetBtnPreviewVisible(e) {
    this.GetButton(3).RootUIComp.SetUIActive(e);
  }
  Yli(t = false) {
    this.a_i = !!this.uFo && this.uFo.size > 0;
    let s = 0;
    if (this.a_i) {
      var r = this.GetItem(2).GetOwner();
      var a = this.GetItem(1);
      let i = 0;
      for (const h of this.uFo) {
        let e = this.h_i[i];
        if (!e) {
          (e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, a));
          this.h_i.push(e);
        }
        this.OnRefreshItemGrid(e, h[0], h[1], t);
        e.SetActive(true);
        i++;
      }
      s = this.uFo.size;
    }
    for (let e = s; e < this.h_i.length; ++e) {
      this.h_i[e].SetActive(false);
    }
  }
  OnRefreshItemGrid(e, i, t, s = false) {
    e.RefreshByConfigId(i, t, undefined, s);
  }
  qEi(e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), e);
  }
  cFo(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
class SceneGameplayTipGridMonster extends (exports.SceneGameplayTipGrid = SceneGameplayTipGrid) {
  OnRefreshItemGrid(e, i, t, s = 0) {
    e.ApplyPropSmallItemGrid({
      Data: i,
      Type: 4,
      IconPath: ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(i).Icon
    });
    e.SetAllowClickBack(false);
    e.GetItemGridExtendToggle()?.SetToggleStateForce(2, false);
  }
}
exports.SceneGameplayTipGridMonster = SceneGameplayTipGridMonster;
//# sourceMappingURL=SceneGameplayTipGrid.js.map