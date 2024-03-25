import { _decorator, Component, instantiate, Node, input, Input, EventKeyboard, KeyCode, Vec3, Collider2D, Contact2DType, IPhysics2DContact, EPhysics2DDrawFlags, Animation, Prefab, macro, RigidBody2D, Vec2 } from 'cc';
import { GameCtrl } from './GameCtrl';
import { AudioToggle } from './AudioToggle';
import { ButtonPlayScene } from './ButtonPlayScene';
const { ccclass, property } = _decorator;

@ccclass('Plane')
export class Plane extends Component {
    static instance: Plane;

    @property(Node)
    public Plane: Node = null;
    @property(Animation)
    public planeAnim: Animation = null;
    @property(Prefab)
    public listBullet: Prefab [] = [];
    @property(Node)
    public listHealth: Node [] = [];
    @property(Node)
    public bullet: Node = null;;
    

    public moveLeft: boolean = false;
    public moveRight: boolean = false;
    public moveUp: boolean = false;
    public moveDown: boolean = false;
    public moveEnable: boolean = true;

    public moveSpeed: number = 200;

    public listItemB = [];
    public listItemR = [];
    public countCont = [];

    bulletVelos = [
        new Vec2(0, 20),
        new Vec2(-1.5, 19),
        new Vec2(1.5, 19),
        new Vec2(-3, 18),
        new Vec2(3, 18)
    ];

