import { _decorator, Component, Node, math, Vec3, Collider2D, Contact2DType, instantiate, IPhysics2DContact, Prefab } from 'cc';
import { Plane } from './Plane';
import { ButtonPlayScene } from './ButtonPlayScene';
const { ccclass, property } = _decorator;

@ccclass('BulletE')
export class BulletE extends Component {
    private bulletSpeed: number = 5;
    private posX: number;
    private posY: number;
    @property(Prefab)
    public destroyPre: Prefab = null;
    start() {
        let collider = this.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        
    }

    update(deltaTime: number) {
    }
    
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(otherCollider.node.name.startsWith('Plane')){
            this.destroyB();
            this.scheduleOnce(() => {selfCollider.node?.destroy()}, 1);
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){

    }
    destroyB(){
        let destroyPrefab = this.destroyPre;
        let prefabInstance = instantiate(destroyPrefab);
        prefabInstance.parent = this.node;
        prefabInstance.setWorldPosition(this.node.worldPosition);
    }
}


