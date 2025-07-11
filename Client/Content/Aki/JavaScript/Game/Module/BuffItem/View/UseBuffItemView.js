"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseBuffItemView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BuffItemControl_1 = require("../BuffItemControl");
const BuffTargetRoleItem_1 = require("./BuffTargetRoleItem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class UseBuffItemView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Mft = [];
    this.Eft = undefined;
    this.Sft = undefined;
    this.WGe = undefined;
    this.yft = undefined;
    this.Ift = () => {
      if (this.Sft) {
        var e = this.Sft.UseItemConfigId;
        if (ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e) > 0) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("UseBuffCdText");
        } else {
          if (this.Sft.CurrentAttribute <= 0) {
            if (!ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(e)) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("UseBuffToDeadRole");
              return;
            }
          } else if (ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(e)) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("UseBuffToAliveRole");
            return;
          }
          var e = this.Sft.CurrentAttribute;
          var t = this.Sft.GetAddAttribute();
          var i = this.Sft.MaxAttribute;
          if (i < e + t) {
            t = this.Sft.RoleName;
            (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(i <= e ? 37 : 170)).SetTextArgs(t);
            i.FunctionMap.set(2, () => {
              this.UiViewSequence.StopSequenceByKey("Popup");
              this.UiViewSequence.SequencePlayReverseByKey("Popup", false);
              this.Tft();
            });
            i.FunctionMap.set(1, () => {
              this.UiViewSequence.StopSequenceByKey("Popup");
              this.UiViewSequence.SequencePlayReverseByKey("Popup", false);
            });
            i.IsEscViewTriggerCallBack = false;
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
            this.UiViewSequence.StopSequenceByKey("Popup");
            this.UiViewSequence.PlaySequence("Popup");
          } else {
            this.Tft();
          }
        }
      } else {
        this.Lft();
      }
    };
    this.Dft = () => {
      this.Lft();
    };
    this.KGe = e => {
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ItemUseCount");
      return new LguiUtil_1.TableTextArgNew(t, e);
    };
    this.QGe = e => {
      this.Sft.SetUseItemCount(e);
      this.Rft();
    };
    this.Uft = (e, t) => {
      if (this.Eft) {
        this.Aft();
      }
    };
    this.Pft = e => {
      this.xft(e);
    };
    this.wft = () => {
      this.Aft();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Ift], [5, this.Dft]];
  }
  Bft(e) {
    this.bft();
    this.qft();
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    let i = false;
    for (const r of this.Mft) {
      var s = r.GetUseBuffItemRoleData();
      if (s && s.GetEntityId() === t.Id) {
        this.xft(r);
        i = true;
        break;
      }
    }
    if (!i) {
      this.xft(this.Mft[0]);
    }
  }
  Gft() {
    var e = this.Sft.UseItemConfigId;
    if (ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(e) || (e = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(e)) && e > 0) {
      return 1;
    } else {
      return this.Sft.GetUseItemMaxCount();
    }
  }
  rNe() {
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(6));
    this.yft = {
      MaxNumber: this.Gft(),
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe
    };
    this.WGe.Init(this.yft);
  }
  OnStart() {
    var e = this.OpenParam;
    if (e !== undefined) {
      this.Bft(e);
      this.rNe();
    }
  }
  OnBeforeDestroy() {
    this.ResetUseBuffItemView();
    this.WGe.Destroy();
    this.yft = undefined;
    this.WGe = undefined;
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUseBuffItem, this.Uft);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUseBuffItem, this.Uft);
  }
  OnTick(e) {
    for (const t of this.Mft) {
      t.Tick(e);
    }
  }
  Lft() {
    UiManager_1.UiManager.CloseView("UseBuffItemView");
  }
  ResetUseBuffItemView() {
    for (const e of this.Mft) {
      e.ResetBuffTargetRoleItem();
    }
    this.Mft.length = 0;
    this.Sft = undefined;
    this.Eft = undefined;
    ModelManager_1.ModelManager.BuffItemModel.ClearAllUseBuffItemRoleData();
  }
  bft() {
    for (const i of [this.GetItem(1), this.GetItem(2), this.GetItem(3)]) {
      var e = i.GetOwner();
      var t = new BuffTargetRoleItem_1.BuffTargetRoleItem();
      t.Initialize(e);
      t.BindOnClickedBuffTargetRoleItem(this.Pft);
      t.BindOnUseItemAnimationFinished(this.wft);
      this.Mft.push(t);
    }
  }
  xft(e) {
    var t = e.GetUseBuffItemRoleData();
    if (t) {
      if (!e.IsSelected()) {
        e.SetSelected(true);
        if (this.Sft) {
          this.Sft.SetUseItemCount(0);
        }
        if (this.Eft) {
          this.Eft.SetSelected(false);
        }
        this.Sft = t;
        this.Eft = e;
        t.SetUseItemCount(1);
        this.Rft();
        this.Nft();
        if (this.yft) {
          this.WGe?.Init(this.yft);
        }
      }
    } else {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NoneRole");
    }
  }
  Aft() {
    var e = ModelManager_1.ModelManager.InventoryModel;
    var t = this.Sft.UseItemConfigId;
    if (e.GetItemCountByConfigId(t) < 1) {
      this.Lft();
    } else {
      e = this.Gft();
      this.WGe.SetLimitMaxValue(e);
      this.WGe.Refresh(e);
    }
  }
  qft() {
    var t = ModelManager_1.ModelManager.BuffItemModel.GetAllUseBuffItemRole();
    for (const e of this.Mft) {
      e.SetActive(false);
    }
    let i = 0;
    for (let e = 0; e < this.Mft.length; e++) {
      var s = e + 1;
      var s = t.get(s);
      var r = this.Mft[i];
      if (s) {
        r.RefreshBuffTargetRoleItem(s);
        r.SetActive(true);
        i++;
      } else {
        r.RemoveRole();
      }
    }
  }
  Rft() {
    var e;
    var t;
    var i;
    if (this.Sft && this.Eft) {
      e = this.Sft.CurrentAttribute;
      t = this.Sft.MaxAttribute;
      i = this.Sft.GetAddAttribute();
      this.Eft.RefreshPreviewUseItem(e, t, i);
    }
  }
  Nft() {
    var e;
    var t;
    if (this.Sft) {
      e = this.Sft.RoleName;
      t = this.GetText(0);
      LguiUtil_1.LguiUtil.SetLocalText(t, "UseBuffTitle", e);
    }
  }
  Tft() {
    var e;
    var t;
    var i;
    if (this.Sft) {
      e = this.Sft.UseItemConfigId;
      t = this.Sft.UseItemCount;
      i = this.Sft.RoleConfigId;
      BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, t, i);
    } else {
      this.Lft();
    }
  }
}
exports.UseBuffItemView = UseBuffItemView;
//# sourceMappingURL=UseBuffItemView.js.map