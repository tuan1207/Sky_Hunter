import { _decorator, Component, Node, Vec3, Collider2D, Contact2DType, IPhysics2DContact, Prefab, instantiate } from 'cc';
import { GameCtrl } from './GameCtrl';
import { ButtonPlayScene } from './ButtonPlayScene';
const { ccclass, property } = _decorator;

@ccclass('Helicopter')
export class Helicopter extends Component {
    public bulletSpeed: number = 10;
    private posX: number;
    private posY: number;
    public spawnItemPos;
    private contacted: boolean = false;
    @property(Prefab)
    public items: Prefab [] = []
    start() {
        let collider = this.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    update(deltaTime: number) {
        if(!ButtonPlayScene.instance.spawnEnabled) return;

        this.posX = this.node.position.x;
        this.posY = this.node.position.y;

        this.posX += this.bulletSpeed * 0.5;
        if(this.posX > 690){
            this.node.destroy();
        }
        let posBullet = new Vec3(this.posX, this.posY);
        this.node.setPosition(posBullet);
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this.spawnItemPos = selfCollider.node.position;
        this.scheduleOnce(() => {selfCollider.destroy()});
        if(otherCollider.node.name === 'bullet0' || otherCollider.node.name === 'rocket'){
           this.scheduleOnce(() => {otherCollider.node?.destroy()}); 
        }
        if(this.contacted) return;
        this.scheduleOnce(() => {this.spawnItem()});
        this.contacted = true;
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
    }

    spawnItem(){
        if(!ButtonPlayScene.instance.spawnEnabled) return;

        let randomIndex = Math.floor(Math.random() * this.items.length);
        let randomPrefab = this.items[randomIndex];

        let prefabInstance = instantiate(randomPrefab);
        prefabInstance.setPosition(this.spawnItemPos);
        GameCtrl.instance.node.addChild(prefabInstance);
    }
}


