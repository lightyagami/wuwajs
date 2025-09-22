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
    this.gTd = undefined;
    this.Qyi = undefined;
    this.CTd = undefined;
    this.tPd = undefined;
    this.U$u = new UE.Vector(1, 1, 1);
    this.iPd = false;
    this.mie = 0;
    this.rPd = undefined;
    this.acc = undefined;
    this.txd = undefined;
    this.J5d = undefined;
    this.yVd = 0;
    this.rQd = false;
    this.oQd = false;
    this.A2t = e => {
      var t = this.GetSlider(4);
      this.rPd.SetInteractive(e < t.GetMaxValue());
      this.acc.SetInteractive(e > t.GetMinValue());
      this.U$u.X = e;
      this.U$u.Y = e;
      this.U$u.Z = e;
      this.GetHorizontalLayout(6).GetRootComponent().SetUIRelativeScale3D(this.U$u);
      this.iPd = true;
    };
    this.oPd = () => {
      var e = this.GetSlider(4);
      e.SetValue(Math.min(e.GetValue() + SCALE_STEP, e.GetMaxValue()));
    };
    this.nPd = () => {
      var e = this.GetSlider(4);
      e.SetValue(Math.max(e.GetValue() - SCALE_STEP, e.GetMinValue()));
    };
    this.bqd = () => {
      var e = this.Pe.GetCurTrackingNode();
      if (e) {
        ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.LocateToNode(e);
      }
    };
    this.pKe = () => {
      this.GetScrollViewWithScrollbar(5).Elasticity = this.yVd;
      return true;
    };
    this.SVd = e => {
      var t;
      var i;
      var s;
      if (e) {
        (t = this.GetScrollViewWithScrollbar(5)).SetHorizontal(false);
        t.SetVertical(false);
        this.rQd = true;
        this.oQd = true;
        this.GetScrollViewWithScrollbar(5).Elasticity = 0;
        t = e.scrollAxisValue * ConfigManager_1.ConfigManager.QuestTreeConfig.GetScrollingScaleDelta();
        s = (i = this.GetSlider(4)).GetValue();
        s = MathUtils_1.MathUtils.Clamp(s + t, i.GetMinValue(), i.GetMaxValue());
        this.HWd(s, e.pointerPosition);
      }
    };
    this.AOe = e => {
      this.J5d.SetActive(this.Pe.GetAcceptableNodeList().length > 0);
      this.GetButton(14).GetRootComponent().SetUIActive(this.Pe.GetCurTrackingNode() !== undefined);
    };
    this.eWs = Vector_1.Vector.Create();
    this.$Wd = Vector_1.Vector.Create();
    this.wFo = new Map();
    this.Eqt = (e, t) => {
      if (t.TouchType === 0) {
        this.WWd(t);
      } else if (t.TouchType === 1) {
        this.QWd(t);
      } else if (t.TouchType === 2) {
        this.imr(t);
      }
    };
    this.WWd = e => {
      var t = e.TouchId;
      if (LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(t)) {
        this.wFo.set(t, e);
      }
      this.$Wd.Reset();
      this.wFo.forEach(e => {
        this.eWs.Set(e.TouchPosition.X, e.TouchPosition.Y, 0);
        this.$Wd.AdditionEqual(this.eWs);
      });
      if (this.wFo.size > 0) {
        this.$Wd.DivisionEqual(this.wFo.size);
      }
    };
    this.QWd = e => {
      e = e.TouchId;
      this.wFo.delete(e);
      this.$Wd.Reset();
      this.wFo.forEach(e => {
        this.eWs.Set(e.TouchPosition.X, e.TouchPosition.Y, 0);
        this.$Wd.AdditionEqual(this.eWs);
      });
      if (this.wFo.size > 0) {
        this.$Wd.DivisionEqual(this.wFo.size);
      }
    };
    this.imr = e => {
      var t;
      var i;
      if (this.KWd && (this.rQd = true, {
        State: i,
        ChangeRate: t
      } = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseType(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two), i !== TouchFingerDefine_1.EFingerExpandCloseType.None)) {
        i = this.GetSlider(4).GetValue();
        this.HWd(i + t, this.$Wd.ToUeVectorOld());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UISliderComponent], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UITexture], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIDraggableComponent], [16, UE.UIScrollbarComponent], [17, UE.UIItem]];
    this.BtnBindInfo = [[14, this.bqd]];
  }
  async OnBeforeStartAsync() {
    var e;
    var t = this.GetScrollViewWithScrollbar(5);
    t.SetVertical(true);
    t.SetHorizontal(false);
    var t = this.OpenParam.ChapterId;
    var t = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(t);
    if (t) {
      this.Pe = t;
      e = [];
      this.CTd = QuestTreeNodeItemFactory_1.QuestTreeNodeItemFactory.Instance;
      this.gTd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), () => this.CTd.CreateLogicalNodeItem(1), this.GetItem(7).GetOwner(), true);
      await this.gTd.RefreshByDataAsync(t.GetMainNodeList(), true);
      this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
      this.Qyi.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.Qyi.SetHelpCallBack(() => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(QuestTreeDefine_1.QUEST_TREE_HELP_ID);
      });
      e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
      this.txd = new QuestTreeChapterStartNodeItem_1.QuestTreeChapterStartNodeItem(t);
      e.push(this.txd.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
      this.J5d = new QuestTreeCollectBtnItem_1.QuestTreeCollectBtnItem(t);
      e.push(this.J5d.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()));
      e.push(this.SetTextureAsync(this.Pe.Config.RegionImage, this.GetTexture(8)));
      e.push(this.SetTextureAsync(this.Pe.Config.InnerBackgroundImage, this.GetTexture(11)));
      await Promise.all(e);
      e = this.GetHorizontalLayout(6).GetPadding();
      this.tPd = new UE.Margin(e.Left, e.Top, e.Right, e.Bottom);
      this.rPd = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(2), 1, this.oPd);
      this.acc = new LongPressButtonItem_1.LongPressButtonItem(this.GetButton(3), 1, this.nPd);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t.Config.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.Config.TitleText);
      this.GetItem(7).SetUIActive(false);
      await TimerSystem_1.TimerSystem.Wait(200);
    }
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(5);
    e.OnPointerBeginDragCallBack.Bind(this.pKe);
    this.GetSlider(4).OnValueChangeCb.Bind(this.A2t);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.InitLocatingHelper(e);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.OnViewOpen(this);
    this.J5d.SetActive(this.Pe.GetAcceptableNodeList().length > 0);
    this.GetButton(14).GetRootComponent().SetUIActive(this.Pe.GetCurTrackingNode() !== undefined);
    this.GetDraggable(15).OnPointerScrollCallBack.Bind(this.SVd);
    this.yVd = e.Elasticity;
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindTouches([TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two], this.Eqt);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnAfterShow() {
    this.GetScrollViewWithScrollbar(5).SetHorizontal(true);
    var e;
    var t = this.OpenParam.ChapterId;
    var t = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(t);
    if (t) {
      if (e = (e = this.OpenParam.NodeId) ? t.NodeMap.get(e) : t.GetDefaultLocatingNode()) {
        ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.LocateToNode(e);
      }
      ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.NotifyUpdateNode();
      this.AOe(e);
    }
  }
  OnBeforeDestroy() {
    this.CTd = undefined;
    this.GetSlider(4).OnValueChangeCb.Unbind();
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.OnViewClose();
    this.GetScrollViewWithScrollbar(5).OnPointerBeginDragCallBack.Unbind();
    this.GetDraggable(15).OnPointerScrollCallBack.Unbind();
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindTouches([TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two], this.Eqt);
    this.oQd = false;
  }
  OnTick(e) {
    this.mie += e;
    if (this.mie >= 100 && (this.mie = 0, this.iPd)) {
      const t = this.GetHorizontalLayout(6);
      t.GetRootComponent().SetUIActive(false);
      t.GetRootComponent().SetUIActive(true);
      this.iPd = false;
    }
    if (this.tPd) {
      const t = this.GetHorizontalLayout(6);
      var e = ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.MaxHeightBalanceValue;
      if (e > 0) {
        this.tPd.Top = -e + ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.MaxToggleHeight + EXTRA_BALANCE_UP_REDUCE;
        this.tPd.Bottom = 50;
      } else {
        this.tPd.Top = 50;
        this.tPd.Bottom = -e;
      }
      t.SetPadding(this.tPd);
      if (this.rQd) {
        this.rQd = false;
      } else if (this.oQd) {
        (e = this.GetScrollViewWithScrollbar(5)).SetHorizontal(true);
        e.SetVertical(true);
      }
    }
  }
  GetScrollView() {
    return this.GetScrollViewWithScrollbar(5);
  }
  GetOverrideBlurItem() {
    return this.GetItem(17);
  }
  get KWd() {
    return this.wFo.size > 1;
  }
  HWd(e, t) {
    var t = Vector2D_1.Vector2D.Create(t);
    var t = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D());
    var i = this.GetHorizontalLayout(6).GetRootComponent();
    var s = i.GetLGUISpaceAbsolutePosition();
    var h = t.X - s.X;
    var t = t.Y - s.Y;
    var s = this.GetSlider(4);
    var r = e / s.GetValue();
    var h = h * (1 - r);
    var t = t * (1 - r);
    var r = i.GetAnchorOffset().X + h;
    var h = i.GetAnchorOffset().Y + t;
    i.SetAnchorOffsetX(r);
    i.SetAnchorOffsetY(h);
    s.SetValue(e);
  }
}
exports.QuestTreeChapterView = QuestTreeChapterView;
//# sourceMappingURL=QuestTreeChapterView.js.map