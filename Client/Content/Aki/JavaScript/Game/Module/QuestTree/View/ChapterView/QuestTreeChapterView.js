"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeChapterView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const TouchFingerDefine_1 = require("../../../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const LongPressButtonItem_1 = require("../../../Common/Button/LongPressButtonItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const QuestTreeDefine_1 = require("../../QuestTreeDefine");
const QuestTreeNodeItemFactory_1 = require("./IoC/QuestTreeNodeItemFactory");
const QuestTreeChapterStartNodeItem_1 = require("./QuestTreeChapterStartNodeItem");
const QuestTreeCollectBtnItem_1 = require("./QuestTreeCollectBtnItem");
const SCALE_STEP = 0.01;
const EXTRA_BALANCE_UP_REDUCE = 50;
class QuestTreeChapterView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.NRd = undefined;
    this.Qyi = undefined;
    this.VRd = undefined;
    this.kDd = undefined;
    this.U$u = new UE.Vector(1, 1, 1);
    this.ODd = false;
    this.mie = 0;
    this.qDd = undefined;
    this.acc = undefined;
    this.i2d = undefined;
    this.sKd = undefined;
    this.pWd = 0;
    this.tdm = false;
    this.idm = false;
    this.kEm = false;
    this.A2t = t => {
      var e = this.GetSlider(4);
      this.qDd.SetInteractive(t < e.GetMaxValue());
      this.acc.SetInteractive(t > e.GetMinValue());
      this.U$u.X = t;
      this.U$u.Y = t;
      this.U$u.Z = t;
      this.GetHorizontalLayout(6).GetRootComponent().SetUIRelativeScale3D(this.U$u);
      this.ODd = true;
    };
    this.GDd = () => {
      var t = this.GetSlider(4);
      t.SetValue(Math.min(t.GetValue() + SCALE_STEP, t.GetMaxValue()));
    };
    this.FDd = () => {
      var t = this.GetSlider(4);
      t.SetValue(Math.max(t.GetValue() - SCALE_STEP, t.GetMinValue()));
    };
    this.ZNd = () => {
      var t = this.Pe.GetCurTrackingNode();
      if (t) {
        ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.LocateToNode(t);
      }
    };
    this.pKe = () => {
      this.GetScrollViewWithScrollbar(5).Elasticity = this.pWd;
      return true;
    };
    this.vWd = t => {
      var e;
      var i;
      var s;
      if (t) {
        (e = this.GetScrollViewWithScrollbar(5)).SetHorizontal(false);
        e.SetVertical(false);
        this.tdm = true;
        this.idm = true;
        this.GetScrollViewWithScrollbar(5).Elasticity = 0;
        e = t.scrollAxisValue * ConfigManager_1.ConfigManager.QuestTreeConfig.GetScrollingScaleDelta();
        s = (i = this.GetSlider(4)).GetValue();
        s = MathUtils_1.MathUtils.Clamp(s + e, i.GetMinValue(), i.GetMaxValue());
        this.e_m(s, t.pointerPosition);
      }
    };
    this.AOe = t => {
      this.sKd.SetActive(this.Pe.GetAcceptableNodeList().length > 0);
      this.GetButton(14).GetRootComponent().SetUIActive(this.Pe.GetCurTrackingNode() !== undefined);
    };
    this.eWs = Vector_1.Vector.Create();
    this.t_m = Vector_1.Vector.Create();
    this.wFo = new Map();
    this.Eqt = (t, e) => {
      if (e.TouchType === 0) {
        this.i_m(e);
      } else if (e.TouchType === 1) {
        this.r_m(e);
      } else if (e.TouchType === 2) {
        this.imr(e);
      }
    };
    this.i_m = t => {
      var e = t.TouchId;
      if (LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(e)) {
        this.wFo.set(e, t);
      }
      this.t_m.Reset();
      this.wFo.forEach(t => {
        this.eWs.Set(t.TouchPosition.X, t.TouchPosition.Y, 0);
        this.t_m.AdditionEqual(this.eWs);
      });
      if (this.wFo.size > 0) {
        this.t_m.DivisionEqual(this.wFo.size);
      }
    };
    this.r_m = t => {
      t = t.TouchId;
      this.wFo.delete(t);
      this.t_m.Reset();
      this.wFo.forEach(t => {
        this.eWs.Set(t.TouchPosition.X, t.TouchPosition.Y, 0);
        this.t_m.AdditionEqual(this.eWs);
      });
      if (this.wFo.size > 0) {
        this.t_m.DivisionEqual(this.wFo.size);
      }
    };
    this.imr = t => {
      var e;
      var i;
      if (this.o_m && (this.tdm = true, {
        State: i,
        ChangeRate: e
      } = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseType(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two), i !== TouchFingerDefine_1.EFingerExpandCloseType.None)) {
        i = this.GetSlider(4).GetValue();
        this.e_m(i + e, this.t_m.ToUeVectorOld());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UISliderComponent], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UITexture], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIDraggableComponent], [16, UE.UIScrollbarComponent], [17, UE.UIItem]];
    this.BtnBindInfo = [[14, this.ZNd]];
  }
  async OnBeforeStartAsync() {
    var t;
    var e = this.GetScrollViewWithScrollbar(5);
    e.SetVertical(true);
    e.SetHorizontal(true);
    this.kEm = true;
    var e = this.OpenParam.ChapterId;
    var e = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(e);
    if (e) {
      this.Pe = e;
      t = [];
      this.VRd = QuestTreeNodeItemFactory_1.QuestTreeNodeItemFactory.Instance;
      this.NRd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), () => this.VRd.CreateLogicalNodeItem(1), this.GetItem(7).GetOwner(), true);
      await this.NRd.RefreshByDataAsync(e.GetMainNodeList(), true);
      this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
      this.Qyi.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.Qyi.SetHelpCallBack(() => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(QuestTreeDefine_1.QUEST_TREE_HELP_ID);
      });
      t.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
      this.i2d = new QuestTreeChapterStartNodeItem_1.QuestTreeChapterStartNodeItem(e);
      t.push(this.i2d.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
      this.sKd = new QuestTreeCollectBtnItem_1.QuestTreeCollectBtnItem(e);
      t.push(this.sKd.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()));
      t.push(this.SetTextureAsync(this.Pe.Config.RegionImage, this.GetTexture(8)));
      t.push(this.SetTextureAsync(this.Pe.Config.InnerBackgroundImage, this.GetTexture(11)));
      await Promise.all(t);
      t = this.GetHorizontalLayout(6).GetPadding();
      this.kDd = new UE.Margin(t.Left, t.Top, t.Right, t.Bottom);
      this.qDd = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(2), 1, this.GDd);
      this.acc = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(3), 1, this.FDd);
      this.qDd.ShouldPlayLongPressSound = true;
      this.acc.ShouldPlayLongPressSound = true;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.Config.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.Config.TitleText);
      this.GetItem(7).SetUIActive(false);
      await TimerSystem_1.TimerSystem.Wait(200);
    }
  }
  OnStart() {
    var t = this.GetScrollViewWithScrollbar(5);
    t.OnPointerBeginDragCallBack.Bind(this.pKe);
    this.GetSlider(4).OnValueChangeCb.Bind(this.A2t);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.InitLocatingHelper(t);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.OnViewOpen(this);
    this.sKd.SetActive(this.Pe.GetAcceptableNodeList().length > 0);
    this.GetButton(14).GetRootComponent().SetUIActive(this.Pe.GetCurTrackingNode() !== undefined);
    this.GetDraggable(15).OnPointerScrollCallBack.Bind(this.vWd);
    this.pWd = t.Elasticity;
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindTouches([TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two], this.Eqt);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnBeforeShow() {}
  OnAfterShow() {
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.NotifyUpdateNode();
    this.AOe(undefined);
    this.kEm = false;
    var t;
    var e = this.OpenParam.ChapterId;
    var e = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(e);
    if (e && (t = (t = this.OpenParam.NodeId) ? e.NodeMap.get(t) : e.GetDefaultLocatingNode())) {
      ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.LocateToNode(t);
    }
  }
  OnBeforeHide() {
    ControllerHolder_1.ControllerHolder.QuestTreeController.CloseNodeDetailView();
  }
  OnBeforeDestroy() {
    this.VRd = undefined;
    this.GetSlider(4).OnValueChangeCb.Unbind();
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.OnViewClose();
    this.GetScrollViewWithScrollbar(5).OnPointerBeginDragCallBack.Unbind();
    this.GetDraggable(15).OnPointerScrollCallBack.Unbind();
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindTouches([TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two], this.Eqt);
    this.idm = false;
  }
  OnTick(t) {
    this.qEm(t);
    this.OEm(t);
    this.GEm(t);
    this.FEm(t);
  }
  qEm(t) {
    this.mie += t;
    if (this.mie >= 100 && (this.mie = 0, this.ODd)) {
      (t = this.GetHorizontalLayout(6)).GetRootComponent().SetUIActive(false);
      t.GetRootComponent().SetUIActive(true);
      this.ODd = false;
    }
  }
  OEm(t) {
    var e;
    var i;
    var s;
    if (this.kDd) {
      e = this.GetHorizontalLayout(6);
      i = ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.MaxTopHeight;
      if ((s = ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.MaxBottomHeight - i) > 0) {
        this.kDd.Top = -s + ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.MaxToggleHeight * (i > 0 ? 0 : 1) + EXTRA_BALANCE_UP_REDUCE;
        this.kDd.Bottom = 50;
      } else {
        this.kDd.Top = 50;
        this.kDd.Bottom = -s;
      }
      e.SetPadding(this.kDd);
    }
  }
  FEm(t) {
    var e;
    var i;
    if (this.kEm && (e = this.OpenParam.ChapterId, e = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(e)) && (i = (i = this.OpenParam.NodeId) ? e.NodeMap.get(i) : e.GetDefaultLocatingNode())) {
      ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.LocateToNode(i, false);
    }
  }
  GEm(t) {
    var e;
    if (this.tdm) {
      this.tdm = false;
    } else if (this.idm) {
      (e = this.GetScrollViewWithScrollbar(5)).SetHorizontal(true);
      e.SetVertical(true);
    }
  }
  async RefreshByData(t) {
    this.Pe = t;
    var e = [];
    e.push(this.NRd.RefreshByDataAsync(t.GetMainNodeList(), true));
    e.push(this.i2d.RefreshByData(t));
    e.push(this.SetTextureAsync(t.Config.RegionImage, this.GetTexture(8)));
    e.push(this.SetTextureAsync(t.Config.InnerBackgroundImage, this.GetTexture(11)));
    this.sKd.RefreshByData(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t.Config.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.Config.TitleText);
    await Promise.all(e);
    this.GetItem(7).SetUIActive(false);
  }
  GetScrollView() {
    return this.GetScrollViewWithScrollbar(5);
  }
  GetOverrideBlurItem() {
    return this.GetItem(17);
  }
  get o_m() {
    return this.wFo.size > 1;
  }
  e_m(t, e) {
    var e = Vector2D_1.Vector2D.Create(e);
    var e = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(e.ToUeVector2D());
    var i = this.GetHorizontalLayout(6).GetRootComponent();
    var s = i.GetLGUISpaceAbsolutePosition();
    var h = e.X - s.X;
    var e = e.Y - s.Y;
    var s = this.GetSlider(4);
    var r = t / s.GetValue();
    var h = h * (1 - r);
    var e = e * (1 - r);
    var r = i.GetAnchorOffset().X + h;
    var h = i.GetAnchorOffset().Y + e;
    i.SetAnchorOffsetX(r);
    i.SetAnchorOffsetY(h);
    s.SetValue(t);
  }
}
exports.QuestTreeChapterView = QuestTreeChapterView;
//# sourceMappingURL=QuestTreeChapterView.js.map