"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EavesdropMark = undefined;
const UE = require("ue");
const ue_1 = require("ue");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SneakController_1 = require("../../../World/Controller/SneakController");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const UPDATE_TOLERATION = 0.1;
const HEAD_OFFSET = 150;
const NORMAL_START = "Eavesdrop_Start";
const NORMAL_END = "Eavesdrop_Close";
const TAKING_START = "Talk_Start";
const TAKING_LOOP = "Loop";
const TAKING_END = "Talk_Close";
const FOUND = "BeFound_Start";
const normalTag = -1304517334;
const startTakingTag = 570573252;
const endTag = -56767509;
const headName = new ue_1.FName("Bip001Head");
class EavesdropMark extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.E$e = undefined;
    this.A2n = undefined;
    this.U2n = undefined;
    this.yen = undefined;
    this.JZ = undefined;
    this.R2n = undefined;
    this.x2n = undefined;
    this.P2n = undefined;
    this.SPe = undefined;
    this.$1t = Rotator_1.Rotator.Create();
    this.B2n = 3;
    this.w2n = 3;
    this.$Ha = -1;
    this.b2n = (t, i) => {
      if (i && this.B2n !== 0) {
        this.PlayChangeToNormalSeq();
      }
    };
    this.q2n = (t, i) => {
      if (i && this.B2n === 0) {
        this.PlayTakingSeq();
      }
    };
    this.G2n = (t, i) => {
      if (i && this.B2n !== 3) {
        this.PlayEndSeq();
      }
    };
    this.JTt = t => {
      if (t === NORMAL_END || t === TAKING_END) {
        if (t === NORMAL_END) {
          this.JZ?.SetUIActive(false);
        } else if (t === TAKING_END) {
          this.x2n?.SetUIActive(false);
        }
        switch (this.w2n) {
          case 1:
            this.x2n?.SetUIActive(true);
            this.O2n();
            break;
          case 2:
            this.P2n?.SetUIActive(true);
            this.N2n();
            break;
          case 0:
            this.JZ?.SetUIActive(true);
            this.k2n();
            break;
          case 3:
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveEavesdropMark, this.A2n);
        }
      } else if (t === TAKING_START) {
        this.SPe?.PlaySequencePurely(TAKING_LOOP);
      }
    };
    this.gYe = () => {
      this.SetActive(true);
    };
    this.fYe = () => {
      this.SetActive(false);
    };
    if (GlobalData_1.GlobalData.World && (this.E$e = t, this.A2n = i, t = EntitySystem_1.EntitySystem.Get(i))) {
      this.U2n = t.GetComponent(209);
      this.U2n.AddTagAddOrRemoveListener(normalTag, this.b2n);
      this.U2n.AddTagAddOrRemoveListener(startTakingTag, this.q2n);
      this.U2n.AddTagAddOrRemoveListener(endTag, this.G2n);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.JZ = this.GetItem(0);
    this.R2n = this.GetText(1);
    this.x2n = this.GetItem(2);
    this.P2n = this.GetItem(3);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe?.BindSequenceCloseEvent(this.JTt);
    this.JZ?.SetUIActive(true);
    this.x2n?.SetUIActive(false);
    this.P2n?.SetUIActive(false);
    this.SPe.PlaySequencePurely(NORMAL_START);
    this.B2n = 0;
    this.yen = this.E$e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    var t = this.F2n();
    this.T_e();
    this.Swr();
    if (t !== undefined && SneakController_1.SneakController.IsSneaking) {
      if (this.$Ha < t && !this.GetActive()) {
        this.SetActive(true);
      } else if (this.$Ha >= t && this.GetActive()) {
        this.SetActive(false);
      }
    }
    this.RootItem.SetUIRelativeScale3D(Vector_1.Vector.Create(0.5, 0.5, 0.5).ToUeVectorOld(true));
  }
  Update() {
    var t = this.F2n();
    this.T_e();
    this.Swr();
    if (t !== undefined && SneakController_1.SneakController.IsSneaking) {
      if (this.$Ha < t && this.GetActive()) {
        this.SetActive(false);
      } else if (this.$Ha >= t && !this.GetActive()) {
        this.SetActive(true);
      }
    }
  }
  T_e() {
    var t = CameraController_1.CameraController.CameraRotator;
    var i = t.Yaw + 90;
    var t = t.Pitch - 90;
    var e = Rotator_1.Rotator.Create(this.RootItem.RelativeRotation);
    if (!(Math.abs(i - this.$1t.Yaw) < UPDATE_TOLERATION) || !(Math.abs(t - this.$1t.Roll) < UPDATE_TOLERATION) || !e.Equals(this.$1t, UPDATE_TOLERATION)) {
      this.$1t.Yaw = i;
      this.$1t.Pitch = 0;
      this.$1t.Roll = t;
      this.RootItem?.SetUIRelativeRotation(this.$1t.ToUeRotator());
    }
  }
  F2n() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
    var i = this.E$e?.D_K2_GetActorLocation();
    if (t && i) {
      i = Vector_1.Vector.Create(i).SubtractionEqual(Vector_1.Vector.Create(t));
      this.R2n?.SetText(Math.round(i.Size() / 100).toString() + " 米");
      return i.Size();
    }
    this.R2n?.SetText("");
  }
  Swr() {
    var t = this.yen.D_GetSocketLocation(headName);
    t.Z += HEAD_OFFSET;
    var t = UE.KismetMathLibrary.Conv_VectorDoubleToVector(t);
    this.RootItem.SetUIRelativeLocation(t);
  }
  PlayFoundSeq() {
    if (this.B2n !== 2) {
      if (this.B2n === 0) {
        this.SPe?.PlaySequencePurely(NORMAL_END);
        this.w2n = 2;
      } else if (this.B2n === 1) {
        this.SPe?.PlaySequencePurely(TAKING_END);
        this.w2n = 2;
      }
    }
  }
  N2n() {
    this.SPe?.PlaySequencePurely(FOUND);
    this.B2n = 2;
    this.w2n = 3;
  }
  k2n() {
    this.SPe?.PlaySequencePurely(NORMAL_START);
    this.B2n = 0;
    this.w2n = 3;
  }
  PlayEndSeq() {
    if (this.B2n !== 3) {
      if (this.B2n === 1) {
        this.SPe?.PlaySequencePurely(TAKING_END);
      } else if (this.B2n === 0) {
        this.SPe?.PlaySequencePurely(NORMAL_END);
      }
      this.B2n = 3;
    }
  }
  PlayTakingSeq() {
    if (this.B2n !== 1 && this.B2n === 0) {
      this.SPe?.PlaySequencePurely(NORMAL_END);
      this.w2n = 1;
    }
  }
  PlayChangeToNormalSeq() {
    if (this.B2n !== 0 && this.B2n === 1) {
      this.SPe?.PlaySequencePurely(TAKING_END);
      this.w2n = 0;
    }
  }
  O2n() {
    this.SPe?.PlaySequencePurely(TAKING_START);
    this.B2n = 1;
    this.w2n = 3;
  }
  Initialize(t, i) {
    this.CreateThenShowByResourceIdAsync("UiItem_Eavesdrop", t);
    this.$Ha = i;
    this.SetActive(SneakController_1.SneakController.IsSneaking);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SneakStart, this.gYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SneakEnd, this.fYe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SneakStart, this.gYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SneakEnd, this.fYe);
  }
  OnEnd() {}
}
exports.EavesdropMark = EavesdropMark;
//# sourceMappingURL=EavesdropMark.js.map