import { _decorator, Component, EventTouch, math, misc, Node, UITransform, Vec3 } from 'cc';
import { Plane } from './Plane';
import { ButtonPlayScene } from './ButtonPlayScene';
const { ccclass, property } = _decorator;

@ccclass('JoyStick')
export class JoyStick extends Component {
    static instance: JoyStick;

    @property(Node)
    public joyStick: Node = null;
    @property(Node)
    public Stick: Node = null;
    @property
    public maxR: number = 100;
    @property(Node)
    public plane: Node = null;
    @property(Node)
    public canvas: Node = null;

    public stickPos;
    public VecY = new Vec3(0, 0, 0);

    private isStickMoving: boolean = false;
    protected start(): void {
        this.joyStick.active = false;
        this.canvas.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.canvas.on(Node.EventType.TOUCH_MOVE, this.onStickMove, this);
        this.canvas.on(Node.EventType.TOUCH_END, this.onStickEnd, this);
        this.canvas.on(Node.EventType.TOUCH_CANCEL, this.onStickEnd, this);
    }

    update(dt: number) {
        if (this.isStickMoving) {
            if (!ButtonPlayScene.instance.moveEnable) {
                return;
            }
            let direction = this.stickPos.clone().subtract(this.VecY).normalize();
            let distance = math.Vec3.distance(this.VecY, this.stickPos);
            let posX = this.plane.position.x + direction.x * distance * 0.05;
            let posY = this.plane.position.y + direction.y * distance * 0.05;
            if (posX > -630 && posX < 630 && posY > -330 && posY < 330){
                this.plane.setPosition(new Vec3(posX, posY));
            }
        }
    }

    protected onLoad(): void {
        JoyStick.instance = this;
    }
    onTouchStart(event: EventTouch){
        let wp = event.touch.getUILocation();
        let posMouse = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(wp.x, wp.y));
        this.joyStick.active = true;
        this.joyStick.setPosition(posMouse);
    }
    onStickMove(event: EventTouch, dt: number) {
        let wp = event.getUILocation();
        this.stickPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(wp.x, wp.y));
        let stickMag = this.stickPos.length();
        if (stickMag <= 0) {
            return;
        }
        if (stickMag > this.maxR) {
            this.stickPos.x = this.stickPos.x * this.maxR / stickMag;
            this.stickPos.y = this.stickPos.y * this.maxR / stickMag;
        }
        this.Stick.setPosition(this.stickPos);
        this.isStickMoving = true;
    }
    onStickEnd(event: EventTouch) {
        this.Stick.setPosition(new Vec3(0, 0));
        this.joyStick.active = false;
        this.isStickMoving = false;
    }
}


