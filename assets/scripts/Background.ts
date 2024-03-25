import { _decorator, Component, Node, Vec3, UITransform, director, Canvas } from 'cc';
import { Plane } from './Plane';
const { ccclass, property } = _decorator;

@ccclass('Background')
export class Background extends Component {
    @property(Node)
    public BG1: Node = null;
    @property(Node)
    public BG2: Node = null;
    @property(Node)
    public BG3: Node = null;

    public bgHeight1: number;
    public bgHeight2: number;
    public bgHeight3: number;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;


    public gameSpeed: number = 75;

    protected onLoad(): void {
        this.startUp();
    }

    startUp(){
        this.bgHeight1 = this.BG1.getComponent(UITransform).height;
        this.bgHeight2 = this.BG2.getComponent(UITransform).height;
        this.bgHeight3 = this.BG3.getComponent(UITransform).height;

        this.tempStartLocation1.y = -500;
        this.tempStartLocation2.y = this.bgHeight1 - 500;
        this.tempStartLocation3.y = this.bgHeight1 + this.bgHeight2 - 500;

        this.BG1.setPosition(this.tempStartLocation1);
        this.BG2.setPosition(this.tempStartLocation2);
        this.BG3.setPosition(this.tempStartLocation3);
    }

    update(deltaTime: number) {
        if (!Plane.instance.moveEnable) {
            return;
        }
        this.tempStartLocation1 = this.BG1.position;
        this.tempStartLocation2 = this.BG2.position;
        this.tempStartLocation3 = this.BG3.position;

        this.tempStartLocation1.y -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.y -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.y -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        if(this.tempStartLocation1.y <= (0 - this.bgHeight1)){
            this.tempStartLocation1.y = canvas.getComponent(UITransform).height;
        }
        if(this.tempStartLocation2.y <= (0 - this.bgHeight2)){
            this.tempStartLocation2.y = canvas.getComponent(UITransform).height;
        }
        if(this.tempStartLocation3.y <= (0 - this.bgHeight3)){
            this.tempStartLocation3.y = canvas.getComponent(UITransform).height;
        }

        this.BG1.setPosition(this.tempStartLocation1);
        this.BG2.setPosition(this.tempStartLocation2);
        this.BG3.setPosition(this.tempStartLocation3);

    }
}


