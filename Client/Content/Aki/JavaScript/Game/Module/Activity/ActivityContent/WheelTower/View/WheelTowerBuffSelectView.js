"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerBuffSelectView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
class WheelTowerBuffSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.ktf = undefined;
    this.qtf = -1;
    this.Otf = () => {
      var e = new BuffCard();
      e.SetToggleCallback(this.ZW1);
      return e;
    };
    this.ZW1 = (e, i) => {
      this.qtf = e;
      this.ktf?.SelectGridProxy(i);
    };
    this.p5t = () => {
      if (this.qtf !== -1) {
        ModelManager_1.ModelManager.WheelTowerModel.SelectedBuff = this.qtf;
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.p5t]];
  }
  async OnBeforeStartAsync() {
    this.ktf = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.Otf);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.WheelTowerModel.GetLevelBuffList();
    this.ktf?.RefreshByData([...e]);
    this.lqe?.SetCloseCallBack(() => {
      this.CloseMe();
    });
  }
}
exports.WheelTowerBuffSelectView = WheelTowerBuffSelectView;
class BuffCard extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eHr = -1;
    this.WYl = undefined;
    this.N8e = () => {
      this.WYl?.(this.eHr, this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  Refresh(e, i, t) {
    this.eHr = e;
    var s = ConfigManager_1.ConfigManager.WheelTowerConfig.GetBuffConfigById(e);
    this.SetTextureShowUntilLoaded(s.Icon, this.GetTexture(1));
    this.GetText(2)?.ShowTextNew(s.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), s.Desc, ...s.DescParam);
    this.GetItem(4)?.SetUIActive(ModelManager_1.ModelManager.WheelTowerModel.SelectedBuff === e);
    this.SetToggleSelect(false, true);
  }
  OnDeselected(e) {
    this.SetToggleSelect(false);
  }
  SetToggleCallback(e) {
    this.WYl = e;
  }
  SetToggleSelect(e, i = false) {
    this.GetExtendToggle(0).SetToggleStateForce(e ? 1 : 0, false, false, i);
  }
}
//# sourceMappingURL=WheelTowerBuffSelectView.js.map