    protected onLoad(): void {
        Plane.instance = this;
        // PhysicsSystem2D.instance.enable = true;
        // PhysicsSystem2D.instance.debugDrawFlags  = EPhysics2DDrawFlags.Aabb |
        // EPhysics2DDrawFlags.Pair |
        // EPhysics2DDrawFlags.CenterOfMass |
        // EPhysics2DDrawFlags.Joint |
        // EPhysics2DDrawFlags.Shape;
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        this.schedule(this.spawnBullet, 0.4, macro.REPEAT_FOREVER, 0);
        this.schedule(this.spawnRocket, 0.7, macro.REPEAT_FOREVER, 0);
    }
    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    protected start(): void {
        let collider = this.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }
    protected update(dt: number): void {
        if(ButtonPlayScene.instance.moveEnable === false) return;
        this.planeMove(dt);
        this.Plane.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
    }
    onKeyDown(event: EventKeyboard){
        if(!ButtonPlayScene.instance.moveEnable) return;
        switch(event.keyCode){
            case KeyCode.KEY_A: this.moveLeft = true; break;
            case KeyCode.KEY_D: this.moveRight = true; break;
            case KeyCode.KEY_W: this.moveUp = true; break;
            case KeyCode.KEY_S: this.moveDown = true; break;

            case KeyCode.ARROW_LEFT: this.moveLeft = true; break;
            case KeyCode.ARROW_RIGHT: this.moveRight = true; break;
            case KeyCode.ARROW_UP: this.moveUp = true; break;
            case KeyCode.ARROW_DOWN: this.moveDown = true; break;

        }
    }
    onKeyUp(event: EventKeyboard){
        if(!ButtonPlayScene.instance.moveEnable) return;
        switch(event.keyCode){
            case KeyCode.KEY_A: this.moveLeft = false; break;
            case KeyCode.KEY_D: this.moveRight = false; break;
            case KeyCode.KEY_W: this.moveUp = false; break;
            case KeyCode.KEY_S: this.moveDown = false; break;

            case KeyCode.ARROW_LEFT: this.moveLeft = false; break;
            case KeyCode.ARROW_RIGHT: this.moveRight = false; break;
            case KeyCode.ARROW_UP: this.moveUp = false; break;
            case KeyCode.ARROW_DOWN: this.moveDown = false; break;

        }
    }  
    planeMove(dt: number){
        let posX = this.Plane.position.x;
        let posY = this.Plane.position.y;

        if(this.moveLeft){
            if(posX > -575){
                posX -= this.moveSpeed * dt;
            }
            let posPlane = new Vec3(posX, posY);
            this.Plane.setPosition(posPlane);
        }
        if(this.moveRight){
            if(posX < 575){
                posX += this.moveSpeed * dt;
            }
            let posPlane = new Vec3(posX, posY);
            this.Plane.setPosition(posPlane);
        }
        if(this.moveUp){
            if(posY < 340){
                posY += this.moveSpeed * dt;
            }
            let posPlane = new Vec3(posX, posY);
            this.Plane.setPosition(posPlane); 
        }
        if(this.moveDown){
            if(posY > -340){
                posY -= this.moveSpeed * dt;
            }
            let posPlane = new Vec3(posX, posY);
            this.Plane.setPosition(posPlane); 
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(!ButtonPlayScene.instance.spawnEnabled) {
            return;
        }
        let other = otherCollider.node;
        if(other.name === 'ItemB'){
            AudioToggle.instance.onAudioQueue(3);
            this.scheduleOnce(() => {this.listItemB.push(other)});
            this.scheduleOnce(() => {other.destroy()});
        }
        if(other.name === 'ItemR'){
            AudioToggle.instance.onAudioQueue(3);
            this.scheduleOnce(() => {this.listItemR.push(other)});
            this.scheduleOnce(() => {other.destroy()});
        }
        if(other.name.startsWith('enemy')){
            AudioToggle.instance.onAudioQueue(7);
            this.scheduleOnce(() => {this.listItemR = []});
            this.scheduleOnce(() => {this.listItemB = []});
            this.scheduleOnce(() => {other.destroy()});
            this.planeAnim.play();
            selfCollider.group = 32;
            setTimeout(() => {
            selfCollider.group = 1;}, 4000);  
            this.scheduleOnce(() => {this.countCont.push(other)});
            this.scheduleOnce(() => this.checkHealth());
        }
        if(other.name.startsWith('Laser')){
            this.scheduleOnce(() => {this.listItemR = []});
            this.scheduleOnce(() => {this.listItemB = []});
            this.planeAnim.play();
            selfCollider.group = 32;
            setTimeout(() => {
                selfCollider.group = 1;}, 4000);   
            this.scheduleOnce(() => {this.countCont.push(other)});
            this.scheduleOnce(() => this.checkHealth());
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){

    }
    spawnBullet(){
        if(!ButtonPlayScene.instance.spawnEnabled) return;
        if(this.listItemB.length === 0){
            let bulletPrefab0 = this.listBullet[0];
            let prefabInstance = instantiate(bulletPrefab0);
            prefabInstance.getComponent(RigidBody2D).linearVelocity = this.bulletVelos[0];
            prefabInstance.parent = this.bullet;
            prefabInstance.setWorldPosition(this.node.worldPosition.x, this.node.worldPosition.y+60, this.node.worldPosition.z);
        }
        if(this.listItemB.length === 1){
             
            for(let i = 0; i < 3; i++) {
                let bulletPrefab0 = this.listBullet[0];
                let prefabInstance = instantiate(bulletPrefab0);
                prefabInstance.getComponent(RigidBody2D).linearVelocity = this.bulletVelos[i];
                prefabInstance.parent = this.bullet;
                prefabInstance.setWorldPosition(this.node.worldPosition.x, this.node.worldPosition.y+60, this.node.worldPosition.z);
            }
        }
        if(this.listItemB.length >= 2){
            for(let i = 0; i < 5; i++){
                let bulletPrefab0 = this.listBullet[0];
                let prefabInstance = instantiate(bulletPrefab0);
                prefabInstance.getComponent(RigidBody2D).linearVelocity = this.bulletVelos[i];
                prefabInstance.parent = this.bullet;
                prefabInstance.setWorldPosition(this.node.worldPosition.x, this.node.worldPosition.y+60, this.node.worldPosition.z);
            }
        }
    }
    spawnRocket(){
        if(!ButtonPlayScene.instance.spawnEnabled) return;
        if(this.listItemR.length >= 1){
            let bulletPrefab = this.listBullet[1];

            let prefabInstance0 = instantiate(bulletPrefab);
            prefabInstance0.parent = this.bullet;
            prefabInstance0.getComponent(RigidBody2D).linearVelocity = this.bulletVelos[0];
            prefabInstance0.setWorldPosition(this.node.worldPosition.x+50, this.node.worldPosition.y, this.node.worldPosition.z);

            let prefabInstance1 = instantiate(bulletPrefab);
            prefabInstance1.parent = this.bullet;
            prefabInstance1.getComponent(RigidBody2D).linearVelocity = this.bulletVelos[0];
            prefabInstance1.setWorldPosition(this.node.worldPosition.x-50, this.node.worldPosition.y, this.node.worldPosition.z);
        }
    }
    checkHealth(){
        if(this.countCont.length === 1){
            this.listHealth[4].active = false;
        }
        if(this.countCont.length === 2){
            this.listHealth[3].active = false;
        }
        if(this.countCont.length === 3){
            this.listHealth[2].active = false;
        }
        if(this.countCont.length === 4){
            this.listHealth[1].active = false;
        }
        if(this.countCont.length === 5){
            this.listHealth[0].active = false;
            ButtonPlayScene.instance.moveEnable = false;        
            ButtonPlayScene.instance.spawnEnabled = false;
            GameCtrl.instance.overNode.setWorldPosition(GameCtrl.instance.node.worldPosition);
            GameCtrl.instance.overNode.active = true;
            GameCtrl.instance.savePoint();
        }
    }
    
}
