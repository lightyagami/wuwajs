"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardItemListPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const Transform_1 = require("../../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
const LguiEventSystemManager_1 = require("../../../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView");
const DockyardItemListItem_1 = require("./DockyardItemListItem");
class DockyardItemListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Spt = undefined;
    this.PanelModel = undefined;
    this.Eec = Transform_1.Transform.Create();
    this.cz = Vector_1.Vector.Create();
    this.kYl = undefined;
    this.Iec = undefined;
    this.Qd_ = false;
    this.iU_ = undefined;
    this.W2e = () => {
      var t = new DockyardItemListItem_1.DockyardItemListItem();
      t.OpenParam = this.PanelModel;
      return t;
    };
  }
  OnRegisterComponent() {
    this.PanelModel = this.OpenParam;
    this.PanelModel.RegisterPanel(this);
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText]];
  }
  async OYl() {
    this.Spt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.W2e, true);
    await this.RefreshListItem();
  }
  InitTitle() {
    var t = this.GetText(4);
    var i = !StringUtils_1.StringUtils.IsBlank(this.PanelModel.ComponentData.TitleText);
    t.SetUIActive(i);
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.PanelModel.ComponentData.TitleText);
    }
  }
  SetCountText() {
    var t = this.GetText(1);
    var i = this.PanelModel.ComponentData.GetCountText?.();
    var s = i !== undefined && !StringUtils_1.StringUtils.IsBlank(i);
    t.SetUIActive(s);
    if (s) {
      t.SetText(i);
    }
  }
  InitHelpItem() {
    var t = this.GetButton(6);
    var i = this.PanelModel.ComponentData.HelpBtnId !== 0;
    t.RootUIComp.SetUIActive(i);
    if (i) {
      t.HelpGroupId = this.PanelModel.ComponentData.HelpBtnId;
    }
  }
  InitTimeItem() {
    var t = this.GetItem(8);
    var i = !StringUtils_1.StringUtils.IsBlank(this.PanelModel.ComponentData.TimeText);
    t.SetUIActive(i);
    if (i) {
      t = this.GetText(9);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Fishing_CageTime", this.PanelModel.ComponentData.TimeText);
    }
  }
  async OnBeforeStartAsync() {
    this.iU_ = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(7));
    await this.OYl();
    this.InitTitle();
    this.SetCountText();
    this.InitHelpItem();
    this.InitTimeItem();
  }
  OnStart() {
    this.Iec = this.GetItem(7);
    this.Qd_ = this.Iec.bIsUIActive;
    this.SetDragTipsActive(false);
    this.Eec.FromUeTransform(this.Iec.K2_GetComponentToWorld());
    var t = this.Iec.GetPivot();
    this.kYl = {
      Left: -t.X * this.Iec.Width,
      Right: (1 - t.X) * this.Iec.Width,
      Top: (1 - t.Y) * this.Iec.Height,
      Bottom: -t.Y * this.Iec.Height
    };
  }
  async OnBeforeShowAsyncImplement() {
    this.PanelModel.RefreshShowItemList();
    await this.RefreshListItem();
  }
  OnBeforeDestroy() {
    this.iU_.Clear();
  }
  async RefreshListItem() {
    var t = this.PanelModel.ShowItemList;
    this.Spt.SetTargetRootComponentActive(t.length > 0);
    this.GetItem(0)?.SetUIActive(t.length === 0);
    if (t.length > 0) {
      await this.Spt.RefreshByDataAsync(t);
    }
    this.SetCountText();
  }
  CheckInViewport() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0, true);
    this.cz.Set(t.worldPoint.X, 0, t.worldPoint.Z);
    this.Eec.FromUeTransform(this.Iec.K2_GetComponentToWorld());
    this.Eec.InverseTransformPosition(this.cz, this.cz);
    return !(this.cz.X < this.kYl.Left) && !(this.cz.X > this.kYl.Right) && !(this.cz.Y < this.kYl.Bottom) && !(this.cz.Y > this.kYl.Top);
  }
  async rU_() {
    this.iU_.StopSequenceByKey("Hide", false, true);
    this.GetItem(7)?.SetUIActive(true);
    var t = new CustomPromise_1.CustomPromise();
    await this.iU_.PlaySequenceAsync("Show", t);
  }
  async oU_() {
    this.iU_.StopSequenceByKey("Show", false, true);
    var t = new CustomPromise_1.CustomPromise();
    await this.iU_.PlaySequenceAsync("Hide", t);
    this.GetItem(7)?.SetUIActive(false);
  }
  SetDragTipsActive(t) {
    var i;
    if (this.Qd_ !== t) {
      if (this.Qd_ = t) {
        this.rU_();
      } else {
        this.oU_();
      }
      i = this.PanelModel.ShowItemList;
      this.GetItem(0)?.SetUIActive(i.length === 0 && !t);
    }
  }
  RefreshListItemStateByIncId(i) {
    var t = this.PanelModel.ShowItemList.findIndex(t => t.IncId === i);
    if (t >= 0) {
      this.Spt.UnsafeGetGridProxy(t)?.RefreshToggleState();
    }
  }
  RefreshListItemRedDot(i) {
    for (let t = 0; t < this.PanelModel.ShowItemList.length; t++) {
      if (this.PanelModel.ShowItemList[t].ItemId === i && t >= this.Spt.Iei && t <= this.Spt.NCi) {
        this.Spt.UnsafeGetGridProxy(t)?.RefreshRedDot();
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (!(this.PanelModel.ShowItemList.length <= 0) && (i = this.Spt.GetGridByDisplayIndex(0))) {
      return [i, i];
    } else {
      return undefined;
    }
  }
}
exports.DockyardItemListPanel = DockyardItemListPanel;
//# sourceMappingURL=DockyardItemListPanel.js.map