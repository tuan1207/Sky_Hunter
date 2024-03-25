import { _decorator, Component, Node, Collider2D, Contact2DType, math, Vec3, tween, IPhysics2DContact, Prefab, instantiate, macro, Animation, Scene, RigidBody2D, Vec2 } from 'cc';
import { GameCtrl } from './GameCtrl';
import { Plane } from './Plane';
import { AudioToggle } from './AudioToggle';
import { ButtonPlayScene } from './ButtonPlayScene';
const { ccclass, property } = _decorator;

@ccclass('Boss')
export class Boss extends Component {
    static instance: Boss;
    @property(Prefab)
    public bulletE: Prefab = null;
    @property(Animation)
    public laserBullet: Animation = null;
    @property
    speed: number = 100;

    public bulletCont = [];
    public maxHealth: number = 150;
    public currentHealth: number = 150;  
    
    public randomX: number;
    public randomY: number;
    public randomPosition: Vec3 = Vec3.ZERO;
    bulletVelos = [
        new Vec2(0, 13.85), new Vec2(5.3, 12.8), new Vec2(10.6, 10.6), new Vec2(12.8, 5.3),
        new Vec2(13.85, 0), new Vec2(12.8, -5.3), new Vec2(10.6, -10.6), new Vec2(5.3, -12.8),
        new Vec2(0, -13.85), new Vec2(-5.3, -12.8), new Vec2(-10.6, -10.6), new Vec2(-12.8, -5.3),
        new Vec2(-13.85, 0), new Vec2(-12.8, 5.3), new Vec2(-10.6, 10.6), new Vec2(-5.3, 12.8),
    ];
    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.randomPos();
    }
    protected onLoad(): void {
        Boss.instance = this;
    }
    update(dt: number) {
        if (!ButtonPlayScene.instance.moveEnable) {
            return;
        }
        let direction = this.randomPosition.clone().subtract(this.node.position).normalize();
        let distance = math.Vec3.distance(this.node.position, this.randomPosition);
        let posX = this.node.position.x + direction.x * distance * 0.01;
        let posY = this.node.position.y + direction.y * distance * 0.01;
        this.node.setPosition(new Vec3(posX, posY));
        if (distance <= 50) {
            this.randomPos();  
        }
    }
    randomPos(){
        this.randomX = math.random() * (0 - 1000) + 500;
        this.randomY = math.random() * (200 - 600) + 400;
        this.randomPosition = new Vec3(this.randomX, this.randomY);        
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        AudioToggle.instance.onAudioQueue(7);
        if(otherCollider.node.name === 'bullet0' || otherCollider.node.name === 'rocket'){
            this.scheduleOnce(() => {otherCollider.node?.destroy()}); 
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){

    }
    
}





