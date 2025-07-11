"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionIdentifyView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionIdentifyComponent_1 = require("./VisionIdentifyComponent");
const VisionMainAttributeComponent_1 = require("./VisionMainAttributeComponent");
const VisionNameText_1 = require("./VisionNameText");
class VisionIdentifyView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.BHi = undefined;
    this.bHi = undefined;
    this.qHi = 0;
    this.GHi = undefined;
    this.NHi = false;
    this.p9i = undefined;
    this.OHi = new Map();
    this.kHi = new Array();
    this.FHi = () => {
      this.Rft();
    };
    this.VHi = (e, t) => {
      this.HHi(e, t);
    };
    this.jHi = () => {
      this.WHi();
    };
    this.I3a = e => {
      if (e === this.qHi) {
        this.Oqe();
      }
    };
    this.qdi = () => {
      this.Og();
    };
    this.OnClickLockToggle = () => {
      var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.qHi);
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(this.qHi, !e.GetIsLock());
      }
    };
    this.OnClickDeprecateToggle = () => {
      var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.qHi);
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemDeprecateRequest(this.qHi, !e.GetIsDeprecated());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIExtendToggle]];
    this.BtnBindInfo = [[4, this.OnClickLockToggle], [5, this.OnClickDeprecateToggle]];
  }
  async OnBeforeStartAsync() {
    this.BHi = new VisionIdentifyComponent_1.LevelUpIdentifyComponent(this.GetItem(2));
    await this.BHi.Init(this.GetViewName());
    this.bHi = new VisionMainAttributeComponent_1.VisionMainAttributeComponent();
    await this.bHi.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.GHi = new VisionIdentifyCostItem(this.GetItem(1));
    this.GHi.Init();
    this.GHi.SetOnChangeValueCallBack(this.FHi);
    this.p9i = new VisionNameText_1.VisionNameText(this.GetText(3));
  }
  OnBeforeShow() {
    this.mSe();
    this.qHi = this.ExtraParams;
    this.WHi();
    this.Og();
  }
  mSe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionIdentify, this.jHi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionIdentifyDoAnimation, this.VHi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    this.NHi = true;
  }
  dSe() {
    if (this.NHi) {
      this.NHi = false;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionIdentify, this.jHi);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionIdentifyDoAnimation, this.VHi);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    }
  }
  Og() {
    this.KHi();
    this.sqi();
    this.P5e();
    this.Oqe();
  }
  P5e() {
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    this.p9i.Update(e);
  }
  async HHi(e, t) {
    UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", true);
    this.QHi();
    if (this.kHi?.length > 0) {
      await this.BHi.PlayUpdateAnimation(this.kHi);
    }
    const i = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(e);
    UiModelUtil_1.UiModelUtil.SetRenderingMaterial(UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle().Model, "VisionChangeController");
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionIdentifyDelay();
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      var e = i.GetNewSubPropSuccessData(t);
      RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
      UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", false);
    }, e);
    this.Og();
  }
  QHi() {
    var e;
    var t;
    if (this.kHi.length > 0 && (e = (t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi)).GetCurrentCanIdentifyCount(), (t = t.GetSubPropIdentifyPreviewData(t.GetPhantomLevel(), e === 0 ? 0 : this.GHi.CurrentConsumeSelectNum())).length > 0)) {
      this.BHi.Update(t, true);
    }
  }
  WHi() {
    this.kHi = [];
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    var t = e.GetCurrentCanIdentifyCount();
    var i = e.GetSubPropIdentifyPreviewData(e.GetPhantomLevel(), t === 0 ? 0 : this.GHi.CurrentConsumeSelectNum());
    var s = i.length;
    if (s > 0) {
      for (let e = 0; e < s; e++) {
        var r = this.OHi.get(e);
        if ((r === 5 || r === 1) && r !== i[e].SlotState && i[e].SlotState === 3) {
          this.kHi.push(e);
        }
      }
    }
    for (let e = 0; e < s; e++) {
      var n = i[e].SlotState;
      this.OHi.set(e, n);
    }
  }
  sqi() {
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    this.GHi.Update(e);
  }
  KHi() {
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    var e = e.GetLevelUpPreviewData(e.GetPhantomLevel());
    this.bHi.Update(e);
  }
  Rft() {
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    var t = e.GetCurrentCanIdentifyCount();
    var e = e.GetSubPropIdentifyPreviewData(e.GetPhantomLevel(), t === 0 ? 0 : this.GHi.CurrentConsumeSelectNum());
    var t = e.length > 0;
    if (t) {
      this.BHi.Update(e, false);
    }
    this.BHi.SetActive(t);
  }
  Oqe() {
    var e;
    var t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.qHi);
    if (t !== undefined) {
      e = t.GetIsLock() ? 0 : 1;
      this.GetExtendToggle(4).SetToggleState(e, false);
      e = t.GetIsDeprecated() ? 1 : 0;
      this.GetExtendToggle(5).SetToggleState(e, false);
    }
  }
  OnBeforeHide() {
    this.dSe();
    UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", false);
  }
  OnBeforeDestroy() {
    this.dSe();
    this.BHi.Destroy();
    this.bHi.Destroy();
    this.GHi.Destroy();
  }
}
exports.VisionIdentifyView = VisionIdentifyView;
class VisionIdentifyCostItem extends UiComponentsAction_1.UiComponentsAction {
  constructor(e) {
    super();
    this.wqe = undefined;
    this.WGe = undefined;
    this.Pe = undefined;
    this.XHi = undefined;
    this.$Hi = undefined;
    this.ebt = undefined;
    this.wYt = e => {
      this.ebt?.SetSelected(false, true);
      var t = this.Pe.GetCurrentIdentifyCostId();
      var i = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(t);
      let s = 0;
      if ((s = i.length > 0 ? i[0].GetUniqueId() : s) !== undefined && s > 0) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(s, t);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
      }
    };
    this.YHi = () => {
      if (this.JHi(this.Pe)) {
        if (this.Pe.GetIfHaveEnoughIdentifyGold(this.CurrentConsumeSelectNum())) {
          this.zHi();
        } else {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IdentifyNotEnoughMoney");
        }
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("LevelUpMaterialShort");
      }
    };
    this.KGe = e => {
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("IdentifyCount");
      return new LguiUtil_1.TableTextArgNew(t, e);
    };
    this.QGe = e => {
      this.Og();
      this.$Hi?.();
    };
    this.wqe = e;
  }
  Init() {
    this.SetRootActor(this.wqe.GetOwner(), true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText]];
  }
  OnStart() {
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(8));
    this.XHi = new ButtonItem_1.ButtonItem(this.GetItem(11));
    this.XHi.SetFunction(this.YHi);
    this.ebt = new MediumItemGrid_1.MediumItemGrid();
    this.ebt.Initialize(this.GetItem(12).GetOwner());
    this.ebt.BindOnExtendToggleStateChanged(this.wYt);
  }
  async zHi() {
    UiLayer_1.UiLayer.SetShowMaskLayer("PhantomIdentify", true);
    await ControllerHolder_1.ControllerHolder.PhantomBattleController.RequestPhantomIdentify(this.Pe.GetIncrId(), this.CurrentConsumeSelectNum());
    UiLayer_1.UiLayer.SetShowMaskLayer("PhantomIdentify", false);
  }
  ZHi() {}
  eji(e) {
    var t = e.GetCurrentIdentifyCostId();
    var i = {
      Type: 4,
      ItemConfigId: t,
      StarLevel: ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t).QualityId
    };
    var e = e.GetCurrentIdentifyCostValue();
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(t);
    let s = 0;
    if (t.length > 0) {
      s = t[0].GetCount();
    }
    let r = 0;
    if (this.CurrentConsumeSelectNum() > 0) {
      r = e * this.CurrentConsumeSelectNum();
    }
    if (s >= e) {
      i.BottomText = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_CollectProgress_Text"), s.toString(), r.toString());
    } else {
      i.BottomText = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemCostNotEnough_Text"), s.toString(), r.toString());
    }
    this.ebt.Apply(i);
  }
  tji(e) {
    var e = e.GetCurrentCanIdentifyCount();
    var t = {
      MaxNumber: e,
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe
    };
    this.WGe.SetMinValue(0);
    this.WGe.Init(t);
    this.WGe.SetAddReduceButtonActive(true);
    this.WGe.SetMinTextShowState(true);
    this.WGe.SetAddReduceButtonInteractive(e > 1);
    this.WGe.SetReduceButtonInteractive(this.CurrentConsumeSelectNum() > 1);
  }
  Pke(e) {
    var t = e.GetIdentifyCostItemId();
    this.SetItemIcon(this.GetTexture(9), t);
    var t = this.GetText(10);
    t.SetText((e.GetIdentifyCostItemValue() * this.CurrentConsumeSelectNum()).toString());
    t.SetChangeColor(!e.GetIfHaveEnoughIdentifyGold(this.CurrentConsumeSelectNum()), t.changeColor);
  }
  iji(e) {
    e = this.oji(e);
    this.GetItem(3).SetUIActive(e);
  }
  oji(e) {
    let t = true;
    for (const i of e.GetLevelSubPropData(e.GetPhantomLevel())) {
      if (i.SlotState !== 3) {
        t = false;
        break;
      }
    }
    return t;
  }
  o6e(e) {
    var t = this.rji(e);
    this.GetItem(4).SetUIActive(t);
    if (t) {
      if (e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum())) {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "IdentifyNeedLevelText", e.GetNextIdentifyLevel());
      } else {
        this.GetText(5).SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("IdentifyNotEnough"));
      }
    }
  }
  JHi(e) {
    return e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum());
  }
  rji(e) {
    var t = e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum());
    var i = e.GetIfHaveUnIdentifySubProp();
    return !this.oji(e) && (!i || !t);
  }
  nji(e) {
    var t = this.oji(e);
    var i = this.rji(e);
    var s = t || i;
    this.GetItem(7).SetUIActive(!s);
    this.GetItem(11).SetUIActive(!s);
    if (i) {
      s = e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum());
      this.GetItem(2).SetUIActive(!s);
    }
    if (t) {
      this.GetItem(2).SetUIActive(false);
    }
    if (!i && !t) {
      this.GetItem(2).SetUIActive(true);
    }
  }
  CurrentConsumeSelectNum() {
    return this.WGe.GetSelectNumber();
  }
  Update(e) {
    this.Pe = e;
    this.tji(this.Pe);
    this.Og();
  }
  SetOnChangeValueCallBack(e) {
    this.$Hi = e;
  }
  sji(e) {
    if (!e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum()) && this.CurrentConsumeSelectNum() === 1) {
      e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("IdentifyCount");
      e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e), "0");
      this.WGe.SetNumberSelectTipsText(e);
    }
  }
  Og() {
    this.Pke(this.Pe);
    this.o6e(this.Pe);
    this.iji(this.Pe);
    this.nji(this.Pe);
    this.eji(this.Pe);
    this.ZHi();
    this.sji(this.Pe);
  }
}
//# sourceMappingURL=VisionIdentifyView.js.map