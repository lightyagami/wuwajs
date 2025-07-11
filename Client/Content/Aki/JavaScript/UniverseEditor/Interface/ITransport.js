"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpcServer = exports.Stcp = undefined;
const MAX_MESSAGE_LENGTH = 1024;
var EPackage;
var EConnectStatus;
function packageToString(t) {
  switch (t.Type) {
    case EPackage.Connect:
      return "con " + t.ConnectId;
    case EPackage.ConnectAck:
      return "con ack " + t.ConnectId;
    case EPackage.Message:
      return `msg ack ${t.Ack} [${t.Msgs.map(t => t.Seq + " " + JSON.stringify(t.Payload)).join(", ")}]`;
    default:
      return "unknown";
  }
}
(function (t) {
  t.Message = "M";
  t.Connect = "C";
  t.ConnectAck = "CA";
})(EPackage = EPackage || {});
(function (t) {
  t[t.Disconnected = 0] = "Disconnected";
  t[t.Connecting = 1] = "Connecting";
  t[t.Connected = 2] = "Connected";
})(EConnectStatus = EConnectStatus || {});
class Stcp {
  constructor(t, e, i, s) {
    this.Name = t;
    this.sFn = e;
    this.x5 = i;
    this.IsServer = s;
    this.S5 = [];
    this.W3 = [];
    this.E5 = 0;
    this.R5 = 0;
    this.I5 = 0;
    this.N5 = 0;
    this.L5 = false;
    this.w5 = EConnectStatus.Disconnected;
    this.M5 = 0;
    this.Verbose = false;
    if (!s) {
      this.M5 = Stcp.F5();
    }
  }
  static F5() {
    Stcp.P5++;
    return Stcp.P5;
  }
  A5(t) {
    if (this.Verbose) {
      this.x5.Log(t);
    }
  }
  O5() {
    var t = {
      Type: EPackage.Message,
      Ack: this.R5,
      Msgs: []
    };
    for (const e of this.S5) {
      t.Msgs.push(e);
      if (JSON.stringify(t).length >= MAX_MESSAGE_LENGTH) {
        t.Msgs.pop();
        break;
      }
    }
    return t;
  }
  D5() {
    var t;
    if (!this.IsServer) {
      if (this.S5.length !== 0) {
        t = {
          Type: EPackage.Connect,
          ConnectId: this.M5
        };
        this.sFn.Send(t);
        this.w5 = EConnectStatus.Connecting;
      }
    }
  }
  k5() {
    var t;
    if (!this.IsServer) {
      t = {
        Type: EPackage.Connect,
        ConnectId: this.M5
      };
      this.sFn.Send(t);
    }
  }
  b5() {
    var t;
    if (this.S5.length !== 0 || !!this.L5) {
      t = this.O5();
      this.sFn.Send(t);
      if (this.S5.length === 0) {
        this.L5 = false;
      }
      this.A5(this.Name + " send " + packageToString(t));
    }
  }
  q5() {
    switch (this.w5) {
      case EConnectStatus.Disconnected:
        this.D5();
        break;
      case EConnectStatus.Connecting:
        this.k5();
        break;
      case EConnectStatus.Connected:
        this.b5();
    }
  }
  SimDropPackage(t) {
    this.N5 = t;
  }
  Send(t) {
    if (this.S5.length >= Stcp.MaxSeqId) {
      throw new Error("SendQueue.length >= Stcp.MaxSeqId");
    }
    this.S5.push({
      Seq: this.E5,
      Payload: t
    });
    this.E5++;
    this.q5();
  }
  U5(t) {
    t = {
      Type: EPackage.ConnectAck,
      ConnectId: t
    };
    this.sFn.Send(t);
  }
  B5(t) {
    if (t.Type !== EPackage.Message) {
      if (t.Type === EPackage.Connect) {
        if (this.IsServer) {
          if (t.ConnectId > this.M5) {
            this.G5(t);
          } else if (t.ConnectId === this.M5) {
            this.U5(t.ConnectId);
          }
        } else {
          this.x5.Error("client recv connect");
        }
      } else if (this.IsServer) {
        this.x5.Error("sv recv connect ack");
      }
    } else {
      if (t.Msgs.length > 0) {
        this.L5 = true;
      }
      if (t.Ack > this.I5) {
        for (this.I5 = t.Ack; this.S5.length > 0 && this.S5[0].Seq < this.I5;) {
          this.S5.shift();
        }
      }
      t.Msgs.forEach(t => {
        if (t.Seq === this.R5) {
          this.W3.push(t);
          this.R5++;
        }
      });
    }
  }
  V5(t) {
    if (!this.IsServer) {
      if (t.Type === EPackage.ConnectAck && t.ConnectId === this.M5) {
        this.j5();
      }
    }
  }
  Reset() {
    if (this.IsServer) {
      this.x5.Error("sv can not reset");
    } else {
      this.H5();
    }
  }
  H5() {
    this.S5 = [];
    this.W3 = [];
    this.E5 = 0;
    this.R5 = 0;
    this.I5 = 0;
    this.N5 = 0;
    this.L5 = false;
    this.w5 = EConnectStatus.Disconnected;
    this.M5 = Stcp.F5();
  }
  Q5() {
    this.S5 = [];
    this.W3 = [];
    this.E5 = 0;
    this.R5 = 0;
    this.I5 = 0;
    this.N5 = 0;
    this.L5 = false;
    this.w5 = EConnectStatus.Disconnected;
  }
  j5() {
    this.w5 = EConnectStatus.Connected;
  }
  G5(t) {
    this.Q5();
    this.w5 = EConnectStatus.Connected;
    this.M5 = t.ConnectId;
    this.U5(t.ConnectId);
  }
  W5(t) {
    if (!!this.IsServer && t.Type === EPackage.Connect && !(t.ConnectId <= this.M5)) {
      this.G5(t);
    }
  }
  X5() {
    if (this.W3.length >= Stcp.MaxSeqId) {
      return false;
    }
    var t = this.sFn.Recv();
    if (!t) {
      return false;
    }
    if (this.N5 > 0) {
      this.N5--;
    } else {
      switch (this.w5) {
        case EConnectStatus.Disconnected:
          this.W5(t);
          break;
        case EConnectStatus.Connecting:
          this.V5(t);
          break;
        case EConnectStatus.Connected:
          this.B5(t);
      }
    }
    return true;
  }
  J5() {
    while (this.X5());
  }
  Recv() {
    this.J5();
    return this.W3.shift()?.Payload;
  }
  Update() {
    this.J5();
    this.q5();
  }
  async RecvAsync(n = -1) {
    return new Promise((e, t) => {
      let i = undefined;
      const s = setInterval(() => {
        var t = this.W3.shift();
        if (t?.Payload) {
          if (i) {
            clearTimeout(i);
          }
          clearInterval(s);
          e(t.Payload);
        }
      }, 1);
      if (n >= 0) {
        i = setTimeout(() => {
          clearInterval(s);
          e(undefined);
        }, n);
      }
    });
  }
  Start() {
    this.j3 ||= setInterval(() => {
      this.Update();
    }, Stcp.RefreshInterval);
  }
  Stop() {
    if (this.j3) {
      clearInterval(this.j3);
      this.j3 = undefined;
    }
  }
}
(exports.Stcp = Stcp).RefreshInterval = 20;
Stcp.MaxSeqId = 256;
Stcp.P5 = 0;
class RpcServer {
  constructor(t, e, i) {
    this.G3 = t;
    this.Y5 = e;
    this.x5 = i;
  }
  Update() {
    var e = this.G3.Recv();
    if (e) {
      const s = e;
      e = this.Y5[s.Name];
      if (e) {
        var t;
        var i = undefined;
        try {
          if ((i = e(...s.Args)) instanceof Promise) {
            i.then(t => {
              t = {
                Id: s.Id,
                Result: t
              };
              this.G3.Send(t);
            }).catch(t => {
              t = {
                Id: s.Id,
                Result: undefined,
                Error: t.message + " " + t.stack
              };
              this.G3.Send(t);
            });
          } else {
            t = {
              Id: s.Id,
              Result: i
            };
            this.G3.Send(t);
          }
        } catch (t) {
          e = {
            Id: s.Id,
            Result: undefined,
            Error: t.message + " " + t.stack
          };
          this.G3.Send(e);
        }
      } else {
        this.x5.Error(`RpcServer: function ${s.Name} not found`);
        i = {
          Id: s.Id,
          Result: undefined,
          Error: `RpcServer: function ${s.Name} not found`
        };
        this.G3.Send(i);
      }
    }
  }
  Start() {
    if (!this.j3) {
      this.G3.Start();
      this.j3 = setInterval(this.Update.bind(this), 1);
    }
  }
  Stop() {
    if (this.j3) {
      this.G3.Stop();
      clearInterval(this.j3);
      this.j3 = undefined;
    }
  }
}
exports.RpcServer = RpcServer;
const gameRpcServiceConfig = {
  ExecGmCommand: t => false,
  EnableClientRpcLog: t => {},
  IsWorldLoadDone: () => false,
  GetMapId: () => 0,
  GetPlayerId: () => 0,
  TeleportToPos: async (t, e) => false,
  IsInteractionHintViewOpen: () => false,
  IsAllowFightInput: () => false,
  GetPlayerPos: () => {},
  GetPlayerRotation: () => {},
  AddBuffToPlayer: t => {},
  RemoveBuffFromPlayer: t => {},
  PlayerHasBuff: t => false,
  MoveTo: async (t, e) => {},
  FaceTo: async (t, e, i) => {},
  NormalAttack: () => {},
  UseRoleSkill: () => {},
  UsePhantomSkill: () => {},
  UseUltraSkill: () => {},
  UseExploreSkill: () => {},
  RequestExploreSkill: t => {},
  IsInExploreSkill: t => false,
  StopAllSkills: () => {},
  CanUseSkill: t => false,
  GetPlayerItemCount: t => 0,
  DisablePlayerClientComponent: t => false,
  GetCameraTransform: () => ({}),
  PlayDaEffect: (t, e) => [false, ""],
  GetTrackLevelPlayId: () => 0,
  GetActivatedDataLayers: () => [],
  IsEntityExist: t => false,
  IsEntityInitDone: t => false,
  IsSceneItemComponentInitDone: t => false,
  TriggerInteractOption: () => {},
  ChangeInteractOption: () => {},
  RequestEntityInteractOption: async (t, e) => false,
  AddBuffToEntity: (t, e) => {},
  RemoveBuffFromEntity: (t, e) => {},
  EntityHasBuff: (t, e) => false,
  GetEntityCurrentMontageName: t => "",
  IsInEntityState: (t, e) => false,
  IsEntityLocked: t => false,
  GetElevatorFloor: t => 0,
  IsEntityActive: t => false,
  GetEntityPos: t => {},
  GetEntityRotation: t => {},
  GetRuntimeActorName: t => "",
  IsRuntimeActorVisible: t => false,
  CreateOrUpdateTipsActor: (t, e, i) => {},
  DestroyTipsActor: t => {},
  GetTipsActorTransform: t => {},
  FocusTipsActor: (t, e) => {},
  CreateOrUpdateTipsSplineActor: (t, e) => {},
  DestroyTipsSplineActor: t => {}
};
const unitTestRpcServiceConfig = {
  Add: (t, e) => 0,
  Sub: (t, e) => 0,
  Mul: (t, e) => 0,
  Div: (t, e) => 0
}; //# sourceMappingURL=ITransport.js.map