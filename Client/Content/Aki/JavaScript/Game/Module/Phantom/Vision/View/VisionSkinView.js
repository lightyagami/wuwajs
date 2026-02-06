"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionSkinView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const VisionSkinItem_1 = require("./VisionSkinItem");
class VisionSkinView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Cwg = undefined;
    this.aji = -1;
    this.V1i = -1;
    this.Xji = 0;
    this.jJs = 0;
    this.$ji = undefined;
    this.Yji = undefined;
    this.Jji = false;
    this.tHi = undefined;
    this.zji = undefined;
    this.Zji = 0;
    this.eWi = () => {
      this.Jji = !this.Jji;
      this.GetItem(2).SetUIActive(this.Jji);
    };
    this.tWi = () => {
      var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(this.Xji);
      ControllerHolder_1.ControllerHolder.PhantomBattleController.PhantomSkinChangeRequest(this.aji, i?.ParentMonsterId > 0 ? this.Xji : 0, this.Jji);
      this.EHi();
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.iWi = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Xji);
    };
    this.oWi = () => {
      var i = new VisionSkinItem_1.VisionSkinItem();
      i.SetClickToggleEvent(this.g7i);
      i.BindCanToggleExecuteChange(this.Bpt);
      return i;
    };
    this.g7i = (i, t) => {
      this.zji?.SetToggleStateForce(0);
      this.zji = t;
      var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(i);
      var e = t.MonsterName;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
      this._7i(i);
      if (!this.pwg) {
        this.rWi(!!t.ParentMonsterId && !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(i));
        if (this.Zji) {
          this.nWi(i !== this.Zji);
        } else {
          this.nWi(!!t.ParentMonsterId);
        }
      }
    };
    this.Bpt = i => this.Xji !== i;
    this.sWi = () => {
      if (!this.pwg) {
        var t = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(this.V1i);
        if (t) {
          this.Zji = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.aji).SkinId;
          let i = 0;
          if ((i = this.Zji ? t.indexOf(this.Zji) : 0) === -1) {
            i = 0;
          }
          this.Yji?.SetCurrentEquipmentVisible(false);
          this.Yji = this.$ji?.UnsafeGetGridProxy(i);
          this.Yji?.SetCurrentEquipmentVisible(true);
          this.nWi(false);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UILoopScrollViewComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.eWi], [4, this.tWi], [9, this.iWi]];
  }
  OnStart() {
    this.Jji = false;
    this.GetItem(2).SetUIActive(false);
    this.tHi = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.Awe);
    this.lqe.SetTitleByTextIdAndArgNew("VisionSkinTitleText");
    this.lqe.SetHelpBtnActive(false);
    this.$ji = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(6), this.GetItem(7).GetOwner(), this.oWi);
    this.Cwg = this.OpenParam;
    if (this.Cwg.UniqueId !== undefined) {
      this.vwg(this.Cwg.UniqueId);
    } else if (this.Cwg.ShowItemIdList !== undefined) {
      this.ywg(this.Cwg.ShowItemIdList);
    }
  }
  vwg(i) {
    this.aji = i;
    var t;
    var i = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.aji);
    if (i) {
      this.V1i = i.GetConfig()?.MonsterId;
      this.Zji = i.SkinId;
      t = i.GetSkinConfig().MonsterName;
      i = i.GetConfig().MonsterName;
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "ChangeDefaultVisionSkinText", i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t);
    }
  }
  ywg(i) {
    i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(i[0]).MonsterName;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i);
    this.GetItem(8)?.SetUIActive(false);
    this.GetButton(1)?.RootUIComp.SetUIActive(false);
    this.GetButton(4)?.RootUIComp.SetUIActive(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionSkinEquip, this.sWi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionSkinEquip, this.sWi);
  }
  OnBeforeShow() {
    if (this.V1i > 0) {
      this.Swg(this.V1i);
    } else if (this.Cwg?.ShowItemIdList !== undefined) {
      this.Mwg(this.Cwg.ShowItemIdList);
    }
  }
  Swg(i) {
    const t = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(i);
    if (t) {
      let i = 0;
      if ((i = this.Zji ? t.indexOf(this.Zji) : 0) === -1) {
        i = 0;
      }
      this.$ji?.RefreshByData(t, false, () => {
        this.$ji?.SelectGridProxy(i);
        this.Yji = this.$ji?.UnsafeGetGridProxy(i);
        this.zji = this.Yji?.GetItemGridExtendToggle();
        this.Yji?.SetCurrentEquipmentVisible(true);
        this.Xji = t[i];
        this.jJs = this.Xji;
      });
      this.rWi(false);
      this.nWi(false);
    }
  }
  Mwg(t) {
    let e = t.indexOf(this.Xji);
    if (e < 0) {
      e = 0;
    }
    this.$ji?.RefreshByData(t, false, () => {
      this.$ji?.ScrollToGridIndex(e);
      this.$ji?.SelectGridProxy(e);
      var i = this.$ji?.UnsafeGetGridProxy(e)?.GetItemGridExtendToggle();
      this.g7i(t[e], i);
    });
  }
  _7i(i) {
    var t;
    if (this.Xji === i) {
      this.EHi();
    } else {
      this.SHi();
      t = this.Cwg?.ShowItemIdList !== undefined;
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(i, () => {
        this.EHi();
      }, this.tHi, t);
      this.Xji = i;
    }
  }
  EHi() {
    var i;
    if (this.tHi) {
      i = this.tHi.Model;
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(i, "VisionLevelUpEffect");
      UiModelUtil_1.UiModelUtil.SetRenderingMaterial(i, "VisionStepupController");
    }
  }
  SHi() {
    if (!UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle()) {
      UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle();
    }
    this.tHi = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle();
  }
  rWi(i) {
    this.GetItem(8)?.SetUIActive(i);
    this.GetButton(9)?.RootUIComp.SetUIActive(i);
    this.GetButton(4)?.RootUIComp.SetUIActive(!i);
  }
  nWi(i) {
    this.GetButton(4)?.SetSelfInteractive(i);
  }
  OnAfterDestroy() {
    if (this.pwg) {
      UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle();
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionSkinViewClose, this.Xji !== this.jJs);
    }
  }
  get pwg() {
    return this.Cwg?.ShowItemIdList !== undefined;
  }
}
exports.VisionSkinView = VisionSkinView;
//# sourceMappingURL=VisionSkinView.js.map