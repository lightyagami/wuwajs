"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonDropDown = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const DynamicMaskButton_1 = require("../../DynamicMask/DynamicMaskButton");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class CommonDropDown extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s) {
    super();
    this.SourceItem = t;
    this.CreateDropDownItem = i;
    this.CreateTitleItem = s;
    this.eGe = undefined;
    this.ypt = undefined;
    this.hLt = CommonDefine_1.INVALID_VALUE;
    this.lLt = undefined;
    this._Lt = undefined;
    this.uwu = undefined;
    this.uLt = 2;
    this.cLt = false;
    this.mLt = Transform_1.Transform.Create();
    this.dLt = Vector_1.Vector.Create();
    this.CLt = undefined;
    this.gLt = undefined;
    this.rPr = undefined;
    this.ije = () => {
      var t = this.GetItem(1);
      if (t.bIsUIActive) {
        this.vLt();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDropDownListVisibleChanged, false);
      } else {
        t.SetUIActive(true);
        this.cLt = true;
        this.MLt().finally(undefined);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDropDownListVisibleChanged, true);
      }
    };
    this.sGe = (t, i, s) => {
      i = this.CreateDropDownItem(i, t);
      t = this.CLt(t);
      i.ShowDropDownItemBase(t, s);
      i.SetToggleFunction(this.ELt);
      i.SetCanExecuteFunction(this.SLt);
      return {
        Key: s,
        Value: i
      };
    };
    this.ELt = t => {
      var i = this.hLt;
      this.hLt = t;
      this.yLt(i);
      this.ILt();
      this._Lt?.(this.hLt, this.ypt[this.hLt]);
    };
    this.SLt = t => this.uwu !== undefined ? this.uwu(this.hLt, t) : this.hLt !== t;
    this.vLt = () => {
      this.GetItem(1).SetUIActive(false);
      this.TLt();
    };
    this.RLt = () => {
      var t;
      var i;
      var s;
      if (this.rPr && this.cLt) {
        if (this.uLt !== 0 && (this.uLt === 1 || (t = (s = this.GetButton(0).RootUIComp).GetRootCanvas(), i = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop), i = Transform_1.Transform.Create(i.D_K2_GetComponentToWorld().Inverse()), this.mLt.FromUeTransform(this.rPr), this.mLt.ComposeTransforms(i, this.mLt), i = s.GetLocalSpaceBottom() - this.eGe.GetRootUiItem().GetHeight(), this.mLt.TransformPosition(Vector_1.Vector.Create(0, i, 0), this.dLt), s = t.GetClipRectMin(), this.dLt.Y < s.Y))) {
          this.ULt();
        } else {
          this.ALt();
        }
        this.cLt = false;
      }
    };
  }
  async Init() {
    await this.CreateByActorAsync(this.SourceItem.GetOwner()).finally(() => {
      this.SetActive(true);
    });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UILayoutBase], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(2), this.sGe, this.GetItem(3));
    this.eGe.BindLateUpdate(this.RLt);
    this.GetItem(1).SetUIActive(false);
    this.gLt = this.CreateTitleItem(this.GetItem(4));
  }
  SetOnCanChangeCall(t) {
    this.uwu = t;
  }
  OnBeforeDestroy() {
    this.eGe.UnBindLateUpdate();
    this.lLt?.Destroy();
    this.gLt.Destroy();
  }
  InitScroll(t, i, s = 0) {
    this.ypt = t;
    this.CLt = i;
    this.eGe.RebuildLayoutByDataNew(t);
    this.SetSelectedIndex(s);
  }
  async MLt() {
    if (!this.lLt) {
      this.lLt = new DynamicMaskButton_1.DynamicMaskButton();
      this.lLt.SetButtonFunction(this.vLt);
      await this.lLt.Init();
    }
    this.rPr = this.RootActor.RootComponent.D_K2_GetComponentToWorld();
    this.lLt.SetAttachChildItem(this.RootItem);
    this.lLt.SetActive(true);
  }
  TLt() {
    if (this.lLt) {
      this.lLt.ResetItemParent();
      this.lLt.SetActive(false);
    }
  }
  yLt(t) {
    if (t !== CommonDefine_1.INVALID_VALUE) {
      this.eGe.GetLayoutItemByKey(t).SetToggle(false);
    }
  }
  ILt() {
    var t = this.CLt(this.ypt[this.hLt]);
    var i = this.eGe.GetLayoutItemByIndex(this.hLt);
    this.gLt.ShowTemp(t, i);
    this.vLt();
  }
  ALt() {
    var t = this.GetItem(1);
    t.SetAnchorVAlign(3);
    t.SetPivot(new UE.Vector2D(0.5, 1));
    t.SetAnchorOffsetX(0);
    t.SetAnchorOffsetY(0);
  }
  ULt() {
    var t = this.GetItem(1);
    t.SetAnchorVAlign(1);
    t.SetPivot(new UE.Vector2D(0.5, 0));
    t.SetAnchorOffsetX(0);
    t.SetAnchorOffsetY(0);
  }
  SetSelectedIndex(t) {
    this.eGe.GetLayoutItemByKey(t).SetToggle(true);
  }
  GetSelectedIndex() {
    return this.hLt;
  }
  SetShowType(t) {
    if (this.uLt !== t) {
      this.uLt = t;
      this.cLt = true;
    }
  }
  SetOnSelectCall(t) {
    this._Lt = t;
  }
  GetDropDownItemObject(t) {
    return this.eGe.GetLayoutItemByIndex(t);
  }
  GetDropDownItemList() {
    return this.eGe.GetLayoutItemList();
  }
  RefreshAllDropDownItem() {
    var t = this.CLt(this.ypt[this.hLt]);
    var i = this.eGe.GetLayoutItemByIndex(this.hLt);
    this.gLt.ShowTemp(t, i);
    this.eGe.RebuildLayoutByDataNew(this.ypt);
  }
}
exports.CommonDropDown = CommonDropDown;
//# sourceMappingURL=CommonDropDown.js.map