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
      this.rWi(!!t.ParentMonsterId && !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(i));
      var e = t.MonsterName;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
      if (this.Zji) {
        this.nWi(i !== this.Zji);
      } else {
        this.nWi(!!t.ParentMonsterId);
      }
      this._7i(i);
    };
    this.Bpt = i => this.Xji !== i;
    this.sWi = () => {
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
    this.aji = this.OpenParam;
    var i;
    var t;
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.aji);
    if (e) {
      this.V1i = e.GetConfig()?.MonsterId;
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.lqe.SetCloseCallBack(this.Awe);
      this.lqe.SetTitleByTextIdAndArgNew("VisionSkinTitleText");
      this.lqe.SetHelpBtnActive(false);
      i = e.GetSkinConfig().MonsterName;
      t = e.GetConfig().MonsterName;
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "ChangeDefaultVisionSkinText", t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i);
      this.$ji = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(6), this.GetItem(7).GetOwner(), this.oWi);
      this.Zji = e.SkinId;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionSkinEquip, this.sWi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionSkinEquip, this.sWi);
  }
  OnBeforeShow() {
    const t = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(this.V1i);
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
  _7i(i) {
    if (this.Xji === i) {
      this.EHi();
    } else {
      this.SHi();
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(i, () => {
        this.EHi();
      }, this.tHi, false);
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
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionSkinViewClose, this.Xji !== this.jJs);
  }
}
exports.VisionSkinView = VisionSkinView;
//# sourceMappingURL=VisionSkinView.js.map