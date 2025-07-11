"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResonanceChainInfoItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleController_1 = require("../RoleController");
class ResonanceChainInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.dFe = 0;
    this.Aco = undefined;
    this.p9t = undefined;
    this.Pco = undefined;
    this.$pt = undefined;
    this.xco = () => {
      var e = ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(this.Aco);
      if (e) {
        let i = true;
        e.ActivateConsume.forEach((e, t) => {
          t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
          i = i && e <= t;
        });
        if (i) {
          RoleController_1.RoleController.SendResonanceUnlockRequest(this.dFe);
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ResonanceItemNotEnough");
        }
      }
    };
    this.xpt = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleInternalViewQuit);
    };
    this.LoadPromise = this.CreateThenShowByResourceIdAsync("UIItem_ResonanceChainInfo", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [10, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.xpt]];
  }
  OnStart() {
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(5));
    this.p9t.SetFunction(this.xco);
    this.Pco = new MediumItemGrid_1.MediumItemGrid();
    this.Pco.Initialize(this.GetItem(4).GetOwner());
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(2), 1, 7, 2);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(2));
  }
  async ShowItem() {
    await this.LoadPromise;
    this.$pt.PlayLevelSequenceByName("Start");
  }
  async HideItem() {
    await this.LoadPromise;
    this.$pt.PlayLevelSequenceByName("Close");
  }
  async Refresh(e = false) {
    await this.LoadPromise;
    var t;
    var i = ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(this.Aco);
    if (i) {
      t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
      t = ModelManager_1.ModelManager.RoleModel.GetRoleResonanceState(t, i.GroupIndex);
      this.GetItem(5).SetUIActive(t === 1 && !e);
      this.GetItem(6).SetUIActive(t === 2 && !e);
      this.GetItem(7).SetUIActive(t === 0 && !e);
      this.Pco.GetRootItem().SetUIActive(t !== 2 && !e);
      this.GetItem(10).SetUIActive(t !== 2 && !e);
      this.GetText(0).ShowTextNew(i.NodeName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.AttributesDescription, ...i.AttributesDescriptionParams);
      this.GetText(8).ShowTextNew(i.BgDescription);
      t = ModelManager_1.ModelManager.RoleModel.RedDotResonanceTabHoleCondition(this.dFe, i.GroupIndex);
      this.p9t.SetRedDotVisible(t);
      if (!e) {
        i.ActivateConsume.forEach((e, t) => {
          var i = {
            Type: 4,
            ItemConfigId: t
          };
          var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
          i.BottomTextId = "Text_ItemEnoughText_Text";
          if (r < e) {
            i.BottomTextId = "Text_ItemNotEnoughText_Text";
          }
          i.BottomTextParameter = [r, e];
          this.Pco.Apply(i);
          this.Pco.BindOnCanExecuteChange(() => false);
          this.Pco.BindOnExtendToggleClicked(() => {
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
          });
        });
      }
    }
  }
  Update(e, t, i = false) {
    this.dFe = e;
    this.Aco = t;
    this.Refresh(i);
  }
  GetResonanceId() {
    return this.Aco;
  }
  GetUiItemForGuide() {
    return this.p9t?.GetBtn()?.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.ResonanceChainInfoItem = ResonanceChainInfoItem;
//# sourceMappingURL=ResonanceChainInfoItem.js.map